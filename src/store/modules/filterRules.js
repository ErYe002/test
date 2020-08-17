import { FILTER_RULES_SET, FILTER_RULES_CLEAR, IS_NEED_FILTER_SET } from '@/store/mutations-type';

const state = {
  selectedFilterRules: {
    brandId: '',
    lPrice: '',
    uPrice: '',
    attrs: []
  },
  isNeedFilter: false //标记是否需要重新请求筛选接口
};

// {
//   brandId: '',
//   lPrice: '',
//   uPrice: '',
//   attrs: [{groupId: 1, wordId: 1}] //因为不能多选，所以需要groupId来控制每种类别只能选择一项
// }

const mutations = {
  [FILTER_RULES_SET](state, info) {
    state.selectedFilterRules = Object.assign({}, info);
  },
  [FILTER_RULES_CLEAR](state) {
    state.selectedFilterRules = {
      brandId: '',
      lPrice: '',
      uPrice: '',
      attrs: []
    };
  },
  [IS_NEED_FILTER_SET](state, val){
    state.isNeedFilter = val
  }
};

const actions = {
  setFilterRules({ commit }, obj) {
    commit(FILTER_RULES_SET, obj);
  },
  removeFilterRules({ commit }) {
    commit(FILTER_RULES_CLEAR);
  },
  setIsNeedFilter({commit}, val){
    commit(IS_NEED_FILTER_SET, val)
  }
};

export default {
  state,
  mutations,
  actions
};
