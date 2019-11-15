import { HISTORY_SEARCH_SET, HISTORY_SEARCH_CLEAR } from '@/store/mutations-type'

const HISTORY_SEARCH_STORAGE_KEY = 'HISTORY_SEARCH_LIST'
const MAX_SEARCHLIST_LENGTH = 15    //最多保留的搜索记录

const state = {
    historySearchList: []
}

const getters = {
    historySearchList(state){
        return [...state.historySearchList].reverse()
    }
}

const mutations = {
    [HISTORY_SEARCH_SET](state, info){
        if(Array.isArray(info)){
            state.historySearchList = [...info]
        } else {
            if(state.historySearchList.length >= MAX_SEARCHLIST_LENGTH){
                state.historySearchList.splice(0, 1)
            }
            state.historySearchList.push(info)
        }
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
    setSearchHistoryByStorage({ commit }) {
        let list = wx.getStorageSync(HISTORY_SEARCH_STORAGE_KEY) || ''
        commit(HISTORY_SEARCH_SET, list)
    },
    removeSearchHistory({ commit }){
        commit(HISTORY_SEARCH_CLEAR)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}