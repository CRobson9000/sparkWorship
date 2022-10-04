import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text } from 'react-native';


//element for input
const Input = (props) => {
    const [text, onChangeText] = React.useState(props.start || "");
    if (props.func && text != "") {
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

class Slider extends Component {
  // Props
  // screens: a list of screens to display
  // currentIndex: a number which determine what screen is displayed
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.screens = props.screens;
  }

  static getDerivedStateFromProps(props) {
    return {currentIndex: props.currentIndex}
  }
 
  render() {
    let index = this.state.currentIndex
    for (let i = 0; i < this.screens.length; i++)
    {
      if (index == i)
      {
        let screen = this.screens[i];
        return screen
      }
    }

    //if the current index doesn't match any current screens, just display the first screen in the list
    return this.screens[0];
  }
}

export { Input, Slider }