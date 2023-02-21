import React, { useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity, TouchableHighlight, FlatList, Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IconButton, ProgressBar, List } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { DialogBox, KeyboardView } from '../../components/components';
import { Observable, TDO, FirebaseButler, PushNotify } from '../../components/classes';
import { stylesPortrait } from "../../styles/portrait";
import Routes from "../Navigation/constants/Routes";
import ProfileImage from "../../components/profileImage.js";
import { styleSheet } from "../../styles/newSparkCreationStyles.js";
import { profileStyles } from "../../styles/profileViewStyles.js";
import Icon from 'react-native-vector-icons/Ionicons';

// photo upload imports
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';

// had to make a weird file to "redefine" ref since it already exists from firebase/database
import { storageRef } from '../../../config/additionalMethods'

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SparkSummary({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
  let currentSparkId = props?.currentSparkId || "-NHSPNV5tXpWmVtr6M3h";
  let currentSparkIdAttend = "-NFQzJtPbk7zfcY0Iy2l";

  const update = useRef({});

  // -------------------------
  // global variables for tabs
  // -------------------------
  // Location Tab
  const globalAddress = useRef("12345678");
  const globalZip = useRef("");
  const globalCity = useRef("");
  const globalState = useRef("");
  const globalAdditionalDirections = useRef("");

  const db = getDatabase();
  const storage = getStorage();

  // Set List Tab
  const globalSongs = useRef([]);

  // Helper Functions for tab code
  const renderDropDownItem = (item) => {
    return (
      <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
        <Text> {item} </Text>
      </View>
    )
  }

  // Dialog Boxes
  const addSongDialog = useRef(null);
  const addAttachmentDialog = useRef(null);
  
  // Dialog box code
  const [disable, setDisable] = React.useState("auto");
  const [contentOpacity, setContentOpacity] = React.useState(1);
  function openDialog(dialog, options) {
    setDisable("none");
    setContentOpacity(0.2);
    if (options) dialog.setupDialog(options.height, options.width, options.title, options.content);
    dialog.showDialog();
  }
  function closeDialog(dialog) {
    setDisable("auto");
    setContentOpacity(1);
    dialog.hideDialog();
  }

  async function saveFile(file, songKey, attachmentId) {
    // if we've gotten a file, convert it to a blob so it can be stored in cloud storage
    if (file) {
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
          const sparkFileRef = storageRef(storage, `sparkData/${currentSparkId}/${songKey}/${attachmentId}`);
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
      console.log("No file to upload");
    }
  }

  async function saveSpark() {
    let updateVals = Object.values(update.current);
    console.log("Update", updateVals);
    for (let i = 0; i < updateVals.length; i++) {
      // update data in firebase realtime database
      let overallKey = Object.keys(update.current)[i];
      let values = updateVals[i];

      if (overallKey == "location") {
        for (let j = 0; j < Object.values(values); j++) {
          let specificKey = Object.keys(values)[j];
          let specificValue = Object.values(values)[j];
          const itemRef = ref(db, `Sparks/${currentSparkId}/info/${overallKey}/${specificKey}`);
          await set(itemRef, specificValue);
        }
      }

      if (overallKey == "songs") {
        const itemRef = ref(db, `Sparks/${currentSparkId}/info/${overallKey}`);
        await set(itemRef, values);

        // loop through the songs and add the files to cloud storage
        for (let song of values) {
          let attachments = song.attachments;
          for (let attachment of attachments) {
            if (attachment.attachmentType == "file") await saveFile(attachment.value, attachment.songKey, attachment.attachmentId)
          }
        }
      }
    }
  }

  async function getSparkData() {
    let sparkData = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info`);
    // console.log("Spark Data", sparkData);
    let sparkArray = Object.values(sparkData);
    for (let i = 0; i < sparkArray.length; i++) {
      let key = Object.keys(sparkData)[i];
      let value = sparkArray[i];

      if (key == "location") {
        globalAddress.current = value?.address || "";
        globalCity.current = value?.city || "";
        globalAdditionalDirections.current = value?.additionalDirections || "";
        globalState.current = value?.state || "";
        globalZip.current = value?.zip || "";
      }
      else if (key == "songs") {
        globalSongs.current = value;  
      }
    }
  }

  useEffect(() => {
    getSparkData();
  }, [])

  const LocationRoute = () => {
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [additionalDirections, setAdditionalDirections] = React.useState("");

    let states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    // keep the global copy of each variable up to date with the local copy.
    useEffect(() => {
      if (address != "") {
        globalAddress.current = address
      }
    }, [address])
    useEffect(() => {
      if (globalCity != "") {
        globalCity.current = city
      }
    }, [city])
    useEffect(() => {
      if (globalState != "") {
        globalState.current = state
      }
    }, [state])
    useEffect(() => {
      if (globalZip != "") {
        globalZip.current = zip
      }
    }, [zip])
    useEffect(() => {
      if (globalAdditionalDirections != "") {
        globalAdditionalDirections.current = additionalDirections
      }
    }, [additionalDirections])

    useEffect(() => {
      setAddress(globalAddress.current);
    }, [globalAddress])

    useEffect(() => {
      setState(globalState.current);
    }, [globalState])

    useEffect(() => {
      setZip(globalZip.current);
    }, [globalZip])

    useEffect(() => {
      setZip(globalCity.current);
    }, [globalCity])

    useEffect(() => {
      setAdditionalDirections(globalAdditionalDirections.current);
    }, [globalAddress])

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
          <View style={[sparkViewStyles.sparkContainer]}>
              <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <ScrollView contentContainerStyle = {{paddingBottom: "20%"}} style={{width:"100%"}}>
                <View style={[sparkViewStyles.sparkVerticalContainer]}>
                  <View style={[sparkViewStyles.topLocationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>Address</Text>
                      <TextInput 
                        value = {address} 
                        placeholder = {address}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {text => {
                          update.current["location"]["address"] = text;
                          setAddress(text);
                        }}
                      />
                  </View>
                  <View style={[sparkViewStyles.locationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>City</Text>
                      <TextInput 
                        value = {city} 
                        placeholder = {city}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {(text) => {
                          update.current["location"]["city"] = text;
                          setCity(text)
                        }}
                      />                  
                  </View>
                  <View style={[sparkViewStyles.locationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>Zip</Text>
                      <TextInput 
                        value = {zip} 
                        placeholder = {zip}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {(text) => {
                          update.current["location"]["zip"] = text;
                          setZip(text)
                        }}
                      />                  
                  </View>
                  <View style={[sparkViewStyles.locationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>State</Text>
                      <Dropdown
                        style={styles.dropDown} 
                        data={states} 
                        renderItem={renderDropDownItem}
                        maxHeight = {"40%"}
                        itemTextStyle = {{color: "black", fontSize: 2}}
                        onChange = {(value) => {
                          update.current["location"]["state"] = value;
                          setState(value)
                        }}
                        placeholder = {state}
                        value = {state}
                      />
                  </View>
                  {/* <View style={[sparkViewStyles.bigLocationContainer]}>
                    <Text style={{paddingLeft:"2%"}}>When At Address</Text>                     
                  </View> */}
                  {/** Solves issue... have to check on other phones */}
                  <View style={[sparkViewStyles.bigLocationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>When At Address</Text>
                      <TextInput 
                        value = {additionalDirections} 
                        placeholder = {additionalDirections}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {(text) => setAdditionalDirections(text)}
                      />                  
                    </View>
                 </View>
                </ScrollView>
                </View>
            </View>
      </ScrollView>
    )
  }

  // const SetListRoute = () => (
  //   <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
  //     <List.Section title = "Set List">
        // <List.Accordion title="Rock of Ages" style = {profileStyles.accordian} titleStyle = {profileStyles.headerText}>
        //   <View style={profileStyles.listItemContainer}>
        //     <View style={profileStyles.listItemHeader}>
        //       <Text style={[profileStyles.accordionHeaderText]}> Lyrics </Text>
        //     </View>
        //     <View style={profileStyles.listItemContent}>
        //       <Text>RockOfAgesLyrics.pdf</Text>
        //     </View>
        //   </View>
        //   <View style={profileStyles.listItemContainer}>
        //     <View style={profileStyles.listItemHeader}>
        //       <Text style={[profileStyles.accordionHeaderText]}> Sheet Music </Text>
        //     </View>
        //     <View style={profileStyles.listItemContent}>
        //       <Text>RockOfAgesSongSheet.pdf</Text>
        //     </View>
        //   </View>
        //   <View style={sparkViewStyles.listItemContainer}>
        //     <View style={{width:"100%", alignItems:"center", marginBottom:"5%"}}>
        //       <Text style={{fontSize:32}}>
        //         +
        //       </Text>
        //     </View>
        //   </View>
        // </List.Accordion>
  //       <View style={{width:"100%", alignItems:"center"}}>
  //         <Text style={{fontSize:32}}>
  //           +
  //         </Text>
  //       </View>
  //     </List.Section>
      
  const SetListRoute = () => {
    const [songs, setSongs] = React.useState(null);

    // useEffect(() => {
    //   if (songs != null) {
    //     globalSongs.current = songs;
    //   }
    // }, [songs])

    useEffect(() => {
      // console.log("Global Songs"/*, globalSongs.current*/);
      setSongs(globalSongs.current);
    }, [globalSongs])

    function openAttachment(attachment) {
      /* if we are opening a web link, we can use the linking.  Otherwise, we have to retrieve the download link from
         google firebase.  If that link doesn't exist, we'll prompt the user to save their spark, which will push the download links
         up to cloud storage */
      if (attachment?.attachmentType == "link") {
        Linking.openURL(attachment.value);
      }
      else {
        getDownloadURL(storageRef(storage, `sparkData/${currentSparkId}/${attachment.songKey}/${attachment.attachmentId}`))
        .then((url) => {
          Linking.openURL(url);
        })
        .catch((error) => {
          // could not find a spark cover image so display the default instead
          console.log("Could not open file.  You may need to save your spark to access this file!");
        })
      }
    }

    const AddAttachmentContent = (props) => {
      const [fileName, setFileName] = React.useState(null);
      const [file, setFile] = React.useState(null);
      const [type, setType] = React.useState(null);
      const [link, setLink] = React.useState(null);
      const [attachmentName, setAttachmentName] = React.useState(null);

      async function uploadFile() {
        // prompt imput for file
        let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
        console.log('File', result);
        if (result.type != "cancel" && result.uri) {
          setFile(result.uri);
          setFileName(result.name);
        }
      }

      function addAttachment(songKey) {
        if ((file || link) && type && attachmentName) {
          let attachmentType;
          if (file) attachmentType = "file";
          else attachmentType = "link";

          //create a firebase key to get the attachment from
          const attachmentId = push(ref(db), null).key;
          let attachment = {
            songKey,
            attachmentId,
            attachmentName,
            type,
            attachmentType,
            value: file || link
          }
          globalSongs.current[props.index].attachments.push(attachment);
          update.current["songs"] = globalSongs.current;
          // console.log(update.current);
          closeDialog(addAttachmentDialog.current);
        }
      }

      return (
        <KeyboardView backgroundColor = {"rgb(219, 233, 236)"} style = {{height: "100%", width: "100%"}}> 
          <ScrollView contentContainerStyle = {{margin: "5%", paddingBottom: "30%"}}>
            <Text> Attachment Name </Text>
            <TextInput 
              value = {attachmentName} 
              placeholder = {attachmentName}
              style = {[styles.dialogBoxInputs, {height: "10%"}]} 
              onChangeText = {(text) => setAttachmentName(text)}
            />  
            <Text style = {{fontSize: 12, margin: "5%"}}> Type </Text>
            <Dropdown
              style={styles.dialogDropDown} 
              data={["Lyrics", "Note", "Chord Chart", "Music"]} 
              renderItem={renderDropDownItem}
              maxHeight = {"40%"}
              itemTextStyle = {{color: "black", fontSize: 2}}
              onChange = {(value) =>  setType(value)}
              placeholder = {type}
              value = {type}
            />

            <Text style = {{fontSize: 12, margin: "5%"}}> Upload a File </Text>
            <View style = {{width: "100%", height: "20%", alignItems: "center"}}>
              <TouchableHighlight onPress = {() => uploadFile()} style = {styles.uploadButtonDialog}>
                  <Text> Choose a file </Text>
              </TouchableHighlight> 
            </View>
            <Text style = {{flexWrap: "wrap", fontSize: 15, margin: "2%"}}> {`File Name: ${(fileName) ? fileName : "You have not choosen a file"}`} </Text>
            <Text style = {{width: "100%", textAlign: "center", fontSize: 20, margin: "5%"}}> Or </Text>

            <Text style = {{fontSize: 12, margin: "5%"}}> Input a Link </Text>
            <TextInput 
              value = {link} 
              placeholder = {link}
              style = {[styles.dialogBoxInputs, {height: "10%"}]} 
              onChangeText = {(text) => setLink(text)}
              multiline
            />  
          </ScrollView>  
          <View style = {styles.dialogButtonRow}>
            <TouchableOpacity style={[styles.dialogButton, {backgroundColor: "rgb(0, 97, 117)"}]} onPress = {() => addAttachment(props.songKey)}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dialogButton, {backgroundColor: "red"}]} onPress = {() => closeDialog(addAttachmentDialog.current)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardView>     
      )
    }

    const AddSongContent = () => {
      const [songName, setSongName] = React.useState(null);
      const [key, setKey] = React.useState(null);

      function addSong() {
        if (songName && key) {
          const songKey = push(ref(db), null).key;
          update.current["songs"] = songs;
          globalSongs.current.push({songKey, songName, key, attachments: []})
          closeDialog(addSongDialog.current);
        }
      }

      return (
        <KeyboardView backgroundColor = {"rgb(219, 233, 236)"} style = {{height: "100%", width: "100%"}}> 
          <ScrollView contentContainerStyle = {{margin: "5%", paddingBottom: "20%"}}>
            <Text> Song Name </Text>
            <TextInput 
              value = {songName} 
              placeholder = {songName}
              style = {styles.dialogBoxInputs} 
              onChangeText = {(text) => setSongName(text)}
            />  
            <Text> Song Key </Text>
            <TextInput 
              value = {key} 
              placeholder = {key}
              style = {styles.dialogBoxInputs} 
              onChangeText = {(text) => setKey(text)}
            />   
          </ScrollView>  
          <View style = {styles.dialogButtonRow}>
            <TouchableOpacity style={[styles.dialogButton, {backgroundColor: "rgb(0, 97, 117)"}]} onPress = {() => addSong()}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dialogButton, {backgroundColor: "red"}]} onPress = {() => closeDialog(addSongDialog.current)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardView>     
      )
    }

    // <List.Accordion title="Rock of Ages" style = {profileStyles.accordian} titleStyle = {profileStyles.headerText}>
    // <View style={profileStyles.listItemContainer}>
    //   <View style={profileStyles.listItemHeader}>
    //     <Text style={[profileStyles.accordionHeaderText]}> Lyrics </Text>
    //   </View>
    //   <View style={profileStyles.listItemContent}>
    //     <Text>RockOfAgesLyrics.pdf</Text>
    //   </View>
    // </View>
  //   <View style={profileStyles.listItemContainer}>
  //     <View style={profileStyles.listItemHeader}>
  //       <Text style={[profileStyles.accordionHeaderText]}> Sheet Music </Text>
  //     </View>
  //     <View style={profileStyles.listItemContent}>
  //       <Text>RockOfAgesSongSheet.pdf</Text>
  //     </View>
  //   </View>
  //   <View style={sparkViewStyles.listItemContainer}>
  //     <View style={{width:"100%", alignItems:"center", marginBottom:"5%"}}>
  //       <Text style={{fontSize:32}}>
  //         +
  //       </Text>
  //     </View>
  //   </View>
  // </List.Accordion>

    const renderSong = (object) => {
      return (
        <Collapse style={{width:"100%", flex: 1}}>
          <CollapseHeader style={profileStyles.accordian}>
            <Text style={profileStyles.headerText}>{object.item.songName}</Text>
            {/* <Text style={{color:"white", fontSize:20, paddingVertical:"2%"}}>Key: {object.item.key}</Text> */}
          </CollapseHeader>
          <CollapseBody style={[profileStyles.listItemContainer, {flex: 1}]}>
            <TouchableOpacity 
              onPress = {() => openDialog(addAttachmentDialog.current, {
                height: 75, 
                width: 90, 
                title: "Add Attachment", 
                content: <AddAttachmentContent songKey = {object.item.songKey} index = {object.index} />
              })}
              style = {{padding: "2%", width: "100%", justifyContent: "center", alignItems: "center"}}
            >
              <Text style={{color: "black", fontSize:15}}>+</Text>
            </TouchableOpacity>
            <View style={{alignItems:"center"}}>
              <AttachmentContent attachments = {object.item.attachments}/>
            </View>
          </CollapseBody>
        </Collapse>
      );
    }

    // <View style={profileStyles.listItemContainer}>
    //   <View style={profileStyles.listItemHeader}>
    //     <Text style={[profileStyles.accordionHeaderText]}> Lyrics </Text>
    //   </View>
    //   <View style={profileStyles.listItemContent}>
    //     <Text>RockOfAgesLyrics.pdf</Text>
    //   </View>
    // </View>
    const renderAttachment = (object) => {
      return (
        <View style = {{padding: "2%"}}>
          <TouchableHighlight onPress = {() => openAttachment(object.item)} style={[profileStyles.listItemHeader]}>
            <View style = {{padding: "2%", flexDirection: "row"}}>
              <Text style={[profileStyles.accordionHeaderText]}> {object.item.type}: </Text>
              <Text style = {{fontSize: 15}}> {object.item.attachmentName} </Text>
            </View>
          </TouchableHighlight>
          {/* <View style={profileStyles.listItemContent}>
            <TouchableHighlight onPress = {() => openAttachment(object.item)}style = {styles.attachment}>
              <Text style = {{fontSize: 15}}> {object.item.attachmentName} </Text>
            </TouchableHighlight>
          </View> */}
        </View>
      )
    }

    const SongContent = (props) => {
      if (songs && songs.length != 0) {
        return (
          <View style = {{height: "55%", width: "100%"}}>
            <FlatList
              style = {{flex: 1}}
              data = {songs}
              renderItem = {renderSong}
            />
          </View>
        )
      }
      else {
        return (
          <View style = {{height: "55%", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <Text> There are no songs in this spark </Text>
          </View>
        )
      }
    }

    const AttachmentContent = (props) => {
      if (props.attachments && props.attachments.length != 0) {
        return (
          <View style = {{flex: 1}}>
            <FlatList
              style = {{flex: 1}}
              data = {props.attachments}
              renderItem = {renderAttachment}
            />
          </View>
        )
      }
      else {
        return (
          <View style = {{height: "55%", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <Text> There are no attachments for this song </Text>
          </View>
        )
      }
    }

    return (
      <List.Section title = "Set List">
        {/* <View style={{height: "15%", width: "100%", alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontSize:28, fontWeight:'500'}}>Set List</Text>
        </View> */}
        <SongContent />
        <TouchableOpacity 
          onPress = {() => openDialog(addSongDialog.current, {
            height: 75, 
            width: 90, 
            title: "Add Song", 
            content: <AddSongContent />
          })}
          style = {{height: "15%", width: "100%", justifyContent: "center", alignItems: "center"}}
        >
          <Text style={{fontSize:48}}>+</Text>
        </TouchableOpacity>
      </List.Section>
    );
  }

    /**
     * Old SetList Code
     * 
     *   <List.Section style={{marginTop: "6%"}}>
          <List.Accordion style={styles.accordian} title="Song 1">
            <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
          <List.Accordion style={styles.accordian} title="Song 2">
          <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
          <List.Accordion style={styles.accordian} title="Song 3">
          <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
        </List.Section>
     */

    const TimesRoute = () => (
      <Text> Available Soon! </Text>
  //     <ScrollView>
  //     <View style={[sparkViewStyles.sparkVerticalContainer]}>
  //     <View style={[sparkViewStyles.centerContents]}>
  //       <View style={{alignItems: "center", justifyContent: "center"}}>
  //           <Text style={{fontSize:28, paddingTop:"4%", fontWeight:'500'}}>Times</Text>
  //       </View>
  //       <View style={{alignItems: "center", justifyContent: "center", marginTop:"6%"}}>
  //           <Text style={[sparkViewStyles.inbetweenText]}>Spark Begins On</Text>
  //       </View>
          
  //         <View style={[sparkViewStyles.timeContainer]}>
  //             {/* <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>05</Text>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             <Text style = {{fontSize: 30}}>10</Text>
  //             {/* <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/> */}
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             <Text style = {{fontSize: 30}}>22</Text>
  //             {/* <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/> */}
  //             <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
  //             <Text style = {{fontSize: 30}}>5</Text>
  //             {/* <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/> */}
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
  //             <Text style = {{fontSize: 30}}>30</Text>
  //             {/* <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/> */}
  //             <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
  //             <Text style = {{fontSize: 30}}>PM</Text>
  //             {/* <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/> */}
  //         </View>
  //     </View>
  //     <View style={[sparkViewStyles.centerContents, sparkViewStyles.middleMan]}>
  //       <View style={{alignItems: "center", justifyContent: "center"}}>
  //           <Text style={[sparkViewStyles.inbetweenText]}>First Rehearsal On</Text>
  //       </View>
  //         <View style={[sparkViewStyles.timeContainer]}>
  //             {/* <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>05</Text>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             {/* <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>05</Text>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             {/* <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>22</Text>
  //             <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
  //             {/* <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>06</Text>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
  //             {/* <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/> */}
  //             <Text style = {{fontSize: 30}}>45</Text>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
  //             <Text style = {{fontSize: 30}}>PM</Text>
  //             {/* <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/> */}
  //         </View>
  //     </View>
  //     <View style={[sparkViewStyles.centerContents]}>
  //         <Text style={[sparkViewStyles.inbetweenText]}>Roles to be Filled By</Text>
  //         <View style={[sparkViewStyles.timeContainer]}>
  //             <Input placeHolderText={"MM"} start = {inputs.publishedMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMonth.setVal(val)}/>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             <Input placeHolderText={"DD"} start = {inputs.publishedDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedDay.setVal(val)}/>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
  //             <Input placeHolderText={"YY"} start = {inputs.publishedYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedYear.setVal(val)}/>
  //             <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
  //             <Input placeHolderText={"12"} start = {inputs.publishedHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedHours.setVal(val)}/>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
  //             <Input placeHolderText={"30"} start = {inputs.publishedMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMinutes.setVal(val)}/>
  //             <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
  //             <Input placeHolderText={"PM"} start = {inputs.publishedAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedAmPM.setVal(val)}/>
  //         </View>
  //     </View>
  // </View>
  // </ScrollView>
    );

    const RequestsRoute = () => {
      const acceptRequest = async(role, id) => {
        //define "final" for the role selected to be the id of the user selected
        const db = getDatabase();
        const acceptRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/final`);
        set(acceptRef, id);
    
        // schedule a notification to be sent about the survey to the user which was just accepted
        let sparkOBJ = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/times/spark`);
        let sparkTDO = new TDO(null, null, null, null, null, null, sparkOBJ["TDO"]);
        const navigateToSurvey = () => {
          navigation.navigate(Routes.sparkSurvey);
        }
        let sparkOverNotify = new PushNotify(navigateToSurvey);
        sparkOverNotify.scheduleNotification(sparkTDO, "Peer Survey", "Please tell us how this spark went!", userId);
    
        //add spark to user's section as a spark they are playing for
        const addSparkRef = ref(db, `Users/${id}/sparks/playing`);
        push(addSparkRef, currentSparkId);
      }
    
      return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
        <List.Section title = "Requests">
          <List.Accordion title="Piano" style = {profileStyles.accordian} titleStyle = {profileStyles.headerText}>
            <View style={profileStyles.listItemContainer}>
              <View style={profileStyles.listItemContent}>
                <View style={[sparkViewStyles.accordianItems]}>
                  <View style={[sparkViewStyles.profileView]}>
                    <ProfileImage userId = {userId} changeable = {false} size = {"small"}/>
                    <Text style={{fontSize:16, paddingHorizontal:"2%"}}>Aaron Bennet</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Icon name="add" size={28} />
                    <Icon name="close-outline" size={28} />
                  </View>
                </View>
              </View>
            </View>
            <View style={profileStyles.listItemContainer}>
              <View style={profileStyles.listItemContent}>
                <View style={[sparkViewStyles.accordianItems]}>
                  <View style={[sparkViewStyles.profileView]}>
                    <ProfileImage userId = {userId} changeable = {false} size = {"small"}/>
                    <Text style={{fontSize:16, paddingHorizontal:"2%"}}>Claire Barclay</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Icon name="add" size={28} />
                    <Icon name="close-outline" size={28} />
                  </View>
                </View>
              </View>
            </View>
            <View style={profileStyles.listItemContainer}>
              <View style={profileStyles.listItemContent}>
                <View style={[sparkViewStyles.accordianItems]}>
                  <View style={[sparkViewStyles.profileView]}>
                    <ProfileImage userId = {userId} changeable = {false} size = {"small"}/>
                    <Text style={{fontSize:16, paddingHorizontal:"2%"}}>Kelso Brittany</Text>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Icon name="add" size={28} />
                    <Icon name="close-outline" size={28} />
                  </View>
                </View>
              </View>
            </View>
          </List.Accordion>
          <View style={{width:"100%", alignItems:"center"}}>
            <Text style={{fontSize:32}}>
              +
            </Text>
          </View>
        </List.Section>

        </ScrollView>
        
        /** <ScrollView>
        <View style={[sparkViewStyles.sparkVerticalTest]}>
          <View style={{alignItems: "center", justifyContent: "center"}}>
              <Text style={{fontSize:28, paddingTop:"4%", paddingBottom:"6%", fontWeight:'500'}}>Volunteers</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

            </Image>
            <Text style={[sparkViewStyles.originalBoxText]}>Project Lead (you)</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

            </Image>
            <Text style={[sparkViewStyles.originalBoxText]}>Accepted Friend</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

            </Image>
            <Text style={[sparkViewStyles.boxText]}> Piano: Colin Robson </Text>
            <TouchableOpacity onPress = {() => acceptRequest("piano", "kicswUalNUNMF4qYmT1OzY7IymG3")} style={[sparkViewStyles.acceptButton]}>
            <Image source={require("../../../assets/check-mark-24.png")}>

            </Image>
            </TouchableOpacity>
            <TouchableOpacity style={[sparkViewStyles.denyButton]}>
            <Image source={require("../../../assets/x-mark-24.png")}>

            </Image>
            </TouchableOpacity>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

            </Image>
            <Text style={[sparkViewStyles.boxText]}>Volunteer 2</Text>

            <TouchableOpacity style={[sparkViewStyles.acceptButton]}>
            <Image source={require("../../../assets/check-mark-24.png")}>

            </Image>
            </TouchableOpacity>
            <TouchableOpacity style={[sparkViewStyles.denyButton]}>
            <Image source={require("../../../assets/x-mark-24.png")}>

            </Image>
            </TouchableOpacity>

          </View>
        </View>
        </ScrollView> */
      );
    }

    // const SixthRoute = () => (
    //    <DropDownPicker
    //      placeholderStyle={{
    //        alignContent: "center", justifyContent: "center"
    //      }}
    //      dropDownContainerStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      containerStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      dropDownStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      showArrowIcon={false}
    //      open={open}
    //      value={value}
    //      items={items}
    //      setOpen={setOpen}
    //      setValue={setValue}
    //      setItems={setItems}
    //      style={{color: "#FFA500"}}
      
    //    />
    //);

    const ReadLocationRoute = () => (
      <View style={[sparkViewStyles.sparkVerticalContainer]}>
        <ScrollView contentContainerStyle = {{flex: 1, alignItems: "center", paddingBottom: "50%"}}>
          <Image style={{height: 70, width: 70, marginTop: "7%"}} source={require('../../../assets/locationpin2.png')}/>
          <Text style={{fontSize: 25, marginTop: "5%"}}>Location Title</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>Street Address</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>City, State Zip Code</Text>
          <Text style={{marginRight: "51%", marginTop: "7%"}}>Special Instructions</Text>
          <View style={{borderColor: "#F2905B", borderRadius: 10, borderWidth: 2, height: "30%", width: "85%", marginTop: "2%"}}/>
          <TouchableOpacity style={{width: "85%", height: "18%", marginTop: "6%", backgroundColor: "rgb(0, 97, 117)", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>Google Maps</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );

    const ReadVolunteersRoute = () => (
      <View style={[sparkViewStyles.sparkVerticalTest]}>
        <ScrollView contentContainerStyle = {{flex: 1}}>
          <View style={[sparkViewStyles.boxOne, {marginTop: "8%"}]}>
            <ProfileImage size = {"small"} userId = {null}/>
            <Text style={{marginLeft: "5%"}}>Spark Leader: Colin Robson</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <ProfileImage size = {"small"} userId = {null}/>
            <Text style={{marginLeft: "5%"}}>Bass: Azianna Yang</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <ProfileImage size = {"small"} userId = {null}/>
            <Text style={{marginLeft: "5%"}}>Piano: Colin Robson</Text>
          </View>
          <View style={[sparkViewStyles.boxOne]}>
            <ProfileImage size = {"small"} userId = {null}/>
            <Text style={{marginLeft: "5%"}}>Vocals: Austin Dorsey</Text>
          </View>
        </ScrollView>
      </View>
    );

    let [currentIndex, setCurrentIndex] = React.useState(1);
        
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Location' },
        { key: 'second', title: 'Times' },
        { key: 'third', title: 'Set List' },
        { key: 'fourth', title: 'Requests' },
    //  { key: 'sixth', title: 'Test'}
    ]);
    
    const renderScene = SceneMap({
        first: LocationRoute,
        second: TimesRoute,
        third: SetListRoute,
        fourth: RequestsRoute,
    //  sixth: SixthRoute
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#006175' }}
        scrollEnabled= {true}
        labelStyle={{color:"#006175"}}
        style={{ backgroundColor: 'rgb(219, 233, 236)'}}
      />
    );

    const attendSpark = () => {
      //add spark to user's section as a spark they are attending
      const db = getDatabase();
      const attendSparkRef = ref(db, `Users/${userId}/sparks/attending`)
      push(attendSparkRef, currentSparkIdAttend);

      // schedule notification to arrive after the spark is complete
      let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.sparkSurvey));
      sparkOverNotify.scheduleNotification(null, "How was your experience?", "Please fill out this survery to let us know how things went!", userId); 
    }

    async function testRequest() {
      let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.publicProfile, {selectedUserId: "5cYHMVySLmOGyeZZeqA3oQ0DkO82"}));
      sparkOverNotify.scheduleNotification(null, "Spark Request", "You just received a request for your spark!", userId);
    }

    const [MySparkName, setMySparkName] = React.useState("Spark Name");

    async function setSparkName() {
      let sparkName = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/name`);
      setMySparkName(sparkName);
    }

    // const [MyDate, setMyDate] = React.useState("Date and Time");
    
    // async function setDate() {
    //   let date = await FirebaseButler.fbGet("Sparks/-NFQyokFAqLdeFJLDkSv/info/times/spark/TDO");
    //   setMyDate(date);
    // }

    const [MyAddress, setMyAddress] = React.useState("Location");

    async function setAddress() {
      let address = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/address`);
      setMyAddress(address);
    }

    const [MyCity, setMyCity] = React.useState("");

    async function setCity() {
      let city = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/city`);
      setMyCity(city);
    }

    const [MyState, setMyState] = React.useState("");

    async function setState() {
      let state = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/state`);
      setMyState(state);
    }

    useEffect(() => {
      setSparkName();
      // setDate();
      setAddress();
      setCity();
      setState();
      // setInstruments();
    }, [])

    let myScreens = [
      <LocationRoute />, <TimesRoute />, <SetListRoute />, <RequestsRoute />
    ];
  
  return(
    <View style={styles.MainContainer}>
      <View pointerEvents = {disable} style = {{height: "100%", width: "100%", opacity: contentOpacity}}>
        <View style={styles.topBorder}>
          <View style={[styles.row2, {justifyContent: 'center', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
            {/* REMOVE TESTREQUEST BUTTON AND REPLACE WITH ATTENDSPARK BUTTON */}
            {/* <IconButton onPress = {() => testRequest()}style = {{position: "absolute", left: "2%"}}icon = "head-check" size = {30}/> */}
            {/* <Text style={styles.titleText}></Text> */}
            <IconButton onPress = {() => saveSpark()}style = {{position: "absolute", left: 0}}icon = "content-save-check"/>
            <IconButton onPress = {() => attendSpark()}style = {{position: "absolute", left: "85%"}}icon = "checkbox-marked-circle-plus-outline"/>
          </View>
          <View style = {styles.row}>
            <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10, color: "#006175", marginLeft: "19%"}}>{(MySparkName) ? `${MySparkName}'s Spark` : "My Spark"}</Text>
          </View>
          <View style={styles.row}>
            <View style={{marginLeft:"4%"}}>
              <ProfileImage size = {"medium"} userId = {null}/>
            </View>
            <View style={styles.column}>
              <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13, marginRight: screenWidth/60}}>Date and Time</Text>
              <View style={styles.row2}>
                <Image style={{height: 20, width: 20, marginRight: "2%"}} source={require('../../../assets/locationpin.png')}></Image>
                <Text style = {{flexWrap: "wrap", width: "75%", marginRight: "1%"}}>{MyAddress} {MyCity}, PA</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, {marginLeft: screenWidth/5, marginRight: screenWidth/50, top: "30%"}]}>
            <TouchableOpacity style={profileStyles.constantButtons}><Text style={profileStyles.buttonText}>Attend Spark</Text></TouchableOpacity>
            <TouchableOpacity style={profileStyles.constantButtons}><Text style={profileStyles.buttonText}>Next</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex}/>
        </View>
      </View>
      <DialogBox ref = {addSongDialog} />
      <DialogBox ref = {addAttachmentDialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "white",
    height: "100%",
  },

  buttonText: {
    color: "white",
    fontSize: 12,
  },

  dialogButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "35%",
    borderRadius: 10
  },

  dialogButtonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "5%",
    marginBottom: "5%",
    height: "7%"
  },

  dialogDropDown: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    height: "10%"
  },

  attachment: {
    width: "100%",
  },

  topBorder:{
    height: "35%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },

  content: {
    // height: '80%'
    width: "100%",
    flex: 1
  },

  titleText: {
    fontSize: 20,
    textAlign: 'center',
    color: "#006175"
  },

  dialogBoxInputs: {
    flexWrap: "wrap",
    flexGrow: 1,
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "100%",
    height: "25%",
    alignSelf: "center",
    margin: "4%", 
    padding: "3%",
    fontSize: 12
  },

  uploadButtonDialog: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    padding: "5%",
    alignSelf: "center",
    padding: "3%",
    fontSize: 12
  },

  row: {
    flexDirection: 'row',
    top: '25%',
    justifyContent: 'space-evenly'
  },

  row2: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  profilePicture: {
    height: 125,
    width: 125,
  },

  accordian: {
    backgroundColor: '#F9CBB1',
    color: "#FFFFFF",
    padding: 10,
    marginLeft: '5%',
    marginRight: '5%', 
  },

  accordionSubheading: {
    left:15,
    backgroundColor: "#F2905B",
    marginRight: '5%',
    marginLeft: '1%',
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF"
  },

  navigation: {
    backgroundColor: "rgb(219, 233, 236)",
    height: "7%"
  }, 
  
  genres: {
    backgroundColor: '#006175',
    borderRadius: 55,
    height: 105, 
    width: 105,
    justifyContent: 'center',
    alignItems: 'center'
  },

  socialsBox: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "85%",
    height: 60,
    marginBottom: "6%",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: 'center'
  },

  socialsLogo: {
    height: "70%",
    width: "10%",
    left: "20%"
  },

  dropDown: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "100%",
    height: "100%"
  },

})

