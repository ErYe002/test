<template>
  <article>
    <template v-if="model != null">
        <article class="first-floor-wrap">
            <section class="banner-box">
            <ul
                class="swiper"
                v-if="model.BannerList != null && model.BannerList.length > 0"
            >
                <!-- <swiper-item v-for="item in model.BannerList" :key="item.Id">
                <img :src="item.ImageUrl" @click="$navigateTo(item.TargetUrl)" />
                </swiper-item> -->
                <li >
                <img :src="model.BannerList[0].ImageUrl" @click="$navigateTo(model.BannerList[0].TargetUrl)" />
                </li>
            </ul>
            
            </section>
        </article>
        <article>
            <section
                class="newuser-box"
                v-if="model.BannerList != null && model.BannerList.length > 0"
                >
                <p class="title">BRAND SELECTED  | 新人多重好礼</p>
                <div class="img-box">
                    <img class="small-img" :src="model.BannerList[0]['ImageUrl']" @click="$navigateTo(model.BannerList[0]['TargetUrl'])"/>
                    <img class="small-img" :src="model.BannerList[1]['ImageUrl']" @click="$navigateTo(model.BannerList[1]['TargetUrl'])"/>
                    <img class="small-img" :src="model.BannerList[2]['ImageUrl']" @click="$navigateTo(model.BannerList[2]['TargetUrl'])"/>
                    <img class="small-img" :src="model.BannerList[1]['ImageUrl']" @click="$navigateTo(model.BannerList[1]['TargetUrl'])"/>
                </div>
            </section>
        </article>
        <article>
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
        </article>
        <article>
            <section
                class="peri-box"
                v-if="model.GirlGoodsList != null && model.GirlGoodsList.length > 0"
                >
                <p class="title">BEAUTY TIPS | 仙女私享清单</p><!-- model.OneBigThreeSmallList-->
                <div class="img-box">
                    <div class="bg">
                        <img :src="'/static/images/meitong_peric_left.png'"  class="peri-left"/>
                        <img :src="'/static/images/meitong_peric_right.png'" class="peri-right" />
                        <img src="/static/images/meitong_right.png" alt="" class="ar_left" @click="changeAction(1)">
                        <img src="/static/images/meitong_right.png" alt="" class="ar_right" @click="changeAction(2)">
                    </div>
                    <!-- <img :src="model.GirlGoodsList[0]['ImageUrl']" alt="" :class='{"imgg":true,"peri-img1":true,"fade-in":active1=="mr_r","fade-in":active1=="mr_l"}'>
                    <img :src="model.GirlGoodsList[1]['ImageUrl']" alt="" :class='{"imgg":true,"peri-img2":true,"fade-in1":active1=="mr_r","fade-in":active1=="mr_l"}'>
                    <img :src="model.GirlGoodsList[2]['ImageUrl']" alt="" :class='{"imgg":true,"peri-img3":true,"fade-out":active1=="mr_r","fade-out":active1=="mr_l"}'> -->
                    <swiper class="imageContainer" @change="handleChange" previous-margin="100px" next-margin="90px" circular >
                      <block v-for="(item, index) in model.GirlGoodsList" :key="index">
                        <swiper-item class="item">
                          <div class="img_box">
                          <image :class="{imgg:true,active:currentIndex==index}" :src="item.ImageUrl"></image>
                          </div>
                        </swiper-item>
                      </block>
                    </swiper>
                </div>
            </section>
        </article>

        <article class="four-floor-wrap">
            <section class="brand-box" v-if="brandList.length > 0">
                <p class="title">SELECTED BRANDS | 品牌精选</p>
                <div class="list-box">
                    <ul class="list">
                    <li class="item" v-for="item in brandList" :key="item.Id">
                        <a @click="$navigateTo(item.TargetUrl)">
                        <img class="normal" :src="item.ColorImageUrl" />
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
                class="rangking-box"
                v-if="model.HotSell != null && model.HotSell.length > 0"
                >
                <p class="title">WEEKLY DEALS | 本周热卖</p>
                <scroll-view class="scroll-view" scroll-x enable-flex>
                    <a
                    class="sc-item"
                    v-for="(item, idx) in model.HotSell"
                    :key="item.Id"
                    :href="'/pages/product/index/main?seocode='+item.GoodsSeoCode+'&isComp=false'"
                    >
                    <img :src="item.ImageUrl" class="img" />
                    <p class="pirce">
                        <b>¥{{item.SalePrice}}</b>
                        <span class="btn">立即抢</span>
                    </p>
                    <!-- <span class="tag">{{item.DailyRankingName}}</span> -->
                    <img v-if="idx < 4" :src="'/static/images/ranking_0'+(idx+1)+'.png'" class="ranking" />
                    </a>
                </scroll-view>
            </section>
             <section
                class="reputation-box"
                v-if="model.HotSellGoods != null"
                >
                <p class="title">FEATURED SPECIALS | 口碑好物</p>
                <div class="bottomImg">
                    <a class="bottomImgA" @click="$navigateTo(model.HotSellGoods.TargetUrl)">
                        <img class="bottomImgAImg" :src="model.HotSellGoods.ImageUrl" />
                    </a>
                </div>
            </section>
        </article>
        <article class="like-goods-wrap" v-if="goodsList.length > 0">
            <!-- <p class="title">GUESS YOU LIKE IT | 猜你喜欢</p> -->
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
  active1:'',
  currentIndex:0
}

