import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    infoStyles: {
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        height: "40%",
        alignItems: "center"
    },
    text: {
        margin: "10%"
    },
    button: {
        backgroundColor: "green",
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    button2: {
        backgroundColor: "purple",
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    }
});

export { mainStyles }
