import { DATA_SET, DATA_CLEAR,REMARK_DATA } from '@/store/mutations-type'

const state = {
    ramarkData: ''
}

const mutations = {
    [DATA_SET](state, info){
        state.ramarkData = info
        // wx.setStorageSync(REMARK_DATA, state.ramarkData)
    },
    [DATA_CLEAR](state){
        state.ramarkData = ''
        wx.removeStorageSync(REMARK_DATA)
    }
}

const actions = {
    setData({ commit }, ramarkData) {
        commit(DATA_SET, ramarkData)
    },
    setDataByStorage({ commit }) {
        let ramarkData = wx.getStorageSync(REMARK_DATA) || ''
        commit(DATA_SET, ramarkData)
    },
    removeData({ commit }){
        commit(DATA_CLEAR)
    }
}

export default {
    state,
    mutations,
    actions
}