<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
      <b>选择参数</b>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </p>

    <scroll-view scroll-y="true" class="item-list">
      <div>
        <span class="sph select" @click="changeTypeEvent(1)" v-if="sphList.length>0">
        光度 SPH
        </span>

        <div class="item-layout">
          <div v-for="(item,index) in sphList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="sphList.length>0">
            <div :class="{'item-gd':true,'select':sphSelectPosition===index}" @click="selectEvent('S',index)">
              {{item.Value}}
            </div>
          </div>
        </div>

        <span class="sph select" @click="changeTypeEvent(1)" v-if="cylList.length>0">
        散光 CYL
        </span>

        <div class="item-layout" v-if="cylList.length>0">
          <div v-for="(item,index) in cylList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
               >
            <div :class="{'item-gd':true,'select':cylSelectPosition===index}" @click="selectEvent('C',index)">
              {{item.Value}}
            </div>
          </div>
        </div>

        <span class="sph select" @click="changeTypeEvent(1)" v-if="axisList.length>0">
        轴位 AXIS
        </span>

        <div class="item-layout" v-if="axisList.length>0">
          <div v-for="(item,index) in axisList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
               >
            <div :class="{'item-gd':true,'select':axisSelectPosition===index}" @click="selectEvent('A',index)">
              {{item.Value}}
            </div>
          </div>
        </div>
      </div>

    </scroll-view>

    <div class="btn-confirm" @click="disMissPoo">
      确定
    </div>
  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";

  export default {
    name: "gd-nromal-select-pop",
    props: {
      isShow: {type: Boolean, default: false},
      gdList: [],
      sphList: [],
      cylList: [],
      axisList: [],
    },
    data() {
      return {
        sphSelectPosition: -1,
        cylSelectPosition: -1,
        axisSelectPosition: -1

      };
    },

    components: {
      bottomFlip
    },

    watch: {
      isShow: {
        handler: function (val) {
          //父与子组件同步isShow值
          this.$emit('update:isShow', val);
          if (val === true) {

          }
        }
      },
    },
    methods: {
      hideEvent() {
        this.$emit('update:isShow', false)
      },
      selectEvent(side, index) {
        if (side === 'S') {
          this.sphSelectPosition = index;
        } else if (side === 'C') {
          this.cylSelectPosition = index;
        } else if (side === 'A') {
          this.axisSelectPosition = index;
        }
      },
      disMissPoo() {
        if (this.sphSelectPosition === -1) {
          wx.showToast({
            title: "请选择光度",
            icon: "none"
          });
          return;
        }

        if (this.gdList.length > 1) {
          if (this.cylSelectPosition === -1) {
            wx.showToast({
              title: "请选择散光",
              icon: "none"
            });
            return;
          } else if (this.axisSelectPosition === -1) {
            wx.showToast({
              title: "请选择轴位",
              icon: "none"
            });
            return;
          }

        }

        this.$emit('backData', {
          selectSPHPosition: this.sphSelectPosition,
          selectCYLPosition: this.cylSelectPosition,
          selectAXISPosition: this.axisSelectPosition,
        });

        this.hideEvent();

      }
    }
  };
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

  .item-list {
    max-height: 350px;
    height: 350px;

    .sph {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 30px;
      font-size: 15px;
      color: #cab894;
      background-color: white;
      margin: 10px;
      &.select {
        color: white;
        background-color: #cab894;
      }
    }

    .item-layout {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 5px;
      .item-gd {
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: #c7c7c7 solid 1px;
        color: #6b6b6b;

        &.select {
          color: #cab894;
          border: #cab894 solid 1px;
        }
      }
    }

  }

  .btn-confirm {
    color: white;
    background-color: #cab894;
    font-size: 15px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

