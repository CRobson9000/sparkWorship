import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { IconButton, ProgressBar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';

import { Input, Slider, DropDown } from '../../components/components';
import { Observable, TDO } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';

import Routes from "../Navigation/constants/Routes";

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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

    // Model variables
    let states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    // global variables for dropDowns
    const globalUserState = useRef(null);

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


    //dropDown renderItem function
    const renderDropDownItem = (item) => {
        return (
        <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text> {item} </Text>
        </View>
    )
  }

    // ------------
    // Phases Code
    // ------------

    // Location Entry
    const Screen1 = () => {
        const [userState, setUserState] = React.useState(null);

        useEffect(() => {
            if (userState) {
              globalUserState.current = userState;
            }
        }, [userState]);

        useEffect(() => {
            setUserState(globalUserState.current);
        }, [globalUserState])

        return(
            <View style={sparkViewStyles.content}>
                <Text style={sparkViewStyles.stageText}>Location</Text>
                <Text style={sparkViewStyles.text1}>Street Address</Text>
                <Input start = {inputs?.address?.getVal()} inputStyle = {sparkViewStyles.inputBox} func = {(val) => inputs.address.setVal(val)}/>
                <Text style={sparkViewStyles.text1}>City</Text>
                <Input start = {inputs?.city?.getVal()} inputStyle = {sparkViewStyles.inputBox} func = {(val) => inputs.city.setVal(val)}/>
                <View style={sparkViewStyles.row2}>
                    <View style={sparkViewStyles.column2}>
                        <Text style={sparkViewStyles.text3}>State</Text>
                        <Dropdown
                            style={sparkViewStyles.dropDown} 
                            data={states} 
                            renderItem={renderDropDownItem}
                            maxHeight = {"40%"}
                            itemTextStyle = {{color: "black", fontSize: 2}}
                            onChange = {(value) => setUserState(value)}
                            placeholder = {userState}
                            value = {userState}/>
                    </View>
                    <View style={sparkViewStyles.column2}>
                        <Text style={sparkViewStyles.text3}>Zip Code</Text>
                        <Input start = {inputs?.zip?.getVal()} inputStyle = {sparkViewStyles.inputBox2} func = {(val) => inputs.zip.setVal(val)}/>
                    </View>
                </View>
                
            </View>
        )
    }

    // Time Entry
    const Screen2 = () => {
        return (
            <View style={[sparkViewStyles.content]}>
                <Text style={sparkViewStyles.stageText}>Date and Time</Text>
                <Text style={[sparkViewStyles.text1]}>Spark Date</Text>
                <View style={sparkViewStyles.timeDateRow}>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/>
                    </View>
                    <Text style={[sparkViewStyles.inbetweenText]}>at</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/>
                    </View>
                </View>
                <Text style={[sparkViewStyles.text1]}>First Rehearsal</Text>
                <View style={sparkViewStyles.timeDateRow}>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/>
                    </View>
                    <Text style={[sparkViewStyles.inbetweenText]}>at</Text>
                    <View style={[sparkViewStyles.timeContainer]}>    
                        <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/>
                    </View>
                </View>
                <Text style={[sparkViewStyles.text1]}>Roles Filled By</Text>
                <View style={sparkViewStyles.timeDateRow}>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.publishedMonth.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedMonth.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.publishedDay.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedDay.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.publishedYear.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedYear.setVal(val)}/>
                    </View>
                    <Text style={[sparkViewStyles.inbetweenText]}>at</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <Input placeHolderText={"12"} start = {inputs.publishedHours.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedHours.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.publishedMinutes.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedMinutes.setVal(val)}/>
                        <Text style={[sparkViewStyles.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.publishedAmPM.getVal()} inputStyle = {sparkViewStyles.timeDateInput} func = {(val) => inputs.publishedAmPM.setVal(val)}/>
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
            <View style={[sparkViewStyles.content]}>
                <Text style={sparkViewStyles.stageText}>Roles</Text>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.roleTopBox]}>
                    <DropDown
                        placeholder = {"Select Role"}
                        items = {dropDownItems}
                        func = {(item)=> roleSelect = item}
                        style = {dropDownStyles}
                        rerenderParent = {() => setSelected(!selected)}
                    />
                    <TouchableOpacity activeOpacity={1} style={sparkViewStyles.addButton} onPress = {() => addRole()}>
                        <Text style={{color: "white", borderColor: "white", borderWidth: 2, padding: "8%", borderRadius: 5}}>Add</Text>
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
            </View>
        );
    }

    // Friend Entry
    const Screen4 = () => {
        return (
            <View style={[sparkViewStyles.content]}>
                <Text style={sparkViewStyles.stageText}>Volunteers</Text>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.roleTopBox]}>
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

    //sets the current index, which determines which phase the user is on
    let [currentIndex, setCurrentIndex] = React.useState(1);

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
        <View style={sparkViewStyles.MainContainer}>
            <View style={sparkViewStyles.topBorder}>
                <Text style={sparkViewStyles.titleText}>Spark Creation</Text>
                <ProgressBar color = {"rgb(0, 97, 117)"} style={{width: screenWidth/2, height: 20, borderRadius: 10, marginTop: height/40, alignSelf: "center"}} progress={(currentIndex + 1) / 4}/>
            </View>
            <Slider currentIndex = {currentIndex} screens = {myScreens} />

            <View style={[sparkViewStyles.bottomRow]}>
                <TouchableOpacity style={sparkViewStyles.constantButtons} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={sparkViewStyles.buttonText}>Previous</Text></TouchableOpacity>
                <TouchableOpacity style={sparkViewStyles.constantButtons} onPress = {() => (currentIndex == myScreens.length - 1) ? sendPayload() : setCurrentIndex(currentIndex + 1)}><Text style={sparkViewStyles.buttonText}>{(currentIndex == myScreens.length - 1) ? "Submit" : "Next"}</Text></TouchableOpacity>
            </View>
        </View>  

    );
}

