import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components
import { Input } from '../../components/components.js'

//import for scrollview
import { ScrollView } from 'react-native';

// import for calendar
import { Calendar, CalendarUtils } from 'react-native-calendars';
import {StyleSheet} from 'react-native';

// import for Bottom Nav Bar
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation} from 'react-native-paper';
import HostingDashboard from './HostingDashboard';
import ProfileScreenIPersonal from '../profile/ProfileScreenIPersonal';
import RegistrationScreen from '../account/RegistrationScreen';

const HomeRoute = () => <Text>Home</Text>;

const SparkRoute = () => <Text>Sparks</Text>;

const CreateRoute = () => <Text>Create Sparks</Text>;

const MessagingRoute = () => <Text>Messages</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Hub', focusedIcon: 'album' },
    { key: 'recents', title: 'Spark+', focusedIcon: 'history' },
    { key: 'notifications', title: 'Profile', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: HomeRoute,
    albums: SparkRoute,
    recents: CreateRoute,
    notifications: MessagingRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HostingDashboard;