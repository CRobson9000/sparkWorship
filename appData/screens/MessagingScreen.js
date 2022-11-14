import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../components/components';
import { Observable, TDO } from '../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { screensEnabled } from 'react-native-screens';
import { stylesPortrait } from '../styles/portrait';

export default function Message({ navigation }) {

    const renderMessage = (object, index, separators) => {
        //convert firebase obj to TDO
        let TDOobject = object.item.sentTDO.TDO;
        let tdo = new TDO(
          TDOobject.hours, 
          TDOobject.minutes,
          TDOobject.seconds,
          TDOobject.month,
          TDOobject.day,
          TDOobject.year
    );

    return(
        <View style = {styles.message}>
          <View style={{flexDirection:"row", justifyContent: "flex-start"}}>
            {/* When the other person sends a message, the message box should be a light gray rather than the light orange. */}
            <View style = {styles.textMessage}><Text>{object.item.message}</Text></View>
            {/* Profile picture of the sender should be on the right side of the message and the profile picture of the receiver
                should be on the left side of the message when they send a message */ }
            <View style = {styles.sender}><Text>{object.item.sender}</Text></View>
          </View>
          <View style = {styles.time}>
          {/* Date should not be displayed for every single message. There should just be one date for all messages in that day */}
          {/* <Text style = {{margin: "2%"}}>{tdo.getFormattedDate()}</Text> */}
            <Text style = {{margin: "2%"}}>{tdo.getFormattedTime()}</Text>
          </View>
        </View>
      );
    }
  
    let myMessage = "";
  let currentUser = "pgFfrUx2ryd7h7iE00fD09RAJyG3";
  let otherUser = "wVgW65Og51OCuC7lD8LtRJBWuUC2";
  let conversationId = "-NE1h9dOvSOgnJMdRTRv";
  // let conversationId = "";
  const [renderAgain, setRenderAgain] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  function invertArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.unshift(array[i]);
    }
    return result;
  }

  async function loadMessages() {
    //get initial data
    const db = getDatabase();
    const messageRef = ref(db, `Messaging/${conversationId}/messages`);
    await onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let dataArray = Object.values(data);
        let final = invertArray(dataArray);
        setMessages(final);
        setRenderAgain(true);
      }  
    });
  }

  function sendMessage() {
    //if there's a message, send it

    if (myMessage != "" && myMessage != " ") {
      // get database
      const db = getDatabase();

      // setup a conversation space and get the id if there isn't already one |  TDO: more needed here!
      if (conversationId == "") {
        const reference = ref(db, "Messaging");
        let conversationObject = push(reference, {
          type: "individual",
          people: [currentUser, otherUser]
        }); 
        let conversationIdArray = conversationObject.toString().split("/");
        conversationId = conversationIdArray[conversationIdArray.length - 1];
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

      //set messages based on my messages 
      const messageRef = ref(db, `Messaging/${conversationId}/messages`);
      push(messageRef, {
        message: myMessage,
        sender: currentUser,
        sentTDO
      }); 

       //clear myMessage
       myMessage = "";
    }
  }

  //only run this method on the first render of the page
  useEffect(() => {
    loadMessages();
  }, []);

    return(
    <View style={styles.container}>
        <View style={styles.topBorder}>
            {/* Name will need to be rendered */}
            <Text style={styles.nameText}>FirstName LastName</Text>
        </View>
        <View style={styles.content}>
            <FlatList 
            style = {styles.flatList}
            data = {messages}
            renderItem = {renderMessage}
            inverted = {true}
            extraData = {renderAgain}
            />
        </View>
        <View style={styles.messagingContainer}>
            <Input placeHolderText={"Type Message"} func = {(val) => myMessage = val}/>
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
        fontSize: 25,
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