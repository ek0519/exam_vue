import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import { createPinia } from 'pinia'
import router from './router'

import './permissions.js'

import "vue-toastification/dist/index.css";
import './index.css'


createApp(App)
    .use(router)
    .use(createPinia())
    .use(Toast, {})
    .mount('#app')

