import React, {useRef, useEffect} from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Input, Slider } from '../../components/components';
import { Observable } from '../../components/classes';
import { getDatabase, ref, set, get } from 'firebase/database';
import { Dropdown } from 'react-native-element-dropdown';

<<<<<<< HEAD
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
// had to make a weird file to "redefine" ref since it already exists from firebase/database
import { storageRef } from '../../../config/additionalMethods';

export default function ProfileScreen({route, navigation}) {
=======
export default function ProfileCreation({route, navigation}) {
>>>>>>> kylie-current
  //set environment variables
  let props = route.params;
  //let userId = props.userId;

  /*This is an object of all of the possible textbox variables a user can change.  
  */
  let inputs = {
    //Sample input explanation
    name: new Observable("", () => updatePayload(inputs.name.getVal(), "name")),

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
   streetAddress: new Observable("", () => updatePayload(inputs.streetAddress.getVal(), "location")),
   city: new Observable("", () => updatePayload(inputs.city.getVal(), "city")),
   zipCode: new Observable("", () => updatePayload(inputs.zipCode.getVal(), "zipCode")),

   //second variable screens
   password: new Observable("", () => updatePayload(inputs.password.getVal(), "password")),
   phoneNumber: new Observable("", () => updatePayload(inputs.phoneNumber.getVal(), "phoneNumber")),

   //third screen variables
   churchName: new Observable("", () => updatePayload(inputs.churchName.getVal(), "churchName")),
   denomination: new Observable("", () => updatePayload(inputs.denomination.getVal(), "denomination")),
   churchStreetAddress: new Observable("", () => updatePayload(inputs.churchStreetAddress.getVal(), "churchStreetAddress")),
   churchCity: new Observable("", () => updatePayload(inputs.churchCity.getVal(), "churchCity")),
   churchZipCode: new Observable("", () => updatePayload(inputs.churchZipCode.getVal(), "churchZipCode")),
  } 

  // Here is the update variable, which keeps track of all the changes a user has made
  let update = useRef({});

  //This is the id of the user that you want to save the information to.   
  let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";

  //This function uses update to populate a phase with information entered previously
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





    // Once everything is finalized, navigate to user profile screen
    navigation.navigate("ProfileScreenIPersonal");
  }

  //code for sliders and screens
  const Screen1 = (props) => {
    const gender = ['Male', 'Female'];
    const state = ['PA']
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.stageText}>General Information</Text>
            <Text style={styleSheet.text}>Name</Text>

            {/* 
            --------------------------------------------------------------------------------------------
            This is the spot where an observable's value is changed (as shown by the setVal function) 
            --------------------------------------------------------------------------------------------
            */}

            <Input start = {inputs.name.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.name.setVal(val)}/>
            <Text style={styleSheet.text}>Username</Text>
            <Input start = {inputs.username.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.username.setVal(val)}/>
            <Text style={styleSheet.text}>Email</Text>
            <Input start = {inputs.email.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.email.setVal(val)}/>
            <View style={styleSheet.row1}>
                <View style={styleSheet.column1}>
                    <Text style={styleSheet.text}>Gender</Text>
                    <Dropdown style={styleSheet.dropDown} data={gender}/>
                </View>
                <View style={styleSheet.column1}>
                    <Text style={styleSheet.text}>Birthday</Text>
                    <Input start = {inputs.birthday.getVal()} inputStyle = {styleSheet.inputBox1} func = {(val) => inputs.birthday.setVal(val)}></Input>
                </View>
            </View>
            <Text style={styleSheet.text}>Street Address (Optional)</Text>
            <Input start = {inputs.streetAddress.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.streetAddress.setVal(val)}/>
            <View style={styleSheet.row3}>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>City</Text>
                    <Input start = {inputs.city.getVal()} inputStyle = {styleSheet.inputBox3} func = {(val) => inputs.city.setVal(val)}></Input>
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>State</Text>
                    <Dropdown style={styleSheet.dropDown} data={state}/>
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>Zip Code</Text>
                    <Input start = {inputs.zipCode.getVal()} inputStyle = {styleSheet.inputBox3} func = {(val) => inputs.zipCode.setVal(val)}></Input>
                </View>
            </View>
        </View>
    );
  }

  const Screen2 = (props) => {
    return (
        <View style={styleSheet.content}>
            <Text style={styleSheet.stageText}>Authentication</Text>
            <Text style={styleSheet.text}>Password</Text>
            <Input start = {inputs.password.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.password.setVal(val)}/>
            <Text style={styleSheet.resetPasswordtext}>Reset Password</Text>
            <Text style={styleSheet.text}>Phone Number</Text>
            <Input start = {inputs.phoneNumber.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.phoneNumber.setVal(val)}/>
            <TouchableOpacity style={styleSheet.authenticationButton} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Enable Two-Step Authentication</Text></TouchableOpacity>
        </View>
    );
  }

  const Screen3 = (props) => {
    const state = ['PA']
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>Home Church</Text>
        <Text style={styleSheet.smallText}>This section is optional. You may skip by clicking Next.</Text>
        <Text style={styleSheet.text}>Church Name</Text>
        <Input start = {inputs.churchName.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchName.setVal(val)}/>
        <Text style={styleSheet.text}>Denomination</Text>
        <Input start = {inputs.denomination.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.denomination.setVal(val)}/>
        <Text style={styleSheet.text}>Street Address</Text>
            <Input start = {inputs.churchStreetAddress.getVal()} inputStyle = {styleSheet.inputBox} func = {(val) => inputs.churchStreetAddress.setVal(val)}/>
            <View style={styleSheet.row3}>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>City</Text>
                    <Input start = {inputs.churchCity.getVal()} inputStyle = {styleSheet.inputBox3} func = {(val) => inputs.churchCity.setVal(val)}></Input>
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>State</Text>
                    <Dropdown style={styleSheet.dropDown} data={state}/>
                </View>
                <View style={styleSheet.column2}>
                    <Text style={styleSheet.text}>Zip Code</Text>
                    <Input start = {inputs.churchZipCode.getVal()} inputStyle = {styleSheet.inputBox3} func = {(val) => inputs.churchZipCode.setVal(val)}></Input>
                </View>
            </View>
      </View>
    );
  }

  const Screen4 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>Social Media</Text>
        <Text style={styleSheet.text}>Linked Accounts</Text>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/instagramlogo.png")}></Image>
        </View>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/tiktoklogo.png")}></Image>
        </View>
        <View style={styleSheet.box}>
            <Image style={styleSheet.logo} source={require("../../../assets/facebooklogo.png")}></Image>
        </View>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Social Media Account</Text></TouchableOpacity>
      </View>
    );
  }

  const Screen5 = (props) => {
    return (
      <View style={styleSheet.content}>
        <Text style={styleSheet.stageText}>Musical Background</Text>
        <Text style={styleSheet.text}>Current Instruments</Text>
        <View style={styleSheet.box}>
            <Text style={styleSheet.text1}>Piano</Text>
        </View>
        <View style={styleSheet.box}>
        <Text style={styleSheet.text1}>Guitar</Text>
        </View>
        <View style={styleSheet.box}>
            <Text style={styleSheet.text1}>Trumpet</Text>
        </View>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Add Instrument</Text></TouchableOpacity>
        <TouchableOpacity style={styleSheet.addInstrumentButton}><Text style={styleSheet.buttonText}>+ Skilled Genre</Text></TouchableOpacity>
      </View>
    );
  }


  let myScreens = [
    <Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />, <Screen5 />
  ];

  let myTitles = [
    <Text style={styleSheet.phaseText}>Phase 1</Text>, 
    <Text style={styleSheet.phaseText}>Phase 2</Text>,
    <Text style={styleSheet.phaseText}>Phase 3</Text>,
    <Text style={styleSheet.phaseText}>Phase 4</Text>,
    <Text style={styleSheet.phaseText}>Phase 5</Text>
  ];

  let [currentIndex, setCurrentIndex] = React.useState(0);

  function limitScroll(){
    if (currentIndex < 0) {
      setCurrentIndex(myScreens.length - 1);
    }
    else if (currentIndex > myScreens.length - 1) {
      setCurrentIndex(0);
    }
  }

  // ------------------
  // Photo upload code
  // ------------------

  const [image, setImage] = React.useState(null);

  function uploadPhoto() {
    // --------------------------------
    // select photo from file selector
    // --------------------------------

    // No permissions request is necessary for launching the image library
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {

      // -------------------------------------------
      // Convert result to blob which can be stored
      // -------------------------------------------

      if (result) {
        const filePromise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.uri, true);
          xhr.send(null);
        });

        filePromise.then((fileBlob) => {

          // ----------------------------------------------------------------
          // Store result in Cloud Storage and store a reference in firebase
          // ----------------------------------------------------------------

          if (fileBlob) {
            // Get main storage
            const storage = getStorage();
      
            // Points to 'sparkData/<currentID>'
            const sparkImageRef = storageRef(storage, `userData/${userId}/userCoverPhoto`);
            uploadBytes(sparkImageRef, fileBlob).then((finalSnap) => {
              console.log("File upload was successful!");
              setImage({uri: result.uri});
            })
            .catch((error) => {
              // Upload to firebase failed so call an error or message
              console.log("failed to upload image blob to firebase");
            });
          }
        })
        .catch((error) => {
          // Conversion to blob failed so throw an error or message
          console.log("failed to convert image to blob");
        })
      }
    })
    .catch((error) => {
      // Image Picker failed so throw an error or message
      console.log("failed to find a file");
    }) 
  }

  async function getPhoto() {
    //set the url of a default photo, which will be shown in there is no image found
    let defaultPic = require("../../../assets/ProfileNavIcon.png");
    
    //get the photo from firebase storage
    const storage = getStorage();
    getDownloadURL(storageRef(storage, `userData/${userId}/userCoverPhoto`))
    .then((url) => {
      //display the image that was found using its url
      console.log("Got photo");
      setImage({uri: url});
    })
    .catch((error) => {
      // could not find a spark cover image so display the default instead
      console.log("Display default");
      setImage(defaultPic);
    })
  }

  //---------------------------------------------------------------------------
  // Section of code to put functions to be run after a component is re-rendered
  //---------------------------------------------------------------------------

  //loops the index back around on the other end when 
  limitScroll();
  updateToStart();

  //will only run on the first load
  useEffect(() => {
    getPhoto();
  }, [])

  /*------------------------------------------------*/
  /*--------------FRONT-END APP CODE ---------------*/
  /*------------------------------------------------*/

  return (
    <View style={styleSheet.MainContainer}> 
        <View style={styleSheet.topBorder}>
          <Text style={styleSheet.titleText}>Profile Creation</Text>
          <View style={styleSheet.row}>
            <TouchableOpacity style = {styleSheet.profilePictureContainer} onPress = {() => uploadPhoto()}>
              <Image style={styleSheet.profilePicImage} source={image}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <Slider currentIndex = {currentIndex} screens = {myScreens} />

        <View style={styleSheet.bottomRow}>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex - 1)}><Text style={styleSheet.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity style={styleSheet.button} onPress = {() => setCurrentIndex(currentIndex + 1)}><Text style={styleSheet.buttonText}>Next</Text></TouchableOpacity>
        </View>
    </View>
  );
  }

