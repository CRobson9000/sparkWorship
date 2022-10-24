import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { stylesPortrait } from "../../styles/portrait";
import colors from '../../../config/colors'

export default function SparkView({ navigation }) {
    return(
        <View style={stylesPortrait.container}>
            <View style={[sparkViewStyles.sparkViewTopBorder]}>
                <Text style={{color: "white", textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
            </View>
            <View style={[sparkViewStyles.sparkContainer]}>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.veryTopBox]}>
                    <View style={{width:"85%"}}>
                        <Text style={[sparkViewStyles.boxText]}>Sunrise Worship Service</Text>
                        <Text style={[sparkViewStyles.boxText]}>Featuring Billy Joel</Text>
                        <Text style={[sparkViewStyles.boxText]}>Starting at 7AM on 6th</Text>
                        <Text style={[sparkViewStyles.boxText]}>Cannon Hill, PA, 19512</Text>
                    </View>
                    <View style={{width:"15%"}}>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={{width: "80%", height: "35%"}} source={require("../../../assets/miniEri.png")}>

                        </Image>
                    </View>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>X Playing at Y</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
                    <Text style={[sparkViewStyles.boxText]}>X Playing at Y</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                    <Text style={[sparkViewStyles.boxText]}>X Playing at Y</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.veryBottomBox]}>
                    <Text style={[sparkViewStyles.boxText]}>X Playing at Y</Text>
                    <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

                    </Image>
                </View>
            </View>
            <View style={[sparkViewStyles.bottomContainer]}>
                <Image style={{width: "10%", height: "50%", marginLeft: "6.5%"}} source={require("../../../assets/ProfileNavIcon.png")}> 
                </Image>
            
                <Image style={{width: "10%", height: "60%"}} source={require("../../../assets/magniGlass.png")}> 
                </Image>
                <Image style={{width: "10%", height: "55%", marginRight: "6.5%"}} source={require("../../../assets/flame.png")}> 
                </Image>
            </View>
        </View>
    );
}

const sparkViewStyles = StyleSheet.create({
    sparkViewTopBorder:
    {
        height: "10%",
        backgroundColor: "#EC6014",
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
        width: "70%", 
        marginLeft:"10%",
        marginTop: "1%",
        marginBottom: "1%",
        fontSize: 14
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