const sparkViewStyles = StyleSheet.create({

  listItemContainer: {
    backgroundColor: "white",
    backgroundColor: "#F9CBB1",
    width: "85%",
    marginLeft: "7%"
  },

  accordianItems: {
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"space-between",
    marginTop: "2%"
  },
  profileView:{
    flexDirection:"row", 
    alignItems:"center"
  },
  addButton: {
      height: "50%",
      width: "20%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#006175",
      borderRadius: 7
  },
  sparkContainer:
  {
      width:"100%",
      height: "100%",
      backgroundColor: "rgba(255,255,255,1)",
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center"
  },

  topLocationContainer:{
    width:"90%",
    flexDirection:"column", 
    height:"10%",
    marginTop: "7%"
  },

  locationContainer:
  {
      width:"90%",
      flexDirection:"column", 
      height:"9%",
      marginTop: "12%"
  },
  bigLocationContainer:{
      width:"90%",
      flexDirection:"column", 
      height:"20%",
      marginTop: "12%"
  },
  timeContainer:{
      flexDirection:"row",
      marginBottom: "8%",
      justifyContent: "center",
      alignItems: "center"
  },
  sparkVerticalContainer:
  {
    padding: "5%",
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center"
  },
  sparkVerticalTest:{
    width:"100%",
    height:"100%",
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "column", 
    alignItems: "center"
  },
  bottomContainer:{
      width:"100%",
      height:"8%",
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center"
  },

  newInputBox:{
      height:"100%",
      borderWidth: 0,
      borderColor: "black",
      backgroundColor: "#F9CBB1",
      paddingLeft: "1%",
      marginTop: "1%",
      borderRadius: 8,
      textAlign: 'center',
      color: "white",
      width: "100%",
  },


  locationInputBox:{
      textAlign: 'left',
      paddingLeft: '2%',
      fontSize: 18
  },
  dateInputBox: {
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 24,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "100%",
      alignContent: "center"
  },
  minuteInputBox:{
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 36,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "15%",
      alignContent: "center"
  },
  hourInputBox:{
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 36,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "15%",
      alignContent:"flex-end",
      justifyContent:"flex-end"
  },
  dateInputContainer:{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "1%",
      width: "25%",
  },

  button:
  {
      backgroundColor: "#006175",
      marginHorizontal: "17%",
      color: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      paddingTop: "2%",
      paddingBottom: "2%",
      marginTop: "2%",
      marginBottom: "2%",
      borderWidth: 0,
      paddingHorizontal: "5%"
  },
  timeAndDateInput:
  {
      fontSize:26,
      justifyContent:"center"
  },
  inbetweenText:
  {
      marginHorizontal:"5%", 
      fontSize:20
  },
  middleMan:
  {
      marginVertical: "20%"
  },
  boxOne:
  {
      backgroundColor: "#F2905B",
      marginBottom: "5%",
      borderRadius: 10,
      padding: "2%",
      height: "15%",
      // width: "85%",
      flexDirection: "row",
      alignItems: "center",
  },
  boxText:{
    width: "30%", 
    marginTop: "11.5%",
    marginBottom: "11.5%",
    marginRight: "5%",
    marginLeft: "13.5%"
  },
  originalBoxText:{
    width: "58.5%", 
    marginTop: "11.5%",
    marginBottom: "11.5%",
    marginRight: "5%"
  },
  profileImage:{
    width: "12.5%", 
    height: "59%",
    marginLeft: "6%"
  },

  accordionImage:{
    width: "8%", 
    height: "30%",
    marginVertical: "0%"
  },

  accordionImageRight:{
    width: "8%", 
    height: "30%",
    marginRight: "2%",
    marginVertical: "0%"
  },

  acceptButton:{
    width: "8%", 
    height: "30%",
    marginVertical: "0%"
  },

  denyButton:{
    width: "8%", 
    height: "30%",
    marginRight: "2%",
    marginVertical: "0%"
  },

  sideOfAccordionImage:{
    width: "15%", 
    height: "24%",
    marginLeft: "3%"
  }
  
});