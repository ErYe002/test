<template>
  <article class="wrap">
    <div  class="bgcolor"></div>
    <ul class="list" v-if="list.length > 0">
      <li class="item" v-for="item in list" :key="item.GoodsId" >
        <div>下单时间：{{item.OrderTimeStr}}</div>
        <div>订单号：{{item.OrderNo}}</div>
        <div class="order-value">订单金额：{{item.OrderPayment}}</div>
        <div class="svip-value">SVIP以省：{{item.PreferentialPrice}}</div>
      </li>
    </ul>
    <img class="loading" v-if="page == 1 && isLoading" src="/static/images/mu_loading.gif" />
    <div class="favo_Clear" v-else-if="isNoData">
      <p>暂时没有数据！</p>
    </div>
    <p class="no-more-tips" v-if="page == totalPage">没有更多了</p>
  </article>
</template>

<script>
import api from "@/api/user";

export default {
  data() {
    return {
      list: [],
      page: 1,
      totalPage: 0,
      isLoading: false,
      isNoData: false,
      size: 10
    };
  },
  onLoad() {
    this._getPageData();
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.page < this.totalPage) {
      this.page++;
      this._getPageData();
    }
  },
  methods: {
    _getPageData() {
      if (!this.isLoading) {
        this.isLoading = true;
        api
          .GetSvipOrderDeductionList(this.page, this.size)
          .then(({ Data, TotalPage }) => {
            this.list = this.page > 1 ? this.list.concat(Data) : Data;
            this.totalPage = TotalPage;
            //没有搜索到任何数据
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bgcolor{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  background: #f2f2f2;
  z-index: -1;
}
.wrap{
    padding: 10px;
  border-radius: 10px;
}
.list {
  background: #fff;
  border-radius: 10px;
  .item {
    border-bottom: 0.5px solid #DEDEDE;
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-weight: 540;
    font-size: 12px;
    color: #898989;
    .order-value{
      color: #000000;
    }
    .svip-value{
      color: #FE668D;
    }
    &:last-child{
      border: 0;
    }
  }
}
.favo_Clear {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
  margin: auto auto;
  margin-top: 150px;
  font-size: 14px;
  button {
    width: 130px;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    color: #cab894;
    border: 1px solid #cab894;
    border-radius: 20px;
    background: none;
    font-size: 15px;
  }
}

.no-more-tips {
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
</style>