import { SET_USERINFO } from '@/store/mutations-type'

const state = {
    userInfo:null
}

const mutations = {
    [SET_USERINFO](state, info){
      state.userInfo = info
    }
}

const actions = {
    setUserInfo({ commit }, info) {
        commit(SET_USERINFO, info)
    }
}

export default {
    state,
    mutations,
    actions
}