import Login from "./component/login.js";
import Main from "./component/main.js";

export default new VueRouter({
    routes : [
        { path: '/', component: Login },
        { path: '/main', component: Main },
        { path: '/login', component: Login },
    ]
});