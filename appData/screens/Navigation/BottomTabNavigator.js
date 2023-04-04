import React from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserDashboard, SparkView, Messaging, PSPersonal, SparkCreation, UserHub} from './constants/Index';
import { IconButton } from 'react-native-paper';
import Routes from './constants/Routes';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function BottomTabNavigator( { route, navigation } ) {
  let props = route?.params;
  let role = props.role || 'attendee'
  return (
    <Tab.Navigator 
      screenOptions= {({route}) => ({
        headerStyle: {
          flexDirection: "row", 
          paddingTop: "25%",
          width: "100%",
          justifyContent: "center", 
          alignItems: "flex-end", 
          backgroundColor: "rgb(219, 233, 236)"
        },
        headerShown: true,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          
          if (route.name == Routes.userDashboard) {
              iconName = focused ? 'md-home' : 'md-home';
          } else if (route.name == Routes.sparkCreation) {
            iconName = focused ? 'add-circle' : 'add-circle';
          } else if (route.name == Routes.userHub) {
            iconName = focused
              ? 'md-flash'
              : 'md-flash';
          } else if (route.name == Routes.sparkView) {
            // iconName = focused ? 'message-circle' : 'message-circle-outline';
            iconName = focused ? 'md-flame' : 'md-flame';
          } else if (route.name == Routes.personalProfile) {
            iconName = focused ? 'md-person' : 'md-person';
          } 
          return <Icon name={iconName} size={22} color={color} />
        },
    
        header: ({navigation, route, options}) => {
          function logout() {
            navigation.reset({
                index: 0,
                routes: [{name: Routes.login}],
            });
            navigation.navigate(Routes.login);
          }

          return (
            <View style = {[options.headerStyle]}>
              <Image style={{position: "absolute", height: 70, width: 220, left: "2%"}} source={require('../../../assets/logo2.png')}/>
              {/* <FeatherIcon icon="message-circle" size="24" style = {{position: "absolute", right: "5%"}} /> */}
              <IconButton onPress = {() => logout()}
              icon = "logout" style = {{position: "absolute", right: "1%"}}/>

              <IconButton onPress = {() => navigation.navigate(Routes.chatList, route.params)}
                icon = "message-outline" style = {{position: "absolute", right: "18%"}}/>

              <IconButton onPress = {() => navigation.navigate(Routes.chatList, route.params)}
              icon = "feature-search-outline" style = {{position: "absolute", right: "9%"}}/>
              </View>
            // iconName = focused ? 'ios-chatbubble-outline' : 'ios-chatbubble-outline';
          );
        }
      })}
    >
      <Tab.Screen name={Routes.userDashboard} component={UserDashboard} options={{ unmountOnBlur: true }} initialParams={route.params} />
      <Tab.Screen name={Routes.sparkView} component={SparkView} options={{ unmountOnBlur: true }} initialParams={route.params} />
      {
        role != 'attendee' &&
        <Tab.Screen 
        name={Routes.sparkCreation} 
        component={SparkCreation} 
        options={{ tabBarStyle: { display: "none" }, headerShown: false, unmountOnBlur: true }}
         initialParams={route.params} />
      }
      <Tab.Screen name={Routes.userHub} component={UserHub} options={{ unmountOnBlur: true }} initialParams={route.params} />
      <Tab.Screen name={Routes.personalProfile} component={PSPersonal} options={{ unmountOnBlur: true }} initialParams={route.params} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;