export class CalculatorController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initEventListeners() {
        const buttons = this.view.getCalculatorButtons().childNodes;
        buttons.forEach((button) => {
            if (button.nodeType !== 1) return;

            switch (button.value) {
                case "0":
                    this.handleNumericInput(button);
                    break;
                case "1":
                    this.handleOperationInput(button);
                    break;
                case "2":
                    this.handleSpecialInput(button);
                    break;
            }
        });
    }

    handleNumericInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            const inputtingOperand = this.model.inputtingOperand;
            const futureOperation = this.model.futureOperation;

            if (futureOperation !== 0 && !inputtingOperand) {
                this.model.inputtingOperand = true;
                this.view.updateDisplay(element.textContent);
                this.model.tempNumber = this.model.displayNumber;
            } else {
                if (this.view.numberElement.textContent.length >= 16) return;
                if (this.view.numberElement.textContent === "0") {
                    this.view.updateDisplay(element.textContent);
                } else {
                    this.view.updateDisplay(this.view.numberElement.textContent + element.textContent);
                }
            }

            this.model.setDisplayNumber(parseFloat(this.view.numberElement.textContent));
        });
    }

    handleOperationInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            this.model.inputtingOperand = false;
            this.model.operandNumber = 0;

            switch (element.textContent) {
                case "+":
                    this.model.futureOperation = 1;
                    break;
                case "-":
                    this.model.futureOperation = 2;
                    break;
                case "x":
                    this.model.futureOperation = 3;
                    break;
                case "÷":
                    this.model.futureOperation = 4;
                    break;
            }
        });
    }

    handleSpecialInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            switch (element.textContent) {
                case "%":
                    this.handlePercentage();
                    break;
                case "CE":
                    this.handleClearEntry();
                    break;
                case "C":
                    this.handleClearAll();
                    break;
                case "←":
                    this.handleBackspace();
                    break;
                case "1/x":
                    this.handleReciprocal();
                    break;
                case "x²":
                    this.handleSquare();
                    break;
                case "√x":
                    this.handleSquareRoot();
                    break;
                case "+/-":
                    this.handleSignChange();
                    break;
                case ".":
                    this.handleDecimalPoint(element);
                    break;
                case "=":
                    this.handleEvaluate();
                    break;
            }
        });
    }

    handlePercentage() {
        this.model.setDisplayNumber(this.model.displayNumber / 100);
        this.view.updateDisplay(this.model.displayNumber.toString());
    }

    handleClearEntry() {
        this.model.inputtingOperand = false;
        this.model.operandNumber = 0;
        this.model.setDisplayNumber(0);
        this.model.futureOperation = 0;
        this.view.updateDisplay(this.model.displayNumber.toString());
    }

    handleClearAll() {
        this.handleClearEntry();
    }

    handleBackspace() {
        const displayValue = this.view.numberElement.textContent;
        const newDisplayValue = displayValue.slice(0, -1);
        this.view.updateDisplay(newDisplayValue || "0");
        this.model.setDisplayNumber(parseFloat(newDisplayValue || "0"));
    }

    handleReciprocal() {
        const displayValue = this.model.displayNumber;
        if (displayValue === 0) {
            this.view.updateDisplay("Cannot divide by zero");
        } else {
            this.model.setDisplayNumber(1 / displayValue);
            this.view.updateDisplay(this.model.displayNumber.toString());
        }
    }

    handleSquare() {
        this.model.setDisplayNumber(this.model.displayNumber ** 2);
        this.view.updateDisplay(this.model.displayNumber.toString());
    }

    handleSquareRoot() {
        this.model.setDisplayNumber(Math.sqrt(this.model.displayNumber));
        this.view.updateDisplay(this.model.displayNumber.toString());
    }

    handleSignChange() {
        this.model.setDisplayNumber(this.model.displayNumber * -1);
        this.view.updateDisplay(this.model.displayNumber.toString());
    }

    handleDecimalPoint(element) {
        if (this.view.numberElement.textContent.includes(".")) return;
        this.view.updateDisplay(this.view.numberElement.textContent + element.textContent);
    }

    handleEvaluate() {
        if (this.model.inputtingOperand === false || this.model.futureOperation === 0) return;
        if (this.view.numberElement.textContent.endsWith('.')) {
            this.view.updateDisplay(this.view.numberElement.textContent.slice(0, -1));
        }

        if (this.model.operandNumber === 0) {
            this.model.operandNumber = parseFloat(this.view.numberElement.textContent);
            this.model.setDisplayNumber(this.model.tempNumber);
        }

        switch (this.model.futureOperation) {
            case 1:
                this.model.setDisplayNumber(this.model.displayNumber + this.model.operandNumber);
                break;
            case 2:
                this.model.setDisplayNumber(this.model.displayNumber - this.model.operandNumber);
                break;
            case 3:
                this.model.setDisplayNumber(this.model.displayNumber * this.model.operandNumber);
                break;
            case 4:
                this.model.setDisplayNumber(this.model.displayNumber / this.model.operandNumber);
                break;
        }

        this.view.updateDisplay(this.model.displayNumber.toString());
    }
}