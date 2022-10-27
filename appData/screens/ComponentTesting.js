import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { Input, Slider, DropDown } from '../components/components';
import { Observable, TDO } from '../components/classes';

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { List } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list'

export default function ComponentTesting({ navigation }) {
  let instruments = ["Piano", "Bass", "Guitar"];

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const renderItem = (object, index, separators) => {
    //convert firebase obj to TDO
    return(
      <List.Accordion
          title={object.item}
          style = {accordianStyles.header}
          titleStyle = {accordianStyles.headerText}
      >
        <View style={accordianStyles.listItemContainer}>
          <View style={accordianStyles.listItemHeader}>
            <Text style={{fontWeight: "bold", fontSize: 15}}> General Experience </Text>
          </View>
          <View style={accordianStyles.listItemContent}>
            <Text style={accordianStyles.contentText}>
               My Content ajslkd fja;klfjioew jajsdil;fj iao;e jfoajfl ioasje fioj;ijia jo;fijaeioj  afefia;fj ioaej aoewf 
               alsfjioe;j aioejf aioefja fioej foaefaofo;jaioajfejfoawf ijaw i;ewf iajioefj awe alkfjf;
            </Text>
          </View>
        </View>

        <View style={accordianStyles.listItemContainer}>
          <View style={accordianStyles.listItemHeader}>
            <Text style={{fontWeight: "bold", fontSize: 15}}> Worship Experience </Text>
          </View>
          <View style={accordianStyles.listItemContent}>
            <Text style={accordianStyles.contentText}>
               My Content ajslkd fja;klfjioew jajsdil;fj iao;e jfoajfl ioasje fioj;ijia jo;fijaeioj  afefia;fj ioaej aoewf 
               alsfjioe;j aioejf aioefja fioej foaefaofo;jaioajfejfoawf ijaw i;ewf iajioefj awe alkfjf;
            </Text>
          </View>
        </View>

        <View style={accordianStyles.listItemContainer}>
          <View style={accordianStyles.listItemHeader}>
            <Text style={{fontWeight: "bold", fontSize: 15}}> Additional Notes </Text>
          </View>
          <View style={accordianStyles.listItemContent}>
            <Text style={accordianStyles.contentText}>
               My Content ajslkd fja;klfjioew jajsdil;fj iao;e jfoajfl ioasje fioj;ijia jo;fijaeioj  afefia;fj ioaej aoewf 
               alsfjioe;j aioejf aioefja fioej foaefaofo;jaioajfejfoawf ijaw i;ewf iajioefj awe alkfjf;
            </Text>
          </View>
        </View>
        
      </List.Accordion>
    );
  }


  let dropDownItems = ['Redo', 'Undo', 'Cut', 'Copy', 'Paste', 'Delete'];
  const [selected, setSelected] = React.useState("true");
  let myTestItem = "";

  return (
    // Accordion Component Code
    <View style = {accordianStyles.container}>
      <View style = {accordianStyles.accordionList}>
        <List.Section style = {accordianStyles.section}>
          <FlatList 
            style = {accordianStyles.flatList}
            data = {instruments}
            renderItem = {renderItem}
            // extraData = {renderAgain}
          />
        </List.Section>
      </View>

      {/* <View style = {{backgroundColor: "green", height: "10%", width: "100%", position: "absolute", top: "40%"}}>
        <SelectList 
          style = {{position: "absolute", top: "205"}}
          data={dropDownItems} 
          setSelected={setSelected} 
          dropDownStyles={dropDownStyles.menu}
          maxHeight={100}
        />
      </View> */}
      <View style = {{backgroundColor: "green", height: "10%", width: "100%"}}>
        <DropDown 
          placeholder = {"Choose a role"} 
          items = {dropDownItems} 
          // style = {dropDownStyles} 
          func = {(item)=> {myTestItem = item; console.log(myTestItem)}}
          rerenderParent = {() => setSelected(!selected)}
        />
      </View>
    </View> 
  );    
};

const accordianStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    flexDirection: "column"
  },
  section: {
    backgroundColor: "white",
    width: "100%"
  },
  listItemContainer: {
    backgroundColor: "white",
    paddingTop: "2%",
    paddingBottom: "2%"
  },
  listItemHeader: {
    padding: "2%",
    alignItems: "flex-start",
  },
  contentText: {
    flexWrap: "wrap"
  },
  listItemContent: {
    padding: "5%"
  },
  header: {
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  accordionList: {
    width: "100%",
    top: "5%",
    height: "30%"
  }
});