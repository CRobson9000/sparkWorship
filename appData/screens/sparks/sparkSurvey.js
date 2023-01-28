import { StyleSheet, TouchableHighlight, Text, View, TextInput, FlatList } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../../components/components';
import { FirebaseButler, Observable, TDO } from '../../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import ProfileImage from '../../components/profileImage.js';

export default function Message({ route, navigation }) {
  let props = route.params;
  let userId = props?.userId;


    //only run this method on the first render of the page
    //   useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         let startingMessages = [];
    //         if (convoData) startingMessages = Object.values(convoData?.["messages"]) || [] ;
    //         let inverted = invert(startingMessages);
    //         setMessages([...inverted]);
    //     });
    //     return unsubscribe;
    //   }, [navigation]);

  return(
    <View style={styles.container}>
        <View style={styles.topBorder}>
            {/* Name will need to be rendered */}
            <Text style={styles.nameText}> Survey Screen </Text>
        </View>
        {/* <View style={styles.content}>
            
        </View> */}
    </View>
)}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    topBorder: {
        height: "15%",
        backgroundColor: "#DBE9EC",
    },

    content: {
        height: "70%"
    }
})