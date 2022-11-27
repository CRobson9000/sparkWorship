import { View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

export default function DimensionsTesting({ navigation }) {
    return(
        <View
        style={{
          width: 50,
          height: 50,
          borderRadius: Math.round(Dimensions.get('window').width / 2),
          left: 20,
          top: 60,
          backgroundColor: '#006175',
        }}></View>
    )
}