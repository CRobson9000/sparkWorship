import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const profileStyles = StyleSheet.create({

  MainContainer: {
    backgroundColor: "white",
    height: "100%"
  },

  topBorder:{
    height: "40%",
    width: "100%",
    backgroundColor: "rgb(219, 233, 236)",
  },

  content: {
    height: "60%"
  },

  nameText: {
    fontSize: height/35, 
    fontWeight: '500', 
    marginBottom: "3%", 
    marginTop: "4%", 
    alignSelf: "center"
  },

  titleText: {
    alignSelf: "center", 
    fontSize: 20,
    marginTop: "5%", 
    marginBottom: "5%"
  }, 

  churchIcon: {
    alignSelf: "center",
    height: 100,
    width: 100,
    marginTop: "7%",
    marginBottom: "3%"
  },

  row2: {
    flexDirection: 'row'
  },

  text1: {
    paddingBottom: "2%",
    fontSize: 15,
    left: "9%",
  },

  // Text for information on the Church page
    churchText: {
    alignSelf: "center", 
    marginTop: "5%",
    textAlign: 'center'
  }, 

  // Text for all buttons
    buttonText: {
    color: "white",
    fontSize: 12,
  },

  // Buttons within the top border
    constantButtons:{
    backgroundColor: "rgb(0, 97, 117)",
    justifyContent: "center",
    alignItems: "center",
    height: "42%",
    width: "35%",
    marginTop: "2%",
    borderRadius: 10
  },

  boldText: {
    fontSize: 17,
    fontWeight: "500"
  },

  // Column for Profile Pictures, Name and Location
    column1: {
    flexDirection: 'column',
    marginTop: "3%"
  },

  accordian: {
    backgroundColor: '#F2905B',
    margin: "2%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: 'center'
  },

  // The orange box that holds the social media logo and the user's handle
    socialsBox: {
    backgroundColor: "#F2905B",
    borderRadius: 10,
    width: "85%",
    height: 60,
    marginBottom: "6%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: 'center'
  },

  // Formatting for the social media logos on the socials page
    socialsLogo: {
    height: 40,
    width: 40,
    marginLeft: "5%",
    marginRight: "5%"
  },

  listItemContainer: {
    backgroundColor: "white",
    backgroundColor: "#F9CBB1",
    paddingTop: "2%",
    width: "85%",
    marginLeft: "7%"
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

  // Instrument text
    headerText: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  accordionList: {
    width: "100%",
    height: "30%"
  },

  // Text for General Experience, Worship Experience, and Additional Notes
    accordionHeaderText: {
    fontSize: 15,
    fontFamily: "RNSMiles"
  }

});

export { profileStyles }