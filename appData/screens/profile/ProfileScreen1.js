import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInputComponent, TextComponent } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "./styles/portrait.js";
import { stylesBase } from "./styles/base.js";
import { stylesLandscape } from "./styles/landscape.js";

/*------------------------------------------------*/
/*--------------FRONT-END APP CODE ---------------*/
/*------------------------------------------------*/

//used to detect device orientation.  If the device is in portrait mode, portrait will be true, else it will be false
let {portrait} = useDeviceOrientation();  

//defines layout for portrait mode 
if (portrait == true)
{
    return(
        <View style={[stylesBase.container, stylesPortrait.container]}></View>
    );
}