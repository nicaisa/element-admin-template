import axios from '@/utils/http'
import qs  from 'qs'

// 个人中心
const personal = {
    // 通知数量
    getNoticeNumber(){
        return axios.get(`manager/unread/`);
    }
}

export default personal
