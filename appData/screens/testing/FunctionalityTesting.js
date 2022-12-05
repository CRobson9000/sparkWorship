import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../components/components';
import { Observable, TDO } from '../components/classes';
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

// photo upload imports
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

// had to make a weird file to "redefine" ref since it already exists from firebase/database
import { storageRef } from '../../../config/additionalMethods'

import { screensEnabled } from 'react-native-screens';
import { stylesPortrait } from '../../styles/portrait';
import Routes from "../navigation/constants/Routes.js"

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

  function uploadPhoto() {
    // --------------------------------
    // select photo from file selector
    // --------------------------------

    // No permissions request is necessary for launching the image library
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {

      // -------------------------------------------
      // Convert result to blob which can be stored
      // -------------------------------------------

      if (result) {
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
          xhr.open("GET", result.uri, true);
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
            const sparkImageRef = storageRef(storage, `sparkData/${currentSparkId}/sparkCover`);
            uploadBytes(sparkImageRef, fileBlob).then((finalSnap) => {
              console.log("File upload was successful!");
              setImage(result.uri);
            })
            .catch((error) => {
              // Upload to firebase failed so call an error or message
              console.log("failed to upload image blob to firebase");
            });
          }
        })
        .catch((error) => {
          // Conversion to blob failed so throw an error or message
          console.log("failed to convert image to blob");
        })
      }
    })
    .catch((error) => {
      // Image Picker failed so throw an error or message
      console.log("failed to find a file");
    }) 
  }

  async function getPhoto() {
    //set the url of a default photo, which will be shown in there is no image found
    let defaultPic = "data:image/png;base64,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"
    
    //get the photo from firebase storage
    const storage = getStorage();
    getDownloadURL(storageRef(storage, `sparkData/${currentSparkId}/sparkCover`))
    .then((url) => {
      //display the image that was found using its url
      console.log("Got photo");
      setImage(url);
    })
    .catch((error) => {
      // could not find a spark cover image so display the default instead
      console.log("Display default");
      setImage(defaultPic);
    })
  }

  useEffect(() => {
    getPhoto();
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
        <TouchableHighlight style = {styles.acceptButton} onPress = {() => navigation.navigate(Routes.userDashboard, route.params)}>
            <Text style={{color: "white"}}> Return </Text>
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