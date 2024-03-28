export class CalculatorModel {
    constructor(view) {
        this.displayNumber = 0;
        this.tempNumber = 0;
        this.operandNumber = 0;
        this.futureOperation = 0;
        this.inputtingOperand = false;
        this.view = view;
    }

    setDisplayNumber(value) {
        this.displayNumber = value;
    }

    getDisplayNumber() {
        return this.displayNumber;
    }

    handleClearEntry() {
        this.inputtingOperand = false;
        this.operandNumber = 0;
        this.setDisplayNumber(0);
        this.futureOperation = 0;
        this.view.updateDisplay(this.displayNumber.toString());
    }

    numericInput(element) {
        const inputtingOperand = this.inputtingOperand;
        const futureOperation = this.futureOperation;

        if (futureOperation !== 0 && !inputtingOperand) {
            this.inputtingOperand = true;
            this.view.updateDisplay(element.textContent);
            this.tempNumber = this.displayNumber;
        } else {
            if (this.view.numberElement.textContent.length >= 16) return;
            if (this.view.numberElement.textContent === "0") {
                this.view.updateDisplay(element.textContent);
            } else {
                this.view.updateDisplay(this.view.numberElement.textContent + element.textContent);
            }
        }

        this.setDisplayNumber(parseFloat(this.view.numberElement.textContent));
    }

    handlePercentage(){
        this.setDisplayNumber(this.displayNumber / 100);
        this.view.updateDisplay(this.displayNumber.toString());
    }

    handleBackspace() {
        const displayValue = this.view.numberElement.textContent;
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
            this.view.updateDisplay(this.displayNumber.toString());
        }
    }

    handleSquare() {
        this.setDisplayNumber(this.displayNumber ** 2);
        this.view.updateDisplay(this.displayNumber.toString());
    }

    handleSquareRoot() {
        this.setDisplayNumber(Math.sqrt(this.displayNumber));
        this.view.updateDisplay(this.displayNumber.toString());
    }

    handleSignChange() {
        this.setDisplayNumber(this.displayNumber * -1);
        this.view.updateDisplay(this.displayNumber.toString());
    }

    handleEvaluate() {
        if (this.inputtingOperand === false || this.futureOperation === 0) return;
        if (this.view.numberElement.textContent.endsWith('.')) {
            this.view.updateDisplay(this.view.numberElement.textContent.slice(0, -1));
        }

        if (this.operandNumber === 0) {
            this.operandNumber = parseFloat(this.view.numberElement.textContent);
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

        this.view.updateDisplay(this.displayNumber.toString());
    }
}