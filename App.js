import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import statements for actual screens
import {Navigator, LoginScreen, RegistrationScreen, SparkView, SparkSummary, ProfileCreation, PSPersonal, PSPublic, SparkCreation, UserDashboard, UserHub, Messaging, ChatList, DimensionsTesting, SparkSurvey } from './appData/screens/Navigation/constants/Index.js';

//import statements for testing screens
import {Router, LocationData, ComponentTesting, FunctionalityTesting} from './appData/screens/Navigation/constants/Index.js';
import React, {useState} from 'react';

//initialize the firebase application
import './config/firebase.js';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Routes from './appData/screens/Navigation/constants/Routes.js';
const Stack = createNativeStackNavigator();

const getFonts = () => Font.loadAsync({
  'RNSMiles': require('./appData/fonts/RNSMiles-Black.otf')
});

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Routes.registration}>
          {/* Actual Screens used in our app */}
          <Stack.Screen name={Routes.login} component={LoginScreen} />
          <Stack.Screen name={Routes.registration} component={RegistrationScreen} />
          <Stack.Screen name={Routes.publicProfile} component={PSPublic} />
          <Stack.Screen name={Routes.personalProfile} component={PSPersonal} />
          <Stack.Screen name={Routes.profileCreation} component={ProfileCreation}/>
          <Stack.Screen name={Routes.sparkView} component={SparkView}/>
          <Stack.Screen name={Routes.sparkCreation} component={SparkCreation}/>
          <Stack.Screen name={Routes.userDashboard} component={UserDashboard}/>
          <Stack.Screen name={Routes.userHub} component={UserHub} />
          <Stack.Screen name={Routes.messaging} component={Messaging} />
          <Stack.Screen name={Routes.chatList} component={ChatList}/>
          <Stack.Screen name={Routes.sparkSummary} options={{ unmountOnBlur: true }} component={SparkSummary} />
          <Stack.Screen name={Routes.sparkSurvey} options={{ unmountOnBlur: true }} component={SparkSurvey} />        
          <Stack.Screen name="Navigator" component={Navigator} options={{headerShown: false}} />

          {/* Screens for Testing Purposes */}
          {/* <Stack.Screen name="HostingDashboard" component={HostingDashboard}/> */}
          <Stack.Screen name={Routes.router} component={Router} />
          <Stack.Screen name={Routes.componentTesting} component={ComponentTesting}/>
          <Stack.Screen name={Routes.dimensionsTesting} component={DimensionsTesting}/>
          <Stack.Screen name={Routes.functionalityTesting} component={FunctionalityTesting}/>
          <Stack.Screen name={Routes.locationData} component={LocationData} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
        onError={() => console.log('error')}
      />
    )
  }
}

export default App;
