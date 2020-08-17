import { TOKEN_SET, TOKEN_CLEAR,USERID_SET,USERID_CLEAR } from '@/store/mutations-type'

const TOKEN_STORAGE_KEY = 'TOKEN'
const USERID_STORAGE_KEY = 'USERID'

const state = {
    token: '',
    userId:''
}

const mutations = {
    [TOKEN_SET](state, info){
        state.token = info
        wx.setStorageSync(TOKEN_STORAGE_KEY, state.token)
    },
    [TOKEN_CLEAR](state){
        state.token = ''
        wx.removeStorageSync(TOKEN_STORAGE_KEY)
    },
    [USERID_SET](state, info){
        state.userId = info
        wx.setStorageSync(USERID_STORAGE_KEY, state.userId)
    },
    [USERID_CLEAR](state){
        state.userId = ''
        wx.removeStorageSync(USERID_STORAGE_KEY)
    }
}

const actions = {
    setToken({ commit }, token) {
        commit(TOKEN_SET, token)
    },
    setTokenByStorage({ commit }) {
        let token = wx.getStorageSync(TOKEN_STORAGE_KEY) || ''
        commit(TOKEN_SET, token)
    },
    removeToken({ commit }){
        commit(TOKEN_CLEAR)
    },
    setUserId({ commit }, userId) {
        commit(USERID_SET, userId)
    },
    removeUserId({ commit }){
        commit(USERID_CLEAR)
    }
}

export default {
    state,
    mutations,
    actions
}