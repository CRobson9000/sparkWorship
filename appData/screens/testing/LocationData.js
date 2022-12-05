import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { Input } from '../../components/components';
import Geocoder from 'react-native-geocoding';


export default function LocationData({ navigation }) {
  //Javascript goes here!!!

  let address = "";
  let address2 = "";

  // Initialize the module (needs to be done only once)
  Geocoder.init("AIzaSyCqVqHhnM6uxH_4RoTm3Z9g9-vqp0sbA84"); // use a valid API key
  
  
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=AIzaSyCusL6lRbILhO9P7AyHSwpT-ZS6N5diyBQ',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

  function searchByAddress(myAddress){
    //Search by address
    let myPromise = new Promise((myResolve, myReject) => {
      Geocoder.from(myAddress)
      .then(json => {
        let location = json.results[0].geometry.location;
        myResolve(location);
      })
      .catch(error => {
        console.warn(error);
        myReject("error");
      });
        
    })
    return myPromise;
  }

  async function getLocation(){
    let location1 = await searchByAddress(address);
    let location2 = await searchByAddress(address2);
    console.log(location1, location2);
  }

  let sparkMilage = 5;

    const userLocation = {
        city: "Mechanicsburg",
        state: "Pennsylvania",
        zip: 17055
    };

    const sparks =[
        {
            id:
            {
                info: {
                    location: {
                        address: {
                            address: "7693 Browns Mill Rd",
                            city: "Chambersburg",
                            state: "Pennsylvania",
                            zip: 17202,
                        },
                        lat: 39.833128472575915,
                        lon: -77.7115903252737
                    }
                }
            }
        },
        {
            id: 
            {
                info: {
                    location: {
                        address: {
                            address: "2150 Bumble Bee Hollow Rd",
                            city: "Mechanicsburg",
                            state: "Pennsylvania",
                            zip: 17055
                        },
                        lat: 40.176332622843134,
                        lon: -76.98694473369463
                    }
                }
            }
        }
    ]

    sparks.filter(spark => checkMiles(spark));

    function checkMiles(spark) {
      var config = {
        method: 'get',
        url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + userLocation + "&destinations=" + sparks[0,1] + "&units=imperial&key=AIzaSyCusL6lRbILhO9P7AyHSwpT-ZS6N5diyBQ",
        headers: { }
      };
      
    }

  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text >Location Data</Text>
      <Input placeHolderText = {"Enter Address 1"} func = {(val) => address = val}></Input>
      <Input placeHolderText = {"Enter Address 2"} func = {(val) => address2 = val}></Input>
  

    
      <TouchableOpacity style={{borderColor: "black", padding: 10, borderWidth: 2}}activeOpacity={1} onPress = {() => getLocation()}>
        <Text >Get lat and lon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{borderColor: "black", padding: 10, borderWidth: 2, margin: 20}}activeOpacity={1} onPress = {() => navigation.navigate("Router")}>
        <Text> Back </Text>
      </TouchableOpacity>

    </View> 
  );    
};