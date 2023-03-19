import React, { useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity, TouchableHighlight, FlatList, Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IconButton, ProgressBar, List } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { DialogBox, KeyboardView } from '../../components/components';
import { Observable, TDO, FirebaseButler, PushNotify } from '../../components/classes';
import Routes from "../Navigation/constants/Routes";
import ProfileImage from "../../components/profileImage.js";
import { styleSheet } from "../../styles/newSparkCreationStyles.js";
import { profileStyles } from "../../styles/profileViewStyles.js";
import Icon from 'react-native-vector-icons/Ionicons';

// photo upload imports
import { getStorage, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
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
  const [readMode, setReadMode] = React.useState(true);

  // -------------------------
  // global variables for tabs
  // -------------------------
  // Top Section Info
  const [sparkName, setSparkName] = React.useState(null);
  const [sparkLocationString, setSparkLocationString] = React.useState(null);
  const [sparkLeaderId, setSparkLeaderId] = React.useState(null);

  // Location Tab
  const globalLocationTitle = useRef("");
  const globalAddress = useRef("");
  const globalZip = useRef("");
  const globalCity = useRef("");
  const globalState = useRef("");
  const globalAdditionalDirections = useRef("");
  const globalGoogleMapsLink = useRef("");

  const db = getDatabase();
  const storage = getStorage();

  // Set List Tab
  const globalSongs = useRef([]);

  // Volunteer and Request Tab
  const globalRoleData = useRef({}); 

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
    // ----------------------------------
    // setup general info about the spark
    // ----------------------------------
    let updateVals = Object.values(update.current);
    for (let i = 0; i < updateVals.length; i++) {
      // update data in firebase realtime database
      let overallKey = Object.keys(update.current)[i];
      let values = updateVals[i];
      
      if (overallKey == "location") {
        for (let j = 0; j < Object.values(values).length; j++) {
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
    // clear update after all values have been set
    update.current = {};
  }

  function toggleReadWrite() {
    setReadMode(!readMode);
  }

  async function getSparkData() {
    // setup info data
    let sparkData = await FirebaseButler.fbGet(`Sparks/${currentSparkId}`);
    let sparkInfoArray = Object.values(sparkData['info']);
    for (let i = 0; i < sparkInfoArray.length; i++) {
      let key = Object.keys(sparkData['info'])[i];
      let value = sparkInfoArray[i];
      if (key == "name") {
        setSparkName(value);
      }

      if (key == "location") {
        globalAddress.current = value?.address || "";
        globalCity.current = value?.city || "";
        globalAdditionalDirections.current = value?.additionalDirections || "";
        globalState.current = value?.state || "";
        globalZip.current = value?.zip || "";
        globalLocationTitle.current = value?.locationTitle;
        globalGoogleMapsLink.current = value?.googleMapsLink;
        // set location string for top area
        setSparkLocationString(`${value.address} ${value.city}, ${value.state}`) || "No location set";
      }
      else if (key == "songs") {
        globalSongs.current = value;  
      }
    }

    // setup roles
    let rolesObject = sparkData['roles'];
    globalRoleData.current = rolesObject;
  }

  useEffect(() => {
    getSparkData();
  }, [])

  const LocationRoute = () => {
    const [locationTitle, setLocationTitle] = React.useState("")
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [additionalDirections, setAdditionalDirections] = React.useState("");
    const [googleMapsLink, setGoogleMapsLink] = React.useState("");

    let states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    // keep local copy up to date with the global copy
    useEffect(() => {
      setAddress(globalLocationTitle.current);
    }, [globalLocationTitle])

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
      setCity(globalCity.current);
    }, [globalCity])

    useEffect(() => {
      setAdditionalDirections(globalAdditionalDirections.current);
    }, [globalAdditionalDirections])

    useEffect(() => {
      setGoogleMapsLink(globalGoogleMapsLink.current);
    }, [globalGoogleMapsLink])

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
          <View style={[sparkViewStyles.sparkContainer]}>
              <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <ScrollView contentContainerStyle = {{paddingBottom: "20%"}} style={{width:"100%"}}>
                <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <View style={[sparkViewStyles.locationContainer]}>
                    <Text style={{paddingLeft:"2%"}}>Location Title</Text>
                    <TextInput 
                      value = {locationTitle} 
                      placeholder = {locationTitle}
                      style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                      onChangeText = {(text) => {
                        if (!update.current.location) update.current["location"] = {} 
                        update.current["location"]["locationTitle"] = text;
                        setLocationTitle(text)
                      }}
                    />                  
                  </View>
                  <View style={[sparkViewStyles.topLocationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>Address</Text>
                      <TextInput 
                        value = {address} 
                        placeholder = {address}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {text => {
                          if (!update.current.location) update.current["location"] = {} 
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
                          if (!update.current.location) update.current["location"] = {} 
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
                          if (!update.current.location) update.current["location"] = {} 
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
                        maxHeight = {"100%"}
                        itemTextStyle = {{color: "black", fontSize: 2}}
                        onChange = {(value) => {
                          if (!update.current.location) update.current["location"] = {} 
                          update.current["location"]["state"] = value;
                          setState(value)
                        }}
                        dropdownPosition = {"bottom"}
                        containerStyle = {{top: -30}}
                        placeholder = {state}
                        value = {state}
                      />
                  </View>
                  <View style={[sparkViewStyles.locationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>Google Maps Link</Text>
                      <TextInput 
                        value = {googleMapsLink} 
                        placeholder = {googleMapsLink}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {(text) => {
                          if (!update.current.location) update.current["location"] = {} 
                          update.current["location"]["googleMapsLink"] = text;
                          setGoogleMapsLink(text);
                        }}
                      />                  
                  </View>
                  <View style={[sparkViewStyles.bigLocationContainer]}>
                      <Text style={{paddingLeft:"2%"}}>When At Address</Text>
                      <TextInput 
                        multiline = {true}
                        value = {additionalDirections} 
                        placeholder = {additionalDirections}
                        style = {[styleSheet.inputBox, sparkViewStyles.locationInputBox]} 
                        onChangeText = {(value) => {
                          if (!update.current.location) update.current["location"] = {};
                          update.current["location"]["additionalDirections"] = value; 
                          setAdditionalDirections(value)
                        }}
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
        <View style={[{margin: "5%"}]}>
          <Collapse style={{flex: 1}}>
            <CollapseHeader style = {[profileStyles.accordian, {padding: "5%"}]}>
              <Text style = {{fontSize: 15}}>{object.item.songName}</Text>
              <List.Icon style = {{position: "absolute", top: "90%", right: "10%"}} color = {"gray"} icon = {"chevron-down"}/>
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
        </View>
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
          <View style = {{height: "75%", width: "100%"}}>
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
        <TouchableOpacity 
          onPress = {() => openDialog(addSongDialog.current, {
            height: 75, 
            width: 90, 
            title: "Add Song", 
            content: <AddSongContent />
          })}
          style = {{height: "15%", bottom: 0, width: "100%", justifyContent: "center", alignItems: "center"}}
        >
          <Text style={{fontSize:32}}>+</Text>
        </TouchableOpacity>
        <SongContent />
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
      <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text> Available Soon! </Text>
      </View>
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
      const [rolesWithRequests, setRolesWithRequests] = React.useState([]);

      function allRolesFinal(roles) {
        for (let role of roles) {
          if (role.final == "") return false;
        }
        return true;
      }
      
      async function setupRolesAndRequests() {
        let roles = [];
        for (const [role, roleData] of Object.entries(globalRoleData.current)) {
          // only push the role to the list of roles to view requests for if each role's final variable is empty
          let roleDataNoRequest = JSON.parse(JSON.stringify(roleData));
          delete roleDataNoRequest.requests;
          if (!allRolesFinal(Object.values(roleDataNoRequest))) {
            let fancyRoleNamePart1 = role.split('_');
            let fancyRoleNamePart2 = fancyRoleNamePart1.map(role => role[0].toUpperCase() + role.substring(1));
            let fancyRoleName = fancyRoleNamePart2.join(' ');
            let requests = roleData.requests || [];
            let requestsWithData = [];
            if (requests.length != 0) {
              for (let requestUserId of Object.keys(requests)) {
                let userName = await FirebaseButler.fbGet(`Users/${requestUserId}/info/name`);
                requestsWithData.push({requestUserId, userName, parentRole: role});
              }
            }
            roles.push({role: fancyRoleName, requests: requestsWithData});
          }
        }
        setRolesWithRequests([...roles]);
      }
      useEffect(() => {
        setupRolesAndRequests();
      }, [globalRoleData.current])

      function getAvailableRoleKey(roles) {
        for (const [roleKey, roleData] of Object.entries(roles)) {
          if (roleKey != 'requests') {
            if (roleData.final == "") return roleKey;
          }
        }
      }
      
      const acceptRequest = async(role, id) => {
        //define "final" for the role selected to be the id of the user selected
        const db = getDatabase();
        let roleRequestDataObject = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/roles/${role}`)
        // get an available role key
        let roleKey = getAvailableRoleKey(roleRequestDataObject);
        if (roleKey) {
          const acceptRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/${roleKey}/final`);
          set(acceptRef, id);
  
          // delete request from request array for the current role from local and remote copies
          delete globalRoleData.current[role].requests[id];
          const deleteRequestRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/requests`);
          set(deleteRequestRef, globalRoleData.current[role].requests);
      
          // schedule a notification to be sent about the survey to the user which was just accepted
          let sparkTimeOBJ = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/times/spark`);
          if (sparkTimeOBJ) {
            let sparkTDO = new TDO(null, null, null, null, null, null, sparkTimeOBJ["TDO"]);
            const navigateToSurvey = () => {
              navigation.navigate(Routes.sparkSurvey);
            }
            let sparkOverNotify = new PushNotify(navigateToSurvey);
            sparkOverNotify.scheduleNotification(sparkTDO, "Peer Survey", "Please tell us how this spark went!", userId);
          }
      
          //add spark to user's section as a spark they are playing for
          const addSparkRef = ref(db, `Users/${id}/sparks/playing`);
          push(addSparkRef, currentSparkId);
  
          // update local copies of everything with new database data
          setupRolesAndRequests();
        }
        else {
          console.log("No available roles!");
        }
      }

      function rejectRequest(role, id) {
        const db = getDatabase();
        // add this user to the rejected array
        const rejectRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/rejected/${id}`);
        set(rejectRef, true);

        //delete this user from the current requests array
        globalRoleData.current[role].requests[id];

        // update request copy in firebase
        const requestRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/requests`);
        set(requestRef, globalRoleData.current[role].requests);  
    
        // update local copies of everything with new database data
        setupRolesAndRequests()      
      }

      const renderRoleRequest = (object) => {
        return (
          <Collapse style={{padding: '5%'}}>
            <CollapseHeader style={[profileStyles.accordian, {padding: "5%", margin: 0, flexDirection: "row"}]}>
              <Text style = {{fontSize: 15}}>{object.item.role}</Text>
              <List.Icon style = {{position: "absolute", top: "90%", right: "10%"}} color = {"gray"} icon = {"chevron-down"}/>
            </CollapseHeader>
            <CollapseBody style={[profileStyles.listItemContainer]}>
              <FlatList
                style = {{padding: "2%"}}
                data = {object.item.requests}
                renderItem = {renderRequest}
                ListEmptyComponent = {() => {
                  return (
                    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text> This role has no requests </Text>
                    </View>
                  )
                }}
              />
            </CollapseBody>
          </Collapse>
        );
      }

      const renderRequest = (object) => {
        return (
          <View style={[sparkViewStyles.accordianItems]}>
            <View style={[sparkViewStyles.profileView]}>
              <ProfileImage userId = {object.item.requestUserId} changeable = {false} size = {"small"}/>
              <Text style={{fontSize:16, width: "80%", padding: "5%"}}>{object.item.userName}</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center", padding: "5%"}}>
              <IconButton icon="check-bold" onPress = {() => acceptRequest(object.item.parentRole, object.item.requestUserId)} />
              <IconButton icon="close-thick" onPress = {() => rejectRequest(object.item.parentRole, object.item.requestUserId)} />
            </View>
          </View>
        );
      }
    
      return (
        // <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
        <List.Section title = "Requests">
          <FlatList
            data = {rolesWithRequests}
            renderItem = {renderRoleRequest}
          /> 
          {/* <List.Accordion title="Piano" style = {profileStyles.accordian} titleStyle = {profileStyles.headerText}>
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
          </List.Accordion> */}
          {/* <View style={{width:"100%", alignItems:"center"}}>
            <Text style={{fontSize:32}}>
              +
            </Text>
          </View> */}
        </List.Section>

        // </ScrollView>
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
          <Text style={{fontSize: 25, marginTop: "5%"}}>{globalLocationTitle?.current || "This spark will be held at:" }</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>{globalAddress.current}</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>
            {`${globalCity.current}, ${globalState.current} ${globalZip.current}`}
          </Text>
          <Text style={{marginRight: "51%", marginTop: "7%"}}>Special Instructions</Text>
          <View style={{borderColor: "#F2905B", borderRadius: 10, borderWidth: 2, padding: "5%", width: "85%", marginTop: "2%"}}>
            <Text> {globalAdditionalDirections.current || "No special directions"} </Text>
          </View>
          <TouchableOpacity 
            style={{width: "85%", height: "18%", marginTop: "6%", backgroundColor: "rgb(0, 97, 117)", borderRadius: 10, alignItems: "center", justifyContent: "center"}}
            onPress = {() => {
              if (globalGoogleMapsLink.current) Linking.openURL(globalGoogleMapsLink.current)
              else console.log("There is no link to Google Maps");
            }}
          >
            <Text style={{color: "white"}}> Google Maps </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );

    const VolunteersRoute = () => {
      const [volunteers, setVolunteers] = React.useState([]);
      const [showRequestButton, setShowRequestButton] = React.useState(true);

      const requestToPlay = async(role) => {
        // make sure that this user hasn't already requested to join this spark before we add them to the requests
        let requests = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/roles/${role}/requests`) || {};
        // also make sure that this user hasn't already been rejected
        let rejected = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/roles/${role}/rejected`) || {};
        if (!Object.keys(requests).includes(userId) && !Object.keys(rejected).includes(userId)) {
          //add currentUserId to a requested section of the spark with the currentSparkId
          const db = getDatabase();
          const roleRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/requests/${userId}`);
          set(roleRef, true);
          
          // get the updated spark data from firebase
          getSparkData();
          // remove user from request
          //send notification to the user
          // let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.publicProfile, {selectedUserId: "5cYHMVySLmOGyeZZeqA3oQ0DkO82"}));
          // sparkOverNotify.scheduleNotification(null, "Spark Request", "You just received a request for your spark!", sparkLeaderId);
        } 

      }
      
      async function getVolunteersFromRoles() {
        let finalVolunteersArray = [];
        let roleData = JSON.parse(JSON.stringify(globalRoleData.current))
        for (const [roleName, roleIds] of Object.entries(roleData)) {
          if (roleName != 'spark_leader') {
            // separate by underscored
            let fancyRoleNamePart1 = roleName.split('_');
            let fancyRoleNamePart2 = fancyRoleNamePart1.map(role => role[0].toUpperCase() + role.substring(1));
            let fancyRoleName = fancyRoleNamePart2.join(' ');

            // this skips over requests array because it has no 'final' attribute
            delete roleIds['requests'];
            for (let finalRole of Object.values(roleIds)) {
              let userName = null;
              if (finalRole?.final) {
                if (finalRole.final == userId) setShowRequestButton(false);
                // get user name and add to object
                userName = await FirebaseButler.fbGet(`Users/${finalRole.final}/info/name`); 
              } 
              finalVolunteersArray.push({role: roleName, fancyRoleName, userId: finalRole?.final || null, userName})
            } 
          }
        }
        setVolunteers([...finalVolunteersArray]);
      }

      useEffect(() => {
        getVolunteersFromRoles();
      }, [globalRoleData]);

      const ShowRequestButton = (props) => {
        if (showRequestButton == true) {
          return (
            <IconButton 
              onPress = {() => requestToPlay(props.role)}
              icon = "checkbox-marked-circle-plus-outline"
              size = {20}
            />
          );
        }
        else {
          return (
            <View style = {{height: 40, width: 40}} />
          );
        }
      }

      const renderVolunteer = (object) => {
        if (object.item.userId !== null) {
          return (
            <View style={[sparkViewStyles.boxOne, {marginTop: "8%"}]}>
              <ProfileImage size = "small" userId = {object.item.userId} />
              <Text style={{marginLeft: "5%"}}>{object.item.fancyRoleName}: {object.item.userName} </Text>
            </View>
          );
        }
        else {
          return (
            <View style={[sparkViewStyles.boxOne, {marginTop: "8%", justifyContent: "center"}]}>
              <Text style={{marginLeft: "5%"}}>{object.item.fancyRoleName}: Needs filled! </Text>
              <ShowRequestButton role = {object.item.role} />
            </View>
          )
        }
      }

      return (
        <View style={[sparkViewStyles.sparkVerticalTest]}>
          <FlatList
            style = {{flex: 1}}
            data = {volunteers}
            renderItem = {renderVolunteer}
          />
        </View>
      );
    }

    const ReadSetListRoute = () => {
      const [songs, setSongs] = React.useState(null);
  
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
    
      const renderSong = (object) => {
        return (
          <View style={[{marginBottom: "5%"}]}>
            <Collapse style={{width:"100%", padding: "5%"}}>
              <CollapseHeader style={[profileStyles.accordian, {padding: "5%", flexDirection: "row"}]}>
                <Text style = {{fontSize: 15}}>{object.item.songName}</Text>
                <List.Icon style = {{position: "absolute", top: "90%", right: "10%"}} color = {"gray"} icon = {"chevron-down"}/>
              </CollapseHeader>
              <CollapseBody style={[profileStyles.listItemContainer, {flex: 1}]}>
                <View style={{alignItems:"center"}}>
                  <AttachmentContent attachments = {object.item.attachments}/>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        );
      }
  
      const renderAttachment = (object) => {
        return (
          <View style = {{padding: "2%"}}>
            <TouchableHighlight onPress = {() => openAttachment(object.item)} style={[profileStyles.listItemHeader]}>
              <View style = {{padding: "2%", flexDirection: "row"}}>
                <Text style={[profileStyles.accordionHeaderText]}> {object.item.type}: </Text>
                <Text style = {{fontSize: 15}}> {object.item.attachmentName} </Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
  
      const SongContent = (props) => {
        if (songs && songs.length != 0) {
          return (
            <View style = {{height: "100%", width: "100%"}}>
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
        <View style = {{flex: 1}}>
          <List.Section title = "Set List">
            <SongContent />
          </List.Section>
        </View>
      );
    }

    let [currentIndex, setCurrentIndex] = React.useState(1);
        
    const [index, setIndex] = React.useState(0);
    const [editRoutes] = React.useState([
        { key: 'first', title: 'Location' },
        { key: 'second', title: 'Times' },
        { key: 'third', title: 'Set List' },
        { key: 'fourth', title: 'Volunteers' },
        { key: 'fifth', title: 'Requests' },
    ]);
    
    const renderEditScene = SceneMap({
        first: LocationRoute,
        second: TimesRoute,
        third: SetListRoute,
        fourth: VolunteersRoute,
        fifth: RequestsRoute,
    });

    const [readRoutes] = React.useState([
        { key: 'first', title: 'Location' },
        { key: 'second', title: 'Times' },
        { key: 'third', title: 'Set List' },
        { key: 'fourth', title: 'Volunteers' },
    ]);

    const renderReadScene = SceneMap({
        first: ReadLocationRoute,
        second: TimesRoute,
        third: ReadSetListRoute,
        fourth: VolunteersRoute,
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

      // TODO: evaluate whether we need this: schedule notification to arrive after the spark is complete
      // let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.sparkSurvey));
      // sparkOverNotify.scheduleNotification(null, "How was your experience?", "Please fill out this survery to let us know how things went!", userId); 
    }
  
  return(
    <View style={styles.MainContainer}>
      <View pointerEvents = {disable} style = {{height: "100%", width: "100%", opacity: contentOpacity}}>
        <View style={styles.topBorder}>
          <View style={[styles.row2, {justifyContent: 'center', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
            {/* REMOVE TESTREQUEST BUTTON AND REPLACE WITH ATTENDSPARK BUTTON */}
            {/* <IconButton onPress = {() => testRequest()}style = {{position: "absolute", left: "2%"}}icon = "head-check" size = {30}/> */}
            {/* <Text style={styles.titleText}></Text> */}
            <IconButton onPress = {() => saveSpark()}style = {{position: "absolute", left: 0}}icon = "content-save-check"/>
            <IconButton onPress = {() => toggleReadWrite()}style = {{position: "absolute", left: "42%"}} icon = "pencil"/>
          </View>
          <View style = {styles.row}>
            <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10, color: "#006175"}}>{sparkName}</Text>
          </View>
          <View style={[styles.row, {marginLeft: "10%"}]}>
            <View style={{marginLeft:"4%"}}>
              <ProfileImage size = {"medium"} userId = {sparkLeaderId}/>
            </View>
            <View style={styles.column}>
              <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13, marginRight: screenWidth/60}}>Date and Time</Text>
              <View style={styles.row2}>
                <Image style={{height: 20, width: 20, marginRight: "2%"}} source={require('../../../assets/locationpin.png')}></Image>
                <Text style = {{flexWrap: "wrap", width: "75%", marginRight: "1%"}}>{sparkLocationString}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, {marginLeft: screenWidth/5, marginRight: screenWidth/50, top: "30%"}]}>
            <TouchableOpacity style={profileStyles.constantButtons} onPress = {() => attendSpark()}>
              <Text style={profileStyles.buttonText}>Attend Spark</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.constantButtons}><Text style={profileStyles.buttonText}>Next</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <TabView 
            navigationState={{ index, routes: (readMode) ? readRoutes : editRoutes }} 
            renderScene={(readMode) ? renderReadScene : renderEditScene} 
            renderTabBar={renderTabBar} 
            onIndexChange={setIndex}
          />
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
    padding: "2%",
    backgroundColor: '#F9CBB1',
    color: "#FFFFFF",
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
    paddingBottom: "2%",
    width: "85%",
    marginLeft: "7%"
  },

  accordianItems: {
    flex: 1,
    flexDirection: "row", 
    alignItems: "center", 
    padding: "5%",
    // backgroundColor: "green"
  },
  profileView:{
    width: "60%",
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
      paddingTop: "2%",
      paddingBottom: "2%",
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
      fontSize: 18,
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
      padding: "3%",
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