const sparkViewStyles = StyleSheet.create({
    
    MainContainer: {
      backgroundColor: "white",
      height: "100%",
    },

    content: {
      height: "50%",
      width: "100%"
    },

    topBorder: {
      height: height/4,
      width: "100%",
      backgroundColor: "rgb(219, 233, 236)",
      marginBottom: "5%"
    },

    // Spark Creation title in top section
    titleText: {
      marginTop: height/40,
      padding: "5%",
      textAlign: "center",
      fontSize: 20,
      fontFamily: "RNSMiles"
    }, 

    // Title on each screen
    stageText: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: "4%",
    },

    // Labels for all input boxes except Zip Code 
    text1: {
      paddingBottom: "2%",
      fontSize: 15,
      left: "9%",
    },

    // All input boxes except Zip Code
    inputBox: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "85%",
      height: "8%",
      alignSelf: "center",
      marginBottom: "4%", 
      padding: 10
    },

    // Constant area that holds the "Previous" and "Next" Buttons
    bottomRow: {
      flexDirection: "row",
      alignSelf: 'center',
      justifyContent: "space-between",
      height: "10%",
      width: '85%',
      marginTop: height/25
    },

    // Text for all buttons
    buttonText: {
      color: "white",
      fontSize: 12,
    },

    // "Previous" and "Next" buttons on each screen
    constantButtons:{
      backgroundColor: "rgb(0, 97, 117)",
      justifyContent: "center",
      alignItems: "center",
      height: "45%",
      width: "45%",
      top: "10%",
      borderRadius: 10
    },
    
    // State dropdown 
    dropDown: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "100%",
      height: "100%"
    },

    // Zip Code input box
    inputBox2: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      height: "100%",
      paddingLeft: "10%"
    },

    // Address row
    row2: {
      flexDirection: "row",
      width: "85%",
      height: "8%",
      justifyContent: "space-between",
      alignSelf: "center",
      marginBottom: "7%"
    },

    // Column for State and Zip Code
    column2 : {
      flexDirection: "column",
      width: "45%",
      height: "100%"
    },

    // Label for City, State and Zip Code
    text3: {
      paddingBottom: "6%",
      fontSize: 15,
      left: "5%"
    },

    roleContainer: {
        padding: "7%",
        height: "80%", 
        width: "100%", 
        backgroundColor: "white"
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
        backgroundColor: "#F2905B",
        width: "100%", 
        borderRadius: 10
    },  

    timeContainer:{
      backgroundColor: "#F2905B",
      padding: "3%",
      borderRadius: 10,
      flexDirection:"row"
    },

    roleTopBox:{
        alignSelf: "center",
        marginTop: "3%",
        justifyContent: "center",
        backgroundColor: "#006175",
        height: height/10,
        width: "85%",
        borderRadius: 10
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

    timeDateInput: {
      fontSize: height/40,
      justifyContent:"center",
    },

    timeDateRow: {
        width: screenWidth/1.3,
        flexDirection:"row",
        marginTop: "4%",
        marginBottom: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center"
    }, 

    inbetweenText: {
        marginHorizontal:"5%", 
        fontSize:20
    }

});
