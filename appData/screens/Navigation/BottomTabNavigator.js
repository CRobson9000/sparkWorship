import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginScreen, UserDashboard, HostingDashboard, SparkView, ProfileScreenIPublic, SparkCreation} from '../constants/Index';
import {Routes} from '../constants/Routes';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}
      // screenOptions={({route}) => ({
      //   headerShown: false,
      //   tabBarIcon: ({color, size, focused}) => {
      //     let iconName;
          
      //     if (route.name === Routes.login) {
      //       iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
      //     } else if (route.name === Routes.userDashboard) {
      //       iconName = focused ? 'settings' : 'settings-outline';
      //     } else if (route.name === Routes.hostingDashboard) {
      //       iconName = focused ? 'wallet' : 'wallet-outline';
      //     } else if (route.name === Routes.sparkView) {
      //       iconName = focused
      //         ? 'md-notifications-sharp'
      //         : 'md-notifications-outline';
      //     }

      //     return <Icon name={iconName} size={22} color={color} />;
      //   },
      // })}>
      >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="UserDashboard" component={UserDashboard} />
      <Tab.Screen name="SparkCreation" component={SparkCreation} />
      <Tab.Screen name="MessagingScreen" component={SparkView} />
      <Tab.Screen name="Profile" component={ProfileScreenIPublic} />
      {/* <Tab.Screen name="Hub" component={UserHub} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;