import { patch, get} from '../../http'


export default {
    getUsers(offset=0, limit=10) {
        return get('/api/users', {
            params: {
                offset,
                limit
            }
        })
    },
    getUser(id){
        return get(`/api/users/${id}`)
    },
    resetPassword(data){
        return patch('/api/users/password', data)
    },
    updateUserName(data){
        return patch('/api/users', data)
    }
}