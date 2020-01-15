<template>
  <article class="container" :style="'padding-top:'+(listQuery.queryString != '' ? 43 : 83)+'px'">
    <article class="fixed-top">
      <section class="search-box">
        <img class="icon" src="/static/images/icon_search.png" />
        <input
          class="input"
          v-model="listQuery.queryString"
          placeholder="商品名称/订单号"
          @confirm="searchEvent"
          confirm-type="搜索"
        />
        <img
          v-if="listQuery.queryString != ''"
          @click="clearInputEvent"
          class="icon-clear"
          src="/static/images/clear-icon.png"
        />
      </section>
      <section class="type-box" v-if="listQuery.queryString == ''">
        <ul class="type-list">
          <li
            :class="{'t-item':true, 'current': listQuery.queryState == 0}"
            @click="switchTypeEvent(0)"
          >全部</li>
          <li
            :class="{'t-item':true, 'current': listQuery.queryState == 3}"
            @click="switchTypeEvent(3)"
          >待付款</li>
          <li
            :class="{'t-item':true, 'current': listQuery.queryState == 4}"
            @click="switchTypeEvent(4)"
          >待发货</li>
          <li
            :class="{'t-item':true, 'current': listQuery.queryState == 6}"
            @click="switchTypeEvent(6)"
          >待评价</li>
        </ul>
      </section>
    </article>
    <section class="order-box">
      <ul class="order-list">
        <template v-if="listQuery.queryState != 6">
          <li class="o-item" v-for="(item, idx) in orderList" :key="idx">
            <a :href="'/pages/account/order/detail/main?orderId=' + item.OrderId" class="link">
              <div class="title">
                <span class="order-no" @click.stop="copyOrderNo(item.OrderNo)">
                  <text class="ht-tag" v-if="item.ShopId == 2">海淘</text>
                  订单编号：{{item.OrderNo}}
                </span>
                <span class="ops">
                  <span class="status">{{item.OrderState}}</span>
                  <img class="icon" src="/static/images/icon_right_grey.png" />
                </span>
              </div>
              <div class="goods-list">
                <template v-for="(imgItem, index) in item.Details">
                  <img
                  class="g-img"
                  :src="imgItem.Img"
                  mode="aspectFill"
                  :key="imgItem.GoodsId"
                  v-if="index < 4"
                />
                </template>
              </div>
            </a>
            <p class="amount-box">
              共{{item.Quantity}}件，实付款：
              <span class="amount">¥{{item.OrderPayment}}</span>
            </p>
            <ul class="btn-list">
              <li class="b-item" v-if="item.IsCancel">
                <button
                  class="kd-btn btn-default btn-small"
                  @click="cancelOrderEvent(item.OrderId)"
                >取消订单</button>
              </li>
              <li class="b-item" v-if="item.ShopId != 2 && item.IsAfterSale">
                <button
                  class="kd-btn btn-default btn-small"
                  @click="toAppTips('可得小程序暂时不支持退换货功能哦，请下载可得眼镜APP使用此功能')"
                >退换货</button>
              </li>
              <li class="b-item" v-if="item.IsLogistics">
                <a
                  class="kd-btn btn-default btn-small"
                  :href="'/pages/account/logistics/main?shopId='+item.ShopId+'&orderId='+item.OrderId"
                >查看物流</a>
              </li>
              <!-- <li class="b-item" v-if="item.IsAppraise">
                <button class="kd-btn btn-default btn-small">评价</button>
              </li>-->
              <li class="b-item" v-if="item.IsContactAirlines">
                <button class="kd-btn btn-default btn-small" open-type="contact">联系客服</button>
              </li>
              <li class="b-item" v-if="item.IsPayment" @click="_wechatPay(item.OrderId)">
                <button class="kd-btn btn-small">付款</button>
              </li>
            </ul>
          </li>
        </template>
        <template v-if="listQuery.queryState == 6">
          <li class="wait_evaluate" v-for="(item,index) in orderList" :key="index">
            <div class="waitDivFirst">
              <img class="waitCommentGoodsImg" :src="item.GoodsImageUrl" @error="orderImgError(index)" mode="aspectFill" />
            </div>
            <div class="waitDivSecond">
              <p class="waitCommentGoodsName">{{item.GoodsName}}</p>
              <a
                class="gotoOrder"
                :href="'/pages/account/order/detail/main?orderId='+item.OrderId"
              >查看订单</a>
              <a
                class="gotoComment"
                :href="'/pages/account/order/comment/main?orderId=' + item.OrderId +'&goodsId=' + item.GoodsId + '&goodsImageUrl=' + item.GoodsImageUrl"
              >评价晒单</a>
            </div>
          </li>
        </template>
      </ul>
      <img
        class="loading"
        v-if="listQuery.page == 1 && isLoading"
        src="/static/images/mu_loading.gif"
      />
      <p class="no-data-box" v-else-if="isNoData">抱歉，没有此类订单哦</p>
      <p class="no-more-tips" v-if="listQuery.page == totalPage">没有更多了</p>
    </section>
  </article>
