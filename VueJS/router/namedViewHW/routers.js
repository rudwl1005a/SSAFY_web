import NavBar from "./component/NavBar.js";
import Cafe from "./component/Cafe.js";
import Blog from "./component/Blog.js";
import Mail from "./component/Mail.js";
import TellMe from "./component/TellMe.js";
import Footer from "./component/Footer.js";

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
});