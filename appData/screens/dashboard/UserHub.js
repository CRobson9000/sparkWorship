import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input } from '../../components/components.js'

//import for scrollview
import { ScrollView } from 'react-native';


export default function UserHub({ navigation }) {
  return (


    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
 
      <View style={stylesPortrait.container}>

      <Text style={stylesPortrait.topText}> Hosting </Text>

      <Image style={stylesPortrait.calendar} source={require("../../../assets/calendar.png")}></Image>

        {/* Container for everything below the logo */}
        <View style={stylesPortrait.contentDashContainer}>
        
        <ScrollView>
          <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
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
          
          </ScrollView>


        </View>
      </View>
     </TouchableWithoutFeedback> 
  );
}