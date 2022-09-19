import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}>
<<<<<<< HEAD
        <View style={styleSheet.topBorder}>
            <Image style={styleSheet.profilePicture} source={require("../../../assets/exampleprofilepic.jpg")}></Image>
            <Text style={styleSheet.nameText}>Austin Smith</Text>
            <Text style={styleSheet.title}>Instrumentalist</Text>
            <View style={styleSheet.row}>
              <Image style={styleSheet.locationPin} source={require("../../../assets/locationpin.png")}></Image>
              <Text style={styleSheet.locationText}>Nashville, Tenessee</Text>
            </View>
            <View style={styleSheet.contactButtons}>
              <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/messageicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
              <Image style={styleSheet.verticalLine} source={require("../../../assets/verticalline.png")}></Image>
              <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/mailicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
              <Image style={styleSheet.verticalLine} source={require("../../../assets/verticalline.png")}></Image>
              <TouchableOpacity style={styleSheet.button}><Image source={require("../../../assets/phoneicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
            </View>
            <TouchableOpacity style={styleSheet.EditProfileButton}><Text style={styleSheet.EditProfileText}>Edit Profile</Text></TouchableOpacity>
=======
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-around' }} >
        {/* <Text> Hi </Text> */}
        <View style={styleSheet.topBorder}>
          <Image style={styleSheet.Photo} source={require("../../../assets/profilepicture.png")}></Image>
          <Text style={styleSheet.NameText}>FirstName LastName</Text>
          <Text style={styleSheet.LocationText}>Location</Text> 
          <TouchableOpacity style={styleSheet.EditProfileButton}>
            <Text style={styleSheet.EditProfileText}>Edit Profile</Text>
          </TouchableOpacity>
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
        </View>
        <Text style={styleSheet.Text}>About Me</Text>
        <View style={styleSheet.AboutMeSquare}/>
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
    top: 100,
    left: 20,
    width: "40%",
    height: "40%",
    borderRadius: 80
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
    color: "black",
<<<<<<< HEAD
    fontSize: "20",
    left: "55%",
    bottom: "8%"
=======
    fontSize: 25,
    textAlign: "center",
    top: 60
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
  },
  nameText: {
    color: "black",
    fontSize: "30",
    left: "52%",
    bottom: "10%"
  },
  locationText: {
    color: "black",
<<<<<<< HEAD
    fontSize: "15",
    left: "50%",
    bottom: "5%"
=======
    fontSize: 15,
    textAlign: "center",
    top: 70
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
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
<<<<<<< HEAD
    borderRadius: 25,
=======
    borderRadius: 20,
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
  },
  Text: {
    paddingTop: "5%",
    paddingBottom: "3%",
    fontSize: 20,
<<<<<<< HEAD
    left: "5%"
=======
    right: "15%",
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
  },
  EditProfileText: {
    color: "white",
    fontSize: 15
  },
<<<<<<< HEAD
  AboutMeSquare: {
    width: "90%",
    height: "10%",
    left: "4%", 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20%",
=======
  UpcomingEventsText: {
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 20,
    right: "10%",
  },
  AboutMeSquare: {
    width: "90%",
    height: 100, 
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: 20,
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
  },
  UpcomingEventsSquare: {
    width: "90%",
    height: "15%", 
<<<<<<< HEAD
    left: "4%",
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: "20%",
=======
    backgroundColor: "rgb(249, 203, 177)",
    borderRadius: 20,
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
  }

});
