import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './appData/screens/login/LoginScreen.js';
import DatabaseTest from './appData/screens/test/DatabaseTest.js';
import SparkView from './appData/screens/sparkView/sparkView.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SparkView">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DatabaseTest" component={DatabaseTest} />
          <Stack.Screen name="SparkView" component={SparkView}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
