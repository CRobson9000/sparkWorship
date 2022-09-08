import { StyleSheet } from 'react-native';
import colors from '../../../../config/colors';

const stylesPortrait = StyleSheet.create({
    topBorder:
    {
        height: "9%",
        backgroundColor: "rgba(236,96,20,0.25)",
    },
    contentContainer:
    {
        width: "100%",
        height: "100%",
    },
    sparkContainer:{
        width:"100%",
        height:"81%",
        justifyContent: "space-between",
        backgroundColor: "rgba(255,255,255,1)"
    },
    bottomContainer:{
        width:"100%",
        height:"10%",
        backgroundColor: "rgba(217, 217, 217, 1)"
    },
    inputBox: {
        height: "7.5%",
        marginHorizontal: "10%",
        marginBottom: "10%",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "rgba(256, 256, 256, 0.6)",
        paddingLeft: "1%",
        borderRadius: 8,
        textAlign: 'center',
        color: "white"
    },
    centerText:
    {
        textAlign: 'center',
        color: "white"
    },
    register: 
    {
        textAlign: 'center',
        color: "white"
    },
    button:
    {
        backgroundColor: colors.buttonColor,
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: "black",
        height: "7.5%",
        marginBottom: "10%",
        borderWidth: 3
    }
    

});

export { stylesPortrait }