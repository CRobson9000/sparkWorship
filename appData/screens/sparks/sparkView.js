import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { Dimensions } from 'react-native';
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
                    <View style={{width:"87%"}}>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}>Sunrise Worship Service</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring Billy Joel</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Starting at 7AM on Apr 6th</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Cannon Hill, PA, 19512</Text>
                    </View>
                    <View style={{width:"13%", alignItems:"center"}}>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={[sparkViewStyles.profPic]} source={require("../../../assets/SmallEriToken.png")}>

                        </Image>
                    </View>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                <View style={{width:"87%"}}>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}>Song of Creation</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring Cannoneers</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Starting at 6PM on May 16th</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Cannon Hill, PA, 19512</Text>
                    </View>
                    <View style={{width:"13%", alignItems:"center"}}>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={[sparkViewStyles.profPic]} source={require("../../../assets/SmallEriToken.png")}>

                        </Image>
                    </View>
                </View>
                <View style={[sparkViewStyles.boxOne]}>
                <View style={{width:"87%"}}>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}>Pentatonix Live (Acappella)</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring Pentatonix</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Starting at 7AM on Dec 24th</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Cannon Hill, PA, 19512</Text>
                    </View>
                    <View style={{width:"13%", alignItems:"center"}}>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={[sparkViewStyles.profPic]} source={require("../../../assets/SmallEriToken.png")}>

                        </Image>
                    </View>
                </View>
                <View style={[sparkViewStyles.boxTwo]}>
                <View style={{width:"87%"}}>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}>New Year’s Worship (Solo)</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring Gabriel Himself</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Starting at 11AM Dec 31st</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>New York City, NY, 10036</Text>
                    </View>
                    <View style={{width:"13%", alignItems:"center"}}>
                        <View
                            style={{
                            width: 5,
                            height: 5,
                            borderRadius: Math.round(Dimensions.get('window').width / 2),
                            backgroundColor: '#F2905B',
                        }}></View>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={[sparkViewStyles.profPic]} source={require("../../../assets/SmallEriToken.png")}>

                        </Image>
                    </View>
                </View>
                <View style={[sparkViewStyles.boxOne, sparkViewStyles.veryBottomBox]}>
                <View style={{width:"87%"}}>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.topText]}>World’s End Choir (Choral)</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Featuring The Universe</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>Starting Jan 5th 2023</Text>
                        <Text style={[sparkViewStyles.boxText, sparkViewStyles.notTopText]}>New Jerusalem, NJ, 77777</Text>
                    </View>
                    <View style={{width:"13%", alignItems:"center"}}>
                        <View
                            style={{
                            width: 5,
                            height: 5,
                            borderRadius: Math.round(Dimensions.get('window').width / 2),
                            backgroundColor: '#F2905B',
                        }}></View>
                        <Image style={{width: "100%", height: "50%", marginRight: "5%"}}>

                        </Image>
                        <Image style={[sparkViewStyles.profPic]} source={require("../../../assets/SmallEriToken.png")}>

                        </Image>
                    </View>
                </View>
            </View>
            <View style={[sparkViewStyles.bottomContainer]}>
                <Image style={{width: "7.5%", height: "45%", marginLeft: "6.5%"}} source={require("../../../assets/Home.png")}> 
                </Image>
                <Image style={{width: "7.5%", height: "45%"}} source={require("../../../assets/Vector.png")}> 
                </Image>
                <Image style={{width: "7.5%", height: "45%"}} source={require("../../../assets/Chat.png")}> 
                </Image>
                <Image style={{width: "7.5%", height: "45%"}} source={require("../../../assets/Plus.png")}> 
                </Image>
                <Image style={{width: "7.5%", height: "45%", marginRight: "6.5%"}} source={require("../../../assets/Profile.png")}> 
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
    topText:{
        fontWeight: "bold",
        marginLeft:"6%"
    },
    notTopText:{
        marginLeft: "12%"
    },
    bottomContainer:{
        width:"100%",
        height:"8%",
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,1)",
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
    },
    profPic:{
        width: "93%", 
        height: "35%", 
        marginRight: "30%"
    }

});