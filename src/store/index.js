import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import search from './modules/search'
import filterRules from './modules/filterRules'
import wxinfo from './modules/wxinfo'
<<<<<<< HEAD
import attGlassList from './modules/attrGlassList'
=======
import order from './modules/order'
>>>>>>> 确认订单页 选择收货地址 传值

Vue.use(Vuex);

const store = new Vuex.Store({
<<<<<<< HEAD
  modules: {
    user: {
      namespaced: true,
      ...user
    },
    search: {
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
    }, groupGlassList: {
      namespaced: true,
      ...attGlassList
=======
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
        },
        order: {
            namespaced: true,
            ...order
        }
>>>>>>> 确认订单页 选择收货地址 传值
    }
  }
});

export default store
