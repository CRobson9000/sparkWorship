import { StyleSheet, TouchableHighlight, Text, View, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useRef, useEffect} from 'react';
import { FirebaseButler, Observable, TDO } from '../../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { KeyboardView } from '../../components/components.js'
import ProfileImage from '../../components/profileImage.js';

export default function Survey ({ route, navigation }) {
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
            <Text style={styles.titleText}>Spark Survey</Text>
            <Text style={styles.smallText}>Please provide feedback on the following spark leader/musician:</Text>
            <Text style={styles.nameText}>Austin Smith</Text>
        </View>
        <ScrollView contentContainerStyle = {{paddingBottom: "25%"}}>
            <Text style={[styles.smallText, {marginBottom: "1%", marginTop: "4%", alignSelf: "left"}]}>Based on your recent spark, please rate the above musician's performance in each of the following categories.</Text>
            <Text style={[styles.smallText, {marginTop: "0%", marginBottom: "0%"}]}>(1 = Strongly Disagree, 2 = Disagree, 3 = Neither Agree or Disagree, 4 = Agree, 5 = Strongly Agree)</Text>
            <Text style={styles.questionText}>This musician communicated well with the group.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician showed up in a timely manner to all rehearsals and the Spark itself.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician worked well with the other musicians in the group.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician was responsive to words of advice or encouragement.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/>
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician's ability matches the information listed in their profile.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/>
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>Overall, I would recommend this musician to play for other Sparks.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"/>
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={[styles.smallText, {alignSelf: "left"}]}>Please provide any additional comments in the space below.</Text> 
            <Text style={[styles.smallText, {marginTop: "5%"}]}>Thank you for your honest feedback!</Text>
            <TouchableOpacity style={styles.submitButton}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
        </ScrollView> 
    </View>
)}

const styles = StyleSheet.create({

    container: {
        height: "100%",
        flex: 1,
        backgroundColor: "white"
    },

    topBorder: {
        height: "30%",
        backgroundColor: "rgb(219, 233, 236)",
    },

    content: {
        height: "50%"
    },

    titleText: {
        alignSelf: "center",
        fontSize: 30, 
        fontFamily: "RNSMiles",
        marginTop: "20%",
        color: "rgb(0, 97, 117)"
    },

    smallText: {
        marginRight: "5%",
        marginLeft: "5%",
        marginTop: "12%",
        marginBottom: "5%",
        alignSelf: "center", 
        color: "darkgrey",
        fontSize: 12
    },

    nameText: {
        alignSelf: "center",
        fontSize: 20, 

    },

    questionText: {
        marginLeft: "5%",
        marginTop: "8%",
        marginRight: "8%",
        fontSize: 15
    },

    submitButton: {
        backgroundColor: "rgb(0, 97, 117)",
        width: "80%",
        height: "5%",
        alignSelf: "center",
        borderRadius: 10,
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        alignSelf: "center"
    },

    inputBox: {
        width: "80%",
        height: "10%",
        borderRadius: 10, 
        borderwidth: 3, 
        borderColor: "#F2905B"
    }
})