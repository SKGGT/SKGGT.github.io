import { createMemoryHistory, createRouter } from 'vue-router'

import Calculator from '@/components/Calculator/View.vue'
import Profile from "@/components/Profile/View.vue";
import About from "@/components/About.vue";
import SignIn from "@/components/SignIn/View.vue";
import SignUp from "@/components/SignUp/View.vue";


const routes = [
    { path: '/', component: Calculator},
    { path: '/profile', component: Profile},
    { path: '/about', component: About},
    { path: '/signin', component: SignIn},
    { path: '/signup', component: SignUp}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router