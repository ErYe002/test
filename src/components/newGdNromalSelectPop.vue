<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
        <span class="img">
            <img src="/static/images/logo_text.png" class="img"/>
        </span>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </p>
    <div class="item-title">
      <div>
        <span class="sph-title" v-if="serisItem.length>0">
        颜色
        </span>
        <div class="item-layout" v-if="serisItem.length>0">
          <div v-for="(item,index) in serisItem" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
              >
            <div :class="{'item-gd':true,'select':gid==item.GoodsId}" @click="selectSeriesEvent('S',item.GoodsId,index)">
              {{item.AnotherName}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-view scroll-y="true" class="item-list" :scroll-top="scrollHeight">
      <div>
        <span class="sph" v-if="sphList.length>0">
        度数
        </span>
        <div class="item-layout" v-if="sphList.length>0">
          <div v-for="(item,index) in sphList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
               >
            <div :class="{'item-gd':true,'select':sphSelectId==item.RealGoodsId}" @click="selectEvent('S',item.RealGoodsId,index,item.Value)">
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
      gid:"",
      selectGoodsId:"",
      realGoodsId:""
    },
    data() {
      return {
        sphSelectId: "",
        sellOut: false,
        sellOutMsg: "",
        isConfirmedBuy: false,
        scrollHeight: 0,
        sphList: [],
        serisItem:[],
        sphGoodsId:"",
        specification:""
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
            this.scrollHeight = 0;
            this.sphGoodsId = this.selectGoodsId;
            this.getData()
          }
        }
      },
    },
    methods: {
      hideEvent() {
        this.$emit('update:isShow', false)
      },
      getData(){
        api.getGoodsField(this.gid).then(({Data})=>{
          if(Data!=null){
            this.sphList = Data.GoodsFields[0].Children
            this.serisItem = Data.SeriesItems
            this.checkId();
          }
        })
      },
      checkId(){
        for (let i = 0; i < this.sphList.length; i++) {
          let item = this.sphList[i];
          if (item.RealGoodsId === this.sphGoodsId) {
            this.sphSelectId = item.RealGoodsId;
          }
        }
      },
      selectSeriesEvent(side, Id,index){
        this.gid = Id;
        this.sphSelectId="";
        this.sphGoodsId=""
        this.specification = ""
        this.getData()
      },
      selectEvent(side, RealGoodsId,index,Value) {
        if (side === 'S') {
          this.sphSelectId = RealGoodsId;
          this.specification = Value
          /*if ('2' === this.saleStockType) {

          }*/
          this.sellOut = this.sphList[index].IsOutStock;
          this.sellOutMsg = this.sphList[index].OutStockMessage;
          // if (this.sphList[index].IsOutStock) {
          // }
        }
      },
      disMissPoo() {
        if (this.sphSelectId === "") {
          wx.showToast({
            title: "请选择光度",
            icon: "none"
          });
          return;
        }
        if (this.saleStockType === '1' && this.sellOut) {
          this.isConfirmedBuy = true;
        }
        this.$emit('backData', {
          sphSelectId: this.sphSelectId,
          goodsId:this.gid,
          realGoodsId:this.realGoodsId,
          specification:this.specification
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
      },
      changeTypeEvent(){}
    }
  };
</script>

<style lang="less" scoped>
  .title-box {
    position: relative;
    // padding: 12px 0;
    font-size: 16px;
    text-align: center;
    .img{
        width: 80px;
        height: 80px;
        position: absolute;
        left: 20px;
        top: -25px;
        background: #fff;
        border-radius: 50%;
        display: block;
        position: relative;
        img{
            position: absolute;
            left: 0px;
            top: 0px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
        }
    }
    .icon-close {
      position: absolute;
      right: 12px;
      top: 30%;
      transform: translate3d(0, -50%, 0);
      z-index: 1;
      display: block;
      width: 12px;
      height: 12px;
    }
  }
  .item-title {
    .sph-title{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #000;
      margin: 0 10px;
      font-weight: bold;
    }

    .item-layout {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 5px;
      .item-gd {
        border-radius: 5px;
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        background: #f1f6f7;
        justify-content: center;
        color: #000;
        box-sizing: border-box;

        &.select {
          color: #a60f0c;
          background: #faf2ef;
          border: #a60f0c solid 1px;
        }
      }
    }

  }
  .item-list {
    max-height: 300px;
    height: 300px;

    .sph {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #ea3712;
      margin: 0 10px;
      font-weight: bold;
    }
    .item-layout {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 5px;
      .item-gd {
        border-radius: 5px;
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        background: #f1f6f7;
        justify-content: center;
        color: #000;
        box-sizing: border-box;

        &.select {
          color: #a60f0c;
          background: #faf2ef;
          border: #a60f0c solid 1px;
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

