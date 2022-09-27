class Observable {
    constructor(start, observer){
        //set start value of "value"
        if (start) this.value = start;
        else this.value = null;
        //set start value of "observer"
        this.myObserver = observer;
    }
    setVal(val) {
        this.value = val;
        this.myObserver();
    }

    getVal(){
        return this.value;
    }

    setObserver(newFunc) {
        this.myObserver = newFunc;
    }
}

export { Observable };
