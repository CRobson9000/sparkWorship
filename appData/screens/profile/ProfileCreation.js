import React, {useRef, useEffect, useLayoutEffect} from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { Input, Slider } from '../../components/components';
import { Observable, FirebaseButler } from '../../components/classes';
import { getDatabase, ref, set, get } from 'firebase/database';
import { Dropdown } from 'react-native-element-dropdown';
import { Dialog, Portal, Provider, Checkbox, List, IconButton, Menu, ProgressBar } from 'react-native-paper';
// had to make a weird file to "redefine" ref since it already exists from firebase/database
import Routes from '../Navigation/constants/Routes.js';
import ProfileImage from '../../components/profileImage.js';
import { styleSheet } from "../../styles/profileCreationStyles.js";

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ProfileScreen({route, navigation}) {
  //set environment variables
  let props = route.params;
  //let userId = props.userId;

  /*This is an object of all of the possible textbox variables a user can change.  
  */
  let inputs = {
    /*
      name - the name of the input
      Observable: runs a function when it's value is changed
         - Parameters
           1. start value
           2. function that runs when the value is changed
              - Parameters
                 1. value to set in update object
                 2. name to set it to
                 Result: update is set to include the change
                   In other words......  
                   update = {
                      name: "<insert whatever value>"
                   }
        - An observable's value is changed when a user types something into one of the textboxes (see screen info for more comments)
        - There will be one of these for each textValue a user can add to (Phase 1, Phase 3, phone number is phase 2) 
    */

   //first screen variables
   name: new Observable("", () => updatePayload(inputs.name.getVal(), "name")),
   username: new Observable("", () => updatePayload(inputs.username.getVal(), "username")),
   email: new Observable("", () => updatePayload(inputs.email.getVal(), "email")),
   birthday: new Observable("", () => updatePayload(inputs.birthday.getVal(), "birthday")),
   streetAddress: new Observable("", () => updatePayload(inputs.streetAddress.getVal(), "streetAddress")),
   city: new Observable("", () => updatePayload(inputs.city.getVal(), "city")),
   zipCode: new Observable("", () => updatePayload(inputs.zipCode.getVal(), "zipCode")),
   state: null,
   gender: null,
   //second variable screens
   phoneNumber: new Observable("", () => updatePayload(inputs.phoneNumber.getVal(), "phoneNumber")),

   //third screen variables
   churchName: new Observable("", () => updatePayload(inputs.churchName.getVal(), "churchName")),
   denomination: new Observable("", () => updatePayload(inputs.denomination.getVal(), "denomination")),
   churchStreetAddress: new Observable("", () => updatePayload(inputs.churchStreetAddress.getVal(), "churchStreetAddress")),
   churchState: null,
   churchCity: new Observable("", () => updatePayload(inputs.churchCity.getVal(), "churchCity")),
   churchZipCode: new Observable("", () => updatePayload(inputs.churchZipCode.getVal(), "churchZipCode")),

   instrumentsArray: []
  } 

  // Here is the update variable, which keeps track of all the changes a user has made
  let update = useRef({});

  // This is the variable that gets the profile data from firebase.  This is only set once on the first load of the page 
  let fbProfileData = useRef({});

  // set instruments array
  let instrumentsArray = useRef([]);

  //This is the id of the user that you want to save the information to.  
  let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  // Model variables
  let states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  // global variables for dropDowns
  const globalUserState = useRef(null);
  const globalChurchState = useRef(null);
  const globalGender = useRef(null);

  async function getProfileData() {
    fbProfileData = await FirebaseButler.fbGet(`Users/${userId}/info`);
    if (fbProfileData) {

      for (let key in inputs) {
        //these are all of the fields which weren't acquired through a textbox
        if (fbProfileData[key] && inputs[key]) {
          //these keys are special cases because they need to populate dropdown data
          if (key == "state") {
            globalUserState.current = fbProfileData[key];
            inputs[key] = fbProfileData[key];
          }
          else if (key == "churchState") {
            globalChurchState.current = fbProfileData[key];
            inputs[key] = fbProfileData[key];
          }
          else if (key == "gender") {
            globalGender.current = fbProfileData[key];
            inputs[key] = fbProfileData[key];
          }
          else {
            let inputObj = inputs[key];
            inputObj.setVal(fbProfileData[key], false);
          }
        }
      }
  
      //set instrument data
      if (fbProfileData.instruments) {
        let startingInstruments = fbProfileData.instruments;
        for (let i = 0; i < startingInstruments.length; i++) {
          instrumentsArray["current"].push(startingInstruments[i]);
          inputs["instrumentsArray"].push(startingInstruments[i]);
        }
      }
    }
  }

  const updateToStart = () => {
    for (let key in inputs) {
        let updateVal = update[key];
        if (updateVal) {
            let obj = inputs[key];
            obj.setVal(updateVal);
        }
    }
  }

  // This function is what actually updates the object "update" (seen implemented in the "inputs" section above)
  const updatePayload = (updateVal, updateName) =>
  {
    update[updateName] = updateVal;
  }

  arraysAreEqual();

  function arraysAreEqual(object1, object2) {
    for (let index in object1) {
      if (typeof object1[index] == "object" && typeof object2[index] == "object") {
        if (!arraysAreEqual(Object.values(object1[index]), Object.values(object2[index]))) {
          return false;
        }
      }
      else {
        if (object1[index] != object2[index]) {
          return false;
        }
      }
    }
    return true;
  }

  // This is the function which will take all of the changes to update and push them to firebase
  function sendPayload() {
    /*
      Insert your code here... 
      You'll need to update firebase with all of the changes stored in update
    

      *** Some Help ***
      Here's how to save data to firebase:  
      1. initialize the db object with this line (only have to do once...)
      const db = getDatabase();

      // Set up a reference.  You'll need to route to the "info" section of the database (look on firebase to see this) using the user's id.  
      It should end with something like "name", so that the information will be saved under whatever attribute you're trying to save

      const reference = ref(db, <insert path here>);

      // This is the method which will actually set a value to the space you've defined above 
       set(reference, <insert value to set>);
    */
    const db = getDatabase();

    if (update["name"]) {
      const nameReference = ref(db, `Users/${userId}/info/name`);
      set(nameReference, update["name"]);
    }

    if (update["username"]) {
      const usernameReference = ref(db, `Users/${userId}/info/username`);
      set(usernameReference, update["username"]);
    }

    if (update["email"]) {
      const emailReference = ref(db, `Users/${userId}/info/email`);
      set(emailReference, update["email"]);
    }

    if (update["birthday"]) {
      const birthdayReference = ref(db, `Users/${userId}/info/birthday`);
      set(birthdayReference, update["birthday"]);
    }

    if (update["street"]) {
      const streetAddressReference = ref(db, `Users/${userId}/info/street`);
      set(streetAddressReference, update["street"]);
    }

    if (update["city"]) {
      const cityReference = ref(db, `Users/${userId}/info/city`);
      set(cityReference, update["city"]);
    }

    if (update["zipCode"]) {
      const zipCodeReference = ref(db, `Users/${userId}/info/zipCode`);
      set(zipCodeReference, update["zipCode"]);
    }

    if (update["password"]) {
      const passwordReference = ref(db, `Users/${userId}/info/password`);
      set(passwordReference, update["password"]);
    }

    if (update["phoneNumber"]) {
      const phoneNumberReference = ref(db, `Users/${userId}/info/phoneNumber`);
      set(phoneNumberReference, update["phoneNumber"]);
    }

    if (update["churchName"]) {
      const churchNameReference = ref(db, `Users/${userId}/info/churchName`);
      set(churchNameReference, update["churchName"]);
    }

    if (update["denomination"]) {
      const denominationReference = ref(db, `Users/${userId}/info/denomination`);
      set(denominationReference, update["denomination"]);
    }

    if (update["churchStreetAddress"]) {
      const churchStreetAddressReference = ref(db, `Users/${userId}/info/churchStreetAddress`);
      set(churchStreetAddressReference, update["churchStreetAddress"]);
    }

    if (update["churchCity"]) {
      const churchCityReference = ref(db, `Users/${userId}/info/churchCity`);
      set(churchCityReference, update["churchCity"]);
    }

    if (update["churchZipCode"]) {
      const churchZipCodeReference = ref(db, `Users/${userId}/info/churchZipCode`);
      set(churchZipCodeReference, update["churchZipCode"]);
    }
    console.log("Bool", !arraysAreEqual(instrumentsArray["current"], inputs["instrumentsArray"]));
    if (instrumentsArray["current"].length > 0  && !arraysAreEqual(instrumentsArray["current"], inputs["instrumentsArray"])) {
      const setInstrumentsRef = ref(db, `Users/${userId}/info/instruments`);
      set(setInstrumentsRef, instrumentsArray["current"]);
    }

    if (globalUserState.current != inputs["state"]) {
      const userStateRef = ref(db, `Users/${userId}/info/state`);
      set(userStateRef, globalUserState.current);
    }

    if (globalGender.current != inputs["gender"]) {
      const genderRef = ref(db, `Users/${userId}/info/gender`);
      set(genderRef, globalGender.current);
    }
    
    if (globalChurchState.current != inputs["churchState"]) {
      const churchStateRef = ref(db, `Users/${userId}/info/churchState`);
      set(churchStateRef, globalChurchState.current);
    }
    // Once everything is finalized, navigate to user profile screen
    navigation.navigate(Routes.personalProfile, route.params);
  }

  //dropDown renderItem function
  const renderDropDownItem = (item) => {
    return (
      <View style={{padding: "5%", justifyContent: "center", alignItems: "center", flex: 1}}>
        <Text> {item} </Text>
      </View>
    )
  }

  //code for sliders and screens
  const Screen1 = (props) => {
    let genders = ['Male', 'Female'];

     //dropDown variables
    const [userState, setUserState] = React.useState(null);
    const [gender, setGender] = React.useState(null);

    // these two methods will update the global variables when the values of the local variables change
    useEffect(() => {
      if (gender) {
        globalGender.current = gender;
      }
    }, [gender]);

    useEffect(() => {
      if (userState) {
        globalUserState.current = userState;
      }
    }, [userState]);

    // these two methods will initialize gender and userState to whatever globalGender and globalUserState are.  These will be set when 
    // the user's data is first pulled from firebase
    useEffect(() => {
      setGender(globalGender.current);
    }, [globalGender])

    useEffect(() => {
      setUserState(globalUserState.current);
    }, [globalUserState])

    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>General Information</Text>
        <Text style={styleSheet.text1}>Name</Text>
        <Input start = {inputs?.name?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.name.setVal(val)}/>
        <Text style={styleSheet.text1}>Username</Text>
        <Input start = {inputs?.username?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.username.setVal(val)}/>
        <Text style={styleSheet.text1}>Email</Text>
        <Input start = {inputs?.email?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.email.setVal(val)}/>
        <View style={styleSheet.row1}> 
            <View style={styleSheet.column1}>
                <Text style={styleSheet.text2}>Gender</Text>
                <Dropdown style={styleSheet.dropDown} 
                  data={genders} 
                  renderItem={renderDropDownItem}
                  onChange = {(value) => setGender(value)}
                  placeholder={gender}
                  value={gender}
                  maxHeight = {"40%"}
                  itemTextStyle = {{color: "black", fontSize: 2}}
                />
            </View>
            <View style={styleSheet.column1}>
                <Text style={styleSheet.text2}>Birthday</Text>
                <Input start = {inputs?.birthday?.getVal()} inputStyle = {styleSheet.birthdayInputBox} func = {(val) => inputs.birthday.setVal(val)}></Input>
            </View>
        </View>
        <Text style={styleSheet.text1}> Street Address (Optional)</Text>
        <Input start = {inputs?.streetAddress?.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.streetAddress.setVal(val)}/>
        <View style={styleSheet.row2}>
            <View style={styleSheet.column2}>
                <Text style={styleSheet.text3}>City</Text>
                <Input start = {inputs?.city?.getVal()} inputStyle = {styleSheet.inputBox2} func = {(val) => inputs.city.setVal(val)}></Input>
            </View>
            <View style={styleSheet.column2}>
                <Text style={styleSheet.text3}>State</Text>
                <Dropdown
                  style={styleSheet.dropDown} 
                  data={states} 
                  renderItem={renderDropDownItem}
                  maxHeight = {"40%"}
                  itemTextStyle = {{color: "black", fontSize: 2}}
                  onChange = {(value) => setUserState(value)}
                  placeholder = {userState}
                  value = {userState}
                />
            </View>
            <View style={styleSheet.column2}>
                <Text style={styleSheet.text3}>Zip Code</Text>
                <Input start = {inputs?.zipCode?.getVal()} inputStyle = {styleSheet.inputBox2} func = {(val) => inputs.zipCode.setVal(val)}></Input>
            </View>
        </View>
      </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.stageText}>Reset Password</Text>
            <Text style={styleSheet.text1}>Password</Text>
            <Input /*start = {inputs.password.getVal()}*/ inputStyle = {styleSheet.inputBox} /*func = {(val) => inputs.password.setVal(val)}*//>
            <Text style={styleSheet.text1}>Confirm Password</Text>
            <Input inputStyle = {styleSheet.inputBox}/>
            <TouchableOpacity style={styleSheet.screen2Buttons} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Reset Password</Text></TouchableOpacity>
            <Text style={styleSheet.stageText}>Authentication</Text>
            <Text style={styleSheet.text1}>Phone Number</Text>
            <Input start = {inputs.phoneNumber.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.phoneNumber.setVal(val)}/>
            <TouchableOpacity style={styleSheet.screen2Buttons} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Enable Two-Step Authentication</Text></TouchableOpacity>
        </View>
    );
  }


  const Screen3 = (props) => {
    const [churchState, setChurchState] = React.useState(null);

    //see comments in screen 1 for details on how this works
    useEffect(() => {
      if (churchState) {
        globalChurchState.current = churchState;
      }
    }, [churchState]);

    useEffect(() => {
      setChurchState(globalChurchState.current);
    }, [globalChurchState])

    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>Home Church</Text>
        <Text style={styleSheet.smallText2}>This section is optional. You may skip by clicking Next.</Text>
        <Text style={styleSheet.text1}>Church Name</Text>
        <Input start = {inputs.churchName.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchName.setVal(val)}/>
        <Text style={styleSheet.text1}>Denomination</Text>
        <Input start = {inputs.denomination.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.denomination.setVal(val)}/>
        <Text style={styleSheet.text1}>Street Address</Text>
            <Input start = {inputs.churchStreetAddress.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchStreetAddress.setVal(val)}/>
            <View style={styleSheet.row2}>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text3}>City</Text>
                    <Input start = {inputs.churchCity.getVal()} inputStyle = {styleSheet.inputBox2} func = {(val) => inputs.churchCity.setVal(val)}></Input>
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text3}>State</Text>
                    <Dropdown 
                      style={styleSheet.dropDown} 
                      data={states} 
                      renderItem={renderDropDownItem}
                      maxHeight = {"40%"}
                      itemTextStyle = {{color: "black", fontSize: 2}}
                      onChange = {(value) => setChurchState(value)}
                      placeholder = {churchState}
                      value = {churchState}
                    />
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text3}>Zip Code</Text>
                    <Input start = {inputs.churchZipCode.getVal()} inputStyle = {styleSheet.inputBox2} func = {(val) => inputs.churchZipCode.setVal(val)}></Input>
                </View>
            </View>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>Social Media</Text>
        <Text style={styleSheet.text1}>Linked Accounts</Text>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/instagramlogo.png")}></Image>
        </View>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/tiktoklogo.png")}></Image>
        </View>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/facebooklogo.png")}></Image>
        </View>
        <TouchableOpacity style={styleSheet.screen2Buttons}><Text style={styleSheet.buttonText}>+ Add Social Media Account</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen5 = (props) => {
    // --------------------
    // Add instrument code
    // --------------------

    //dialog box code
    const [visible, setVisible] = React.useState(null);
    function showDialog(id) {
      if (id !== undefined) setVisible(id);
      else setVisible(-1);
    };
    const hideDialog = () => setVisible(null);

    //dropDown code
    const [dropDownItems, setDropDownItems] = React.useState([]);

    async function populateDropDown() {
      //populate roles with instruments and other roles from models
      const db = getDatabase();

      //Get instruments from "models" in firebase
      let instrumentsFromModel = await FirebaseButler.fbGet("Models/instruments");
      setDropDownItems(instrumentsFromModel);
    }

    // Set up variables to add to an instrument
    const [checked, setChecked] = React.useState(false);
    const [instrumentSelect, setInstrument] = React.useState("");
    let worshipExperience = "";
    let generalExperience = "";
    let additionalNotes = "";
    const [instruments, setInstruments] = React.useState([]);

    //functional methods for adding an instrument
    function addInstrument(id) {
      if (instrumentSelect != "") {
        let finalInstrument = {
          instrumentName: instrumentSelect,
          worshipExperience,
          generalExperience,
          additionalNotes,
          mainInstrument: checked
        };
        
        //add instrument if id == -1 (this is when we add an instrument for the first time)
        if (id == -1) {
          instrumentsArray["current"].push(finalInstrument);
        }
        //update the array with new information if an id is passed in
        else {
          instrumentsArray["current"][id] = finalInstrument;
        }

        //reset instrument select
        setInstrument(null);
        //update instruments array
        setInstruments(() => [...instrumentsArray["current"]]);
        hideDialog();
      }
    }

    //dialog box content code
    const DialogBox = (props) => {
      let currentInstrument = null;
      let stateVisible;
      if (visible == null) {
        stateVisible = false
      } 
      else {
        stateVisible = true;
        if (currentInstrument != -1) {
          currentInstrument = instruments[visible];
        }
      }
      
      //set placeholder value
      let placeHolderVal = "Select and instrument..."
      
      if (currentInstrument?.instrumentName) {
        //console.log("Instrument was loaded");
        placeHolderVal = currentInstrument.instrumentName;
      }
      if (instrumentSelect) {
        //console.log("Instrument was selected");
        placeHolderVal = instrumentSelect
      }

      return (
        <Provider>
          <View style = {{zIndex: 1}}>
            <Portal>
              <Dialog visible={stateVisible} onDismiss={hideDialog}>
                <Dialog.Title>Add an Instrument</Dialog.Title>
                <Dialog.Content style = {{height: "80%", justifyContent: "center", alignItems: "center", borderRadius: 5}}>
                  <Dialog.ScrollArea style = {{width: "100%"}}>
                    <ScrollView>
                      <Text style={styleSheet.text}>Instrument</Text>
                      <View style = {{flex: 0.8}}>
                        <Dropdown
                            data = {dropDownItems}
                            dropdownPosition = {"top"}
                            search = {false}
                            maxHeight = {"40%"}
                            itemTextStyle = {{color: "black", fontSize: 5}}
                            onChange = {(value) => setInstrument(value)}
                            placeholder = {placeHolderVal}
                            value = {placeHolderVal}
                            placeholderStyle = {{textAlign: "center"}}
                            renderItem = {renderDropDownItem}
                        />
                      </View>

                      <Text style={styleSheet.text}>Worship Experience</Text>
                      <Input start = {(currentInstrument ? currentInstrument.worshipExperience : "")} inputStyle = {styleSheet.instrumentDialogInput} func = {(val) => worshipExperience = val}/>

                      <Text style={styleSheet.text}>General Experience</Text>
                      <Input start = {(currentInstrument ? currentInstrument.generalExperience : "")} inputStyle = {styleSheet.instrumentDialogInput} func = {(val) => generalExperience = val}/>

                      <Text style={styleSheet.text}> Additional Notes </Text>
                      <Input start = {(currentInstrument ? currentInstrument.additionalExperience : "")} inputStyle = {styleSheet.instrumentDialogInput} func = {(val) => additionalNotes = val}/>

                      <View style={{flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
                        <Text style={styleSheet.text}> Main Instrument? </Text>
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked);
                          }}
                        />
                      </View>
                    </ScrollView>
                  </Dialog.ScrollArea>
                  <TouchableOpacity style={styleSheet.dialogButton} onPress = {() => addInstrument(visible)}>
                    <Text style={styleSheet.buttonText}>{(currentInstrument) ? 'Update' : 'Add'}</Text>
                  </TouchableOpacity>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </Provider>
      );
    }

    // -------------------------------
    // Instrument list rendering code
    // -------------------------------
    const renderInstrument = (object) => {
      //content for instrument
      return (
        <List.Accordion
          title={object.item.instrumentName}
          style = {styleSheet.header}
          titleStyle = {styleSheet.headerText}
          onLongPress = {() => showDialog(object.index)}
        >
          <View style={styleSheet.listItemContainer}>
            <View style={styleSheet.listItemHeader}>
              <Text style={{fontWeight: "bold", fontSize: 15}}> General Experience </Text>
            </View>
            <View style={styleSheet.listItemContent}>
              <Text style={styleSheet.contentText}>
                {object.item.generalExperience}
              </Text>
            </View>
          </View>

          <View style={styleSheet.listItemContainer}>
            <View style={styleSheet.listItemHeader}>
              <Text style={{fontWeight: "bold", fontSize: 15}}> Worship Experience </Text>
            </View>
            <View style={styleSheet.listItemContent}>
              <Text style={styleSheet.contentText}>
                {object.item.worshipExperience}
              </Text>
            </View>
          </View>

          <View style={styleSheet.listItemContainer}>
            <View style={styleSheet.listItemHeader}>
              <Text style={{fontWeight: "bold", fontSize: 15}}> Additional Notes </Text>
            </View>
            <View style={styleSheet.listItemContent}>
              <Text style={styleSheet.contentText}>
                {object.item.additionalNotes}
              </Text>
            </View>
          </View>
        </List.Accordion>
      );
    }

    useEffect(() => {
      populateDropDown();
      setInstruments(() => [...instrumentsArray["current"]])
    }, []);

    return (
      <View style={styleSheet.content}>
        <DialogBox />
        <View style = {{zIndex: -3, justifyContent: "center", alignItems: "center"}}>
          <Text style={styleSheet.stageText}>Musical Background</Text>
          <FlatList 
            data = {instruments}
            style = {{height: "60%", width: "80%"}}
            renderItem = {renderInstrument}
          />
          <TouchableOpacity style={styleSheet.screen2Buttons} onPress={() => showDialog()}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
        </View>
      </View>
    );
  }


  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />, <Screen5 />
  ];

  let [currentIndex, setCurrentIndex] = React.useState(1);

  function limitScroll(){
    if (currentIndex < 0) {
      setCurrentIndex(myScreens.length - 1);
    }
    else if (currentIndex > myScreens.length - 1) {
      setCurrentIndex(0);
    }
  }

  //---------------------------------------------------------------------------
  // Section of code to put functions to be run after a component is re-rendered
  //---------------------------------------------------------------------------

  //loops the index back around on the other end when 
  limitScroll();
  updateToStart();

  //will only run on the first load
  useEffect(() => {
    getProfileData().then(() => {
      setCurrentIndex(0);
    });
  }, [])

  // useEffect(() => {
    
  // }, [currentIndex])

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/
  // if (done) {
  return (
      <View style={styleSheet.MainContainer}> 
          <View style={styleSheet.topBorder}>
            <Text style={styleSheet.titleText}>Profile Creation</Text>
            <View style={styleSheet.topRow}>
              {/* <TouchableOpacity style = {styleSheet.profilePictureContainer} onPress = {() => uploadPhoto()}>
                <Image style={styleSheet.profilePicImage} source={image}></Image>
              </TouchableOpacity> */}
              <ProfileImage userId = {userId} changeable = {true} size = {"large"}/>
              <View style={styleSheet.column3}>
                <ProgressBar color = {"rgb(0, 97, 117)"} style={{width: screenWidth/2.4 , height: 20, borderRadius: 10, marginBottom: "15%"}} progress={(currentIndex + 1) / 5}/>
                <Text style={styleSheet.smallText1}>Click your profile picture to change</Text>
              </View>
            </View>
          </View>
          <Slider currentIndex = {currentIndex} screens = {myScreens} />

          <View style={styleSheet.bottomRow}>
              <TouchableOpacity style={styleSheet.constantButtons} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
              <TouchableOpacity style={styleSheet.constantButtons} onPress = {() => (currentIndex == myScreens.length - 1) ? sendPayload() : setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>{(currentIndex == myScreens.length - 1) ? "Submit" : "Next"}</Text></TouchableOpacity>
          </View>
      </View>
    );
  // }
}
