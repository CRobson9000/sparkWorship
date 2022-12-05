import React, { useState } from 'react';
import { Text, TouchableHighlight, View} from 'react-native';
import { mainStyles } from '../../styles/dataBaseTestStyles';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import '../../../config/firebase.js';

export default function Router({ navigation }) {
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
                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "red"}]} onPress={() => navigation.navigate("ProfileCreation")}>
                    <Text style={{color: "white"}}> Profile Creation Page </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "purple"}]} onPress={() => navigation.navigate("SparkCreation")}>
                    <Text style={{color: "white"}}> Spark Creation </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "purple"}]} onPress={() => navigation.navigate("SparkView")}>
                    <Text style={{color: "white"}}> Spark Search </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "blue"}]} onPress={() => navigation.navigate("Test")}>
                    <Text style={{color: "white"}}> Messaging Back-end </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[mainStyles.button, {backgroundColor: "blue"}]} onPress={() => navigation.navigate("ComponentTesting")}>
                    <Text style={{color: "white"}}> Components Testing </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}
