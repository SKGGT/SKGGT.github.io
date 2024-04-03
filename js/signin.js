import {SignInController} from "./MVC/controller.js";
import {SignInView} from "./MVC/view.js";
import {SignInModel} from "./MVC/model.js";

const view = new SignInView();
const model = new SignInModel(view);
const controller = new SignInController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});

