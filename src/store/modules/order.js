import { ORDER_SELECTADDRESSID, ORDER_SELECTEXPRESSID, ORDER_ISCHANGECOUPON} from '@/store/mutations-type'

const state = {
    SelectedExpressId: '',
    SelectedConsigneeId: '',
    IsChangeCoupon : false,
}

const mutations = {
    [ORDER_SELECTADDRESSID](state, info){
        state.SelectedConsigneeId = info
    },
    [ORDER_SELECTEXPRESSID](state, info){
        state.SelectedExpressId = info
    },
    [ORDER_ISCHANGECOUPON](state, info){
        state.IsChangeCoupon = info
    }
}

const actions = {
    setSelectAddressId({ commit }, obj) {
        commit(ORDER_SELECTADDRESSID, obj)
    },
    setSelectedExpressId({commit},obj) {
        commit(ORDER_SELECTEXPRESSID,obj)
    },
    setIsChangeCoupon({commit},obj) {
        commit(ORDER_ISCHANGECOUPON,obj)
    }
    
}
export default {
    state,
    mutations,
    actions
}