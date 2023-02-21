import React, {useEffect} from 'react';
import { enableRipple } from '@syncfusion/ej2-base';
//import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List, IconButton } from 'react-native-paper';
import { stylesSummary } from "../../styles/summary.js";
import { Input, Slider, DropDown } from '../../components/components';
import { Observable, TDO, FirebaseButler, PushNotify } from '../../components/classes';
import { stylesPortrait } from "../../styles/portrait";
import Routes from "../Navigation/constants/Routes";
import ProfileImage from "../../components/profileImage";

import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';


export default function SparkSummary({ route, navigation }) {

  let props = route.params;
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
  let currentSparkId = props?.currentSparkId || "-NHSPNV5tXpWmVtr6M3h";
  let currentSparkIdAttend = "-NFQzJtPbk7zfcY0Iy2l";

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

  const ReadLocationRoute = () => (
      <View style={[sparkViewStyles.sparkVerticalContainer]}>
        <ScrollView contentContainerStyle = {{flex: 1, alignItems: "center", paddingBottom: "50%"}}>
          <Image style={{height: 70, width: 70, marginTop: "7%"}} source={require('../../../assets/locationpin2.png')}/>
          <Text style={{fontSize: 25, marginTop: "5%"}}>Location Title</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>Street Address</Text>
          <Text style={{fontSize: 18, marginTop: "2%"}}>City, State Zip Code</Text>
          <Text style={{marginRight: "51%", marginTop: "7%"}}>Special Instructions</Text>
          <View style={{borderColor: "#F2905B", borderRadius: 10, borderWidth: 2, height: "30%", width: "85%", marginTop: "2%"}}/>
          <TouchableOpacity style={{width: "85%", height: "18%", marginTop: "6%", backgroundColor: "rgb(0, 97, 117)", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>Google Maps</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  );  
  
  const LocationRoute = () => (
        <View style={[sparkViewStyles.sparkVerticalContainer]}>
          <ScrollView contentContainerStyle = {{flex: 1, alignItems: "center", paddingBottom: "50%"}}>
            <Image style={{height: 70, width: 70, marginTop: "7%"}} source={require('../../../assets/locationpin2.png')}/>
            <Text style={{fontSize: 25, marginTop: "5%"}}>Location Title</Text>
            <Text style={{fontSize: 18, marginTop: "2%"}}>Street Address</Text>
            <Text style={{fontSize: 18, marginTop: "2%"}}>City, State Zip Code</Text>
            <Text style={{marginRight: "51%", marginTop: "7%"}}>Special Instructions</Text>
            <View style={{borderColor: "#F2905B", borderRadius: 10, borderWidth: 2, height: "30%", width: "85%", marginTop: "2%"}}/>
            <TouchableOpacity style={{width: "85%", height: "18%", marginTop: "6%", backgroundColor: "rgb(0, 97, 117)", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: "white"}}>Google Maps</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );

    const VolunteersRoute = () => (
        <View style={[sparkViewStyles.sparkVerticalTest]}>
          <ScrollView contentContainerStyle = {{flex: 1}}>
            <View style={[sparkViewStyles.boxOne, {marginTop: "8%"}]}>
              <ProfileImage size = {"small"} userId = {null}/>
              <Text style={{marginLeft: "5%"}}>Spark Leader: Colin Robson</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <ProfileImage size = {"small"} userId = {null}/>
              <Text style={{marginLeft: "5%"}}>Bass: Azianna Yang</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <ProfileImage size = {"small"} userId = {null}/>
              <Text style={{marginLeft: "5%"}}>Piano: Colin Robson</Text>
            </View>
            <View style={[sparkViewStyles.boxOne]}>
              <ProfileImage size = {"small"} userId = {null}/>
              <Text style={{marginLeft: "5%"}}>Vocals: Austin Dorsey</Text>
            </View>
          </ScrollView>
        </View>
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
              {/* <Input placeHolderText={"MM"} start = {inputs.sparkMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMonth.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>05</Text>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Text style = {{fontSize: 30}}>10</Text>
              {/* <Input placeHolderText={"DD"} start = {inputs.sparkDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkDay.setVal(val)}/> */}
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              <Text style = {{fontSize: 30}}>22</Text>
              {/* <Input placeHolderText={"YY"} start = {inputs.sparkYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkYear.setVal(val)}/> */}
              <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
              <Text style = {{fontSize: 30}}>5</Text>
              {/* <Input placeHolderText={"12"} start = {inputs.sparkHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkHours.setVal(val)}/> */}
              <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
              <Text style = {{fontSize: 30}}>30</Text>
              {/* <Input placeHolderText={"30"} start = {inputs.sparkMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkMinutes.setVal(val)}/> */}
              <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
              <Text style = {{fontSize: 30}}>PM</Text>
              {/* <Input placeHolderText={"PM"} start = {inputs.sparkAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.sparkAmPM.setVal(val)}/> */}
          </View>
      </View>
      <View style={[sparkViewStyles.centerContents, sparkViewStyles.middleMan]}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={[sparkViewStyles.inbetweenText]}>First Rehearsal On</Text>
        </View>
          <View style={[sparkViewStyles.timeContainer]}>
              {/* <Input placeHolderText={"MM"} start = {inputs.rehearsalMonth.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMonth.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>05</Text>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              {/* <Input placeHolderText={"DD"} start = {inputs.rehearsalDay.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalDay.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>05</Text>
              <Text style={[sparkViewStyles.timeAndDateInput]}>/</Text>
              {/* <Input placeHolderText={"YY"} start = {inputs.rehearsalYear.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalYear.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>22</Text>
              <Text style={[sparkViewStyles.inbetweenText]}>At</Text>
              {/* <Input placeHolderText={"12"} start = {inputs.rehearsalHours.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalHours.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>06</Text>
              <Text style={[sparkViewStyles.timeAndDateInput]}>:</Text>
              {/* <Input placeHolderText={"30"} start = {inputs.rehearsalMinutes.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalMinutes.setVal(val)}/> */}
              <Text style = {{fontSize: 30}}>45</Text>
              <Text style={[sparkViewStyles.timeAndDateInput]}> </Text>
              <Text style = {{fontSize: 30}}>PM</Text>
              {/* <Input placeHolderText={"PM"} start = {inputs.rehearsalAmPM.getVal()} inputStyle = {sparkViewStyles.timeAndDateInput} func = {(val) => inputs.rehearsalAmPM.setVal(val)}/> */}
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

    const RequestsRoute = () => {
      const acceptRequest = async(role, id) => {
        //define "final" for the role selected to be the id of the user selected
        const db = getDatabase();
        const acceptRef = ref(db, `Sparks/${currentSparkId}/roles/${role}/final`);
        set(acceptRef, id);
    
        // schedule a notification to be sent about the survey to the user which was just accepted
        let sparkOBJ = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/times/spark`);
        let sparkTDO = new TDO(null, null, null, null, null, null, sparkOBJ["TDO"]);
        const navigateToSurvey = () => {
          navigation.navigate(Routes.sparkSurvey);
        }
        let sparkOverNotify = new PushNotify(navigateToSurvey);
        sparkOverNotify.scheduleNotification(sparkTDO, "Peer Survey", "Please tell us how this spark went!", userId);
    
        //add spark to user's section as a spark they are playing for
        const addSparkRef = ref(db, `Users/${id}/sparks/playing`);
        push(addSparkRef, currentSparkId);
      }
    
      return (
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
            <Text style={[sparkViewStyles.boxText]}> Piano: Colin Robson </Text>
            <TouchableOpacity onPress = {() => acceptRequest("piano", "kicswUalNUNMF4qYmT1OzY7IymG3")} style={[sparkViewStyles.acceptButton]}>
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
    }

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
    //  sixth: SixthRoute
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#006175' }}
        scrollEnabled= {true}
        labelStyle={{color:"#006175"}}
        style={{ backgroundColor: 'rgb(219, 233, 236)'}}
      />
    );

    const attendSpark = () => {
      //add spark to user's section as a spark they are attending
      const db = getDatabase();
      const attendSparkRef = ref(db, `Users/${userId}/sparks/attending`)
      push(attendSparkRef, currentSparkIdAttend);

      // schedule notification to arrive after the spark is complete
      let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.sparkSurvey));
      sparkOverNotify.scheduleNotification(null, "How was your experience?", "Please fill out this survery to let us know how things went!", userId); 
    }

    async function testRequest() {
      let sparkOverNotify = new PushNotify(() => navigation.navigate(Routes.publicProfile, {selectedUserId: "5cYHMVySLmOGyeZZeqA3oQ0DkO82"}));
      sparkOverNotify.scheduleNotification(null, "Spark Request", "You just received a request for your spark!", userId);
    }

    const [MySparkName, setMySparkName] = React.useState("Spark Name");

    async function setSparkName() {
      let sparkName = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/name`);
      setMySparkName(sparkName);
    }

    // const [MyDate, setMyDate] = React.useState("Date and Time");
    
    // async function setDate() {
    //   let date = await FirebaseButler.fbGet("Sparks/-NFQyokFAqLdeFJLDkSv/info/times/spark/TDO");
    //   setMyDate(date);
    // }

    const [MyAddress, setMyAddress] = React.useState("Location");

    async function setAddress() {
      let address = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/address`);
      setMyAddress(address);
    }

    const [MyCity, setMyCity] = React.useState("");

    async function setCity() {
      let city = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/city`);
      setMyCity(city);
    }

    const [MyState, setMyState] = React.useState("");

    async function setState() {
      let state = await FirebaseButler.fbGet(`Sparks/${currentSparkId}/info/location/state`);
      setMyState(state);
    }

    useEffect(() => {
      setSparkName();
      // setDate();
      setAddress();
      setCity();
      setState();
    }, [])

  return(
    <View style={styles.MainContainer}>
    <View style={styles.topBorder}>
      <View style={[styles.row2, {justifyContent: 'center', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
        {/* REMOVE TESTREQUEST BUTTON AND REPLACE WITH ATTENDSPARK BUTTON */}
        {/* <IconButton onPress = {() => testRequest()}style = {{position: "absolute", left: "2%"}}icon = "head-check" size = {30}/> */}
        {/* <Text style={styles.titleText}></Text> */}
        <IconButton onPress = {() => attendSpark()}style = {{position: "absolute", left: "85%"}}icon = "checkbox-marked-circle-plus-outline"/>
      </View>
      <View style = {styles.row}>
        <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10, color: "#006175", marginLeft: 39}}>{(MySparkName) ? `${MySparkName}'s Spark` : "My Spark"}</Text>
      </View>
      <View style={styles.row}>
        <ProfileImage size = {"medium"} userId = {null}/>
        <View style={styles.column}>
          <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13, marginRight: 150}}>Date and Time</Text>
          <View style={styles.row2}>
            <Image style={{height: 20, width: 20, marginRight: 20}} source={require('../../../assets/locationpin.png')}></Image>
            <Text style = {{flexWrap: "wrap", width: "70%", marginRight: 5}}>{MyAddress} {MyCity}, PA</Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, {marginLeft: 80, marginRight: 50, top: "30%"}]}>
      <Button
          // onPress={onPressLearnMore}
          title="Attend Spark"
          // color="#841584"
          accessibilityLabel="Learn more about this purple button"/>
          <Button
          // onPress={onPressLearnMore}
          title="Next"
          // color="#841584"
          accessibilityLabel="Learn more about this purple button"/>
    </View>
     {/* REMOVE AND KEEP ONLY ON PUBLIC PROFILE  */}
    {/* <View style={[styles.row, {marginLeft: 100, marginRight: 100, top: "30%"}]}>
      <Image style={{height: 25, width: 25}} source={require('../../../assets/filledspark.png')}></Image>
      <Image style={{height: 25, width: 25}} source={require('../../../assets/filledspark.png')}></Image>
      <Image style={{height: 25, width: 25}} source={require('../../../assets/filledspark.png')}></Image>
      <Image style={{height: 25, width: 25}} source={require('../../../assets/emptyspark.png')}></Image>
      <Image style={{height: 25, width: 25}} source={require('../../../assets/emptyspark.png')}></Image>
    </View> */}
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
    height: "35%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },

  content: {
    // height: '78%'
    flex: 1
  },

  titleText: {
    fontSize: 20,
    textAlign: 'center',
    color: "#006175"
  },

  row: {
    flexDirection: 'row',
    top: '25%',
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
      height: "100%",
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
      width:"85%",
      flexDirection:"column", 
      height:"10%",
      marginTop: "7%"
  },
  timeContainer:{
      flexDirection:"row",
      marginBottom: "8%",
      justifyContent: "center",
      alignItems: "center"
  },
  sparkVerticalContainer:
  {
    padding: "5%",
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center"
  },
  sparkVerticalTest:{
    width:"100%",
    height:"100%",
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
      backgroundColor: "#F2905B",
      marginBottom: "5%",
      borderRadius: 10,
      padding: "2%",
      height: "15%",
      // width: "85%",
      flexDirection: "row",
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
    width: "12.5%", 
    height: "59%",
    marginLeft: "6%"
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