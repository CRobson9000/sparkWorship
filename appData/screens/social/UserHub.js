import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
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
import { Input } from '../../components/components.js';

//import for navigation
import Routes from '../Navigation/constants/Routes.js';

import ProfileImage from '../../components/profileImage.js';

export default function UserHub({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3"

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
 
      {/* <View style={stylesPortrait.container}> */}
        {/* Container for everything below the logo */}
        {/* <View style={stylesPortrait.contentDashContainer}> */}
          <View style = {{top: "-5%", width: "100%", height: "93%"}}>
            <ScrollView style={stylesPortrait.userHubScroll}>

              <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
                <View>
                  <View style = {{flexDirection: "row"}}>
                    <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "XULgbwAM0HNd8CdVu6Mja1pGrYF3"})}>
                      <ProfileImage userId = {"XULgbwAM0HNd8CdVu6Mja1pGrYF3"} size = {"small"}/>
                    </TouchableHighlight>
                    <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
                      Jen Johnson
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#000000"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Guitar 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                {/* <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image> */}
                 
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
                <View>
                  <View style = {{flexDirection: "row"}}> 
                    <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "RJ85S4CIw3eMyVvXbce6oCnNehJ2"})}>
                        <ProfileImage userId = {"RJ85S4CIw3eMyVvXbce6oCnNehJ2"} size = {"small"}/>
                    </TouchableHighlight>
                      <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
                      David Schmitt
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#000000"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Piano 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                {/* <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image> */}
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
                <View>
                  <View style = {{flexDirection: "row"}}> 
                    <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "QtqEJiGOSKPlP6LsUsRYtaloZba2"})}>
                        <ProfileImage userId = {"QtqEJiGOSKPlP6LsUsRYtaloZba2"} size = {"small"}/>
                    </TouchableHighlight>
                    <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
                      Laura Scott
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#000000"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Drums 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                {/* <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image> */}
              </TouchableOpacity>
            </ScrollView>
          </View>
        {/* </View> */}
      {/* </View> */}
     </TouchableWithoutFeedback> 
  );
}