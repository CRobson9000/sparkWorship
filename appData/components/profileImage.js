import React, {Component, useEffect} from 'react';
import { StyleSheet, Image, TouchableHighlight } from "react-native";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storageRef } from '../../config/additionalMethods';
import * as ImagePicker from 'expo-image-picker';
import Routes from '../screens/Navigation/constants/Routes';

// --------------
// Get image code
// --------------

class ProfileImage extends Component {
    // Prop definitions
    // size - can be either "small", "medium", or "large"
    // style - override default styles with another style sheet
    // userId - used to get the user's data
    // changeable - determines whether the photo can be click on to upload a photo

    constructor(props) {
        super(props);
        this.userId = props?.userId;

        //images are not changeable by default
        this.changeable = false;
        this.onTap = props.onTap || (() => {});

        this.style = props.style;

        this.state = {
            image: require("../../assets/ProfileNavIcon.png"),
        }

        // determine whether the user can press on the image to change it
        if (props.changeable) {
            this.changeable = props.changeable;
        }

        // set height and width variables
        if (props.size) {
            if (props.size == "small") {
                this.height = 50 
                this.width = 50
                this.borderWidth = 3
            }
            else if (props.size == "medium") {
                this.height = 85
                this.width = 85
            }
            else if (props.size == "large") {
                this.height = 110
                this.width = 110
            }
        }

        //Set the default image styles.  They can be overwritten by the style prop.  
        this.style = StyleSheet.create({ 
            profilePicture: {
                ...this.style,
                borderRadius: this.width,
                borderColor: '#F2905B',
                borderWidth: this.borderWidth || 5
            }
        });

        // set the image photo
        this.getPhoto();
    }

    getPhoto = async(id) => {
        // determine what id to use
        let idToUse;
        if (id) idToUse = id;
        else idToUse = this.userId;
        //get the photo from firebase storage
        const storage = getStorage();
        getDownloadURL(storageRef(storage, `userData/${idToUse}/userCoverPhoto`))
        .then((url) => {
            //display the image that was found using its url
            this.setState({image: {uri: url}});
        })
        .catch((error) => {
            // could not find a spark cover image so display the default instead
            this.setState({image: require("../../assets/Picture1.png")});
        })
    }

    uploadPhoto = () => {
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
                        console.log("Here");
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
                        const sparkImageRef = storageRef(storage, `userData/${this.userId}/userCoverPhoto`);
                        uploadBytes(sparkImageRef, fileBlob).then((finalSnap) => {
                            console.log("File upload was successful!");
                            this.setState({image: {uri: result.uri}});
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
                    console.log(error.message);
                })
            }
        })
        .catch((error) => {
            // Image Picker failed so throw an error or message
            console.log("failed to find a file");
        }) 
    }

    render() {
        return (
            <TouchableHighlight 
                onPress = {() => {
                    if (this.changeable) this.uploadPhoto();
                    else this.onTap();
                }}
            >
                <Image style={[this.style.profilePicture, {height: this.height, width: this.width}]} source={this.state.image} resizeMode = {'contain'}/>
            </TouchableHighlight>
        );
    }
}

export default ProfileImage;