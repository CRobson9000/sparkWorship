import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-around' }} >
        <View style={styleSheet.topBorder}>
            <Image style={styleSheet.Photo} source={require("../../../assets/profilepicture.png")}></Image>
            <Text style={styleSheet.NameText}>FirstName LastName</Text>
            <Text style={styleSheet.LocationText}>Location</Text>
            <TouchableOpacity style={styleSheet.EditProfileButton}><Text style={styleSheet.EditProfileText}>Edit Profile</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/messageicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
        <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/mailicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
        <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/phoneicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
        <Text style={styleSheet.AboutMeText}>About Me</Text>
        <View style={styleSheet.AboutMeSquare}/>
        <Text style={styleSheet.UpcomingEventsText}>Upcoming Events</Text>
        <View style={styleSheet.UpcomingEventsSquare}/>
      </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Photo: {
    top: 45,
    left: 100,
    width: "50%",
    height: "50%"
  },
  NameText: {
    color: "black",
    fontSize: "25",
    textAlign: "center",
    top: 60
  },
  LocationText: {
    color: "black",
    fontSize: "15",
    textAlign: "center",
    top: 70
  },  
  EditProfileButton:{
    backgroundColor: "rgb(0, 97, 117)",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
    width: "90%",
    marginTop: "3%",
    marginBottom: 10,
    borderRadius: 10,
    top: "18%"
  },
  topBorder:{
    height: 400,
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)"
  },
  button: {
    backgroundColor: 'rgb(242, 144, 91)',
    width: 100,
    height: 75,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20",
  },
  AboutMeText: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    right: 140,
  },
  EditProfileText: {
    color: "white",
    fontSize: "15"
  },
  UpcomingEventsText: {
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 20,
    right: 110,
  },
  AboutMeSquare: {
    width: 380,
    height: 100, 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20",
  },
  UpcomingEventsSquare: {
    width: 380,
    height: 150, 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20",
  }

});
