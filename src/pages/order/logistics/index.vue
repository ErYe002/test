<template>
  <view>
    <block v-for="(item, idx) in model" :key="idx">
      <block v-if="model.PayMode != 0">
        <view class="warehouse-box">
          <view>发货仓库</view>
          <view class="text">{{item.WarehouseName}}</view>
        </view>
        <view class="express-box">
          <view class="title">发货快递</view>
          <view class="e-list">
            <view
              :class="ditem.ExpressId ==SelectedExpressId? 'e-item.active':'e-item'"
              v-for="(ditem, index) in item.Delivers"
              :data-id="ditem.ExpressId"
              :for-item="ditem"
              :key="index"
              @click="changeDeliver"
            >{{ditem.ExpressName}}
            </view>
          </view>
        </view>
        <view class="freight-box">
          <view>快递运费</view>
          <view class="text">¥{{freight}}</view>
        </view>
        <view class="bottom-btn-box">
          <view class="btn" @click="saveChange">确认</view>
        </view>
      </block>
    </block>
  </view>
</template>

<script>

import api from "@/api/cart";
import {mapActions} from "vuex"

export default {
    data: {
    model: [],
    SelectConsigneeId: '',
    SelectedExpressId:'',
    shopId: 1,
    freight: 0,
    IsSingleGoodsBuy:false
  },
  onLoad: function (options) {
    if (options) {
      this.SelectConsigneeId = options.SelectedConsigneeId
      this.SelectedExpressId = options.SelectedExpressId
      this.shopId = options.ShopId
      this.IsSingleGoodsBuy = options.IsSingleGoodsBuy;
      api.getPaymentAndDelivery(this.SelectConsigneeId, this.shopId).then(({ Data }) => {
        // console.log(Data)
        this.model = Data;
        this._setFreight()
      })
    }
  },
  methods: {
    ...mapActions("order",["setSelectedExpressId"]),
    changeDeliver(e) {
      this.SelectedExpressId = e.currentTarget.dataset.id
      this._setFreight()
    },
    saveChange() {
      api.editPaymentAndDelivery(this.SelectConsigneeId, this.freight,this.IsSingleGoodsBuy).then(() => {
        this.setSelectedExpressId(this.SelectedExpressId)
        wx.setStorageSync('isRefreshOrder',true)//返回确认订单页onshow开关
        wx.navigateBack({
          delta: 1
        })
      })
    },
    _setFreight() {
      this.model.forEach((val) => {
        if (val.PayMode == 1) {
          val.Delivers.forEach((childVal) => {
            if (childVal.ExpressId == this.SelectedExpressId) {
              this.freight = childVal.Price
            }
          })
        }
      })
    }
  }

};
</script>


<style lang="less">
.warehouse-box, .freight-box {
  display: flex;
  align-items: center;
  padding: 30rpx;
  font-size: 26rpx;
  border-bottom: 1rpx solid #dcdcdc;
  color: #000;
}

.warehouse-box .text, .freight-box .text {
  margin-left: 20rpx;
  color: #484848;
}

.freight-box .text {
  color: #fe7e7d;
}

.express-box {
  padding: 30rpx 30rpx 20rpx;
  font-size: 26rpx;
  border-bottom: 1rpx solid #dcdcdc;
}

.express-box .title {
  margin-bottom: 20rpx;
}

.e-list {
  display: flex;
  flex-wrap: wrap;
}

.e-item {
  color: #888;
  border: solid 1rpx #dcdcdc;
  padding: 8rpx 16px;
  box-sizing: border-box;
  margin: 10rpx 20rpx;
  font-size: 30rpx;
}

.e-item.active {
  border-color: #cab894;
  background: #fff url(https://pic.keede.com/app/images/icon_topleft.png) no-repeat;
  background-size: 40rpx auto;
  background-position: left top;
}

/*确认按钮*/

.bottom-btn-box {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
}

.bottom-btn-box .btn {
  width: 100%;
  height: 110rpx;
  line-height: 110rpx;
  font-size: 32rpx;
  background: #cab894;
  color: #fff;
  text-align: center;
}
</style>