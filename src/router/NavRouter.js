import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home"
import About from "@/views/About"
import Product from "@/views/Product"

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'About',
        path: '/about',
        component: About
    },
    {
        name: 'Product',
        path: '/product/:name',
        component: Product,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router