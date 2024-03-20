import { CalculatorController } from "./controller.js";
import { CalculatorView } from "./view.js";
import { CalculatorModel } from "./model.js";


const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});