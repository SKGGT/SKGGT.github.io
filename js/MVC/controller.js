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

            if (button.value === "0") this.handleNumericInput(button);
            else if (button.value === "1") this.handleOperationInput(button);
            else if (button.value === "2") this.handleSpecialInput(button);
        });
    }

    handleOperationInput(button) {
        button.addEventListener("click", (e) => {
            const element = e.target;
            this.model.inputtingOperand = false;
            this.model.operandNumber = 0;

            console.log("operation input")

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

            if (element.textContent === "%") this.model.handlePercentage();
            else if (element.textContent === "CE") this.model.handleClearEntry();
            else if (element.textContent === "C") this.model.handleClearEntry();
            else if (element.textContent === "←") this.model.handleBackspace();
            else if (element.textContent === "1/x") this.model.handleReciprocal();
            else if (element.textContent === "x²") this.model.handleSquare();
            else if (element.textContent === "√x") this.model.handleSquareRoot();
            else if (element.textContent === "±") this.model.handleSignChange();
            else if (element.textContent === ".") this.view.handleDecimalPoint(element);
            else if (element.textContent === "=") this.model.handleEvaluate();

        });
    }
}

export class ProfileController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initEventListeners() {
        this.view.profileAlert.addEventListener('click', () => {
            this.model.hideProfileAlert();
        });

        this.view.sessionsTable.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'BUTTON') {
                this.model.handleSessionClick(target.textContent);
                window.location.href = "../index.html";
            }
        });
    }
}

export class SignInController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initEventListeners() {
        this.view.signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.model.handleSignIn();
        });

        this.view.button.addEventListener('click', () => {
            this.model.handleSignOut();
        });
    }
}

export class SignUpController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initEventListeners() {
        this.view.signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.model.handleSignUp();
        });
    }
}
