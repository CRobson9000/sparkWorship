import {Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

import { stylesPortrait } from "./styles/portrait";
import { stylesBase} from "./styles/base";

export default function SparkView({ navigation }) {
return(<View style={[stylesBase.container]}>
    <View style={[stylesPortrait.topBorder]}>
        <Text style={{color: "white"}}>Spark Worship</Text>
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
        <Image>

        </Image>
        <Image>

        </Image>
        <Image>

        </Image>
    </View>
</View>);
}