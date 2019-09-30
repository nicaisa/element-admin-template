import personal from '@/api/personal'
import {resData} from "@/utils/base"

// 个人中心
const state = {
    notice: 0,// 通知（头部）
};
const getters = {
    notice: state => {
        return state.notice;
    }
};
const mutations = {
    UPDATE_NOTICE(state, notice) {
        state.notice = notice;
    }
};

const actions = {
    async getNoticeNumber({ commit }) {
        let res = await personal.getNoticeNumber();
        res = resData(res);

        let num = res.data=== 0 ? 0 : res.data;
        commit('UPDATE_NOTICE', num);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
