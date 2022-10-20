import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
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

const DropDown = (items, func, style) => {
  const dropDownStyles = StyleSheet.create({
    container: {
      width: "50%",
      height: "50%"
    },
    listContainer: {
      width: "100%",
      height: "100%",
    },
    menuItem: {
      flexDirection: "row",
      backgroundColor: "white",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },  
    element: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      padding: "5%",
      backgroundColor: "yellow"
    }
  });

  const [expanded, setExpanded] = React.useState(false);

  const dropDownContent = () => {
    if (expanded) {
      return(
        <View style={dropDownStyles.listContainer}>
          <Menu.Item style = {dropDownStyles.menuItem} onPress={() => {}} title="Redo" />
          <Menu.Item style = {dropDownStyles.menuItem} onPress={() => {}} title="Undo" />
          <Menu.Item style = {dropDownStyles.menuItem} onPress={() => {}} title="Cut" />
          <Menu.Item style = {dropDownStyles.menuItem} onPress={() => {}} title="Copy" />
          <Menu.Item style = {dropDownStyles.menuItem} onPress={() => {}} title="Paste" />
        </View>
      )
    }
  }

  return(
    <View style={dropDownStyles.container}>
      <TouchableOpacity style = {dropDownStyles.element} onPress={() => setExpanded(!expanded)}>
        <Text> Placeholder Text </Text>
      </TouchableOpacity>
      {dropDownContent()}
    </View>  
  );
}

const ItemWithMenu = (menuItems) => {

}

export { Input, Slider, DropDown }