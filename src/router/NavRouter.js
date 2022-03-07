import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home"
import PageNotFound from "@/views/PageNotFound";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Leaflet from "@/views/Leaflet";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'PageNotFound',
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        props: true
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    },
    {
        name: 'Leaflet',
        path: '/leaflet',
        component: Leaflet
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router