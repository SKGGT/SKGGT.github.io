import { CalculatorController } from "./controller.js";
import { CalculatorView } from "./view.js";
import { CalculatorModel } from "./model.js";

const view = new CalculatorView();
const model = new CalculatorModel(view);
const controller = new CalculatorController(model, view);

window.addEventListener("DOMContentLoaded", () => {
    controller.initEventListeners();
});