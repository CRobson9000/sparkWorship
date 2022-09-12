import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { Input } from '../global/components';
import Geocoder from 'react-native-geocoding';

export default function LocationData({ navigation }) {
  //Javascript goes here!!!

  let address = "";

  // Initialize the module (needs to be done only once)
  Geocoder.init("AIzaSyCqVqHhnM6uxH_4RoTm3Z9g9-vqp0sbA84"); // use a valid API key

  function searchByAddress(){
    //Search by address
    Geocoder.from(address)
    .then(json => {
      var location = json.results[0].geometry.location;
      console.log(location);
    })
    .catch(error => console.warn(error));
  }

  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text >Location Data</Text>
      <Input placeHolderText = {"Enter Address"} func = {(val) => address = val}></Input>

      <TouchableOpacity style={{borderColor: "black", padding: 10, borderWidth: 2}}activeOpacity={1} onPress = {() => searchByAddress()}>
        <Text >Get lat and lon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{borderColor: "black", padding: 10, borderWidth: 2, margin: 20}}activeOpacity={1} onPress = {() => navigation.navigate("DatabaseTest")}>
        <Text> Back </Text>
      </TouchableOpacity>

    </View> 
  );    
};