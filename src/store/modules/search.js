import { HISTORY_SEARCH_SET, HISTORY_SEARCH_CLEAR } from '@/store/mutations-type'

const HISTORY_SEARCH_STORAGE_KEY = 'HISTORY_SEARCH_LIST'

const state = {
    historySearchList: []
}

const mutations = {
    [HISTORY_SEARCH_SET](state, info){
        state.historySearchList.push(info)
        wx.setStorageSync(HISTORY_SEARCH_STORAGE_KEY, state.historySearchList)
    },
    [HISTORY_SEARCH_CLEAR](state){
        state.historySearchList = []
        wx.removeStorageSync(HISTORY_SEARCH_STORAGE_KEY)
    }
}

const actions = {
    /**
     * obj: {searchContent: '', shopId: ''}
     */
    setSearchHistory({ commit }, obj) {
        commit(HISTORY_SEARCH_SET, obj)
    },
    removeSearchHistory({ commit }){
        commit(HISTORY_SEARCH_CLEAR)
    }
}

export default {
    state,
    mutations,
    actions
}