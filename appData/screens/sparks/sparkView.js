import {StyleSheet, FlatList, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';
import Routes from '../Navigation/constants/Routes';

import { FirebaseButler, TDO } from "../../components/classes";

import { getDatabase, ref, set, get } from 'firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../../components/profileImage.js';

import {LinearGradient} from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;

export default function SparkView({ route, navigation }) {
    let sparkMilage = 5;
    let props = route.params;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3"

    const userLocation = {
        city: "Mechanicsburg",
        state: "Pennsylvania",
        zip: 17055
    };

    const [sparks, setSparks] = React.useState({});

    //spark code
    const renderSpark = (object) => {
        let item = object.item;
        if (item.info) {
            //Date Time string formatting
            // let sparkTimeObj = item.info?.times?.spark.TDO;
            // let sparkTDO = new TDO(0, 0, 0, 0, 0, 0, sparkTimeObj);
            // let finalTime = sparkTDO.getFormattedTime();
            // let finalDate = sparkTDO.getFormattedDateFormal();
            // let finalDateTime = `Starting at ${finalTime} on ${finalDate}`; 
            let sparkId = Object.keys(sparks)[object.index];
            let leaderId = item.roles.spark_leader;

            //Location formatting
            let locationObj = item.info.location;
            let locationString = `${locationObj?.address} ${locationObj?.city}, ${locationObj?.state} ${locationObj?.zip}`;
            
            return (
                <TouchableOpacity onPress = {() => navigation.navigate(Routes.sparkSummary, {...props, currentSparkId: sparkId})} 
                    style={[sparkViewStyles.boxOne]}
                >
                    {/* <ProfileImage userId = {leaderId} size = {"medium"}/>
                    <Text style={sparkViewStyles.boxText}> {item?.info?.name} </Text>
                    <Text style={{left: "30%"}}> More</Text> */}
                     {/* <View style={sparkViewStyles.searchBar}>
                        <View style={sparkViewStyles.row2}>
                            <Image style={sparkViewStyles.searchIcon} source={require('../../../assets/searchIcon.png')}/>
                            <Text style={{color: "grey"}}>Search</Text>
                        </View>
                    </View> */}
                    <LinearGradient
                        colors={['#FFE5B4', '#DBE9EC']}
                        style={sparkViewStyles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}  >

                        <View style={{width: "100%", paddingBottom: "10%", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>
                                <View style={{padding: "2%", margin: "5%"}}>
                                     <ProfileImage userId = {leaderId} size = {"medium"}/>
                                </View>
                                <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}> {item?.info?.name} </Text>
                                <View style={sparkViewStyles.informationBox}>
                                    <View style={{position: "relative", flexDirection: "row", width: "30%", alignItems: "center"}}>
                                    <Image style={{height: 20, width: 20, position: "relative", /*left: "10%"*/}} source={require('../../../assets/locationpin.png')}></Image>
                                        <Text>Ephrata, PA</Text>
                                    </View>
                                    <View style={sparkViewStyles.verticalLine}></View>
                                    <View style={{position: "relative", width: "30%", alignItems: "center"}}>
                                        <Text>April 28, 2023 @ 8 p.m.</Text>
                                    </View>
                                </View>
                        </View>
                    </LinearGradient>

                </TouchableOpacity>
            )  
        }
    }

    function filterMyRole(spark, role) {
        //return true or false
        if (spark["roles"] && spark["roles"][role]?.set == true) {
            return true;
        }
        else {
            return false;
        }
        // if spark has role, return true, if not return false
    }
    

    async function filterByDistance(spark, distance) {
        //get location data from user (from userId)

        //build url with location data from spark (up top)

        //use url and these distances to get the distance between them (use code below)
        

        let userState = "PA";
        let userCity = "Lancaster";
        // let userState = await FirebaseButler.fbGet(`Users/${userId}/info/state`);
        // let userCity = await FirebaseButler.fbGet(`Users/${userId}/info/city`);


        let sparkCity = spark.info?.location.city;
        let sparkState = spark.info?.location.state;

        // let sparkCity = "Hagerstown";
        // let sparkState = "Maryland";


        var axios = require('axios');
        var config = {
             method: 'get',
             url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ userCity +'%2C%20'+ userState +'&destinations='+ sparkCity +'%2C%20'+ sparkState +'&units=imperial&key=AIzaSyCusL6lRbILhO9P7AyHSwpT-ZS6N5diyBQ',
             headers: { }
         };

         axios(config)
        .then(function (response) {
            let result = response.data;
            //console.log("result", result);
            let distanceString = result["rows"][0]["elements"][0]["distance"]["text"];
            // let distanceString = ;
            console.log("String", distanceString);
            //compare found distance in response to the distance parameter in this function

            

            let object = {
                "destination_addresses": ["Mechanicsburg, PA, USA"],
                "origin_addresses": ["Ephrata, PA 17522, USA"],
                "rows": [
                    {
                        "elements":[
                            {
                                "distance": {
                                "text":"50.8 mi",
                                "value":81768
                                },
                                "duration":{
                                    "text":"59 mins",
                                    "value":3516
                                },
                                "status":"OK"
                            }
                        ]
                    }
                ],
                "status":"OK"
            }
         })
         .catch(function (error) {
             console.log(error);
         });
    }

    //Run filter:  let filteredSparks = sparks.filter((spark) => filterMyRole(spark, <insertRole>));
    //Run filter:  let filteredSparks = sparks.filter((spark) => filterByDistance(spark, distance));

    // printFilterSparks();

    async function getSparks() {
        let fbSparks = await FirebaseButler.fbGet(`Sparks`);
        delete fbSparks.id;
        setSparks(fbSparks);
    }

    function printFilterSparks() {
        let filteredSparks = Object.entries(sparks).filter((spark) => filterMyRole(spark, "Piano"));
        let distanceSparks = Object.values(sparks).filter((spark) => filterByDistance(spark, 10));
        // console.log("Filtered Sparks", filteredSparks);
    }

    //Location code
    useEffect(() => {
        getSparks();
    }, [])
    
    return(
        <View style={[stylesPortrait.container, {alignItems: "center", backgroundColor: "white"}]}>
            <View style={[sparkViewStyles.sparkContainer]}>
                <FlatList 
                    data = {Object.values(sparks)}
                    style = {{width: "100%", height: "100%", backgroundColor: "white"}}
                    renderItem = {renderSpark}
                />
            </View>
        </View>
    );
}

const sparkViewStyles = StyleSheet.create({
    sparkContainer:
    {
        width:"85%",
        height:"100%",
        backgroundColor: "colors.secondary",
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 30,
        justifyContent: 'center',
      },

    searchBar: {
        width: "85%", 
        height: "6%", 
        backgroundColor: "#E7E6E6", 
        marginBottom: 25, 
        marginTop: 25, 
        borderRadius: 10,
        justifyContent: "center"
    },
    // boxOne:
    // {
    //     backgroundColor: "#DBE9EC",
    //     padding: "3%",
    //     borderRadius: 30,
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     margin: "5%"
    // },
    // boxText:{
    //     padding: "5%",
    //     fontSize: screenHeight/70,
    //     fontFamily: "RNSMiles",
    //     fontWeight: "bold"
    // },

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