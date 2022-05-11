import axios from './axios'
import { useToast } from "vue-toastification"

const toast = useToast()

function errorMessage (reject, err, notification=false) {
    return notification ? toast.error(err.response.data.detail) : reject(err)
}


export function get(url, params = {} ,notification=false) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(res => resolve(res))
            .catch(err => errorMessage(reject, err, notification))
    })
}

export function post(url, data, notification=false) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => errorMessage(reject, err, notification))
    })
}

export function put(url, data, notification=false) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(res => resolve(res))
            .catch(err => errorMessage(reject, err, notification))
    })
}

export function patch(url, data, notification=false) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(res => resolve(res))
            .catch(err => errorMessage(reject, err, notification))
    })
}

export function del(url, data, notification=false) {
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then(res => resolve(res))
            .catch(err => errorMessage(reject, err, notification))
    })
}


export function upload(url, file) {
    let param = new FormData()
    param.append('file', file)
    return new Promise((resolve, reject) => {
        axios.post(url, param)
            .then(res => resolve(res))
            .catch(err => errorMessage(reject, err, notification))
    })
}
