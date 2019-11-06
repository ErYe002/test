<template>
  <article class="container">
    <view>
      <!-- 海外购：顶部提示 -->
      <view class='haitao-tips' v-if='orderInfo.ShopId == 2 && isShowHaitaoTips'>
        <view class='text-box'>
          <image src="" class='icon' />
          <view class='text'>温馨提示：订单中含有不支持7天无理由退货的商品，请确认相关商品信息及收货地址后提交订单</view>
        </view>
        <view class='icon-close' bindtap='hideHaitaoTips'>x</view>
      </view>
      <view class='address-box'>
        <!-- 收货地址没有验证通过 -->
        <view class='empty' v-if='!orderInfo.IsValidConsignee || !orderInfo.Address'>
            <!-- 没有设置过默认收货地址 -->
          <navigator url='/pages/order/chooseAddress/main'>
            <view>
              <img src="" />请选择收货地址</view>
            <text class="icon"></text>
          </navigator>
          <view class="getadd" @click="getadd">
            <view>
              <img src="" />一键获取微信收货地址</view>
            <text class="icon"></text>
          </view>
        </view>
        <!-- 添加过收货地址且已设置默认地址 -->
        <navigator v-else :url="'/pages/order/chooseAddress/main?SelectedConsigneeId='+formModel.selectedConsigneeId" class='info-box'>
          <view class='info'>
            <view class='contact-name'>
              {{orderInfo.Consignee}}
              <text v-if='orderInfo.IsDefaultConsignee' class='default'>默认</text>
            </view>
            <view class='contact-address'>{{orderInfo.Address}}</view>
            <view class='contact-phone'>{{orderInfo.ContactPhone}}</view>
          </view>
          <view class='icon'></view>
        </navigator>
        <view class='top-bg'></view>
      </view>
      <!-- 海外购：身份证信息 -->
      <view class='idcard-box' v-if='orderInfo.ShopId == 2'>
        <label class='label'>
          <view class='text'>身份证</view>
          <input class='input' placeholder='请输入收货人身份证号码' :value='orderInfo.IDCard' bindinput='idCardChange' />
        </label>
        <view class="idcard-tips">
          <view class="t">注：</view>
          <view class="text">
            <view>1.应海关要求，购买进口商品请您提供真实身份信息</view>
            <view>2.身份证上的名字与收货人名字完全一致才能通过海关</view>
          </view>
        </view>
      </view>
      <view class='order-box'>
        <!-- 海外购添加haitao样式 -->
        <view :class='orderInfo.ShopId == 2 ? "haitao":""'>
          <view class='shop-name'>
            <view class="text">
              <img v-if="orderInfo.ShopId == 2" src="" class='icon' />
              <img v-else src="" class='icon' /> {{orderInfo.ShopId == 2 ? "品质进口海淘":"可得境内自营"}}
            </view>
            <view v-if='orderInfo.ShopId != 2' class="sub-text">全国送 预计2-5工作日送达</view>
          </view>
          <view class='goods-info'>
            <scroll-view class="scroll-view_H" scroll-x="true" enable-flex="true">
                <div class="scroll-item" v-for="(item, idx) in orderInfo.Goods" :key="idx">
                  <div class="goods-item">
                    <img class="goodsImg" mode="aspectFit" :src="item.ImageUrl">
                    <div class="count"> x {{item.Quantity}}</div>
                  </div>
                </div>
              </scroll-view>
            <div class="goodsCount">共xxx件...</div>
          </view>
        </view>
        <block v-if='orderInfo.ShopId == 2'>
          <view class='flex-line haitao-flex-line' bindtap='showServiceDesc'>
            <view class='label'>
              <img src="" class='icon-tip' />
              <text>海外商品不支持7天退换货</text>
            </view>
            <view class='text'>
              服务说明
              <text class='icon'></text>
            </view>
          </view>
          <view class='flex-line haitao-flex-line' bindtap='showServiceDesc'>
            <view class='label'>
              <img src="" class='icon-clock' />
              <text>预计3-10个工作日发货，节假日配送时间可能会延迟</text>
            </view>
          </view>
        </block>
      </view>
      <!-- <view class='flex-line'>
          <view class='label'>支付方式</view>
          <view class='text'>{{orderInfo.Payment}}</view>
        </view> -->
      <view class='flex-line' @click="jumpToLogistics">
        <view class='label'>物流配送</view>
        <view class='text'>
          {{orderInfo.Delivery}}
          <text class='icon'></text>
        </view>
      </view>
      <view class='flex-line'>
        <view class='label'>发票信息</view>
        <view class='text'>
          <block v-if='orderInfo.ShopId == 2'>海外商品暂不支持开发票</block>
          <block v-else>
            提交订单并付款后可到APP补开发票
            <!-- <text class='icon'></text> -->
          </block>
        </view>
      </view>
    </view>
    <div class="sectionLine"></div>
    <view class='amount-box'>
      <view class='flex-line'>
        <view class='couponTitle'>优惠券</view>
          <navigator :url="'/pages/order/useCoupon/main?shopId='+formModel.selectShopId+'&couponNo='+formModel.CouponNo">
            <view class='couponSubtitle'>{{orderInfo.CouponContent + ' >'}}</view>
          </navigator>
      </view>
    </view>
    <!-- <view class='useCouponScore' v-if="orderInfo.IsCanUseScore"> -->
    <view class='useCouponScore'>
      <view class='counponContent'>
        <view class='couponTitle'>积分</view>
        <view class='couponSubtitle'>{{orderInfo.TotalScoreContent+ '，' + orderInfo.UseScoreContent}}</view>
      </view>
      <switch class="swiper" checked="" @change="changeUseScore" />
    </view>
    <!-- <view class='useCouponScore' v-if="orderInfo.IsCanUseScore"> -->
    <view class='useCouponScore'>
      <view class='counponContent'>
        <view class='couponTitle'>余额</view>
        <view class='couponSubtitle'>可用￥{{orderInfo.AllBalance}}，使用￥{{orderInfo.NewAvailableBalance}}</view>
      </view>
      <switch class="swiper" checked="" @change="changeUseBalance" />
    </view>
    
    <div class="sectionLine"></div>
    <view class='amount-box'>
      <view class='flex-line'>
        <view class='label'>商品总金额</view>
        <view class='text'>¥{{orderInfo.TotalGoodsSalePrice}}</view>
      </view>
    </view>
    <view class='amount-box' v-if="orderInfo.MeetPriceDownPrice > 0">
      <view class='flex-line' >
        <view class='label'>积分抵扣</view>
        <view class='text'>-¥{{orderInfo.MeetPriceDownPrice}}</view>
      </view>
    </view>
    <view class='amount-box' v-if="orderInfo.MeetPriceDownPrice > 0">
      <view class='flex-line' >
        <view class='label'>满减</view>
        <view class='text'>-¥{{orderInfo.MeetPriceDownPrice}}</view>
      </view>
    </view>
    <view class='amount-box'>
      <view class='flex-line'>
        <view class='label'>运费</view>
        <view class='text'>¥{{orderInfo.Carriage}}</view>
      </view>
    </view>
    <view class='amount-box' v-if="orderInfo.MeetPriceDownPrice > 0">
      <view class='flex-line' >
        <view class='label'>使用可得账户余额</view>
        <view class='text'>-¥{{orderInfo.MeetPriceDownPrice}}</view>
      </view>
    </view>
    <div class="sectionLine"></div>
    
    <!-- 用户协议 -->
    <view class="pay-protocol-box">
      <view class="pay-box">
        <view class="text-box">
          <view class="text">微信支付</view>
          <img src="/static/images/icon_wechat.png" />
        </view>
        <view class="checked-box">
          <!-- <img src="" /> -->
        </view>
      </view>
      <view class="protocol-box">
        <view class="checked-box" @click="checkProtocol">
          <img v-if="isCheckProtocol" src="/static/images/icon_checked.png" />
          <view v-else class="no-checked"></view>
        </view>
        <view class="text">
          提交订单购买则代表您同意
          <text @click='showUserAgreement'>《可得用户注册购买协议》</text> 和
          <text @click='showUserysxy'>《可得用户隐私协议》</text>
        </view>
      </view>
      <!-- 海淘协议 -->
      <view class='haitao-protocol-box' v-if='orderInfo.ShopId == 2' bindtap='checkProtocol'>
        <view class=''></view>
        <view class='text'>
          购买进口海淘商品需同意 <text class='protocol-desc'>《用户购买需知》</text>
        </view>
      </view>
      <view class='bottom-btn-box'> 
        <view :class="isCoverAddress ? 'tips-address.show':'tips-address'">送到：{{orderInfo.Address}}</view>
        <view class='btn-box'>
          <view class='btn'>
            <text>实付款：</text>
            <text class='total-price'>¥{{orderInfo.RealTotalPrice}}</text>
          </view>
          <view v-if="orderInfo.IsValidConsignee && orderInfo.Address && isCheckProtocol" bindtap='submitOrder' class="btn">
            去支付
            <img class="icon-right" src="" />
          </view>
          <view wx:else class='btn disable'>
            去支付
            <img class="icon-right" src="" />
          </view>
        </view>
      </view>
    </view>
    <!-- 用户协议 -->
  </article>
