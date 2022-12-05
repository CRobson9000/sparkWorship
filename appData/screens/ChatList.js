import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";

export default function ChatList(){
    return(
        <View style={styles.MainContainer}>
            <View style={styles.topBorder}>
                <Image style={styles.logo} source={require('../../assets/logo2.png')}/>
            </View>

            <View style={styles.content}>

                <View style={styles.searchBar}>
                    <View style={styles.row2}>
                        <Image style={styles.searchIcon} source={require('../../assets/searchIcon.png')}/>
                        <Text style={{color: "grey"}}>Search</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Image style={styles.profilePicture} source={require('../../assets/headshot.jpg')}/>
                    <View style={styles.column}>
                        <Text style={styles.name}>John Smith</Text>
                        <Text style={styles.message}>Hey! Are you going to the spark in Nashville tonight?</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Image style={styles.profilePicture} source={require('../../assets/headshot1.jpg')}/>
                    <View style={styles.column}>
                        <Text style={styles.name}>William Jones</Text>
                        <Text style={styles.message}>Just got your message, I will look into it.</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Image style={styles.profilePicture} source={require('../../assets/headshot2.jpg')}/>
                    <View style={styles.column}>
                        <Text style={styles.name}>Aaron Moore</Text>
                        <Text style={styles.message}>Hello, I saw you play the guitar. I would love to have you be a part of my spark!</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Image style={styles.profilePicture} source={require('../../assets/headshot3.jpg')}/>
                    <View style={styles.column}>
                        <Text style={styles.name}>Chris Samson</Text>
                        <Text style={styles.message}>Sorry for the late response!</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Image style={styles.profilePicture} source={require('../../assets/headshot5.jpg')}/>
                    <View style={styles.column}>
                        <Text style={styles.name}>Austin Rock</Text>
                        <Text style={styles.message}>That spark last night was awesome, best one yet!</Text>
                    </View>
                </View>

            </View>

            {/* <View style={styles.navigation}>
                <Image style={styles.navigationBar} source={require('../../assets/navigation.png')}/>
            </View> */}

        </View>
    )
}


const styles = StyleSheet.create({

    MainContainer: {
        top: 0,
        backgroundColor: "white",
        flex: 1,
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
        alignItems: "flex-start",
        marginLeft: "5%",
        backgroundColor: "white",
        height: "85%",
        width: "100%",
        justifyContent: 'center'
    },

    navigation: {
        backgroundColor: "white",
        height: "10%",
        alignItems: "center"
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
        fontWeight: "500"
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