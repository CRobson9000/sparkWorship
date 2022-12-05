import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
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
import { Observable } from '../../components/classes.js'

//database processing import statements
import { getDatabase, ref, set } from 'firebase/database';

import { Dropdown } from 'react-native-element-dropdown';


import Routes from '../Navigation/constants/Routes'

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

  //userId
  let userId = {
    value: "",
    valListener: function(val) {},
    setVal(val) {
      this.value = val;
      this.valListener(val);
    },
    getVal() {
      return this.value;
    },
    registerListener: function(listener) {
      this.valListener = listener;
    }
  }

  function signUp(navigation) {
    const auth = getAuth();
    //creates a new user in "authentication" of firebase
    if (password == confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log("User created successfully!");
          const user = userCredential.user;

          //set the global userId, which will call an observer
          userId.setVal(user.uid);
          navigation.navigate("Navigator", {userId: user.uid});   
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
    else {
      console.log("Error: passwords do not match");
    }
  }

  //--------------------
  //   OBSERVERS
  //--------------------

  const createUserSpace = () => {
    //verify that the new user has an id
    console.log("User", userId.getVal());
    const uid = userId.getVal();

    //create space in the database to store this user's information
    const db = getDatabase();
    const reference = ref(db, `Users/${uid}`);
    set(reference, {
        name: name,
        username: username,
        role: role,
        email: email,
        loggedIn: true
    });
  }

  const renderDropDownItem = (item) => {
    return (
      <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
        <Text> {item} </Text>
      </View>
    )
  }

  //--------------------
  //   LISTENERS
  //--------------------

  //register a listener for when a uid is set
  userId.registerListener(createUserSpace);

  /*------------------------------------------------*/
  /*----------FRONT-END APP CODE ----------*/
  /*------------------------------------------------*/
    
  return (
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
          <Text style={{color: "white"}}> Register </Text>
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
              <Text style={{color: "white"}}>Create new User</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
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

