import { TOKEN_SET, TOKEN_CLEAR,USERID_SET,USERID_CLEAR,FIRSTGIFT_SET } from '@/store/mutations-type'

const TOKEN_STORAGE_KEY = 'TOKEN'
const USERID_STORAGE_KEY = 'USERID'
const FIRSTGIFT_STORAGE_KEY = 'FIRSTGIFT'

const state = {
    token: '',
    userId:'',
    firstgift:false
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
    },
    [FIRSTGIFT_SET](state, info){
        state.firstgift = info
        wx.setStorageSync(FIRSTGIFT_STORAGE_KEY, state.firstgift)
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
    },
    setFirstGift({ commit }, firstgift) {
        commit(FIRSTGIFT_SET, firstgift)
    },
}

export default {
    state,
    mutations,
    actions
}