import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, FlatList, SafeAreaView, Platform } from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import { TDO } from '../../components/classes.js'
import Routes from '../../screens/Navigation/constants/Routes';

// notification stuff

export default function ComponentTesting({ navigation }) {

  // methods
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  function getDaysTillSparkNotification(targetSparkTDO) {
    let daysInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Spark Date: February 
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth =  currentDate.getMonth();

    let targetDay = targetSparkTDO.getPart("day");
    let targetMonth = targetSparkTDO.getPart("month") - 1; // subtract one to get the correct index in daysInMonth (January is 0)
    
    // get the number of days from the month after the current month until the first day of the spark month
    let accumulator = currentMonth + 1;
    let runningDays = 0;
    while (accumulator != targetMonth) {
      if (accumulator == daysInMonthArray.length) {
        accumulator = 0;
      }
      runningDays += daysInMonthArray[accumulator];
      accumulator++;
    } 

    // add the number of days left in the current month to the running total
    runningDays += daysInMonthArray[currentMonth] - currentDay;
    // add the number of days from the first day of the spark month until the target spark day (targetDay) to the running total
    runningDays += targetDay + 1;
    // plus one to send a day after the spark
    return runningDays;
  }

  async function scheduleNotification() {
    let sparkTDO = new TDO(5, 30, 0, 3, 24, 2023);
    let daysUntilSpark = getDaysTillSparkNotification(sparkTDO);
    // the spark notification will send at 5:30 the day after the spark is completed
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Spark Experience",
        body: 'Its working!',
      },
      trigger: {
        seconds: 60 * 30 * 60 * 5 * 24 * daysUntilSpark,
      },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("My Token", token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  } 

  //running it
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate(Routes.login)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log("Notification", notification);
  }, [notification])

  //convert firebase obj to TDO
  return(
    <View style={styles.container}>
      <TouchableHighlight style = {styles.button} onPress = {async() => await scheduleNotification(3)}>
        <Text style={{color: "white"}}>  Send Notification </Text>
      </TouchableHighlight>
    </View>
  );
}    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: "5%",
    backgroundColor: "blue",
    borderRadius: 5
  }
})