import React from 'react';
import { enableRipple } from '@syncfusion/ej2-base';
//import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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

    publishedDay: new Observable("", () => updatePayload(inputs.publishedDay.getVal(), "publishedDay")),
    publishedMonth: new Observable("", () => updatePayload(inputs.publishedMonth.getVal(), "publishedMonth")),
    publishedYear: new Observable("", () => updatePayload(inputs.publishedYear.getVal(), "publishedYear")),
    publishedHours: new Observable("", () => updatePayload(inputs.publishedHours.getVal(), "publishedHours")),
    publishedMinutes: new Observable("", () => updatePayload(inputs.publishedMinutes.getVal(), "publishedMinutes")),
    publishedAmPM: new Observable("", () => updatePayload(inputs.publishedAmPM.getVal(), "publishedAmPM")),

    rehearsalDay: new Observable("", () => updatePayload(inputs.rehearsalDay.getVal(), "rehearsalDay")),
    rehearsalMonth: new Observable("", () => updatePayload(inputs.rehearsalMonth.getVal(), "rehearsalMonth")),
    rehearsalYear: new Observable("", () => updatePayload(inputs.rehearsalYear.getVal(), "rehearsalYear")),
    rehearsalHours: new Observable("", () => updatePayload(inputs.rehearsalHours.getVal(), "rehearsalHours")),
    rehearsalMinutes: new Observable("", () => updatePayload(inputs.rehearsalMinutes.getVal(), "rehearsalMinutes")),
    rehearsalAmPM: new Observable("", () => updatePayload(inputs.rehearsalAmPM.getVal(), "rehearsalAmPM")),

    sparkDay: new Observable("", () => updatePayload(inputs.sparkDay.getVal(), "sparkDay")),
    sparkMonth: new Observable("", () => updatePayload(inputs.sparkMonth.getVal(), "sparkMonth")),
    sparkYear: new Observable("", () => updatePayload(inputs.sparkYear.getVal(), "sparkYear")),
    sparkHours: new Observable("", () => updatePayload(inputs.sparkHours.getVal(), "sparkHours")),
    sparkMinutes: new Observable("", () => updatePayload(inputs.sparkMinutes.getVal(), "sparkMinutes")),
    sparkAmPM: new Observable("", () => updatePayload(inputs.sparkAmPM.getVal(), "sparkAmPM"))
  };
  const updatePayload = (updateVal, updateName) =>
  {
      update[updateName] = updateVal;
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const LocationRoute = () => (
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
    // <Image source="../../../assets/miniEri.png"   />


    const VolunteersRoute = () => (
        // <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
        //   <View style={{alignItems: "center", justifyContent: "center"}}>
        //     <Text style={{fontSize:28, paddingTop:"4%", fontWeight:'500'}}>Requests</Text>
        //   </View>
        //     <List.Section style={{marginTop: "6%"}}>
        //       <List.Accordion style={styles.accordian} title="Person 1">
        //         <TouchableOpacity style={{width: "100%", flexDirection:"row", justifyContent:"space-between"}}>
        //           <List.Subheader style={styles.accordionSubheading}>
        //             <Text>Egg</Text>
        //             <Text>Big</Text>
        //           </List.Subheader>
        //       </TouchableOpacity>
        //         <List.Subheader style={styles.accordionSubheading}>Reject</List.Subheader>
        //       </List.Accordion>
        //       <List.Accordion style={styles.accordian} title="Person 2">
        //       <List.Subheader style={styles.accordionSubheading}>Accept</List.Subheader>
        //         <List.Subheader style={styles.accordionSubheading}>Reject</List.Subheader>
        //       </List.Accordion>
        //       <List.Accordion style={styles.accordian} title="Person 3">
        //       <List.Subheader style={styles.accordionSubheading}>Accept</List.Subheader>
        //         <List.Subheader style={styles.accordionSubheading}>Reject</List.Subheader>
        //       </List.Accordion>
        //       {/* <List.Image variant="image" source={require("../../../assets/miniEri.png")} />  */}
        //     </List.Section>
            
        // </ScrollView>

        <ScrollView>
          <View style={[sparkViewStyles.sparkVerticalTest]}>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize:28, paddingTop:"4%", paddingBottom:"6%", fontWeight:'500'}}>Volunteers</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

              </Image>
              <Text style={[sparkViewStyles.originalBoxText]}>Spark Leader: Colin Robson (you)</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

              </Image>
              <Text style={[sparkViewStyles.originalBoxText]}>Azianna Yang: Bass</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

              </Image>
              <Text style={[sparkViewStyles.originalBoxText]}>Colin Robson: Piano</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

              </Image>
              <Text style={[sparkViewStyles.originalBoxText]}>Austin Dorsey: Vocals</Text>
            </View>
          </View>
        </ScrollView>
      );
      
    const SetListRoute = () => (
      <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize:28, paddingTop:"4%", fontWeight:'500'}}>Set List</Text>
      </View>
        <List.Section style={{marginTop: "6%"}}>
          <List.Accordion style={styles.accordian} title="Song 1">
            <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
          <List.Accordion style={styles.accordian} title="Song 2">
          <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
          <List.Accordion style={styles.accordian} title="Song 3">
          <List.Subheader style={styles.accordionSubheading}>Lyrics</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Chord Charts</List.Subheader>
            <List.Subheader style={styles.accordionSubheading}>Notes</List.Subheader>
          </List.Accordion>
        </List.Section>
    </ScrollView>
      );

    const TimesRoute = () => (
      <ScrollView>
      <View style={[sparkViewStyles.sparkVerticalContainer]}>
      <View style={[sparkViewStyles.centerContents]}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize:28, paddingTop:"4%", fontWeight:'500'}}>Times</Text>
        </View>
        <View style={{alignItems: "center", justifyContent: "center", marginTop:"6%"}}>
            <Text style={[sparkViewStyles.inbetweenText]}>Spark Begins On</Text>
        </View>
          
          <View style={[sparkViewStyles.timeContainer]}>
              <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/>
              <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
              <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
              <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
              <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/>
          </View>
      </View>
      <View style={[sparkViewStyles.centerContents, sparkViewStyles.middleMan]}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={[sparkViewStyles.inbetweenText]}>First Rehearsal On</Text>
        </View>
          <View style={[sparkViewStyles.timeContainer]}>
              <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/>
              <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
              <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
              <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
              <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/>
          </View>
      </View>
      <View style={[sparkViewStyles.centerContents]}>
          <Text style={[sparkViewStyles.inbetweenText]}>Roles to be Filled By</Text>
          <View style={[sparkViewStyles.timeContainer]}>
              <Input placeHolderText={"MM"} start = {inputs.publishedMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMonth.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"DD"} start = {inputs.publishedDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedDay.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Input placeHolderText={"YY"} start = {inputs.publishedYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedYear.setVal(val)}/>
              <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
              <Input placeHolderText={"12"} start = {inputs.publishedHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedHours.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
              <Input placeHolderText={"30"} start = {inputs.publishedMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedMinutes.setVal(val)}/>
              <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
              <Input placeHolderText={"PM"} start = {inputs.publishedAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.publishedAmPM.setVal(val)}/>
          </View>
      </View>
  </View>
  </ScrollView>
      );

    const RequestsRoute = () => (
      <ScrollView>
      <View style={[sparkViewStyles.sparkVerticalTest]}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize:28, paddingTop:"4%", paddingBottom:"6%", fontWeight:'500'}}>Volunteers</Text>
        </View>
        <View style={[sparkViewStyles.boxOne]}>
          <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

          </Image>
          <Text style={[sparkViewStyles.originalBoxText]}>Project Lead (you)</Text>
        </View>
        <View style={[sparkViewStyles.boxOne]}>
          <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

          </Image>
          <Text style={[sparkViewStyles.originalBoxText]}>Accepted Friend</Text>
        </View>
        <View style={[sparkViewStyles.boxOne]}>
          <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

          </Image>
          <Text style={[sparkViewStyles.boxText]}>Volunteer 1</Text>
          <TouchableOpacity style={[sparkViewStyles.acceptButton]}>
          <Image source={require("../../../assets/check-mark-24.png")}>

          </Image>
          </TouchableOpacity>
          <TouchableOpacity style={[sparkViewStyles.denyButton]}>
          <Image source={require("../../../assets/x-mark-24.png")}>

          </Image>
          </TouchableOpacity>
        </View>
        <View style={[sparkViewStyles.boxOne]}>
          <Image style={[sparkViewStyles.profileImage]} source={require("../../../assets/EriToken.png")}>

          </Image>
          <Text style={[sparkViewStyles.boxText]}>Volunteer 2</Text>

          <TouchableOpacity style={[sparkViewStyles.acceptButton]}>
          <Image source={require("../../../assets/check-mark-24.png")}>

          </Image>
          </TouchableOpacity>
          <TouchableOpacity style={[sparkViewStyles.denyButton]}>
          <Image source={require("../../../assets/x-mark-24.png")}>

          </Image>
          </TouchableOpacity>

        </View>
      </View>
      </ScrollView>
    );
    // const SixthRoute = () => (
    //    <DropDownPicker
    //      placeholderStyle={{
    //        alignContent: "center", justifyContent: "center"
    //      }}
    //      dropDownContainerStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      containerStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      dropDownStyle={{
    //        backgroundColor: "#FFA500"
    //      }}
    //      showArrowIcon={false}
    //      open={open}
    //      value={value}
    //      items={items}
    //      setOpen={setOpen}
    //      setValue={setValue}
    //      setItems={setItems}
    //      style={{color: "#FFA500"}}
      
    //    />
    //);
    
      
      
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Location' },
        { key: 'second', title: 'Times' },
        { key: 'third', title: 'Set List' },
        { key: 'fourth', title: 'Volunteers' },
        { key: 'fifth', title: 'Requests' },
    //  { key: 'sixth', title: 'Test'}
    ]);
    
    const renderScene = SceneMap({
        first: LocationRoute,
        second: TimesRoute,
        third: SetListRoute,
        fourth: VolunteersRoute,
        fifth: RequestsRoute,
    //    sixth: SixthRoute
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#006175' }}
        scrollEnabled= {true}
        labelStyle={{color:"#000000"}}
        style={{ backgroundColor: 'rgb(219, 233, 236)'}}
      />
    );

  return(
    <View style={styles.MainContainer}>
    <View style={styles.topBorder}>
      <View style={[styles.row2, {justifyContent: 'center', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
        <Text style={styles.titleText}>Spark Name</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.profilePicture} source={require('../../../assets/blankprofilepic.png')}></Image>
        <View style={styles.column}>
          <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10}}>Leader Name</Text>
          <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13}}>Date and Time</Text>
          <View style={styles.row2}>
            <Image style={{height: 20, width: 20}} source={require('../../../assets/locationpin.png')}></Image>
            <Text>Location</Text>
          </View>
        </View>
      </View>
    <View style={[styles.row, {marginLeft: 20, marginRight: 20, top: 115}]}>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
      <Image style={{height: 40, width: 40}} source={require('../../../assets/filledStar.png')}></Image>
    </View>
    </View>
    <View style={styles.content}>
      <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex}/>
    </View>
    {/* <View style={styles.navigation}>
      <Image style={{width: '100%', height: '100%'}} source={require('../../../assets/navigation.png')}></Image>
    </View> */}
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
    height: '60%'
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
    backgroundColor: '#F9CBB1',
    color: "#FFFFFF",
    padding: 10,
    marginLeft: '5%',
    marginRight: '5%', 
  },
  accordionSubheading: {
    left:15,
    backgroundColor: "#F2905B",
    marginRight: '5%',
    marginLeft: '1%',
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF"
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
  sparkVerticalTest:{
    width:"100%",
    height:"200%",
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "column", 
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
  timeAndDateInput:
  {
      fontSize:26,
      justifyContent:"center"
  },
  inbetweenText:
  {
      marginHorizontal:"5%", 
      fontSize:20
  },
  middleMan:
  {
      marginVertical: "20%"
  },
  boxOne:
  {
      backgroundColor: "#F9CBB1",
      //height: "30%",
      width: "80%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  },
  boxText:{
    width: "30%", 
    marginTop: "11.5%",
    marginBottom: "11.5%",
    marginRight: "5%",
    marginLeft: "13.5%"
  },
  originalBoxText:{
    width: "58.5%", 
    marginTop: "11.5%",
    marginBottom: "11.5%",
    marginRight: "5%"
  },
  profileImage:{
    width: "15%", 
    height: "51%",
    marginLeft: "3%"
  },
  accordionImage:{
    width: "8%", 
    height: "30%",
    marginVertical: "0%"
  },
  accordionImageRight:{
    width: "8%", 
    height: "30%",
    marginRight: "2%",
    marginVertical: "0%"
  },
  acceptButton:{
    width: "8%", 
    height: "30%",
    marginVertical: "0%"
  },
  denyButton:{
    width: "8%", 
    height: "30%",
    marginRight: "2%",
    marginVertical: "0%"
  },
  sideOfAccordionImage:{
    width: "15%", 
    height: "24%",
    marginLeft: "3%"
  }
});