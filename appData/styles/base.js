import { StyleSheet } from 'react-native';
import colors from '../../config/colors.js';

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
      backgroundColor: colors.secondary
    },
    topBorder:
    {
      width: "100%",
      backgroundColor: "rgba(52, 52, 52, 0.0)",
      alignItems: "center",
      justifyContent: "center"
    },
});

export { stylesBase }