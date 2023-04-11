import { StyleSheet, TouchableHighlight, Text, View, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useRef, useEffect} from 'react';
import { FirebaseButler, Observable, TDO } from '../../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { KeyboardView } from '../../components/components.js'
import ProfileImage from '../../components/profileImage.js';
import { IconButton } from 'react-native-paper';
import Routes from '../Navigation/constants/Routes.js';

export default function Survey ({ route, navigation }) {
  let props = route.params;
  let userId = props?.userId;
  let ratingPeople = props?.people;
  let update = useRef({});

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentUserId, setCurrentUserId] = React.useState(ratingPeople[0].id);
  const [currentName, setCurrentName] = React.useState(ratingPeople[0].name);

  const [slider1, setSlider1] = React.useState(1);
  const [slider2, setSlider2] = React.useState(1);
  const [slider3, setSlider3] = React.useState(1);
  const [slider4, setSlider4] = React.useState(1);
  const [slider5, setSlider5] = React.useState(1);
  const [slider6, setSlider6] = React.useState(1);

  function nextPerson() { 
    if ((currentIndex + 1) == ratingPeople.length) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);

  }

  function previousPerson() {
    if ((currentIndex - 1) == -1) setCurrentIndex(ratingPeople.length - 1);
    else setCurrentIndex(currentIndex - 1);
  }

  function loadSlidersForUser() {
    console.log("Id", currentUserId);
    let sliders = update.current[currentUserId];
    console.log("Sliders", sliders);
    if (sliders) {
        for (let i = 0; i < sliders.length; i++) {
            let sliderVal = sliders[i];
            if (i == 0) setSlider1(sliderVal);
            if (i == 1) setSlider2(sliderVal);
            if (i == 2) setSlider3(sliderVal);
            if (i == 3) setSlider4(sliderVal);
            if (i == 4) setSlider5(sliderVal);
            if (i == 5) setSlider6(sliderVal);
        }
    }
  }

  function saveSliderValue(sliderVal, sliderNum) {
    update.current[currentUserId][sliderNum - 1] = sliderVal; 
  }

  useEffect(() => {
    // console.log('Update', update.current);
    loadSlidersForUser();  
  }, [currentUserId])

  useEffect(() => {
    setCurrentUserId(ratingPeople[currentIndex].id);
    setCurrentName(ratingPeople[currentIndex].name);
  }, [currentIndex])

  useEffect(() => {
    for (let peopleObj of ratingPeople) {
        update.current[peopleObj.id] = [1, 1, 1, 1, 1, 1];
    }
  }, [])

  return(
    <View style={styles.container}>
        <View style={styles.topBorder}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <IconButton
                    icon = {"chevron-left"}
                    onPress = {() => nextPerson()}
                />
                <Text style={styles.titleText}>Spark Survey</Text>
                <IconButton
                    icon = {"chevron-right"}
                    onPress = {() => previousPerson()}
                />
            </View>
            <Text style={styles.smallText}>Please provide feedback on the following spark leader/musician:</Text>
            <Text style={styles.nameText}>{currentName}</Text>
        </View>
        <ScrollView contentContainerStyle = {{paddingBottom: "25%"}}>
            <Text style={[styles.smallText, {marginBottom: "1%", marginTop: "4%"}]}>Based on your recent spark, please rate the above musician's performance in each of the following categories.</Text>
            <Text style={[styles.smallText, {marginTop: "0%", marginBottom: "0%"}]}>1 = Strongly Disagree, 2 = Disagree, 3 = Neither Agree or Disagree, 4 = Agree, 5 = Strongly Agree</Text>
            <Text style={styles.questionText}>This musician communicated well with the group.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider1}
                value={slider1}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 1)}
            /> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician showed up in a timely manner to all rehearsals and the Spark itself.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider2}
                value={slider2}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 2)}
            /> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician worked well with the other musicians in the group.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider3}
                value={slider3}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 3)}
            /> 
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician was responsive to words of advice or encouragement.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider4}
                value={slider4}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 4)}
            />
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>This musician's ability matches the information listed in their profile.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider5}
                value={slider5}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 5)}
            />
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={styles.questionText}>Overall, I would recommend this musician to play for other Sparks.</Text>
            <Slider
                style={{width: 300, height: 40, alignSelf: "center", marginTop: "5%"}}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={5}
                step={slider6}
                value={slider6}
                minimumTrackTintColor="#F2905B"
                maximumTrackTintColor="rgb(0, 97, 117)"
                onValueChange = {(sliderVal) => saveSliderValue(sliderVal, 6)}
            />
            <Text style={[styles.smallText, {marginTop: "2%", marginBottom: "0%"}]}>1                   2                   3                   4                  5</Text>
            <Text style={[styles.smallText, {marginTop: "10%", marginBottom: "7%"}]}>Thank you for your honest feedback!</Text>
            <TouchableOpacity style={styles.submitButton} onPress = {() => navigation.navigate("Navigator", props)}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
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
        fontSize: 20
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
        height: "4%",
        alignSelf: "center",
        borderRadius: 10,
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        alignSelf: "center"
    }
})