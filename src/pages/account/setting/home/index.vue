<template>
  <article class="contain">
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
          用户名:{{userInfoModel.UserName}}
        </p>
      </div>
      <img
        class="go-right-icon"
        src="/static/images/icon_right_grey.png"
      />
      </a>
    </section>
    <section class="setting">
        <p class="line">
            <a href="/pages/account/address/addressList/main">
                地址管理
                <img
                    class="go-right-icon"
                    src="/static/images/icon_right_grey.png"
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
                src="/static/images/icon_right_grey.png"
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
    ...mapActions('user', ['removeToken',"removeUserId"]),
    logoutEvent(){
      this.removeToken()
      this.removeUserId()
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
.contain{
  background: #F2F2F2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  padding: 0 10px;
}
.user-box {
  margin-top: 10px;
  font-size: 12px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  a{
    display: flex;
    align-items: center;
    padding: 10px;
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
      font-size: 14px;
    }
    .sex {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-left: 5px;
    }
    .name {
      color: #8B8B8B;
      font-size: 11px;
      height: 14.5px;
      margin-top: 5px;
    }
  }
}
.setting{
  font-size: 14px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 10px;
  .line{
    height: 50px;
    line-height: 50px;
    border-bottom: 0.5px solid #CCCCCC!important;
    a{
      padding-left: 10px;
    }
    .tips {
        font-size: 13px;
        display:inline-block;
        width: 100px;
        height: 50px;
        position: absolute;
        right: 40px;
        color: #888888;
        text-align: right;
    }
    &:last-child {
      border: 0 !important;
    }
  }
}
.logout{
  background: #fff;
  border-radius: 10px;
    a {
        display: block;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #FF668E;
    }
}
.go-right-icon {
      position: absolute;
      right: 21px;
      display: inline-block;
      height:12px;
      width: 7.5px;
      margin-top: 20px;
  }
</style>