<template>
  <article>
  <section>
    <div class="modify-box">
      <label>昵称</label>
      <input
        class="txt"
        v-model="message"
        placeholder="请输入昵称"
      />
      <span
        class="btn-clear"
        v-on:click="_clearMsg"
      >
        <img 
          class="clear-icon"
          src="/static/images/clear-icon.png"
        />
      </span>
    </div>
    <div class="description-box">
      4-20个字符，可由中英文、数字、“_”、“-”组成
    </div>
  </section>
    <section class="btn-box">
      <div class="btn-submit" @click="_setUserNick">保存</div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      message: ""
    }
  },
  onLoad(options){
    if(options != null && options.nick != null){
      this.message = options.nick;
    }
  },
  methods:{
    _clearMsg: function(){
      this.message = "";
    },
    _setUserNick: function(){
      if(this.message == null || this.message == ""){
        console.log("昵称不能为空。")
        return;
      }
      api.setUserNick(this.message).then(({State, Msg}) => {
        console.log("修改用户昵称成功！");
        mpvue.navigateBack({url: "/pages/account/setting/userInfo/main"});
      });
    }
  }
}
</script>

<style lang="less" scoped>
.modify-box{
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #dcdcdc;
    label{
        width: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
    }
    .txt{
        flex: 1;
        height: 48px;
        padding-top: 2px;
        font-size: 14px;
        color:#888;
    }
    .btn-clear{
        width: 40px;
        height: 50px;
        .clear-icon{
            width: 20px;
            height: 20px;
            margin-top: 15px;
            margin-left: 10px;
        }
    }
}
.description-box{
    margin-top: 25px;
    padding-left: 10px;
    font-size: 12px;
    color: #888;
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