<template>
  <div class="signin">
    <div class="container">
      <form id="sign-in-form" v-on:submit="submitSignInForm">
        <div class="sign-field">
          <label for="InputEmail" class="form-label">Email address</label>
          <input v-model="Email" type="email" class="form-control" id="InputEmail" placeholder="Enter your email" aria-describedby="emailHelp">
        </div>
        <div class="sign-field">
          <label for="InputPassword" class="form-label">Enter your password</label>
          <input v-model="Password" type="password" class="form-control" id="InputPassword" placeholder="Enter your password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button @click.prevent="resetForm()" type="reset" class="btn btn-secondary">Reset</button>
      </form>
    </div>
    <button @click="sighOut()" id="sign-out" :style="{display: (isSignOutHidden)?'none':'block'}"  >Sigh out</button>
  </div>
</template>

<script>
import {SignInController} from "@/components/SignIn/controller";
import {SignInModel} from "@/components/SignIn/model";

export default {
  name: 'ProfileView',
  data() {
    return {
      model: null,
      controller: null,
      submitSignInForm: Function,
      sighOut: Function,
      isSignOutHidden: true,
      Email: '',
      Password: '',
    };
  },
  mounted() {
    this.model = new SignInModel(this);
    this.controller = new SignInController(this.model, this);
    this.submitSignInForm = this.controller.submitSignInForm.bind(this.controller);
    this.sighOut = this.controller.sighOut.bind(this.controller);
  },
  methods: {
    resetForm(){
      this.Email = '';
      this.Password = '';
    },
    hideSighOutButton(){
      console.log(this.isSignOutHidden)
      this.isSignOutHidden = true;
    },
    showSighOutButton(){
      this.isSignOutHidden = false;
    },
    sendAlert(str){
      alert(str);
    },
  }
}
</script>