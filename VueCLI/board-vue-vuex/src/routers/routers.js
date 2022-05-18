import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import BoardMain from '@/components/BoardMain.vue'
import Login from "@/components/Login.vue"
import User from "@/components/User.vue"
import Register from "@/components/Register.vue"
import store from "@/store/store.js"

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: BoardMain,
            beforeEnter: (to, from, next) => {
                if(!store.state.login.isLogin){
                    next("/login");
                } else {
                    return next();
                }
            }
        },
        {
            name: 'BoardMain',
            path: '/board',
            component: BoardMain,
            beforeEnter: (to, from, next) => {
                if(!store.state.login.isLogin){
                    next("/login");
                } else {
                    return next();
                }
            }
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
        {
            name: 'Register',
            path: '/register',
            component: Register,
        },
    ]
});