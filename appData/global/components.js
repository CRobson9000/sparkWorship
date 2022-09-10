import React from 'react';
import { TextInput } from 'react-native';

//element for input
const Input = (props) => {
    const [text, onChangeText] = React.useState("");
    props.func(text);
    return (
        <TextInput
          style={props.inputStyle}
          onChangeText={onChangeText}
          value={text}
          placeholder={props.placeHolderText}
          secureTextEntry={props.secure}
        />
    );
};

export { Input }