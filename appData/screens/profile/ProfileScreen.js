import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInputComponent, TextComponent } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "./styles/portrait.js";
import { stylesBase } from "./styles/base.js";
import { stylesLandscape } from "./styles/landscape.js";

export default function ProfileScreen({ navigation }) {

    /*------------------------------------------------*/
    /*---------------BACK-END APP CODE ---------------*/
    /*------------------------------------------------*/

    //global variables
    let username;
    let userPassword;

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
    }

    function signIn(navigation) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, userPassword).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("User", user.uid);
          // navigation.navigate('DatabaseTest');
          // ...
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
      });
    }

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

    /*------------------------------------------------*/
    /*--------------FRONT-END APP CODE ---------------*/
    /*------------------------------------------------*/

    //used to detect device orientation.  If the device is in portrait mode, portrait will be true, else it will be false
    let {portrait} = useDeviceOrientation();  

    //defines layout for portrait mode 
    if (portrait == true)
    { 
      return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style={[stylesBase.container, stylesPortrait.container]}>

              {/* Profile Picture Code */}
              <View style={[stylesBase.topBorder, stylesPortrait.topBorder]}>
                  <Image style={{width: "45%", height: "45%"}} source={require("../../../assets/resume.jpg")}></Image>
                  {/*"Edit Profile" Button*/}
                  <TouchableOpacity activeOpacity={1} onPress = {() => signIn(navigation)} style={[stylesPortrait.button]}>
                      <View><Text style={{color:"white"}}>Edit Profile</Text></View>
                  </TouchableOpacity>
              </View>
 

              {/* Container for everything below the logo */}
              <View style={stylesPortrait.contentContainer}>
                <Text>About Me</Text>
                <Input placeHolderText={"About Me"} secure={true} func={(val) => userPassword = val} inputStyle={[stylesPortrait.textBox/*, stylesPortrait.centerText*/]}/>

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