export default {
  data() {
    return Object.assign({}, defaultData);
  },
  async onLoad() {
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
    changeAction(type){
        let data = this.model.GirlGoodsList;
        let temp;
        if(type==2){
            this.active1="mr_r";
        }else{
            this.active1="mr_l";
        }
        setTimeout(()=>{
             if(type==2){
                temp = data.splice(0,1)
                data = data.concat(temp)
            }else{
                temp = data.splice(data.length-1,1)
                data = temp.concat(data)
            }
            this.model.GirlGoodsList =data
        },500)

        setTimeout(()=>{
            this.active1="";
            //  if(type==2){
            //     temp = data.splice(0,1)
            //     data = data.concat(temp)
            // }else{
            //     temp = data.splice(data.length-1,1)
            //     data = temp.concat(data)
            // }
            // this.model.OneBigThreeSmallList =data
        },500)
       

 
    },
    _getPageData() {
      api.getHomeMeiTongData().then(({ Data }) => {
        if (Data != null && Data.BrandList != null) {
          this.brandList =
            Data.BrandList.length > 12
              ? Data.BrandList.slice(0, 12)
              : Data.BrandList;
        }
        this.model = Data;
      });
    },
    //获取猜你喜欢商品列表
    _getGoodsListData() {
      if (!this.isLoding) {
        this.isLoding = true;
        api
          .getHomeMeiTongGoods(this.page, this.size)
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
    },
     /* 这里实现控制中间凸显图片的样式 */
    handleChange(e) {
      this.currentIndex = e.target.current
    },
  }
};
</script>

<style lang="less" scoped>
.first-floor-wrap {
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

.activity-box {
   background: #fff;
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

.brand-box,
.activity-box,
.rangking-box,
.newuser-box,
.reputation-box,
.peri-box,
.like-goods-wrap {
  .title {
    color: #000;
    // font-weight: bold;
    font-size: 13px;
    text-align: center;
    padding: 12px 0 16px;
  }
}

.newuser-box {
   background: #fff;
  padding: 0 10.5px 20px;
  .img-box {
    display: flex;
    justify-content: flex-start;
    border-radius: 10px;
    overflow: hidden;
      .small-img {
        display: block;
        // width: 83.5px;
        height: 153px;
        }
    }
}

.reputation-box{
    margin-bottom: 12px;
    .bottomImg{
        width: 100%;
        height: 140px;
        border-radius: 10px;
        overflow: hidden;
        .bottomImgA{
            width: 100%;
            height: 100%;
            .bottomImgAImg{
                width:100%;
                height: 100%;
            }
	}
    }
}

.peri-box{
    padding: 0 10.5px 20px;
    .img-box{
        width: 100%;
        height: 160px;
        margin-top: 20px;
        // border: 1px solid green;
        // border-radius: 10px;
        // overflow: hidden;
        position: relative;
        .bg{
            width: 100%;
            border-radius: 10px;
            height: 62.5px;
            background-color: #CDB996;
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .ar_left{
                transform: rotate(180deg)
            }
            .ar_right,.ar_left{
                width: 22px;
                height: 28px;
                position: absolute;
                bottom: 17.2px;
            }
             .ar_left{
                left: 2px;
            }
            .ar_right{
                right: 2px;
            }
            .peri-left,.peri-right{
                width: 48px;
                height: 74px;
                position: absolute;
                bottom: 0;
            }
            .peri-left{
                left: 5.5px;
            }
            .peri-right{
                right: 5.5px;
            }
        }
        .fade-in {
            opacity: 1;
            animation-name: fadeIn;
            animation-iteration-count: 1;
            animation-timing-function: linear;
            animation-duration: 1s;
        }
          .fade-in1 {
            opacity: 1;
            animation-name: fadeIn1;
            animation-iteration-count: 1;
            animation-timing-function: linear;
            animation-duration: 1s;
        }
        .fade-out {
            opacity: 1;
            animation-name: fadeOut;
            animation-iteration-count: 1;
            animation-timing-function: linear;
            animation-duration: 1s;
        }
        @keyframes fadeIn {
            0% {
                margin-left: 0;
                opacity: 1;
            }
            50% {
                // margin-left: 11.5px;
                opacity: 0;
            }
            100% {
                margin-left: 11.5px;
                opacity: 1;
            }
        }
        @keyframes fadeIn1 {
            0% {
                margin-left: 0;
                opacity: 1;
            }
            50% {
                opacity: 0;
                // margin-left: -11.5px;
            }
            100% {
                margin-left: -11.5px;
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            0% {
                margin-right: 0px;
                opacity: 1;
            }
            50% {
                opacity: 0;
                // margin-right: 11.5px;
            }
            100% {
                margin-right: 11.5px;
                opacity: 1;
            }
        }

        .imgg{
            height: 100%;
            position: absolute;
            bottom: 0;
            // transition: all 2s;
        }
        .peri-img1{
            width: 71px;
            left: 54px;
        }
        .peri-img2{
            width: 82px;
            left:136.5px;
        }
        .peri-img3{
            width: 71px;
            right: 54px;
        }
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
          box-sizing: border-box;
          border-bottom: 0.5px solid #e9e9e9;
          border-right: 0.5px solid #e9e9e9;
          img {
            display: block;
            width: 81.5px;
            height: 41px;
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
    background: #fff;
  padding: 0 10.5px;
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 173px;
        background: #f5f5f5;
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

.imageContainer{
 width: 80%;
 height: 160px;
 position: absolute;
 top:-13%;
 left: 50%;
 margin-left: -40%;
}
.item{
 height: 160px;
overflow: visible;
.img_box{
  position: relative;
  // height: 100%;
  overflow: visible;
}
}
.imgg{
 position: absolute;
 width: 80px !important;
 height: 120px;
 border-radius: 15rpx;
 z-index: 5;
 opacity: 1;
//  top: 13%;
}
.active{
 opacity: 1;
 width: 82px !important;
 z-index: 10;
 height: 140px;
//  top: 7%;
 transition:all .2s ease-in 0s;
}

</style>