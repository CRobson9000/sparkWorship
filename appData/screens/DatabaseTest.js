import React, { useState } from 'react';
import { Text, TouchableHighlight, View} from 'react-native';
import { mainStyles } from '../styles/dataBaseTestStyles';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import '../../config/firebase.js';

export default function DatabaseTest({ navigation }) {
    const [dataText, setDataText] = useState("Database Text");

    function getNameListener() {
        const db = getDatabase();
        const reference = ref(db, "Data/funnyData");
        get(reference).then((snapshot) => {
            const myData = snapshot.val();
            setDataText(`${myData}`);
        });
    }

    function setName(firstName, lastName) {
        const db = getDatabase();
        const reference = ref(db, "data");
        set(reference, {
            firstName: firstName,
            lastName: lastName
        });
    }

    return (
        <View style={mainStyles.mainContainer}>
            <View style={mainStyles.infoStyles}>
                {/* Database Stuff */}
                <View style={[mainStyles.header, {backgroundColor: "indigo"}]}><Text style={{color: "white"}}> Current Navigation Router </Text></View>
                <Text style={mainStyles.text}> {dataText} </Text>
                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "purple"}]} onPress={() => getNameListener()}>
                    <Text style={{color: "white"}}>Get Data</Text>
                </TouchableHighlight>

                {/* Database Stuff */}
                <View style={[mainStyles.header, {backgroundColor: "yellow"}]}><Text> Current Navigation Router </Text></View>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "red"}]} onPress={() => navigation.navigate("ProfileScreen")}>
                    <Text style={{color: "white"}}> Profile Page </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "orange"}]} onPress={() => navigation.navigate("LocationData")}>
                    <Text style={{color: "white"}}> Location Data Test </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "blue"}]} onPress={() => navigation.navigate("SparkView")}>
                    <Text style={{color: "white"}}> Sparks Search </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}
