import { post, get} from '../../http'


export default {
    signup(data){
        return post('/api/auth/signup', data)
    },
    login(data){
        return post('/api/auth/login', data)
    },
    logout(){
        return get('/api/auth/logout')
    },
    facebook(access_token){
        return post('/api/auth/facebook', {access_token})
    },
    me(){
        return get('/api/auth/me', {},false)
    },
    verify(){
        return post('/api/auth/verify')
    }
}