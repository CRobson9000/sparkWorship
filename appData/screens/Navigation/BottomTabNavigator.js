import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginScreen, UserDashboard, HostingDashboard, SparkView} from '../constants/Index';
import {Routes} from '../constants/Routes';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Routes.Login" component={LoginScreen} />
      <Tab.Screen name="Routes.UserDashboard" component={UserDashboard} />
      <Tab.Screen name="Routes.HostingDashboard" component={HostingDashboard} />
      <Tab.Screen name="Routes.SparkView" component={SparkView} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;