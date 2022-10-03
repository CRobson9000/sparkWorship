import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import DatabaseTest from './appData/screens/DatabaseTest.js';
import SparkView from './appData/screens/sparks/sparkView.js';
import LocationData from './appData/screens/LocationData.js';
import ProfileCreation from './appData/screens/profile/ProfileCreation'
import ProfileScreenIPublic from './appData/screens/profile/ProfileScreenIPublic.js';
import ProfileScreenIPersonal from './appData/screens/profile/ProfileScreenIPersonal.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileScreenIPublic">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
        <Stack.Screen name="ProfileScreenIPublic" component={ProfileScreenIPublic} />
        <Stack.Screen name="ProfileScreenIPersonal" component={ProfileScreenIPersonal} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreation}/>
        <Stack.Screen name="LocationData" component={LocationData} />
        <Stack.Screen name="SparkView" component={SparkView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
