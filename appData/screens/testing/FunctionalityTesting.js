import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../components/components';
import { Observable, TDO } from '../components/classes';
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

// photo upload imports
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';

// had to make a weird file to "redefine" ref since it already exists from firebase/database
import { storageRef } from '../../../config/additionalMethods'

import { screensEnabled } from 'react-native-screens';
import { stylesPortrait } from '../../styles/portrait';
import Routes from "../Navigation/constants/Routes.js"

export default function MyTest({ route, navigation }) {
  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
  let targetUser = "kicswUalNUNMF4qYmT1OzY7IymG3"
  let currentSparkId = "-NFQyokFAqLdeFJLDkSv";
  let roleToRequest = "acoustic guitar";

  const [image, setImage] = React.useState(null);


  const requestToPlay = (role) => {
    //add currentUserId to a requested section of the spark with the currentSparkId
    const db = getDatabase();
    const roleRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/requested`);
    push(roleRef, userId);

    //send notification to the user

    //log the action

  }

  const acceptRequest = (role, id) => {
    //define "final" for the role selected to be the id of the user selected
    const db = getDatabase();
    const acceptRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/final`);
    set(acceptRef, id);

    //send notification to the user

    //log the action

    //add spark to user's section as a spark they are playing for
    const addSparkRef = ref(db, `Users/${id}/sparks/playing`);
    push(addSparkRef, currentSparkId);
  }

  const attendSpark = () => {
    //add spark to user's section as a spark they are attending
    const db = getDatabase();
    const attendSparkRef = ref(db, `Users/${userId}/sparks/attending`)
    push(attendSparkRef, currentSparkId);
  }

  // -----------------
  // Photo Upload Code
  // -----------------

  async function uploadFile(songId, type) {
    // prompt imput for file
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
    if (result.type != "cancel" && result.uri) {
      // if we've gotten a file, convert it to a blob so it can be stored in cloud storage
      let file = result.uri;
      const filePromise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", file, true);
        xhr.send(null);
      });

      filePromise.then((fileBlob) => {

        // ----------------------------------------------------------------
        // Store result in Cloud Storage and store a reference in firebase
        // ----------------------------------------------------------------

        if (fileBlob) {
          // Get main storage
          const storage = getStorage();
    
          // Points to 'sparkData/<currentID>'
          const sparkFileRef = storageRef(storage, `sparkData/${currentSparkId}/${songId}/${type}`);
          uploadBytes(sparkFileRef, fileBlob).then((finalSnap) => {
            console.log("File upload was successful!");
          })
          .catch((error) => {
            // Upload to firebase failed so call an error or message
            console.log("failed to upload file blob to firebase");
          });
        }
      })
      .catch((error) => {
        // Conversion to blob failed so throw an error or message
        console.log("failed to convert file to blob");
      })
    } 
    else {
      console.log("Cancelled!");
    }
  }
  
  async function openFile(songId, type, resourceUrl) {    
    //get the file from firebase storage
    const storage = getStorage();
    if (!resourceUrl) {
      getDownloadURL(storageRef(storage, `sparkData/${currentSparkId}/${songId}/${type}`))
      .then((url) => {
        // open link
        Linking.openURL(url);
      })
      .catch((error) => {
        // could not find a spark cover image so display the default instead
        console.log("Could not open file");
      })
    }
    else {
      Linking.openURL(resourceUrl);
    }
  }

  useEffect(() => {
    //getPhoto();
  }, [])

  return (
    <View style = {styles.container}>
      <View style = {styles.section}>
        <TouchableHighlight style = {[styles.requestButton]} onPress = {() => requestToPlay(roleToRequest)}>
          <Text style={{color: "white"}}> Request </Text>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.acceptButton} onPress = {() => acceptRequest(roleToRequest, userId)}>
          <Text style={{color: "white"}}> Accept </Text>
        </TouchableHighlight>
      </View>
      <View style = {styles.section}>
        <TouchableHighlight style = {styles.acceptButton} onPress = {() => attendSpark()}>
            <Text style={{color: "white"}}> Attend</Text>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.acceptButton} onPress = {() => uploadFile("mySong", "lyrics")}>
            <Text style={{color: "white"}}> Upload File </Text>
        </TouchableHighlight>
      </View>
      <View style = {styles.section}>
        <TouchableHighlight onPress = {() => openFile("mySong", "lyrics", "https://docs.expo.dev/versions/latest/sdk/webview/")}>
          <Text> Open file </Text>
        </TouchableHighlight>
      </View>

      {/* <View style = {styles.section}>
        <TouchableHighlight style = {styles.requestButton} onPress = {() => uploadPhoto()}>
            <Text style={{color: "white"}}> Upload Photo </Text>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.requestButton} onPress = {() => getPhoto()}>
            <Text style={{color: "white"}}> Get Photo </Text>
        </TouchableHighlight>
      </View> */}
      {/* <View style = {styles.photo}>
        <Image 
          source={{
            uri: image
          }}
          style = {{height: "100%", width: "100%"}}
        />
      </View> */}
    </View> 
  );    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    flexDirection: "row", 
    width: "100%", 
    height: "10%", 
    justifyContent: "center",
    alignItems: "center"
  },
  requestButton: {
    height: "100%",
    width: "30%",
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  acceptButton: {
    height: "100%",
    width: "30%",
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },
  photo: {
    height: "25%",
    width: "50%",
    backgroundColor: "yellow",
    marginTop: "10%"
  }
});