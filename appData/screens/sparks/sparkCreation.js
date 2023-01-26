import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { IconButton } from 'react-native-paper';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';

import { Input, Slider, DropDown } from '../../components/components';
import { Observable, TDO } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';

import Routes from "../Navigation/constants/Routes";

export default function SparkCreation({ route, navigation }) {
    //set environment variables
    let props = route.params;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
    let update = useRef({});
    let rolesArray = useRef([]);

    // -------------------
    // Saving Inputs code
    // -------------------

    //inputs to save
    let inputs = {
        address: new Observable("", () => updatePayload(inputs.address.getVal(), "address")),
        city: new Observable("", () => updatePayload(inputs.city.getVal(), "city")),
        state: new Observable("", () => updatePayload(inputs.state.getVal(), "state")),
        zip: new Observable("", () => updatePayload(inputs.zip.getVal(), "zip")),

        publishedDay: new Observable("", () => updatePayload(inputs.publishedDay.getVal(), "publishedDay")),
        publishedMonth: new Observable("", () => updatePayload(inputs.publishedMonth.getVal(), "publishedMonth")),
        publishedYear: new Observable("", () => updatePayload(inputs.publishedYear.getVal(), "publishedYear")),
        publishedHours: new Observable("", () => updatePayload(inputs.publishedHours.getVal(), "publishedHours")),
        publishedMinutes: new Observable("", () => updatePayload(inputs.publishedMinutes.getVal(), "publishedMinutes")),
        publishedAmPM: new Observable("", () => updatePayload(inputs.publishedAmPM.getVal(), "publishedAmPM")),

        rehearsalDay: new Observable("", () => updatePayload(inputs.rehearsalDay.getVal(), "rehearsalDay")),
        rehearsalMonth: new Observable("", () => updatePayload(inputs.rehearsalMonth.getVal(), "rehearsalMonth")),
        rehearsalYear: new Observable("", () => updatePayload(inputs.rehearsalYear.getVal(), "rehearsalYear")),
        rehearsalHours: new Observable("", () => updatePayload(inputs.rehearsalHours.getVal(), "rehearsalHours")),
        rehearsalMinutes: new Observable("", () => updatePayload(inputs.rehearsalMinutes.getVal(), "rehearsalMinutes")),
        rehearsalAmPM: new Observable("", () => updatePayload(inputs.rehearsalAmPM.getVal(), "rehearsalAmPM")),

        sparkDay: new Observable("", () => updatePayload(inputs.sparkDay.getVal(), "sparkDay")),
        sparkMonth: new Observable("", () => updatePayload(inputs.sparkMonth.getVal(), "sparkMonth")),
        sparkYear: new Observable("", () => updatePayload(inputs.sparkYear.getVal(), "sparkYear")),
        sparkHours: new Observable("", () => updatePayload(inputs.sparkHours.getVal(), "sparkHours")),
        sparkMinutes: new Observable("", () => updatePayload(inputs.sparkMinutes.getVal(), "sparkMinutes")),
        sparkAmPM: new Observable("", () => updatePayload(inputs.sparkAmPM.getVal(), "sparkAmPM"))
    };

    const updatePayload = (updateVal, updateName) =>
    {
        update[updateName] = updateVal;
    }

    const updateToStart = () => {
        for (let key in inputs) {
            let updateVal = update[key];
            if (updateVal) {
                let obj = inputs[key];
                obj.setVal(updateVal);
            }
        }
    }

    //update firebase with update object
    async function sendPayload() {
        //delete current variable, which is created when using "useRef()"
        delete update.current;

        // //"set-up" variables
        const db = getDatabase();

        //create a new id for this spark, which gives it a place in memory to store all its data
        const addReference = ref(db, "Sparks");
        let sparkIdStart = push(addReference, {status: "proposed"});
        let sparkIdArray = sparkIdStart.toString().split("/");
        let sparkId = sparkIdArray[sparkIdArray.length - 1];
        console.log(sparkId);

        // //-------------------------------------------
        // // populate database with values from update
        // //------------------------------------------- 
        function setUpRoleSpace(sparkId, role) {
            let rolePromise = new Promise((resolve, reject) => {
                const roleReference = ref(db, `Sparks/${sparkId}/roles/${role}`)
                set(roleReference, {
                    requested: {id: ""},
                    final: "" 
                }).then(() => resolve());
            })
            return rolePromise;
        }

        //populate location area
        if (update["address"]) {
            const addressReference = ref(db, `Sparks/${sparkId}/info/location/address`);
            set(addressReference, update["address"]);
        }
        if (update["city"]) {
            const cityReference = ref(db, `Sparks/${sparkId}/info/location/city`);
            set(cityReference, update["city"]);
        }
        if (update["state"]) {
            const stateReference = ref(db, `Sparks/${sparkId}/info/location/state`);
            set(stateReference, update["state"]);
        }
        if (update["zip"]) {
            const zipReference = ref(db, `Sparks/${sparkId}/info/location/zip`);
            set(zipReference, update["zip"]);
        }

        //populate time area
        //published time block
        if (update["sparkHours"] && update["sparkMinutes"] && update["sparkMonth"] && update["sparkDay"] &&  update["sparkYear"]) {
            const sparkTimeReference = ref(db, `Sparks/${sparkId}/info/times/spark`);
            let sparkTimeTDO = new TDO(
                update["sparkHours"], 
                update["sparkMinutes"],
                0,
                update["sparkMonth"],
                update["sparkDay"],
                update["sparkYear"],
            )
            set(sparkTimeReference, sparkTimeTDO);
        }

        //published time block
        if (update["rehearsalHours"] && update["rehearsalMinutes"] && update["rehearsalMonth"] && update["rehearsalDay"] && update["rehearsalYear"]) {
            const rehearsalTimeReference = ref(db, `Sparks/${sparkId}/info/times/rehearsal`);
            let rehearsalTimeTDO = new TDO(
                update["rehearsalHours"], 
                update["rehearsalMinutes"],
                0,
                update["rehearsalMonth"],
                update["rehearsalDay"],
                update["rehearsalYear"],
            )
            set(rehearsalTimeReference, rehearsalTimeTDO);
        }

        //published time block
        if (update["publishedHours"] && update["publishedMinutes"] && update["publishedMonth"] && update["publishedDay"] &&  update["publishedYear"]) {
            const publishedTimeReference = ref(db, `Sparks/${sparkId}/info/times/published`);
            let publishedTimeTDO = new TDO(
                update["publishedHours"], 
                update["publishedMinutes"],
                0,
                update["publishedMonth"],
                update["publishedDay"],
                update["publishedYear"],
            )
            set(publishedTimeReference, publishedTimeTDO);
        }

        //setup roles space
        if (rolesArray["current"].length != 0) {
            for (let i = 0; i < rolesArray["current"].length; i++) {
                let role = rolesArray["current"][i];
                await setUpRoleSpace(sparkId, role);
            }
        }

        navigation.navigate("Navigator");
    }
    // --------------
    // Drop Down Code
    // --------------

    function getModelsFromDb(reference) {
        const modelPromise = new Promise((resolve, reject) => {
            get(reference).then((snapshot) => {
                const myData = snapshot.val();
                if (myData) {
                    resolve(myData);
                } 
                else {
                    reject(null);
                }
            });
        });
        return modelPromise;
    }

    // ------------
    // Phases Code
    // ------------

    // Location Entry
    const Screen1 = () => {
        return(
            <View style={[sparkViewStyles.sparkContainer]}>
                <View style={[sparkViewStyles.sparkVerticalContainer]}>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>Address</Text>
                        <Input start = {inputs.address.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.address.setVal(val)}/>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>City</Text>
                        <Input start = {inputs.city.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.city.setVal(val)}/>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>Zip</Text>
                        <Input start = {inputs.zip.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.zip.setVal(val)}/>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>State</Text>
                        <Input start = {inputs.state.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.state.setVal(val)}/>
                    </View>
                    <Text style={{paddingBottom:"4%"}}>- Or -</Text>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"5%"}}>Previous Location</Text>
                        <TextInput style={[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]}></TextInput>
                    </View>
                </View>
            </View>
        )
    }

    // Time Entry
    const Screen2 = () => {
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.centerContents]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>Spark Begins On</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/>
                    </View>
                </View>
                <View style={[sparkViewStyles.centerContents, sparkViewStyles.middleMan]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>First Rehearsal On</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/>
                    </View>
                </View>
                <View style={[sparkViewStyles.centerContents]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>Roles to be Filled By</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.publishedMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"DD"} start = {inputs.publishedDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <Input placeHolderText={"YY"} start = {inputs.publishedYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedYear.setVal(val)}/>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <Input placeHolderText={"12"} start = {inputs.publishedHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <Input placeHolderText={"30"} start = {inputs.publishedMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.publishedAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedAmPM.setVal(val)}/>
                    </View>
                </View>
            </View>
        );
    } 

    // Role Entry
    const Screen3 = () => {
        // ---------------
        // drop down code
        // ---------------
        const [roles, setRoles] = React.useState([]);
        const [dropDownItems, setDropDownItems] = React.useState([]);

        const dropDownStyles = StyleSheet.create({
            container: {
                height: "80%",
                width: "60%"
            },
            
        });
        const [selected, setSelected] = React.useState(false);

        // ---------------
        // dropdown population code
        // ---------------

        function populateDropDown() {
            //populate roles with instruments and other roles from models
            const db = getDatabase();
    
            //Get roles and instruments from "models" in firebase
            const roleReference = ref(db, "Models/roles");
            const instrumentalistReference = ref(db, "Models/instruments");
            //get roles from firebase
            getModelsFromDb(roleReference).then((roles) => {
                //Get instruments from firebase
                getModelsFromDb(instrumentalistReference).then((instruments) => {
                    //Combine together and sort
                    let allRoles = instruments.concat(roles);
                    let finalRoles = allRoles.sort();
                    //set drop down items
                    setDropDownItems(finalRoles);
                });
            });
        }

        useEffect(() => {
            populateDropDown();
            console.log(rolesArray);
            setRoles(() => [...rolesArray["current"]])
        }, []);

        // -----------------------
        // Role manipulation code
        // -----------------------
        
        //variable which determines what is added when the "Add" button is pressed
        let roleSelect = "";

        function addRole() {
            if (roleSelect != "") {
                rolesArray["current"].push(roleSelect);
                setRoles(() => [...rolesArray["current"]]);
            }
        }

        const deleteRole = (indexToDelete) => {
            rolesArray["current"].splice(indexToDelete, 1);
            setRoles(() => [...rolesArray["current"]]);
        }

        //display added roles code
        const renderItem = (object) => {
            return (
                <View style={[sparkViewStyles.roleBox]}>
                    <Text style={{color: "black", fontSize: 20, padding: "5%"}}>{object.item}</Text>
                    <IconButton 
                        icon = "delete"
                        onPress = {() => deleteRole(object.index)}
                    />
                </View>
            );

        }

        //front end screen
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.inviteVeryTopBox]}>
                    <DropDown
                        placeholder = {"Select Role"}
                        items = {dropDownItems}
                        func = {(item)=> roleSelect = item}
                        style = {dropDownStyles}
                        rerenderParent = {() => setSelected(!selected)}
                    />
                    <TouchableOpacity activeOpacity={1} style={sparkViewStyles.addButton} onPress = {() => addRole()}>
                        <Text style={{color: "white"}}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style = {sparkViewStyles.roleContainer}>
                    <View style={[sparkViewStyles.roleBox]}>
                        <Text style={{color: "black", fontSize: 20, padding: "5%"}}>Spark Leader</Text>
                    </View>
                    <FlatList 
                        data = {roles}
                        style = {{height: "100%", width: "100%"}}
                        renderItem = {renderItem}
                    />
                </View>
                
                {/* <View style={[sparkViewStyles.boxOne]}>
                    <Text style={[sparkViewStyles.boxText]}>Pastry Maker: None</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/circularX.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>Wad Thrower: None</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/circularX.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
                    <Text style={[sparkViewStyles.boxText]}>Glue Eater: None</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/circularX.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>Spark Leader: You</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>
                    </Image>
                </View> */}
                
            </View>
        );
    }

    // Friend Entry
    const Screen4 = () => {
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.inviteVeryTopBox]}>
                        <TextInput placeholder='Enter Volunteer Name' style={{fontSize: 18}}></TextInput>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
                    <Text style={[sparkViewStyles.boxText]}>Friend Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>Friend Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
                    <Text style={[sparkViewStyles.boxText]}>Friend Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>Profile Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.inviteVeryBottomBox]}>
                    <Text style={[sparkViewStyles.boxText]}>Profile Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
            </View>
        );
    }

    //sets up the list of screens to be displayed by the slider
    let myScreens = [
        <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 /> 
    ];

    //sets up the headers to be displayed by a different slider
    let myHeaders = [
        <View style={sparkViewStyles.header}>
                <Text style={{fontSize: 28, fontFamily: "RNSMiles"}}>Location</Text>
        </View>, 
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28, fontFamily: "RNSMiles"}}>Times</Text>
        </View>,
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28, fontFamily: "RNSMiles"}}>Roles</Text>
        </View>,
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28, fontFamily: "RNSMiles"}}>Starting People</Text>
        </View>
    ]

    //sets the current index, which determines which phase the user is on
    let [currentIndex, setCurrentIndex] = React.useState(0);

    function limitScroll(){
        if (currentIndex < 0) {
        setCurrentIndex(myScreens.length - 1);
        }
        else if (currentIndex > myScreens.length - 1) {
        setCurrentIndex(0);
        }
    }

    //---------------------------------------------------------------------------
    // Section of code to put functions to be run after a component is re-rendered
    //---------------------------------------------------------------------------

    //loops the index back around on the other end when 
    limitScroll();

    //since the update object's value is maintained regardless of rerender, update each individual obervable object with the value it was before
    updateToStart();

    //------------------------------
    // Front End Code
    //------------------------------
    return(
        <View style={sparkViewStyles.container}>
            <Slider currentIndex = {currentIndex} screens = {myHeaders} />
            <Slider currentIndex = {currentIndex} screens = {myScreens} />

            <View style={[sparkViewStyles.bottomContainer]}>
                <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => setCurrentIndex(currentIndex - 1)}>
                    <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => sendPayload()}>
                    <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => setCurrentIndex(currentIndex + 1)}>
                    <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>  

    );
}

