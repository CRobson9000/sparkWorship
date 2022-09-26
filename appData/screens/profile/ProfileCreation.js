import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Input, Slider } from '../../components/components';

export default function ProfileScreen() {

//code for slider
  const Screen1 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.text}>Name</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Email</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Password</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Phone Number</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Location</Text>
            <TextInput style={[styleSheet.inputBox]}/>
        </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet2.text}>Church Name</Text>
            <TextInput style={[styleSheet2.inputBox]}/>
            <Text style={styleSheet2.text}>Denomination</Text>
            <TextInput style={[styleSheet2.inputBox]}/>
            <Text style={styleSheet2.text}>Church Location</Text>
            <TextInput style={[styleSheet2.inputBox]}/>
        </View>
    );
  }

  const Screen3 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.text}>Instrument</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Total Years of Experience</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Years of Praise Brand Experience (Optional)</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.text}>Biography (Optional)</Text>
        <Text style={styleSheet.italicText}>Tell attendees more about you!</Text>
        <View style={styleSheet.BiographySquare}/>
      </View>
    );
  }

  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />
  ];

  let [currentIndex, setCurrentIndex] = React.useState(1);

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
        {/* <View style={styleSheet.content}> */}
            <Slider currentIndex = {currentIndex} screens = {myScreens} />
        {/* </View> */}
        {/* <Text style={styleSheet.text}>Name</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Email</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Password</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Phone Number</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Location</Text>
            <TextInput style={[styleSheet.inputBox]}/> */}

        {/* <Text style={styleSheet.text}>Church Name</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Denomination</Text>
            <TextInput style={[styleSheet.inputBox]}/>
            <Text style={styleSheet.text}>Church Location</Text>
            <TextInput style={[styleSheet.inputBox]}/> */}

        {/* <Text style={styleSheet.text}>Instrument</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Total Years of Experience</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Years of Praise Brand Experience (Optional)</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity> */}

        {/* <Text style={styleSheet.text}>Biography (Optional)</Text>
            <Text style={styleSheet.italicText}>Tell attendees more about you!</Text>
            <View style={styleSheet.BiographySquare}/> */}
        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
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