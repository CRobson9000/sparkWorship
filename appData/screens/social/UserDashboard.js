import { Text, View, TouchableOpacity, Dimensions, Image, TouchableHighlight, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, {useEffect, useRef} from 'react';

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';

//import components and classes
import { FirebaseButler, TDO } from '../../components/classes.js';
import ProfileImage from '../../components/profileImage.js';
import Routes from '../Navigation/constants/Routes';

// import for calendar
import { Calendar } from 'react-native-calendars';

// Linear Gradient Import
import {LinearGradient} from 'expo-linear-gradient';

//import for database stuff
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

const screenHeight = Dimensions.get('window').height;
export default function UserDashboard({ route, navigation }) {
  let props = route.params;

  const [markedDates, setMarkedDates] = React.useState({});
  const [sparkData, setSparkData] = React.useState([]);

  let userId = props?.userId || "wVgW65Og51OCuC7lD8LtRJBWuUC2";

  async function getSparks() {
    // reset list of sparks on rerender to be populated again
    let allSparks = [];

    //get ids of sparks that the current user is attending
    let attendingSparksOBJs = await FirebaseButler.fbGet(`Users/${userId}/sparks/attending`) || {};
    let playingSparkOBJs = await FirebaseButler.fbGet(`Users/${userId}/sparks/playing`) || {}; 
    let sparksOBJs = {...attendingSparksOBJs, ...playingSparkOBJs};

    if (Object.values(sparksOBJs).length > 0) {
      let sparkIds = Object.values(sparksOBJs);
      let localMarkedDates = {};
      //each each id, get the actual spark data for that specific spark in firebase (found in Sparks)
      for (let sparkId of sparkIds) {
        let sparkData = await FirebaseButler.fbGet(`Sparks/${sparkId}`) || null;
        let sparkInfo = sparkData?.info || {};
        if (sparkData) {
          //add the needed spark data to local sparks array
          let sparkObject = {};
          sparkObject['name'] = sparkInfo?.name;   // then add other info on the same level as TDO
          sparkObject['id'] = sparkId;

          // add spark location
          sparkObject['location'] = sparkInfo?.location || null;

          // set spark leader id
          sparkObject['leaderId'] = sparkData.roles.spark_leader;
          allSparks.push(sparkObject);
  
          // set times on calendar and for sparks array
          let sparkTDO = sparkInfo?.times?.spark
          if (sparkTDO) {
            //reformat each the spark date to match the markedDates for the calendar element, then push them to local object
            let day = sparkTDO.TDO.day;
            let month = sparkTDO.TDO.month;
            if (parseInt(day) < 10) day = `0${day}`;
            if (parseInt(month) < 10) month = `0${month}`;
            let dateString = `${sparkTDO.TDO.year}-${month}-${day}`;
            localMarkedDates[dateString] = {marked: true}
            sparkObject['time'] = sparkTDO;
          
            // get published date to change spark from proposed to published
            let timeDateValObj = sparkInfo?.times?.published.TDO;
            let publishedTimeDate = new Date(timeDateValObj['year'], timeDateValObj['month'] - 1, timeDateValObj['day'], timeDateValObj['hours'], timeDateValObj['minutes'], 0);
            let currTimeDate = new Date();
            
            /* Set status to published if the current date is passed the published date
              The spark can only be published if:
              - it's passed the publish time
              - if all the roles have been filled
              - if there's at least one song on the setlist
            */
            // all roles are filled
            let allRolesFilled = true;
            let sparkRoles = sparkData.roles;
            for (let [roleName, roleData] of Object.entries(sparkRoles)) {
              let roleNotFilled = false;
              if (roleName != 'spark_leader') {
                for (let [key, val] of Object.entries(roleData)) {
                  if (key != 'request' && !val.final) {
                    allRolesFilled = false;
                    roleNotFilled = true;
                    break;
                  }
                }
              }
              if (roleNotFilled) break;
            }

            // at least one song
            let oneSong = sparkData?.info?.songs?.length != 0 || false;

            if (currTimeDate.getTime() > publishedTimeDate.getTime()) {
              const db = getDatabase();
              const statusRef = ref(db, `Sparks/${sparkId}/status`);
              if (oneSong && allRolesFilled) {  
                await set(statusRef, 'published');
              }
              else {
                await set(statusRef, 'renew');
              }
            }
          }
        }
      } 

      //update global sparkObject (sparkData)
      setSparkData([...allSparks]);
      //update global markedDates object
      setMarkedDates({...localMarkedDates});
    }
  }

  const renderSpark = (object) => {
    let item = object.item;
    //Date Time string formatting
    let dateTimeString = "This spark has no time data"
    if (item?.time) {
        let sparkTimeObj = item.time.TDO;
        let sparkTDO = new TDO(0, 0, 0, 0, 0, 0, sparkTimeObj);
        let finalTime = sparkTDO.getFormattedTime();
        let finalDate = sparkTDO.getFormattedDateFormal();
        dateTimeString = `${finalDate} at ${finalTime}`; 
    }

    //Location formatting
    let locationString = "This spark has no location data";
    if (item?.location) {
        locationObj = item?.location;
        locationString = `${locationObj?.address} ${locationObj?.city}, ${locationObj?.state} ${locationObj?.zip}`;
    }
    
    return (
      <LinearGradient
                        colors={['#FFE5B4', '#DBE9EC']}
                        style={sparkViewStyles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}  >

                        <View style={{width: "100%", paddingBottom: "10%", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>
                                <View style={{padding: "2%", margin: "5%"}}>
                                     <ProfileImage userId = {item.leaderId} size = {"medium"}/>
                                </View>
                                <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}> {item?.info?.name} </Text>
                                <View style={sparkViewStyles.informationBox}>
                                    <View style={{position: "relative", flexDirection: "row", width: "30%", alignItems: "center"}}>
                                    <Image style={{height: 20, width: 20, position: "relative", /*left: "10%"*/}} source={require('../../../assets/locationpin.png')}></Image>
                                        <Text>Ephrata, PA</Text>
                                    </View>
                                    <View style={sparkViewStyles.verticalLine}></View>
                                    <View style={{position: "relative", width: "30%", alignItems: "center"}}>
                                        <Text>April 28, 2023 @ 8 p.m.</Text>
                                    </View>
                                </View>
                        </View>
                    </LinearGradient>
      // <LinearGradient
      //                   colors={['#FFE5B4', '#DBE9EC']}
      //                   style={sparkViewStyles.boxOne}
      //                   start={{ x: 0, y: 0 }}
      //                   end={{ x: 1, y: 1 }}  >
      // <TouchableOpacity 
      //   onPress = {() => navigation.navigate(Routes.sparkSummary, {...props, currentSparkId: item.id})} 
      //   style={[sparkViewStyles.boxOne]}
      // >
      //   {/* <LinearGradient
      //                   colors={['#FFE5B4', '#DBE9EC']}
      //                   style={sparkViewStyles.boxOne}
      //                   start={{ x: 0, y: 0 }}
      //                   end={{ x: 1, y: 1 }}  > */}
      //   <ProfileImage userId = {item.leaderId} size = {"medium"}/>
      //   <Text style={sparkViewStyles.boxText}> {item.name} </Text>
      //   <Text style={{left: "30%"}}> More</Text>
      //   {/* </LinearGradient> */}
      // </TouchableOpacity>
      // </LinearGradient>
    );  
  }

  function filterByDate (item, dateObject) {
    let itemDay = item.TDO.day;
    let itemMonth = item.TDO.month;

    //get rid of leading zero for single digit months and days
    if (itemDay[0] == "0") itemDay = itemDay[1];
    if (itemMonth[0] == "0") itemMonth = itemMonth[1];

    if (itemDay == dateObject.day && itemMonth == dateObject.month) {
      return true;
    }
    else {
      return false;
    }
  }

  const showDay = (dateObject) => {
    let filteredSparks = allSparks['current'].filter(item => filterByDate(item, dateObject));
    setSparkData(() => [...filteredSparks]);
  }

  useEffect(() => {
    getSparks();
  }, [])  

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={dashboardStyles.container}>
        <View style = {dashboardStyles.dashboardHeader}>
          <Text style={stylesPortrait.topText}> Your Sparks </Text>
        </View>

        <View style = {dashboardStyles.calendar}>
          <Calendar 
              theme={{
                'stylesheet.day.basic':{
                  'base':{
                    height: 25
                  }
                },
                backgroundColor: "#FFFFFF",
                textDayFontSize: 15,
                textMonthFontSize: 15,
                textDayHeaderFontSize: 15,
                selectedDayBackgroundColor: 'red',
                selectedDayTextColor: 'green'
              }}

              markedDates={markedDates}
              onDayPress={day => showDay(day)}
            />
        </View>

        {/* Container for everything below the logo */}
        <View style={dashboardStyles.contentDashContainer}>
          <FlatList
            data={sparkData}
            renderItem={renderSpark}
            style={{height: "100%", width: "90%"}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const dashboardStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "105%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },  
  container2: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  dashboardHeader: {
    height: "7%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  calendar: {
    height: "40%",
    width: "100%",
  },
  contentDashContainer: {
    height: "53%",
    width: "100%",
    alignItems: "center", 
  }
});

// Note this will be removed when I (Colin) pull the sparks out into their own component
const sparkViewStyles = StyleSheet.create({
  boxOne:
  {
    // backgroundColor: "#DBE9EC",
    padding: "3%",
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%"
  },
  boxText:{
    padding: "5%",
    fontSize: screenHeight/70,
    fontFamily: "RNSMiles",
    fontWeight: "bold"
  }
});