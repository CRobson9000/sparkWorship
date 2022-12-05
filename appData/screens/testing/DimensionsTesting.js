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
          <Text style={{fontSize: (screenWidth/3)}}>Size Test</Text>
          <Text style={{fontSize: (screenWidth/4)}}>Size Test</Text>
          <Text style={{fontSize: (screenWidth/5)}}>Size Test</Text>
          <Text style={{fontSize: (screenWidth/6)}}>Size Test</Text>
        </View>
    )
}

