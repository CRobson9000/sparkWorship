import { StyleSheet } from 'react-native';

const styleSheet = StyleSheet.create({
    
    MainContainer: {
      backgroundColor: "white",
      height: "100%",
    },

    content: {
      height: "50%",
      width: "100%"
    },

    topBorder: {
      height: "25%",
      width: "100%",
      backgroundColor: "rgb(219, 233, 236)",
      marginBottom: "5%"
    },

    // Spark Creation title in top section
    titleText: {
      marginTop: "13%",
      padding: "5%",
      textAlign: "center",
      fontSize: 20
    }, 

    // Title on each screen
    stageText: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: "4%" 
    },

    // Labels for all input boxes except Zip Code 
    text1: {
      paddingBottom: "2%",
      fontSize: 15,
      left: "9%",
    },

    // All input boxes except Zip Code
    inputBox: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "85%",
      height: "8%",
      alignSelf: "center",
      marginBottom: "4%", 
      padding: 10
    },

    // Constant area that holds the "Previous" and "Next" Buttons
    bottomRow: {
      flexDirection: "row",
      alignSelf: 'center',
      justifyContent: "space-between",
      height: "10%",
      width: '85%',
      marginTop: "10%"
    },

    // Text for all buttons
    buttonText: {
      color: "white",
      fontSize: 12,
    },

    // "Previous" and "Next" buttons on each screen
    constantButtons:{
      backgroundColor: "rgb(0, 97, 117)",
      justifyContent: "center",
      alignItems: "center",
      height: "45%",
      width: "45%",
      top: "10%",
      borderRadius: 10
    },
    
    // State dropdown 
    dropDown: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "100%",
      height: "100%"
    },

    // Zip Code input box
    inputBox2: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      height: "100%",
      paddingLeft: "10%"
    },

    // Address row
    row2: {
      flexDirection: "row",
      width: "85%",
      height: "8%",
      justifyContent: "space-between",
      alignSelf: "center",
      marginBottom: "7%"
    },

    // Column for State and Zip Code
    column2 : {
      flexDirection: "column",
      width: "45%",
      height: "100%"
    },

    // Label for City, State and Zip Code
    text3: {
      paddingBottom: "6%",
      fontSize: 15,
      left: "5%"
    },

    roleContainer: {
      paddingTop: "5%",
      height: "80%", 
      width: "100%", 
      backgroundColor: "white",
      alignSelf: "center"
    },

    boxTwo: {
        backgroundColor: "rgb(0, 97, 117)",
        height: "12%",
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: 1
    },

    addButton: {
      height: "50%",
      width: "30%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#006175",
      borderRadius: 7
    },

    roleBox: {
      flexDirection: "row",
      alignSelf: "center",
      backgroundColor: "#F2905B",
      width: "85%", 
      borderRadius: 10
    },  

    timeContainer:{
      backgroundColor: "#F2905B",
      padding: "3%",
      borderRadius: 10,
      flexDirection:"row"
    },

    volunteerTopBox:{
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "3%",
      marginBottom: "4%",
      backgroundColor: "#006175",
      height: "10%",
      width: "85%",
      borderRadius: 10
    },

    roleTopBox:{
      alignSelf: "center",
      marginTop: "3%",
      backgroundColor: "rgb(0, 97, 117)",
      height: "10%",
      width: "85%",
      borderRadius: 10
    },

    boxOne:{
      backgroundColor: "#F2905B",
      height: "13%",
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: "4%",
      borderRadius: 10
    },

    boxText:{
      width: "58%", 
      marginLeft:"5%",
      marginTop: "2%",
      marginBottom: "2%",
    },

    timeDateInput: {
      fontSize:24,
      justifyContent:"center",
    },

    timeDateRow: {
      width: "80%",
      flexDirection:"row",
      marginTop: "4%",
      marginBottom: "10%",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center"
    }, 

    inbetweenText: {
      marginHorizontal:"5%", 
      fontSize:20
    }

});

export { styleSheet }