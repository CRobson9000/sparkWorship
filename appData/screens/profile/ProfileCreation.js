import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}> 
        <View style={styleSheet.topBorder}>
        {/* <Text style={styleSheet.phaseText}>Phase 1</Text> */}
        {/* <Text style={styleSheet.phaseText}>Phase 2</Text> */}
            <Text style={styleSheet.phaseText}>Phase 3</Text>
        {/* <Text style={styleSheet.phaseText}>Phase 4</Text> */}
        </View>
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



        <Text style={styleSheet.text}>Instrument</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Total Years of Experience</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <Text style={styleSheet.text}>Years of Praise Brand Experience (Optional)</Text>
        <TextInput style={[styleSheet.inputBox]}/>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>



    {/* <Text style={styleSheet.text}>Biography (Optional)</Text>
        <Text style={styleSheet.italicText}>Tell attendees more about you!</Text>
        <View style={styleSheet.BiographySquare}/> */}



        <View style={styleSheet.row}>
            <TouchableOpacity style={styleSheet.button}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
        </View>
    </View>

  );

}

const styleSheet = StyleSheet.create({

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
    text: {
        paddingBottom: "3%",
        fontSize: "17%",
        left: "9%",
        fontFamily: "Gill Sans"
    },
    phaseText: {
        paddingBottom: "3%",
        fontSize: "50%",
        fontFamily: "Gill Sans",
        alignSelf: "center",
        top: "50%",
        fontWeight: "500"
    },
    italicText: {
        paddingBottom: "3%",
        fontSize: "15%",
        left: "9%",
        fontStyle: "italic"
    },

    inputBox: {
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: "10%",
        width: "85%",
        height: "5%",
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
        borderRadius: "10%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        fontSize: "17%",
        fontFamily: "Gill Sans"
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
        borderRadius: "10%"
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: "20%",
        marginBottom: "3%"
      },

});  