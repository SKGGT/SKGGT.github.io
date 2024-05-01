export class SignInController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    submitSignInForm(e) {
        e.preventDefault();

        this.model.handleSignIn();
    }

    sighOut() {
        this.model.handleSignOut();
    }
}