const sparkViewStyles = StyleSheet.create({
    roleContainer: {
        padding: "5%",
        height: "80%", 
        width: "80%", 
        backgroundColor: "#F9CBB1", 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        zIndex: -3
    },
    addButton: {
        height: "50%",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#006175",
        borderRadius: 7
    },
    roleBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -3
    },  
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    sparkViewTopBorder:
    {
        height: "10%"
    },
    sparkViewContentContainer:
    {
        width: "100%",
        height: "100%",
    },
    sparkContainer:
    {
        width:"100%",
        height:"72%",
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    },
    locationContainer:
    {
        width:"90%",
        flexDirection:"column", 
        height:"14%"
    },
    timeContainer:{
        flexDirection:"row",
        marginBottom: "8%",
        justifyContent: "center",
        alignItems: "center"
    },
    sparkVerticalContainer:
    {
        width:"100%",
        height:"72%",
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center"
    },
    roleVeryTopBox:{
        marginTop: "5%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    roleVeryBottomBox:{
        marginBottom: "5%",
        justifyContent: "center",
        backgroundColor: "#F1884F",
        height: "8%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    inviteVeryTopBox:{
        marginTop: "5%",
        justifyContent: "center",
        backgroundColor: "#F1884F",
        height: "8%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    inviteVeryBottomBox:{
        marginBottom: "5%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    boxOne:
    {
        backgroundColor: "#F9CBB1",
        height: "16%",
        //height: "30%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
    },
    boxTwo:
    {
        backgroundColor: "#F9CBB1",
        height: "16%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
    },
    boxText:{
        width: "58%", 
        marginLeft:"10%",
        marginTop: "2%",
        marginBottom: "2%",
    },
    bottomContainer:{
        width:"100%",
        height:"8%",
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    },
    inputBox: {
        height: "7.5%",
        marginHorizontal: "10%",
        marginBottom: "10%",
        borderWidth: 0,
        borderColor: "black",
        backgroundColor: "#F9CBB1",
        paddingLeft: "1%",
        borderRadius: 8,
        textAlign: 'center',
        color: "white",
        width: "85%",
    },
    newInputBox:{
        height:"50%",
        borderWidth: 0,
        borderColor: "black",
        backgroundColor: "#F9CBB1",
        paddingLeft: "1%",
        borderRadius: 8,
        textAlign: 'center',
        color: "white",
        width: "100%",
    },
    locationInputBox:{
        textAlign: 'left',
        paddingLeft: '2%',
        fontSize: 18
    },
    dateInputBox: {
        height: "10%",
        marginHorizontal: "2%",
        borderWidth: 0,
        borderColor: "black",
        paddingHorizontal: "1%",
        fontSize: 24,
        borderRadius: 8,
        textAlign: 'center',
        color: "black",
        width: "100%",
        alignContent: "center"
    },
    minuteInputBox:{
        height: "10%",
        marginHorizontal: "2%",
        borderWidth: 0,
        borderColor: "black",
        paddingHorizontal: "1%",
        fontSize: 36,
        borderRadius: 8,
        textAlign: 'center',
        color: "black",
        width: "15%",
        alignContent: "center"
    },
    hourInputBox:{
        height: "10%",
        marginHorizontal: "2%",
        borderWidth: 0,
        borderColor: "black",
        paddingHorizontal: "1%",
        fontSize: 36,
        borderRadius: 8,
        textAlign: 'center',
        color: "black",
        width: "15%",
        alignContent:"flex-end",
        justifyContent:"flex-end"
    },
    dateInputContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "1%",
        width: "25%",
    },
    labelUnderneath:{
        marginHorizontal: "7%",
        fontSize: 18
    },
    centerText:
    {
        textAlign: 'center'
    },
    centerContents:
    {
        justifyContent:"center", 
        alignItems:"center"
    },
    button:
    {
        backgroundColor: "#006175",
        marginHorizontal: "17%",
        color: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingTop: "5%",
        paddingBottom: "5%",
        borderWidth: 0
    },
    testyTouchable:
    {
        marginBottom: "10%",
        height: "80%",
        width: "35%"
    },
    timeAndDateInput:
    {
        fontSize:26,
        justifyContent:"center"
    },
    inbetweenText:
    {
        marginHorizontal:"5%", 
        fontSize:20
    },
    middleMan:
    {
        marginVertical: "20%"
    }
});
