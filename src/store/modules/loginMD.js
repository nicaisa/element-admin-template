import ls from '../../utils/localStorage'
import login from '@/api/login'
import router from '../../router/router'
import {Message} from 'element-ui'
import {resData} from "@/utils/base"

const state = {
    // 用户信息，初始值从本地 localStorage 获取
    username: ls.getItem("username"),
    // 添加 auth 来保存当前用户的登录状态
    auth: ls.getItem('auth'),
}

// 添加 getters
// 当需要从仓库的 state 中派生出一些状态的时候，我们就可以定义 Getter，你可以认为它是仓库的计算属性，
const getters = {
    // count: state => {
    //     return state.count;
    // }
};
// 更改状态的方法
const mutations = {
    // UPDATE_USER 是事件类型名
    // 参数 state 是当前仓库的 state，user 是用户传入的参数
    UPDATE_USER(state, username) {
        // 改变 user 的值
        state.username = username ;
        // 将改变后的值存入 localStorage
        ls.setItem("username",username);
    },
    // 添加 UPDATE_AUTH 来更改当前用户的登录状态
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    },
    // 添加 UPDATE_AUTH 来更改当前用户的session
    UPDATE_SESSION(state, session){
        state.session = session
    },
}

const actions = {
    // {commit}是context.commit（提交一个事件类型）简写
    async login({commit, rootState}, userInfo) {
        // console.log(rootState)
        const username = userInfo.username.trim();

        let res = await login.login(userInfo);
        res = resData(res);

        if (!res) {
            return false;
        }
        let {code, session, message} = res;
        if (code !== 200) {
            Message.error(message || '登陆失败');
            return  false;
        }
        // 登录时有传用户信息，就更新下用户信息
        if (userInfo) commit('UPDATE_USER', username);
        // 更新当前用户的登录状态为已登录
        commit('UPDATE_AUTH', true);
        commit('UPDATE_SESSION', session);
        ls.setItem("username", username);
        window.localStorage.setItem("session", session);
        router.push({ path: '/' });
        // router.push({ path: this.redirect || '/index' });
    },
    // 退出登录
    async loginOut({ commit }) {
        let res = await login.logout();
        if (res && res.data && res.data.code === 200) {
            commit('UPDATE_AUTH', false)
            commit('UPDATE_USER', '')
            ls.clear();
            router.push({ name: 'login'})
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
