import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './appData/screens/account/LoginScreen.js';
import RegistrationScreen from './appData/screens/account/RegistrationScreen.js';
import Router from './appData/screens/Router.js';
import SparkView from './appData/screens/sparks/sparkView.js';
import LocationData from './appData/screens/LocationData.js';
import PSPublic from './appData/screens/profile/ProfileScreenIPublic.js';
import Messaging from './appData/screens/MessagingScreen';
import SparkCreation from './appData/screens/sparkCreation/sparkCreation.js';
import UserDashboard from './appData/screens/dashboard/UserDashboard';
import HostingDashboard from './appData/screens/dashboard/HostingDashboard';
import ComponentTesting from './appData/screens/ComponentTesting.js';
import SparkSummary from './appData/screens/sparkSummary/sparkSummary.js';
import PSPersonal from './appData/screens/profile/ProfileScreenIPersonal.js';
import ProfileCreation from './appData/screens/profile/ProfileCreation.js'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SparkSummary">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="Router" component={Router} />
        <Stack.Screen name="PSPersonal" component={PSPersonal} />
        <Stack.Screen name="PSPublic" component={PSPublic} />
        <Stack.Screen name='ProfileCreation' component={ProfileCreation}/>
        <Stack.Screen name="LocationData" component={LocationData} />
        <Stack.Screen name="SparkView" component={SparkView}/>
        <Stack.Screen name="Messaging" component={Messaging}/>
        <Stack.Screen name="SparkCreation" component={SparkCreation}/>
        <Stack.Screen name="userDashboard" component={UserDashboard}/>
        <Stack.Screen name="HostingDashboard" component={HostingDashboard}/>
        <Stack.Screen name="ComponentTesting" component={ComponentTesting}/>
        <Stack.Screen name="SparkSummary" component={SparkSummary}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
