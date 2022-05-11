import axios from 'axios'

axios.defaults.withCredentials = true

const instance = axios.create({
    "baseURL": import.meta.env.VITE_APP_BASE_API,
})


instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('Authorization')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        window.location = '/login'
    }
    return Promise.reject(error)
})

export default instance
