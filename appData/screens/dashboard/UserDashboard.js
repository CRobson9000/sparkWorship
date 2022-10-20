import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
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

//import Icon from 'react-native-ico-material-design';








export default function UserDashboard({ navigation }) {
  return (
<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
 
      <View style={stylesPortrait.container}>
      <Text style={stylesPortrait.topText}> Attending</Text>

      <Image style={stylesPortrait.calendar} source={require("../../../assets/calendar.png")}></Image>

        {/* Container for everything below the logo */}
        <View style={stylesPortrait.contentDashContainer}>
          
        
          <ScrollView>
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
          </TouchableOpacity>
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
          
          </ScrollView>


        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}