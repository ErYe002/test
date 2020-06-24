<template>
  <article class="container">
    <template v-if="orderInfo">
      <section class="order-no-box">
        <span class="order-no">订单编号：{{orderInfo.OrderNo}}</span>
        <span class="order-status">{{orderInfo.OrderState}}</span>
      </section>
      <section class="address-box" v-if="!svip">
        <p class="top-bg"></p>
        <div class="address-info">
          <p class="name">{{orderInfo.Consignee}}</p>
          <p class="address">{{orderInfo.Direction}}</p>
          <p class="phone">{{orderInfo.Mobile}} {{orderInfo.Phone}}</p>
        </div>
      </section>
      <section class="goods-box">
        <ul class="list">
          <li class="item" v-for="item in orderInfo.GoodsDetail" :key="item.GoodsId">
            <div class="link" v-if="!orderInfo.IsCanViewGoodsDetail">
              <img class="g-img" :src="item.Img" />
              <div class="g-info">
                <p class="g-name">
                  <text class="ht-tag" v-if="item.ShopId == 2">海淘</text>
                  {{item.GoodsName}}
                </p>
                <p class="g-attr">{{item.Specification}}</p>
              </div>
              <div class="price-info">
                <b class="price">¥{{item.Price}}</b>
                <span class="num">x {{item.Num}}</span>
              </div>
            </div>
            <a class="link" :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'" v-else>
              <img class="g-img" :src="item.Img" />
              <div class="g-info">
                <p class="g-name">
                  <text class="ht-tag" v-if="item.ShopId == 2">海淘</text>
                  {{item.GoodsName}}
                </p>
                <p class="g-attr">{{item.Specification}}</p>
              </div>
              <div class="price-info">
                <b class="price">¥{{item.Price}}</b>
                <span class="num">x {{item.Num}}</span>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section class="order-pay-box small">
        <ul class="list">
          <li class="item">
            <b class="lable">支付配送</b>
            <span class="text">{{orderInfo.PayDelivery}}</span>
          </li>
          <li class="item">
            <b class="lable">发票信息</b>
            <span class="text">请到可得眼镜APP查看发票</span>
          </li>
        </ul>
      </section>
      <section class="order-pay-box">
        <ul class="list">
          <li class="item">
            <b class="lable">商品总金额</b>
            <span class="text">¥{{orderInfo.TotalPrice}}</span>
          </li>
          <li class="item">
            <b class="lable">
              已优惠
              <span
                class="sub-lable"
                v-if="!orderInfo.IsGrouponOrder"
              >（含满减{{orderInfo.ShopId != 2 ? '、积分抵扣':''}}）</span>
            </b>
            <span class="text">-¥{{orderInfo.IsGrouponOrder ? 0 : orderInfo.PromotionValue}}</span>
          </li>
          <li class="item">
            <b class="lable">运费</b>
            <span class="text">¥{{orderInfo.Carriage}}</span>
          </li>
          <li class="item" v-if="orderInfo.ShopId != 2">
            <b class="lable">使用账户余额</b>
            <span class="text">-¥{{orderInfo.PaymentByBalance}}</span>
          </li>
        </ul>
        <p class="total-price">
          {{IsPaid.IsPaid?'实付款：':'需付款：'}}
          <text>¥{{orderInfo.RealTotalPrice}}</text>
        </p>
        <p class="order-time">下单时间：{{orderInfo.OrderTime}}</p>
      </section>
      <section class="btn-box">
        <ul class="btn-list">
          <li class="b-item" v-if="orderInfo.ShopId != 2 && orderInfo.IsAfterSale">
            <button class="kd-btn btn-default btn-small" @click="toAppTips('可得小程序暂时不支持退换货功能哦，请下载可得眼镜APP使用此功能')">退换货</button>
          </li>
          <!-- <li class="b-item" v-if="orderInfo.IsAppraise">
            <button class="kd-btn btn-default btn-small">评价</button>
          </li> -->
          <li class="b-item" v-if="orderInfo.IsCancel">
            <button class="kd-btn btn-default btn-small" @click="cancelOrderEvent(orderInfo.OrderId)">取消订单</button>
          </li>
          <li class="b-item" v-if="orderInfo.IsContactAirlines">
            <button class="kd-btn btn-default btn-small" open-type="contact">联系客服</button>
          </li>
          <li class="b-item" v-if="orderInfo.IsLogistics">
            <a :href="'/pages/account/logistics/main?shopId='+orderInfo.ShopId+'&orderId='+orderInfo.OrderId" class="kd-btn btn-default btn-small">查看物流</a>
          </li>
          <li class="b-item" v-if="orderInfo.IsPayment" @click="_wechatPay(orderInfo.OrderId)">
            <button class="kd-btn btn-small">付款</button>
          </li>
        </ul>
      </section>
    </template>
  </article>
</template>

<script>
import api from "@/api/order";
import tools from '@/utils'
import cartApi from "@/api/cart";
import { mapState } from "vuex";

