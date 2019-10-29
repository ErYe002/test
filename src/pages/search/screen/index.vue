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
          <img
            class="icon"
            v-if="listQuery.sort == 4 && currentSortTypeIdx == 2"
            src="/static/images/icon_sort_down_active.png"
          />
          <img
            class="icon"
            v-else-if="listQuery.sort == 3 && currentSortTypeIdx == 2"
            src="/static/images/icon_sort_up_active.png"
          />
          <img class="icon" v-else src="/static/images/icon_sort_down.png" />
        </li>
        <li
          class="item"
          :class="'item'+ ((listQuery.brandId != '' || listQuery.uPrice != '' || listQuery.lPrice != '' || listQuery.attrs.length > 0) ? ' current': '')"
          data-idx="3"
        >
          <a
            :href="'/pages/search/screen/filterRules/main?classId=' + listQuery.classId"
            class="text"
          >筛选</a>
        </li>
      </ul>
    </section>
    <section class="goods-box">
      <searchList v-if="goodsList.length > 0" :data-list="goodsList" />
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
import searchList from "@/components/search_list";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      goodsList: [],
      currentSortTypeIdx: 0, //0：综合排序  1：销量排序  2：价格排序
      isLoading: false,
      isReversePrice: true, //价格是否从大到小排序
      totalPage: 0,
      isNoData: false,
      listQuery: {
        className: "", //分类名称
        classId: "", //分类ID
        page: 1, //页码
        sort: 0, //排序方式：0：综合  2：销量  3：价格从小到大  4：价格从大到小
        seoCode: "", //分类seocode
        //以下数据来自筛选条件页
        brandId: "", //品牌ID
        uPrice: "", //最高价
        lPrice: "", //最低价
        attrs: [] //其余筛选条件组合
      }
    };
  },
  computed: {
    ...mapState("filterRules", ["selectedFilterRules", "isNeedFilter"]) //1.当前选中的筛选条件：来自筛选条件页  2.是否需要重新调接口进行筛选
  },
  components: {
    searchList
  },
  onShow() {
    if (this.isNeedFilter) {
      console.log("搜索条件已变动，重新请求数据");
      //取出wordId数组，因为store存储的格式是{groupId,wordId}
      let wordIdList = [];
      this.selectedFilterRules.attrs.forEach(ele => {
        wordIdList.push(ele.wordId);
      });
      this.listQuery.page = 1;
      this.isNoData = false;
      this.listQuery = {
        ...this.listQuery,
        ...this.selectedFilterRules,
        attrs: [...wordIdList]
      };
      this._searchGoods();
    }
  },
  onLoad(options) {
    if (options && options.className) {
      this.listQuery.className = options.className;
      wx.setNavigationBarTitle({
        title: options.className
      });
    }
    if (options && options.classId) {
      this.listQuery.classId = options.classId;
    }
    if (options && options.seoCode) {
      this.listQuery.seoCode = options.seoCode;
    }
    this._searchGoods();
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.listQuery.page < this.totalPage) {
      this.listQuery.page++;
      this._searchGoods();
    }
  },
  methods: {
    ...mapActions("filterRules", ["removeFilterRules", "setIsNeedFilter"]),
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
      this.listQuery.sort = sort;
      this.listQuery.page = 1;
      this.isNoData = false;
      this.goodsList = [];
      this._searchGoods();
    },
    _searchGoods() {
      if (!this.isLoading) {
        this.isLoading = true;
        api
          .getScreeningGoodsList({ ...this.listQuery })
          .then(({ Data, TotalPage }) => {
            this.goodsList =
              this.listQuery.page > 1 ? this.goodsList.concat(Data) : Data;
            this.totalPage = TotalPage;
            //没有搜索到任何数据
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
            this.setIsNeedFilter(false);
          });
      }
    }
  },
  onUnload() {
    this.removeFilterRules();
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