<template>
  <article class="wrap">
    <ul class="list" v-if="list.length > 0">
      <li class="item" v-for="item in list" :key="item.GoodsId">
        <div class="info-box">
          <img class="g-img" :src="item.ImageUrl" />
          <div class="info">
            <div class="g-name">{{item.GoodsName}}</div>
            <div class="g-price">¥{{item.FavoritePrice}}</div>
          </div>
        </div>
        <div class="op-box">
          <img
            @click="del_img_click(item.GoodsId)"
            src="/static/images/account_favorite_delete.png"
          />
        </div>
      </li>
    </ul>
    <img class="loading" v-if="page == 1 && isLoading" src="/static/images/mu_loading.gif" />
    <div class="favo_Clear" v-else-if="isNoData">
      <p>您还没有收藏任何商品!</p>
      <a href="/pages/index/main" open-type="switchTab">去查看商品</a>
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
          .getFavoriteList(this.page, this.size)
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
    },
    del_img_click(key) {
      var current = this;
      wx.showModal({
        title: "提示",
        content: "确定要删除该收藏吗？",
        confirmColor: "#cab894",
        success(res) {
          if (res.confirm) {
            api.cancelFavoriteByGoodsId(key).then(()=>{
              current.page = 1;
              current._getPageData();
            }).catch()
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 0.5px solid #e5e5e5;
    position: relative;
    padding: 10px;
    .info-box {
      display: flex;
      .g-img {
        display: block;
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .info {
        flex: 1;
        .g-name {
          font-size: 14px;
          font-weight: 300;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 36px;
        }
        .g-price {
          margin-top: 10px;
          font-size: 16px;
          color: #e31436;
        }
      }
    }
    .op-box {
      position: absolute;
      right: 10px;
      bottom: 10px;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 20px;
        height: 20px;
      }
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