</template>

<script>

import api from "@/api/cart";
import {mapState} from "vuex"

export default {
  data(){
    return {
      orderInfo: {},  //API返回的页面渲染信息
      isCheckProtocol:true,
      isCoverAddress:true,
      formModel: {
        isUseScore : true, 
        isUseBalance : true,
        selectShopId : 1,
        selectedConsigneeId : "", 
        selectedPayMode: "1",
        selectedExpressId : "", 
        invoiceType : "", 
        invoiceTitle : "", 
        invoiceItemId : "", 
        selectInvoiceMode : "", 
        axpayerIdentityNumber : "", 
        bankName : "", 
        bankAccount : "", 
        companyAddress : "", 
        mobileNo : "", 
        IDCard : "", 
      },
    }

  },
  computed :{...mapState("order",["SelectedExpressId","SelectedConsigneeId"])},

  onLoad(options) {
    if(options){
      this.formModel.selectShopId = options.shopId;
    }
    this.getConfirmOrderDetail();
  },
  onPageScroll({ scrollTop }) {
    //控制是否展示底部收货地址tip
    if (scrollTop > 90) {
      this.isCoverAddress = true;
    } else {
      this.isCoverAddress = false;
    }
  },
  //监测地址，快递变化
  watch: {
    SelectedConsigneeId:{
      handler: function(val,oldVal){
        this.formModel.selectedConsigneeId = val;
        this.getConfirmOrderDetail();
      },immediate: true
    },
    SelectedExpressId:{
      handler: function(val,oldVal){
        this.formModel.selectedExpressId = val;
        this.getConfirmOrderDetail();
      },immediate: true
    }
  },
  methods: {
    getConfirmOrderDetail(){
      console.log('-----------')
      api.getConfirmOrderDetail({...this.formModel}).then(({ Data, State, Msg }) => {
        this.orderInfo = Object.assign({}, Data);
        this.formModel.selectedConsigneeId = this.orderInfo.SelectedConsigneeId;
        this.formModel.selectedExpressId = this.orderInfo.SelectedExpressId
        console.log(Data)
      });
    },
    getadd(){
      var that=this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.address']) {
           wx.chooseAddress({
              success(res) {
                var data={};
                data.ConsigneeName=res.userName;
                data.ProvinceName = res.provinceName;
                data.CityName = res.cityName;
                data.DistrictName = res.countyName;
                data.Address = res.detailInfo;
                data.PostalCode = res.nationalCode;
                data.ContactMobile = res.telNumber;
                that.getaddid(data);
              }
            })
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          } else {
            if (res.authSetting['scope.address'] == false) {
              wx.openSetting({
                success(res) {
                }
              })
            } else {
              console.log("eee")
              wx.chooseAddress({
                success(res) {
                }
              })
            }
          }
        }
      })
    },
    getaddid(data){
      var that=this;
      api.addWechat(data).then(({ Data }) => {
        that.setData({
          addid: Data
        });
        that._getOrderInfoData();
        wx.setStorageSync('GroupCartInfo', {
          SelectConsigneeId: Data,
        })
      })
    },
    changeUseBalance() {
      this.formModel.isUseBalance = !this.isUseBalance
      
    },
    changeUseScore() {
      this.formModel.isUseScore = !this.formModel.isUseScore
      
    },
    /**
     * 同意/不同意用户购买需知
     */
    checkProtocol() {
        this.isCheckProtocol = !this.isCheckProtocol
    },

    //实现跳转的A页面
    jumpToLogistics: function () {
      console.log("-----"+this.formModel.selectedConsigneeId)
      if (this.formModel.selectedConsigneeId.length > 0 && this.formModel.selectedConsigneeId != "00000000-0000-0000-0000-000000000000") {
      }else{
        wx.showToast({
            title: "请选择收货地址",
            icon: 'none',
        });
        return;
      }
      wx.navigateTo({
          url: '/pages/order/logistics/main?ShopId='+this.formModel.selectShopId+'&SelectedConsigneeId='+this.formModel.selectedConsigneeId+'&SelectedExpressId='+this.formModel.selectedExpressId,
      })
    }
  }
}
</script>

