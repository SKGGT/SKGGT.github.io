export class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    handleButtonClick(value, type) {
        if (type === "numeric") this.handleNumericInput(value);
        else if (type === "operation") this.handleOperationInput(value);
        else if (type === "special") this.handleSpecialInput(value);
    }

    handleNumericInput(value) {
        this.model.numericInput(value);
    }

    handleOperationInput(value) {
        this.model.inputtingOperand = false;
        this.model.operandNumber = 0;

        this.model.futureOperation = {
            "+": 1,
            "-": 2,
            "x": 3,
            "÷": 4
        }[value];
    }

    handleSpecialInput(value) {
        if (value === "%") this.model.handlePercentage();
        else if (value === "CE") this.model.handleClearEntry();
        else if (value === "C") this.model.handleClearEntry();
        else if (value === "←") this.model.handleBackspace();
        else if (value === "1/x") this.model.handleReciprocal();
        else if (value === "x²") this.model.handleSquare();
        else if (value === "√x") this.model.handleSquareRoot();
        else if (value === "±") this.model.handleSignChange();
        else if (value === ".") this.view.handleDecimalPoint();
        else if (value === "=") this.model.handleEvaluate();
    }
}
