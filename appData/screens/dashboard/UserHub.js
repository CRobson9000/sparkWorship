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
import { Input } from '../../components/components.js'


export default function UserHub({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
 
      {/* <View style={stylesPortrait.container}> */}

       

      

        {/* Container for everything below the logo */}
        {/* <View style={stylesPortrait.contentDashContainer}> */}
          <ScrollView style={stylesPortrait.userHubScroll}>

            <TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}> 
              <Image style={{height: 40, width: 40}} source={require('../../../assets/userHub1.png')}></Image>
              Oyin Dolapo
              {'\n'}
                
              {'\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
               augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
               imperdiet est nisi interdum neque.
               {'\n'}
                
               {'\n'}
              Intrument: Guitar 
              {'\n'}
              Location: Mechanicsburg, PA</Text></View>
              <Image style={{height: 15, width: 152}} source={require('../../../assets/heart.png')}></Image>
              <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>
              <Image style={{height: 40, width: 40}} source={require('../../../assets/userHub2.png')}></Image>
              Abdul Weber
              {'\n'}
                
              {'\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
               augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
               imperdiet est nisi interdum neque.
               {'\n'}
                
               {'\n'}
              Intrument: Piano
              {'\n'}
              Location: Mechanicsburg, PA</Text></View>
              <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
              <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)} style={[stylesPortrait.dashboardButton]}>
              <View><Text style={{lineHeight: 30, color: "#006175"}}>
              <Image style={{height: 40, width: 40}} source={require('../../../assets/userHub3.png')}></Image>
              Michael Lis
              {'\n'}
                
              {'\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
               augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
               imperdiet est nisi interdum neque.
               {'\n'}
                
               {'\n'}
              Intrument: Drums 
              {'\n'}
              Location: Mechanicsburg, PA</Text></View>
              <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
              <Image style={{height: 15, width: 15}} source={require('../../../assets/comment.png')}></Image> 
            </TouchableOpacity>
            
          </ScrollView>
        {/* </View> */}
      {/* </View> */}
     </TouchableWithoutFeedback> 
  );
}