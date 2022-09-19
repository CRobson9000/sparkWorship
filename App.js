import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import DatabaseTest from './appData/screens/DatabaseTest.js';
import SparkView from './appData/screens/sparks/sparkView.js';
import ProfileScreen from './appData/screens/profile/ProfileScreen';
import LocationData from './appData/screens/LocationData.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileScreen">
=======
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
>>>>>>> 4ebc2777550c7f5f5301d36e83ffc606bb6e3606
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LocationData" component={LocationData} />
          <Stack.Screen name="SparkView" component={SparkView}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
