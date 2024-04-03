import {SignUpController} from "./MVC/controller.js";
import {SignUpView} from "./MVC/view.js";
import {SignUpModel} from "./MVC/model.js";

const view = new SignUpView();
const model = new SignUpModel(view);
const controller = new SignUpController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});

