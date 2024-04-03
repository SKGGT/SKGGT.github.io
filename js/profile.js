
import {ProfileController} from "./MVC/controller.js";
import {ProfileView} from "./MVC/view.js";
import {ProfileModel} from "./MVC/model.js";

const view = new ProfileView();
const model = new ProfileModel(view);
const controller = new ProfileController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});



