import axios from '@/utils/http'
import qs  from 'qs'
const login = {
    login(params) {
        return axios.post(`login/`,qs.stringify(params));
    },
    logout(params = {}) {
        return axios.get(`login/logout/`, params);
    },
}

export default login
