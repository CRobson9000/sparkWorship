import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions, Image } from 'react-native';
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

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Dropdown } from 'react-native-element-dropdown';

import ProfileImage from '../../components/profileImage.js';
import { FlatList } from 'react-native-gesture-handler';
import { FirebaseButler } from "../../components/classes";
import {LinearGradient} from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;

export default function UserHub({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  const [musicians, setMusicians] = React.useState(["One", "Two", "Three"]);
  const [musiciansToShow, setMusiciansToShow] = React.useState(null);

  const renderMusician = (object) => {
    let item = object.item.info;
    let musicianId = object.item.id;
    if (item) {
      //Location formatting
      let locationString = `${item.city}, ${item.state} ${item.zipCode}`;
      return (
          <TouchableOpacity onPress = {() => navigation.navigate(Routes.publicProfile, {...props, selectedUserId: musicianId})} style={[musicianStyles.boxOne]}>
              <LinearGradient
                        colors={['#FFE5B4', '#DBE9EC']}
                        style={musicianStyles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
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
                      <IconButton onPress = {() => navigation.navigate(Routes.chatList, route.params)}
                        icon = "piano"/>
                      </View>
                  </View>
              </View>
              </LinearGradient>
          </TouchableOpacity>
      )
    }
  }

  const renderDropDownItem = (item) => {
    return (
        <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text> {item} </Text>
        </View>
    )
  }

  // filtering code
  const [roleTypes, setRoleTypes] = React.useState([]);
  const [instrumentType, setInstrumentType] = React.useState(null);
  const [toggled, setToggled] = React.useState(false);
  const [filterType, setFilterType] = React.useState('Filter Type');
  let filterTypes = ['Distance', 'Instrument'];
  const [searchText, setSearchText] = React.useState(null);
  const [inputFilterText, setInputFilterText] = React.useState(null);
  const [filterText, setFilterText] = React.useState('');
  const [endingText, setEndingText] = React.useState('');

  function filterByInstrument(musician, instrumentName) {
    let instruments = musician?.info?.instruments;
    console.log("Instruments", instruments);
    //return true or false based on whether the role is filled or not
    if (instruments.length != 0 && instruments.some((currInstrument) => currInstrument.instrumentName == instrumentName)) return true;
    else return false;
  }

  async function filterByDistance(inputMusicians, distance) {
    let filteredSparks = [];
    //get location data from user (from userId)
    let userState = await FirebaseButler.fbGet(`Users/${userId}/info/state`) || null;
    let userCity = await FirebaseButler.fbGet(`Users/${userId}/info/city`) || null;
    if (userState && userCity) {
      for (let musician of inputMusicians) {    
        let musicianCity = musician.info?.city;
        let musicianState = musician.info?.state;

        console.log("User State", userState);
        console.log("User City", userCity);
        console.log('Musician State', musicianState);
        console.log('Musician City', musicianCity);
        
        // get distance data
        var axios = require('axios');
        var config = {
          method: 'get',
          url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ userCity +'%2C%20'+ userState +'&destinations='+ musicianCity +'%2C%20'+ musicianState +'&units=imperial&key=AIzaSyCusL6lRbILhO9P7AyHSwpT-ZS6N5diyBQ',
          headers: { }
        };

        let response = await axios(config);
        let result = response.data;
        console.log("Result", result);
        // only evaluate the spark if the distances inputted are correct
        if (result && result?.rows[0]?.elements?.[0].status != "NOT_FOUND") {
          let distanceVals = Object.values(result);
          let distanceElems = distanceVals?.[2]?.[0]?.elements;
          let distanceText = distanceElems?.[0]?.distance?.text;
          let distanceArray = distanceText?.split(" ");
          if (distanceArray.length != 0) {
            let finalDistance;
            // if the units on the distance string are miles, just parse the int.  
            if (distanceArray[1] == 'ft') {
                let feetDistance = parseInt(distanceArray[0]);
                finalDistance = feetDistance / 5280.00 
            } 
            // if the units on the distance are feet, convert to miles
            else finalDistance = parseInt(distanceArray[0]);
            // filter sparks by the distance inputted 
            if (finalDistance < distance) {
                filteredSparks.push(musician);
            }
          }
        } 
      }
    }

    return filteredSparks;
  }

  async function searchAndFilter() {
      let startingMusicians = [...Object.values(musicians)];
      let filteredMusicians;
      if (toggled) {
          // filter sparks with whatever filter is on
          if (filterType == 'Instrument' && instrumentType) {
              filteredMusicians = startingMusicians.filter((spark) => filterByInstrument(spark, instrumentType));
              console.log("Filtered Musicians", filteredMusicians);
          }
          else if (filterType == "Distance" && inputFilterText) {
              let distance = parseInt(inputFilterText);
              filteredMusicians = await filterByDistance(startingMusicians, distance);
          }
          else {
              filteredMusicians = [...startingMusicians];
          }
      }
      else {
          filteredMusicians = startingMusicians;
      }

      // filter by search
      let finalMusicians = filteredMusicians.filter((spark) => {
          if (searchText) {
              return spark?.info?.name?.includes(searchText);
          }
          else {
              return true;
          }
      });
      setMusiciansToShow([...finalMusicians]);
  }

  async function getRoles() {
      let roles = await FirebaseButler.fbGet('Models/instruments');
      setRoleTypes(roles);
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
    setMusiciansToShow(Object.values(musiciansArray));
  }

  useEffect(() => {
    getRoles();
    getMusicians();
  }, [])

  return (
    <View style={{flex: 1, alignItems: "center", backgroundColor: "white"}}>
      {/* Container for everything below the logo */}
      <Collapse 
          style = {{height: "13%", width: "100%"}} 
          onToggle = {(toggled) => {
              setToggled(toggled)
              if (!toggled) setMusiciansToShow([...Object.values(musicians)])
          }}
      >
        <CollapseHeader style = {musicianStyles.searchTab}>
            <View style={musicianStyles.searchBar}>
                <TextInput 
                    style= {{marginLeft: "10%", color: "grey", width: '65%', height: "100%"}}
                    placeholder = {'Search'}
                    onChangeText = {(text) => setSearchText(text)}
                />
                <IconButton
                    icon = {'magnify'}
                    style = {{left: '50%'}}
                    onPress = {() => searchAndFilter()}
                />
            </View>
            <IconButton
                icon = {'filter'}
            />              
        </CollapseHeader>
        <CollapseBody style = {{width: "100%"}}>
            {/* <View style = {sparkViewStyles.filterSection} > */}
            {/* height of button (70) and all filters (each filter height is 100)} */}
            {/* ((screenHeight /  100) * (filters.length || 0) + 70) */}
            <View style = {[musicianStyles.filterSection, { height: 100}]}>
                <Dropdown 
                    style={musicianStyles.dropDown} 
                    data={filterTypes} 
                    renderItem={renderDropDownItem}
                    maxHeight = {"40%"}
                    dropdownPosition = {"bottom"}
                    itemTextStyle = {{color: "black", fontSize: 2}}
                    onChange = {(value) => {
                        setFilterType(value)
                        if (value == 'Instrument') {
                            setFilterText('played is');
                            setEndingText(null);
                        }
                        else {
                            setFilterText('within');
                            setEndingText('miles');
                        }
                    }}
                    placeholder = {filterType}
                    placeholderStyle = {{fontSize: 12, color: 'white', marginLeft: "30%"}}
                    value = {filterType}
                    containerStyle = {{top: -30}}
                />
                <Text> {filterText} </Text>
                {
                    filterType && filterType == 'Distance' &&
                    <TextInput
                        style = {musicianStyles.filterInput}
                        onChangeText = {(text) => setInputFilterText(text)}
                    />
                }

                {
                    filterType && filterType == 'Instrument' &&
                    <Dropdown 
                        style={musicianStyles.dropDown} 
                        data={roleTypes} 
                        renderItem={renderDropDownItem}
                        maxHeight = {"40%"}
                        dropdownPosition = {"bottom"}
                        itemTextStyle = {{color: "black", fontSize: 2}}
                        onChange = {(value) => setInstrumentType(value)}
                        placeholder = {instrumentType}
                        placeholderStyle = {{fontSize: 12, color: 'white', marginLeft: "30%"}}
                        value = {instrumentType}
                        containerStyle = {{top: -30}}
                    />
                }

                <Text> {endingText} </Text>
            </View>
            {/* </View> */}
          </CollapseBody>
      </Collapse>
      <View style = {musicianStyles.musicianContainer}>
        {
          musiciansToShow && Object.values(musiciansToShow).length != 0 &&
          <FlatList 
            data = {musiciansToShow}
            style = {{flex: 1, width: "100%", backgroundColor: "white"}}
            renderItem = {renderMusician}
          />
        }
        {
          (!musiciansToShow || Object.values(musiciansToShow).length == 0) &&
          <View style = {{width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {{fontSize: 20}}> No musicians found </Text>
          </View>  
        }
      </View>
    </View> 
  );
}

const musicianStyles = StyleSheet.create({
  filterInput: {
    width: "30%",
    height: "40%",
    borderRadius: 10,
    margin: "5%",
    paddingLeft: "5%",
    backgroundColor: "white"
  },
  dropDown: {
      height: "60%",
      width: '20%',
      backgroundColor: "rgb(0, 97, 117)", 
      borderRadius: 10, 
      margin: "5%",
  },
  filterSection: {
      width: "100%",
      backgroundColor: "#F9CBB1",
      justifyContent: "center",
      alignItems: 'center',
      zIndex: 3,
      flexDirection: "row"
  },
  searchTab: {
      flexDirection: 'row', 
      width: "100%",
      paddingTop: "3%", 
      paddingBottom: "3%", 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#F2905B',
      // backgroundColor: "#F9CBB1"
  },
  searchBar: {
      flexDirection: 'row',
      height: "80%", 
      width: "80%", 
      borderRadius: 20, 
      backgroundColor: "#E7E6E6", 
  },
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
    alignItems: "center",
    zIndex: -1
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