import axios from "axios";

export class CalculatorModel {
    constructor(view) {
        this.displayNumber = 0;
        this.tempNumber = 0;
        this.operandNumber = 0;
        this.futureOperation = 0;
        this.inputtingOperand = false;
        this.view = view;
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if(this.activeUser) this.sessions = localStorage.getItem(this.activeUser.email + "Sessions");
        this.sessions = localStorage.getItem(this.activeUser.email + "Sessions");
        if(this.sessions) this.sessions = this.sessions.split(',');
        // axios
        //     .get(`/api/sessions?userId=${this.activeUser}`)
        //     .then((response) => {
        //         this.sessions = response.data;
        //         if(this.sessions) this.sessions = this.sessions.split(',');
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching sessions:', error);
        //     });

        this.activeSession = localStorage.getItem('activeSession');

        if (this.activeSession)this.setDisplayNumber(this.activeSession);
    }

    setDisplayNumber(value) {
        this.displayNumber = value;
        this.view.updateDisplay(this.displayNumber.toString());
    }

    saveSession(){
        if (this.activeUser && this.displayNumber !== 0){
            if (!this.sessions){
                this.sessions = [];
            }
            if (!this.sessions.includes(this.displayNumber)){
                this.sessions.push(this.displayNumber);
                if (this.sessions.length > 3) this.sessions.shift();
            }

            localStorage.setItem(this.activeUser.email + "Sessions", this.sessions.toString());
            // axios
            //     .post(` /api/sessions?userId=${this.activeUser.email}`, this.sessions, )
            //     .then((response) => {
            //         console.log(response);
            //     })
            //     .catch((error) => {
            //         console.error('Error fetching sessions:', error);
            //     });
        }
    }

    handleClearEntry() {
        this.saveSession();

        this.inputtingOperand = false;
        this.operandNumber = 0;
        this.setDisplayNumber(0);
        this.futureOperation = 0;
        this.view.updateDisplay(this.displayNumber.toString());
    }

    numericInput(number) {
        const inputtingOperand = this.inputtingOperand;
        const futureOperation = this.futureOperation;

        if (futureOperation !== 0 && !inputtingOperand) {
            this.inputtingOperand = true;
            this.view.updateDisplay(number);
            this.tempNumber = this.displayNumber;
        } else {
            if (this.view.displayNumber.length >= 16) return;
            if (this.view.displayNumber === "0") {
                this.view.updateDisplay(number);
            } else {
                this.view.updateDisplay(this.view.displayNumber + number);
            }
        }

        this.setDisplayNumber(parseFloat(this.view.displayNumber));
    }

    handlePercentage(){
        this.setDisplayNumber(this.displayNumber / 100);
    }

    handleBackspace() {
        const displayValue = this.view.displayNumber;
        const newDisplayValue = displayValue.slice(0, -1);
        this.view.updateDisplay(newDisplayValue || "0");
        this.setDisplayNumber(parseFloat(newDisplayValue || "0"));
    }

    handleReciprocal() {
        const displayValue = this.displayNumber;
        if (displayValue === 0) {
            this.view.updateDisplay("Cannot divide by zero");
        } else {
            this.setDisplayNumber(1 / displayValue);
        }
    }

    handleSquare() {
        this.setDisplayNumber(this.displayNumber ** 2);
    }

    handleSquareRoot() {
        this.setDisplayNumber(Math.sqrt(this.displayNumber));
    }

    handleSignChange() {
        this.setDisplayNumber(this.displayNumber * -1);
    }

    handleEvaluate() {
        if (this.inputtingOperand === false || this.futureOperation === 0) return;
        if (this.view.displayNumber.endsWith('.')) {
            this.view.updateDisplay(this.view.displayNumber.slice(0, -1));
        }

        if (this.operandNumber === 0) {
            this.operandNumber = parseFloat(this.view.displayNumber);
            this.setDisplayNumber(this.tempNumber);
        }

        switch (this.futureOperation) {
            case 1:
                this.setDisplayNumber(this.displayNumber + this.operandNumber);
                break;
            case 2:
                this.setDisplayNumber(this.displayNumber - this.operandNumber);
                break;
            case 3:
                this.setDisplayNumber(this.displayNumber * this.operandNumber);
                break;
            case 4:
                this.setDisplayNumber(this.displayNumber / this.operandNumber);
                break;
        }
    }
}
