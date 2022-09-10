import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    infoStyles: {
        flexDirection: "column",
        width: "100%",
        height: "40%",
        alignItems: "center"
    },
    text: {
        margin: "10%"
    },
    button: {
        width: "50%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    header: {
        width: "100%",
        alignItems: "center",
        padding: 15,
        marginTop: 20
    }
});

export { mainStyles }
