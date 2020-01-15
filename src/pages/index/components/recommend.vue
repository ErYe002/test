<template>
  <article>
    <template v-if="model != null">
      <article class="first-floor-wrap">
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
        <section :class="{'hot-box': true, 'new-user': model.IsNewUser || !token}">
          <ul class="service-list">
            <li>全球精选</li>
            <li>品牌直供</li>
            <li>满80包邮</li>
            <li>7天退换</li>
          </ul>
          <div class="new-user-box" v-if="model.IsNewUser || !token">
            <button class="coupon" open-type="getUserInfo" @getuserinfo="getUserInfo"><img src="/static/images/new_user_img.png" /></button>
            <div
              class="goods-list"
              v-if="model.TwoFloorFourSmallGoodsList != null && model.TwoFloorFourSmallGoodsList.length >0"
            >
              <a
                class="link"
                v-for="item in model.TwoFloorFourSmallGoodsList"
                :key="item.id"
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
              >
                <img :src="item.ImageUrl" />
              </a>
            </div>
            <div class="btn-list">
              <a class="btn">
                <em>1件</em>
                <em>包邮</em>
              </a>
              <a class="btn">
                <em>新人</em>
                <em>必买</em>
              </a>
            </div>
          </div>
        </section>
      </article>
      <article class="second-floor-wrap">
        <navigator open-type="navigate" target="miniProgram" app-id="wxbb2e8b1089947444" class="group-link">
          <img :src="model.GroupBuyImageUrl" />
        </navigator>
        <section
          class="grid-box"
          v-if="model.OneBigThreeSmallList != null && model.OneBigThreeSmallList.length > 0"
        >
          <img
            class="left-img"
            :src="model.OneBigThreeSmallList[0]['ImageUrl']"
            @click="$navigateTo(model.OneBigThreeSmallList[0]['TargetUrl'])"
          />
          <div class="right-box">
            <img
              class="img"
              :src="model.OneBigThreeSmallList[1]['ImageUrl']"
              @click="$navigateTo(model.OneBigThreeSmallList[1]['TargetUrl'])"
            />
            <img
              class="img"
              :src="model.OneBigThreeSmallList[2]['ImageUrl']"
              @click="$navigateTo(model.OneBigThreeSmallList[2]['TargetUrl'])"
            />
            <img
              class="img"
              :src="model.OneBigThreeSmallList[3]['ImageUrl']"
              @click="$navigateTo(model.OneBigThreeSmallList[3]['TargetUrl'])"
            />
          </div>
        </section>
      </article>
      <article
        class="three-floor-wrap"
        v-if="model.OneBigTwoSmallList != null && model.OneBigTwoSmallList.length > 0"
      >
        <img
          :src="model.OneBigTwoSmallList[0]['ImageUrl']"
          class="big-img"
          @click="$navigateTo(model.OneBigTwoSmallList[0]['TargetUrl'])"
        />
        <img
          :src="model.OneBigTwoSmallList[1]['ImageUrl']"
          class="img"
          @click="$navigateTo(model.OneBigTwoSmallList[1]['TargetUrl'])"
        />
        <img
          :src="model.OneBigTwoSmallList[2]['ImageUrl']"
          class="img"
          @click="$navigateTo(model.OneBigTwoSmallList[2]['TargetUrl'])"
        />
      </article>
      <article class="four-floor-wrap">
        <section class="brand-box" v-if="brandList.length > 0">
          <p class="title">BRAND SELECTED | 品牌精选</p>
          <div class="list-box">
            <ul class="list">
              <li class="item" v-for="item in brandList" :key="item.Id">
                <a @click="$navigateTo(item.TargetUrl)">
                  <img :class="{normal:true,show:item.show,hide:!item.show}" :src="item.ColorImageUrl" />
                  <img :class="{normal:true,show:!item.show,hide:item.show}" :src="item.DefaultImageUrl" />
                  <!-- <img class="colorful" src="https://pic.keede.com/AppImages/8b0280ce-27ba-415d-86b5-5d12effaecbc.png"/> -->
                </a>
              </li>
            </ul>
            <p class="dorpdown-icon">
              <img
                :class="{up: brandList.length > 12}"
                src="/static/images/icon_dropdown.png"
                v-if="model.BrandList.length > 12"
                @click="toggleBrandEvent"
              />
            </p>
          </div>
        </section>
        <section
          class="seckill-box"
          v-if="model.SeckillList != null && model.SeckillList.length > 0 && currentSeckillIdx >= 0"
        >
          <p class="title">
            <b>每日秒杀 先到先得</b>
            <span>恢复原价代表已抢光</span>
          </p>
          <div class="goods-box">
            <div
              :class="{goods: true, locked: model.SeckillList[currentSeckillIdx]['status'] != '抢购中'}"
            >
              <template
                v-if="model.SeckillList[currentSeckillIdx].currentSeckillLeftList != null && model.SeckillList[currentSeckillIdx].currentSeckillLeftList.length > 0"
              >
                <a
                  class="link"
                  :href="model.SeckillList[currentSeckillIdx]['status'] == '抢购中' ? ('/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false') : fasle"
                  v-for="item in model.SeckillList[currentSeckillIdx].currentSeckillLeftList"
                  :key="item.GoodsId"
                >
                  <div class="img-box">
                    <img :src="item.ImageUrl" class="img" />
                    <span class="tag">省</span>
                  </div>
                  <p class="info">
                    <b class="price">¥{{item.PromotionPrice}}</b>
                    <span class="btn">立即抢</span>
                  </p>
                </a>
              </template>
            </div>
            <div class="time">
              <div
                :class="{'t-text': true, current: idx == currentSeckillIdx}"
                v-for="(item, idx) in model.SeckillList"
                :key="item.Id"
                @click="changeSeckillIdx(idx)"
              >
                <span class="clock">{{item.shortTime}}</span>
                <span class="text">{{item['status']}}</span>
              </div>
            </div>
            <div
              :class="{goods: true, locked: model.SeckillList[currentSeckillIdx]['status'] != '抢购中'}"
            >
              <template
                v-if="model.SeckillList[currentSeckillIdx].currentSeckillRightList != null && model.SeckillList[currentSeckillIdx].currentSeckillRightList.length > 0"
              >
                <a
                  class="link"
                  :href="model.SeckillList[currentSeckillIdx]['status'] == '抢购中' ? ('/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false') : fasle"
                  v-for="item in model.SeckillList[currentSeckillIdx].currentSeckillRightList"
                  :key="item.GoodsId"
                >
                  <div class="img-box">
                    <img :src="item.ImageUrl" class="img" />
                    <span class="tag">省</span>
                  </div>
                  <p class="info">
                    <b class="price">¥{{item.PromotionPrice}}</b>
                    <span class="btn">立即抢</span>
                  </p>
                </a>
              </template>
            </div>
          </div>
        </section>
        <section
          class="rangking-box"
          v-if="model.DailyRankingList != null && model.DailyRankingList.length > 0"
        >
          <p class="title">DAILY LIST | 每日榜单</p>
          <scroll-view class="scroll-view" scroll-x enable-flex>
            <a
              class="sc-item"
              v-for="(item, idx) in model.DailyRankingList"
              :key="item.Id"
              :href="'/pages/product/index/main?seocode='+item.GoodsSeoCode+'&isComp=false'"
            >
              <img :src="item.ImageUrl" class="img" />
              <p class="pirce">
                <b>¥{{item.SalePrice}}</b>
                <span class="btn">立即抢</span>
              </p>
              <span class="tag">{{item.DailyRankingName}}</span>
              <img v-if="idx < 4" :src="'/static/images/ranking_0'+(idx+1)+'.png'" class="ranking" />
            </a>
          </scroll-view>
        </section>
      </article>
      <article class="like-goods-wrap" v-if="goodsList.length > 0">
        <p class="title">GUESS YOU LIKE IT | 猜你喜欢</p>
        <ul class="list">
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
        <p class="no-more-tips" v-if="page == totalPage">已经到底了哦~</p>
      </article>
    </template>
  </article>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
