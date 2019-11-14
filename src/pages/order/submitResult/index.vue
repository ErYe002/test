<template>


  <article v-if="!isHasCartData" class="no-data-box">
      <section class="tips-box">
        <img src="/static/images/icon_success.png" class="icon" />
        <div class="tips">
          <b class="title">温馨提示：</b>
          <p>{{resultMsg}}</p>
          <p class="emptyLine"></p>
          <p>订单金额：￥{{OrderAmount}}</p>
          <p>订单编号：{{orderNo}}</p>
        </div>
      </section>
      <a href="/pages/index/main" open-type="switchTab" class="kd-btn">继续购物</a>
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

export default {
  data(){
    return { 
      likeGoodsList: [], //猜你喜欢商品列表
      resultMsg:'',
      OrderAmount:'',
      orderNo:'',
      shopId: '1',
    }
  },
  onLoad: function (options) {
    if (options) {
      console.log(options)
      this.shopId = options.shopId
      this.resultMsg = options.resultMsg
      this.OrderAmount = options.OrderAmount
      this.orderNo = options.orderNo
      this._getLikeGoods();
    }
  },
  methods: {
    
     //获取猜你喜欢的商品
    _getLikeGoods() {
      api.getGoodsLike(this.shopId).then(({ Data }) => {
        this.likeGoodsList = [...Data];
      });
    },
  }

};
</script>


<style lang="less">
page {
  padding-bottom: 160rpx;
}
.no-data-box {
  .tips-box {
    margin: 30px 0 40px;
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
  .kd-btn {
    width: calc(100% - 60px);
    margin: 0 auto;
    border-bottom: 1px solid #CAB894;
    color: #ffffff;
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
}

</style>
