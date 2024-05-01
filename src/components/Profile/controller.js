export class ProfileController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    sessionClick(session){
        this.model.handleSessionClick(session);
        this.view.$router.push('/');
    }
}
