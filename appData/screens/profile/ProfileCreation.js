import React, {useRef} from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Input, Slider } from '../../components/components';
import { Observable } from '../../components/classes';
import { getDatabase, ref, set, get } from 'firebase/database';
import SelectList from 'react-native-dropdown-select-list'

export default function ProfileScreen({route, navigation}) {
  //set environment variables
  let props = route.params;
  //let userId = props.userId;

  //all kinds of inputs
  let inputs = {
    //first screen variables
    name: new Observable("", () => updatePayload(inputs.name.getVal(), "name")),
    email: new Observable("", () => updatePayload(inputs.email.getVal(), "email")),
    password: new Observable("", () => updatePayload(inputs.password.getVal(), "password")),
    phoneNumber: new Observable("", () => updatePayload(inputs.phoneNumber.getVal(), "phoneNumber")),
    location: new Observable("", () => updatePayload(inputs.location.getVal(), "location")),
    //second variable screens
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
  // let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";
  let userId = "wVgW65Og51OCuC7lD8LtRJBWuUC2"

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
    navigation.navigate("Router");
  }

  //code for sliders and screens
  const Screen1 = (props) => {
    let dropDownItems = ['Redo', 'Undo', 'Cut', 'Copy'];
    const [selected, setSelected] = React.useState("");

    return (
        <View style={styleSheet.content}>
            <SelectList data={dropDownItems} setSelected={setSelected} />
            <Text style={styleSheet.text}>Name</Text>
            <Input start = {inputs.name.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.name.setVal(val)}/>
            <Text style={styleSheet.text}>Email</Text>
            <Input start = {inputs.email.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.email.setVal(val)}/>
            <Text style={styleSheet.text}>Password</Text>
            <Input start = {inputs.password.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.password.setVal(val)}/>
            <Text style={styleSheet.text}>Phone Number</Text>
            <Input start = {inputs.phoneNumber.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.phoneNumber.setVal(val)}/>
            <Text style={styleSheet.text}>Location</Text>
            <Input start = {inputs.location.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.location.setVal(val)}/>
        </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet2.text}>Church Name</Text>
            <Input start = {inputs.churchName.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchName.setVal(val)}/>
            <Text style={styleSheet2.text}>Denomination</Text>
            <Input start = {inputs.denomination.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.denomination.setVal(val)}/>
            <Text style={styleSheet2.text}>Church Location</Text>
            <Input start = {inputs.churchLocation.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchLocation.setVal(val)}/>
        </View>
    );
  }

  const Screen3 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.text}>Instrument</Text>
        <Input start = {inputs.instrument.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.instrument.setVal(val)}/>
        <Text style={styleSheet.text}>Total Years of Experience</Text>
        <Input start = {inputs.experience.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.experience.setVal(val)}/>
        <Text style={styleSheet.text}>Years of Praise Brand Experience (Optional)</Text>
        <Input start = {inputs.praiseExperience.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.praiseExperience.setVal(val)}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
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
    <Text style={styleSheet2.phaseText}>Phase 1</Text>, 
    <Text style={styleSheet2.phaseText}>Phase 2</Text>,
    <Text style={styleSheet2.phaseText}>Phase 3</Text>,
    <Text style={styleSheet2.phaseText}>Phase 4</Text>
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
          <Slider currentIndex = {currentIndex} screens = {myTitles}/>
        </View>
        <Slider currentIndex = {currentIndex} screens = {myScreens} />

        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
        </View>
        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => sendPayload()}><Text style={styleSheet.buttonText}>Submit</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(2)}><Text style={styleSheet.buttonText}>Test</Text></TouchableOpacity>        
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
    row: {
        flexDirection: "row",
        left: "57%",
    },
    topBorder:{
        height: "30%",
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
        marginBottom: "5%"
    },
    
    profilePicture: {
        width: "50%",
        height: "70%",
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
    phaseText: {
        paddingBottom: "3%",
        fontSize: 20,
        fontFamily: "Gill Sans",
        alignSelf: "center",
        top: "50%",
        fontWeight: "500"
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