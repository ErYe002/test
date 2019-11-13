<template>
  <article class="container">
    <section class="tab-box">
      <ul class="list">
        <li
          :class="'item'+ (currentSortTypeIdx == 0 ? ' current': '')"
          data-sortype="0"
          data-idx="0"
          @click="resortEvent"
        >
          <div class="text">综合</div>
        </li>
        <li
          :class="'item'+ (currentSortTypeIdx == 1 ? ' current': '')"
          data-sortype="2"
          data-idx="1"
          @click="resortEvent"
        >
          <div class="text">销量</div>
        </li>
        <li
          :class="'item'+ (currentSortTypeIdx == 2 ? ' current': '')"
          :data-sortype="isReversePrice ? 4:3"
          data-idx="2"
          @click="resortEvent"
        >
          <div class="text">价格</div>
          <img class="icon" v-if="sort == 4" src="/static/images/icon_sort_down_active.png" />
          <img class="icon" v-else-if="sort == 3" src="/static/images/icon_sort_up_active.png" />
          <img class="icon" v-else src="/static/images/icon_sort_down.png" />
        </li>
      </ul>
    </section>
    <section class="goods-box">
      <img class="loading" v-if="page == 1 && isLoading" src="/static/images/mu_loading.gif" />
      <searchList v-if="goodsList.length > 0" :data-list="goodsList" />
      <p class="no-more-tips" v-if="page == totalPage">没有更多了</p>
      <p class="no-data-box" v-else-if="isNoData && keywords != ''">抱歉，没有找到你想要的商品哦</p>
    </section>
  </article>
</template>

<script>
import api from "@/api/search";
import searchList from "@/components/searchList";

export default {
  data() {
    return {
      shopId: 1,
      keywords: "",
      sort: 0, //0：综合排序  2：销量排序  3：价格从小到大  4：价格从大到小
      currentSortTypeIdx: 0, //0：综合排序  1：销量排序  2：价格排序
      isReversePrice: true, //价格是否从大到小排序
      page: 1,
      totalPage: 0,
      goodsList: [],
      isNoData: false,
      isLoading: false
    };
  },
  components: {
    searchList
  },
  /**
   * 页面接收两个参数：shopId、keywords
   */
  onLoad(options) {
    if (options && options.shopId) {
      this.shopId = options.shopId;
    }
    if (options && options.keywords) {
      this.keywords = options.keywords;
    }
    this._searchGoods();
    wx.setNavigationBarTitle({
      title: this.keywords
    });
  },
  // onUnload(){
  //   this.goodsList = []
  // },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.page < this.totalPage) {
      this.page++;
      this._searchGoods();
    }
  },
  methods: {
    resortEvent(e) {
      console.log(e);
      wx.pageScrollTo({
        scrollTop: 0
      });
      let sort = e.currentTarget.dataset.sortype;
      let idx = e.currentTarget.dataset.idx;
      //铵价格排序
      if (idx == 2) {
        this.isReversePrice = sort == 3; //切换下一次点击时的价格排序方式
      }
      this.currentSortTypeIdx = idx;
      this.sort = sort;
      this.page = 1;
      this.goodsList = [];
      this._searchGoods();
    },
    _searchGoods() {
      if (!this.isLoading && this.keywords) {
        this.isLoading = true;
        api
          .searchGoods({
            shopId: this.shopId,
            keywords: this.keywords,
            page: this.page,
            sort: this.sort
          })
          .then(({ Data, TotalPage }) => {
            this.goodsList = this.page > 1 ? this.goodsList.concat(Data) : Data;
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
.tab-box {
  font-size: 16px;
  color: #888;
  height: 40px;
  .list {
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #ccc;
    background: #fff;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .icon {
        display: block;
        width: 25px;
        height: 25px;
      }
      &.current {
        color: #cab894;
      }
    }
  }
}

.goods-box {
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
</style>