</template>

<script>
import api from "@/api/order";
import cartApi from "@/api/cart";
import { mapState } from "vuex";

export default {
  data() {
    return {
      fixedTopHeight: 83,
      orderList: [],
      isLoading: false,
      totalPage: 0,
      isNoData: false,
      listQuery: {
        queryState: 0, //0全部,1.处理中,2已完成,3待付款,4待发货,5待收货,6待评价
        isFreshCache: false,
        page: 1,
        queryString: ""
      }
    };
  },
  computed: {
    ...mapState("wxinfo", ["openId"]),
    ...mapState("comment", ["commentedId"])
  },
   watch:{
    commentedId:{
      handler: function(val,oldVal){
        if(val != ''){
          this.orderList.forEach((ele, idx) => {
            if(ele.GoodsId == val){
              this.orderList.splice(idx, 1);
            }
          });
        }
      },
      immediate: true
    }
  },
  onLoad(options) {
    if (options && options.queryState) {
      this.listQuery.queryState = options.queryState;
    }
    this._getListEvent();
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.listQuery.page < this.totalPage) {
      this.listQuery.page++;
      this._getListEvent();
    }
  },
  methods: {
    switchTypeEvent(state) {
      this.listQuery.queryState = state;
      this.listQuery.page = 1;
      this.isNoData = false;
      this.orderList = [];
      this._getListEvent();
    },
    searchEvent() {
      this.listQuery.queryState = 0;
      this.listQuery.page = 1;
      this.isNoData = false;
      this.orderList = [];
      this._getListEvent();
    },
    clearInputEvent() {
      this.listQuery.queryString = "";
      this.listQuery.queryState = 0;
      this.listQuery.page = 1;
      this.isNoData = false;
      this._getListEvent();
    },
    toAppTips(content) {
      wx.showModal({
        title: "提示",
        content,
        confirmColor: "#cab894"
      });
    },
    //取消订单
    cancelOrderEvent(orderId) {
      const _this = this;
      wx.showModal({
        title: "提示",
        content: "您确定要取消订单吗？",
        confirmColor: "#cab894",
        success(res) {
          if (res.confirm) {
            api.cancelOrder(orderId).then(() => {
              _this.listQuery.page = 1;
              _this.isNoData = false;
              _this.orderList = [];
              _this._getListEvent();
            });
          }
        }
      });
    },
    copyOrderNo(text) {
      wx.setClipboardData({
        data: text,
        success() {
          wx.showToast({
            title: "已复制订单号",
            icon: "success",
            duration: 2000
          });
        }
      });
    },
    _getListEvent() {
      this._reuqest().then(({ Data, TotalPage }) => {
        this.orderList =
          this.listQuery.page > 1 ? this.orderList.concat(Data) : Data;
        this.totalPage = TotalPage;
        //没有搜索到任何数据
        if (!Data || Data.length <= 0) {
          this.isNoData = true;
        }
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
              this.listQuery.page = 1;
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
    _reuqest() {
      return new Promise((resolve, reject) => {
        if (!this.isLoading) {
          this.isLoading = true;
          if (this.listQuery.queryState == 0) {
            //查询全部订单或按关键字查询订单
            api
              .searchOrderList({ ...this.listQuery })
              .then(res => {
                resolve(res);
              })
              .finally(() => {
                this.isLoading = false;
              });
          } else if (this.listQuery.queryState == 6) {
            api
              .pendingComments(this.listQuery.page)
              .then(res => {
                resolve(res);
              })
              .finally(() => {
                this.isLoading = false;
              });
          } else {
            //按订单状态查询订单
            api
              .getOrderList({ ...this.listQuery })
              .then(res => {
                resolve(res);
              })
              .finally(() => {
                this.isLoading = false;
              });
          }
        } else {
          reject("正在请求数据，请稍候");
        }
      });
    },
    orderImgError(index){
      this.orderList[index].GoodsImageUrl='https://pic.keede.com//app/images/goods_errimg.png';
    }
  }
};
</script>

<style lang="less">
page {
  height: 100%;
}
.container {
  min-height: 100%;
  background: #f7f7f7;
  // padding-top: 83px;
  box-sizing: border-box;
}

.fixed-top {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 12px;
  padding: 10px 15px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #e5e5e5;
  .icon {
    position: absolute;
    display: block;
    width: 14px;
    height: 15px;
    left: 25px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
  .icon-clear {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
  .input {
    flex: 1;
    background: #f7f7f7;
    height: 25px;
    line-height: 25px;
    border-radius: 20px;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.type-box {
  font-size: 14px;
  .type-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .t-item {
      padding: 10px 0;
      color: #888;
      box-sizing: border-box;
      &.current {
        font-weight: bold;
        color: #cab894;
        border-bottom: 2px solid #cab894;
      }
    }
  }
}

.order-box {
  padding: 20px 10px;
  box-sizing: border-box;
  .order-list {
    .o-item {
      background: #fff;
      box-sizing: border-box;
      margin-bottom: 10px;
      .link {
        .title {
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 0.5px solid #e5e5e5;
          padding: 10px;
          .order-no {
            display: flex;
            align-items: center;
            flex: 1;
            .icon {
              display: block;
              width: 48px;
              height: 15px;
              margin-right: 5px;
            }
          }
          .ops {
            display: flex;
            align-items: center;
            color: #fe7e7d;
            .icon {
              display: block;
              width: 8px;
              height: 14px;
              margin-left: 5px;
            }
          }
        }
        .goods-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 10px 10px 0;
          .g-img {
            display: block;
            width: 62px;
            height: 62px;
            margin: 0 10px 10px;
            border: 0.5px solid #dcdcdc;
            box-sizing: border-box;
          }
        }
      }
      .amount-box {
        font-size: 12px;
        color: #888;
        padding: 5px 10px;
        border-top: 0.5px solid #e5e5e5;
        .amount {
          color: #cab894;
          font-size: 14px;
        }
      }
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

    .wait_evaluate {
      display: flex;
      flex-direction: row;
      padding-bottom: 5px;
      border-bottom: 1px solid gainsboro;
      margin-bottom: 10px;
      .waitDivFirst {
        margin-right: 10px;
        .waitCommentGoodsImg {
          height: 50px;
          width: 50px;
        }
      }
      .waitDivSecond {
        position: relative;
        flex: 1;
        .waitCommentGoodsName {
          font-size: 12px;
        }
        .gotoOrder {
          border: 1px solid #ccc;
          border-radius: 5px;
          color: #ccc;
          position: absolute;
          right: 80px;
          bottom: 0px;
          font-size: 10px;
          text-align: center;
          height: 20px;
          width: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .gotoComment {
          border: 1px solid #cab894;
          border-radius: 5px;
          color: #cab894;
          position: absolute;
          right: 10px;
          bottom: 0px;
          font-size: 12px;
          text-align: center;
          height: 20px;
          width: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .no-more-tips,
  .no-data-box {
    color: #666;
    font-size: 12px;
    text-align: center;
    margin: 20px 0;
  }
  .loading {
    margin: 20px auto;
    display: block;
    width: 20px;
    height: 20px;
  }
}

.ht-tag {
  font-size: 12px;
  color: #fff;
  background: #000;
  padding: 2px 4px;
  margin-right: 3px;
  font-weight: 300;
}
</style>