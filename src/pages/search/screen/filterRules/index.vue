<template>
  <article class="container">
    <section class="rule-item-box">
      <p class="title">品牌</p>
      <ul class="list">
        <li
          :class="'item' + (selectedFilterRules.brandId == item.BrandId ? ' selected':'')"
          v-for="item in brandsList"
          :key="item.BrandId"
          @click="selectBrandEvent(item.BrandId)"
        >{{item.Brand}}</li>
      </ul>
    </section>
    <section class="rule-item-box">
      <p class="title">价格</p>
      <div class="price-region">
        <input
          type="number"
          :value="selectedFilterRules.lPrice"
          :placeholder="'最低价（不能低于'+lPrice+'）'"
          @input="setLPrice"
        />
        <span class="text">-</span>
        <input
          type="number"
          :value="selectedFilterRules.uPrice"
          :placeholder="'最高价（不能高于'+uPrice+'）'"
          @input="setUPrice"
        />
      </div>
    </section>
    <section class="rule-item-box" v-for="(item, idx) in attrsList" :key="idx">
      <p class="title">{{item.Name}}</p>
      <ul class="list">
        <li
          :class="{item: true, 'selected': childItem.isSelected}"
          v-for="childItem in item.Attrs"
          :key="childItem.WordId"
          @click="selectAttrEvent(item.GroupId, childItem.WordId)"
        >{{childItem.Word}}</li>
      </ul>
    </section>
    <section class="btn-box">
      <button class="kd-btn btn-black btn-big" @click="resetEvent">重置</button>
      <button class="kd-btn btn-big" @click="confirmEvent">确认</button>
    </section>
  </article>
</template>

<script>
import api from "@/api/search";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      classId: "",
      brandsList: [], //品牌列表
      lPrice: "", //最低价
      uPrice: "", //最高价
      attrsList: [] //其他条件列表
    };
  },
  computed: {
    ...mapState("filterRules", ["selectedFilterRules"]) //当前选中的筛选条件
  },
  onLoad(options) {
    if (options && options.classId) {
      this.classId = options.classId;
    }
    this._getPageData();
  },
  methods: {
    ...mapActions("filterRules", [
      "setFilterRules",
      "removeFilterRules",
      "setIsNeedFilter"
    ]),
    selectBrandEvent(bid) {
      this.setFilterRules({ ...this.selectedFilterRules, brandId: bid });
    },
    setLPrice(e) {
      this.setFilterRules({
        ...this.selectedFilterRules,
        lPrice: e.mp.detail.value
      });
    },
    setUPrice(e) {
      this.setFilterRules({
        ...this.selectedFilterRules,
        uPrice: e.mp.detail.value
      });
    },
    selectAttrEvent(gid, wid) {
      let attrs = this.selectedFilterRules.attrs; //已选中的其他筛选条件数据列表
      let isHasSelectedGroup = false; //是否已选中当前组
      let selectedWordId; //选中当前组的哪个wordId
      attrs.forEach(ele => {
        if (ele.groupId == gid) {
          isHasSelectedGroup = true;
          selectedWordId = ele.wordId;
        }
      });
      if (isHasSelectedGroup && selectedWordId != wid) {
        console.log("替换选中");
        //替换当前wordId
        attrs = attrs.map(ele => {
          if (ele.groupId == gid) {
            ele.wordId = wid;
          }
          return ele;
        });
      } else if (isHasSelectedGroup && selectedWordId == wid) {
        console.log("取消选中");
        //取消当前选中
        attrs = attrs.filter(ele => {
          return ele.groupId != gid;
        });
      } else {
        console.log("新增选中");
        attrs.push({ groupId: gid, wordId: wid });
      }
      this.setFilterRules({ ...this.selectedFilterRules, attrs });
      this._setAttrsChildSelected();
    },
    /**
     * 重置筛选条件
     */
    resetEvent() {
      this.removeFilterRules();
      this._setAttrsChildSelected();
    },
    /**
     * 确认筛选
     */
    confirmEvent() {
      this.setIsNeedFilter(true);
      wx.navigateBack({
        delta: 1
      });
    },
    _getPageData() {
      api.getScreening(this.classId).then(res => {
        this.brandsList = res.Data.Brands;
        this.attrsList = res.Data.AttrGroups;
        this._setAttrsChildSelected();
        this.lPrice = res.Data.LPrice;
        this.uPrice = res.Data.UPrice;
      });
    },
    /**
     * 处理其他条件列表的选中状态
     */
    _setAttrsChildSelected() {
      let attrsList = this.attrsList;
      if (this.selectedFilterRules.attrs.length <= 0) {
        attrsList.forEach(ele => {
          ele.Attrs.forEach(child => {
            child.isSelected = false;
          });
        });
      } else {
        attrsList.forEach(ele => {
          ele.Attrs.forEach(child => {
            child.isSelected = false;
          });
          this.selectedFilterRules.attrs.forEach(aItem => {
            if (aItem.groupId == ele.GroupId) {
              //是同一组
              ele.Attrs.forEach(child => {
                if (aItem.wordId == child.WordId) {
                  child.isSelected = true;
                } else {
                  child.isSelected = false;
                }
              });
            }
          });
        });
      }
      this.attrsList = attrsList;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 55px;
  box-sizing: border-box;
}
.rule-item-box {
  padding: 15px 15px 10px;
  border-bottom: 0.5px solid #dcdcdc;
  .title {
    font-size: 16px;
    padding-bottom: 15px;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      margin: 0 10px 10px 0;
      font-size: 13px;
      padding: 5px 10px;
      color: #888;
      // border: .5px solid #dcdcdc;
      // border-radius: 20px;
      border-radius: 5px;
      background: #f7f7f7;
      &.selected {
        // border-color: #cab894;
        background: #cab894;
        color: #fff;
      }
    }
  }
  .price-region {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    input {
      background: #f7f7f7;
      text-align: center;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      flex: 1;
    }
    .text {
      margin: 0 10px;
    }
  }
}

.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
}
</style>