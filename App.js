import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import Router from './appData/screens/Router.js';
import SparkView from './appData/screens/sparks/sparkView.js';
import LocationData from './appData/screens/testing/LocationData.js';
import ProfileCreation from './appData/screens/profile/ProfileCreation';
import ProfileScreenIPublic from './appData/screens/profile/ProfileScreenIPublic.js';
import ProfileScreenIPersonal from './appData/screens/profile/ProfileScreenIPersonal.js';
import MyTest from './appData/screens/MyTest.js';
import SparkCreation from './appData/screens/sparkCreation/sparkCreation.js';
import UserDashboard from './appData/screens/dashboard/UserDashboard';
import HostingDashboard from './appData/screens/dashboard/HostingDashboard';
import ComponentTesting from './appData/screens//testing/ComponentTesting.js';
import FunctionalityTesting from './appData/screens/testing/FunctionalityTesting';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileCreation">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="Router" component={Router} />
        <Stack.Screen name="ProfileScreenIPublic" component={ProfileScreenIPublic} />
        <Stack.Screen name="ProfileScreenIPersonal" component={ProfileScreenIPersonal} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreation}/>
        <Stack.Screen name="LocationData" component={LocationData} />
        <Stack.Screen name="SparkView" component={SparkView}/>
        <Stack.Screen name="Test" component={MyTest}/>
        <Stack.Screen name="SparkCreation" component={SparkCreation}/>
        <Stack.Screen name="UserDashboard" component={UserDashboard}/>
        <Stack.Screen name="HostingDashboard" component={HostingDashboard}/>
        <Stack.Screen name="ComponentTesting" component={ComponentTesting}/>
        <Stack.Screen name="FunctionalityTesting" component={FunctionalityTesting}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
