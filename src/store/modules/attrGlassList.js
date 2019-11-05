import {ATTR_SELCT_GLASSES} from '@/store/mutations-type'


const state = {
  atttGlassListData: []
};

const mutations = {
  [ATTR_SELCT_GLASSES](state, info) {
    state.atttGlassListData = [...info]
  }
};

const getters = {
  groupNameList(state) {
    console.log("测试");
    let list = [];
    for (let i = 0; i < state.atttGlassListData.length; i++) {
      let item = state.atttGlassListData[i];
      let putItem = {value: item.GroupName, index: i, checked: false};
      list.push(putItem)
    }
    return list
  }
};

const actions = {
  setAttrGlassList({commit}, obj) {

    commit(ATTR_SELCT_GLASSES, obj)
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
