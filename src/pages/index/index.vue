<template>
  <article class="wrap">
    <section class="search-box">
      <a href="/pages/search/index/main" class="flex-wrap">
        <img src="/static/images/icon_search_black.png" class="icon" />
        <span class="text">"改变从选一副眼镜开始"</span>
      </a>
      <a href="/pages/classmenu/main" class="class">
        <img src="/static/images/class_icon.png" alt="" class="class_icon">
        <span class="class_text">分类</span>
      </a>
    </section>
    <section class="nav-box">
      <scroll-view :class="{'nav-list':true,'nav-len1-5':menu.length<=5,'nav-len6':menu.length>5}" scroll-x enable-flex>
        <div
          :class="{'n-item': true, active: item.TargetUrl == currentMenuCode}"
          v-for="item in menu"
          :key="item.Id"
          @click="changeIndexEvent(item.TargetUrl)"
        >
          <navigator open-type="navigate" target="miniProgram" app-id="wxbb2e8b1089947444" version="release" @fail="openMiniFail" class="link" v-if="item.SeoCode == 'code350'">
            <b>{{item.Name}}</b>
            <!-- <em>{{item.EnName}}</em> -->
          </navigator>
          <div class="link" v-else>
            <b>{{item.Name}}</b>
            <!-- <em>{{item.EnName}}</em> -->
          </div>
        </div>
      </scroll-view>
    </section>
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
      menu: [],
      currentMenuCode: 'code001'
    };
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
    _getMenuData() {
      api.getHomePageData().then(({ Data }) => {
        let list = Data.ChannelList
        // .filter((ele) => {
          // return ele.SeoCode == 'code000' || ele.SeoCode == 'code350' || ele.SeoCode == 'code200' || ele.SeoCode == 'code050' 
			    // list.unshift({
          //   Name: "首页",
          //   TargetUrl: 'code-1'        
          // });
        this.menu = list;
        this.currentMenuCode = this.menu[0]["TargetUrl"];
      });
    },
    changeIndexEvent(code){
      if(code == 'code000'||code == 'code050'||code == 'code200'||code == 'code100'||code == 'code150'||code == 'code001'){
        this.currentMenuCode = code
      }else{
        this.$navigateTo(code)
        console.log("跳转到活动页", code);
        // //跳转还需把/event/替换为/templatefornewapp/，目的是为了去除网页顶部的返回栏
        // code = code.replace(/^\/event\//, "/templatefornewapp/");
        // wx.navigateTo({ url: "/pages/htmlPreview/main?path=" + code });
      }
    },
    openMiniFail(e){
      console.log('失败', e)
    }
  },

  onShow() {
    this._getMenuData();
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
