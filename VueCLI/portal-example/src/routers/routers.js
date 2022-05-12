import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import NavBar from "@/components/NavBar.vue";
import Cafe from "@/components/Cafe.vue";
import Blog from "@/components/Blog.vue";
import Mail from "@/components/Mail.vue";
import TellMe from "@/components/TellMe.vue";
import Footer from "@/components/Footer.vue";

export default new VueRouter({
    routes: [
        { 
            path:'/', 
            components: {
                NavBar: NavBar,
                default: Cafe,
                Footer: Footer,
            }
        },
        {
            name: 'Cafe',
            path: '/cafe',
            components: {
                NavBar: NavBar,
                default: Cafe,
                Footer: Footer,
            }
        },
        {
            name: 'Mail',
            path: '/mail',
            components: {
                NavBar: NavBar,
                default: Mail,
                Footer: Footer,
            }
        },
        {
            name: 'Blog',
            path: '/blog',
            components: {
                NavBar: NavBar,
                default: Blog,
                Footer: Footer,
            }
        },
        {
            name: 'TellMe',
            path: '/tellme',
            components: {
                NavBar: NavBar,
                default: TellMe,
                Footer: Footer,
            }
        },
    ]
})