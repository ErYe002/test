<template>
  <article class="container">
    <section class="search-box">
      <div class="input-box">
        <img class="icon" src="/static/images/icon_search.png" />
        <input
          class="input"
          :placeholder="placeHolderContent"
          v-model="keywords"
          type="text"
          confirm-type="搜索"
          @confirm="searchEvent"
          @input="inputEvent"
        />
        <img
          v-if="keywords != ''"
          @click="clearInputEvent"
          class="icon-clear"
          src="/static/images/icon_clear.png"
        />
      </div>
      <span class="cancel-btn" @click="cancelEvent">取消</span>
    </section>
    <section class="search-result-box" v-if="associationResult.length > 0">
      <ul class="list">
        <li class="item" v-for="item in associationResult" :key="item.SEOCode">
          <a
            :href="'/pages/search/results/main?shopId='+shopId + '&keywords=' + item.GoodsName"
          >{{item.GoodsName}}</a>
        </li>
      </ul>
    </section>
    <template v-else>
      <section class="hot-search-box">
        <p class="title">热门搜索</p>
        <ul class="list">
          <li class="item" v-for="item in hotSearchList" :key="item.SearchId">
            <a
              :href="'/pages/search/results/main?shopId='+item.ShopId + '&keywords=' + item.SearchContent"
              class="link"
            >{{item.SearchContent}}</a>
          </li>
        </ul>
      </section>
      <section class="history-search-box">
        <p class="title">
          <text class="text">最近搜索</text>
          <span v-if="historySearchList.length > 0" class="btn" @click="clearHistoryEvent">清空</span>
        </p>
        <ul class="list" v-if="historySearchList.length > 0">
          <li class="item" v-for="item in historySearchList" :key="item.searchContent">
            <a
              :href="'/pages/search/results/main?shopId='+item.shopId + '&keywords=' + item.searchContent"
              class="link"
            >{{item.searchContent}}</a>
          </li>
        </ul>
        <p class="empty" v-else>无搜索历史</p>
      </section>
    </template>
  </article>
</template>

<script>
import api from "@/api/search";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      keywords: "",
      associationResult: [],
      hotSearchList: [],
      shopId: 1,
      placeHolderContent: "搜索"
    };
  },
  computed: {
    ...mapState("search", ["historySearchList"])
  },
  onLoad(options) {
    if (options && options.shopId) {
      this.shopId = options.shopId;
    }
    this._getPageData();
  },
  methods: {
    ...mapActions("search", ["setSearchHistory", "removeSearchHistory"]),
    /**
     * 输入框输入变化事件：触发联想搜索
     */
    inputEvent() {
      api.associationSearch(this.keywords).then(res => {
        this.associationResult = res.Data;
      });
    },
    /**
     * 文本框x点击事件
     */
    clearInputEvent() {
      this._resetInputData();
    },
    /**
     * 清除搜索历史记录
     */
    clearHistoryEvent() {
      this.removeSearchHistory();
    },
    /**
     * 取消：清空文本框数据并返回上一页
     */
    cancelEvent() {
      this._resetInputData();
      wx.navigateBack({
        delta: 1
      });
    },
    /**
     * 搜索
     */
    searchEvent() {
      this.setSearchHistory({
        searchContent: this.keywords,
        shopId: this.shopId
      });
      wx.navigateTo({
        url: '/pages/search/results/main?shopId='+this.shopId+'&keywords='+this.keywords
      })
    },
    _resetInputData() {
      this.associationResult = [];
      this.keywords = "";
    },
    _getPageData() {
      api.getSerarchSettins().then(res => {
        let list = res.Data.SearchHotList.filter(ele => {
          return ele.ShopId == this.shopId;
        });
        this.hotSearchList = list;
        this.placeHolderContent = res.Data.SearchRecommendList[0].SearchContent;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 10px 15px;
  box-sizing: border-box;
  .input-box {
    position: relative;
    flex: 1;
    background: #f2f2f2;
    border-radius: 6px;
    margin-right: 10px;
    .icon {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
    .icon-clear {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
    .input {
      height: 28px;
      line-height: 28px;
      padding-left: 40px;
      padding-right: 40px;
      box-sizing: border-box;
    }
  }
  .cancel-btn {
    color: #888;
  }
}

.search-result-box {
  .list {
    .item {
      a {
        border-bottom: 0.5px solid #d7d7d7;
        padding: 10px 15px;
        font-size: 13px;
        color: #888;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:last-child {
        a {
          border-bottom: none;
        }
      }
    }
  }
}

.hot-search-box {
  padding: 7px 15px 15px;
  border-bottom: 0.5px solid #ccc;
  .title {
    font-size: 16px;
  }
  .list {
    overflow: hidden;
    margin-top: 15px;
    .item {
      float: left;
      .link {
        color: #cab894;
        font-size: 14px;
        padding: 4px 8px;
      border: 0.5px solid #cab894;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      }
    }
  }
}

.history-search-box:extend(.hot-search-box all) {
  padding: 17px 15px 15px;
  border-bottom: none;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn {
      border: 1px solid #708090;
      background-color: #888888;
      padding: 0 6px;
      border-radius: 15px;
      font-size: 14px;
      color: #fff;
    }
  }
  .empty {
    margin-top: 15px;
    color: #666;
    font-size: 12px;
  }
  .list {
    .item {
      .link {
        border-color: #888;
        color: #888;
      }
    }
  }
}
</style>