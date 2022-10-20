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
    setVal(val) {
        this.value = val;
        this.myObserver();
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
    constructor(hours, minutes, seconds, month, day, year){
        this.TDO = {
            "hours": hours,
            "minutes": minutes,
            "seconds:": seconds,
            "month": month,
            "day": day,
            "year": year
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



export { Observable, TDO };
