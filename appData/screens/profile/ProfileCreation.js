import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Input, Slider } from '../../components/components';
import { Observable } from '../../components/classes';
import { getDatabase, ref, set, get } from 'firebase/database';

export default function ProfileScreen() {
  //all kinds of inputs
  //first screen variables
  let name = new Observable("", () => updatePayload(name.getVal(), "name"));
  let email = new Observable("", () => updatePayload(email.getVal(), "email"));
  let password = new Observable("", () => updatePayload(password.getVal(), "password"));
  let phoneNumber = new Observable("", () => updatePayload(phoneNumber.getVal(), "phoneNumber"));
  let location = new Observable("", () => updatePayload(location.getVal(), "location"));
  //second variable screens
  let churchName = new Observable("", () => updatePayload(churchName.getVal(), "churchName"));
  let denomination = new Observable("", () => updatePayload(denomination.getVal(), "denomination"));
  let churchLocation = new Observable("", () => updatePayload(churchLocation.getVal(), "churchLocation"));
  //third variable screens
  let instrument = new Observable("", () => updatePayload(instrument.getVal(), "instrument"));
  let experience = new Observable("", () => updatePayload(experience.getVal(), "experience"));
  let praiseExperience = new Observable("", () => updatePayload(praiseExperience.getVal(), "praiseExperience"));
  //forth variable screens
  let bio = new Observable("", () => updatePayload(bio.getVal(), "bio"));

  let update = {};
  let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const updatePayload = (updateVal, updateName) =>
  {
    update[updateName] = updateVal;
  }

  function sendPayload() {
    //loop through all of the key, value pairs in the object update and set the data in firebase based upon the keys and values
    for (let i = 0; i < Object.keys(update).length; i++)
    {
      //get keys and values out of update object, which houses everything that was changed
      let updateVal = update[Object.keys(update)[i]];
      let updateKey = Object.keys(update)[i];
      if (updateVal != "") {
        //send an single update to the database, which changes the value at the key to the new value under whatever the current user is
        const db = getDatabase();
        const reference = ref(db, `Users/${userId}/info/${updateKey}`);
        set(reference, updateVal);
      }
    }
    //console.log(update); 
  }


//code for sliders and screens
  const Screen1 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.text}>Name</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => name.setVal(val)}/>
            <Text style={styleSheet.text}>Email</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => email.setVal(val)}/>
            <Text style={styleSheet.text}>Password</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => password.setVal(val)}/>
            <Text style={styleSheet.text}>Phone Number</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => phoneNumber.setVal(val)}/>
            <Text style={styleSheet.text}>Location</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => location.setVal(val)}/>
        </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet2.text}>Church Name</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => churchName.setVal(val)}/>
            <Text style={styleSheet2.text}>Denomination</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => denomination.setVal(val)}/>
            <Text style={styleSheet2.text}>Church Location</Text>
            <Input inputStyle = {styleSheet.inputBox} func = {(val) => churchLocation.setVal(val)}/>
        </View>
    );
  }

  const Screen3 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.text}>Instrument</Text>
        <Input inputStyle = {styleSheet.inputBox} func = {(val) => instrument.setVal(val)}/>
        <Text style={styleSheet.text}>Total Years of Experience</Text>
        <Input inputStyle = {styleSheet.inputBox} func = {(val) => experience.setVal(val)}/>
        <Text style={styleSheet.text}>Years of Praise Brand Experience (Optional)</Text>
        <Input inputStyle = {styleSheet.inputBox} func = {(val) => praiseExperience.setVal(val)}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.text}>Biography (Optional)</Text>
        <Text style={styleSheet.italicText}>Tell attendees more about you!</Text>
        <Input inputStyle = {styleSheet.BiographySquare} func = {(val) => bio.setVal(val)}/>
      </View>
    );
  }

  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />
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

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}> 
        <View style={styleSheet.topBorder}></View> 
        <Slider currentIndex = {currentIndex} screens = {myScreens} />

        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
        </View>
        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => sendPayload()}><Text style={styleSheet.buttonText}>Submit</Text></TouchableOpacity>
        </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({

    MainContainer: {
        backgroundColor: "white",
        height: "100%",
    },

    topBorder:{
        height: "30%",
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
        marginBottom: "5%"
    },

    content: {
        height: "50%",
        width: "100%",
        justifyContent: "center",
    },

    text: {
        paddingBottom: "3%",
        fontSize: 10,
        left: "9%",
        //fontFamily: "Gill Sans"
    },

    italicText: {
        paddingBottom: "3%",
        fontSize: 9,
        left: "9%",
        fontStyle: "italic"
    },

    inputBox: {
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        width: "85%",
        height: "10%",
        alignSelf: "center",
        marginBottom: "3%"
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "35%",
        width: "37%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    row: {
        flexDirection: "row",
        justifyContent: "center",
        height: "10%",
        width: '100%'
    },

    buttonText: {
        color: "white",
        fontSize: 10,
        //fontFamily: "Gill Sans"
    },

    addInstrumentButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        width: "85%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        marginBottom: "3%"
      },

});  

const styleSheet2 = StyleSheet.create({

    MainContainer: {
        backgroundColor: "white",
        height: "100%",
    },

    topBorder:{
        height: "30%",
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
        marginBottom: "5%"
    },

    content: {
        height: "50%",
        width: "100%",
        justifyContent: "center",
    },

    text: {
        paddingBottom: "3%",
        fontSize: 10,
        left: "9%",
        //fontFamily: "Gill Sans"
    },

    italicText: {
        paddingBottom: "3%",
        fontSize: 9,
        left: "9%",
        fontStyle: "italic"
    },

    inputBox: {
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        width: "85%",
        height: "10%",
        alignSelf: "center",
        marginBottom: "3%"
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "26%",
        width: "37%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    row: {
        flexDirection: "row",
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        fontSize: 10,
        //fontFamily: "Gill Sans"
    },

    addInstrumentButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "5%",
        width: "85%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        marginBottom: "3%"
      },

}); 