import { ORDER_SELECTADDRESSID, ORDER_SELECTEXPRESSID } from '@/store/mutations-type'

const state = {
    SelectedExpressId: '',
    SelectedConsigneeId: ''

}

const mutations = {
    [ORDER_SELECTADDRESSID](state, info){
        state.SelectedConsigneeId = info
    },
    [ORDER_SELECTEXPRESSID](state, info){
        state.SelectedExpressId = info
    }
}

const actions = {
    setSelectAddressId({ commit }, obj) {
        commit(ORDER_SELECTADDRESSID, obj)
    },
    setSelectedExpressId({commit},obj) {
        commit(ORDER_SELECTEXPRESSID,obj)
    }
}

export default {
    state,
    mutations,
    actions
}