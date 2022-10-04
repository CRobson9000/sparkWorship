import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";

export default function ProfileScreenIPublic() {

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
        <View style={styleSheet.contactButtons}>
          {/* Message */}
          <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/messageicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
          {/* Email */}
          <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/mailicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
          {/* Call */}
          <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/phoneicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
        </View>
      </View>
      <View>
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
    height: 20,
  },
  row: {
    flexDirection: "row",
    left: "57%"
  },
  contactButtons: {
    marginTop: "9%",
    flexDirection: "row",
    justifyContent: "space-evenly"
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
    paddingTop: "5%",
    paddingBottom: "3%",
    fontSize: 18,
    left: "9%",
    fontFamily: "Gill Sans",
    fontWeight: "500"
  },
  Square: {
    width: "85%",
    height: "30%", 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: 20,
    alignSelf: "center"
  },

});
