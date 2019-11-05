import {ATTR_SELCT_GLASSES, SELECT_GLASS_GROUP_POSITION} from '@/store/mutations-type'
import utils from '@/utils/index';

const state = {
  atttGlassListData: [],
  glassGroupSelectPosition: {}
};

const mutations = {
  [ATTR_SELCT_GLASSES](state, info) {
    state.atttGlassListData = [...info]
  },
  [SELECT_GLASS_GROUP_POSITION](state, info) {
    state.glassGroupSelectPosition = Object.assign({}, info)
  }
};

const getters = {
  groupNameList(state) {
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

    for (let item of obj.GlassGroup) {
      if (!utils.isListEmpty(item.EyeGlassList)) {
        let eyeList = item.EyeGlassList;
        for (let glass of eyeList) {
          glass.canEnable = isItemCanclickAble(glass, obj.frameEyeInfo);
        }
      }
    }
    console.log("疏忽", obj.GlassGroup);
    commit(ATTR_SELCT_GLASSES, obj.GlassGroup)
  },
  setGroupSelectPosition({commit}, obj) {
    commit(SELECT_GLASS_GROUP_POSITION, obj)
  },
};

function isItemCanclickAble(item, frameEyeInfo) {

  let sphLInConfine = false;//左眼光度是否在范围内
  let sphRInConfine = false;//右眼光度是否在范围内
  let cylLInConfine = false;//左眼散光是否在范围内
  let cylRInConfine = false;//右眼散光是否在范围内

  //光度限制区域
  let highLuminosity = item.HighLuminosity;
  let lowerLuminosity = item.LowerLuminosity;
  if (lowerLuminosity > highLuminosity) {//如果服务器返回不规范，对调位置
    let tempLuminosity = 0;
    tempLuminosity = highLuminosity;
    highLuminosity = lowerLuminosity;
    lowerLuminosity = tempLuminosity;
  }
  //散光限制区域
  let highAstigmatism = item.HighAstigmatism;
  let lowerAstigmatism = item.LowerAstigmatism;

  if (lowerAstigmatism > highAstigmatism) {//如果服务器返回不规范，对调位置
    let tempLuminosity = 0;
    tempLuminosity = highAstigmatism;
    highAstigmatism = lowerAstigmatism;
    lowerAstigmatism = tempLuminosity;
  }

  //左眼光度是否符合
  sphLInConfine = withinLimits(lowerLuminosity, highLuminosity, frameEyeInfo.sphL);
  //右眼光度是否符合
  sphRInConfine = withinLimits(lowerLuminosity, highLuminosity, frameEyeInfo.sphR);
  //左眼散光是否符合
  cylLInConfine = withinLimits(lowerAstigmatism, highAstigmatism, frameEyeInfo.cylL);
  //右眼散光是否符合
  cylRInConfine = withinLimits(lowerAstigmatism, highAstigmatism, frameEyeInfo.cylR);

  // console.log('传过来的数据', this.frameEyeInfo);

  if (sphLInConfine && sphRInConfine && cylLInConfine && cylRInConfine) {
    return true;
  } else {
    return false;
  }
}

function withinLimits(lower, high, judge) {
  if (judge === "待定") {
    return true;
  }

  if (judge === "无") {
    return true;
  }
  let flJudge = parseFloat(judge);
  return flJudge <= high && flJudge >= lower;
}

export default {
  state,
  getters,
  mutations,
  actions
}
