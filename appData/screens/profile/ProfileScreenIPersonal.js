import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";

export default function ProfileScreenIPersonal() {

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}>
      <View style={styleSheet.topBorder}>
        {/* Profile Picture */}
        <Image style={styleSheet.profilePicture} source={require("../../../assets/exampleprofilepic.jpg")}></Image>
        {/* First and Last Name */}
        <Text style={styleSheet.nameText}>Austin Smith</Text>
        {/* Title */}
        <Text style={styleSheet.title}>Instrumentalist</Text>
        {/* Location */}
        <View style={styleSheet.row}>
          <Image style={styleSheet.locationPin} source={require("../../../assets/locationpin.png")}></Image>
          <Text style={styleSheet.locationText}>Nashville, Tenessee</Text>
        </View>
        {/* Contact Buttons */}
        <TouchableOpacity style={styleSheet.EditProfileButton}><Text style={styleSheet.buttonText1}>Edit Profile</Text></TouchableOpacity>
      </View>
      <View>
        <View style={styleSheet.buttonsRow}>
          <TouchableOpacity style={styleSheet.friendsButton}><Text style={styleSheet.buttonText2}>Friends</Text></TouchableOpacity>
          <TouchableOpacity style={styleSheet.friendsButton}><Text style={styleSheet.buttonText2}>Messages</Text></TouchableOpacity>
        </View>
        {/* "About Me" Section */}
        <Text style={styleSheet.Text}>Biography</Text>
        <View style={styleSheet.Square}/>
        {/* Musical Background */}
        <Text style={styleSheet.Text}>Musical Background</Text>
        <View style={styleSheet.Square}/>
        {/* Church Experience */}
        {/* <Text style={styleSheet.Text}>Church Experience</Text> */}
        {/* <View style={styleSheet.Square}/> */}
        {/* "Upcoming Events" Section */}
        {/* <Text style={styleSheet.Text}>Upcoming Events</Text> */}
        {/* <View style={styleSheet.Square}/> */}
      </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  profilePicture: {
    top: "25%",
    left: "7%",
    width: "40%",
    height: "45%",
    borderRadius: 20
  },
  locationPin: {
    width: 20,
    height: 20
  },
  row: {
    flexDirection: "row",
    left: "57%"
  },
  buttonsRow: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: "90%",
    height: "15%"
  },
  title: {
    fontSize: 15,
    left: "57%",
    bottom: "5%",
    fontFamily: "Gill Sans"
  },
  nameText: {
    fontSize: 25,
    left: "52%",
    bottom: "9%",
    fontFamily: "Gill Sans",
    fontWeight: "500"
  },
  locationText: {
    fontSize: 12,
    left: "60%",
    fontFamily: "Gill Sans",
    fontWeight: "300"
  },  
  topBorder:{
    height: "40%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },
  button: {
    backgroundColor: 'rgb(242, 144, 91)',
    width: "22%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  Text: {
    paddingTop: "3%",
    paddingBottom: "5%",
    fontSize: 18,
    left: "9%",
    fontFamily: "Gill Sans",
    fontWeight: "500"
  },
  Square: {
    width: "85%",
    height: "20%", 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: 20,
    alignSelf: "center",
  },
  EditProfileButton:{
    backgroundColor: "rgb(0, 97, 117)",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: "14%",
    width: "85%",
    marginTop: "10%",
    marginBottom: "3%",
    borderRadius: 10
  },
  friendsButton:{
    backgroundColor: "rgb(242, 144, 91)",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "40%",
    borderRadius: 10,
  },
  buttonText1: {
    color: "white",
    fontSize: 17,
    fontFamily: "Gill Sans",
  },
  buttonText2: {
    color: "black",
    fontSize: 17,
    fontFamily: "Gill Sans",
  },
});
