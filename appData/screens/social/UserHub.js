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
                    <TouchableHighlight style={{height: 40, width: 40}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "wVgW65Og51OCuC7lD8LtRJBWuUC2"})}>
                          <Image style={{height: "100%", width: "100%"}} source={require('../../../assets/userHub1.png')}></Image>
                      </TouchableHighlight>
                    <Text style={{marginLeft: "5%", lineHeight: 30, color: "#006175", fontFamily: "RNSMiles"}}> 
                      Dave Birdy
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#006175"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Guitar 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
                <View>
                  <View style = {{flexDirection: "row"}}> 
                    <TouchableHighlight style={{height: 40, width: 40}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "24Ir2DjDbdd1M0p8WoQGDMPdPbe2"})}>
                          <Image style={{height: "100%", width: "100%"}} source={require('../../../assets/userHub2.png')}></Image>
                      </TouchableHighlight>
                    <Text style={{marginLeft: "5%", lineHeight: 30, color: "#006175", fontFamily: "RNSMiles"}}> 
                      Mark Zuck
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#006175"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Piano 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
                <View>
                  <View style = {{flexDirection: "row"}}> 
                    <TouchableHighlight style={{height: 40, width: 40}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "pgFfrUx2ryd7h7iE00fD09RAJyG3"})}>
                          <Image style={{height: "100%", width: "100%"}} source={require('../../../assets/userHub3.png')}></Image>
                      </TouchableHighlight>
                    <Text style={{marginLeft: "5%", lineHeight: 30, color: "#006175", fontFamily: "RNSMiles"}}> 
                      Devin Robson
                    </Text>  
                  </View>
                  <Text style={{lineHeight: 30, color: "#006175"}}> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
                    augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
                    imperdiet est nisi interdum neque.
                    {'\n'}
                    {'\n'}
                    Instrument: Drums 
                    {'\n'}
                    Location: Mechanicsburg, PA</Text></View>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
                <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
              </TouchableOpacity>
            </ScrollView>
          </View>
        {/* </View> */}
      {/* </View> */}
     </TouchableWithoutFeedback> 
  );
}