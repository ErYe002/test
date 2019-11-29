<template>
  <article class="wrap">
    <template v-if="model != null">
      <section class="banner-box">
        <swiper
          class="swiper"
          @change="swiperChangeEvent"
          autoplay
          v-if="model.BannerList != null && model.BannerList.length > 0"
        >
          <swiper-item v-for="item in model.BannerList" :key="item.Id">
            <img :src="item.ImageUrl" @click="$navigateTo(item.TargetUrl)" />
          </swiper-item>
        </swiper>
        <ul class="pages">
          <li
            :class="{active: idx == swiperIndex}"
            v-for="(item,idx) in model.BannerList"
            :key="idx"
          ></li>
        </ul>
      </section>
      <section class="brand-box" v-if="model.BrandList != null && model.BrandList.length > 0">
        <div class="content-box">
          <p class="title">BRAND SELECTED | 品牌精选</p>
          <div class="list-box">
            <ul class="list">
              <li class="item" v-for="item in model.BrandList" :key="item.Id">
                <a @click="$navigateTo(item.TargetUrl)">
                  <img class="normal" :src="item.ColorImageUrl" />
                  <!-- <img class="colorful" src="https://pic.keede.com/AppImages/8b0280ce-27ba-415d-86b5-5d12effaecbc.png"/> -->
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        class="activity-box"
        v-if="model.ActivityList != null && model.ActivityList.length > 0"
      >
        <p class="title">WONDERFUL ACTIVITY | 活动精选</p>
        <div class="img-box">
          <img class="big-img" :src="model.ActivityList[0]['ImageUrl']" @click="$navigateTo(model.ActivityList[0]['TargetUrl'])"/>
          <div class="right-img-box">
            <img class="small-img" :src="model.ActivityList[1]['ImageUrl']" @click="$navigateTo(model.ActivityList[1]['TargetUrl'])"/>
            <img class="small-img" :src="model.ActivityList[2]['ImageUrl']" @click="$navigateTo(model.ActivityList[2]['TargetUrl'])"/>
          </div>
        </div>
      </section>
      <section class="featured-box">
        <p class="title">FEATURED SPECIALS | 风格精选</p>
        <ul class="filter-list" v-if="framesAttributeList.length > 0">
          <li class="f-item" v-for="(item, idx) in framesAttributeList" :key="idx">
            <template v-if="item != null && item.length > 0">
              <div
                class="img-box"
                v-for="img in item"
                :key="img.Id"
                @click="filterEvent(img.WordId, img.IsDisabled)"
              >
                <img v-if="img.IsDefault" :src="img.DefaultImageUrl" />
                <img v-else-if="img.IsDisabled" :src="img.DisableImageUrl" />
                <img v-else-if="img.IsSelected" :src="img.SelectedImageUrl" />
              </div>
            </template>
          </li>
        </ul>
        <ul class="goods-list">
          <a
            :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
            class="item"
            v-for="item in goodsList"
            :key="item.SeoCode"
          >
            <img :src="item.BrandImageUrl" class="brand-img" />
            <img :src="item.ImageUrl" class="img" />
            <p class="name">{{item.GoodsName}}</p>
            <p class="desc">{{item.ShortDescription}}</p>
            <p class="info">
              <span class="rate">{{item.PraiseProportion != '' && item.PraiseProportion != '0.0%' && item.PraiseProportion != '%' ? (item.PraiseProportion+'好评') : ''}}</span>
              <span class="price-info">
                <em class="price">¥{{item.SalePrice}}</em>
                <em
                  class="tag"
                  v-if="item.PriceLabel != null && item.PriceLabel != ''"
                >{{item.PriceLabel}}</em>
                <img src="/static/images/icon_small_cart.png" class="icon" />
              </span>
            </p>
          </a>
        </ul>
        <p class="no-more-tips" v-if="listQuery.pageIndex == totalPage">已经到底了哦~</p>
      </section>
    </template>
  </article>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      swiperIndex: 0,
      model: null,
      framesAttributeList: [],
      goodsList: [],
      selectedWordId: [],
      totalPage: 0,
      isLoading: false,
      listQuery: {
        stringWordIds: null,
        pageIndex: 1,
        pageSize: 10,
        isDefaultGoods: true
      }
    };
  },
  async onLoad() {
    await this._getPageData();
    await this._getListData();
  },
  onReachBottom() {
    if (this.listQuery.pageIndex < this.totalPage) {
      this.listQuery.pageIndex++;
      this._getListData();
    }
  },
  //下拉刷新
  async onPullDownRefresh() {
    Object.assign(this.$data, this.$options.data())
    await this._getPageData()
    await this._getListData();
  },
  methods: {
    filterEvent(wordId, isDisabled) {
      if (isDisabled) return;
      if (
        this.listQuery.stringWordIds != null &&
        this.listQuery.stringWordIds.includes(wordId)
      ) {
        //从当前筛选条件中删除该条件
        this.listQuery.stringWordIds.splice(
          this.listQuery.stringWordIds.findIndex(item => item === wordId),
          1
        );
      } else {
        if (
          this.listQuery.stringWordIds == null &&
          !Array.isArray(this.listQuery.stringWordIds)
        ) {
          this.listQuery.stringWordIds = [];
        }
        this.listQuery.stringWordIds.push(wordId);
      }
      if (this.listQuery.stringWordIds.length <= 0) {
        //当筛选条件为空，则重置请求数据
        this.listQuery.isDefaultGoods = true;
        this.listQuery.stringWordIds = null;
      } else {
        this.listQuery.isDefaultGoods = false;
      }
      this.listQuery.pageIndex = 1
      this._getListData();
    },
    _getPageData() {
      api.getHomeFramesData().then(({ Data }) => {
        this.model = Data;
        this.framesAttributeList = Data.FramesAttributeList;
      });
    },
    _getListData() {
      if (!this.isLoading) {
        this.isLoading = true
        api.getHomeFramesGoods({ ...this.listQuery }).then(({ Data }) => {
          if (Data.GoodsResult != null) {
            let list = Data.GoodsResult.Data.map(ele => {
              //当PriceLabel中的价格含有“.00”时，进行去除
              if (/\d+.\d+/.test(ele.PriceLabel)) {
                ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
              }
              return ele;
            });
            this.goodsList =
              this.listQuery.pageIndex > 1
                ? this.goodsList.concat(list)
                : list;
            this.totalPage = Data.GoodsResult.TotalPage;
          }
          let fList = this.framesAttributeList;
          fList.forEach(item => {
            item = item.map(child => {
              child.IsSelected = false;
              child.IsDefault = false;
              child.IsDisabled = false;
              if (
                this.listQuery.stringWordIds != null &&
                this.listQuery.stringWordIds.includes(child.WordId)
              ) {
                child.IsSelected = true;
                return false;
              }
              if(Data.AttrWordIdList != null){
                if (Data.AttrWordIdList.includes(child.WordId)) {
                  child.IsDefault = true;
                } else {
                  child.IsDisabled = true;
                }
              } else {
                child.IsDefault = true
              }
            });
          });
          this.framesAttributeList = fList;
        }).finally(() => {
          this.isLoading = false
        });
      }
    },
    //同步swiper page
    swiperChangeEvent(e) {
      this.swiperIndex = e.mp.detail.current;
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  background: #f5f5f5;
  min-height: 100vh;
}
.banner-box {
  padding-bottom: 12px;
  .swiper {
    height: 286.5px;
    img {
      display: block;
      width: 345px;
      height: 286.5px;
      border-radius: 15px;
      margin: 0 auto;
    }
  }
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
    li {
      width: 7.5px;
      height: 3px;
      background: #9e9e9f;
      margin: 0 5px;
      border-radius: 5px;
      &.active {
        width: 36.5px;
        background: #3e3a39;
      }
    }
  }
}

