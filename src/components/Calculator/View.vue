<template>
  <section >
    <div class="main">
      <div class="calculator">
        <div class="calculator-number-box">{{ displayNumber }}</div>
        <div class="calculator-buttons">
          <button
              v-for="(button, index) in buttons"
              :key="index"
              :type="button"
              :class="['calculator-button btn', button.class]"
              @click="handleButtonClick(button.value, button.type)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script ref="view">
import {CalculatorController} from "@/components/Calculator/controller.js";
import {CalculatorModel} from "@/components/Calculator/model.js";

export default {
  name: 'CalculatorView',
  data(){
    return {
      model: null,
      controller: null,
      displayNumber: '0',
      handleButtonClick: null,
      buttons: [
        { label: '%', value: '%', type: 'special', class: 'btn-secondary'},
        { label: 'CE', value: 'CE', type: 'special', class: 'btn-secondary' },
        { label: 'C', value: 'C', type: 'special', class: 'btn-secondary' },
        { label: '←', value: '←', type: 'special', class: 'btn-secondary' },
        { label: '1/x', value: '1/x', type: 'special', class: 'btn-secondary' },
        { label: 'x²', value: 'x²', type: 'special', class: 'btn-secondary' },
        { label: '√x', value: '√x', type: 'special', class: 'btn-secondary' },
        { label: '÷', value: '÷', type: 'operation', class: 'btn-secondary' },
        { label: '7', value: '7', type: 'numeric', class: 'btn-primary' },
        { label: '8', value: '8', type: 'numeric', class: 'btn-primary' },
        { label: '9', value: '9', type: 'numeric', class: 'btn-primary' },
        { label: 'x', value: 'x', type: 'operation', class: 'btn-secondary' },
        { label: '4', value: '4', type: 'numeric', class: 'btn-primary' },
        { label: '5', value: '5', type: 'numeric', class: 'btn-primary' },
        { label: '6', value: '6', type: 'numeric', class: 'btn-primary' },
        { label: '-', value: '-', type: 'operation', class: 'btn-secondary' },
        { label: '1', value: '1', type: 'numeric', class: 'btn-primary' },
        { label: '2', value: '2', type: 'numeric', class: 'btn-primary' },
        { label: '3', value: '3', type: 'numeric', class: 'btn-primary' },
        { label: '+', value: '+', type: 'operation', class: 'btn-secondary' },
        { label: '0', value: '0', type: 'numeric', class: 'btn-primary' },
        { label: '.', value: '.', type: 'special', class: 'btn-primary' },
        { label: '=', value: '=', type: 'special', class: 'btn-secondary' },
      ],
    }
  },
  mounted() {
    this.model = new CalculatorModel(this);
    this.controller = new CalculatorController(this.model, this);
    this.handleButtonClick = this.controller.handleButtonClick.bind(this.controller);
  },
  methods: {
    updateDisplay(value) {
      this.displayNumber = value;
    },
    handleDecimalPoint() {
      if (this.displayNumber.includes(".")) return;
      this.updateDisplay(this.displayNumber + '.');
    }
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem('activeSession', this.model.displayNumber);
    this.model.saveSession();
    next();
  }
}

</script>