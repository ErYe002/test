<template>
  <div style="height: 100%">
    <section>
      <div class="menu-pop-toggle-layout" @click="openMenu">
        <span class="text-t6">当前选择：镜片选择</span>
        <img class="ic-up-or-down" src="/static/images/ic_arrow_gray_down.png" v-if="!menuOpened" />

        <img class="ic-up-or-down" src="/static/images/ic_arrow_gray_up.png" v-else />
      </div>
    </section>

    <section class="dropdown-box">
      <div class="trans-bg-60" v-if="menuOpened"></div>
      <div class="pop-group-select-layout" v-if="menuOpened">
        <radio-group class="radio-group" @change="radioChange">
          <radio
            class="radio"
            v-for="item in groupNameList"
            :key="item.value"
            :value="item.value"
            :checked="item.checked"
            :color="'#cab894'"
          >
            <text class="text-group-name">{{item.value}}</text>
          </radio>
        </radio-group>
      </div>
    </section>

    <div class="glass-list-layout">
      <div class="glass-item" v-for="item in atttGlassListData[0].EyeGlassList" :key="item.Seocode">
        <img :src="item.ImageUrl" class="image-goods" />
        <div class="goods-name">{{item.GoodsName}}}</div>

        <div class="price-layout">
          <div class="goods-price">{{item.SellPrice}}</div>

          <a class="ck-detail">查看详情</a>
        </div>
      </div>
    </div>
    <div class="btn-confirm-btm">确定</div>
  </div>
</template>

<script>
import api from "@/api/attr";
import { mapState, mapGetters } from "vuex";

export default {
  name: "glass-select",

  data() {
    return {
      menuOpened: false
    };
  },
  computed: {
    ...mapState("groupGlassList", ["atttGlassListData"]),
    ...mapGetters("groupGlassList", ["groupNameList"])
  },
  methods: {
    radioChange: function(e) {
      console.log("radio发生change事件，携带value值为：", e);
    },
    openMenu() {
      this.menuOpened = !this.menuOpened;
    }
  }
};
</script>

<style lang="less">
page {
  height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
}

.menu-pop-toggle-layout {
  height: 40px;
  width: 100%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  .ic-up-or-down {
    height: 33px;
    width: 33px;
  }
  .text-t6 {
    color: #666666;
    font-size: 14px;
  }
}

.dropdown-box {
  position: fixed;
  top: 40px;
  left: 0;
  height: 100%;
  z-index: 3;
  .trans-bg-60 {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
}

.pop-group-select-layout {
  display: flex;
  flex: 1;
  padding-bottom: 10px;
  background-color: white;
  position: relative;
  z-index: 2;
  .radio-group {
    padding: 0 15px;

    .radio {
      width: 50%;
      margin-top: 5px;
    }
    .text-group-name {
      color: #333333;
    }
  }
}

.btn-confirm-btm {
  height: 50px;
  width: 100%;
  color: white;
  background-color: #cab894;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  z-index: 1;
}

.glass-list-layout {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
  // position: absolute;
  // top: 40px;
  // height: calc(100% - 50px);
  // z-index: -1;

  .glass-item {
    width: calc(50% - 20px);
    margin: 10px 10px 0 10px;
    box-sizing: border-box;
    border: #d9d9d9 solid 1px;
  }
  .image-goods {
    width: 100%;
    height: 158px;
  }

  .goods-name {
    font-size: 12px;
    color: #333333;
    margin: 5px 10px;
    max-lines: 2;
  }

  .price-layout {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 10px 10px;
    .goods-price {
      color: red;
      font-size: 15px;
    }

    .ck-detail {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      width: 60px;
      height: 25px;
      background: #cab894;
      font-size: 12px;
    }
  }
}
</style>
