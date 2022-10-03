import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useRef} from 'react';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';

import { Input, Slider } from '../../components/components';
import { Observable } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';

export default function SparkCreation({ navigation }) {
    //set environment variables
    let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";
    let update = useRef({});

    //inputs to save
    let inputs = {
        location: new Observable("", () => updatePayload(inputs.location.getVal(), "location")),
        day: new Observable("", () => updatePayload(inputs.day.getVal(), "day")),
        month: new Observable("", () => updatePayload(inputs.month.getVal(), "month")),
        year: new Observable("", () => updatePayload(inputs.year.getVal(), "year")),
        hours: new Observable("", () => updatePayload(inputs.hours.getVal(), "hours")),
        minutes: new Observable("", () => updatePayload(inputs.minutes.getVal(), "minutes"))
    };

    const updatePayload = (updateVal, updateName) =>
    {
        //console.log("update!");
        update[updateName] = updateVal;
    }

    const updateToStart = () => {
        //console.log("update", update);
        for (let key in inputs) {
            let updateVal = update[key];
            if (updateVal) {
                let obj = inputs[key];
                obj.unwatchedSet(updateVal);
                //console.log(key, obj);
            }
        }
    }

    function sendPayload() {
        const db = getDatabase();
        //create a new id for a spark, which makes a new space for info to go in
        //const reference = ref(db, "Sparks");
        //let sparkId = push(reference, {status: "proposed"});

        // //loop through all of the key, value pairs in the object update and set the data in firebase based upon the keys and values
        // for (let i = 0; i < Object.keys(update).length; i++)
        // {
        //   //get keys and values out of update object, which houses everything that was changed
        //   let updateVal = update[Object.keys(update)[i]];
        //   let updateKey = Object.keys(update)[i];
        //   if (updateVal != "") {
        //     //send an single update to the database, which changes the value at the key to the new value under whatever the current user is
        //     const reference = ref(db, `Sparks/${sparkId}/info/${updateKey}`);
        //     set(reference, updateVal);
        //   }
        // }
        console.log(update); 
    }


    //slider code

    //Start of Location Entry
    const Screen1 = () => {
        return(
            <View style={[sparkViewStyles.sparkContainer]}>
                <Input inputStyle={[sparkViewStyles.inputBox, sparkViewStyles.locationInputBox]} placeHolderText="Enter Location" func = {(val) => inputs.location.setVal(val)} />
            </View>
        )
    }

    //Start of Profile Adding
    const Screen2 = () => {
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.veryTopBox]}>
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
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.veryBottomBox]}>
                    <Text style={[sparkViewStyles.boxText]}>Profile Name</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
            </View>
        );
    }

    const Screen3 = () => {
        return (
            <View style={[sparkViewStyles.sparkContainer]}>
                <View style={[sparkViewStyles.dateInputContainer]}>
                    <Input inputStyle={[sparkViewStyles.dateInputBox]} placeHolderText="10" func = {(val) => inputs.month.setVal(val)} />
                    <Text style={[sparkViewStyles.labelUnderneath]}>Month</Text>
                </View>
                <View style={[sparkViewStyles.dateInputContainer]}>
                    <Input inputStyle={[sparkViewStyles.dateInputBox]} placeHolderText="4" func = {(val) => inputs.day.setVal(val)} />
                    <Text style={[sparkViewStyles.labelUnderneath]}>Day</Text>
                </View>
                <View style={[sparkViewStyles.dateInputContainer]}>
                    <Input inputStyle={[sparkViewStyles.dateInputBox]} placeHolderText="2022" func = {(val) => inputs.year.setVal(val)} />
                    <Text style={[sparkViewStyles.labelUnderneath]}>Year</Text>
                </View>
            </View>
        );
    }

    const Screen4 = () => {
        return (
            <View style={[sparkViewStyles.sparkContainer]}>
                <Input inputStyle={[sparkViewStyles.hourInputBox]} placeHolderText="6" func = {(val) => inputs.hours.setVal(val)} />
                <Text style={{fontSize:36, marginBottom:"1.5%"}}>:</Text>
                <Input inputStyle={[sparkViewStyles.minuteInputBox]} placeHolderText="20" func = {(val) => inputs.minutes.setVal(val)} />
                <Text style={{fontSize:36}}>PM</Text>
            </View>
        );
    }

    let myScreens = [
        <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 /> 
    ];

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
        <View style={stylesPortrait.container}>
            <View style={[sparkViewStyles.sparkViewTopBorder]}>
                <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
            </View>

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
        height:"82%",
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    },
    sparkVerticalContainer:
    {
        width:"100%",
        height:"82%",
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center"
    },
    veryTopBox:{
        marginTop: "5%",
        justifyContent: "center",
        backgroundColor: "#F1884F",
        height: "8%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    veryBottomBox:{
        marginBottom: "5%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    boxOne:
    {
        backgroundColor: "#F9CBB1",
        height: "16%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boxTwo:
    {
        backgroundColor: "#F9CBB1",
        height: "16%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        alignItems: "center",
        paddingLeft: "10%",
        paddingRight: "10%"
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
        width: "40%"
    }
});