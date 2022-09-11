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
        <View>

        </View>
        <View>
            
        </View>
        <View>
              
        </View>
    </View>
    <View style={[stylesPortrait.bottomContainer]}>
    
            <Image style={{width: "10%", height: "50%", marginLeft: 25}} source={require("../../../assets/ProfileNavIcon.png")}> 
            
            </Image>
        
            <Image style={{width: "10%", height: "50%"}} source={require("../../../assets/ProfileNavIcon.png")}> 
            
            </Image>
            <Image style={{width: "10%", height: "50%", marginRight: 25}} source={require("../../../assets/ProfileNavIcon.png")}> 
            
            </Image>
    </View>
</View>);
}