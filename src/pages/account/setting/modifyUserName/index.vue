<template>
  <article class="contain">
   <section class="view-box">
    <div class="modify-box">
      <label>用户名</label>
      <input class="txt" v-model="message" placeholder="最多10个汉字" />
      <span
        class="btn-clear"
        v-on:click="_clearMsg">
        <img 
          class="clear-icon"
          src="/static/images/clear-icon.png"
        />
      </span>
    </div>
    <div class="description-box">
        *用户名仅允许修改1次（您的用户名仅自己可见）
    </div>
  </section>
    <section class="btn-box">
      <div class="kd-btn btn-lg" @click="_changeUserName">保存</div>
    </section>
  </article>
</template>

<script>
import api from "@/api/user"

export default {
  data(){
    return{
      message:""
    }
  },
  onLoad(options){
    if(options != null && options.userName != null){
      this.message = options.userName;
    }
  },
  methods: {
    _clearMsg: function(){
        this.message = ""
    },
    _changeUserName: function(){
      if(this.message == null || this.message == ""){
        wx.showToast({
          title: "用户名不能为空。",
          mask: true
        });
        return;
      }
      api.changeUserName(this.message).then(({State, Msg}) => {
        wx.showToast({
          title: "修改用户名成功！",
          mask: true
        });
        mpvue.navigateBack({url: "/pages/account/setting/userInfo/main"});
      });
    }
  }
}
</script>

<style lang="less" scoped>
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
.view-box{
  border-radius: 10px;
  overflow: hidden;
}
.modify-box{
    height: 80px;
    display: flex;
    align-items: center;
    background: #fff;
    margin-top: 10px;
    border-bottom: solid 1px #dcdcdc;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    label{
        width: 66px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
    }
    .txt{
        color: #888888;
        height: 48px;
        font-size: 14px;
        flex: 1;
        padding-top: 2px;
    }
    .btn-clear{
      width: 40px;
      height: 40px;
      .clear-icon{
        width: 20px;
        height: 20px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
}
.description-box{
  color: #888;
  font-size: 12px;
  padding: 16px 10px;
  background: #fff;
}
.btn-box{
  left: 0;
  position: fixed;
  // height: 55px;
  width: 100%;
  bottom: 0px;
}
</style>