import React, {useRef, useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Input, Slider } from '../../components/components';
import { Observable } from '../../components/classes';
import { getDatabase, ref, set, get } from 'firebase/database';
import { SelectList } from 'react-native-dropdown-select-list';

export default function ProfileScreen({route, navigation}) {
  //set environment variables
  let props = route.params;
  //let userId = props.userId;

  //all kinds of inputs
  let inputs = {
    //first screen variables
    name: new Observable("", () => updatePayload(inputs.name.getVal(), "name")),
    username: new Observable("", () => updatePayload(inputs.username.getVal(), "username")),
    email: new Observable("", () => updatePayload(inputs.email.getVal(), "email")),
    location: new Observable("", () => updatePayload(inputs.location.getVal(), "location")),
    //second variable screens
    password: new Observable("", () => updatePayload(inputs.password.getVal(), "password")),
    phoneNumber: new Observable("", () => updatePayload(inputs.phoneNumber.getVal(), "phoneNumber")),
    churchName: new Observable("", () => updatePayload(inputs.churchName.getVal(), "churchName")),
    denomination: new Observable("", () => updatePayload(inputs.denomination.getVal(), "denomination")),
    churchLocation: new Observable("", () => updatePayload(inputs.churchLocation.getVal(), "churchLocation")),
    //third variable screens
    instrument: new Observable("", () => updatePayload(inputs.instrument.getVal(), "instrument")),
    experience: new Observable("", () => updatePayload(inputs.experience.getVal(), "experience")),
    praiseExperience: new Observable("", () => updatePayload(inputs.praiseExperience.getVal(), "praiseExperience")),
    //forth variable screens
    bio: new Observable("", () => updatePayload(inputs.bio.getVal(), "bio"))
  }

  let update = useRef({});
  let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const updateToStart = () => {
    //console.log("update", update);
    for (let key in inputs) {
        let updateVal = update[key];
        if (updateVal) {
            let obj = inputs[key];
            obj.setVal(updateVal);
        }
    }
  }

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
    navigation.navigate("DatabaseTest");
  }

  //code for sliders and screens
  const Screen1 = (props) => {
    const [selected, setSelected] = React.useState("");
    const data = ['Male', 'Female'];
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.phaseText}>General Information</Text>
            <SelectList data={data} setSelected={setSelected}/>
            <Text style={styleSheet.text}>Name</Text>
            <Input start = {inputs.name.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.name.setVal(val)}/>
            <Text style={styleSheet.text}>Username</Text>
            <Input start = {inputs.username.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.username.setVal(val)}/>
            <Text style={styleSheet.text}>Email</Text>
            <Input start = {inputs.email.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.email.setVal(val)}/>
            
            <Text style={styleSheet.text}>Location</Text>
            <Input start = {inputs.phoneNumber.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.phoneNumber.setVal(val)} />
            <Text style={styleSheet.text}>Location</Text>
            <Input start = {inputs.location.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.location.setVal(val)}/>
        </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.phaseText}>Authentication</Text>
            <Text style={styleSheet.text}>Password</Text>
            <Input start = {inputs.churchName.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchName.setVal(val)}/>
            <Text style={styleSheet.text}>Phone Number</Text>
            <Input start = {inputs.denomination.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.denomination.setVal(val)}/>
            <Text style={styleSheet.text}>Church Location</Text>
            <Input start = {inputs.churchLocation.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchLocation.setVal(val)}/>
        </View>
    );
  }

  const Screen3 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.phaseText}>Home Church</Text>
        <Text style={styleSheet.smallText}>This section is optional. You can skip by clicking Next.</Text>
        <Text style={styleSheet.text}>Church Name</Text>
        <Input start = {inputs.churchName.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.instrument.setVal(val)}/>
        <Text style={styleSheet.text}>Denomination</Text>
        <Input start = {inputs.denomination.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.denomination.setVal(val)}/>
        <Text style={styleSheet.text}>Location</Text>
        <Input start = {inputs.praiseExperience.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.praiseExperience.setVal(val)}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.phaseText}>Social Media</Text>
        <Text style={styleSheet.text}>Biography (Optional)</Text>
        <Text style={styleSheet.italicText}>Tell attendees more about you!</Text>
        <Input start = {inputs.bio.getVal()} inputStyle = {styleSheet.BiographySquare} func = {(val) => inputs.bio.setVal(val)}/>
      </View>
    );
  }

  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />
  ];

  let myTitles = [
    <Text style={styleSheet.phaseText}>Phase 1</Text>,
    <Text style={styleSheet.phaseText}>Phase 2</Text>,
    <Text style={styleSheet.phaseText}>Phase 3</Text>,
    <Text style={styleSheet.phaseText}>Phase 4</Text>
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

  updateToStart();
  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}> 
        <View style={styleSheet.topBorder}>
          <Text style={styleSheet.titleText}>Profile Creation</Text>
        <Slider currentIndex = {currentIndex} screens = {myTitles}/>
        </View>
        <Slider currentIndex = {currentIndex} screens = {myScreens} />

        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
        </View>
    </View>
  );
};

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
        width: "100%"
    },

    text: {
        paddingBottom: "3%",
        fontSize: 15,
        left: "9%",
    },
   
    phaseText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        top: "2%",
        paddingBottom: "5%"
      },

    italicText: {
        paddingBottom: "3%",
        fontSize: 9,
        left: "9%",
        fontStyle: "italic"
    },

    inputBox: {
        backgroundColor: "rgb(242, 144, 91)",
        borderRadius: 10,
        width: "85%",
        height: "8%",
        alignSelf: "center",
        marginBottom: "3%"
    },

    progressBar: {
        backgroundColor: "black"
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
        width: "37%",
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
        fontSize: 15,
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

    titleText: {
        top: "20%",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600"
    }, 

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        marginBottom: "3%"
      },

    profilePicture: {
        width: "50%",
        height: "70%",
    },

    smallText: {
        textAlign: "center",
        fontSize: 15,
        color: "gray",
        paddingBottom: "5%"
    }
});

