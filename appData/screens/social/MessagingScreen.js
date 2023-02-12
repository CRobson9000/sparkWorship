import { StyleSheet, TouchableHighlight, Text, View, TextInput, FlatList, Dimensions } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider, KeyboardView } from '../../components/components';
import { FirebaseButler, Observable, TDO } from '../../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import ProfileImage from '../../components/profileImage.js';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Message({ route, navigation }) {
  let props = route.params;
  let userId = props?.userId;

  // attributes brought from Chatlist Screen
  let peopleLookup = props?.peopleLookup;
  let peopleString = props?.peopleString;
  let convoData = props?.convoData;
  let conversationId = useRef(props.convoId || null);

  const [messages, setMessages] = React.useState([]);
  const input = useRef("");
  const [currentMessage, setCurrentMessage] = React.useState("");

  //helper method to invert an array
  function invert(array) {
    let finalArray = [];
    for (let index in array) {
      finalArray.unshift(array[index]);
    }
    return finalArray;
  }

  const renderMessage = (object, index, separators) => {
    //convert firebase obj to TDO
    let TDOobject = object.item.sentTDO.TDO;
    let tdo = new TDO (null, null, null, null, null, null, TDOobject);
    let senderId = object.item.sender;

    // Function to determine whether to display the profile pic on the left or right side of the message
    const leftOrRight = () => {
      if (senderId == userId) {
        return (
          <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
            <View style = {{flex: 1, flexDirection: "column"}}>
              <ProfileImage userId = {object.item.sender} size = {"small"}/>
              <View style = {styles.time}>
              {/* Date should not be displayed for every single message. There should just be one date for all messages in that day */}
              {/* <Text style = {{margin: "2%"}}>{tdo.getFormattedDate()}</Text> */}
                <Text style = {{margin: "2%"}}>{tdo.getFormattedTime()}</Text>
              </View>
            </View>
            <View style = {[styles.textMessage, {marginLeft: "2%"}]}>
              {/* When the other person sends a message, the message box should be a light gray rather than the light orange. */}
              <Text>{object.item.message}</Text>
            </View>
          </View>
        );
      }
      else {
        return (
          <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
            <View style = {[styles.textMessage, {backgroundColor: "#E7E6E6"}]}>
              <Text>{object.item.message}</Text>
            </View>
            {/* Profile picture of the sender should be on the right side of the message and the profile picture of the receiver
              should be on the left side of the message when they send a message */ }
            <View style = {{flex: 1, flexDirection: "column"}}>
              <ProfileImage userId = {object.item.sender} size = {"small"}/>
              <View style = {styles.time}>
              {/* Date should not be displayed for every single message. There should just be one date for all messages in that day */}
              {/* <Text style = {{margin: "2%"}}>{tdo.getFormattedDate()}</Text> */}
                <Text style = {{margin: "2%"}}>{tdo.getFormattedTime()}</Text>
              </View>
            </View>
          </View>
        );
      }
    }

    return(
      <View style = {styles.message}>
        {
          leftOrRight()
        }          
      </View>
    );
  }

  async function sendMessage() {
    //if there's a message, send it
    if (currentMessage != "" && currentMessage.trim() != "") {
      // get database
      const db = getDatabase();

      // setup a conversation space and get the id if there isn't already one |  TDO: more needed here!
      if (!conversationId.current) {
        const reference = ref(db, "Messaging");
        let idsArray = Object.keys(peopleLookup);
        let conversationObject = await push(reference, {
          people: [...idsArray, userId]
        }); 
        let conversationIdArray = conversationObject.toString().split("/");
        conversationId.current = conversationIdArray[conversationIdArray.length - 1];

        //get current conversations array
        let currentConvoArray = await FirebaseButler.fbGet(`Users/${userId}/conversations`) || [];
        currentConvoArray.push(conversationId.current);

        //set new the current conversations array
        const newConvoRef = ref(db, `Users/${userId}/conversations`);
        set(newConvoRef, currentConvoArray);
        for (let peopleIndex in Object.keys(peopleLookup)) {
          const recipientRef = ref(db, `Users/${Object.keys(peopleLookup)[peopleIndex]}/conversations`);
          set(recipientRef, currentConvoArray);
        }
      }
  
      //create the message
      let dateObj = new Date();
      let sentTDO = new TDO(
        dateObj.getHours(), 
        dateObj.getMinutes(),
        dateObj.getSeconds(),
        dateObj.getMonth() + 1,
        dateObj.getDate(),
        dateObj.getFullYear()
      );

      //set update message in firebase
      const messageRef = ref(db, `Messaging/${conversationId.current}/messages`);
      await push(messageRef, {
        message: currentMessage,
        sender: userId,
        sentTDO
      });
      
      // update local copy of message
      let finalMessages = [...messages];
      finalMessages.unshift({
        message: currentMessage,
        sender: userId,
        sentTDO
      });

      setMessages([...finalMessages]); 
      setCurrentMessage("");

    }
  }

  //only run this method on the first render of the page
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        let startingMessages = [];
        if (convoData) startingMessages = Object.values(convoData?.["messages"]) || [] ;
        let inverted = invert(startingMessages);
        setMessages([...inverted]);
    });
    return unsubscribe;
  }, [navigation]);

  return(
    <View style={styles.container}>
        <View style={styles.topBorder}>
            {/* Name will need to be rendered */}
            <Text style={styles.nameText}>{peopleString}</Text>
        </View>
        <View style={styles.content}>
          <KeyboardView flatList = {true}>
              <FlatList 
                style = {styles.flatList}
                data = {messages}
                renderItem = {renderMessage}
                inverted = {true}
              />
          </KeyboardView>
        </View>
        <View style={styles.messagingContainer}>
            <TextInput 
              onChangeText = {(val) => setCurrentMessage(val)}
              value = {currentMessage}
              style = {{flex: 1, padding: "2%", textAlign: "left", flexWrap: "wrap"}}
              placeholder = {"type your message..."}
            />
            <TouchableHighlight style = {styles.button} onPress = {() => sendMessage()}>
              <Text style={styles.sendText}> Send </Text>
            </TouchableHighlight>
        </View>
    </View>
)}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    topBorder: {
        position: "absolute",
        top: 0,
        height: "15%",
        width: "100%",
        backgroundColor: "#DBE9EC",
    },

    content: {
        width: "100%",
        height: "70%",
        position: "absolute",
        top: "15%"
    },

    messagingContainer: {
        height: "15%",
        width: "100%",
        backgroundColor: "#DBE9EC",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "4%",
        position: "absolute",
        bottom: 0
    },

    nameText: {
        alignSelf: "center",
        fontSize: 20,
        top: 70,
        fontFamily: "RNSMiles"
        //fontWeight: '500'
    },

    message: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 20,
        margin: "5%"
    },
      
    sender: {
        backgroundColor: "white",
        justifyContent: "center",
        width: "20%",
        borderRadius: 15,
        padding: 5,
        alignItems: "center"
    },
      
    textMessage: {
        backgroundColor: "#EBA179",
        justifyContent: "center",
        width: "75%",
        alignItems: "flex-start",
        paddingLeft: "5%",
        padding: "5%",
        marginRight: "5%",
        borderRadius: 20
    },
    
    time: {
        backgroundColor: "white",
        justifyContent: "flex-end",
        width: "100%",
        flexDirection: "row"
    },

    button: {
        height: height/30,
        backgroundColor: '#006175',
        width: "18%",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sendText: {
        fontSize: 15, 
        //fontWeight: "400",
        color: "white"
    }

})