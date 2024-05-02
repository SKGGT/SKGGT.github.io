
<template>
  <div class="profile">
    <div class="container">
      <div id="profile-alert" class="profile-alert alert alert-danger" role="alert" :style="{display: (isSighedIn)?'none':'block'}">
        You are not signed in!
      </div>
      <div id="userNameDisplay" :style="{display: (!isSighedIn)?'none':'block'}">Welcome {{userName}}!</div>
      <table v-if="sessions.length > 0" class="profile-table table table-primary">
        <tbody id="sessions-table">
        <tr  v-for="(session, index) in sessions">
          <th>
            Calculator session {{index + 1}}
          </th>
          <td>
            <button @click="sessionClick(session)" class="button">{{session}}</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {ProfileController} from "@/components/Profile/controller";
import {ProfileModel} from "@/components/Profile/model";

export default {
  name: 'ProfileView',
  data() {
    return {
      model: null,
      controller: null,
      sessionClick: Function,
      isSighedIn: false,
      sessions: Array,
      userName: '',
    };
  },
  mounted() {
    this.model = new ProfileModel(this);
    this.controller = new ProfileController(this.model, this);
    this.sessionClick = this.controller.sessionClick.bind(this.controller);
  },
  methods: {
    hideProfileAlert(){
      this.isSighedIn = true;
    },
    showProfileAlert(){
      this.isSighedIn = false;
    },
  }
}
</script>