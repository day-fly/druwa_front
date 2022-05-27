import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component : () => import('@/components/HelloWorld')
    },
    {
        path: '/cert',
        component : () => import('@/components/Cert')
    },
    {
        path: '/bye',
        name: 'bye',
        component : () => import('@/components/ByeWorld'),
        props: true
    },
    {
        path: '/error',
        component : () => import('@/components/ErrorWorld')
    },
    {
        path: '/order',
        name: 'order',
        component : () => import('@/components/Order'),
        props: true
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