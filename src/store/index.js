import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import search from './modules/search'
import filterRules from './modules/filterRules'
import wxinfo from './modules/wxinfo'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        user:{
            namespaced: true,
            ...user
        },
        search:{
            namespaced: true,
            ...search
        },
        filterRules: {
            namespaced: true,
            ...filterRules
        },
        wxinfo: {
            namespaced: true,
            ...wxinfo
        }
    }
})

export default store