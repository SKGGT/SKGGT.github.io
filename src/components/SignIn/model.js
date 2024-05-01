export class SignInModel {
    constructor(view) {
        this.view = view;
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (!this.activeUser){
            this.view.hideSighOutButton();
        }
        else {
            this.view.showSighOutButton();
        }
    }

    handleSignIn() {
        const email = this.view.Email;
        const password = this.view.Password;

        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            localStorage.setItem('activeUser', JSON.stringify(user));
            this.view.showSighOutButton();
            this.view.sendAlert('Sign in successful!');
        } else {
            this.view.sendAlert('Invalid email or password.');
        }
    }

    handleSignOut() {
        localStorage.removeItem('activeUser');
        this.view.sendAlert('Sign out successful!');
        this.view.hideSighOutButton();
    }
}
