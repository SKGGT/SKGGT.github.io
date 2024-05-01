import './assets/style.css'

import {createApp} from "vue";
import router from './router'
import App from './App.vue'

const app = createApp(App)
    .use(router)
    .mount('#app')


