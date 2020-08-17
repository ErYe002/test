<template>
  <article class="container">
    <section class="order-box">
      <ul class="order-list">
          <li class="wait_evaluate" v-for="(item,index) in orderList" :key="index">
            <div class="waitDivFirst">
              <img class="waitCommentGoodsImg" :src="item.GoodsImageUrl" @error="orderImgError(index)" mode="aspectFill" />
            </div>
            <div class="waitDivSecond">
              <p class="waitCommentGoodsName">{{item.GoodsName}}</p>
              <!-- <a
                class="gotoOrder"
                :href="'/pages/account/order/detail/main?orderId='+item.OrderId+'&dataSource='+item.DataSource"
              >查看订单</a> -->
              <a
                class="gotoComment"
                :href="'/pages/account/order/comment/main?orderId=' + item.OrderId +'&goodsId=' + item.GoodsId + '&goodsImageUrl=' + item.GoodsImageUrl+'&goodsName='+item.GoodsName"
              >评价返现</a>
            </div>
          </li>
      </ul>
      <img
        class="loading"
        v-if="listQuery.page == 1 && isLoading"
        src="/static/images/mu_loading.gif"
      />
      <p class="no-data-box" v-else-if="isNoData">抱歉，没有此类订单哦</p>
    </section>
  </article>
</template>

<script>
import api from "@/api/order";
import cartApi from "@/api/cart";
import { mapState } from "vuex";
import utils from "@/utils"; 
const TDSDK = require('../../../../../static/tdsdk/tdweapp'); 

export default {
  data() {
    return {
      fixedTopHeight: 83,
      orderList: [],
      isLoading: false,
      totalPage: 0,
      isNoData: false,
      listQuery: {
        queryState: 6, //0全部,1.处理中,2已完成,3待付款,4待发货,5待收货,6待评价
        isFreshCache: false,
        page: 1,
        queryString: ""
      },
      listHis:{
        page:1
      },
      his_totalPage:0,
      flag:false//过渡开关 拿取历史订单页数
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
    this.switchTypeEvent(6)
  },
  onShow(){
    var flag = wx.getStorageSync('isCommentReturn');
    if(flag){
      wx.setStorageSync('isCommentReturn',false)
      this.switchTypeEvent(6)
    }
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
      this.flag = false;
      this.his_totalPage=0
      this.isNoData = false;
      this.orderList = [];
      this._getListEvent();
    },
    _getListEvent() {
      this._reuqest().then(({ Data, TotalPage }) => {
        this.orderList =
          this.listQuery.page > 1 ? this.orderList.concat(Data) : Data;
        this.totalPage = TotalPage;
        //没有搜索到任何数据
        if ((!Data || Data.length <= 0)&&this.listQuery.queryState!=0) {
          this.isNoData = true;
        }
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
  background: #F6F6F6;
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
  z-index: 1;
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
        color: #000;
        border-bottom: 2px solid #FF668E;
      }
    }
  }
}

.order-box {
  padding: 20px 10px;
  box-sizing: border-box;
  .order-list {
    .o-item {
      border-radius: 10px;
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
            span{
              display: flex;
              flex-wrap: wrap;

            }
            .bz{
              color: transparent;
            }
            .btn_copy{
              color: #FF668E;
              font-size: 11px;
              padding: 1px 5px;
              border-radius: 5px;
              border: 0.5px solid #FF668E;
              margin-left: 3px;
            }
          }
          .ops {
            display: flex;
            align-items: center;
            color: #FF435E;
            .icon {
              display: block;
              width: 7px;
              height: 11px;
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
          color: #FF435E;
          font-size: 14px;
        }
      }
      .btn-box{
        display: flex;
        justify-content: space-between;
        .again{
          // width: 60px;
          padding: 10px 0 0 15px;
          button{
            padding: 0 10px;
            border-radius: 7px;
            width: 73px;
            color: #FF668E;
            box-sizing: border-box;
            border:0.5px solid #FF668E;
          }
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
          // width: 90px;
          // padding: 0 10px;
          .contact{
            background: #FF668E;
            color: #fff;
            border: 0;
          }
          .wuliu{
            padding: 0 10px;
            border-radius: 7px;
            color:#999999;
            border:0.5px solid #888888;
          }
          &:last-child{
            button,a{
              background: #FF668E !important;
              color: #fff !important;
              border-radius: 7px;
              border: 0;
            }
          }
        }
        button{
          padding: 0 10px;
          border-radius: 7px;
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
          height: 75px;
          width: 75px;
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
          font-size: 12px;
          text-align: center;
          // height: 20px;
          // width: 55px;
           padding: 7px 10px;
          border-radius: 7px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .gotoComment {
          background: #FF668E;
          border-radius: 5px;
          color: #fff;
          position: absolute;
          right: 10px;
          bottom: 0px;
          font-size: 12px;
          text-align: center;
          // height: 20px;
          // width: 55px;
          padding: 7px 10px;
          border-radius: 7px;
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
.banner_url{
  width: 100%;
  // height: 100px;
}
</style>