import authorization from "@/utils/authorization";
import tools from "@/utils";

const defaultData = {
  swiperIndex: 0,
  model: null,
  brandList: [],
  page: 1,
  size: 10,
  totalPage: 0,
  isLoding: false,
  goodsList: [],
  currentSeckillIdx: 1
}

export default {
  data() {
    return Object.assign({}, defaultData);
  },
  computed: {
    ...mapState("user", ["token"])
  },
  async created() {
    console.log('created')
    await this._getPageData();
    await this._getGoodsListData();
  },
  onReachBottom() {
    if (this.page < this.totalPage) {
      this.page++;
      this._getGoodsListData();
    }
  },
  //下拉刷新
  async onPullDownRefresh() {
    Object.assign(this.$data, {...defaultData})
    await this._getPageData()
    await this._getGoodsListData();
  },
  methods: {
    getUserInfo(e) {
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
        wx.navigateTo({
          url: '/pages/account/coupon/main'
        })
      });
    },
    //同步swiper page
    swiperChangeEvent(e) {
      this.swiperIndex = e.mp.detail.current;
    },
    //显示所有品牌
    toggleBrandEvent() {
      this.brandList =
        this.brandList.length == this.model.BrandList.length
          ? this.model.BrandList.slice(0, 12)
          : this.model.BrandList;
    },
    changeSeckillIdx(idx) {
      this.currentSeckillIdx = idx;
    },
    _getPageData() {
      api.getHomeRecommendData().then(({ Data }) => {
        if (Data != null && Data.BrandList != null) {
          //处理秒杀数据
          Data.SeckillList.forEach((item, idx) => {
            let startTime = new Date(item.StartTime);
            let endTime = new Date(item.EndTime);
            let nowTime = new Date();
            if (startTime > nowTime) {
              //秒杀未开始
              item.status = "稍等抢";
            } else if (startTime < nowTime && endTime > nowTime) {
              //秒杀中
              item.status = "抢购中";
            } else if (endTime < nowTime) {
              //秒杀结束
              item.status = "已结束";
            }
            if (item.GoodsList.length > 2) {
              item.currentSeckillLeftList = [...item.GoodsList.slice(0, 2)];
              item.currentSeckillRightList = [
                ...item.GoodsList.slice(2, item.GoodsList.length)
              ];
            } else {
              item.currentSeckillLeftList = [...item.GoodsList];
            }
            item.shortTime = tools.formatDate("hh:mm", startTime);
          });
          this.reversalBrand(Data.BrandList)
          this.brandList =
            Data.BrandList.length > 12
              ? Data.BrandList.slice(0, 12)
              : Data.BrandList;
        }
        this.model = Data;
      });
    },
    //定时翻转品牌
    reversalBrand(list){
      let length = list.length;
      let arr = []
      for(var i =0;i<length;i++){
        arr.push(i)
      }
      let timerID = setInterval(()=>{

        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }

        // arr.sort(() => Math.random() - 0.5);
        list[arr[0]].show = true;
        this.brandList =
            list.length > 12
              ? list.slice(0, 12)
              : list;
        arr.shift()
        if(arr.length==0){
          clearInterval(timerID)
        }
      },5000)
    },
    //获取猜你喜欢商品列表
    _getGoodsListData() {
      if (!this.isLoding) {
        this.isLoding = true;
        api
          .getHomeRecommendGoods(this.page, this.size)
          .then(({ Data, TotalPage }) => {
            if (Data != null && Data.length > 0) {
              let list = Data.map(ele => {
                //当PriceLabel中的价格含有“.00”时，进行去除
                if (/\d+.\d+/.test(ele.PriceLabel)) {
                  ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
                }
                return ele;
              });
              this.goodsList =
                this.page > 1 ? this.goodsList.concat(list) : list;
              this.totalPage = TotalPage;
            }
          })
          .finally(() => {
            this.isLoding = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.first-floor-wrap {
  padding-bottom: 39.5px;
  .banner-box {
    margin-bottom: 12px;
    .swiper {
      height: 135px;
      img {
        display: block;
        width: 345px;
        height: 135px;
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
        background: #f7e6c3;
        margin: 0 5px;
        border-radius: 5px;
        &.active {
          width: 36.5px;
          background: #3e3a39;
        }
      }
    }
  }
  .hot-box {
    .service-list {
      color: #cfbb98;
      font-size: 12.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        width: 21%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:before {
          content: "";
          display: block;
          width: 4.5px;
          height: 4.5px;
          border-radius: 50%;
          background: #cfbb98;
          margin-right: 3.5px;
        }
      }
    }
    &.new-user {
      border-radius: 20px;
      border: 0.5px solid #cfbb98;
      margin: 0 10px;
      overflow: hidden;
      .service-list {
        background: #cfbb98;
        color: #fff;
        padding: 10px;
        box-sizing: border-box;
        li {
          width: 25%;
          &:before {
            background: #fff;
          }
        }
      }
      .new-user-box {
        padding: 6px 10px 6px 6px;
        display: flex;
        align-items: center;
        .coupon {
          width: 113px;
          height: 162px;
          padding: 0;
          margin: 0;
          img{
            display: block;
            width: 113px;
          height: 162px;
          }
        }
        .goods-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-left: 12.5px;
          flex: 1;
          .link {
            // margin-bottom: 21px;
            margin-right: 10px;
            img {
              display: block;
              width: 65px;
              height: 65px;
            }
            &:nth-child(n + 3) {
              margin-top: 20px;
            }
          }
        }
        .btn-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          .btn {
            width: 51px;
            height: 51px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #cfbb98;
            color: #fff;
            border-radius: 50%;
            font-size: 13px;
            &:nth-child(2) {
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
}

.second-floor-wrap {
  background: #f5f5f5;
  position: relative;
  padding-top: 30.5px;
  .group-link {
    background: transparent;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: -29.5px;
    img {
      display: block;
      width: 354.5px;
      height: 59px;
      margin: 0 auto;
    }
  }
  .grid-box {
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      border-radius: 6px;
    }
    .left-img {
      display: block;
      width: 194px;
      height: 266.5px;
    }
    .right-box {
      margin-left: 8px;
      .img {
        display: block;
        width: 153px;
        height: 84.5px;
        margin-bottom: 6.5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.three-floor-wrap {
  padding: 12.5px 10.5px;
  position: relative;
  box-sizing: border-box;
  img {
    display: block;
    border-radius: 6px;
  }
  .big-img {
    width: 354.15px;
    height: 255.4px;
    margin: 0 auto;
  }
  .img {
    position: absolute;
    width: 166.25px;
    height: 85.5px;
    z-index: 1;
    bottom: 18.5px;
    left: 16.5px;
    &:last-child {
      left: auto;
      right: 16.5px;
    }
  }
}

.brand-box,
.rangking-box,
.like-goods-wrap {
  .title {
    color: #000;
    // font-weight: bold;
    font-size: 13px;
    text-align: center;
    padding: 12px 0 16px;
  }
}

.four-floor-wrap {
  padding: 0 10.5px;
  .brand-box {
    border: 0.5px solid #e9e9e9;
    border-radius: 10px;
    margin-bottom: 20px;
    .list-box {
      position: relative;
      .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 14px 5px;
        .item {
          // flex: 0 0 25%;
          width: 81.5px;
          height: 41px;
          position: relative;
          box-sizing: border-box;
          border-bottom: 0.5px solid #DCDCDC;
          border-right: 0.5px solid #DCDCDC;
          img {
            display: block;
            width: 78.5px;
            height: 38px;
            transition: all 1s;
            position: absolute;
            left: 1.5px;
            top: 1.5px;
          }
           .show{
            z-index: 1;
            transform: rotateX(0deg)
          }
          .hide{
            z-index: 0;
            transform: rotateX(90deg)
          }
          // &:nth-child(-n+4){
          //   border-top: none;
          // }
          &:nth-child(4n) {
            border-right: none;
          }
        }
      }
      .dorpdown-icon {
        position: absolute;
        bottom: 5px;
        height: 1px;
        width: 100%;
        z-index: 5;
        background: #fff;
        left: 0;
        right: 0;
        margin: 0 auto;
        img {
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 20.5px;
          height: 10.5px;
          top: -2px;
          &.up {
            transform: rotateZ(180deg);
          }
        }
      }
    }
  }
  .seckill-box {
    border-radius: 10px;
    overflow: hidden;
    .title {
      color: #fff;
      background: #e25256;
      font-size: 12px;
      text-align: center;
      padding: 4px 0 2px;
      b {
        margin: -2px 0;
      }
      span {
        font-size: 10px;
        font-weight: 300;
      }
    }
    .goods-box {
      display: flex;
      align-items: center;
      border: 0.5px solid #e9e9e9;
      padding: 10px 0;
      .time {
        border-left: 0.5px solid #e9e9e9;
        border-right: 0.5px solid #e9e9e9;
        padding: 0 7px;
        flex: 1;
        .t-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          padding: 5px 0;
          border-radius: 10px;
          .clock {
            font-family: "clock";
            font-size: 32px;
          }
          .text {
            display: none;
          }
          &.current {
            background: #e25256;
            color: #fff;
            padding: 15px 0;
            .clock {
              font-size: 46px;
            }
            .text {
              display: block;
            }
          }
        }
      }
      .goods {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        .link {
          width: 65px;
          margin-bottom: 10px;
          .img-box {
            position: relative;
            .img {
              display: block;
              width: 65px;
              height: 65px;
            }
            .tag {
              position: absolute;
              right: 2px;
              top: 2px;
              display: block;
              width: 14px;
              height: 14px;
              line-height: 14px;
              text-align: center;
              font-size: 10px;
              color: #fff;
              background: #e25256;
              border-radius: 50%;
              font-weight: 300;
            }
          }
          .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              font-size: 12px;
              color: #e25256;
            }
            .btn {
              width: 34px;
              height: 12px;
              line-height: 12px;
              text-align: center;
              font-size: 9px;
              color: #fff;
              background: #e25256;
              border-radius: 15px;
              font-weight: 300;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }

        &.locked {
          .link {
            .info {
              .btn {
                background: #bbb;
              }
            }
          }
        }
      }
    }
  }
  .rangking-box {
    padding-bottom: 15px;
    .scroll-view {
      display: flex;
      height: 133px;
      .sc-item {
        width: 85.5px;
        background: #f5f5f5;
        position: relative;
        margin: 0 2.5px;
        border-radius: 10px;
        // overflow: hidden;
        text-align: center;
        .img {
          display: block;
          width: 85.5px;
          height: 85.5px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .pirce {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3px;
          b {
            font-size: 13px;
            color: #e25256;
            margin-right: 3px;
          }
          .btn {
            width: 34px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            font-size: 9px;
            color: #fff;
            background: #e25256;
            border-radius: 15px;
            font-weight: 300;
          }
        }
        .tag {
          display: inline-block;
          // width: 59.5px;
          padding: 0 6px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          border: 0.5px solid #e25256;
          border-radius: 20px;
          text-align: center;
          margin: 5px auto;
        }
        .ranking {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 54px;
          height: 54px;
        }
      }
    }
  }
}

.like-goods-wrap {
  background: #f5f5f5;
  padding: 0 10.5px;
  .list {
    display: flex;
    flex-wrap: wrap;
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
        color: #b6a380;
        font-size: 14px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        margin-top: 5px;
      }
      .desc {
        font-size: 12px;
        color: #878788;
        height: 33px;
        margin: 2px 0 5px;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rate {
          color: #878788;
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
        margin-right: 9px;
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