<template>


  <article v-if="!isHasCartData" class="no-data-box">
      <section class="tips-box">
        <img src="/static/images/icon_success.png" class="icon" />
        <div class="tips">
          <b class="title">温馨提示：</b>
          <p>{{resultMsg}}</p>
        </div>
      </section>
      <section class="order-box">
          <p>订单金额：￥{{OrderAmount}}</p>
          <p>订单编号：{{orderNo}}</p>
      </section>
      <a href="/pages/index/main" open-type="switchTab" class="kd-btn">继续购物</a>
      <a :href="'/pages/account/order/detail/main?orderId=' + OrderId+'&svip='+svip" class="kd-btn">查看订单</a>
      <div class="Code_box"  v-if="CodeUrl">
        <div class="tips">{{Tips}}</div>
        <div class="CodeUrl_box">
          <img :src="CodeUrl" alt="" class="CodeUrl" @click="clickErCode">
        </div>
      </div>
        <div class="PaySuccessImg_box" v-if="PaySuccessImg">
          <img :src="PaySuccessImg" alt="" class="PaySuccessImg">
        </div>
      <section class="may-like-box" v-if="likeGoodsList.length > 0">
        <p class="title">猜你喜欢</p>
        <scroll-view class="may-like-list" scroll-x="true" enable-flex="true" @scroll="scroll">
          <view class="ml-item" v-for="item in likeGoodsList" :key="item.GoodsId">
            <a :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'">
              <img :src="item.Img" class="p-img" />
              <p class="p-name">{{item.GoodsName}}</p>
              <b class="price">¥{{item.Price}}</b>
            </a>
          </view>
        </scroll-view>
      </section>
    </article>
</template>

<script>
import api from "@/api/cart";
import utils from '@/utils';
const TDSDK = require('../../../../static/tdsdk/tdweapp'); 

export default {
  data(){

    return { 
      likeGoodsList: [], //猜你喜欢商品列表
      resultMsg:'',
      OrderAmount:'',
      orderNo:'',
      shopId: '1',
      OrderId:"",
      PaySuccessImg:"",
      svip:false,
      Tips:"",
      CodeUrl:""
    }
  },
  onLoad: function (options) {
    TDSDK.Event.event({id: '购买成功页'})
    if (options) {
      console.log(options)
      this.shopId = options.shopId
      this.resultMsg = options.resultMsg
      this.OrderAmount = options.OrderAmount
      this.orderNo = options.orderNo
      this.OrderId = options.OrderId
      this.svip = options.svip
      this._getLikeGoods();
      this._getPaySuccessBanner();
    }
    //kede行为统计
     this.$onInformationCollection({
      token:"WeChat",
      uid:wx.getStorageSync('USERID'),
      opentype:"view",
      time:Date.now().toString(),
      page:utils.getCurrentPageUrl(),
      eventname:"购买成功页",
      eventval:JSON.stringify({OrderNo:this.orderNo,OrderId:this.OrderId})
    })
  },
  methods: {
    
     //获取猜你喜欢的商品
    _getLikeGoods() {
      api.getGoodsLike(this.shopId).then(({ Data }) => {
        this.likeGoodsList = [...Data];
      });
    },
    _getPaySuccessBanner(){
      api.paySuccessBanner(this.shopId).then(({ Data }) => {
        this.CodeUrl = Data.WeChatQrCodeUrl
        this.Tips = Data.Tips
        this.PaySuccessImg = Data.BannerImageUrl
      });
    },
    clickErCode(){
      wx.previewImage({
        urls: [this.CodeUrl] // 需要预览的图片http链接列表
      })
    }
  }

};
</script>


<style lang="less">
page {
  padding-bottom: 160rpx;
}
.no-data-box {
  .tips-box {
    margin: 30px 0 20px;
    display: flex;
    justify-content: center;
    .icon {
      display: block;
      width: 47px;
      height: 47px;
      margin-left: 8%;
      margin-right: 10px;
    }
    .tips {
      color: #888;
      font-size: 13px;
      width: 70%;
      .title {
        color: #000;
        font-size: 15px;
      }
      .emptyLine {
        height: 20rpx;
      }
    }
  }
  .order-box{
    margin: 15px;
    display: flex;
    color: #888;
    font-size: 13px;
    justify-content: center;
  }
  .kd-btn {
    width: calc(100% - 60px);
    margin: 0 auto;
    border-bottom: 1px solid #C6B798;
    color: #C6B798;
    background: #fff;
    margin-bottom: 11px;
    border-radius: 10px;
  }
  .may-like-box {
    .title {
      font-size: 15px;
      padding: 25px 15px 15px;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e3e3e3;
    }
    .may-like-list {
      display: flex;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e3e3e3;
      height: 240px;
      .ml-item {
        font-size: 14px;
        color: #888;
        padding: 10px 5px;
        box-sizing: border-box;
        height: 100%;
        .p-img {
          display: block;
          width: 162px;
          height: 162px;
          border: 0.5px solid #e3e3e3;
        }
        .p-name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 38px;
        }
        .price {
          color: #000;
        }
      }
    }
  }
  .PaySuccessImg_box{
      padding: 0 15px;
      display: flex;
      justify-content: center;
      .PaySuccessImg{
        width: 100%;
      }
  }
  .Code_box{
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .tips{
      font-size: 14px;
      color: #000;
    }
    .CodeUrl{
      width: 131px;
      height: 131px;
      margin: 10px 0;
    }
  }

}

</style>
