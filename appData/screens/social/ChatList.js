import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import Routes from '../Navigation/constants/Routes.js';
import ProfileImage from '../../components/profileImage.js';
import { FirebaseButler } from '../../components/classes';
import { IconButton } from 'react-native-paper';
import { KeyboardView } from '../../components/components.js'

export default function ChatList({ route, navigation }){
    // Set the context
    let props = route.params;
    let userId = props?.userId;

    // Global variables used
    const [conversations, setConversations] = React.useState([]);

    // Functions
    async function getConversations () {
        let convoData = await FirebaseButler.fbGet(`Users/${userId}/conversations`);
        if (convoData) {
            let startingConvos = [];
            for (let convoIndex in convoData) {
                let convoId = convoData[convoIndex];
                let convo = await FirebaseButler.fbGet(`Messaging/${convoId}`);
                let peopleLookup = {};
                // populate a people object with the id and associated name
                for (let peopleIndex in convo.people) {
                    let personId = convo.people[peopleIndex];
                    // get the data from firebase
                    if (personId != userId) {
                        let personName = await FirebaseButler.fbGet(`Users/${personId}/info/name`);
                        peopleLookup[personId] = personName;
                    }
                }
                // create the people string
                let peopleArray = Object.values(peopleLookup);
                let peopleString = peopleArray.join(", ");
    
                // get last message
                let messagesArray = Object.values(convo.messages);
                let lastMessage = messagesArray[messagesArray.length - 1];
    
                startingConvos.push({
                    lastMessageText: lastMessage.message,
                    peopleString,
                    peopleLookup,
                    lastMessageTime: lastMessage["sentTDO"]["TDO"],
                    convoData: convo,
                    convoId
                })
            }
            setConversations([...startingConvos]);
        }
    }

    const renderConversation = (object) => {
        let convoData = object.item.convoData;
        let convoId = object.item.convoId;
        let peopleLookup = object.item.peopleLookup;
        let peopleString = object.item.peopleString;
        let context = {...props};
        context.convoId = convoId;
        context.convoData = convoData;
        context.peopleLookup = peopleLookup;
        context.peopleString = peopleString;
        return (
            <TouchableOpacity onPress = {() => navigation.navigate(Routes.messaging, context)} style={styles.row}>
                <ProfileImage size = {"medium"} userId = {Object.keys(peopleLookup)[0]}/>
                <View style={styles.column}>
                    <Text style={styles.name}>{object.item.peopleString}</Text>
                    <Text style={styles.message}>{object.item.lastMessageText}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // ----------------------
    // Code that runs onload 
    // ----------------------
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("Load");
            getConversations();
        });
        return unsubscribe;
    }, [navigation]);

    return(
        <View style={styles.MainContainer}>
            <View style={styles.topBorder}>
                <Image style={styles.logo} source={require('../../../assets/logo2.png')}/>
            </View>

            <KeyboardView flatList = {true} style={styles.content}>
                <View style={styles.searchBar}>
                    <View style={styles.row2}>
                        <Image style={styles.searchIcon} source={require('../../../assets/searchIcon.png')}/>
                        <Text style={{color: "grey"}}>Search</Text>
                    </View>
                </View>

                <FlatList 
                    style = {{ height: "100%" }}
                    data = {conversations}
                    renderItem = {renderConversation}
                />                
            </KeyboardView>
        </View>
    )
}


const styles = StyleSheet.create({

    MainContainer: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        alignItems: "center"
    },

    topBorder: {
        backgroundColor: "rgb(219, 233, 236)",
        height: "15%", 
        width: "100%",
        //marginBottom: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    content: {
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: "5%",
        height: "85%",
        width: "100%",
        justifyContent: 'center'
    },

    addMessage: {
        position: "absolute",
        bottom: "2%",
        right: "2%"
    },

    row: {
        width: '70%',
        marginBottom: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    column: {
        marginLeft: "10%",
        width: "90%",
        flexDirection: "column",
        
    },

    profilePicture: {
        height: 85,
        width: 85,
        borderRadius: 50,
        borderColor: '#F2905B',
        borderWidth: 5
    },

    name: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "500",
        flexWrap: "nowrap"
    },

    message: {
        fontSize: 15,
        flexWrap: "wrap"
    }, 

    navigationBar: {
        width: "90%",
        height: "70%"
    },

    searchBar: {
        width: "85%", 
        height: "6%", 
        backgroundColor: "#E7E6E6", 
        marginBottom: 25, 
        marginTop: 25, 
        borderRadius: 10,
        justifyContent: "center"
    },
    
    row2: {
        flexDirection: "row", 
        alignItems: 'center'
    }, 

    searchIcon: {
        height: 30, 
        width: 30, 
        marginLeft: 15, 
        marginRight: 15
    },

    logo: {
        height: 60,
        width: 225,
    }

})