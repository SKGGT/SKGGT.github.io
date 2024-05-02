import axios from "axios";
export class ProfileModel {
    constructor(view) {
        this.view = view;
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (!this.activeUser)return;
        // axios
        //     .get(`/api/users/${this.activeUser.email}`)
        //     .then((response) => {
        //         this.sessions = response.data;
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching sessions:', error);
        //     });
        this.sessions = localStorage.getItem(this.activeUser.email + "Sessions");
        if (this.sessions) this.sessions = this.sessions.split(',');

        if (this.activeUser){
            this.view.hideProfileAlert();
            this.view.userName = this.activeUser.name;
        }
        else{
            this.view.showProfileAlert();
        }
        this.view.sessions = this.sessions;
    }

    handleSessionClick(session) {
        localStorage.setItem('activeSession', session);
    }
}