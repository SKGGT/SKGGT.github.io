<template>
  <section class="signup">
    <div class="container">
      <form ref="signUnForm" id="sign-up-form" v-on:submit="submitSignUpForm">
        <div class="sign-field">
          <label for="InputName" class="form-label">Name</label>
          <input v-model="Name" class="form-control" type="text" id="InputName" placeholder="Enter your name">
        </div>
        <div class="sign-field">
          <label for="InputEmail" class="form-label">Email address</label>
          <input v-model="Email" type="email" class="form-control" id="InputEmail" placeholder="Enter your email" aria-describedby="emailHelp">
        </div>
        <div class="sign-field">
          <label class="form-label">Gender</label>
          <div class="form-check">
            <input v-model="IsMale" class="form-check-input" type="radio" name="flexRadioDefault" id="radio1">
            <label class="form-check-label" for="radio1">
              Male
            </label>
          </div>
          <div class="form-check">
            <input v-model="IsFemale" class="form-check-input" type="radio" name="flexRadioDefault" id="radio2">
            <label class="form-check-label" for="radio2">
              Female
            </label>
          </div>
        </div>
        <div class="sign-field">
          <label for="InputDate" class="form-label">Date of birth</label>
          <input v-model="DoB" type="date" class="form-control" id="InputDate" placeholder="Enter your date of birth">
        </div>
        <div class="sign-field">
          <label for="InputPassword" class="form-label">Password</label>
          <input v-model="Password" type="password" class="form-control" id="InputPassword" placeholder="Create your password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="reset" class="btn btn-secondary">Reset</button>
      </form>
    </div>
  </section>
</template>

<script>
import {SignUpController} from "@/components/SignUp/controller";
import {SignUpModel} from "@/components/SignUp/model";

export default {
  name: 'ProfileView',
  data() {
    return {
      model: Object,
      controller: Object,
      submitSignUpForm: Function,
      Name: '',
      Email: '',
      IsMale: false,
      IsFemale: false,
      DoB: '',
      Password: '',
    };
  },
  mounted() {
    this.model = new SignUpModel(this);
    this.controller = new SignUpController(this.model, this);
    this.submitSignUpForm = this.controller.submitSignUpForm.bind(this.controller);
  },
  methods: {
    sendAlert(str){
      alert(str);
    },
  }
}
</script>