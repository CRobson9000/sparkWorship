import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { IconButton, ProgressBar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { styleSheet } from "../../styles/sparkCreationStyles";

import { Input, Slider, KeyboardView } from '../../components/components';
import { Observable, TDO, FirebaseButler } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';

import Routes from "../Navigation/constants/Routes";
import ProfileImage from '../../components/profileImage.js';

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
        // console.log(sparkId);

        // //-------------------------------------------
        // // populate database with values from update
        // //------------------------------------------- 
        function setUpRoleSpace(sparkId, role) {
            // standarize roles to lower case and words separated by underscores
            role = role.split(' ').join('_');
            role = role.toLowerCase();
            // save data in firebase
            let rolePromise = new Promise((resolve, reject) => {
                const roleReference = ref(db, `Sparks/${sparkId}/roles/${role}`)
                push(roleReference, {final: ""}).then(() => resolve());
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
            set(stateReference, globalUserState);
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

        // set spark leader role in firebase
        const leaderRef = ref(db, `Sparks/${sparkId}/roles/spark_leader`);
        await set(leaderRef, userId);

        // set the default name of the spark (<spark leader name>'s spark)
        const sparkNameRef = ref(db, `Sparks/${sparkId}/info/name`);

        // get spark leader's name        
        let sparkLeaderName = await FirebaseButler.fbGet(`Users/${userId}/info/name`);
        await set(sparkNameRef, `${sparkLeaderName}'s Spark`);

        navigation.navigate(Routes.sparkSummary, {userId, currentSparkId: sparkId});
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
            <KeyboardView style={styleSheet.content}>
                <Text style={styleSheet.stageText}>Location</Text>
                <Text style={styleSheet.text1}>Street Address</Text>
                <Input start = {inputs?.address?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.address.setVal(val)}/>
                <Text style={styleSheet.text1}>City</Text>
                <Input start = {inputs?.city?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.city.setVal(val)}/>
                <View style={styleSheet.row2}>
                    <View style={styleSheet.column2}>
                        <Text style={styleSheet.text3}>State</Text>
                        <Dropdown
                            style={styleSheet.dropDown} 
                            data={states} 
                            renderItem={renderDropDownItem}
                            maxHeight = {"40%"}
                            itemTextStyle = {{color: "black", fontSize: 2}}
                            onChange = {(value) => setUserState(value)}
                            placeholder = {userState}
                            value = {userState}
                            containerStyle = {{top: -30}}
                            dropdownPosition = {"bottom"}
                        />
                    </View>
                    <View style={styleSheet.column2}>
                        <Text style={styleSheet.text3}>Zip Code</Text>
                        <Input start = {inputs?.zip?.getVal()} inputStyle = {styleSheet.inputBox2} func = {(val) => inputs.zip.setVal(val)}/>
                    </View>
                </View>
                
            </KeyboardView>
        )
    }

    // Time Entry
    const Screen2 = () => {
        return (
            <KeyboardView style={styleSheet.content}>
                <Text style={styleSheet.stageText}>Date and Time</Text>
                <Text style={[styleSheet.text1]}>Spark Date</Text>
                <View style={styleSheet.timeDateRow}>
                    <View style={[styleSheet.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/>
                    </View>
                    <Text style={[styleSheet.inbetweenText]}>at</Text>
                    <View style={[styleSheet.timeContainer]}>
                        <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/>
                    </View>
                </View>
                <Text style={[styleSheet.text1]}>First Rehearsal</Text>
                <View style={styleSheet.timeDateRow}>
                    <View style={[styleSheet.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/>
                    </View>
                    <Text style={[styleSheet.inbetweenText]}>at</Text>
                    <View style={[styleSheet.timeContainer]}>    
                        <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/>
                    </View>
                </View>
                <Text style={[styleSheet.text1]}>Roles Filled By</Text>
                <View style={styleSheet.timeDateRow}>
                    <View style={[styleSheet.timeContainer]}>
                        <Input placeHolderText={"MM"} start = {inputs.publishedMonth.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedMonth.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"DD"} start = {inputs.publishedDay.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedDay.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> / </Text>
                        <Input placeHolderText={"YY"} start = {inputs.publishedYear.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedYear.setVal(val)}/>
                    </View>
                    <Text style={[styleSheet.inbetweenText]}>at</Text>
                    <View style={[styleSheet.timeContainer]}>
                        <Input placeHolderText={"12"} start = {inputs.publishedHours.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedHours.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> : </Text>
                        <Input placeHolderText={"30"} start = {inputs.publishedMinutes.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedMinutes.setVal(val)}/>
                        <Text style={[styleSheet.timeDateInput]}> </Text>
                        <Input placeHolderText={"PM"} start = {inputs.publishedAmPM.getVal()} inputStyle = {styleSheet.timeDateInput} func = {(val) => inputs.publishedAmPM.setVal(val)}/>
                    </View>
                </View>
            </KeyboardView>
        );
    } 

    // Role Entry
    const Screen3 = () => {
        // ---------------
        // drop down code
        // ---------------
        const [roles, setRoles] = React.useState([]);
        const [dropDownItems, setDropDownItems] = React.useState([]);

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
            // console.log(rolesArray);
            setRoles(() => [...rolesArray["current"]])
        }, []);

        // -----------------------
        // Role manipulation code
        // -----------------------
        
        //variable which determines what is added when the "Add" button is pressed
        const [roleSelect, setRoleSelect] = React.useState("Select a role");

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
                <View style={[styleSheet.roleBox, {marginBottom: "4%"}, {justifyContent: "space-between"}, {paddingLeft: "2%"}, {paddingRight: "2%"}]}>
                    <Text style={{color: "black", fontSize: 15, padding: "5%"}}>{object.item}</Text>
                    <IconButton 
                        icon = "delete"
                        onPress = {() => deleteRole(object.index)}
                    />
                </View>
            );
        }

        //front end screen
        return (
            <KeyboardView style={styleSheet.content} flatList = {true}>
                <Text style={styleSheet.stageText}>Roles</Text>
                <View style={[styleSheet.roleTopBox, styleSheet.boxTwo]}>
                    <Dropdown
                        style={styleSheet.roleSelectDropDown} 
                        data={dropDownItems} 
                        renderItem={renderDropDownItem}
                        maxHeight = {"40%"}
                        onChange = {(value) => setRoleSelect(value)}
                        placeholder = {roleSelect}
                        placeholderStyle = {{color: "white"}}
                        value = {roleSelect}
                        containerStyle = {{top: -30}}
                        dropdownPosition = {"bottom"}
                    />
                    <TouchableOpacity activeOpacity={1} style={styleSheet.addButton} onPress = {() => addRole()}>
                        <Text style={{fontSize: 15, color: "white"}}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styleSheet.roleContainer}>
                    <View style={[styleSheet.roleBox]}>
                        <Text style={{color: "black", fontSize: height/47, padding: "5%"}}>Spark Leader</Text>
                    </View>
                    <FlatList 
                        data = {roles}
                        style = {{height: "100%", width: "100%", marginTop: "3%"}}
                        renderItem = {renderItem}/>
                </View> 
            </KeyboardView>
        );
    }

    // Friend Entry
    const Screen4 = () => {
        return (
            <KeyboardView style={styleSheet.content} flatList = {true}>
                <Text style={styleSheet.stageText}>Volunteers</Text>
                <View style={styleSheet.volunteerTopBox}>
                    <TextInput placeholder='Enter Volunteer Name' placeholderTextColor="white" style={{fontSize: 15}}></TextInput>
                </View>
                <View style={[styleSheet.boxOne]}>
                    <Text style={[styleSheet.boxText]}>Friend Name</Text>
                    <ProfileImage style = {{marginRight: "5%"}} size = {"small"} userId = {null}/>
                </View>
                <View style={[styleSheet.boxOne]}>
                    <Text style={[styleSheet.boxText]}>Friend Name</Text>
                    <ProfileImage style = {{marginRight: "5%"}} size = {"small"} userId = {null}/>
                </View>
                <View style={[styleSheet.boxOne]}>
                    <Text style={[styleSheet.boxText]}>Friend Name</Text>
                    <ProfileImage style = {{marginRight: "5%"}} size = {"small"} userId = {null}/>
                </View>
                <View style={[styleSheet.boxOne, styleSheet.inviteVeryBottomBox]}>
                    <Text style={[styleSheet.boxText]}>Friend Name</Text>
                    <ProfileImage style = {{marginRight: "5%"}} size = {"small"} userId = {null}/>
                </View>
            </KeyboardView>
        );
    }

    // sets up the list of screens to be displayed by the slider
    let myScreens = [
        <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 /> 
    ];

    //sets the current index, which determines which phase the user is on
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    function limitScroll(){
        if (currentIndex < 0) {
            setCurrentIndex(0);
        }
        // else if (currentIndex > myScreens.length - 1) {
        // setCurrentIndex(0);
        // }
    }

    useEffect(() => {
        let currentProgress = (currentIndex + 1) / (4.0 * 2);
        setProgress(currentProgress);
    }, [currentIndex])

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
        // <KeyboardView>
            <View style={styleSheet.MainContainer}>
                <View style={styleSheet.topBorder}>
                    <Text style={styleSheet.titleText}>Spark Creation</Text>
                    <ProgressBar color = {"rgb(0, 97, 117)"} style={{width: screenWidth/2, height: 20, borderRadius: 10, marginTop: "5%", alignSelf: "center"}} progress={progress}/>
                </View>
                <View style = {{position: "absolute", paddingTop: "10%", top: "25%", height: "65%", width: "100%", backgroundColor: "white", justifyContent: "center"}}>
                    <Slider currentIndex = {currentIndex} screens = {myScreens} />
                </View>
                <View style={[styleSheet.bottomRow]}>
                    <TouchableOpacity style={styleSheet.constantButtons} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
                    <TouchableOpacity style={styleSheet.constantButtons} onPress = {() => (currentIndex == myScreens.length - 1) ? sendPayload() : setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>{(currentIndex == myScreens.length - 1) ? "Submit" : "Next"}</Text></TouchableOpacity>
                </View>
            </View>  
        // </KeyboardView>
    );
}

