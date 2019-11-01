<template>
  <article class="wrap">
    <img src="/static/images/about.jpg" class="logo" />
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
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      partnerId: "",
      isNewUser: false
    };
  },
  onLoad: function(options) {
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
    ...mapActions('user', ['setToken']),
    getPhonenumber(e) {
    if (e.mp.detail.errMsg.indexOf('ok') != -1) {
        // 将加密数据传递给API进行解密并登录
        api.bindMobileForMinProgram(this.isNewUser, this.partnerId, e.mp.detail.encryptedData, e.mp.detail.iv, this.sessionKey).then(({ Data }) => {
          //登录完成保存token到本地
          this.setToken(Data.Token)
          wx.showToast({
            title: '登录成功',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        })
      }
    },
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
