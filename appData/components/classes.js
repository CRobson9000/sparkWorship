import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';
import React, {useRef} from 'react';

// push notification imports
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

class Observable {
    constructor(start, observer){
         //set start value of "observer"
         this.myObserver = observer;
        //set start value of "value"
        if (start) {
            this.value = start;
        } 
        else this.value = null;
    }
    setVal(val, observe = true) {
        this.value = val;
        if (observe) {
            this.myObserver();
        }
        //console.log("Observer", val);
    }

    getVal(){
        if (this.value) return this.value;
        else return "";
    }

    setObserver(newFunc) {
        this.myObserver = newFunc;
    }
}

class TDO {
    constructor(hours, minutes, seconds, month, day, year, object){
        /*if an object parameter is given when a TDO is made, it means you are converting a TDO object from firebase
        to an actual TDO object.  If that's not given, we can assume that they are giving hours, minutes, seconds, day, etc...
        */
        if (!object) {
            this.TDO = {
                "hours": hours,
                "minutes": minutes,
                "seconds:": seconds,
                "month": month,
                "day": day,
                "year": year
            }
        }
        else {
            this.TDO = object

            //convert object vals to ints from strings
            // console.log(typeof this.TDO.minutes)
            // if (typeof this.TDO.minutes == "string") {
            //     for (let time in object) {
            //         this.TDO[time] = parseInt(this.TDO[time]);
            //     }
            // }
        }
    }
    setDate(month, day, year) {
        this.month = month;
        this.day = day;
        this.year = year;
    }

    getPart(part) {
        return this.TDO[part];
    }

    getWhole() {
        return this.TDO;
    }

    getFormattedDate(){
        return `${this.TDO["month"]}/${this.TDO["day"]}/${this.TDO["year"]}`;
    }

    getFormattedDateFormal(){
       const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       return `${months[this.TDO.month - 1]} ${this.TDO.day}, 20${this.TDO.year}`
    }

    getFormattedTime(){
        let am = true;
        let hour;
        if (this.TDO.hours >= 12) {
            hour = this.TDO.hours - 12;
            am = false;
        }
        else {
            hour = this.TDO.hours;
        }
        return `${hour}:${this.TDO.minutes}${(am) ? 'AM' : 'PM'}`
    }
}

class FirebaseButler {
    static fbGet(pathRef) {
        const db = getDatabase();
        const dataRef = ref(db, pathRef);
        let dataPromise = new Promise((resolve, reject) => {
            get(dataRef).then((snapshot) => {
                if (snapshot.val()) {
                    resolve(snapshot.val());
                }
                else {
                    resolve(null);
                }
            })
        })

        return dataPromise;
    }
}

class PushNotify {
    constructor(onReceive, onSetNotification) {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            })
        });

        this.responseListener = useRef();
        this.onReceive = onReceive;
        // set listeners and responders
        // const notificationListener = useRef();
        // const responseListener = useRef();
        
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     if (onSetNotification) {
        //         onSetNotification();
        //         // Notifications.removeNotificationSubscription(notificationListener.current);
        //     }
        // });
    }

    getDaysTillSparkNotification(targetSparkTDO) {
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

    // setResponseListener(onRe) {
    //     this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log("Response", response);
    //         if (onReceive) {
    //             onReceive();
    //             Notifications.removeNotificationSubscription(responseListener.current);
    //         }
    //     });        
    // }

    // removeResponseListener() {

    // }
    
    scheduleNotification(sparkTDO, title, message) {
        // let daysUntilSpark = getDaysTillSparkNotification(sparkTDO);
        // the spark notification will send at 5:30 the day after the spark is completed
        Notifications.scheduleNotificationAsync({
            content: {
            title: title,
            body: message,
            },
            trigger: {
            seconds: 3/*60 * 30 * 60 * 5 * 24 * daysUntilSpark,*/
            },
        });

        this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if (this.onReceive) {
                this.onReceive();
                Notifications.removeNotificationSubscription(this.responseListener.current);
            }
        });
    }
      
    async registerForPushNotificationsAsync() {
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
}

export { Observable, TDO, FirebaseButler, PushNotify };
