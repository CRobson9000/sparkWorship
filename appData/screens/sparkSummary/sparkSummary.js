import React from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';
import { stylesSummary } from "../../styles/summary.js";
import { Input, Slider, DropDown } from '../../components/components';
import { Observable, TDO } from '../../components/classes';
import { stylesPortrait } from "../../styles/portrait";

export default function SparkSummary({ navigation }) {

  let inputs = {
    address: new Observable("", () => updatePayload(inputs.address.getVal(), "address")),
    city: new Observable("", () => updatePayload(inputs.city.getVal(), "city")),
    state: new Observable("", () => updatePayload(inputs.state.getVal(), "state")),
    zip: new Observable("", () => updatePayload(inputs.zip.getVal(), "zip")),
  };
  const updatePayload = (updateVal, updateName) =>
  {
      update[updateName] = updateVal;
  };
  const FirstRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={[sparkViewStyles.sparkContainer]}>
          <View style={[sparkViewStyles.sparkVerticalContainer]}>
                <Text style={{fontSize:28, paddingTop:"4%", fontWeight:'500'}}>Location</Text>
                <View style={[sparkViewStyles.topLocationContainer]}>
                    <Text style={{paddingLeft:"4%"}}>Address</Text>
                    <Input start = {inputs.address.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.address.setVal(val)}/>
                </View>
                <View style={[sparkViewStyles.locationContainer]}>
                    <Text style={{paddingLeft:"4%"}}>City</Text>
                    <Input start = {inputs.city.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.city.setVal(val)}/>
                </View>
                <View style={[sparkViewStyles.locationContainer]}>
                    <Text style={{paddingLeft:"4%"}}>Zip</Text>
                    <Input start = {inputs.zip.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.zip.setVal(val)}/>
                </View>
                <View style={[sparkViewStyles.locationContainer]}>
                    <Text style={{paddingLeft:"4%"}}>State</Text>
                    <Input start = {inputs.state.getVal()} inputStyle = {[sparkViewStyles.newInputBox, sparkViewStyles.locationInputBox]} func = {(val) => inputs.state.setVal(val)}/>
                </View>
                <TouchableOpacity activeOpacity={1} style={[sparkViewStyles.testyTouchable]} onPress = {() => sendPayload()}>
                    <Text style={[stylesPortrait.centerText, sparkViewStyles.button]}>Submit</Text>
                </TouchableOpacity>
                  
          </View>
      </View>
    </ScrollView>
    );


    const SecondRoute = () => (
        <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
            <List.Section title="Instruments">
              <List.Accordion style={styles.accordian} title="Guitar">
                <List.Subheader style={{left: 15}}>General Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Worship Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Additional Notes</List.Subheader>
              </List.Accordion>
              <List.Accordion style={styles.accordian} title="Piano">
                <List.Subheader style={{left: 15}}>General Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Worship Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Additional Notes</List.Subheader>
              </List.Accordion>
              <List.Accordion style={styles.accordian} title="Trumpet">
                <List.Subheader style={{left: 15}}>General Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Worship Experience</List.Subheader>
                <List.Subheader style={{left: 15}}>Additional Notes</List.Subheader>
              </List.Accordion>
            </List.Section>
          <Text style={{fontSize: 14, left: 15}}>Skilled Genres</Text>
          <View style={[styles.row2, {top: 20, justifyContent: 'space-evenly'}]}>
            <View style={styles.genres}>
              <Text style={{fontSize: 16, color: 'white'}}>Rock</Text>
            </View>
            <View style={styles.genres}>
              <Text style={{fontSize: 16, color: 'white'}}>Country</Text>
            </View>
            <View style={styles.genres}>
              <Text style={{fontSize: 16, color: 'white'}}>Jazz</Text>
            </View>
          </View>
          <View>
            <Text style={{marginTop:"5%", color: 'white'}}>a</Text>
          </View>
        </ScrollView>
      );
      
    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text style={{borderColor: "#F2905B", borderWidth: 7, width: '85%', alignSelf: "center", height: 75, top: 50, borderRadius: 10, fontSize: 25, textAlign: 'center', padding: 10}}>Church Name</Text>
          <Text style={{borderColor: "#006175", borderWidth: 7, width: '75%', alignSelf: "center", height: 65, top: 50, borderRadius: 10, fontSize: 20, textAlign: 'center', padding: 10, marginTop: 20}}>Denomination</Text>
          <Text style={{borderColor: "#006175", borderWidth: 7, width: '75%', alignSelf: "center", height: 65, top: 50, borderRadius: 10, fontSize: 20, textAlign: 'center', padding: 10, marginTop: 20}}>Location</Text>
        </View>
      );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={[styles.socialsBox, {marginTop: 35}]}/>
          <View style={styles.socialsBox}/>
          <View style={styles.socialsBox}/>
          <View style={styles.socialsBox}/>
        </View>
      );
    const FifthRoute = () => (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[styles.socialsBox, {marginTop: 35}]}/>
        <View style={styles.socialsBox}/>
        <View style={styles.socialsBox}/>
        <View style={styles.socialsBox}/>
      </View>
    );
    
      
      
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Bio' },
        { key: 'second', title: 'Music' },
        { key: 'third', title: 'Church' },
        { key: 'fourth', title: 'Socials' },
        { key: 'fifth', title: 'Boonies' },
    ]);
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
        fifth: FifthRoute
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#006175' }}
        style={{ backgroundColor: 'rgb(219, 233, 236)'}}
      />
    );

  return(
    <View style={styles.MainContainer}>
    <View style={styles.topBorder}>
      <View style={[styles.row2, {justifyContent: 'space-between', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
        <TouchableOpacity><Image style={{height: 40, width: 40}} source={require('../../../assets/friendicon.png')}></Image></TouchableOpacity>
        <Text style={styles.titleText}>My Profile</Text>
        <TouchableOpacity><Image style={{height: 40, width: 40}} source={require('../../../assets/editprofileicon.png')}></Image></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Image style={styles.profilePicture} source={require('../../../assets/blankprofilepic.png')}></Image>
        <View style={styles.column}>
          <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10}}>FirstName LastName</Text>
          <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13}}>Instrumentalist</Text>
          <View style={styles.row2}>
            <Image style={{height: 20, width: 20}} source={require('../../../assets/locationpin.png')}></Image>
            <Text>Location</Text>
          </View>
        </View>
      </View>
    <View style={[styles.row, {marginLeft: 20, marginRight: 20, top: 135}]}>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/emptyStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/emptyStar.png')}></Image>
    </View>
    </View>
    <View style={styles.content}>
      <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex}/>
    </View>
    <View style={styles.navigation}>
      <Image style={{width: '100%', height: '100%'}} source={require('../../../assets/navigation.png')}></Image>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "white",
    height: "100%",
  },

  topBorder:{
    height: "40%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },

  content: {
    height: '51%'
  },

  titleText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500'
  },

  row: {
    flexDirection: 'row',
    top: '22%',
    justifyContent: 'space-evenly'
  },

  row2: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  profilePicture: {
    height: 125,
    width: 125,
  },

  accordian: {
    backgroundColor: '#F2905B',
    height: 50,
    marginLeft: '5%',
    marginRight: '5%', 
    marginBottom: '4%',
    borderRadius: 10
  },

  navigation: {
    backgroundColor: "rgb(219, 233, 236)",
    height: "7%"
  }, 
  
  genres: {
    backgroundColor: '#006175',
    borderRadius: 55,
    height: 105, 
    width: 105,
    justifyContent: 'center',
    alignItems: 'center'
  },

  socialsBox: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "85%",
    height: 60,
    marginBottom: "6%",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: 'center'
  },

  socialsLogo: {
    height: "70%",
    width: "10%",
    left: "20%"
  },

})

