import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/login/LoginScreen.js';
import DatabaseTest from './appData/screens/test/DatabaseTest.js';
import ProfileScreen from './appData/screens/profile/ProfileScreen';
import LocationData from './appData/screens/LocationData.js';
import RegistrationScreen from './appData/screens/registration/RegistrationScreen.js';

// import {enableLatestRenderer} from 'react-native-maps';
// enableLatestRenderer();

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LocationData">
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LocationData" component={LocationData} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
