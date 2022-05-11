import {defineStore} from 'pinia'
import {AUTH} from "@/api";

export const useUserStore = defineStore("UserStore", {
    state: () => ({
        user: null,
        isLogin: false,
    }),
    actions: {
        async setUser(data) {
            this.user = data
            this.isLogin = true
        },
        async clearUser() {
            this.user =null
            this.isLogin = false
        },
        async login(form) {
            const data = await AUTH.login(form)
            await this.setUser(data)
        },
        async me() {
            try {
                const data = await AUTH.me()
                await this.setUser(data)
            } catch (e) {
                console.log(e.message)
            }
        },

        async logout() {
            await AUTH.logout()
           await this.clearUser()
        }
    },
})