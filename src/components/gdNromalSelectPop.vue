<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
      <b>选择参数</b>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </p>

    <scroll-view scroll-y="true" class="item-list" :scroll-top="scrollHeight">
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

    <div class="sell-out-text">
      {{sellOutMsg}}
    </div>

    <div style="display: flex;height: 50px;width: 100%">
      <div class="btn-confirm-sellout" @click="showArriveMsg" v-if="sellOut">
        到货通知
      </div>
      <div class="btn-confirm" @click="disMissPoo" v-else>
        确定
      </div>
      <div class="btn-confirm" @click="disMissPoo" v-if="sellOut && saleStockType==='1'">
        继续购买
      </div>
    </div>
  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";
  import api from "@/api/attr";

  export default {
    name: "gd-nromal-select-pop",
    props: {
      isShow: {type: Boolean, default: false},
      sphList: [],
      cylList: [],
      axisList: [],
      saleStockType: '',
      selectSph: '',
      selectCyl: '',
      selectAxis: '',
      selectSphPosition: {type: Number, default: -1},
      selectCylPosition: {type: Number, default: -1},
      selectAxisPosition: {type: Number, default: -1}

    },
    data() {
      return {
        sphSelectPosition: -1,
        cylSelectPosition: -1,
        axisSelectPosition: -1,
        sellOut: false,
        sellOutMsg: "",
        isConfirmedBuy: false,
        scrollHeight: 0
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
            this.isConfirmedBuy = false;
            console.log(this.selectSphPosition,
              this.selectCylPosition,
              this.selectAxisPosition);
            this.sphSelectPosition = this.selectSphPosition;
            this.cylSelectPosition = this.selectCylPosition;
            this.axisSelectPosition = this.selectAxisPosition;

            this.scrollHeight = 0;


            for (let i = 0; i < this.sphList.length; i++) {
              let item = this.sphList[i];
              if (item.Value === this.selectSph) {
                this.sphSelectPosition = i;
              }
            }

            for (let i = 0; i < this.cylList.length; i++) {
              let item = this.cylList[i];
              if (item.Value === this.selectCyl) {
                this.cylSelectPosition = i;
              }
            }

            for (let i = 0; i < this.axisList.length; i++) {
              let item = this.axisList[i];
              if (item.Value === this.selectAxis) {
                this.axisSelectPosition = i;
              }
            }
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
          /*if ('2' === this.saleStockType) {

          }*/
          this.sellOut = this.sphList[index].IsOutStock;
          this.sellOutMsg = this.sphList[index].OutStockMessage;
          // if (this.sphList[index].IsOutStock) {
          // }
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

        if (this.cylList.length > 0) {
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

        if (this.saleStockType === '1' && this.sellOut) {
          this.isConfirmedBuy = true;
        }

        this.$emit('backData', {
          selectSPHPosition: this.sphSelectPosition,
          selectCYLPosition: this.cylSelectPosition,
          selectAXISPosition: this.axisSelectPosition,
          // isConfirmedBuy: this.isConfirmedBuy
        });

        this.hideEvent();

      },
      showArriveMsg() {
        let cutem = this.sphList[this.sphSelectPosition];
        api.arrivalStockNotice(cutem.RealGoodsId, cutem.Id).then(({Data}) => {
          console.log('到货通知成功');
        });
        wx.showModal({
          title: '提示',
          content: '商品到货后，小可会第一时间给您发送APP消息通知，请注意查看',
          icon: "none",
          confirmText: '知道了',
          confirmColor: '#CAB894',
          showCancel: false
        });
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
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .btn-confirm-sellout {
    color: white;
    background-color: #F7B500;
    font-size: 15px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex: 1;
  }

  .sell-out-text {
    font-size: 12px;
    color: red;
    margin-left: 15px;
    height: 30px;

  }

</style>

