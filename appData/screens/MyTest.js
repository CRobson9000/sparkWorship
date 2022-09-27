import { Image, StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { Input, Slider } from '../components/components';
import { Observable } from '../components/classes';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { getDatabase, ref, set, get } from 'firebase/database';
import { screensEnabled } from 'react-native-screens';

export default function MyTest({ navigation }) {
  let role = new Observable("", () => updatePayload(role.getVal(), "role"));
  let title = new Observable("", () => updatePayload(title.getVal(), "title"));
  let bio = new Observable("", () => updatePayload(bio.getVal(), "bio"));

  let update = {};
  let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const updatePayload = (updateVal, updateName) =>
  {
    update[updateName] = updateVal;
  }

  function sendPayload() {
    //loop through all of the key, value pairs in the object update and set the data in firebase based upon the keys and values
    // for (let i = 0; i < Object.keys(update).length; i++)
    // {
    //   //get keys and values out of update object, which houses everything that was changed
    //   let updateVal = update[Object.keys(update)[i]];
    //   let updateKey = Object.keys(update)[i];
    //   if (updateVal != "") {
    //     //send an single update to the database, which changes the value at the key to the new value under whatever the current user is
    //     const db = getDatabase();
    //     const reference = ref(db, `Users/${userId}/info/${updateKey}`);
    //     set(reference, updateVal);
    //   }
    // }
    console.log(update); 
  }

  //code for slider
  const Screen1 = (props) => {
    return (
      <View style = {{flexDirection: "column"}}>
        <Text> Hi There! </Text>
        <Text> How Are You? </Text>
      </View>
    );
  }

  const Screen2 = (props) => {
    return (
      <View style = {{flexDirection: "column"}}>
        <Text> Nice To Meet You </Text>
        <Text> Buddy Oh </Text>
      </View>
    );
  }

  const Screen3 = (props) => {
    return (
      <View style = {{flexDirection: "column"}}>
        <Text> Eat Some Food </Text>
        <Text> Cause You're Hungry </Text>
      </View>
    );
  }

  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />
  ];

  let [currentIndex, setCurrentIndex] = React.useState(0);

  function limitScroll(){
    if (currentIndex < 0) {
      setCurrentIndex(myScreens.length - 1);
    }
    else if (currentIndex > myScreens.length - 1) {
      setCurrentIndex(0);
    }
  }

  //---------------------------------------------------------------------------
  // Section of code to put functions to be run after a component is re-rendered
  //---------------------------------------------------------------------------

  //loops the index back around on the other end when 
  limitScroll();

  return (
    <View style = {styles.container}>
        <View style = {styles.top}>
          <Input placeHolderText={"insert role"} func = {(val) => role.setVal(val)}/>
          <Input placeHolderText={"insert title"} func = {(val) => title.setVal(val)}/>
          <Input placeHolderText={"insert bio"} func = {(val) => bio.setVal(val)}/>
          <TouchableHighlight style = {styles.button} onPress = {() => sendPayload()}>
            <Text> Tap This! </Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.botContainer}>
          <View style = {{flexDirection: "row", height: "30%"}}>
            <TouchableHighlight style = {styles.buttons} onPress = {() => setCurrentIndex(currentIndex - 1)}>
              <Text> Prev </Text>
            </TouchableHighlight>
            <TouchableHighlight style = {styles.buttons} onPress = {() => setCurrentIndex(currentIndex + 1)}>
              <Text> Next </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.sliderContainer}>
            <Slider currentIndex = {currentIndex} screens = {myScreens} /> 
          </View>
        </View>
    </View> 
  );    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center"
  },

  top: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },

  botContainer: {
    height: "60%",
    width: "100%"
  },

  sliderContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    width: "100%",
    height: "20%",
    top: "0%"
  },

  firstPage: {
    backgroundColor: "red",
    position: "relative",
    width: "90%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  
  button: {
    height: "20%",
    width: "20%",
    margin: 20,
    backgroundColor: "purple"
  },

  buttons: {
    height: "40%",
    width: "20%",
    margin: 20,
    backgroundColor: "green"
  }
});