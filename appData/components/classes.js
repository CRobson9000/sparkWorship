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
        console.log("Observer", val);
    }

    unwatchedSet(val) {
        this.value = val;
    }

    getVal(){
        if (this.value) return this.value;
        else return "";
    }

    setObserver(newFunc) {
        this.myObserver = newFunc;
    }
}

export { Observable };
