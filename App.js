import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import statements for actual screens
import {Navigator, LoginScreen, RegistrationScreen, SparkView, SparkSummary, ProfileCreation, PSPersonal, PSPublic, SparkCreation, UserDashboard, UserHub, Messaging, ChatList, DimensionsTesting } from './appData/screens/Navigation/constants/Index.js';

//import statements for testing screens
import {Router, LocationData, ComponentTesting, FunctionalityTesting} from './appData/screens/Navigation/constants/Index.js';

//initialize the firebase application
import './config/firebase.js';

<<<<<<< HEAD
import Routes from './appData/screens/Navigation/constants/Routes.js';
=======
import * as Font from 'expo-font';

import Routes from './appData/screens/constants/Routes.js';
>>>>>>> 6c3cb0830 (Continuing Dimensions Prep)
const Stack = createNativeStackNavigator();

const getFonts = () => Font.loadAsync({
  'RNSMiles': require('./appData/fonts/RNSMiles-Black.otf')
});



function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Routes.login}>
=======
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Routes.dimensionsTesting}>
>>>>>>> 271620293 (Custom Font Setup)
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

export default App;
