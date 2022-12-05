import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

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
export { Observable, TDO, FirebaseButler };