const styleSheet = StyleSheet.create({

    profilePictureContainer: {
        height: "66%",
        width: "35%",
        top: "50%",
        left: "10%"
    },

    profilePicImage: {
      height: "100%",
      width: "100%",
      borderRadius: 20,
    },

    text1: {
        fontSize: 18,
        fontWeight: "500",
        left: "25%",
        top: "3%"
    },

    logo: {
        height: "70%",
        width: "9%",
        left: "20%",
        top: "2%"
    }, 

    column1 : {
        flexDirection: "column",
        width: "45%",
        height: "100%"
    },

    column2 : {
        flexDirection: "column",
        width: "32%",
        height: "100%"
    },

    resetPasswordtext: {
        textAlign: "right",
        fontSize: 12,
        right: "8%",
        marginBottom: "3%"
    },

    row1: {
        flexDirection: "row",
        height: "8%",
        left: "4%",
        marginBottom: "7%"
    },

    row3: {
        flexDirection: "row",
        width: "85%",
        height: "8%",
        justifyContent: "space-evenly",
        left: "6%",
        marginBottom: "7%"
    },

    inputBox1: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        height: "100%",
        width: "95%",

    },
    
    inputBox3: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        height: "100%",
    },

    MainContainer: {
        backgroundColor: "white",
        height: "100%",
    },

    topBorder:{
        height: "30%",
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
        marginBottom: "5%"
    },

    dropDown: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        width: "85%",
        height: "100%",
        left: "7.5%",
        marginBottom: "3%"
    },

    box: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        width: "85%",
        height: "10%",
        marginBottom: "3%",
        marginTop: "3%",
        alignSelf: "center",
        flexDirection: "row",
    },

    content: {
        height: "50%",
        width: "100%"
    },

    text: {
        paddingBottom: "1%",
        fontSize: 15,
        left: "9%",
    },

    phaseText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        top: "2%",
        paddingBottom: "5%"
      },

    italicText: {
        paddingBottom: "3%",
        fontSize: 9,
        left: "9%",
        fontStyle: "italic"
    },

    stageText: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: "500",
        marginBottom: "3%"
      },

    inputBox: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        width: "85%",
        height: "8%",
        alignSelf: "center",
        marginBottom: "3%"
    },

    authenticationButton: {
        width: "85%",
        backgroundColor: "rgb(0, 97, 117)",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        height: "10%",
        marginTop: "5%",
        borderRadius: 5
      },

    inputBox2: {
        backgroundColor: "#F2905B",
        borderRadius: 10,
        width: "45%", 
        height: "100%"
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
        width: "40%",
        top: "10%",
        borderRadius: 10
    },

    bottomRow: {
        flexDirection: "row",
        alignSelf: 'center',
        alignContent: "center",
        justifyContent: "space-evenly",
        //backgroundColor: "red",
        height: "11%",
        width: '85%',
        marginTop: "2%"
    },

    row2: {
        flexDirection: "row",
        alignSelf: 'center',
        alignContent: "center",
        justifyContent: "space-between",
        height: "8%",
        width: '85%',
        marginBottom: "3%"
    },

    buttonText: {
        color: "white",
        fontSize: 12,
    },

    addInstrumentButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        width: "85%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        marginBottom: "3%"
      },

      smallText: {
        textAlign: "center",
        fontSize: 13,
        color: "gray",
        paddingBottom: "5%"
      },
    
      titleText: {
        top: "25%",
        textAlign: "center",
        fontSize: 15, 
        fontWeight: "600"
      }, 

});  

const styleSheet2 = StyleSheet.create({

    row: {
        flexDirection: "row",
        left: "57%",
    },
    topBorder:{
        height: "30%",
        width: "100%",
        backgroundColor: "rgb(219, 233, 236)",
        marginBottom: "5%"
    },
    
    profilePicture: {
        width: "50%",
        height: "70%",
    },

    button:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        height: "26%",
        width: "37%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },

    buttonText: {
        color: "white",
        fontSize: 10,
    },

    addInstrumentButton:{
        backgroundColor: "rgb(0, 97, 117)",
        marginHorizontal: "5%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "5%",
        width: "85%",
        marginTop: "5%",
        marginBottom: "3%",
        borderRadius: 10
    },

    BiographySquare: {
        alignSelf: "center",
        width: "85%",
        height: "25%",
        backgroundColor: "rgb(249, 203, 177)",
        borderRadius: 10,
        marginBottom: "3%"
      },

    profilePicture: {
        width: "50%",
        height: "70%",
    },
    smallText: {
        textAlign: "center",
        fontSize: 15,
        color: "gray",
        paddingBottom: "5%"
    }
});