import { StyleSheet } from 'react-native';
import colors from '../../../../config/colors';

const stylesPortrait = StyleSheet.create({
    topBorder:
    {
        height: "45%"
    },
    contentContainer:
    {
        width: "100%",
        height: "75%",
    },
    textBox: 
    {
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
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        width: "75%",
        marginTop: "3%",
        marginBottom: "5%",
        borderRadius: "10",
    }

});

export { stylesPortrait }