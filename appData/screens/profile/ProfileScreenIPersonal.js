import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';
import Routes from '../Navigation/constants/Routes';
import { FirebaseButler } from '../../components/classes';
import ProfileImage from '../../components/profileImage.js';
import { profileStyles } from "../../styles/profileViewStyles.js";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { IconButton } from 'react-native-paper';
import { set } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function PSPersonal({ route, navigation }) {
    let props = route.params;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
    let userRole = props?.role || 'attendee';
    const [profileData, setProfileData] = React.useState(null);

    async function getProfileData() {
      let profileDataObject = await FirebaseButler.fbGet(`Users/${userId}`);
      setProfileData({...profileDataObject});
    }

    useEffect(() => {
      getProfileData();
    }, [])

    const MusicRoute = () => {
      function instrumentRender(object) {
        return(
          <View style={[{marginLeft: "5%", marginRight: "5%", marginTop: "5%"}]}>
            <Collapse style={{flex: 1}}>
              <CollapseHeader style = {[profileStyles.accordian, {padding: "5%"}]}>
                <Text style = {{fontSize: 15}}>{object.item.instrumentName}</Text>
                <List.Icon style = {{position: "absolute", top: "90%", right: "7%"}} color = {"gray"} icon = {"chevron-down"}/>
              </CollapseHeader>
              <CollapseBody style={[profileStyles.listItemContainer, {flex: 1}]}>
                <View style={profileStyles.listItemHeader}>
                  <Text style={[profileStyles.accordionHeaderText]}>General Experience</Text>
                </View>
                <View style={profileStyles.listItemContent}>
                  <Text style={profileStyles.contentText}>
                    {object.item.generalExperience}
                  </Text>
                </View>
                <View style={profileStyles.listItemHeader}>
                  <Text style={[profileStyles.accordionHeaderText]}>Worship Experience</Text>
                </View>
                <View style={profileStyles.listItemContent}>
                  <Text style={profileStyles.contentText}>
                    {object.item.worshipExperience}
                  </Text>
                </View>
                <View style={profileStyles.listItemHeader}>
                  <Text style={[profileStyles.accordionHeaderText]}>Additional Notes</Text>
                </View>
                <View style={profileStyles.listItemContent}>
                  <Text style={profileStyles.contentText}>
                    {object.item.additionalNotes}
                  </Text>
                </View>  
              </CollapseBody>
            </Collapse>
          </View>
        );
      }
      return( 
        <View style = {{width: "100%", height: "57%"}}>
          <FlatList
            data = {myInstruments}
            style = {{flex: 1}}
            renderItem = {instrumentRender}
          />
        </View>
      );
    }
      
    const ChurchRoute = () => (
        <View style={profileStyles.content}>
          <Image style={profileStyles.churchIcon} source={require('../../../assets/churchIcon.png')}/>
          <Text style={[profileStyles.churchText, {fontSize: height/45}]}>{MyChurchName}</Text>
          <Text style={[profileStyles.churchText, {fontSize: height/50}]}>Denomination: {MyDenomination}</Text>
          <Text style={[profileStyles.churchText, {fontSize: height/55}]}>{MyChurchLocation}</Text>
          <Text style={[profileStyles.churchText, {color: "rgb(0, 97, 117)", fontSize: height/55}]}>www.gracepoint.com</Text>
        </View>
      );

    const SocialsRoute = () => (
        <View style={profileStyles.content}>
          <View style={[profileStyles.socialsBox, {marginTop: 35}]}>
            <Image style={[profileStyles.socialsLogo, {height: 45}]} source={require('../../../assets/tiktoklogo.png')}/>
            <Text>tiktok_handle</Text>
          </View>
          <View style={profileStyles.socialsBox}>
            <Image style={profileStyles.socialsLogo} source={require('../../../assets/instagramlogo.png')}/>
            <Text>instagram_handle</Text>
          </View>
          <View style={profileStyles.socialsBox}>
            <Image style={profileStyles.socialsLogo} source={require('../../../assets/facebooklogo.png')}/>
            <Text>facebook_handle</Text>
          </View>
          <View style={profileStyles.socialsBox}>
            <Image style={[profileStyles.socialsLogo, {height: 32}]} source={require('../../../assets/twitterlogo.png')}/>
            <Text>twitter_handle</Text>
          </View>
        </View>
      );
      
      
    const [index, setIndex] = React.useState(0);
    const [attenderRoutes] = React.useState([
        { key: 'first', title: 'Church' },
        { key: 'second', title: 'Socials' },
    ]);
    
    const attenderRenderScene = SceneMap({
        first: ChurchRoute,
        second: SocialsRoute
    });

    const [instrumentalistRoutes] = React.useState([
        { key: 'first', title: 'Music' },
        { key: 'second', title: 'Church' },
        { key: 'third', title: 'Socials' },
    ]);
    
    const instrumentalistRenderScene = SceneMap({
        first: MusicRoute,
        second: ChurchRoute,
        third: SocialsRoute
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

    const [MyName, setMyName] = React.useState("Name not set");

    async function setName() {
      let name = await FirebaseButler.fbGet(`Users/${userId}/info/name`);
      if (name) {
        setMyName(name);
      }
    }

    const [MyRole, setMyRole] = React.useState("Role is not set");

    async function setRole() {
      let role = await FirebaseButler.fbGet(`Users/${userId}/role`);
      if (role) {
        setMyRole(role);
      }
    }

    const [MyLocation, setMyLocation] = React.useState("Location is not set");

    async function setLocation() {
      let state = await FirebaseButler.fbGet(`Users/${userId}/info/state`) || null;
      let city = await FirebaseButler.fbGet(`Users/${userId}/info/city`) || null;
      let zip = await FirebaseButler.fbGet(`Users/${userId}/info/zipCode`) || null;
      if (state && city && zip) {
        let locationString = `${city}, ${state} ${zip}`;
        setMyLocation(locationString);
      }
    }

    const [MyBio, setMyBio] = React.useState("Bio is not set");

    async function setBio() {
      //bio = userObj.bio;
      let bio = await FirebaseButler.fbGet(`Users/${userId}/info/bio`);
      if (bio) {
        setMyBio(bio);
      }
    }

    const [MyChurchName, setMyChurchName] = React.useState("Church Name is not set");

    async function setChurchName() {
      let churchName = await FirebaseButler.fbGet(`Users/${userId}/info/churchName`);
      if (churchName) {
        setMyChurchName(churchName);
      }
    }

    const [MyDenomination, setMyDenomination] = React.useState("Denomination is not set");

    async function setDenomination() {
      let denomination = await FirebaseButler.fbGet(`Users/${userId}/info/denomination`);
      if (denomination) {
        setMyDenomination(denomination);
      }
    }

    const [MyChurchLocation, setMyChurchLocation] = React.useState("Church Location is not set");

    async function setChurchLocation() {
      let churchState = await FirebaseButler.fbGet(`Users/${userId}/info/churchState`) || null;
      let churchCity = await FirebaseButler.fbGet(`Users/${userId}/info/churchCity`) || null;
      let churchAddress = await FirebaseButler.fbGet(`Users/${userId}/info/churchStreetAddress`) || null;
      let churchZipCode = await FirebaseButler.fbGet(`Users/${userId}/info/churchZipCode`) || null;
      if (churchState && churchCity && churchAddress && churchZipCode) {
        let locationString = `${churchAddress} ${churchCity}, ${churchState} ${churchZipCode}`;
        setMyChurchLocation(locationString);
      }
    }

    const [myInstruments, setMyInstruments] = React.useState(null);

    async function setInstruments() {
      let instruments = await FirebaseButler.fbGet(`Users/${userId}/info/instruments`);
      if (instruments) {
        setMyInstruments(() => [...instruments]);
      }
    }

    // -----------------------
    // Demo Friend Code
    // -----------------------

    async function logFriends() {
      //get current friends list, which is a list of userIds
      let friendsListObj = await FirebaseButler.fbGet(`Users/${userId}/friends`) || {};
      let friendsList = Object.values(friendsListObj);

      //populate full friends list
      let fullFriendsList = [];
      for (let friendIndex in friendsList) {
        let friendId = friendsList[friendIndex];
        let friendName = await FirebaseButler.fbGet(`Users/${friendId}/info/name`);
        fullFriendsList.push(friendName);
      }

      console.log("Friends", fullFriendsList);
    }

    useEffect(() => {
      setName();
      setRole();
      setLocation();
      setBio();
      setChurchName();
      setDenomination();
      setChurchLocation();
      setInstruments();
      //getPhoto();
    }, [])

      return (
        <View style={profileStyles.MainContainer}>
          <View style={profileStyles.topBorder}>
            <View style={profileStyles.column1}>
              <View style={[profileStyles.row2, {justifyContent: 'space-evenly', alignContent: "center"}]}>
                <ProfileImage size = "large" userId = {userId} />
              </View>
              <Text style={profileStyles.nameText}>{MyName}</Text>
              <View style={[profileStyles.row2, {alignItems: "center", alignSelf: "center"}]}>
                <Image style={{height: 20, width: 20}} source={require('../../../assets/locationpin.png')}></Image>
                <Text>   {MyLocation}</Text>
              </View>
            </View>
            <View style={[profileStyles.row2, {justifyContent: 'space-evenly', marginLeft: 30, marginRight: 30, alignItems: 'center'}]}>
              <TouchableOpacity style={profileStyles.constantButtons} onPress = {() => logFriends}>
                <Text style={profileStyles.buttonText}>Friends</Text></TouchableOpacity>
              <TouchableOpacity style={profileStyles.constantButtons} onPress = {() => navigation.navigate(Routes.profileCreation, props)}>
                <Text style={profileStyles.buttonText}>Edit Profile</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{height: "100%", width: "100%"}}>
            <TabView 
              navigationState={{ index, routes: (userRole == "attendee") ? attenderRoutes : instrumentalistRoutes}} 
              renderScene={(userRole == "attendee") ? attenderRenderScene : instrumentalistRenderScene} 
              renderTabBar={renderTabBar} 
              onIndexChange={setIndex} 
            />
          </View>
        </View>
      );
}


