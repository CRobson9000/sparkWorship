import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List, IconButton } from 'react-native-paper';
import Routes from '../Navigation/constants/Routes';
import { FirebaseButler, PushNotify } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storageRef } from '../../../config/additionalMethods';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import ProfileImage from '../../components/profileImage.js';
import { profileStyles } from '../../styles/profileViewStyles';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function PSPersonal({ route, navigation }) {
    let props = route.params;
    let selectedUserId = props?.selectedUserId || null;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3";
    const [selectedUserRole, setSelectedUserRole] = React.useState(null);
    const [profileData, setProfileData] = React.useState(null);

    async function getProfileData() {
      let profileDataObject = await FirebaseButler.fbGet(`Users/${userId}`);
      setProfileData({...profileDataObject});
    }

    useEffect(() => {
      getProfileData();
    }, [])

    const SparkRoute = () => {      
      const [sparksWithTypes, setSparksWithTypes] = React.useState([]);
      async function setupSparks()
      {
        let startSparks = profileData?.['sparks'];
        let finalSparks = [
          {
            type: "Playing",
            sparks: []
          }, 
          {
            type: "Attending",
            sparks: []
          }
        ];  

        let playingSparks = Object.values(startSparks?.playing || []);
        for (let id of playingSparks) {
          let leaderId = await FirebaseButler.fbGet(`Sparks/${id}/roles/spark_leader`);
          let name = await FirebaseButler.fbGet(`Sparks/${id}/info/name`);
          finalSparks[0].sparks.push({name, leaderId, id})
        }

        let attendingSparks = Object.values(startSparks?.attending || []);
        for (let id in attendingSparks) {
          let leaderId = await FirebaseButler.fbGet(`Sparks/${id}/roles/spark_leader`);
          let name = await FirebaseButler.fbGet(`Sparks/${id}/info/name`);
          finalSparks[1].sparks.push({name, leaderId, id})
        }

        setSparksWithTypes([...finalSparks]);
      }
      useEffect(() => {
        setupSparks();
      }, [])

      const renderSparkType = (object) => {
        return (
          <View style={[{margin: "5%"}]}>
            <Collapse style={{flex: 1}}>
              <CollapseHeader style = {[accordianStyles.accordian, {padding: "5%"}]}>
                <Text style = {{fontSize: 15}}>{object.item.type}</Text>
                <List.Icon style = {{position: "absolute", top: "90%", right: "10%"}} color = {"gray"} icon = {"chevron-down"}/>
                {/* <Text style={{color:"white", fontSize:20, paddingVertical:"2%"}}>Key: {object.item.key}</Text> */}
              </CollapseHeader>
              <CollapseBody style={[accordianStyles.listItemContainer, {flex: 1}]}>
                {
                  object.item.sparks.length != 0 && 
                  <FlatList
                    data = {object.item.sparks}
                    style = {{flex: 1}}
                    renderItem = {renderSpark} 
                  />
                }
                {
                  object.item.sparks.length == 0 && 
                  <View style = {{padding: "5%", alignItems: "center", justifyContent: "center"}}>
                    <Text>{`This user is not ${(object.item.type == "Attending") ? 'attending' : 'playing for'} any sparks`}</Text>
                  </View>
                }
              </CollapseBody>
            </Collapse>
          </View>
        );
      }
      const renderSpark = (object) => {
        let item = object.item;
        return (
          //Date Time string formatting
          // let sparkTimeObj = item.info?.times?.spark.TDO;
          // let sparkTDO = new TDO(0, 0, 0, 0, 0, 0, sparkTimeObj);
          // let finalTime = sparkTDO.getFormattedTime();
          // let finalDate = sparkTDO.getFormattedDateFormal();
          // let finalDateTime = `Starting at ${finalTime} on ${finalDate}`; 

          //Location formatting
          // let locationObj = item.info.location;
          // let locationString = `${locationObj?.address} ${locationObj?.city}, ${locationObj?.state} ${locationObj?.zip}`;
          
          <TouchableOpacity 
            onPress = {() => navigation.navigate(Routes.sparkSummary, {...props, currentSparkId: item.id})} 
            style={[sparkViewStyles.boxOne]}
          >
            <ProfileImage userId = {item.leaderId} size = {"medium"}/>
            <Text style={sparkViewStyles.boxText}> {item.name} </Text>
            <Text style={{left: "30%"}}> More</Text>
          </TouchableOpacity> 
        );            
      }
      return (
        <View style={profileStyles.content}>
          <View style = {{height: "40%", width: "100%"}}>
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
          </View>
          <View style = {{flex: 1}}>
            <FlatList
              data = {sparksWithTypes}
              style = {{flex: 1}}
              renderItem = {renderSparkType}
            />
          </View>
        </View>
      );
    }
  
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

            <View style={profileStyles.listItemContainer}>
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
        <List.Section title="Instruments">
          <FlatList
            data = {myInstruments}
            style = {{height: "100%", width: "100%"}}
            renderItem = {instrumentRender}/>
        </List.Section>
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
      { key: 'first', title: 'Sparks' },
      { key: 'second', title: 'Music' },
      { key: 'third', title: 'Church' },
      { key: 'fourth', title: 'Socials' },
    ]);
    
    const instrumentalistRenderScene = SceneMap({
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

    async function setupSelectedUserRole() {
      let currentRole = await FirebaseButler.fbGet(`Users/${selectedUserId}/role`);
      setSelectedUserRole(currentRole);
    }

    const [MyName, setMyName] = React.useState("Name not set");

    async function setName() {
      let name = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/name`);
      if (name) {
        setMyName(name);
      }
    }

    const [MyRole, setMyRole] = React.useState("Role is not set");

    async function setRole() {
      let role = await FirebaseButler.fbGet(`Users/${selectedUserId}/role`);
      if (role) {
        setMyRole(role);
      }
    }

    const [MyLocation, setMyLocation] = React.useState("Location is not set");

    async function setLocation() {
      let location = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/location`);
      if (location) {
        setMyLocation(location);
      }
    }

    const [MyBio, setMyBio] = React.useState("Bio is not set");

    async function setBio() {
      //bio = userObj.bio;
      let bio = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/bio`);
      if (bio) {
        setMyBio(bio);
      }
    }

    const [MyChurchName, setMyChurchName] = React.useState("Church Name is not set");

    async function setChurchName() {
      let churchName = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/churchName`);
      if (churchName) {
        setMyChurchName(churchName);
      }
    }

    const [MyDenomination, setMyDenomination] = React.useState("Denomination is not set");

    async function setDenomination() {
      let denomination = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/denomination`);
      if (denomination) {
        setMyDenomination(denomination);
      }
    }

    const [MyChurchLocation, setMyChurchLocation] = React.useState("Church Location is not set");

    async function setChurchLocation() {
      let churchLocation = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/churchStreetAddress`);
      if (churchLocation) {
        setMyChurchLocation(churchLocation);
      }
    }

    const [myInstruments, setMyInstruments] = React.useState(null);

    async function setInstruments() {
      let instruments = await FirebaseButler.fbGet(`Users/${selectedUserId}/info/instruments`);
      if (instruments) {
        setMyInstruments(() => [...instruments]);
      }
    }

    // ------------
    // Friend Code
    // ------------

    async function addFriend() {
      //get current friends
      let friendsListObj = await FirebaseButler.fbGet(`Users/${userId}/friends`) || {};
      let friendsList = Object.values(friendsListObj);
      
      // only push if they are not currently a friend
      if (!friendsList.includes(selectedUserId)) {
        friendsList.push(selectedUserId);

        //update firebase with new friend
        const db = getDatabase();
        const friendsRef = ref(db, `Users/${userId}/friends`);
        set(friendsRef, friendsList);
        
        console.log("Friend Added!");
      }
      else {
        console.log("Already a friend!");
      }
    }

    useEffect(() => {
      setupSelectedUserRole();
      setName();
      setRole();
      setLocation();
      setBio();
      setChurchName();
      setDenomination();
      setChurchLocation();
      setInstruments();
    }, [])

    return (
      <View style={profileStyles.MainContainer}>
        <View style={[profileStyles.topBorder, {paddingTop: "15%"}]}>
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
            <TouchableOpacity style={profileStyles.constantButtons} onPress = {() => logFriends}><Text style={profileStyles.buttonText}>Friends</Text></TouchableOpacity>
            <Image style={{height: 40, width:40}} source={require('../../../assets/addFriendIcon.png')}/>
            <TouchableOpacity style={profileStyles.constantButtons}><Text style={profileStyles.buttonText}>Message</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{height: "100%", width: "100%"}}>
          <TabView 
              navigationState={{ index, routes: (selectedUserRole == "attendee") ? attenderRoutes : instrumentalistRoutes}} 
              renderScene={(selectedUserRole == "attendee") ? attenderRenderScene : instrumentalistRenderScene} 
              renderTabBar={renderTabBar} 
              onIndexChange={setIndex} 
          />
        </View>
      </View>
    );
}

// Note: I'll remove this when I (Colin) pull the accordian views out into their own components!
const accordianStyles = StyleSheet.create({
  accordian: {
    backgroundColor: '#F2905B',
    margin: "2%",
    marginBottom: 0,
    borderRadius: 10 
  },
  listItemContainer: {
    backgroundColor: "white",
    backgroundColor: "#F9CBB1",
    paddingBottom: "2%",
    width: "85%",
    marginLeft: "7%"
  }
})

// Note this will be removed when I (Colin) pull the sparks out into their own component
const sparkViewStyles = StyleSheet.create({
  boxOne:
  {
    backgroundColor: "#DBE9EC",
    padding: "3%",
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%"
  },
  boxText:{
    padding: "5%",
    fontSize: height/70,
    fontFamily: "RNSMiles",
    fontWeight: "bold"
  }
});
