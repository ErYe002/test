<template>
  <article>
    <section class="user-box">
      <a href="/pages/account/setting/userInfo/main">
      <img
        class="head"
        :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'"
      />
      <div class="info-box">
        <p class="nick">
            <label>{{userInfoModel.Nick}}</label>
            <img
              class="sex" 
              :src="userInfoModel.Sex=='男'?'/static/images/man-icon.png':'/static/images/woman-icon.png'"
            />
        </p>
        <p class="name">
          {{userInfoModel.UserName}}
        </p>
      </div>
      <img
        class="go-right-icon"
        src="/static/images/icon_jt_rt.png"
      />
      </a>
    </section>
    <section class="setting">
        <p class="line">
            <a href="/pages/account/address/addressList/main">
                地址管理
                <img
                    class="go-right-icon"
                    src="/static/images/icon_jt_rt.png"
                />
            </a>
        </p>
        <p class="line">
            <a
              href="/pages/account/setting/role/main"
            >
              会员等级
              <span class="tips">多重福利优惠</span>
              <img
                class="go-right-icon"
                src="/static/images/icon_jt_rt.png"
              />
            </a>
        </p>
    </section>
    <section class="logout">
        <a
        @click="logoutEvent"
        >
          退出登录
        </a>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      userInfoModel:{
        UserName:"",
        Nick: "",
        LevelNum: 0,
        sex: "",
        HeadUrl:""
      }
    }
  },
  onLoad(){
    this._getPersonnelProfile()
  },
  methods:{
    ...mapActions('user', ['removeToken']),
    logoutEvent(){
      this.removeToken()
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    _getPersonnelProfile(){
      api.getPersonnelProfile().then(({Data}) => {
        this.userInfoModel = {
          UserName: Data.UserName,
          Nick: Data.Nick,
          LevelNum: Data.RoleId,
          Sex: Data.Sex,
          HeadUrl: Data.HeadUrl
        };
        // console.log(JSON.stringify(Data));
      })
    }
  }
}
</script>

<style lang="less">
.user-box {
  font-size: 12px;
  border-bottom: 15rpx solid #e5e5e5!important;
  padding: 10px;
  a{
    display: flex;
    align-items: center;
    .go-right-icon{
      margin-top: 0px;
    }
  }
  .head {
    display: block;
    width: 64px;
    height: 64px;
    // margin-left: 30px;
    border-radius: 50%;
  }
  .info-box {
    margin-left: 10px;
    .nick{
      display: flex;
    }
    .sex {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-left: 5px;
    }
    .name {
      height: 14.5px;
      margin-top: 5px;
      width: 55px;
    }
  }
}
.setting{
  font-size: 14px;
  border-bottom: 15rpx solid #e5e5e5!important;
  .line{
    height: 50px;
    line-height: 50px;
    border-bottom: 2rpx solid #e5e5e5!important;
    a{
      padding-left: 10px;
    }
    .tips {
        display:inline-block;
        width: 100px;
        height: 50px;
        position: absolute;
        right: 30px;
        color: #888888;
        text-align: right;
    }
  }
}
.logout{
    border-bottom: 15rpx solid #e5e5e5!important;
    a {
        display: block;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
    }
}
.go-right-icon {
      position: absolute;
      right: 11px;
      display: inline-block;
      height:14px;
      width: 8px;
      margin-top: 18px;
  }
</style>