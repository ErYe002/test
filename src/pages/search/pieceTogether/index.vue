<template>
  <article class="wrap">
    <section class="tab-box">
      <ul class="list">
        <li :class="{item: true, current: listQuery.sort == 0}" data-sort="0" @click="changeSortType">
          <span>综合</span>
        </li>
        <li :class="{item: true, current: listQuery.sort == 6}" data-sort="6" @click="changeSortType">
          <span>销量</span>
        </li>
        <li :class="{item: true, current: listQuery.sort == 4 || listQuery.sort == 3}" :data-sort="isReversePrice ? 4 : 3" data-isprice="true" @click="changeSortType">
          <span>价格</span>
          <img class="icon" v-if="listQuery.sort == 4" src="/static/images/icon_sort_down_active.png" />
          <img class="icon" v-else-if="listQuery.sort == 3" src="/static/images/icon_sort_up_active.png" />
          <img class="icon" v-else src="/static/images/icon_sort_down.png" />
        </li>
      </ul>
    </section>
    <section class="goods-box">
      <template v-if="dataList.length > 0">
        <p class="tips">
          <template v-if="isMJ">以下商品<em>{{title}}</em>可凑单</template>
          <template v-else>以下商品适用于<em>{{title}}</em>优惠券</template>
        </p>
        <div class="g-list">
          <a :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'" class="g-item" v-for="item in dataList" :key="item.GoodsId">
            <img class="g-img" :src="item.GoodsImg" />
            <p class="g-name">
              <span class="oversea-tag" v-if="listQuery.shopId == 2">海淘</span>
              {{item.GoodsName}}
            </p>
            <p class="price">¥{{item.Price}}</p>
          </a>
        </div>
      </template>
      <img
        class="loading"
        v-if="listQuery.page == 1 && isLoading"
        src="/static/images/mu_loading.gif"
      />
      <p class="no-more-tips" v-if="listQuery.page == totalPage">没有更多了</p>
      <p class="no-data-box" v-else-if="isNoData">抱歉，没有找到你想要的商品哦</p>
    </section>
  </article>
</template>

<script>
import api from "@/api/search";

export default {
  data() {
    return {
      title: "",
      tag:"",//仅用于商量页跳转显示 可凑单
      dataList: [],
      totalPage: 0,
      isLoading: false,
      isNoData: false,
      isReversePrice: true, //价格是否从大到小排序
      listQuery: {
        shopId: 1,
        promotionId: "",
        settingId: 0,
        keyWord: "",
        sort: 6,  //排序方式：0综合  6销量  3价格由低到高   4价格由高到底
        page: 1,
        size: 10
      }
    };
  },
  computed:{
    isMJ(){
      return this.title.indexOf('满减') != -1 || this.tag.indexOf('满减') != -1
    }
  },
  onLoad(options) {
    if (options) {
      this.listQuery = Object.assign({}, this.listQuery, { ...options });
      wx.setNavigationBarTitle({
        title: options.title
      });
      this.title = options.title
      this.tag = options.tag?options.tag:""
      this._getPageData();
    }
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.listQuery.page < this.totalPage) {
      this.listQuery.page++;
      this._getPageData();
    }
  },
  methods: {
    changeSortType(e) {
      let sort = e.currentTarget.dataset.sort;
      let isprice = e.currentTarget.dataset.isprice;
      if (isprice) {
        this.isReversePrice = sort == 3; //切换下一次点击时的价格排序方式
      } else {
        this.isReversePrice = true
      }

      this.listQuery.sort = sort
      this.listQuery.page = 1;
      this.isNoData = false;
      this.dataList = [];
      this._getPageData()
    },
    _getPageData() {
      if (!this.isLoading) {
        this.isLoading = true;
        api
          .searchPromotionGoods({ ...this.listQuery })
          .then(({ Data, TotalPage }) => {
            this.dataList =
              this.listQuery.page == 1 ? Data : this.dataList.concat(Data);
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
.wrap {
  min-height: 100vh;
  background: #f2f2f2;
}
.tab-box {
  background: #fff;
  .list {
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #e3e3e3;
    box-sizing: border-box;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
      }
      .icon {
        display: block;
        width: 25px;
        height: 25px;
      }
      &.current {
        span {
          color: #cab894;
          border-bottom: 2px solid #cab894;
        }
      }
    }
  }
}

.goods-box {
  .tips {
    text-align: center;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    em {
      display: inline-block;
      color: #e53853;
    }
  }
  .g-list {
    overflow: hidden;
    padding: 0 10px 10px 10px;
    .g-item {
      float: left;
      width: calc(50% - 5px);
      box-sizing: border-box;
      padding: 5px;
      background: #fff;
      margin-bottom: 10px;
      .g-img {
        display: block;
        width: 162.5px;
        height: 162.5px;
        margin: 0 auto;
      }
      .g-name {
        font-size: 12px;
        font-weight: 300;
        margin: 3px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 33px;
        .oversea-tag {
          display: inline-block;
          font-size: 10px;
          color: #fff;
          background: #000;
          padding: 2px 4px;
          margin-right: 3px;
          font-weight: 300;
        }
      }
      .price {
        font-size: 18px;
        color: #e31436;
      }

      &:nth-child(odd) {
        margin-right: 5px;
      }
      &:nth-child(even) {
        margin-left: 5px;
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
</style>