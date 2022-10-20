import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider } from '../components/components';
import { Observable, TDO } from '../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { screensEnabled } from 'react-native-screens';

export default function MyTest({ navigation }) {
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
          <View style = {styles.sender}><Text>{object.item.sender}</Text></View>
          <View style = {styles.textMessage}><Text>{object.item.message}</Text></View>
        </View>
        <View style = {styles.time}>
          <Text style = {{margin: "2%"}}>{tdo.getFormattedTime()}</Text>
          <Text style = {{margin: "2%"}}>{tdo.getFormattedDate()}</Text>
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

  return (
    <View style = {styles.container}>
        <View style = {styles.top}>
          <FlatList 
            style = {styles.flatList}
            data = {messages}
            renderItem = {renderMessage}
            inverted = {true}
            extraData = {renderAgain}
          />
        </View>
        <View style = {styles.messagingBottomContainer}>
          <Input placeHolderText={"Type Message"} func = {(val) => myMessage = val}/>
          <TouchableHighlight style = {styles.button} onPress = {() => sendMessage()}>
            <Text> Send </Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress = {() => navigation.navigate("Router")}>
            <Text> Go back </Text>
          </TouchableHighlight>
        </View>
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

  top: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },

  messagingBottomContainer: {
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "100%"
  },
  
  button: {
    height: "20%",
    width: "20%",
    margin: 20,
    backgroundColor: "purple"
  },
  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
  },
  sender: {
    backgroundColor: "red",
    justifyContent: "center",
    width: "20%",
    alignItems: "center"
  },
  textMessage: {
    backgroundColor: "orange",
    justifyContent: "center",
    width: "80%",
    alignItems: "flex-start",
    paddingLeft: "5%",
    padding: "10%"
  },
  time: {
    backgroundColor: "green",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  flatList: {
    backgroundColor: "purple",
    width: "100%"
  }
});