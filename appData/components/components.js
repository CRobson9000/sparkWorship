import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Menu, IconButton } from 'react-native-paper';
//element for input
// const Input = (props) => {
//     const [text, onChangeText] = React.useState(props.start || "");
//     if (props.func && text != "") {
//       props.func(text);
//     }
//     let myStyle = props.inputStyle
//     if (!myStyle) {
//       myStyle = {
//           width: "40%",
//           height: "10%"
//       }
//     }
//     return (
//         <TextInput
//           style={myStyle}
//           onChangeText={onChangeText}
//           value={text}
//           placeholder={props.placeHolderText}
//           secureTextEntry={props.secure}
//         />
//     );  
// };

class Input extends Component{
      
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      text: this.props.start || "",
    }
  }
  
  textChanged(newText) {
    this.setState({text: newText});
    //console.log("New Text", newText);
    this.props.func(newText);
  }

  componentDidUpdate(prevProps) {
    let textVal = this.props.start;
    if (prevProps.start != textVal) {
      this.setState({text: textVal});
    }
  }

  render () {
    return (
      <TextInput
        style={this.props.inputStyle}
        onChangeText={(newText) => {this.textChanged(newText)}}
        value={this.state.text}
        placeholder={this.props.placeHolderText}
        secureTextEntry={this.props.secure}
      />
    );
  }
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

const DropDown = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const inputStyle = props.style || {};
  const [placeholder, setPlaceholder] = React.useState(props.placeholder);
  const rerenderParent = props.rerenderParent;

  const dropDownContent = () => {
    if (expanded) {
      return(
        <View style={[dropDownStyles.listContainer, inputStyle.listContainer]}>
          <FlatList 
            style = {{backgroundColor: "blue", width: "100%", height: "100%", zIndex: 1}}
            data = {props.items}
            renderItem = {renderItem}
          />
        </View>
      )
    }
  }

  const onSelect = (item) => {
    props.func(item);
    setPlaceholder(item);
    setExpanded(false);
  }

  const renderItem = (object, index, separators) =>
  {
    return (
      <Menu.Item style = {[dropDownStyles.menuItem, inputStyle.menuItem]} onPress={() => onSelect(object.item)} title={object.item} />
    );
  }

  const dropDownStyles = StyleSheet.create({
    container: {
      width: "70%",
      height: "70%"
    },
    listContainer: {
      width: "100%",
      height: "300%",
      position: "absolute",
      top: "100%",
      justifyContent: "center",
      alignItems: "center",
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
      padding: "5%"
    }
  });

  return(
    <View style={[dropDownStyles.container, inputStyle.container]}>
      <TouchableOpacity style = {[dropDownStyles.element, inputStyle.element]} onPress={() => {setExpanded(!expanded); rerenderParent()}}>
        <Text> {placeholder} </Text>
        <IconButton
          icon="chevron-down"
          size={20}
          onPress={() => setExpanded(!expanded)}
        />
      </TouchableOpacity>
      {dropDownContent()}
    </View>  
  );
}

const ItemWithMenu = (menuItems) => {

}

export { Input, Slider, DropDown }