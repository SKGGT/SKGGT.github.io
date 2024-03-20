export class CalculatorModel {
    constructor() {
        this.displayNumber = 0;
        this.tempNumber = 0;
        this.operandNumber = 0;
        this.futureOperation = 0;
        this.inputtingOperand = false;
    }

    setDisplayNumber(value) {
        this.displayNumber = value;
    }

    getDisplayNumber() {
        return this.displayNumber;
    }
}