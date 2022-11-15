import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';
import { FirebaseButler } from '../../components/classes';

export default function PSPersonal() {

  let userId = "pgFfrUx2ryd7h7iE00fD09RAJyG3";

    const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{borderColor: "#F2905B", borderWidth: 10, width: '85%', alignSelf: "center", height: 300, top: 50, borderRadius: 10}}>{MyBio}</Text>
    </View>
    );


    const SecondRoute = () => {
      function instrumentRender(object) {
        return(
          <List.Accordion
          title={object.item}
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
                  Worship Experience
                </Text>
              </View>
            </View>

            <View style={accordianStyles.listItemContainer}>
              <View style={accordianStyles.listItemHeader}>
                <Text style={{fontWeight: "bold", fontSize: 15}}> Additional Notes </Text>
              </View>
              <View style={accordianStyles.listItemContent}>
                <Text style={accordianStyles.contentText}>
                  My Content ajslkd fja;klfjioew jajsdil;fj iao;e jfoajfl ioasje fioj;ijia jo;fijaeioj  afefia;fj ioaej aoewf 
                  alsfjioe;j aioejf aioefja fioej foaefaofo;jaioajfejfoawf ijaw i;ewf iajioefj awe alkfjf;
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
                data = {[...MyInstruments]}
                style = {{height: "100%", width: "100%"}}
                renderItem = {instrumentRender}
                ListFooterComponent={
                  <>
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
                  </>
                } 
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
        { key: 'first', title: 'Bio' },
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
        style={{ backgroundColor: 'rgb(219, 233, 236)'}}
      />
    );

    const [MyName, setMyName] = React.useState("FirstName LastName");

    async function setName() {
      let name = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/name");
      setMyName(name);
    }

    const [MyRole, setMyRole] = React.useState("Instrumentalist");

    async function setRole() {
      let role = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/role");
      setMyRole(role);
    }

    const [MyLocation, setMyLocation] = React.useState("Location");

    async function setLocation() {
      let location = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/location");
      setMyLocation(location);
    }

    const [MyBio, setMyBio] = React.useState("bio");

    async function setBio() {
      let bio = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/bio");
      setMyBio(bio);
    }

    const [MyChurchName, setMyChurchName] = React.useState("Church Name");

    async function setChurchName() {
      let churchName = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/churchName");
      setMyChurchName(churchName);
    }

    const [MyDenomination, setMyDenomination] = React.useState("Denomination");

    async function setDenomination() {
      let denomination = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/denomination");
      setMyDenomination(denomination);
    }

    const [MyChurchLocation, setMyChurchLocation] = React.useState("Church Location");

    async function setChurchLocation() {
      let churchLocation = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/churchLocation");
      setMyChurchLocation(churchLocation);
    }

    const [MyInstruments, setMyInstruments] = React.useState("My Instruments");

    async function setInstruments() {
      let instruments = await FirebaseButler.fbGet("Users/pgFfrUx2ryd7h7iE00fD09RAJyG3/info/instruments");
      setMyInstruments(instruments);
      console.log(instruments);
    }

    useEffect(() => {
      setName();
      setRole();
      setLocation();
      setBio();
      setChurchName();
      setDenomination();
      setChurchLocation();
      //setInstruments();
    }, [])

      return (
        <View style={styles.MainContainer}>
            <View style={styles.topBorder}>
              <View style={[styles.row2, {justifyContent: 'space-between', marginLeft: 20, marginRight: 20, top: '16%', alignItems: 'center'}]}>
                <TouchableOpacity><Image style={{height: 40, width: 40}} source={require('../../../assets/friendicon.png')}></Image></TouchableOpacity>
                <Text style={styles.titleText}>My Profile</Text>
                <TouchableOpacity><Image style={{height: 40, width: 40}} source={require('../../../assets/editprofileicon.png')}></Image></TouchableOpacity>
              </View>
              <View style={styles.row} >
                <Image style={styles.profilePicture} source={require('../../../assets/blankprofilepic.png')}></Image>
                <View style={styles.column}>
                  <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 10}}>{MyName}</Text>
                  <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 13}}>Instrumentalist</Text>
                  <View style={styles.row2}>
                    <Image style={{height: 20, width: 20}} source={require('../../../assets/locationpin.png')}></Image>
                    <Text>{MyLocation}</Text>
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