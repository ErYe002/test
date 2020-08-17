<template>
  <article class="wrap">
    <section class="search-box">
      <div class="jifen-box">
        <img src="/static/images/index_jifen.png"  alt="" class="jifen">
        <span v-if="token" class="jifen-text">{{jifentext}}</span>
      </div>
      <a href="/pages/search/index/main" class="flex-wrap">
        <img src="/static/images/icon_search_black.png" class="icon" />
        <span class="text">{{SearchKeyword}}</span>
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
          
        >
          <navigator open-type="navigate" target="miniProgram" app-id="wxbb2e8b1089947444" version="release" @fail="openMiniFail" class="link" v-if="item.SeoCode == 'pt_type'">
            <b>{{item.Name}}</b>
            <!-- <em>{{item.EnName}}</em> -->
          </navigator>
          <block v-else-if="item.SeoCode=='svip_type'">
            <button v-if="!token" open-type="getUserInfo" @getuserinfo="getUserInfo" class="link button_s">
              <b>{{item.Name}}</b>
            </button>
            <div v-else class="link" @click="changeIndexEvent(item.TargetUrl)">
                <b>{{item.Name}}</b>
            </div>
          </block>

          <div class="link" v-else @click="changeIndexEvent(item.TargetUrl)">
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
import { mapState } from "vuex";
import api from "@/api";
import userapi from "@/api/user";
import utils from "@/utils";
import authorization from "@/utils/authorization";
const TDSDK = require('../../../static/tdsdk/tdweapp'); 

export default {
  data() {
    return {
      menu: [],
      currentMenuCode: 'code001',
      SearchKeyword:"",
      jifentext:"0"
    };
  },
   computed: {
    ...mapState("user", ["token"])
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
    getUserInfo(e) {
      let that = this;
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
        wx.navigateTo({
          url:
            "/pages/svip/dredgeSvip/main"
        });
      });
    },
    _getMenuData() {
      api.getHomePageData().then(({ Data }) => {
        let list = Data.ChannelList
        .map((ele) => {
          if(ele.TargetUrl.indexOf("wechatgroupindex")!=-1){
            ele.SeoCode = "pt_type"
          }
          if(ele.TargetUrl.indexOf("BuySvip")!=-1){
            ele.SeoCode = "svip_type"
          }
          return ele
        })
        list = list.filter(el=>{return el.TargetUrl!="code050" })
        this.menu = list;
        this.SearchKeyword = Data.SearchKeyword?Data.SearchKeyword:"";
        this.currentMenuCode = this.menu[0]["TargetUrl"];
        
      });
    },
    changeIndexEvent(code){
      if(code == 'code000'||code == 'code050'||code == 'code200'||code == 'code100'||code == 'code150'||code == 'code001'){
        this.currentMenuCode = code
      }else if(code == 'code210'){
         wx.showModal({
          title:"提示",
          showCancel:false,
          content:"请下载可得APP体验，谢谢"
        })
        return false
      }
      else{
        this.$navigateTo(code)
        console.log("跳转到活动页", code);
        // //跳转还需把/event/替换为/templatefornewapp/，目的是为了去除网页顶部的返回栏
        // code = code.replace(/^\/event\//, "/templatefornewapp/");
        // wx.navigateTo({ url: "/pages/htmlPreview/main?path=" + code });
      }
    },
    openMiniFail(e){
      console.log('失败', e)
    },
    getWalletOfPersonnel(){
      userapi.getWalletOfPersonnel().then(({Data})=>{
        if(Data&&Data.Score>0){
          let score = Math.floor(Data.Score).toString();
          if(score.length>3){
            score = score.substr(0,score.length-3)+"k+"
          }
          this.jifentext = score
        }
      })
    }
  },
  onLoad(){
    //td统计
    TDSDK.Event.event({id: '首页'})
    //kede行为统计
    this.$onInformationCollection({
        token:"WeChat",
        uid:wx.getStorageSync('USERID'),
        opentype:"view",
        time:Date.now().toString(),
        page:utils.getCurrentPageUrl(),
        eventname:"首页",
        eventval:""
      })
  },
  onHide(){
    this.currentMenuCode = "";
  },
  onShow() {
    this._getMenuData();
    this.getWalletOfPersonnel()
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
  .jifen-box{
    position: relative;
    .jifen-text{
      position: absolute;
      left: -2px;
      top: -2px;
      background: #FEE002;
      font-size: 8px;
      width: 30px;
      height: 10px;
      border-radius: 5px;
      text-align: center;
      line-height: 10px;
    }
  }
  .jifen{
    width: 26px;
    height: 26px;
    margin-right: 5px;
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

.button_s{
  margin: 0;
  padding: 0;
  background: transparent;
}
</style>
