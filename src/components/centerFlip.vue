<template>
  <article :class="{'bottomflip-box': true, 'show': isShow}">
    <div class="bf-cover-bg" @click="hide"></div>
    <div class="bf-container">
      <slot></slot>
    </div>
  </article>
</template>

<script>
export default {
  
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // show(){
    //   this.isShow = true
    // },
    hide() {
      this.$emit('update:isShow', false)
      this.$emit('hide') //事件回调
    }
  }
};
</script>

<style lang="less" scoped>
/*底部弹出层*/
.bottomflip-box {
  position: relative;

  .bf-cover-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: none;
  }

  .bf-container {
   
    display: none;
  }

  &.show {
    .bf-cover-bg {
      display: block;
    }
    .bf-container {
      display: block;
    }
  }
}
</style>