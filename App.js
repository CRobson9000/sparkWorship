import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import DatabaseTest from './appData/screens/DatabaseTest.js';
import SparkView from './appData/screens/sparks/sparkView.js';
import ProfileScreen from './appData/screens/profile/ProfileScreen';
import LocationData from './appData/screens/LocationData.js';
import SparkCreation from './appData/screens/sparkCreation/sparkCreation.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SparkView">
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LocationData" component={LocationData} />
          <Stack.Screen name="SparkView" component={SparkView}/>
          <Stack.Screen name="SparkCreation" component={SparkCreation}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
