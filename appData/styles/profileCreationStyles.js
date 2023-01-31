import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styleSheet = StyleSheet.create({

    MainContainer: {
      backgroundColor: "white",
      height: "100%",
    },
  
    topBorder:{
      height: height/3.3,
      width: "100%",
      backgroundColor: "rgb(219, 233, 236)",
      marginBottom: "5%"
    },
  
    content: {
      height: "50%",
      width: "100%"
    },
  
    // Profile Creation title in top section
    titleText: {
      marginTop: "10%",
      padding: "5%",
      textAlign: "center",
      fontSize: height/40,
      fontFamily: "RNSMiles"
    }, 
  
    // Row for Profile Picture and Progress Bar
    topRow: {
      width: "100%",
      height: "75%",
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
  
    // Small text for instructions to change profile picture
    smallText1: {
      textAlign: "center",
      fontSize: height/65,
      color: "gray",
      fontStyle: "italic"
    },
  
    // Title on each screen
    stageText: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: "4%" 
    },
  
    // Reset Password and Authentication buttons
    screen2Buttons: {
      width: "85%",
      backgroundColor: "rgb(0, 97, 117)",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      marginTop: "2%",
      height: "9%",
      marginBottom: "10%",
      borderRadius: 10
    },
  
    // Small text for Screen 3 (optional Home Church information)
    smallText2: {
      textAlign: "center",
      fontSize: 13,
      color: "gray",
      paddingBottom: "5%",
      marginTop: "-3%",
      fontStyle: "italic"
    },
  
    // Constant area that holds the "Previous" and "Next Buttons"
    bottomRow: {
      flexDirection: "row",
      alignSelf: 'center',
      justifyContent: "space-between",
      height: "10%",
      width: '85%',
      marginTop: "20%"
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
  
    // Birthday and Gender row
    row1: {
      flexDirection: "row",
      width: "85%",
      alignSelf: "center",
      justifyContent: "space-between",
      height: "8%",
      marginBottom: "10%"
    },
  
    // Birthday and State dropdown 
    dropDown: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "100%",
      height: "100%"
    },

    // Dialog Box instrument dropdown
    dropDown2: {
      backgroundColor: "rgb(0, 97, 117)",
      borderRadius: 10,
      width: "60%",
      marginTop: "6%",
      padding: "5%",
      height: "45%",
      alignSelf: "center"
    },
  
    // Birthday input box
    birthdayInputBox: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      paddingLeft: "5%",
      height: "100%",
      width: "100%",
    },
  
    // Column for Gender and Birthday
    column1: {
      flexDirection: "column",
      width: "47%",
      height: "100%"
    },
  
    // Column for Progress Bar and Instructions for changing Profile Image
    column3: {
      flexDirection: "column",
      height: "60%",
      alignItems: "center", 
      justifyContent: "center"
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
     
    // City and Zip Code input box
    inputBox2: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      height: "100%",
      paddingLeft: "10%",
      fontSize: 12
    },
  
    // Column for City, State and Zip Code
    column2 : {
      flexDirection: "column",
      width: "30%",
      height: "100%"
    },
  
    // Labels for all input boxes except gender, birthday, city, state, zip code
    text1: {
      paddingBottom: "2%",
      fontSize: 15,
      left: "9%",
    },
  
    // Label for gender and birthday
    text2: {
      paddingBottom: "5%",
      fontSize: 15,
      left: "4%"
    },
  
    // Label for City, State and Zip Code
    text3: {
      paddingBottom: "6%",
      fontSize: 15,
      left: "10%"
    },

    // Label for Dialog Box
    text4: {
      paddingBottom: "3%",
      fontSize: 15,
      left: "4%"
    },
  
    // All input boxes except city, zip code and birthday
    inputBox: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "85%",
      height: "8%",
      alignSelf: "center",
      marginBottom: "4%", 
      padding: 10,
      fontSize: 12
    },
  
    // Text for all buttons
    buttonText: {
      color: "white",
      fontSize: 12,
    },
  
    instrumentDialogInput: {
      flex: 0.8,
      backgroundColor: "#F2905B",
      borderRadius: 10,
      paddingLeft: "5%",
      marginBottom: "5%",
      height: 35,
      flexWrap: 'wrap'
    },
  
    dialogButton: {
      backgroundColor: "rgb(0, 97, 117)",
      justifyContent: "center",
      alignItems: "center",
      height: "8%",
      width: "35%",
      borderRadius: 10
    },
  
    profilePictureContainer: {
      height: "70%",
      width: "35%",
      top: "20%",
      left: "20%"
    },
  
    profilePicImage: {
      height: "100%",
      width: "100%",
      borderRadius: 25,
    },
  
    logo: {
      height: "70%",
      width: "9%",
      left: "20%",
      top: "2%"
    }, 
  
    // Box for linked social media accounts
    box: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      width: "85%",
      height: "10%",
      marginBottom: "6%",
      alignSelf: "center",
      flexDirection: "row",
    },

    container: {
      flexDirection: "column"
    },

    section: {
      backgroundColor: "white",
      width: "100%"
    },

    listItemContainer: {
      backgroundColor: "white",
      paddingTop: "2%",
      paddingBottom: "2%"
    },

    listItemHeader: {
      padding: "2%",
      alignItems: "flex-start",
    },

    contentText: {
      flexWrap: "wrap"
    },

    listItemContent: {
      padding: "5%"
    },

    header: {
      backgroundColor: "#F2905B",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      margin: "2%",
    },

    headerText: {
      color: "black",
      justifyContent: "center",
      alignItems: "center",
    },

    accordionList: {
      width: "100%",
      top: "5%",
      height: "30%"
    }

});  
  
export { styleSheet }