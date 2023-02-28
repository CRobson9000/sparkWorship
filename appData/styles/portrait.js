import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const stylesPortrait = StyleSheet.create({
    container: 
    {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.secondary,
    },
    topBorder:
    {
        height: "40%"
    },
    contentContainer:
    {
        width: "100%",
        height: "50%"
    },
    contentDashContainer:
    {
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom:30
    },
    userHubScroll:
    {
        top: 70
    },
    // calendar: {
    //     flex: 1,
    //     width: "80%",
    //     height: "20%",
    //     //resizeMode: 'contain',
    //     marginLeft: "10%",
    //     overflow: "hidden",
    //     bottom: "23%",
    //     backgroundColor: "red"
    //   },
    calendar: {
        height: "20%",
        width: "100%",
        backgroundColor: 'green'
    },
    // topText: {
    //     textAlign: 'center',
    //     color: "#006175",
    //     top: 65,
    //     fontWeight: "bold",
    //     fontSize: 20
    // },
    
    topText: {
        color: "#006175",
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "RNSMiles"
    },
    username :
    {
        color: "#006175", 
        textAlign: 'left',
        fontFamily: 'RNSMiles', 
        left: 45, 
        bottom: 10
    },
    password :
    {
        color: "#006175", 
        textAlign: 'left',
        fontFamily: 'RNSMiles', 
        left: 45, 
        bottom: 10
    },
    inputBox: {
        height: "9%",
        marginHorizontal: "10%",
        marginBottom: "5%",
        borderWidth: 1,
        borderColor: "#EE9344",
        backgroundColor: "#EE9344",
        paddingLeft: "1%",
        borderRadius: 8,
        textAlign: 'center',
        color: "white"
    },
    forgotPassword :
    {
        color: "#006175", 
        textAlign: 'right', 
        right: 40, 
        bottom: 10
    },
    centerText:
    {
        textAlign: 'center',
        color: "#006175",
    },
    register: 
    {
        textAlign: 'center',
        color: "white"
    },
    button:
    {
        backgroundColor: "#006175",
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: "#006175",
        height: height * 0.06,
        marginBottom: height * 0.1,
        borderWidth: 3
    },

    dashboardButton:
    {
        backgroundColor: "#CDDFE3",
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 15,
        borderColor: "#CDDFE3",
        marginBottom: "5%",
        paddingLeft: "2%",
        borderWidth: 3
    }
});

export { stylesPortrait }