<template>
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
</template>

<script>
export default {
  data(){
    return{
      message:""
    }
  },
  methods: {
    _clearMsg: function(){
        this.message = ""
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
</style>