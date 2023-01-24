import { View, Text } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function DimensionsTesting({ navigation }) {
    return(
        <View>
          <View
          style={{
            width: 50,
            height: 50,
            borderRadius: Math.round(screenWidth / 2),
            left: 20,
            top: 60,
            backgroundColor: '#006175',
          }}></View>
          <Text style={{fontSize: (height/10), fontFamily:"RNSMiles"}}>Size Test</Text>
          <Text style={{fontSize: (height/20)}}>Size Test</Text>
          <Text style={{fontSize: (height/30)}}>Size Test</Text>
          <Text style={{fontSize: (height/40)}}>Size Test</Text>
        </View>
    )
}

