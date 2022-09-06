import { StyleSheet } from 'react-native';
import colors from '../../../../config/colors';

const stylesPortrait = StyleSheet.create({
    topBorder:
    {
        height: "9%",
        color: "rgba(236,96,20,1)",
    },
    contentContainer:
    {
        width: "100%",
        height: "100%",
    },
    sparkContainer:{
        width:"100%",
        height:"76%",
        justifyContent: "space-between",
    },
    bottomContainer:{
        width:"100%",
        height:"15%",
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