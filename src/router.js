import  { createRouter, createWebHistory } from "vue-router"


export const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/login.vue'),
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: () => import('./views/redirect.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('./views/signup.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('./views/signup.vue'),
    },
    {
        path: '/',
        name: 'home',
        meta: {
            requiresAuth: true
        },
        component: () => import('./views/index.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            requiresAuth: true
        },
        component: () => import('./views/profile.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            let delayTime = 500
            try {
                if (to.hash) {
                    return {
                        el: to.hash,
                        behavior: 'smooth',
                    }
                }
                if (savedPosition) {
                    setTimeout(() => {
                        resolve({
                            ...savedPosition,
                            behavior: 'smooth'
                        })
                    }, delayTime)
                } else if (to.name !== from.name) {
                    if (to.name === 'home' || to.name === 'about') {
                        delayTime = 1500
                    }
                    setTimeout(() => {
                        resolve({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                    }, delayTime)
                }
            } catch (error) {
                throw new Error('router exception: ', error)
            }
        })
    },
    routes
})

export default router