import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List, IconButton } from 'react-native-paper';
import Routes from '../Navigation/constants/Routes';
import { FirebaseButler, PushNotify } from '../../components/classes';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storageRef } from '../../../config/additionalMethods';

export default function PSPersonal({ route, navigation }) {

    let props = route.params;

    let selectedUserId = props?.selectedUserId || null;
    let userId = props?.userId || "pgFfrUx2ryd7h7iE00fD09RAJyG3"

    const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{borderColor: "#F2905B", borderWidth: 10, width: '85%', alignSelf: "center", height: 300, top: 50, borderRadius: 10, padding: 20, flexWrap: "wrap"}}>{MyBio}</Text>
    </View>
    );


    const SecondRoute = () => {
      function instrumentRender(object) {
        return(
          <List.Accordion
          title={object.item.instrumentName}
          style = {styles.accordian}
          titleStyle = {accordianStyles.headerText}
          >   
            <View style={accordianStyles.listItemContainer}>
              <View style={accordianStyles.listItemHeader}>
                <Text style={{fontWeight: "bold", fontSize: 15}}> General Experience </Text>
              </View>
              <View style={accordianStyles.listItemContent}>
                <Text style={accordianStyles.contentText}>
                  {object.item.generalExperience}
                </Text>
              </View>
            </View>

            <View style={accordianStyles.listItemContainer}>
              <View style={accordianStyles.listItemHeader}>
                <Text style={{fontWeight: "bold", fontSize: 15}}> Worship Experience </Text>
              </View>
              <View style={accordianStyles.listItemContent}>
                <Text style={accordianStyles.contentText}>
                  {object.item.worshipExperience}
                </Text>
              </View>
            </View>

            <View style={accordianStyles.listItemContainer}>
              <View style={accordianStyles.listItemHeader}>
                <Text style={{fontWeight: "bold", fontSize: 15}}> Additional Notes </Text>
              </View>
              <View style={accordianStyles.listItemContent}>
                <Text style={accordianStyles.contentText}>
                  {object.item.additionalNotes}
                </Text>
              </View>
            </View>
            
          </List.Accordion>
        );
      }
      return(
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <List.Section title="Instruments">
              <FlatList
                data = {myInstruments}
                style = {{height: "100%", width: "100%"}}
                renderItem = {instrumentRender}
                ListFooterComponent= {() => {
                  return (
                    <View style = {{padding: 20}}>
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
                    </View>
                  )
                }}
              />
              {/* <List.Accordion style={styles.accordian} title="Guitar">
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
              </List.Accordion> */}
            </List.Section>
          </View>
      );
    }
      
    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text style={{borderColor: "#F2905B", borderWidth: 7, width: '85%', alignSelf: "center", height: 75, top: 50, borderRadius: 10, fontSize: 25, textAlign: 'center', padding: 10}}>{MyChurchName}</Text>
          <Text style={{borderColor: "#006175", borderWidth: 7, width: '75%', alignSelf: "center", height: 65, top: 50, borderRadius: 10, fontSize: 20, textAlign: 'center', padding: 10, marginTop: 20}}>{MyDenomination}</Text>
          <Text style={{borderColor: "#006175", borderWidth: 7, width: '75%', alignSelf: "center", height: 65, top: 50, borderRadius: 10, fontSize: 20, textAlign: 'center', padding: 10, marginTop: 20}}>{MyChurchLocation}</Text>
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
      
      
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Biography' },
        { key: 'second', title: 'Music' },
        { key: 'third', title: 'Church' },
        { key: 'fourth', title: 'Socials' },
    ]);
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute
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

    const [image, setImage] = React.useState(null);

    async function getPhoto() {
      //set the url of a default photo, which will be shown in there is no image found
      let defaultPic = require("../../../assets/ProfileNavIcon.png");
      
      //get the photo from firebase storage
      const storage = getStorage();
      getDownloadURL(storageRef(storage, `userData/${selectedUserId}/userCoverPhoto`))
      .then((url) => {
        //display the image that was found using its url
        setImage({uri: url});
      })
      .catch((error) => {
        // could not find a spark cover image so display the default instead
        setImage(defaultPic);
      })
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
      setName();
      setRole();
      setLocation();
      setBio();
      setChurchName();
      setDenomination();
      setChurchLocation();
      setInstruments();
      getPhoto();
    }, [])

    const openLogin = () => {navigation.navigate(Routes.login)}

    let myNotification = new PushNotify(openLogin, null);
    let title = "Test Title";
    let message = "I think that this might work for me";

    return (
      <View style={styles.MainContainer}>
          <View style={styles.topBorder}>
            <View style={[styles.row2, {justifyContent: 'space-between', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
              <TouchableOpacity onPress = {() => myNotification.scheduleNotification(null, title, message)}><Image style={{height: 40, width: 40}} source={require('../../../assets/friendicon.png')}></Image></TouchableOpacity>
              <Text style={styles.titleText}>User Profile</Text>
              <IconButton icon = "account-multiple-plus" style = {{height: 40, width: 40}} onPress = {() => addFriend()} />
            </View>
            <View style={styles.row} >
              <Image style={styles.profilePicture} source={image}></Image>
              <View style={styles.column}>
                <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 10}}>{MyName}</Text>
                <Text style={{fontSize: 15, fontWeight: '400', marginBottom: 13}}>Instrumentalist</Text>
                <View style={styles.row2}>
                  <Image style={{height: 20, width: 20}} source={require('../../../assets/locationpin.png')}></Image>
                  <Text>{MyLocation}</Text>
                </View>
              </View>
            {/* <View style={[styles.row, {marginLeft: 80, marginRight: 80, top: "30%"}]}>
              <Image style={{height: 30, width: 30}} source={require('../../../assets/filledspark.png')}></Image>
              <Image style={{height: 30, width: 30}} source={require('../../../assets/filledspark.png')}></Image>
              <Image style={{height: 30, width: 30}} source={require('../../../assets/filledspark.png')}></Image>
              <Image style={{height: 30, width: 30}} source={require('../../../assets/emptyspark.png')}></Image>
              <Image style={{height: 30, width: 30}} source={require('../../../assets/emptyspark.png')}></Image>
            </View> */}
            </View>
            <View style={styles.content}>
              <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex}/>
            </View>
          <View style={[styles.row, {marginLeft: 20, marginRight: 20, top: "30%"}]}>
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
      </View>
    );
}

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
      height: '58%'
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
      height: "120%",
      width: "36%",
      borderRadius: 20
    },

    accordian: {
      backgroundColor: '#F2905B',
      padding: 10,
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