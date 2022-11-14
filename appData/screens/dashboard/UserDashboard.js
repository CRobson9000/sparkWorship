import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, {useEffect, useRef} from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';




//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components and classes
import { Input } from '../../components/components.js'
import { FirebaseButler, TDO } from '../../components/classes.js'

//import for scrollview
import { ScrollView } from 'react-native';

// import for calendar
import { Calendar, CalendarUtils } from 'react-native-calendars';
import {StyleSheet} from 'react-native';

//import for database stuff
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

// import for Bottom Nav Bar

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation} from 'react-native-paper';
import HostingDashboard from './HostingDashboard';
import ProfileScreenIPersonal from '../profile/ProfileScreenIPersonal';
import RegistrationScreen from '../account/RegistrationScreen';

// const HomeRoute = () => <Text>Home</Text>;

// const SparkRoute = () => <Text>Sparks</Text>;

// const CreateRoute = () => <Text>Create Sparks</Text>;

// const MessagingRoute = () => <Text>Messages</Text>;

// const MyComponent = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
//     { key: 'albums', title: 'Hub', focusedIcon: 'album' },
//     { key: 'recents', title: 'Spark+', focusedIcon: 'history' },
//     { key: 'notifications', title: 'Profile', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     music: HomeRoute,
//     albums: SparkRoute,
//     recents: CreateRoute,
//     notifications: MessagingRoute,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };
// export default UserDashboard;


export default function UserDashboard({ navigation }) {

  const [markedDates, setMarkedDates] = React.useState({});
  const [sparkData, setSparkData] = React.useState({});
  let allSparks = useRef([]);
  
  let userId = "wVgW65Og51OCuC7lD8LtRJBWuUC2";

  async function getSparks() {
    //get ids of sparks that the current user is attending
    let startingSparksPath = `Users/${userId}/sparks/attending`;
    let sparksOBJs = await FirebaseButler.fbGet(startingSparksPath); 
    let sparkIds = Object.values(sparksOBJs);
    let localMarkedDates = {};
    //each each id, get the actual spark data for that specific spark in firebase (found in Sparks)
    for (let index in sparkIds) {
      let sparkId = sparkIds[index];
      let sparkTDOPath = `Sparks/${sparkId}/info/times/spark`;
      let sparkNamePath = `Sparks/${sparkId}/info/name`;

      let sparkTDO = await FirebaseButler.fbGet(sparkTDOPath);
      let sparkName = await FirebaseButler.fbGet(sparkNamePath);

      //add the needed spark data to local sparks array
      let sparkObject = sparkTDO;
      sparkObject['name'] = sparkName;
      sparkObject['id'] = sparkId
      allSparks['current'].push(sparkObject);

      //reformat each the spark date to match the markedDates for the calendar element, then push them to local object
      let dateString = `20${sparkTDO.TDO.year}-${sparkTDO.TDO.month}-${sparkTDO.TDO.day}`;
      localMarkedDates[dateString] = {marked: true}
    } 

    //update global sparkObject (sparkData)
    setSparkData(allSparks['current']);
    //update global markedDates object
    setMarkedDates(localMarkedDates);
  }

  const renderSpark = (object) => {
    let myTDO = new TDO(0, 0, 0, 0, 0, 0, object.item["TDO"]);
    return (
      <TouchableOpacity activeOpacity={1} onPress = {() => console.log("Not done yet!")} style={[stylesPortrait.dashboardButton]}>
        <View><Text style={{lineHeight: 30, color: "#006175"}}>{object.item.name}
        {'\n'}
        {`Time: ${myTDO.getFormattedTime()}`}
        {'\n'}
        {`Date: ${myTDO.getFormattedDateFormal()}`}
        {'\n'}
        Location: Mechanicsburg, PA</Text></View>
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
          <Text style={stylesPortrait.topText}> Attending</Text>
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
        {/* <View style={stylesPortrait.contentDashContainer}> */}
        <View style={dashboardStyles.contentDashContainer}>
          {/* <ScrollView>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>September 12, 2022
              {'\n'}
              Giant Slayers
              {'\n'}
              Mechanicsburg, PA</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>September 27, 2022
              {'\n'}
              Dillan and Dillan
              {'\n'}
              Mechanicsburg, PA</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>October 4, 2022
              {'\n'}
              Lauren Bagel
              {'\n'}
              Dillsburg, PA</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>October 9, 2022
              {'\n'}
              Great I am
              {'\n'}
              Mechanicsburg, PA</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>October 15, 2022
              {'\n'}
              Phil Wick
              {'\n'}
              Mechanicsburg, PA</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>October 20, 2022
              {'\n'}
              The Psalmers
              {'\n'}
              Harrisburg, PA</Text></View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>November 14, 2022
              {'\n'}
              United
              {'\n'}
              Dillsburg, PA</Text></View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>November 27, 2022
              {'\n'}
              Singing Disciples
              {'\n'}
              Harrisburg, PA</Text></View>
            </TouchableOpacity> */}
          {/* </ScrollView> */}
          <FlatList
            data={sparkData}
            renderItem={renderSpark}
            style={{height: "100%", width: "100%"}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    // marginBottom: "5%"
  }
});