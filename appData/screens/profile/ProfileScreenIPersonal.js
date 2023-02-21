import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';
import Routes from '../Navigation/constants/Routes';
import { FirebaseButler } from '../../components/classes';
import ProfileImage from '../../components/profileImage.js';
import { profileStyles } from "../../styles/profileViewStyles.js";

import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function PSPersonal({ route, navigation }) {
    let props = route.params;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
 
    const SparkRoute = () => (
    <ScrollView style={profileStyles.content}>
      <Text style={profileStyles.titleText}>Spark History</Text>
      <View style={[profileStyles.row2, {alignItems: "center", alignSelf: "center"}]}>
        <Text style={{fontSize: 18, marginRight: "5%"}}>324 sparks</Text>
        <Text style={{fontSize: 20}}>-</Text>
        <Image style={{height: 35, width: 35, marginLeft: "5%"}} source={require('../../../assets/filledspark.png')}/>
        <Image style={{height: 35, width: 35}} source={require('../../../assets/filledspark.png')}/>
        <Image style={{height: 35, width: 35}} source={require('../../../assets/filledspark.png')}/>
        <Image style={{height: 35, width: 35}} source={require('../../../assets/emptyspark.png')}/>
        <Image style={{height: 35, width: 35}} source={require('../../../assets/emptyspark.png')}/>
      </View>
      <Text style={profileStyles.titleText}>Upcoming Sparks</Text>
      <List.Accordion 
        title="Leading"
        style={[profileStyles.accordian, {marginBottom: "3%"}]}
        titleStyle = {profileStyles.headerText}>
      </List.Accordion>
      <List.Accordion 
        title="Playing"
        style={[profileStyles.accordian, {marginBottom: "3%"}]}
        titleStyle = {profileStyles.headerText}>
      </List.Accordion>
      <List.Accordion 
        title="Attending"
        style={profileStyles.accordian}
        titleStyle = {profileStyles.headerText}>
      </List.Accordion>
    </ScrollView>
    );


    const MusicRoute = () => {
      function instrumentRender(object) {
        return(
          <List.Accordion
          title={object.item.instrumentName}
          style = {profileStyles.accordian}
          titleStyle = {profileStyles.headerText}
          >   
            <View style={profileStyles.listItemContainer}>
              <View style={profileStyles.listItemHeader}>
                <Text style={[profileStyles.accordionHeaderText]}> General Experience </Text>
              </View>
              <View style={profileStyles.listItemContent}>
                <Text style={profileStyles.contentText}>
                  {object.item.generalExperience}
                </Text>
              </View>
            </View>

            <View style={profileStyles.listItemContainer}>
              <View style={profileStyles.listItemHeader}>
                <Text style={[profileStyles.accordionHeaderText]}> Worship Experience </Text>
              </View>
              <View style={profileStyles.listItemContent}>
                <Text style={profileStyles.contentText}>
                  {object.item.worshipExperience}
                </Text>
              </View>
            </View>

            <View style={[profileStyles.listItemContainer, {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
              <View style={profileStyles.listItemHeader}>
                <Text style={[profileStyles.accordionHeaderText]}> Additional Notes </Text>
              </View>
              <View style={profileStyles.listItemContent}>
                <Text style={profileStyles.contentText}>
                  {object.item.additionalNotes}
                </Text>
              </View>
            </View>
            
          </List.Accordion>
        );
      }
      return( 
        < ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
            <List.Section title="Instruments">
              <FlatList
                data = {myInstruments}
                style = {{height: "100%", width: "100%"}}
                renderItem = {instrumentRender}/>
            </List.Section>
          </ScrollView>
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
    const [routes] = React.useState([
        { key: 'first', title: 'Sparks' },
        { key: 'second', title: 'Music' },
        { key: 'third', title: 'Church' },
        { key: 'fourth', title: 'Socials' },
    ]);
    
    const renderScene = SceneMap({
        first: SparkRoute,
        second: MusicRoute,
        third: ChurchRoute,
        fourth: SocialsRoute
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
      let location = await FirebaseButler.fbGet(`Users/${userId}/info/location`);
      if (location) {
        setMyLocation(location);
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
      let churchLocation = await FirebaseButler.fbGet(`Users/${userId}/info/churchStreetAddress`);
      if (churchLocation) {
        setMyChurchLocation(churchLocation);
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
            <View style={profileStyles.content}>
              <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex}/>
            </View>
        </View>
      );
}