const sparkViewStyles = StyleSheet.create({

  addButton: {
      height: "50%",
      width: "20%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#006175",
      borderRadius: 7
  },
  sparkContainer:
  {
      width:"100%",
      height:"90%",
      backgroundColor: "rgba(255,255,255,1)",
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center"
  },
  locationContainer:
  {
      width:"90%",
      flexDirection:"column", 
      height:"10%",
      marginTop: "12%"
  },
  topLocationContainer:{
      width:"90%",
      flexDirection:"column", 
      height:"10%",
      marginTop: "4%"
  },
  timeContainer:{
      flexDirection:"row",
      marginBottom: "8%",
      justifyContent: "center",
      alignItems: "center"
  },
  sparkVerticalContainer:
  {
      width:"100%",
      height:"100%",
      backgroundColor: "rgba(255,255,255,1)",
      flexDirection: "column", 
      justifyContent: "space-between", 
      alignItems: "center"
  },

  bottomContainer:{
      width:"100%",
      height:"8%",
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center"
  },

  newInputBox:{
      height:"100%",
      borderWidth: 0,
      borderColor: "black",
      backgroundColor: "#F9CBB1",
      paddingLeft: "1%",
      marginTop: "1%",
      borderRadius: 8,
      textAlign: 'center',
      color: "white",
      width: "100%",
  },
  locationInputBox:{
      textAlign: 'left',
      paddingLeft: '2%',
      fontSize: 18
  },
  dateInputBox: {
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 24,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "100%",
      alignContent: "center"
  },
  minuteInputBox:{
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 36,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "15%",
      alignContent: "center"
  },
  hourInputBox:{
      height: "10%",
      marginHorizontal: "2%",
      borderWidth: 0,
      borderColor: "black",
      paddingHorizontal: "1%",
      fontSize: 36,
      borderRadius: 8,
      textAlign: 'center',
      color: "black",
      width: "15%",
      alignContent:"flex-end",
      justifyContent:"flex-end"
  },
  dateInputContainer:{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "1%",
      width: "25%",
  },

  button:
  {
      backgroundColor: "#006175",
      marginHorizontal: "17%",
      color: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      paddingTop: "2%",
      paddingBottom: "2%",
      marginTop: "2%",
      marginBottom: "2%",
      borderWidth: 0,
      paddingHorizontal: "5%"
  },
});