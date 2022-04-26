import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component : () => import('@/components/HelloWorld')
    },
    {
        path: '/order',
        component : () => import('@/components/Order')
    },
    {
        path: '/processOrder',
        component : () => import('@/components/ProcessOrder')
    },
    {
        path: '/manageOrder',
        component : () => import('@/components/ManageOrder')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})