.banner-box,
.brand-box,
.activity-box,
.featured-box {
  background: #fff;
  .title {
    color: #000;
    // font-weight: bold;
    font-size: 13px;
    text-align: center;
    padding: 12px 0 16px;
  }
}

.brand-box {
  padding: 10.5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .content-box {
    border: 0.5px solid #e9e9e9;
    border-radius: 10px;
    overflow: hidden;
  }
  .list-box {
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        box-sizing: border-box;
        img {
          display: block;
          width: 117.5px;
          height: 41.5px;
          box-sizing: border-box;
        }
      }
    }
  }
}

.activity-box {
  background: #f5f5f5;
  padding: 0 10.5px 20px;
  img {
    border-radius: 10px;
  }
  .img-box {
    display: flex;
    justify-content: space-between;
    .big-img {
      display: block;
      width: 195px;
      height: 176px;
    }
    .right-img-box {
      display: flex;
      flex-direction: column;
      .small-img {
        display: block;
        width: 152px;
        height: 85px;
        &:first-child {
          margin-bottom: 6px;
        }
      }
    }
  }
}

.featured-box {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: transparent;
  .filter-list {
    margin-left: -17.5px;
    overflow: hidden;
    .f-item {
      display: flex;
      align-items: center;
      margin-bottom: 15.5px;
      padding: 0 33px;
      .img-box {
        width: 48px;
        height: 48px;
        margin-left: 17.5px;
        img {
          display: block;
          width: 48px;
          height: 48px;
        }
      }
    }
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    .item {
      width: 173px;
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      margin-bottom: 8px;
      padding-bottom: 8px;
      .brand-img {
        display: block;
        width: 87px;
        height: 7px;
        margin: 5px auto 5px;
      }
      .img {
        display: block;
        width: 173px;
        height: 173px;
      }
      .name,
      .desc {
        white-space: initial;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        height: 37px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name,
      .desc,
      .info {
        padding: 0 9px;
      }
      .name {
        color: #b6a380ff;
        font-size: 14px;
      }
      .desc {
        font-size: 12px;
        color: #878788ff;
        height: 33px;
        margin: 5px 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rate {
          color: #878788ff;
          font-size: 10px;
        }
        .price-info {
          display: flex;
          align-items: center;
          .price {
            font-size: 13px;
            color: #e25256;
            margin-right: 3px;
          }
          .tag {
            display: block;
            font-size: 9px;
            font-weight: 300;
            color: #fff;
            padding: 1px 2px;
            margin-right: 3px;
            background: #e25256;
            border-radius: 15px;
          }
          .icon {
            display: block;
            width: 17px;
            height: 17px;
          }
        }
      }

      &:nth-child(odd) {
        margin-right: 9.5px;
      }
    }
  }
}

.no-more-tips {
  color: #666;
  font-size: 12px;
  text-align: center;
  margin: 20px 0;
}
</style>