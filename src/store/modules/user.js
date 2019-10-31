import { TOKEN_SET, TOKEN_CLEAR } from '@/store/mutations-type'

const TOKEN_STORAGE_KEY = 'TOKEN'

const state = {
    token: ''
}

const mutations = {
    [TOKEN_SET](state, info){
        state.token = info
        wx.setStorageSync(TOKEN_STORAGE_KEY, state.token)
    },
    [TOKEN_CLEAR](state){
        state.token = ''
        wx.removeStorageSync(TOKEN_STORAGE_KEY)
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
    }
}

export default {
    state,
    mutations,
    actions
}