export default {
  data() {
    return {
      orderId: "",
      dataSource:"",
      svip:false,
      orderInfo: null
    };
  },
  computed: {
    ...mapState("wxinfo", ["openId"])
  },
  onLoad(options) {
    if (options && options.orderId) {
      this.orderId = options.orderId;
    }
    if (options && options.dataSource!=null&&options.dataSource!="") {
      this.dataSource = options.dataSource;
    }
     if (options && options.svip!=null) {
      this.svip = options.svip;
    }
    this._getPageData();
  },
  methods: {
    _getPageData() {
      api.getOrderDetail(this.orderId,this.dataSource).then(({ Data }) => {
        Data.OrderTime = tools.formatDate('yyyy/MM/dd hh:mm', new Date(Data.OrderTime))
        this.orderInfo = Object.assign({}, Data);
      });
    },
    toAppTips(content) {
      wx.showModal({
        title: "提示",
        content,
        confirmColor: "#cab894"
      });
    },
    _wechatPay(orderId) {
      const _this = this;
      cartApi
        .payOrder(orderId, _this.openId)
        .then(result => {
          const { nonceStr, paySign, signType, timeStamp } = result.Data;
          const package1 = result.Data.package; //package是小程序关键字
          wx.showLoading();
          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: package1,
            signType: signType,
            paySign: paySign,
            success: function(res) {
              // _this.listQuery.page = 1;
              cartApi
                .paySuccess(orderId)
                .then(() => {
                  _this._getListEvent();
                })
                .catch(() => {
                  _this._getListEvent();
                });
            },
            fail: function() {
              // wx.reportMonitor("3", 1);
              wx.showModal({
                title: "提示",
                content: "支付失败，您可以稍后再进行支付",
                showCancel: false,
                confirmColor: "#cab894",
                success() {}
              });
            },
            complete: function() {
              wx.hideLoading();
            }
          });
        })
        .catch(() => {
          // wx.reportMonitor("3", 1);
        });
    },
    //取消订单
    cancelOrderEvent(orderId){
      const _this = this
      wx.showModal({
        title: "提示",
        content: '您确定要取消订单吗？',
        confirmColor: "#cab894",
        success (res) {
          if (res.confirm) {
            api.cancelOrder(orderId).then(() => {
              _this._getPageData()
            })
          } 
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 70px;
  box-sizing: border-box;
}
.order-no-box {
  padding: 15px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 10px solid #eee;
  .order-status {
    color: #fe7e7d;
  }
}
.address-box {
  font-size: 14px;
  border-bottom: 10px solid #eee;
  .top-bg {
    background-image: url(https://pic.keede.com/app/images/icon_cart.png);
    background-position: 0 -248px;
    background-size: 100px auto;
    height: 4px;
    width: 100%;
  }
  .address-info {
    padding: 10px 15px;
    .name,
    .address,
    .phone {
      color: #888;
      font-size: 13px;
      margin-top: 3px;
    }
    .name {
      font-size: 16px;
      color: #000;
    }
  }
}

.goods-box {
  padding: 15px;
  border-bottom: 10px solid #eee;
  .list {
    .item {
      padding-bottom: 15px;
      border-bottom: 0.5px solid #e5e5e5;
      margin-top: 15px;
      .link {
        display: flex;
        .g-img {
          display: block;
          width: 90px;
          height: 90px;
          border: 0.5px solid #d7d7d7;
        }
        .g-info {
          flex: 1;
          margin: 0 10px;
          .g-name {
            font-size: 14px;
            .ht-tag {
              font-size: 12px;
              color: #fff;
              background: #000;
              padding: 2px 4px;
              margin-right: 3px;
              font-weight: 300;
            }
          }
          .g-attr {
            color: #888;
            font-size: 13px;
          }
        }
        .price-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 15px;
          .price {
            font-weight: bold;
          }
          .num {
            font-size: 13px;
            color: #888;
            margin-top: 20px;
          }
        }
      }
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
}

.order-pay-box {
  .list {
    padding: 10px 0;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      padding: 0 15px;
      height: 30px;
      box-sizing: border-box;
      .text {
        color: #888;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  &.small {
    border-bottom: 10px solid #eee;
    .list {
      padding: 0;
      .item {
        border-bottom: 0.5px solid #e5e5e5;
        font-size: 13px;
        height: 40px;
        .lable {
          color: #888;
        }
      }
    }
  }
  .total-price {
    padding: 0 15px;
    text-align: right;
    font-size: 15px;
    text {
      color: #fe7e7d;
    }
  }
  .order-time {
    padding: 0 15px;
    text-align: right;
    color: #888;
    font-size: 12px;
  }
}

.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  .btn-list {
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px 0;
    flex-wrap: wrap;
    .b-item {
      margin-bottom: 10px;
      margin-left: 10px;
      width: 90px;
    }
  }
}
</style>