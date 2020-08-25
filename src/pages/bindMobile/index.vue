<template>
  <article class="wrap">
    <img src="https://pic.keede.com/WeChat/xiaochengxu/about.jpg" class="logo" />
    <button
      class="btn"
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="getPhonenumber"
    >
      <img src="/static/images/icon_wechat_logo.png" />
      <text>微信登录</text>
    </button>
  </article>
</template>

<script>
import api from '@/api/user'
import wxadApi from "@/api/wxad"
import utils from '@/utils'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      partnerId: "",
      isNewUser: false
    };
  },
  onLoad: function(options) {
    this.wxadDealIdTime();//判断是否是在广告有效时间转化 目前默认30分钟 30*60=1800s
    if (options && options["partnerId"] && options["isNewUser"]) {
      this.isNewUser = options["isNewUser"]
      this.partnerId = options["partnerId"]
    } else {
      wx.showModal({
        title: "提示",
        content: "参数缺失，请返回重试！",
        showCancel: false,
        confirmColor: "#cab894",
        success() {
          //返回上一页
          wx.navigateBack({
            delta: 1
          });
        }
      });
    }
  },
  computed:{
    ...mapState('wxinfo', ['sessionKey'])
  },
  methods: {
    ...mapActions('user', ['setToken','setUserId','setFirstGift']),
    getPhonenumber(e) {
    if (e.mp.detail.errMsg.indexOf('ok') != -1) {
        // 将加密数据传递给API进行解密并登录
        api.bindMobileForMinProgram(this.isNewUser, this.partnerId, e.mp.detail.encryptedData, e.mp.detail.iv, this.sessionKey).then(({ Data }) => {
          //登录完成保存token到本地
          this.setToken(Data.Token)
          this.setUserId(Data.UserId)
          this.setFirstGift(Data.FirstGift)
          wx.showToast({
            title: '登录成功',
            duration: 2000
          })
          this.wxadInfo();
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        })
      }
    },
    //微信广告行为转化统计  确认有效销售线索CONFIRM_EFFECTIVE_LEADS  === 用户新注册数
    wxadInfo(){
      let that = this
      let click_id = wx.getStorageSync("click_id");
      if(click_id){
          wxadApi.wxadCallbckData(
            null,
            null,
            utils.getCurrentPageUrl(),
            click_id,
            null,
            "CONFIRM_EFFECTIVE_LEADS"
          ).then(res=>{
            console.log(res,"回传行为转换返回参数状态--注册")
          })

      }
    },
      //微信广告处理click_id缓存时间是（否在有效时间内转化）
    wxadDealIdTime(){
      let timesync = wx.getStorageSync("click_id_time");
      if(timesync){
        let timeNow = new Date();
        let temp = (timeNow -  timesync)/1000;//换算成秒
        if(temp>1800){
            wx.removeStorageSync("click_id")
            wx.removeStorageSync("click_id_time")
        }
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  padding: 139px 0;
  box-sizing: border-box;
}
.logo {
  display: block;
  width: 150px;
  height: 45.5px;
  margin: 0 auto 100px;
}
.btn {
  width: 275px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.btn image {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
