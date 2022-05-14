import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import BoardMain from '@/components/BoardMain.vue'
import Login from "@/components/Login.vue"
import User from "@/components/User.vue"

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Login,
        },
        {
            name: 'BoardMain',
            path: '/board',
            component: BoardMain,
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'User',
            path: '/user',
            component: User,
        },
    ]
});