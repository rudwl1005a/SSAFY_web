import Login from "./component/login.js";
import Main from "./component/main.js";
import MainChild1 from "./component/mainChild1.js";
import MainChild2 from "./component/mainChild2.js";

export default new VueRouter({
    routes : [
        { path: '/', component: Login },
        { path: '/login', component: Login },
        { 
            path: '/main',
            component: Main,
            children: [
                { path: '/main/child1', component: MainChild1 },
                { path: '/main/child2', component: MainChild2 },
            ]
        },
    ]
});