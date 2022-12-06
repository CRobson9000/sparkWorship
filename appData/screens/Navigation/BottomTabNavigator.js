import React from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserDashboard, SparkView, Messaging, PSPersonal, SparkCreation, UserHub} from './constants/Index';
import { IconButton } from 'react-native-paper';
import Routes from './constants/Routes';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function BottomTabNavigator( { route, navigation } ) {
  return (
    <Tab.Navigator 
      screenOptions= {({route}) => ({
        headerShown: true,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          
          if (route.name == Routes.userDashboard) {
              iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name == Routes.sparkCreation) {
            iconName = focused ? 'ios-add' : 'ios-add-outline';
          } else if (route.name == Routes.userHub) {
            iconName = focused
              ? 'flash'
              : 'flash-outline';
          } else if (route.name == Routes.sparkView) {
            // iconName = focused ? 'message-circle' : 'message-circle-outline';
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name == Routes.personalProfile) {
            iconName = focused ? 'person' : 'person-outline';
          } 
          return <Icon name={iconName} size={22} color={color} />
        },
    
        header: ({navigation, route, options}) => {
          return (
            <View style = {{flexDirection: "row", padding: "10%", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(219, 233, 236)"}}>
              <Image style={{position: "absolute", height: 60, width: 220}} source={require('../../../assets/logo2.png')}/>
              <IconButton onPress = {() => navigation.navigate(Routes.chatList)}icon = "chat-processing" style = {{position: "absolute", right: "5%"}}/>
            </View>
          );
        }
      })}
    >
     
      <Tab.Screen name={Routes.userDashboard} component={UserDashboard} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkView} component={SparkView} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkCreation} component={SparkCreation} initialParams={route.params} />
      <Tab.Screen name={Routes.userHub} component={UserHub} initialParams={route.params} />
      {/* <Tab.Screen name={Routes.messaging} component={Messaging} initialParams={route.params} /> */}
      <Tab.Screen name={Routes.personalProfile} component={PSPersonal} initialParams={route.params} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;