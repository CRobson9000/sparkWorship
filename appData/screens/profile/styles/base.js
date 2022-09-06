import { StyleSheet } from 'react-native';
import colors from '../../../../config/colors';;

const stylesBase = StyleSheet.create({
    background:
    {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 500,
    },
    container: 
    {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "rgb(255, 255, 255)"
    },
    topBorder:
    {
      width: "175%",
      backgroundColor: "rgb(219, 233, 236)",
      alignItems: "center",
      justifyContent: "center"
    },
});

export { stylesBase }