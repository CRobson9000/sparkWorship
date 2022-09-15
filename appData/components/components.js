import React from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text } from 'react-native';


//element for input
const Input = (props) => {
    const [text, onChangeText] = React.useState("");
    if (props.func) {
      props.func(text);
    }
    let myStyle = props.inputStyle
    if (!myStyle) {
      myStyle = {
          width: "40%",
          height: "10%"
      }
    }
    return (
        <TextInput
          style={myStyle}
          onChangeText={onChangeText}
          value={text}
          placeholder={props.placeHolderText}
          secureTextEntry={props.secure}
        />
    );
};

export { Input }