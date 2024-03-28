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

            const input = {
                "0": this.handleOperationInput,
                "1": this.handleNumericInput,
                "2": this.handleSpecialInput
            }[button.value];
            input(button);
        });
    }

    handleOperationInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            this.model.inputtingOperand = false;
            this.model.operandNumber = 0;

            this.model.futureOperation = {
                "+": 1,
                "-": 2,
                "x": 3,
                "÷": 4}[element.textContent];
        });
    }

    handleNumericInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;

            this.model.numericInput(element.textContent);
        });
    }

    handleSpecialInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            const specialOperations ={
                "%": this.model.handlePercentage,
                "CE": this.model.handleClearEntry,
                "C": this.model.handleClearEntry,
                "←": this.model.handleBackspace,
                "1/x": this.model.handleReciprocal,
                "x²": this.model.handleSquare,
                "√x": this.model.handleSquareRoot,
                "+/-": this.model.handleSignChange,
                ".": this.view.handleDecimalPoint,
                "=": this.model.handleEvaluate
            };
            specialOperations[element.textContent]();
        });
    }
}