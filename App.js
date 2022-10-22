import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import DatabaseTest from './appData/screens/DatabaseTest.js';
import ProfileCreation from './appData/screens/profile/ProfileCreation';
import ProfileScreenIPublic from './appData/screens/profile/ProfileScreenIPublic.js';
import ProfileScreenIPersonal from './appData/screens/profile/ProfileScreenIPersonal.js';
import MyTest from './appData/screens/MyTest.js';
import SparkCreation from './appData/screens/sparkCreation/sparkCreation.js';
import UserDashboard from './appData/screens/dashboard/UserDashboard';
import HostingDashboard from './appData/screens/dashboard/HostingDashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileCreation">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
        <Stack.Screen name="ProfileScreenIPublic" component={ProfileScreenIPublic} />
        <Stack.Screen name="ProfileScreenIPersonal" component={ProfileScreenIPersonal} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
