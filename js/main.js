let displayNumber = 0;
let tempNumber = 0;
let operandNumber = 0;
let futureOperation = 0;
let inputtingOperand = false;

window.addEventListener("DOMContentLoaded", () => {
    const model = {
        number: Element,
        calculatorButtons: Element,
    }

    model.number = document.querySelector(".calculator-number-box");
    model.calculatorButtons = document.querySelector(".calculator-buttons");

    model.calculatorButtons.childNodes.forEach((button) => {
        if (button.nodeType !== 1) {
            return;
        }

        switch (button.value){
            case "0":
                button.addEventListener("click", (e) => {
                    let element = e.target;
                    if (futureOperation !== 0 && inputtingOperand === false){
                        inputtingOperand = true;
                        model.number.textContent = element.textContent;
                        tempNumber = displayNumber;
                    }
                    else{
                        if (model.number.textContent.length >= 16)return;
                        if (model.number.textContent === "0") {
                            model.number.textContent = element.textContent;
                        }
                        else model.number.textContent += element.textContent;
                    }

                    displayNumber = parseFloat(model.number.textContent);
                });
                break;
            case "1":
                button.addEventListener("click", (e) => {
                    let element = e.target;
                    inputtingOperand = false;
                    operandNumber = 0;
                    switch (element.textContent) {
                        case "+":
                            futureOperation = 1;
                            break;
                        case "-":
                            futureOperation = 2;
                            break;
                        case "x":
                            futureOperation = 3;
                            break;
                        case "÷":
                            futureOperation = 4;
                            break;
                    }
                });
                break;
            case "2":
                button.addEventListener("click", (e) => {
                    let element = e.target;
                    switch (element.textContent) {
                        case "%":
                            displayNumber = displayNumber/100;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "CE":
                            inputtingOperand = false;
                            operandNumber = 0;
                            displayNumber = 0;
                            futureOperation = 0;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "C":
                            inputtingOperand = false;
                            operandNumber = 0;
                            displayNumber = 0;
                            futureOperation = 0;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "←":
                            model.number.textContent = model.number.textContent.slice(0, -1);
                            if (model.number.textContent === "")model.number.textContent = "0";
                            displayNumber = parseFloat(model.number.textContent);
                            break;
                        case "1/x":
                            if (displayNumber === 0) {
                                model.number.textContent = "Cannot divide by zero";
                            }
                            else
                                displayNumber = 1/displayNumber;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "x²":
                            displayNumber = displayNumber**2;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "√x":
                            displayNumber = Math.sqrt(displayNumber);
                            model.number.textContent = displayNumber.toString();
                            break;
                        case "+/-":
                            displayNumber = displayNumber*-1;
                            model.number.textContent = displayNumber.toString();
                            break;
                        case ".":
                            if (model.number.textContent.includes("."))break;
                            model.number.textContent += element.textContent;
                            break;
                        case "=":
                            if (inputtingOperand === false || futureOperation === 0)break;
                            if (model.number.textContent.endsWith('.'))model.number.textContent.slice(0, -1);

                            if (operandNumber === 0) {
                                operandNumber = parseFloat(model.number.textContent);
                                displayNumber = tempNumber;
                            }
                            switch (futureOperation) {
                                case 1:
                                    displayNumber = displayNumber + operandNumber;
                                    break;
                                case 2:
                                    displayNumber = displayNumber - operandNumber;
                                    break;
                                case 3:
                                    displayNumber = displayNumber * operandNumber;
                                    break;
                                case 4:
                                    displayNumber = displayNumber / operandNumber;
                                    break;

                            }
                            model.number.textContent = displayNumber.toString();
                            break;
                    }
                });
                break;
        }
    });

});