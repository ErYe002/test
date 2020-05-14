<template>
  <article class="wrap">
    <defaultIndex v-if="currentMenuCode == 'code001'"/>
    <recommend v-if="currentMenuCode == 'code000'"/>
    <oversea v-if="currentMenuCode == 'code050'"/>
    <frames v-if="currentMenuCode == 'code200'"/>
    <meitong v-if="currentMenuCode == 'code100'"/>
    <nurse v-if="currentMenuCode == 'code150'"/>
  </article>
</template>

<script>
import recommend from "./components/recommend";
import oversea from "./components/oversea";
import frames from "./components/frames";
import meitong from "./components/meitong";
import nurse from "./components/nurse";
import defaultIndex from "./components/default";
import api from "@/api";

export default {
  data() {
    return {
      currentMenuCode: 'code001',
    };
  },
  onLoad(option){
    if(option){
      this.currentMenuCode = option.code
      wx.setNavigationBarTitle({
        title: option.name
      })
    }
  },
  components: {
    recommend,
    oversea,
    frames,
    meitong,
    nurse,
    defaultIndex
  },
  methods: {

  },

  onShow() {

  },
    onShareAppMessage(res) {

  }
};
</script>

<style scoped lang="less">
.search-box {
  padding: 10px;
  display: flex;
  align-items: center;
  background: #FF668E;
  .flex-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #c7c7c7;
    border-radius: 20px;
    background: #fff;
    height: 21px;
    flex: 1;
    .icon {
      display: block;
      width: 14.5px;
      height: 14.5px;
      margin: 0 7.5px 0 5px;
    }
    .text {
      font-size: 12px;
      color: #A09E9F;
    }
  }
  .class{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 5px;
    height: 25px;
    .class_icon {
      display: block;
      width: 17.5px;
      height: 17px;
    }
    .class_text {
      font-size: 8.5px;
      color: #fff;
    }
  }
}

.nav-box {
  margin-bottom: 15px;
  .nav-list {
    // display: flex;
    height: 36px;
    // justify-content: space-around;
    // width: 100%;
    // white-space: nowrap;
    .n-item {
      // flex: 1;
      line-height: 36px;
      .link{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        b {
          font-size: 15px;
          color: #040000;
        }
        em {
          font-size: 8.5px;
          color: #595758;
          font-weight: 300;
        }
      }
      &.active {
        box-sizing: border-box;
         border-bottom: 2px solid #000;
        .link{
          b {
          font-weight: bold;
            font-size: 20px;
           
          }
          em {
            display: none;
          }
        }
      }
    }
  }
}
.nav-len1-5{
  display: flex;
  justify-content: space-around;
   .n-item {
      // flex: 1;
   }
}
.nav-len6{
  width: 100%;
  white-space: nowrap;
  display: flex;
    .n-item {
      padding: 0 9px;
      height: 100%;
      // display: inline-block;
   }
}
</style>
