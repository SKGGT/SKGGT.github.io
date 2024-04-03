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
        if(this.sessions) this.sessions = this.sessions.split(',');
        this.activeSession = localStorage.getItem('activeSession');

        if (this.activeSession)this.setDisplayNumber(this.activeSession);
    }

    setDisplayNumber(value) {
        this.displayNumber = value;
        this.view.updateDisplay(this.displayNumber.toString());
    }

    handleClearEntry() {
        if (this.activeUser && this.displayNumber !== 0){
            if (!this.sessions){
                this.sessions = [];
            }
            if (!this.sessions.includes(this.displayNumber)){
                this.sessions.push(this.displayNumber);
                if (this.sessions.length > 3) this.sessions.shift();
            }

            localStorage.setItem(this.activeUser.email + "Sessions", this.sessions.toString());
        }

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
            if (this.view.numberElement.textContent.length >= 16) return;
            if (this.view.numberElement.textContent === "0") {
                this.view.updateDisplay(number);
            } else {
                this.view.updateDisplay(this.view.numberElement.textContent + number);
            }
        }

        this.setDisplayNumber(parseFloat(this.view.numberElement.textContent));
    }

    handlePercentage(){
        this.setDisplayNumber(this.displayNumber / 100);
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
    }
}

export class ProfileModel {
    constructor(view) {
        this.view = view;
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (!this.activeUser)return;
        this.sessions = localStorage.getItem(this.activeUser.email + "Sessions");
        if (this.sessions) this.sessions = this.sessions.split(',');

        if (this.activeUser){
            this.view.hideProfileAlert();
            this.view.updateUserName(this.activeUser.name)
        }
        else{
            this.view.showProfileAlert();
        }

        if (this.sessions){
            for (let i = 0; i < this.sessions.length; i++) {
                this.view.addSession(this.sessions[this.sessions.length - i - 1], i + 1);
            }
        }
    }

    handleSessionClick(session) {
        localStorage.setItem('activeSession', session);
    }
}

export class SignInModel {
    constructor(view) {
        this.view = view;
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (!this.activeUser){
            this.view.hideSignOutButton();
        }
        else {
            this.view.showSignOutButton();
        }
    }

    handleSignIn() {
        const email = this.view.emailElement.value;
        const password = this.view.passwordElement.value;

        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            localStorage.setItem('activeUser', JSON.stringify(user));
            this.view.showSignOutButton();
            this.view.sendAlert('Sign in successful!');
        } else {
            this.view.sendAlert('Invalid email or password.');
        }
        this.view.signInForm.reset();
    }

    handleSignOut() {
        localStorage.removeItem('activeUser');
        this.view.sendAlert('Sign out successful!');
        this.view.hideSignOutButton();
    }
}

export class SignUpModel {
    constructor(view) {
        this.view = view;
    }

    handleSignUp() {
        const name = this.view.nameElement.value;
        const email = this.view.emailElement.value;
        const isMale = this.view.isMaleElement.checked;
        const isFemale = this.view.isFemaleElement.checked;
        const DoB = this.view.DoBElement.value;
        const password = this.view.passwordElement.value;

        if (!name || !email || !DoB || !password || !(isMale || isFemale)) {
            this.view.sendAlert('All fields are required!');
            this.view.signUpForm.reset();
            return;
        }

        if (localStorage.getItem(email)) {
            this.view.sendAlert('User with this email already exists!');
            return;
        }

        const user = {name, email, isMale, DoB, password};
        localStorage.setItem(email, JSON.stringify(user));
        localStorage.setItem('activeUser', JSON.stringify(user));
        this.view.sendAlert('Sign up successful!');
        this.view.signUpForm.reset();
    }
}