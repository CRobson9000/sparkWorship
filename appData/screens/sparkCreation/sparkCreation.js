import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors'

export default function sparkCreation({ navigation }) {
    return(
        <View style={stylesPortrait.container}>
        <View style={[sparkViewStyles.sparkViewTopBorder]}>
            <Text style={{textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
        </View>
        <View style={[sparkViewStyles.sparkContainer]}>
            <TextInput placeholder="useless placeholder"></TextInput>
        </View>
        <View style={[sparkViewStyles.bottomContainer]}>
            <button>Egg</button>
            <button>Man</button>
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
        justifyContent: "space-between", 
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
        backgroundColor: "rgba(217, 217, 217, 1)",
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    inputBox: {
        height: "7.5%",
        marginHorizontal: "10%",
        marginBottom: "10%",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "rgba(256, 256, 256, 0.6)",
        paddingLeft: "1%",
        borderRadius: 8,
        textAlign: 'center',
        color: "white"
    },
    centerText:
    {
        textAlign: 'center',
        color: "white"
    },

    button:
    {
        backgroundColor: colors.buttonColor,
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: "black",
        height: "7.5%",
        marginBottom: "10%",
        borderWidth: 3
    }
});