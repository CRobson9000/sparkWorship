import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import colors from '../../config/colors.js'
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen({ navigation }) {
      return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style={[stylesBase.container, stylesPortrait.container]}>
              <LinearGradient 
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={stylesBase.background}
              />
              {/* Title portion of the page */}
              
              <View style={[stylesBase.topBorder, stylesPortrait.topBorder]}>
                  {/* <Text style={stylesBase.headText}> SparkWarship </Text> */}
                  <Image style={{width: "150%", height: "150%"}}source={require("../../assets/logo.png")}></Image>
              </View>

              {/* Container for everything between the buttons panel and the title */}
              <View style={stylesPortrait.contentContainer}>
                
                {/*<Text style={[stylesBase.titleText, stylesPortrait.centerText]}>Username</Text>*/}
                <TextInput style={[stylesPortrait.inputBox, stylesPortrait.centerText]} placeholder="Username"/>
                {/*<Text style={[stylesBase.titleText, stylesPortrait.centerText]}>Password</Text> */}
                <TextInput secureTextEntry={true} style={[stylesPortrait.inputBox, stylesPortrait.centerText]} placeholder="Password"/>
                
                <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('DatabaseTest')} style={[stylesPortrait.button]}>
                  <View><Text style={{color: "blue"}}>Login</Text></View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress = {() => navigation.navigate('LoginScreen')}>
                  <Text style={[stylesPortrait.centerText]}>Register New User</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableWithoutFeedback>
      );
    
    };
    //}
  


//everything that's different for the portrait layout of the screen
const stylesPortrait = StyleSheet.create({
  button:
  {
    backgroundColor: colors.buttonColor,
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "black",
    height: "7.5%",
    marginBottom: "10%",
    borderWidth: 3
  },
  inputBox: {
    height: "7.5%",
    marginHorizontal: "10%",
    marginBottom: "10%",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(256, 256, 256, 0.6)",
    paddingLeft: "1%",
    borderRadius: 8
  },
  centerText:
  {
    textAlign: 'center',
    color: "white"
  },
  logoContainter:
  {
    marginTop: "5%",
    marginLeft: "25%",
    marginBottom: "10%",
    width: "50%",
    height: "30%"
  },
  logo:
  {
    width: "100%",
    height: "100%"
  },
  topBorder:
  {
    height: "40%"
  },
  buttonsContainer:
  {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    backgroundColor: colors.primary
  },
  contentContainer:
  {
    width: "100%",
    height: "75%",
    //backgroundColor: "blue"
  },
  file:
  {
    width: "100%",
    height: "10%"
  },
  subFile:
  {
    width: "100%",
    height: "10%",
  }
  
}); 

//everything that's different for the landscape layout of the screen
const stylesLandscape = StyleSheet.create({ 
  warningText: {
    marginTop: '0%',
  },
  column: {
    width: '200%',
    height: '100%'
  },
  inputBoxLong: {
    height: "50%",
    width: "63%",
    marginTop: "2%",
    marginHorizontal: "10%",
    marginBottom: "5%",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white"
  },
  inputBox: {
    height: "50%",
    width: "40%",
    marginHorizontal: "10%",
    marginBottom: "1%",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    paddingLeft: "1%"
  },
  logoContainter:
  {

    width: "25%",
    height: "150%"
  },
  logo:
  {
    width: "70%",
    height: "70%"
  },
  topBorder:
  {
    height: "20%"
  }, 
  buttonsContainer:
  {
    width: "15%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: colors.secondary
  },
  contentContainer:
  {
    width: "100%",
    height: "80%",
    backgroundColor: "red",
    flexDirection: "row"
  },
  button:
  {
    backgroundColor: colors.buttonColor,
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "black",
    height: "15%",
    borderWidth: 3
  },
  file:
  {
    width: "100%",
    height: "20%"
  },
  subFile:
  {
    width: "100%",
    height: "20%"
  },
  fileViewerContainer: 
  {
    height: "100%",
    width: "85%"
  }
}); 

//everything that's the same for both portrait and landscape modes
const stylesBase = StyleSheet.create({
  background:
  {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
  },
  container: 
  {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.secondary
  },
  topBorder:
  {
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    alignItems: "center",
    justifyContent: "center"
  },
  headText:{
    fontSize: 40,
    fontFamily: "sans-serif-medium",
    color: "white"
  },
  titleText:
  {
      fontSize: 30,
      /*fontFamily: 'CantoraOne_400Regular',*/
      color: "white"

  },
  buttonsContainer:
  {
    justifyContent: "space-around",
    alignItems: "center",
  },
  button:
  {
    backgroundColor: colors.buttonColor,
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "black",
    height: "7.5%",
    borderWidth: 3
  },
  subFile:
  {
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    flexDirection: "row"
  },
  file:
  {
    backgroundColor: colors.tertiary,
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    flexDirection: "row"
  },
  icon:
  {
    backgroundColor: "red"
   }

});