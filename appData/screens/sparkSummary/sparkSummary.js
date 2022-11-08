import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { stylesSummary } from "../../styles/summary.js";

export default function SparkSummary({ navigation }) {
  return(
    <View style={stylesSummary.MainContainer}>
      <View style={[stylesSummary.topBorder, {height: "40%"}]}>
        {/* Profile Picture */}
        <Image style={[stylesSummary.profilePicture, {height: "45%"}]} source={require("../../../assets/exampleprofilepic.jpg")}></Image>
        {/* First and Last Name */}
        <Text style={[stylesSummary.boldText, {fontSize: 10}]}>Austin Smith</Text>
        {/* Title */}
        <Text style={stylesSummary.title}>Instrumentalist</Text>
        {/* Location */}
        <View style={stylesSummary.row}>
          <Image style={stylesSummary.locationPin} source={require("../../../assets/locationpin.png")}></Image>
          <Text style={stylesSummary.locationText}>Nashville, Tenessee</Text>
        </View>
        {/* Contact Buttons */}
        <View style={stylesSummary.contactButtons}>
          {/* Message */}
          <TouchableOpacity style={stylesSummary.button}><Image source={require("../../../assets/messageicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
          {/* Email */}
          <TouchableOpacity style={stylesSummary.button}><Image source={require("../../../assets/mailicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
          {/* Call */}
          <TouchableOpacity style={stylesSummary.button}><Image source={require("../../../assets/phoneicon.png")} resizeMode="contain" style={{flex:.6 }}></Image></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};