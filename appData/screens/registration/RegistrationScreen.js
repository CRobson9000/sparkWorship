import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
<<<<<<< HEAD
import { stylesPortrait } from "./styles/portrait.js";
import { stylesBase } from "./styles/base.js";
import { stylesLandscape } from "./styles/landscape.js";

//database processing import statements
import { getDatabase, ref, set } from 'firebase/database';

//import components
import { Input } from '../../global/components.js'

export default function RegistrationScreen({ navigation }) {
=======
import { stylesBase } from "../../global/styles/base2";
import { stylesPortrait } from "../../global/styles/portrait.js";
// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

export default function RegisterScreen({ navigation }) {
>>>>>>> aziannasBranch

    /*------------------------------------------------*/
    /*----------BACK-END APP CODE ----------*/
    /*------------------------------------------------*/

    //global variables
    let username;
    let userPassword;

<<<<<<< HEAD
    //global values for now!
    let newUserEmail = "test@gmail.com";
    let newUserPassword = "123456";

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
      createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword).then((userCredential) => {
        console.log("User created Successly!");
          const user = userCredential.user;
          //set the global userId, which will call an observer
          userId.setVal(user.uid);   
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
=======
    function signUp(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);      
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
>>>>>>> aziannasBranch
    }

    function signIn(navigation) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, userPassword).then((userCredential) => {
<<<<<<< HEAD
          // Signed in with a valid username and password 
          const user = userCredential.user;
          console.log("User", user.uid);
          navigation.navigate('DatabaseTest');
=======
          // Signed in 
          const user = userCredential.user;
          console.log("User", user.uid);
          // navigation.navigate('DatabaseTest');
          // ...
>>>>>>> aziannasBranch
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
      });
    }

<<<<<<< HEAD
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
          created: true
      });
    }
=======
    //element for input
    const Input = (props) => {
      const [text, onChangeText] = React.useState("");
      props.func(text);
      return (
          <TextInput
            style={props.inputStyle}
            onChangeText={onChangeText}
            value={text}
            placeholder={props.placeHolderText}
            secureTextEntry={props.secure}
          />
      );
    };
>>>>>>> aziannasBranch

    /*------------------------------------------------*/
    /*----------FRONT-END APP CODE ----------*/
    /*------------------------------------------------*/

    //used to detect device orientation.  If the device is in portrait mode, portrait will be true, else it will be false
<<<<<<< HEAD
    let {portrait} = useDeviceOrientation();
    
    //register a listener for when a uid is set
    userId.registerListener(createUserSpace);
=======
    let {portrait} = useDeviceOrientation();  
>>>>>>> aziannasBranch
    
    //defines layout for portrait mode 
    if (portrait == true)
    { 
      return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style={[stylesBase.container, stylesPortrait.container]}>
<<<<<<< HEAD
              <LinearGradient 
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={stylesBase.background}
              />

              {/* Logo code */}
              <View style={[stylesBase.topBorder, stylesPortrait.topBorder]}>
                  <Image style={{width: "150%", height: "150%"}} source={require("../../../assets/logo.png")}></Image>
              </View>
=======
              {/* <LinearGradient 
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={stylesBase.background}
              /> */}
    
              {/* Logo code */}
              {/* <View style={[stylesBase.topBorder, stylesPortrait.topBorder,]}>
              <Text style={{color: "white"}}>Login</Text>
              </View> */}
              
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
                  borderRadius: '50%',
                  left: 20,
                  top: 60,
                  backgroundColor: '#006175',
                }}></View>

              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  right: -320,
                  top: 50,
                  backgroundColor: '#006175',
                }}></View>

              <View
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: '50%',
                  right: -325,
                  bottom: 260,
                  backgroundColor: '#EE9344',
                }}></View>

              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  left: 50,
                  bottom: 300,
                  backgroundColor: '#006175',
                }}></View>

              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  left: 135,
                  bottom: 68,
                  backgroundColor: '#EE9344',
                }}></View>
>>>>>>> aziannasBranch

              {/* Container for everything below the logo */}
              <View style={stylesPortrait.contentContainer}>
                <Input placeHolderText={"Username"} secure={false} func= {(val) => username = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>
                <Input placeHolderText={"Password"} secure={true} func={(val) => userPassword = val} inputStyle={[stylesPortrait.inputBox/*, stylesPortrait.centerText*/]}/>

<<<<<<< HEAD
=======
                {/* <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('LoginScreen')}>
                  <Text style={[stylesPortrait.centerText]}>Forgot password?</Text>
                </TouchableOpacity> */}


>>>>>>> aziannasBranch
                <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}>
                  <View><Text style={{color: "white"}}>Login</Text></View>
                </TouchableOpacity>

<<<<<<< HEAD
                <TouchableOpacity activeOpacity={1} onPress = {() => signUp(navigation)}>
=======
                <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('LoginScreen')}>
>>>>>>> aziannasBranch
                  <Text style={[stylesPortrait.centerText]}>Register New User</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    //defines layout for landscape mode 
    else
    {
      return ( 
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          {/* Content container */}
          <View style={[stylesBase.container, stylesLandscape.container]}>
            {/* To be completed */}
          </View>
        </TouchableWithoutFeedback>
      );
    }
}

