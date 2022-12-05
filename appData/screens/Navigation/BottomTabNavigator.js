import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserDashboard, SparkView, UserHub, Messaging, PSPersonal, SparkCreation} from '../constants/Index';
import Routes from '../constants/Routes';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function BottomTabNavigator( { route, navigation } ) {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      headerShown: false,
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
        } else if (route.name == Routes.messaging) {
          // iconName = focused ? 'message-circle' : 'message-circle-outline';
          iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
        } else if (route.name == Routes.personalProfile) {
          iconName = focused ? 'person' : 'person-outline';
        } 
        return <Icon name={iconName} size={22} color={color} />
      },
    })}>
     
      <Tab.Screen name={Routes.userDashboard} component={UserDashboard} initialParams={route.params} />
      {/* <Tab.Screen name={Routes.sparkView} component={SparkView} initialParams={route.params} /> */}
      <Tab.Screen name={Routes.userHub} component={UserHub} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkCreation} component={SparkCreation} initialParams={route.params} />
      <Tab.Screen name={Routes.messaging} component={Messaging} initialParams={route.params} />
      <Tab.Screen name={Routes.personalProfile} component={PSPersonal} initialParams={route.params} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;