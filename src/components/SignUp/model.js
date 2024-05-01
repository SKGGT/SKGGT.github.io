export class SignUpModel {
    constructor(view) {
        this.view = view;
    }

    handleSignUp() {
        const name = this.view.Name;
        const email = this.view.Email;
        const isMale = this.view.IsMale;
        const isFemale = this.view.IsFemale;
        const DoB = this.view.DoB;
        const password = this.view.Password;

        if (!name || !email || !DoB || !password || !(isMale || isFemale)) {
            console.log(this.view);
            this.view.sendAlert('All fields are required!');
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
    }
}