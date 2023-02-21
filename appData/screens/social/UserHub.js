import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';

//import for navigation
import Routes from '../Navigation/constants/Routes.js';
import colors from '../../../config/colors';

import ProfileImage from '../../components/profileImage.js';
import { FlatList } from 'react-native-gesture-handler';
import { FirebaseButler } from "../../components/classes";
import { ScaleFromCenterAndroid } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets.js';
import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors.js';

const screenHeight = Dimensions.get('window').height;

export default function UserHub({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const [musicians, setMusicians] = React.useState(["One", "Two", "Three"]);

  const renderMusician = (object) => {
    let item = object.item.info;
    let musicianId = object.item.id;
    if (item) {
      //Location formatting
      let locationString = `${item.city}, ${item.state} ${item.zipCode}`;
      return (
          <TouchableOpacity onPress = {() => navigation.navigate(Routes.publicProfile, {...props, selectedUserId: musicianId})} style={[musicianStyles.boxOne]}>
              <View style={{width: "100%", paddingBottom: "10%", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>
                  <View style={{padding: "2%", margin: "5%"}}>
                      <ProfileImage userId = {musicianId} size = {"medium"}/>
                  </View>
                  <Text style={[musicianStyles.boxText, musicianStyles.topText]}> {item.name || "No Name"} </Text>
                  {/* <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring Billy Joel</Text> */}
                  {/*<Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>{locationString}</Text>  */}
                  <View style={musicianStyles.informationBox}>
                      <View style={{position: "relative", flexDirection: "row", width: "30%", alignItems: "center"}}>
                      <Image style={{height: 20, width: 20, position: "relative", /*left: "10%"*/}} source={require('../../../assets/locationpin.png')}></Image>
                        <Text>Ephrata, PA</Text>
                      </View>
                      <View style={musicianStyles.verticalLine}></View>
                      <View style={{position: "relative", width: "30%", alignItems: "center"}}>
                        <Text>Piano</Text>
                      </View>
                  </View>
                  {/* <Text style={{position: "relative", left: "40%"}}> More</Text> */}
              </View>
          </TouchableOpacity>
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
 
      {/* <View style={stylesPortrait.container}> */}
        {/* Container for everything below the logo */}
        {/* <View style={stylesPortrait.contentDashContainer}> */}
          <View style = {musicianStyles.musicianContainer}>
            <FlatList 
              data = {Object.values(musicians)}
              style = {{flex: 1, width: "100%", backgroundColor: "white"}}
              renderItem = {renderMusician}
            />
          </View>
        {/* </View> */}
      {/* </View> */}
     </View> 
  );
}

{/* <ScrollView style={stylesPortrait.userHubScroll}>

<TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
  <View>
    <View style = {{flexDirection: "row"}}>
      <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "XULgbwAM0HNd8CdVu6Mja1pGrYF3"})}>
        <ProfileImage userId = {"XULgbwAM0HNd8CdVu6Mja1pGrYF3"} size = {"small"}/>
      </TouchableHighlight>
      <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
        Jen Johnson
      </Text>  
    </View>
    <Text style={{lineHeight: 30, color: "#000000"}}> 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
      augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
      imperdiet est nisi interdum neque.
      {'\n'}
      {'\n'}
      Instrument: Guitar 
      {'\n'}
      Location: Mechanicsburg, PA</Text></View>
   <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
   
</TouchableOpacity>

<TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
  <View>
    <View style = {{flexDirection: "row"}}> 
      <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "RJ85S4CIw3eMyVvXbce6oCnNehJ2"})}>
          <ProfileImage userId = {"RJ85S4CIw3eMyVvXbce6oCnNehJ2"} size = {"small"}/>
      </TouchableHighlight>
        <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
        David Schmitt
      </Text>  
    </View>
    <Text style={{lineHeight: 30, color: "#000000"}}> 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
      augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
      imperdiet est nisi interdum neque.
      {'\n'}
      {'\n'}
      Instrument: Piano 
      {'\n'}
      Location: Mechanicsburg, PA</Text></View>
   <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
</TouchableOpacity>

<TouchableOpacity activeOpacity={1} style={[stylesPortrait.dashboardButton]}>
  <View>
    <View style = {{flexDirection: "row"}}> 
      <TouchableHighlight style={{height: 50, width: 50}} onPress = {() => navigation.navigate(Routes.publicProfile, {userId, selectedUserId: "QtqEJiGOSKPlP6LsUsRYtaloZba2"})}>
          <ProfileImage userId = {"QtqEJiGOSKPlP6LsUsRYtaloZba2"} size = {"small"}/>
      </TouchableHighlight>
      <Text style={{marginLeft: "5%", lineHeight: 30, color: "#000000", fontWeight: "bold", fontSize: 15, fontFamily: "RNSMiles"}}> 
        Laura Scott
      </Text>  
    </View>
    <Text style={{lineHeight: 30, color: "#000000"}}> 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Maecenas vitae justo ipsum. Morbi sed mauris ante.Quisque semper,
      augue fringilla pretium laoreet, tellus metus sodales dui, vitae 
      imperdiet est nisi interdum neque.
      {'\n'}
      {'\n'}
      Instrument: Drums 
      {'\n'}
      Location: Mechanicsburg, PA</Text></View>
   <Image style={{height: 15, width: 15}} source={require('../../../assets/heart.png')}></Image>
</TouchableOpacity>
</ScrollView> */}

const musicianStyles = StyleSheet.create({
  boxOne:
  {
      backgroundColor: "#DBE9EC",
      flex: 1,
      padding: "2%",
      borderRadius: 30,
      flexDirection: "column",
      // justifyContent: "space-between",
      alignItems: "center",
      margin: "2%"
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