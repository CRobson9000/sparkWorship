import { StyleSheet } from 'react-native';

const stylesProfile = StyleSheet.create({

    MainContainer: {
        backgroundColor: "white",
        height: "100%",
    },

    topBorder:{
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
    },

    profilePicture: {
        top: "30%",
        left: "8%",
        width: "40%",
        borderRadius: 10
    },

    row: {
        flexDirection: "row",
        left: "57%"
    },

    boldText: {
        // fontFamily: "Gill Sans",
        fontWeight: "500",
        left: "52%",
        bottom: "9%"
    },

    generalText: {
        paddingTop: "1%",
        paddingBottom: "2%",
        fontSize: 10,
        left: "9%",
        //fontFamily: "Gill Sans"
    },

    Square: {
        width: "85%",
        height: "75%", 
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        alignSelf: "center"
    },

    locationPin: {
        width: 20,
        height: 20
    },
    
    contactButtons: {
        marginTop: "9%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
      title: {
        fontSize: 21,
        left: "57%",
        bottom: "5%",
        //fontFamily: "Gill Sans"
      },
    locationText: {
        fontSize: 17,
        left: "60%",
       // fontFamily: "Gill Sans",
        fontWeight: "300"
      },  
    
      button: {
        backgroundColor: 'rgb(242, 144, 91)',
        width: "22%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
      },

    buttonsRow: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center",
        width: "90%"
      },
      title: {
        fontSize: 21,
        left: "57%",
        bottom: "5%",
        //fontFamily: "Gill Sans"
      },
    
      locationText: {
        fontSize: 17,
        left: "60%",
        //fontFamily: "Gill Sans",
        fontWeight: "300"
      },  
      button: {
        backgroundColor: 'rgb(242, 144, 91)',
        width: "22%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
      },

      EditProfileButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        height: "14%",
        width: "85%",
        marginTop: "10%",
        marginBottom: "3%",
        borderRadius: 10
      },
      friendsButton:{
        backgroundColor: "rgb(242, 144, 91)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "40%",
        borderRadius: 10,
      },
      buttonText1: {
        color: "white",
        fontSize: 17,
        //fontFamily: "Gill Sans",
      },
      buttonText2: {
        color: "black",
        fontSize: 17,
        //fontFamily: "Gill Sans",
      },

    italicText: {
        paddingBottom: "3%",
        fontSize: 10,
        left: "9%",
        fontStyle: "italic"
    },

    inputBox: {
        backgroundColor: "rgb(242, 144, 91)",
        borderRadius: 10,
        width: "85%",
        height: "4%",
        alignSelf: "center",
        marginBottom: "2%"
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "26%",
        width: "37%",
       borderRadius: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        fontSize: 10,
    },

    addInstrumentButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "5%",
        width: "85%",
        marginTop: "5%",
        borderRadius: 10
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 15,
        marginBottom: "3%"
      },

    titleText: {
      top: "25%",
      textAlign: "center",
      fontSize: 10,
      fontWeight: "600"
    }, 
    
    phaseText: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: "500",
      top: "2%",
      paddingBottom: "5%"
    },

    authenticationButton: {
      width: "85%",
      backgroundColor: "rgb(0, 97, 117)",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      height: "5%",
      marginTop: "5%",
      borderRadius: 10
    },

    smallText: {
      textAlign: "center",
      fontSize: 10,
      color: "gray",
      paddingBottom: "5%"
    }
});

export {stylesProfile}