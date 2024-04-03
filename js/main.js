import { CalculatorController } from "./MVC/controller.js";
import { CalculatorView } from "./MVC/view.js";
import { CalculatorModel } from "./MVC/model.js";

const view = new CalculatorView();
const model = new CalculatorModel(view);
const controller = new CalculatorController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem('activeSession', model.displayNumber);
    model.handleClearEntry();
});