export class SignUpController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    submitSignUpForm(e) {
        e.preventDefault();

        this.model.handleSignUp();
    }
}
