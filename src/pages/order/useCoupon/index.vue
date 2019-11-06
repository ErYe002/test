<template>
  <div>
    <div class="topInputView">
      <input class="input" :value="couponInputNo" v-model="couponInputNo" placeholder="请输入优惠券码"  type="text" confirm-type="done" >
      <div class="sureButton" @click="confirmCouponNo"><span>确定</span></div>
    </div>
    <div class="item" v-for="(item, idx) in coupons" :key="idx">
      <div class="couponbg" :data-id='item.CouponNo' :data-valid='item.IsEffective' @click="selectCoupon">
        <view class="checked-box" >
          <img v-if="couponNo == item.CouponNo" src="" />
          <view v-else class="no-checked"></view>
        </view>
        <div class="couponLeft">
          <div class="couponLeftTitle">￥{{item.DiscountAmount}}</div>
          <div class="couponLeftSubTitle">{{item.SatisfactionAmountContent}}</div>
        </div>
        <div class="couponRight">
          <div class="couponTitle">{{item.Description}}</div>
          <div class="couponSubtitle">{{item.UseStartTime}}</div>
          <div class="couponSubtitle">{{item.UseEndTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/cart";

export default {
  data(){
    return { 
      coupons:[],
      couponInputNo:'',
      couponNo:'',
      shopId: '1',
    }
  },
  onLoad: function (options) {
    if (options) {
      console.log(options)
      this.shopId = options.shopId
      this.couponNo = options.couponNo;
      api.getCanUseCouponsInOrder( this.shopId).then(({ Data }) => {
        console.log(Data)
        this.coupons = Data;
        this._setFreight()
      })
    }
  },
  methods: {
  // getCanUseCouponsInOrder    
    //选择优惠券
    selectCoupon(e){
      console.log(e)
      if (e.currentTarget.dataset.valid) {
        this.useCoupon(e.currentTarget.dataset.id);
      }
    },
    // 输入优惠券码
    confirmCouponNo(){
      console.log('------ ' + this.couponInputNo)
      if (this.couponInputNo.length) {
        this.useCoupon(this.couponInputNo)
      }else{
        wx.showToast({
          title: '请输入优惠券码', //提示的内容,
          icon: 'none',
        });
      }
    },
    //使用优惠券
    useCoupon(couponNo){
      console.log('==========')
      console.log(couponNo)
      api.useCoupon(couponNo).then(({State, Data,Msg}) => {
        if (State){
          wx.navigateBack({
            delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
          });
        }else{
          wx.showToast({
            title: Msg,
            icon: 'none',
          }); 
        }
      })
    },


  }

};
</script>


<style lang="less">
page {
  padding-bottom: 160rpx;
  background: #ededed;
}
.topInputView {
  height: 120rpx;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
}
.input {
  height: 70rpx;
  width: 100%;
  margin-left: 20rpx;
  border: 1rpx solid #000;
  font-size: 28rpx;
  text-align: center;
}
.sureButton {
  width: 180rpx;
  height: 72rpx;
  margin-right: 20rpx;
  background: #000;
  font-size: 28rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  margin: 20rpx;
  height: 200rpx;
}
.couponbg {
  display: flex;
  align-items: center;
  height: 140rpx;
}
.couponLeft {
  width: 30%;
  height: 100%;
  justify-content: center;
  background: #fff;
  .couponLeftTitle {
    margin-top: 20rpx;
    text-align: center;
    margin-bottom: 20rpx;
    font-size: 36rpx;
    font-weight:bold;
  }
  .couponLeftSubTitle {
    font-size: 20rpx;
    text-align: center;
    color: #999;
  }
}

.couponRight {
  width: 70%;
  height: 100%;
  padding-left: 30rpx;
  font-size: 28rpx;
  color: #999;
  background: #fff;
  .couponTitle{
    margin-top: 10rpx;
    margin-bottom: 20rpx;
  }
  .couponSubtitle {
    font-size: 20rpx;
  }
}

.checked-box {
  width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffaaa0;
}
.no-checked {
  display: block;
  width: 24rpx;
  height: 24rpx;
  box-sizing: border-box;
}

</style>
