import { SET_WXKEYS } from '@/store/mutations-type'

const state = {
  accessToken: '',
  openId: '',
  sessionKey: ''
}

const mutations = {
    [SET_WXKEYS](state, info){
      state.accessToken = info.access_token
      state.openId = info.openid
      state.sessionKey = info.session_key
    }
}

const actions = {
    setWXinfo({ commit }, info) {
        commit(SET_WXKEYS, info.Data)
    }
}

export default {
    state,
    mutations,
    actions
}