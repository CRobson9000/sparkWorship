import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input, Toast, KeyboardView } from '../../components/components.js';
import Routes from '../Navigation/constants/Routes';

//database processing import statements
import { getDatabase, ref, set } from 'firebase/database';
import { Dropdown } from 'react-native-element-dropdown';
import { Provider } from 'react-native-paper';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function RegistrationScreen({ navigation }) {

  /*------------------------------------------------*/
  /*----------BACK-END APP CODE ----------*/
  /*------------------------------------------------*/
  const [role, setRole] = React.useState("Select a role");
  let name = "";
  let email = "";
  let username = "";
  let password = "";
  let confirmPassword = "";

  const toastRef = useRef("");

  function signUp(navigation) {
    const auth = getAuth();
    //creates a new user in "authentication" of firebase
    if (password == confirmPassword && role && email && password && username && name) {
      // if () location is valid
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          const user = userCredential.user;
          createUserSpace(user.uid).then(() => {
            registerForPushNotificationsAsync(user.uid);
            navigation.navigate("Navigator", {userId: user.uid}); 
          })
      }).catch((error) => {
        const errorMessage = error.message;
        toastRef.current(errorMessage);
      });
    }
    else {
      let message = [];
      if (!name) message.push("Please input a name");
      if (!email) message.push("Please input an email");
      if (!username) message.push("Please enter a username");
      if (!password) message.push("Please enter a password");
      if (password != confirmPassword) message.push("Passwords do not match");

      let finalMessage = message.join(", ")
      toastRef.current.showToast(finalMessage);
    }
  }

  //--------------------
  //   OBSERVERS
  //--------------------

  async function registerForPushNotificationsAsync(uid) {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      await Notifications.getExpoPushTokenAsync({experienceId: uid});
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  async function createUserSpace(uid) {
    //create space in the database to store this user's information
    const db = getDatabase();

    const reference = ref(db, `Users/${uid}`);
    await set(reference, {
        loggedIn: true,
        role: role
    });

    const infoReference = ref(db, `Users/${uid}/info`);
    await set(infoReference, {
      name: name,
      email: email, 
      username: username
    });
  }

  const renderDropDownItem = (item) => {
    return (
      <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
        <Text> {item} </Text>
      </View>
    )
  }

  // keyboard scrolling code:  we want to disable scrolling in the keyboard is off
  const [keyboardScroll, setKeyboardScroll] = React.useState(false);
  const keyboardView = useRef(null);
  // const keyboardRef = useRef();
  // useLayoutEffect(() => {
  //   keyboardView.current.scrollTo({x: 0, y: 0, animation: false});
  // })
  // useEffect(() => {
  //   Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardScroll(true);
  //     },
  //   );

  //   Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       keyboardRef.scrollToPosition(0, 0);
  //       setKeyboardScroll(false);
  //     }
  //   )
  // }, []);

  /*------------------------------------------------*/
  /*----------FRONT-END APP CODE ----------*/
  /*------------------------------------------------*/
    
  return (
    <KeyboardView>
      <View style={stylesPortrait.container}>
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
          <Text style={{color: "#006175", fontFamily: "RNSMiles"}}> Register </Text>
        </TouchableHighlight>

        {/* Mini circles */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: Math.round(Dimensions.get('window').width / 2),
            left: 20,
            top: 60,
            backgroundColor: Math.round(Dimensions.get('window').width / 2),
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
            backgroundColor: '#EE9344',
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
          <ScrollView>
            <Dropdown
                style = {regStyles.dropDown}
                data = {["instrumentalist", "attendee"]}
                dropdownPosition = {"top"}
                search = {false}
                maxHeight = {"40%"}
                itemTextStyle = {{color: "black", fontSize: 5}}
                onChange = {(value) => setRole(value)}
                placeholder = {role}
                value = {role}
                placeholderStyle = {{textAlign: "center"}}
                renderItem = {renderDropDownItem}
            />
            <Input placeHolderText={"First and Last Name"} secure={false} func= {(val) => name = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
            <Input placeHolderText={"Email"} secure={false} func= {(val) => email = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
            <Input placeHolderText={"Username"} secure={false} func= {(val) => username = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
            <Input placeHolderText={"Password"} secure={false} func={(val) => password = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
            <Input placeHolderText={"Confirm Password"} secure={false} func={(val) => confirmPassword = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
            <TouchableOpacity onPress = {() => signUp(navigation)} style={stylesPortrait.button}>
              <Text style={{color: "white", fontFamily: "RNSMiles"}}>Create new User</Text>
            </TouchableOpacity>
          </ScrollView>
          <Provider>
            <Toast ref = {toastRef}/>
          </Provider>
        </View>
      </View>
    </KeyboardView>
  );
}

const regStyles = StyleSheet.create({
  dropDown: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "50%",
    height: "10%",
    marginBottom: "4%",
    left: "25%"
},
});

