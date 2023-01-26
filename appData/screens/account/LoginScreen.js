import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import Routes from '../Navigation/constants/Routes.js';
import Icon from 'react-native-vector-icons/Ionicons';

// import Routes.UserDashboard from '../dashboard/UserDashboard';

//import statements for styles
import { stylesPortrait } from "../../styles/portrait.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input } from '../../components/components.js'

export default function LoginScreen({ navigation }) {

  /*------------------------------------------------*/
  /*----------BACK-END APP CODE ----------*/
  /*------------------------------------------------*/
// console.log( Routes.UserDashboard );
  //global variables
  let username;
  let userPassword;

  function signIn(navigation) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, userPassword).then((userCredential) => {
        // Signed in with a valid username and password 
        const user = userCredential.user;
        navigation.navigate("Navigator", {userId: user.uid});
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);
        console.log(errorMessage);
    });
  }

  //--------------------
  //   OBSERVERS
  //--------------------
    
  //--------------------
  //   LISTENERS
  //--------------------

  /*------------------------------------------------*/
  /*----------FRONT-END APP CODE ----------*/
  /*------------------------------------------------*/
 
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={stylesPortrait.container}>
        <TouchableHighlight
          style = {{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            backgroundColor:'#DBE9EC',
            justifyContent: 'center',
            alignItems: 'center',
            left: 110,
            top: 100
          }}
        >
          <Text style={{color: "white"}}> Login </Text>
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

          <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('LoginScreen')}>
            <Text style={[stylesPortrait.forgotPassword]}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}>
          {/* <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}> */}
            <View><Text style={{color: "white", fontFamily: "RNSMiles"}}>Login</Text></View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate(Routes.registration)}>
            <Text style={[stylesPortrait.centerText]}>Register New User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


