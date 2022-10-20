import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { stylesProfile } from "../../styles/profile.js";

export default function ProfileScreenIPersonal() {

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={stylesProfile.MainContainer}>
      <View style={[stylesProfile.topBorder, {height: "40%"}]}>
        {/* Profile Picture */}
        <Image style={[stylesProfile.profilePicture, {height: "45%"}]} source={require("../../../assets/exampleprofilepic.jpg")}></Image>
        {/* First and Last Name */}
        <Text style={[stylesProfile.boldText, {fontSize: "30"}]}>Austin Smith</Text>
        {/* Title */}
        <Text style={stylesProfile.title}>Instrumentalist</Text>
        {/* Location */}
        <View style={stylesProfile.row}>
          <Image style={stylesProfile.locationPin} source={require("../../../assets/locationpin.png")}></Image>
          <Text style={stylesProfile.locationText}>Nashville, Tenessee</Text>
        </View>
        {/* Contact Buttons */}
        <TouchableOpacity style={stylesProfile.EditProfileButton}><Text style={stylesProfile.buttonText1}>Edit Profile</Text></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={stylesProfile.buttonsRow}>
          <TouchableOpacity style={stylesProfile.friendsButton}><Text style={stylesProfile.buttonText2}>Friends</Text></TouchableOpacity>
          <TouchableOpacity style={stylesProfile.friendsButton}><Text style={stylesProfile.buttonText2}>Messages</Text></TouchableOpacity>
        </View>
        {/* "About Me" Section */}
        <Text style={stylesProfile.generalText}>Biography</Text>
        <View style={stylesProfile.Square}/>
        {/* Musical Background */}
        <Text style={stylesProfile.generalText}>Musical Background</Text>
        <View style={stylesProfile.Square}/>
        {/* Church Experience */}
        <Text style={stylesProfile.generalText}>Church Experience</Text>
        <View style={stylesProfile.Square}/>
        {/* "Upcoming Events" Section */}
        <Text style={stylesProfile.generalText}>Upcoming Events</Text>
        <View style={stylesProfile.Square}/>
      </ScrollView>
    </View>
  );
};
