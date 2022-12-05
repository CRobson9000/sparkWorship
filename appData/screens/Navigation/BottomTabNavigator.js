import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserDashboard, SparkView, Messaging, PSPersonal, SparkCreation} from './constants/Index';
import Routes from './constants/Routes';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator( { route, navigation } ) {
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
      <Tab.Screen name={Routes.userDashboard} component={UserDashboard} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkView} component={SparkView} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkCreation} component={SparkCreation} initialParams={route.params} />
      <Tab.Screen name={Routes.messaging} component={Messaging} initialParams={route.params} />
      <Tab.Screen name={Routes.personalProfile} component={PSPersonal} initialParams={route.params} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;