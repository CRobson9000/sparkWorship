import { Text, View, TouchableOpacity, Dimensions, TouchableHighlight, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
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
        let sparkInfo = await FirebaseButler.fbGet(`Sparks/${sparkId}/info`) || null;
        if (sparkInfo) {
          //add the needed spark data to local sparks array
          let sparkObject = {};
          sparkObject['name'] = sparkInfo.name;   // then add other info on the same level as TDO
          sparkObject['id'] = sparkId;
          allSparks.push(sparkObject);
  
          // set times on calendar and for sparks array
          let sparkTDO = sparkInfo?.times?.spark
          if (sparkTDO) {
            //reformat each the spark date to match the markedDates for the calendar element, then push them to local object
            let dateString = `20${sparkTDO.TDO.year}-${sparkTDO.TDO.month}-${sparkTDO.TDO.day}`;
            localMarkedDates[dateString] = {marked: true}
          }
          // sparkObject['time'] = sparkTDO;
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
    // let sparkTimeObj = item.info?.times?.spark.TDO;
    // let sparkTDO = new TDO(0, 0, 0, 0, 0, 0, sparkTimeObj);
    // let finalTime = sparkTDO.getFormattedTime();
    // let finalDate = sparkTDO.getFormattedDateFormal();
    // let finalDateTime = `Starting at ${finalTime} on ${finalDate}`; 

    //Location formatting
    // let locationObj = item.info.location;
    // let locationString = `${locationObj?.address} ${locationObj?.city}, ${locationObj?.state} ${locationObj?.zip}`;
    
    return (
      <TouchableOpacity 
        onPress = {() => navigation.navigate(Routes.sparkSummary, {userId, currentSparkId: item.id})} 
        style={[sparkViewStyles.boxOne]}
      >
        <ProfileImage userId = {null} size = {"medium"}/>
        <Text style={sparkViewStyles.boxText}> {item.name} </Text>
        <Text style={{left: "30%"}}> More</Text>
      </TouchableOpacity>
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
    top: "-5%",
    width: "100%",
    height: "105%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
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
    height: "40%",
    width: "100%",
    alignItems: "center"
    // marginBottom: "5%"
  }
});

const sparkViewStyles = StyleSheet.create({
  boxOne:
  {
    backgroundColor: "#DBE9EC",
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