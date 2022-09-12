import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import colors from '../../config/colors.js'
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../global/components';
import Geocoder from 'react-native-geocoding';

export default function LocationData({ navigation }) {
  //Javascript goes here!!!

  // Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyCqVqHhnM6uxH_4RoTm3Z9g9-vqp0sbA84"); // use a valid API key

  let address = "";

  //Search by address
Geocoder.from()
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));

  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text >Hello World</Text>
      <Input placeHolderText = {"Enter Address"} func = {(val) => address = val}></Input>
    </View> 
  );    
};
 
const styles = StyleSheet.create({
  style:
  {
    
  }
}); 