<style lang="less">
page {
  padding-bottom: 160rpx;
}
.container-wrap {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 0;
}
.address-box {
  font-size: 28rpx;
  border-bottom: solid 12rpx #F0F0F0;
}
.address-box .top-bg {
  background-image: url(https://pic.keede.com/app/images/icon_cart.png);
  background-position: 0 -496rpx;
  background-size: 200rpx auto;
  height: 8rpx;
  width: 100%;
}
.address-box .empty {
  box-sizing: border-box;
  text-align: center;
  font-size: 30rpx;
  color: #000;
}
.address-box .empty .getadd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
}
.address-box .empty .getadd view {
  display: flex;
}
.address-box .empty .getadd image {
  width: 42rpx;
  height: 42rpx;
  margin-right: 10rpx;
}
.address-box .empty navigator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  border-bottom: 1px dashed #888888;
}
.address-box .empty navigator view {
  display: flex;
}
.address-box .empty navigator image {
  width: 42rpx;
  height: 42rpx;
  margin-right: 10rpx;
}
.address-box .empty .icon {
  width: 14rpx;
  height: 28rpx;
  background-image: url(https://pic.keede.com/app/images/icon_jt_rt.png);
  background-repeat: no-repeat;
  background-size: 14rpx auto;
  background-position: 0 0;
}
.address-box .info-box {
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.address-box .info-box .info .contact-name {
  font-size: 30rpx;
}
.address-box .info-box .info .contact-address,
.address-box .info-box .info .contact-phone {
  color: #999;
  font-size: 24rpx;
}
.address-box .info-box .info .contact-address {
  margin: 4rpx 0;
}
.address-box .info-box .icon {
  width: 14rpx;
  height: 28rpx;
  background-image: url(https://pic.keede.com/app/images/icon_jt_rt.png);
  background-repeat: no-repeat;
  background-size: 14rpx auto;
  background-position: 0 0;
}
.order-box {
  font-size: 26rpx;
  border-bottom: solid 12rpx #F0F0F0;
}
.order-box .shop-name {
  color: #171717;
  font-size: 28rpx;
  padding: 25rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-box .shop-name .icon {
  display: inline-block;
  height: 26rpx;
  width: 26rpx;
}
.order-box .shop-name .sub-text {
  font-size: 24rpx;
  color: #999;
}
.order-box .goods-info {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #dcdcdc;
  height: 160rpx;
}
.scroll-view_H {
  // white-space: nowrap;
  // background: #808080;
  width: calc(100% - 120rpx);
  display: flex;
  height: 160rpx;
  box-sizing: border-box;
}
.scroll-item {
  height: 140rpx;
  width: 200rpx;
}
.goods-item {
  align-items: center;
  display: flex;
  height: 140rpx;
  width: 200rpx;
}
.goods-item .goodsImg {
  width: 140rpx;
  height: 140rpx;
}
.goods-item .count {
  margin-left: 10rpx;
  font-size: 20rpx;
}
.goodsCount {
  width: 120rpx;
  font-size: 20rpx;
  text-align: right;
  // background: #808080;
}
.order-box .haitao {
  border-bottom: solid 12rpx #F0F0F0;
}
.order-box .haitao .shop-name .icon {
  width: 29rpx;
  height: 27rpx;
}
.flex-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid #dcdcdc;
  font-size: 28rpx;
  /*海淘*/
}
.flex-line .text {
  font-size: 24rpx;
  color: #333333;
}
.flex-line .text .icon {
  background-image: url(https://pic.keede.com/app/images/icon_jt_rt.png);
  background-position: 0 0;
  background-size: 16rpx auto;
  display: inline-block;
  height: 27rpx;
  vertical-align: -10%;
  width: 16rpx;
  margin-left: 10rpx;
}
// .flex-line:last-child {
//   border-bottom: none;
// }
.flex-line.haitao-flex-line .label {
  color: #999;
  display: flex;
  align-items: center;
  font-size: 24rpx;
}
.flex-line.haitao-flex-line .label .icon-tip,
.flex-line.haitao-flex-line .label .icon-clock {
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.flex-line.haitao-flex-line .label .icon-tip {
  background-position: 0 -110rpx;
}
.flex-line.haitao-flex-line .label .icon-clock {
  background-position: 0 -182rpx;
}
.flex-line.haitao-flex-line .text {
  color: #000;
}


.sectionLine {
  background: #F0F0F0;
  height: 12rpx;
  width: 100%;
}

.useCouponScore {
  display: flex;
  align-items: center;
  border-bottom: solid 2rpx #F0F0F0;
  padding-left: 20rpx;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
}
.counponContent {
  font-size: 28rpx;
  width: 100%;
}
.couponTitle {
  color: #333333;
}
.couponSubtitle {
  color: #999
  ;
  font-size: 20rpx;
}
.swiper {
  margin-left: 20rpx;
  margin-right: 10rpx;
}


//金额区域
.balance-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  font-size: 28rpx;
  border-bottom: solid 12rpx #F0F0F0;
}
.balance-box .balance {
  flex: 1;
  color: #999;
}
.balance-box .balance text {
  color: #000;
  margin-right: 10rpx;
}
.amount-box {
  font-size: 28rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border-bottom: solid 2rpx #F0F0F0;
}
.amount-box .flex-line {
  border-bottom: none;
  padding: 0;
  margin-bottom: 30rpx;
}
.amount-box .flex-line .label {
  color: #333333;
}
.amount-box .flex-line .text {
  font-size: 24rpx;
  color: #999;
}
.amount-box .flex-line:last-child {
  margin-bottom: 0;
}
.bottom-btn-box {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.bottom-btn-box .tips-address {
  font-size: 24rpx;
  padding: 8rpx;
  box-sizing: border-box;
  background: #FCE7EB;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s;
}
.bottom-btn-box .tips-address.show {
  opacity: 1;
}
.bottom-btn-box .btn-box {
  display: flex;
}
.bottom-btn-box .btn-box .btn {
  flex: 1;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  background: #cab894;
  color: #fff;
}
.bottom-btn-box .btn-box .btn:first-child {
  font-size: 28rpx;
  background: #000;
}
.bottom-btn-box .btn-box .btn:first-child .total-price {
  font-weight: bold;
  font-size: 32rpx;
}
.bottom-btn-box .btn-box .btn .icon-right {
  width: 40rpx;
  height: 40rpx;
}
.bottom-btn-box .btn-box .btn.disable {
  background: #C9C9CB;
}
/*********海外购*********/
/*顶部提示*/
.haitao-tips {
  color: #e8972d;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  padding: 30rpx;
  box-sizing: border-box;
  border-bottom: solid 12rpx #F0F0F0;
}
.haitao-tips .text-box {
  flex: 1;
  display: flex;
  padding-right: 20rpx;
}
.haitao-tips .text-box .icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.haitao-tips .text-box .text {
  flex: 1;
}
.haitao-tips .icon-close {
  text-align: center;
  width: 36rpx;
  height: 36rpx;
  line-height: 30rpx;
  background-color: #cccccc;
  color: #fff;
  border-radius: 50%;
}
/*身份证*/
.idcard-box {
  border-bottom: 12rpx solid #F0F0F0;
  padding: 20rpx;
  box-sizing: border-box;
}
.idcard-box .label {
  font-size: 28rpx;
  display: flex;
  align-items: center;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f2f2f2;
}
.idcard-box .label .text {
  margin-right: 30rpx;
}
.idcard-box .label .input {
  border-left: 1rpx solid #dcdcdc;
  padding-left: 30rpx;
  box-sizing: border-box;
  flex: 1;
  height: 40rpx;
  line-height: 40rpx;
}
.idcard-box .idcard-tips {
  display: flex;
  font-size: 20rpx;
  color: #808080;
  margin-top: 20rpx;
}
.idcard-box .idcard-tips .t {
  color: #E31436;
}
.pay-protocol-box {
  padding: 30rpx;
  box-sizing: border-box;
}
.pay-protocol-box .checked-box image,
.pay-protocol-box .checked-box .no-checked {
  display: block;
  width: 24rpx;
  height: 24rpx;
  box-sizing: border-box;
}
.pay-protocol-box .checked-box .no-checked {
  border-radius: 50%;
  border: 1rpx solid #CAB894;
}
.pay-protocol-box .pay-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-protocol-box .pay-box .text-box {
  font-size: 30rpx;
  display: flex;
  align-items: center;
}
.pay-protocol-box .pay-box .text-box image {
  flex: 1;
  display: block;
  width: 32rpx;
  height: 27rpx;
  margin-left: 10rpx;
}
.pay-protocol-box .protocol-box {
  display: flex;
  margin-top: 35rpx;
  align-items: center;
}
.pay-protocol-box .protocol-box .text {
  flex: 1;
  font-size: 24rpx;
  color: #999;
  margin-left: 15rpx;
}
.pay-protocol-box .protocol-box .text text {
  color: #333;
}
.haitao-protocol-box {
  border-bottom: 12rpx solid #F0F0F0;
  font-size: 28rpx;
  color: #999;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.haitao-protocol-box .icon {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  border: 1rpx solid #cab894;
  margin-right: 14rpx;
}
.haitao-protocol-box .icon.active {
  border-color: transparent;
  background: #cab894 url(https://pic.keede.com/app/images/icon_radioched.png);
  background-position: 0;
  background-size: 30rpx auto;
}
.haitao-protocol-box .protocol-desc {
  color: #E31436;
}

</style>