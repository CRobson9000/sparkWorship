import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/login/LoginScreen.js';
import DatabaseTest from './appData/screens/test/DatabaseTest.js';
import ProfileScreen from './appData/screens/profile/ProfileScreen.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileScreen">
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
