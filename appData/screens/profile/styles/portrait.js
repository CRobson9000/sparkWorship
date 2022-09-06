import { StyleSheet } from 'react-native';
import colors from '../../../../config/colors';

const stylesPortrait = StyleSheet.create({
    topBorder:
    {
        height: "40%"
    },
    contentContainer:
    {
        width: "100%",
        height: "75%",
    },
    inputBox: {
        height: "20%",
        marginHorizontal: "10%",
        marginBottom: "10%",
        borderWidth: "1",
        borderColor: "rgb(249, 203, 177)",
        backgroundColor: "rgb(249, 203, 177)",
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