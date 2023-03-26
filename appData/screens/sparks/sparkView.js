import {StyleSheet, FlatList, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';
import Routes from '../Navigation/constants/Routes';
import { IconButton } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { FirebaseButler, TDO } from "../../components/classes";
import { getDatabase, ref, set, get } from 'firebase/database';
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
    const [sparksToShow, setSparksToShow] = React.useState(null);

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

    function filterByRole(spark, role) {
        // convert role to valid role key to index into spark roles
        let roleKey = role.split(' ').join('_');
        roleKey = roleKey.toLowerCase();
        let roles = spark['roles']?.[roleKey];
        let rolesArray = Object.values(roles);
        // filter out the "request" attribute in roles (because it doesn't have a 'final' attribute0)
        let finalRoles = rolesArray.filter((currRole) => currRole.final !== undefined);
        //return true or false based on whether the role is filled or not
        if (finalRoles.length != 0 && finalRoles.some((currRole) => currRole.final.length == 0)) return true;
        else return false;
    }
    

    async function filterByDistance(inputSparks, distance) {
        let filteredSparks = [];
        //get location data from user (from userId)
        let userState = await FirebaseButler.fbGet(`Users/${userId}/info/state`) || null;
        let userCity = await FirebaseButler.fbGet(`Users/${userId}/info/city`) || null;
        if (userState && userCity) {
            for (let spark of inputSparks) {    
                let sparkCity = spark.info?.location.city;
                let sparkState = spark.info?.location.state;
                
                // get distance data
                var axios = require('axios');
                var config = {
                     method: 'get',
                     url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ userCity +'%2C%20'+ userState +'&destinations='+ sparkCity +'%2C%20'+ sparkState +'&units=imperial&key=AIzaSyCusL6lRbILhO9P7AyHSwpT-ZS6N5diyBQ',
                     headers: { }
                 };
        
                let response = await axios(config);
                let result = response.data;
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
                            filteredSparks.push(spark);
                        }
                    }
                } 
            }
        }

        return filteredSparks;
    }

    //Run filter:  let filteredSparks = sparks.filter((spark) => filterMyRole(spark, <insertRole>));
    //Run filter:  let filteredSparks = sparks.filter((spark) => filterByDistance(spark, distance));

    // printFilterSparks();

    const renderDropDownItem = (item) => {
        return (
            <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
                <Text> {item} </Text>
            </View>
        )
    }

    // Filter Content variables
    // filter code that doesn't work : (
    // const [filters, setFilters] = React.useState([
    //     {
    //         parts: []    
    //     }
    // ]);
    // const renderFilter = (object) => {
    //     console.log("Object", object.item.parts[0]);
    //     return (
    //         object.item.parts[0]
    //     );
    // }
    const [roleTypes, setRoleTypes] = React.useState([]);
    const [roleType, setRoleType] = React.useState(null);
    const [toggled, setToggled] = React.useState(false);
    const [filterType, setFilterType] = React.useState('Filter Type');
    let filterTypes = ['Role', 'Distance'];
    const [searchText, setSearchText] = React.useState(null);
    const [inputFilterText, setInputFilterText] = React.useState(null);
    const [filterText, setFilterText] = React.useState('');
    const [endingText, setEndingText] = React.useState('');

    async function searchAndFilter() {
        let startingSparks = [...Object.values(sparks)];
        let filteredSparks;
        if (toggled) {
            // filter sparks with whatever filter is on
            if (filterType == 'Role' && roleType) {
                filteredSparks = startingSparks.filter((spark) => filterByRole(spark, roleType));
            }
            else if (filterType == "Distance" && inputFilterText) {
                let distance = parseInt(inputFilterText);
                filteredSparks = await filterByDistance(startingSparks, distance);
            }
            else {
                filteredSparks = [...startingSparks];
            }
        }
        else {
            filteredSparks = startingSparks;
        }

        // filter by search
        let finalSparks = filteredSparks.filter((spark) => {
            if (searchText) {
                return spark?.info?.name?.includes(searchText);
            }
            else {
                return true;
            }
        });
        setSparksToShow([...finalSparks]);
    }

    async function getRoles() {
        let roles = await FirebaseButler.fbGet('Models/instruments');
        setRoleTypes(roles);
    }

    async function getSparks() {
        let fbSparks = await FirebaseButler.fbGet(`Sparks`);
        delete fbSparks.id;
        setSparks(fbSparks);
        setSparksToShow(Object.values(fbSparks));
    }

    //Location code
    useEffect(() => {
        getSparks();
        getRoles();
    }, [])
    
    return(
        <View style={[stylesPortrait.container, {alignItems: "center", backgroundColor: "white"}]}>
            <Collapse 
                style = {{height: "13%", width: "100%"}} 
                onToggle = {(toggled) => {
                    setToggled(toggled)
                    if (!toggled) setSparksToShow([...Object.values(sparks)])
                }}
            >
                <CollapseHeader style = {sparkViewStyles.searchTab}>
                    <View style={sparkViewStyles.searchBar}>
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
                    <View style = {[sparkViewStyles.filterSection, { height: 100}]}>
                        <Dropdown 
                            style={sparkViewStyles.dropDown} 
                            data={filterTypes} 
                            renderItem={renderDropDownItem}
                            maxHeight = {"40%"}
                            dropdownPosition = {"bottom"}
                            itemTextStyle = {{color: "black", fontSize: 2}}
                            onChange = {(value) => {
                                setFilterType(value)
                                if (value == 'Role') {
                                    setFilterText('with');
                                    setEndingText('open');
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
                                style = {sparkViewStyles.filterInput}
                                onChangeText = {(text) => setInputFilterText(text)}
                            />
                        }

                        {
                            filterType && filterType == 'Role' &&
                            <Dropdown 
                                style={sparkViewStyles.dropDown} 
                                data={roleTypes} 
                                renderItem={renderDropDownItem}
                                maxHeight = {"40%"}
                                dropdownPosition = {"bottom"}
                                itemTextStyle = {{color: "black", fontSize: 2}}
                                onChange = {(value) => setRoleType(value)}
                                placeholder = {roleType}
                                placeholderStyle = {{fontSize: 12, color: 'white', marginLeft: "30%"}}
                                value = {roleType}
                                containerStyle = {{top: -30}}
                            />
                        }

                        <Text> {endingText} </Text>
                    </View>
                    {/* </View> */}
                </CollapseBody>
            </Collapse>
            <View style={[sparkViewStyles.sparkContainer]}>
                {
                    sparksToShow && Object.values(sparksToShow).length != 0 &&
                    <FlatList 
                        data = {sparksToShow}
                        style = {{width: "100%", height: "50%"}}
                        renderItem = {renderSpark}
                    />
                }
                {
                    (!sparksToShow || Object.values(sparksToShow).length == 0) &&
                    <View style = {{width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center'}}>
                        <Text style = {{fontSize: 20}}> No sparks found </Text>
                    </View>  
                }
            </View>
        </View>
    );
}

const sparkViewStyles = StyleSheet.create({
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
    sparkContainer:
    {
        width:"85%",
        height:"100%",
        backgroundColor: "colors.secondary",
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems: "center",
        zIndex: -1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 30,
        justifyContent: 'center',
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