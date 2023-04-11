import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
// import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
// import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

//import for navigation
import Routes from '../Navigation/constants/Routes.js';
import colors from '../../../config/colors';

import ProfileImage from '../../components/profileImage.js';
import { FlatList } from 'react-native-gesture-handler';
import { FirebaseButler } from "../../components/classes";
// import { ScaleFromCenterAndroid } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets.js';
// import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors.js';
import {LinearGradient} from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;

export default function UserHub({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const [musicians, setMusicians] = React.useState(["One", "Two", "Three"]);

  const renderMusician = (object) => {
    let item = object.item.info;
    let musicianId = object.item.id;
    if (item) {
      // Icon mapping
      let iconMapping = {
        "Piano": "piano",
        "Bass" : "guitar-pick",
        "Acoustic guitar": "guitar-acoustic",
        "Electric guitar": "guitar-electric",
        "Drums": "alpha-d-circle",
        "Vocalist": "microphone-variant"
      }

      let finalInstrumentIcons = [];
      let instruments = item?.instruments || [];
      for (let instrument of instruments) {
        let instrumentName = instrument.instrumentName;
        let icon = iconMapping[instrumentName];
        finalInstrumentIcons.push({name: instrumentName, icon});
      }

      const renderIconList = (object) => {
        let instrument = object.item;
        return (
          <View style = {{alignItems: "center", padding: "2%"}}>
            <IconButton
              size = {20}
              icon = {instrument.icon}
            />
            <Text style = {{fontSize: 10}}>{instrument.name}</Text>
          </View>
        )
      }
      
      // Location formatting
      let address = item?.address || '';
      let state = item?.state;
      let city = item?.city;
      let zip = item?.zipCode;
      let locationString = "This user has no location data";
      if (city && state && zip) locationString = `${address} ${city}, ${state} ${zip}`;
      return (
        <View style={[musicianStyles.boxOne]}>  
          <LinearGradient
            colors={['#FFE5B4', '#DBE9EC']}
            style={musicianStyles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
              <View style={{width: "100%", paddingBottom: "10%", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>
                  <View style = {{flexDirection: 'row', width: '100%', alignItems: "center"}}>
                    <TouchableOpacity onPress = {() => navigation.navigate(Routes.publicProfile, {...props, selectedUserId: musicianId})} style={{padding: '2%', width: '100%', alignItems: 'center'}}>
                      <View style={{padding: "2%", margin: "5%"}}>
                          <ProfileImage userId = {musicianId} size = {"medium"}/>
                      </View>
                      <Text style={[musicianStyles.boxText, musicianStyles.topText]}> {item.name || "No Name"} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={musicianStyles.informationBox}>
                      <View style={{position: "relative", flexDirection: "row", width: "30%", alignItems: "center"}}>
                        <Image style={{height: 20, width: 20, position: "relative"}} source={require('../../../assets/locationpin.png')}></Image>
                        <Text>{locationString}</Text>
                      </View>
                      <View style={musicianStyles.verticalLine}></View>
                      <View style={{position: "relative", flexDirection: "row", width: "35%"}}>
                        <ScrollView>
                          <FlatList
                            data = {finalInstrumentIcons}
                            horizontal = {true}
                            style = {{flex: 1}}
                            renderItem = {renderIconList} 
                          />
                        </ScrollView>
                      </View>
                  </View>
              </View>
          </LinearGradient>
        </View>
      )
    }
  }

  async function getMusicians() {
    // get list of musicians from firebase
    let fbMusicians = await FirebaseButler.fbGet(`Musicians`);

    // setup array which will hold all of the musicians
    let musiciansArray = [];
    
    for (let musicianId of fbMusicians) {
      let musician = await FirebaseButler.fbGet(`Users/${musicianId}`);
      musician.id = musicianId;
      musiciansArray.push(musician);
    }

    setMusicians(musiciansArray);
  }

  useEffect(() => {
    getMusicians();
  }, [])

  return (
    <View style={{flex: 1, alignItems: "center", backgroundColor: "white"}}>
      {/* Container for everything below the logo */}
      <View style = {musicianStyles.musicianContainer}>
        <FlatList 
          data = {Object.values(musicians)}
          style = {{flex: 1, width: "100%", backgroundColor: "white"}}
          renderItem = {renderMusician}
        />
      </View>
    </View> 
  );
}

const musicianStyles = StyleSheet.create({
  boxOne:
  {
      // backgroundColor: "#FFE5B4",
      flex: 1,
      padding: "2%",
      borderRadius: 30,
      flexDirection: "column",
      // justifyContent: "space-between",
      alignItems: "center",
      margin: "2%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },

  informationBox:
  {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingTop: "2%",
      paddingBottom: "2%",
      width: "100%",
  },

  veryTopBox:{
    marginTop: "5%",
  },

  boxText:{
    marginBottom: "2%",
    padding: "2%",
    fontSize: screenHeight/70
  },
  
  topText:{
    // fontSize: 12
    fontFamily: "RNSMiles",
    fontWeight: "bold",
    color: "#e56a17",
    fontSize: 20
    },

  profPic:{
    
  },
  musicianContainer:
  {
    width:"85%",
    height:"100%",
    backgroundColor: "white",
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  verticalLine: {
    height: '90%',
    width: 2,
    backgroundColor: '#909090',
    alignItems: "center",
    position: "relative",
    // right: "52%"
  }
});