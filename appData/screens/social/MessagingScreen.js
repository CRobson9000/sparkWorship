import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../../components/components';
import { FirebaseButler, Observable, TDO } from '../../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import ProfileImage from '../../components/profileImage.js';

export default function Message({ route, navigation }) {
  let props = route.params;
  let currentUser = props?.userId;

  // attributes brought from Chatlist Screen
  let peopleLookup = props?.peopleLookup;
  let peopleString = props?.peopleString;
  let convoData = props?.convoData;
  let conversationId = useRef(props.convoId || null);

  const [messages, setMessages] = React.useState(Object.values(convoData?.["messages"] || []) || []);
  let currentMessage = useRef("");

  const renderMessage = (object, index, separators) => {
    //convert firebase obj to TDO
    let TDOobject = object.item.sentTDO.TDO;
    let tdo = new TDO (null, null, null, null, null, null, TDOobject
    );

    console.log("OBJ", object.item.sender);

    return(
      <View style = {styles.message}>
        <View style={{flexDirection:"row", justifyContent: "flex-start"}}>
          {/* When the other person sends a message, the message box should be a light gray rather than the light orange. */}
          <View style = {styles.textMessage}><Text>{object.item.message}</Text></View>
          {/* Profile picture of the sender should be on the right side of the message and the profile picture of the receiver
              should be on the left side of the message when they send a message */ }
            <ProfileImage userId = {object.item.sender} size = {"small"}/>
          {/* <View style = {styles.sender}><Text>{object.item.sender}</Text></View> */}
        </View>
        <View style = {styles.time}>
        {/* Date should not be displayed for every single message. There should just be one date for all messages in that day */}
        {/* <Text style = {{margin: "2%"}}>{tdo.getFormattedDate()}</Text> */}
          <Text style = {{margin: "2%"}}>{tdo.getFormattedTime()}</Text>
        </View>
      </View>
    );
  }

  async function sendMessage() {
    console.log("Conversation Id", conversationId.current);
    //if there's a message, send it
    if (currentMessage.current != "" && currentMessage.current.trim() != "") {
      // get database
      const db = getDatabase();

      // setup a conversation space and get the id if there isn't already one |  TDO: more needed here!
      if (!conversationId.current) {
        const reference = ref(db, "Messaging");
        let idsArray = Object.keys(peopleLookup);
        let conversationObject = await push(reference, {
          people: [...idsArray, currentUser]
        }); 
        let conversationIdArray = conversationObject.toString().split("/");
        conversationId.current = conversationIdArray[conversationIdArray.length - 1];

        //get current conversations array
        let currentConvoArray = await FirebaseButler.fbGet(`Users/${currentUser}/conversations`) || [];
        currentConvoArray.push(conversationId.current);

        //set new the current conversations array
        const newConvoRef = ref(db, `Users/${currentUser}/conversations`);
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
        message: currentMessage.current,
        sender: currentUser,
        sentTDO
      });
      
      // update local copy of message
      messages.unshift({
        message: currentMessage.current,
        sender: currentUser,
        sentTDO
      });

      setMessages([...messages]);

      
    }
  }

  //only run this method on the first render of the page
  useEffect(() => {
    //clear myMessage
    currentMessage.current = "";
  }, [messages]);

  return(
    <View style={styles.container}>
        <View style={styles.topBorder}>
            {/* Name will need to be rendered */}
            <Text style={styles.nameText}>{peopleString}</Text>
        </View>
        <View style={styles.content}>
            <FlatList 
              style = {styles.flatList}
              data = {messages}
              renderItem = {renderMessage}
              inverted = {true}
            />
        </View>
        <View style={styles.messagingContainer}>
            <Input placeHolderText={"Type Message"} func = {(val) => currentMessage.current = val}/>
            <TouchableHighlight style = {styles.button} onPress = {() => sendMessage()}>
              <Text style={styles.sendText}> Send </Text>
            </TouchableHighlight>
        </View>

    </View>
)}

const styles = StyleSheet.create({

    container: {
        height: "100%",
        backgroundColor: "white"
    },

    topBorder: {
        height: "13%",
        backgroundColor: "#DBE9EC",
    },

    content: {
        height: "74%"
    },

    messagingContainer: {
        height: "13%",
        backgroundColor: "#DBE9EC",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    nameText: {
        alignSelf: "center",
        fontSize: 20,
        top: 70,
        //fontWeight: '500'
    },

    message: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 20,
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
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
        height: "30%",
        backgroundColor: '#006175',
        width: "18%",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginRight: 30
    },

    sendText: {
        fontSize: 15, 
        //fontWeight: "400",
        color: "white"
    }

})