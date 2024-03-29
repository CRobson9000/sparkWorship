import { StyleSheet } from 'react-native';
import colors from '../../config/colors';


const stylesPortrait = StyleSheet.create({
    container: 
    {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.secondary
    },
    topBorder:
    {
        height: "40%"
    },
    contentContainer:
    {
        width: "100%",
        height: "75%",
    },
    contentDashContainer:
    {
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom:30
    },
    calendar: {
        flex: 1,
        width: "80%",
        height: "20%",
        resizeMode: 'contain',
        marginLeft: "10%",
        overflow: "hidden",
        bottom: "23%"
      },
    topText: {
        textAlign: 'center',
        color: "#006175",
        top: 65,
        fontWeight: "bold",
        fontSize: 25
    },
    username :
    {
        color: "#006175", 
        textAlign: 'left', 
        left: 45, 
        bottom: 10
    },
    password :
    {
        color: "#006175", 
        textAlign: 'left', 
        left: 45, 
        bottom: 10
    },
    inputBox: {
        height: "7.5%",
        marginHorizontal: "10%",
        marginBottom: "10%",
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
        bottom: 30
    },
    centerText:
    {
        textAlign: 'center',
        color: "#006175",
        top: 30
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
        height: "7.5%",
        marginBottom: "10%",
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
        height: "15%",
        marginBottom: "5%",
        paddingLeft: "2%",
        borderWidth: 3
    },
});

export { stylesPortrait }