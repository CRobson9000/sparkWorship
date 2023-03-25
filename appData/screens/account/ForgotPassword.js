import { Image, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "@firebase/auth";
import Routes from '../Navigation/constants/Routes.js';
import { Provider } from 'react-native-paper';
import { Toast } from '../../components/components';
import { getDatabase, ref, set } from 'firebase/database';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import Routes.UserDashboard from '../dashboard/UserDashboard';

//import statements for styles
import { stylesPortrait } from "../../styles/portrait.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input, KeyboardView } from '../../components/components.js';
import { FirebaseButler } from '../../components/classes.js';


export default function ForgotPassword({ navigation }) {

  /*------------------------------------------------*/
  /*----------BACK-END APP CODE ----------*/
  /*------------------------------------------------*/
// console.log( Routes.UserDashboard );
  //global variables
  let username;
  let userPassword;
  const toastRef = useRef("");
  const [email, setEmail] = React.useState(null);

  const auth = getAuth()
  function resetPassword () { 
      sendPasswordResetEmail(auth, email) 
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

  // uncomment this for existing users
  // async function registerForPushNotificationsAsync(uid) {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync({experienceId: uid})).data;
  //     console.log("My Token", token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  
  //   return token;
  // }

  /*------------------------------------------------*/
  /*----------FRONT-END APP CODE ----------*/
  /*------------------------------------------------*/
 
  return (
    <KeyboardView style = {{paddingBottom: "30%"}}>
      <View style={[stylesPortrait.container, {backgroundColor: 'white'}]}>
        <TouchableHighlight
          style = {{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            backgroundColor:'#DBE9EC',
            justifyContent: 'center',
            alignItems: 'center',
            left: Dimensions.get('window').width * 0.25,
            top: 100
          }}
        >
          <Text style={{color: "#006175", fontFamily: "RNSMiles"}}> Reset Password </Text>
        </TouchableHighlight>

        {/* Mini circles */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            left: 20,
            top: 60,
            backgroundColor: '#006175',
          }}></View>

        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            right: -320,
            top: 50,
            backgroundColor: '#006175',
          }}></View>

        <View
          style={{
            width: 85,
            height: 85,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            right: -325,
            bottom: 260,
            backgroundColor: '#E07415',
          }}></View>

        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            left: 50,
            bottom: 300,
            backgroundColor: '#006175',
          }}></View>

        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            left: 135,
            bottom: 68,
            backgroundColor: '#EE9344',
          }}></View>

        {/* Container for everything below the logo */}
        <View style={stylesPortrait.contentContainer}>
          <Text style={[stylesPortrait.username]}>Email</Text>
          <TextInput 
             onChangeText= {(val) => setEmail(val)} 
             style={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}
          />
          <TouchableOpacity activeOpacity={1} onPress = {() => resetPassword()} style={[stylesPortrait.button]}>
          {/* <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}> */}
            <View><Text style={{color: "white", fontFamily: "RNSMiles", fontSize: Dimensions.get('window').height*0.023}}>Change Password</Text></View>
          </TouchableOpacity>



          <Provider>
            <Toast ref = {toastRef}/>
          </Provider>
        </View>
      </View>
    </KeyboardView>
  );
}
