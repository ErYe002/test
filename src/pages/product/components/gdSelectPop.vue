<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
      <b>选择参数</b>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </p>
    <!--近视-->

    <div class="type-choose-sph">
      <span class="sph select">
        近视 SPH
      </span>
      <span class="sph">
        远视/老光 SPH
      </span>
    </div>
    <section>
      <scroll-view scroll-y="true" class="item-list">
        <div class="list-layout">
          <div v-for="item in gdlist" style="padding:5px;box-sizing:border-box;width: 20%">
            <div class="item-gd">
              0.00
            </div>
          </div>

        </div>

      </scroll-view>
    </section>

    <!--远视-->


    <!--底部按钮-->
    <div class="btm-layout">

      <div class="bottom-btn yellow">
        下一步
      </div>

      <div class="bottom-btn black">
        上一步
      </div>

    </div>
  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";


  export default {
    name: "gd-select-pop",

    props: {
      isShow: {type: Boolean, default: false}
    },
    data() {
      return {
        gdlist: [1, 2, 3, 4, 6, 7, 8, 9]
      };
    },

    components: {
      bottomFlip
    },

    watch: {
      isShow: {
        handler: function (val) {
          //父与子组件同步isShow值
          this.$emit('update:isShow', val)
          if (val == true) {

          }
        },
        immediate: true
      }
    },
    hideEvent() {
      this.$emit('update:isShow', false)
    },


    methods: {}
  }
</script>

<style lang="less" scoped>
  .title-box {
    position: relative;
    padding: 12px 0;
    font-size: 16px;
    text-align: center;
    .icon-close {
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

  .type-choose-sph {
    display: flex;
    padding-left: 15px;
    .sph {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 30px;
      font-size: 15px;
      color: #cab894;
      background-color: white;
      margin: 20px 0 0 0;
      border: #cab894 solid 1px;
      &.select {
        margin: 20px 10px 0 0;
        color: white;
        background-color: #cab894;
      }
    }
  }

  .list-layout {
    display: flex;
    padding: 20px 10px;
    flex-wrap: wrap;
    .item-gd {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: #c7c7c7 solid 1px;
      color: #6b6b6b;
    }
  }

  .btm-layout {
    display: flex;
    width: 100%;
    height: 50px;
    .bottom-btn{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      color: white;
      &.yellow{
        background-color: #cab894;
      }

      &.black{
        background-color: black;
      }
    }
  }
</style>
