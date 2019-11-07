<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title">运费规则说明<img class="icon" src="/static/images/icon_cart_tips_close.png" @click="hideEvent"/></p>
    <img class="img" src="http://192.168.117.39:2010/userdir/publicimages/%E6%BB%A180%E5%8C%85%E9%82%AE-.jpg"/>
  </bottom-flip>
</template>

<script>
import bottomFlip from "@/components/bottomFlip";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components:{
    bottomFlip
  },
  watch:{
    isShow:{
      handler: function(val){
        //父与子组件同步isShow值
        this.$emit('update:isShow', val)
      },
      immediate: true
    }
  },
  methods:{
    hideEvent(){
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  position: relative;
  padding: 12px 0;
  font-size: 16px;
  text-align: center;
  .icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    z-index: 1;
    display: block;
    width: 12px;
    height: 12px;
  }
}

.img{
  display: block;
  width: 261px;
  height: 111px;
  margin: 0 auto;
}
</style>