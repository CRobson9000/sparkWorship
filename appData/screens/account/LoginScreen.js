import { Image, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
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


export default function LoginScreen({ navigation }) {

  /*------------------------------------------------*/
  /*----------BACK-END APP CODE ----------*/
  /*------------------------------------------------*/
// console.log( Routes.UserDashboard );
  //global variables
  let username;
  let userPassword;
  const toastRef = useRef("");

  function signIn(navigation) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, userPassword).then(async(userCredential) => {
        // Signed in with a valid username and password 
        const user = userCredential.user;

        //await registerForPushNotificationsAsync(user.uid);
        let role = await FirebaseButler.fbGet(`Users/${user.uid}/role`)
        navigation.navigate("Navigator", {userId: user.uid, role});
    }).catch((error) => {
        const errorMessage = error.message;
        toastRef.current.showToast(errorMessage, 3000, "red");
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
          <Text style={{color: "#006175", fontFamily: "RNSMiles"}}> Login </Text>
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
          <Input secure={false} func= {(val) => username = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>

          <Text style={[stylesPortrait.password]}>Password</Text>
          <Input secure={true} func={(val) => userPassword = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>

          <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('Forgot Password')}>
            <Text style={[stylesPortrait.forgotPassword]}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}>
          {/* <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}> */}
            <View><Text style={{color: "white", fontFamily: "RNSMiles", fontSize: Dimensions.get('window').height*0.023}}>Login</Text></View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate(Routes.registration)}>
            <Text style={[stylesPortrait.centerText]}>Register New User</Text>
          </TouchableOpacity>

          <Provider>
            <Toast ref = {toastRef}/>
          </Provider>
        </View>
      </View>
    </KeyboardView>
  );
}


