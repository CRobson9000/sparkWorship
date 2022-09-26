import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {

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
              <Image style={styleSheet.verticalLine} source={require("../../../assets/verticalline.png")}></Image>
              {/* Email */}
              <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/mailicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
              <Image style={styleSheet.verticalLine} source={require("../../../assets/verticalline.png")}></Image>
              {/* Call */}
              <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/phoneicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
            </View>
            {/* Edit Profile Button */}
            <TouchableOpacity style={styleSheet.EditProfileButton}><Text style={styleSheet.EditProfileText}>Edit Profile</Text></TouchableOpacity>
        </View>
        {/* "About Me" Section */}
        <Text style={styleSheet.Text}>About Me</Text>
        <View style={styleSheet.AboutMeSquare}/>
        {/* "Upcoming Events" Section */}
        <Text style={styleSheet.Text}>Upcoming Events</Text>
        <View style={styleSheet.UpcomingEventsSquare}/>
      </View>
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  profilePicture: {
    top: "20%",
    left: "5%",
    width: "40%",
    height: "40%",
    borderRadius: "80%"
  },
  locationPin: {
    width: 20,
    height: 20,
    bottom: "5%"
  },
  verticalLine: {
    width: 20,
    height: 40,
    marginTop: "2%"
  },
  row: {
    flexDirection: "row",
    left: "47%"
  },
  contactButtons: {
    marginTop: "9%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: "20",
    left: "55%",
    bottom: "8%"
  },
  nameText: {
    fontSize: "30",
    left: "52%",
    bottom: "10%"
  },
  locationText: {
    fontSize: "15",
    left: "50%",
    bottom: "5%"
  },  
  EditProfileButton:{
    backgroundColor: "rgb(0, 97, 117)",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
    width: "90%",
    marginTop: "3%",
    marginBottom: "3%",
    borderRadius: "10%"
  },
  topBorder:{
    height: "50%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },
  button: {
    backgroundColor: 'rgb(242, 144, 91)',
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  Text: {
    paddingTop: "5%",
    paddingBottom: "3%",
    fontSize: 20,
    left: "5%"
  },
  EditProfileText: {
    color: "white",
    fontSize: 15
  },
  AboutMeSquare: {
    width: "90%",
    height: "10%",
    left: "4%", 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20%",
  },
  UpcomingEventsSquare: {
    width: "90%",
    height: "15%", 
    left: "4%",
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20%",
  }

});
