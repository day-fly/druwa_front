import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component : () => import('@/components/HelloWorld')
    },
    {
        path: '/bye',
        component : () => import('@/components/ByeWorld')
    },
    {
        path: '/order',
        name: 'order',
        component : () => import('@/components/Order')
    },
    {
        path: '/processOrder',
        name: 'processOrder',
        component : () => import('@/components/ProcessOrder')
    },
    {
        path: '/manageOrder',
        name: 'manageOrder',
        component : () => import('@/components/ManageOrder')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})