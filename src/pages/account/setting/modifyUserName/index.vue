<template>
  <article>
   <section>
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
      <div class="btn-submit" @click="_changeUserName">保存</div>
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
        console.log("用户名不能为空。")
        return;
      }
      api.changeUserName(this.message).then(({State, Msg}) => {
        console.log("修改用户名成功！");
        mpvue.navigateBack({url: "/pages/account/setting/userInfo/main"});
      });
    }
  }
}
</script>

<style lang="less" scoped>
.modify-box{
    height: 50px;
    display: flex;
    align-items: center;
    
    border-bottom: solid 1px #dcdcdc;
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
  margin-top: 25px;
  color: #888;
  font-size: 12px;
  padding-left: 10px;
}
.btn-box{
  position: fixed;
  // height: 55px;
  width: 100%;
  bottom: 0px;
  .btn-submit{
    height: 55px;
    line-height: 50px;
    background-color: #cab894;
    border: 1px solid #cab894;
    color: #fff;
    text-align: center;
  }
}
</style>