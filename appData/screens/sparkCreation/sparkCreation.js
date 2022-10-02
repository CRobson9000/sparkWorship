import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors';

export default function SparkCreation({ navigation }) {
    return(
    <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput style={[sparkViewStyles.inputBox]}placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
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
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center"
    },
    veryTopBox:{
        marginTop: "5%",
    },
    veryBottomBox:{
        marginBottom: "5%",
    },
    boxOne:
    {
        backgroundColor: "#DBE9EC",
        height: "16%",
        width: "80%",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boxTwo:
    {
        backgroundColor: "#B3D0D6",
        height: "16%",
        width: "80%",
        borderRadius: 30,
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
        alignContent: "flex-start"
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

/*
    Start of Location Entry

    <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput style={[sparkViewStyles.inputBox]}placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>  

    Start of Profile Adding

    <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput style={[sparkViewStyles.inputBox]}placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>  

    Start of Date Entry

    <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput style={[sparkViewStyles.inputBox]}placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>  

    Start of Time Entry

    <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput style={[sparkViewStyles.inputBox]}placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => navigation.navigate("RegistrationScreen")}>
                <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>  

*/