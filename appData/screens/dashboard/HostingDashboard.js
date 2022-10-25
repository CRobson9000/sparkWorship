import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input } from '../../components/components.js'

//import for scrollview
import { ScrollView } from 'react-native';

// import for calendar
import { Calendar, CalendarUtils } from 'react-native-calendars';
import {StyleSheet} from 'react-native';

// import for Bottom Nav Bar

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation} from 'react-native-paper';

const HomeRoute = () => <Text>Home</Text>;

const SparkRoute = () => <Text>Sparks</Text>;

const CreateRoute = () => <Text>Create Sparks</Text>;

const MessagingRoute = () => <Text>Messages</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: HomeRoute,
    albums: SparkRoute,
    recents: CreateRoute,
    notifications: MessagingRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};



export default function HostingDashboard({ navigation }) {
  return (


    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
 
      <View style={stylesPortrait.container}>

      <Text style={stylesPortrait.topText}> Hosting </Text>

      <Image style={stylesPortrait.calendar} source={require("../../../assets/calendar.png")}></Image>

        {/* Container for everything below the logo */}
        <View style={stylesPortrait.contentDashContainer}>
        
        <ScrollView>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>September 12, 2022
            {'\n'}
            Time: 6:00 pm
            {'\n'}
            Mechanicsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>September 27, 2022
            {'\n'}
            Time: 7:00pm
            {'\n'}
            Mechanicsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>October 4, 2022
            {'\n'}
            Time: 6:30pm
            {'\n'}
            Dillsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>October 9, 2022
            {'\n'}
            Time: 9:00pm
            {'\n'}
            Mechanicsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>October 15, 2022
            {'\n'}
            Time: 8:00pm
            {'\n'}
            Mechanicsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>October 20, 2022
            {'\n'}
            Time: 7:00pm
            {'\n'}
            Harrisburg, PA</Text></View>
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>November 14, 2022
            {'\n'}
            United
            {'\n'}
            Dillsburg, PA</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
            <View><Text style={{lineHeight: 30, color: "#006175"}}>November 27, 2022
            {'\n'}
            Singing Disciples
            {'\n'}
            Harrisburg, PA</Text></View>
          </TouchableOpacity> */}
          
          </ScrollView>


        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}