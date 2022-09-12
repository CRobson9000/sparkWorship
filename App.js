import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/login/LoginScreen.js';
import DatabaseTest from './appData/screens/test/DatabaseTest.js';
import LocationData from './appData/screens/LocationData.js';
// import {enableLatestRenderer} from 'react-native-maps';

// enableLatestRenderer();
import RegistrationScreen from './appData/screens/registration/RegistrationScreen.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
          <Stack.Screen name="LocationData" component={LocationData} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
