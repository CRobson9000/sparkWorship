import {Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { stylesPortrait } from "./styles/portrait";
import { stylesBase} from "./styles/base";

export default function SparkView({ navigation }) {
return(<View style={[stylesBase.container]}>
    <View style={[stylesPortrait.topBorder]}>
        <Text style={{color: "white", textAlign:"center", fontSize:29, paddingTop: 28}}>Spark Worship</Text>
    </View>
    <View style={[stylesPortrait.sparkContainer]}>
        <View style={[stylesPortrait.boxOne, stylesPortrait.veryTopBox]}>
            <Text style={[stylesPortrait.boxText]}>X Playing at Y</Text>
            <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

            </Image>
        </View>
        <View style={[stylesPortrait.boxTwo]}>
            <Text style={[stylesPortrait.boxText]}>X Playing at Y</Text>
            <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

            </Image>
        </View>
        <View style={[stylesPortrait.boxOne]}>
            <Text style={[stylesPortrait.boxText]}>X Playing at Y</Text>
            <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

            </Image>
        </View>
        <View style={[stylesPortrait.boxTwo]}>
            <Text style={[stylesPortrait.boxText]}>X Playing at Y</Text>
            <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

            </Image>
        </View>
        <View style={[stylesPortrait.boxOne, stylesPortrait.veryBottomBox]}>
            <Text style={[stylesPortrait.boxText]}>X Playing at Y</Text>
            <Image style={{width: "20%", height: "55%", marginRight: "5%"}} source={require("../../../assets/EriToken.png")}>

            </Image>
        </View>
    </View>
    <View style={[stylesPortrait.bottomContainer]}>
    
            <Image style={{width: "10%", height: "50%", marginLeft: "6.5%"}} source={require("../../../assets/ProfileNavIcon.png")}> 
            
            </Image>
        
            <Image style={{width: "10%", height: "60%"}} source={require("../../../assets/magniGlass.png")}> 
            
            </Image>
            <Image style={{width: "10%", height: "55%", marginRight: "6.5%"}} source={require("../../../assets/flame.png")}> 
            
            </Image>
    </View>
</View>);
}