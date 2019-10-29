<template>
  <article>
    <image class="logo" src="/static/images/about.jpg" />
    <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信快捷登录</button>
  </article>
</template>

<script>
import api from "@/api/user";
import { mapActions } from 'vuex'

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions('user', ['setToken']),
    async getUserInfo(e) {
      let sessionKey = await this._wxLogin();
      console.log(sessionKey);
      const encryptedData = e.target.encryptedData;
      const iv = e.target.iv;
      api.appLogin(sessionKey, encryptedData, iv).then(data => {
        // 登录成功
        //未绑定过手机号
        if (!data.Data.IsBindMobile) {
          wx.navigateTo({
            url:
              "/pages/account/bindMobile/main?token=" +
              data.Data.Token +
              "&partnerId=" +
              data.Data.PartnerId +
              "&userId=" +
              data.Data.UserId +
              "&userName=" +
              data.Data.UserName +
              "&userRoleName=" +
              data.Data.UserRoleName +
              "&expiredTime=" +
              data.Data.ExpiredTime +
              "&unionId=" +
              data.Data.UnionId
          });
        } else {
          //绑定过手机号，同步token数据
          this.setToken(data.Data.Token)
        }
      });
    },
    _wxLogin() {
      return new Promise((resolve, reject) => {
        // 登录
        wx.login({
          success: res => {
            // console.log(res.code)
            // 发送 res.code 到后台换取 openId
            api
              .getAppMainInfo(res.code)
              .then(({ Data }) => {
                resolve(Data.session_key);
              })
              .catch(() => {
                reject();
              });
          },
          fail() {
            reject();
          }
        });
      });
    }
  }
};
</script>

<style>
.logo {
  width: 750rpx;
  height: 239rpx;
  margin-top: 100rpx;
}

.btn {
  margin-top: 400rpx;
  border: 1px solid #fff;
  background: #44b549;
  color: #fff;
  font-size: 30rpx;
  font-weight: 700;
  width: 85%;
}
</style>