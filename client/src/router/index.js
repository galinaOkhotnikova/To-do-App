import { createRouter, createWebHistory } from 'vue-router'

import TasksList from '../components/TasksList.vue'
import AppError404 from '../components/AppError404.vue'

const routes = [
    {
        path: '',
        redirect: {name: 'tasks'}
    },
    {
        path: '/tasks', 
        name: 'tasks',
        component: TasksList
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: AppError404
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href 

export default router
