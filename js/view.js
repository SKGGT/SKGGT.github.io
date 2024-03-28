export class CalculatorView {
    constructor() {
        this.numberElement = document.querySelector(".calculator-number-box");
        this.calculatorButtons = document.querySelector(".calculator-buttons");
    }

    updateDisplay(value) {
        this.numberElement.textContent = value;
    }

    getCalculatorButtons() {
        return this.calculatorButtons;
    }

    handleDecimalPoint(element) {
        if (this.numberElement.textContent.includes(".")) return;
        this.updateDisplay(this.numberElement.textContent + element.textContent);
    }
}