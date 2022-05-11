import {useUserStore} from "@/stores/UserStore";
import router from './router'
import {AUTH} from "@/api"

router.beforeEach((to, from) => {
    const store = useUserStore()
    const isLogin = store.isLogin
    const requireAuth = to.matched.some(record => record.meta.requiresAuth)

    // has login session but not login
    const auth = ['login', 'signup']
    if (auth.includes(to.name) && !isLogin) {
        AUTH.me().then(data => {
            store.setUser(data)
            router.push({name: 'home'})
        }).catch((err)=>{
            console.log(err.response.data.detail)
        })
    }

    if (requireAuth && !isLogin) {
        router.push({name: 'login'})
    }


})