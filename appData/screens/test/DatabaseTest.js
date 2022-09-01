import React, { useState } from 'react';
import { Text, TouchableHighlight, View} from 'react-native';
import { mainStyles } from './styles/dataBaseTestStyles';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import '../../../config/firebase.js';

// function setName() {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + userId);
//   set(reference, {
//     highscore: score,
//   });
// }

export default function DatabaseTest({ navigation }) {
    const [dataText, setDataText] = useState("Database Text");

    function getNameListener() {
        const db = getDatabase();
        const reference = ref(db, "data");
        get(reference).then((snapshot) => {
            const name = snapshot.val();
            setDataText(`${name.firstName} ${name.lastName}`);
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
                <Text style={mainStyles.text}> {dataText} </Text>
                <Text style={mainStyles.text}> More Text </Text>
                <Text style={mainStyles.text}> Even more Text </Text>
                <TouchableHighlight style={mainStyles.button} onPress={() => getNameListener()}>
                    <Text style={{color: "white"}}>Get Data</Text>
                </TouchableHighlight>

                <TouchableHighlight style={mainStyles.button2} onPress={() => setName("Rob", "Bush")}>
                    <Text style={{color: "white"}}>Set Data</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}
