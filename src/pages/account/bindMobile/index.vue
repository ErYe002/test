<template>
  <article class="wrap">
    <div class="line-box">
      <input
        placeholder="手机号"
        type="number"
        v-model="phone"
        maxlength="11"
      />
    </div>
    <div v-if="isShowImgCode" class="line-box imgcode-box">
      <input placeholder="图片验证码" v-model="imgCode" maxlength="6" />
      <image class="img" :src="imgCodeSrc" @click="getImgCodeSrc" />
    </div>
    <div class="line-box code-box">
      <input placeholder="验证码" type="number" v-model="code" maxlength="6" />
      <div class="btn" @click="getCode">获取验证码</div>
    </div>
    <div class="error-box">{{errorMsg}}</div>
    <div class="line-box btn-box">
      <div class="btn" @click="bindMobile">绑定手机</div>
    </div>
    <div class="tips-box">
      <text>为确保购物安全及更好的购物体验，请绑定手机号</text>
    </div>
  </article>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
        phone: '',
        imgCode: '',
        imgCodeSrc: '',
        imgCodeUid: '',
        code: '',
        isShowImgCode: false,
        errorMsg: ''
    };
  },

  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang="less">
.wrap {
  padding: 0 30rpx;
  font-size: 30rpx;
}

.line-box input {
  border-bottom: 1px solid #dcdcdc;
  padding: 15rpx;
}

.line-box.code-box,.line-box.imgcode-box {
  position: relative;
}

.line-box.code-box input{
  position: relative;
  z-index: 1;
}

.line-box.code-box .btn {
  position: absolute;
  z-index: 3;
  right: 15rpx;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  font-size: 28rpx;
  color: #666;
}

.line-box.btn-box{
  margin-top: 60rpx;
}

.line-box.btn-box .btn{
  width: 100%;
  background: #CAB894;
  color: #fff;
  border-radius: 5rpx;
  text-align: center;
  padding: 20rpx 0;
  &:active{
      background: lighten(#CAB894, 5%)
  }
}

.tips-box{
  color: #bbb;
  font-size: 24rpx;
  margin-top: 30rpx;
}

.line-box.imgcode-box{
  width: 70%;
}

.line-box.imgcode-box input{
  width: calc(100% - 230rpx);
}

.line-box.imgcode-box .img{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(0,-50%,0);
  width: 180rpx;
  height: 60rpx;
}

.error-box{
  margin-top: 50rpx;
  font-size: 26rpx;
  color: #ff7c7c;
}
</style>
