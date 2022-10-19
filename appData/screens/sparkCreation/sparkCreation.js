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
        update[updateName] = updateVal;
    }

    const updateToStart = () => {
        //console.log("update", update);
        for (let key in inputs) {
            let updateVal = update[key];
            if (updateVal) {
                let obj = inputs[key];
                obj.setVal(updateVal);
            }
        }
    }

    function sendPayload() {
        //delete current variable, which is created when using "useRef()"
        delete update.current;

        //"set-up" variables
        const db = getDatabase();

        //create a new id for this spark, which gives it a place in memory to store all its data
        const reference1 = ref(db, "Sparks");
        let sparkIdStart = push(reference1, {status: "proposed"});
        let sparkIdArray = sparkIdStart.toString().split("/");
        let sparkId = sparkIdArray[sparkIdArray.length - 1];
        console.log(sparkId);
        //popluate database with values from update
        const reference2 = ref(db, `Sparks/${sparkId}/info/location`);
        set(reference2, update["location"]);

        //set TDO: date
        const reference3 = ref(db, `Sparks/${sparkId}/info/publishedTDO/date/day`);
        set(reference3, parseInt(update["day"]));
        const reference4 = ref(db, `Sparks/${sparkId}/info/publishedTDO/date/month`);
        set(reference4, parseInt(update["month"]));
        const reference5 = ref(db, `Sparks/${sparkId}/info/publishedTDO/date/year`);
        set(reference5, parseInt(update["year"]));

        //set TDO: time
        const reference6 = ref(db, `Sparks/${sparkId}/info/publishedTDO/time/hours`);
        set(reference6, parseInt(update["hours"]));
        const reference7 = ref(db, `Sparks/${sparkId}/info/publishedTDO/time/minutes`);
        set(reference7, parseInt(update["minutes"]));

        navigation.navigate("DatabaseTest");
    }


    //slider code

    //Start of Location Entry
    const Screen1 = () => {
        return(
            <View style={[sparkViewStyles.sparkContainer]}>
                <View style={[sparkViewStyles.sparkVerticalContainer]}>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>Address</Text>
                        <TextInput style={[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]}></TextInput>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>City</Text>
                        <TextInput style={[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]}></TextInput>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>Zip</Text>
                        <TextInput style={[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]}></TextInput>
                    </View>
                    <View style={[sparkViewStyles.locationContainer]}>
                        <Text style={{paddingLeft:"4%"}}>State</Text>
                        <TextInput style={[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]}></TextInput>
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

    //Start of Times
    const Screen2 = () => {
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.centerContents]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>Spark Begins On</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <TextInput placeholder='MM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='DD' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='YY' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <TextInput placeholder='12' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <TextInput placeholder='30' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <TextInput placeholder='PM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                    </View>
                </View>
                <View style={[sparkViewStyles.centerContents, sparkViewStyles.middleMan]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>First Rehearsal On</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <TextInput placeholder='MM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='DD' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='YY' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <TextInput placeholder='12' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <TextInput placeholder='30' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <TextInput placeholder='PM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                    </View>
                </View>
                <View style={[sparkViewStyles.centerContents]}>
                    <Text style={[sparkViewStyles.inbetweenText]}>Roles to be Filled By</Text>
                    <View style={[sparkViewStyles.timeContainer]}>
                        <TextInput placeholder='MM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='DD' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
                        <TextInput placeholder='YY' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
                        <TextInput placeholder='12' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
                        <TextInput placeholder='30' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                        <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
                        <TextInput placeholder='PM' style={[sparkViewStyles.timeAndDateInput]}></TextInput>
                    </View>
                </View>
            </View>
        );
    }

    const Screen3 = () => {
        return (
            <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.roleVeryTopBox]}>
                    <Text style={[sparkViewStyles.boxText]}>Spark Leader: You</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
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
                </View>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.roleVeryBottomBox]}>
                    <TextInput placeholder='Enter Role' style={{fontSize: 18}}></TextInput>
                </View>
            </View>
        );
    }

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

    let myScreens = [
        <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 /> 
    ];

    let myHeaders = [
        <View style={sparkViewStyles.header}>
                <Text style={{fontSize: 28}}>Location</Text>
        </View>, 
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28}}>Times</Text>
        </View>,
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28}}>Roles</Text>
        </View>,
        <View style={sparkViewStyles.header}>
            <Text style={{fontSize: 28}}>Starting People</Text>
        </View>
    ]

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