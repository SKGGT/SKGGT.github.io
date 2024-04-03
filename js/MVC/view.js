
class View {
    sendAlert(str){
        alert(str);
    }
}

export class CalculatorView extends View{
    constructor() {
        super();
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

export class ProfileView extends View{
    constructor(){
        super();
        this.userNameElement = document.getElementById('userNameDisplay');
        this.profileAlert = document.getElementById('profile-alert');
        this.sessionsTable = document.getElementById('sessions-table');
    }

    updateUserName(userName){
        this.userNameElement.textContent = "Welcome " + userName + "!";
    }

    hideProfileAlert(){
        this.profileAlert.style = "display: none;"
    }

    showProfileAlert(){
        this.profileAlert.style = "display: block;"
    }

    addSession(session, value = 0){
        const row = document.createElement('tr');
        const th = document.createElement('th');
        const td = document.createElement('td');
        const button = document.createElement('button');
        th.textContent = "Calculator session " + value;
        button.textContent = session;
        row.appendChild(th)
        td.appendChild(button)
        row.appendChild(td)
        this.sessionsTable.appendChild(row);
    }
}

export class SignInView extends View {
    constructor() {
        super();
        this.signInForm = document.getElementById('sign-in-form');
        this.emailElement = document.getElementById('InputEmail');
        this.passwordElement = document.getElementById('InputPassword');
        this.button = document.getElementById('sign-out');
    }

    hideSignOutButton(){
        this.button.style = "display: none;"
    }

    showSignOutButton(){
        this.button.style = "display: block;"
    }
}

export class SignUpView extends View{
    constructor() {
        super();
        this.signUpForm = document.getElementById('sign-up-form');
        this.nameElement = document.getElementById('InputName');
        this.emailElement = document.getElementById('InputEmail');
        this.isMaleElement = document.getElementById('radio1');
        this.isFemaleElement = document.getElementById('radio2');
        this.DoBElement = document.getElementById('InputDate');
        this.passwordElement = document.getElementById('InputPassword');
    }
}