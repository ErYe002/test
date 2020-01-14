<template>
  <article>
    <div class="slideshow">
      <swiper
        class="swiperClass"
        autoplay="true"
        @change="swiperChangeEvent"
        v-if="BannerList != null && BannerList.length > 0"
      >
        <div class="swiperDiv" v-for="(item,index) in BannerList" :key="index">
          <swiper-item>
            <a @click="$navigateTo(item.TargetUrl)">
              <img class="swiperImg" :src="item.ImageUrl" />
            </a>
          </swiper-item>
        </div>
      </swiper>
      <ul class="pages">
        <li :class="{active: idx == swiperIndex}" v-for="(item,idx) in BannerList" :key="idx"></li>
      </ul>
    </div>
    <div class="quickNavigation">
      <div class="headBar">
        <div class="tag">
          <img class="tagLogo" src="/static/images/overseaTag2.png" />
          <p class="tagTitle">直邮保税仓</p>
        </div>
        <div class="tag">
          <img class="tagLogo" src="/static/images/overseaTag3.png" />
          <p class="tagTitle">100%正品</p>
        </div>
        <div class="tag">
          <img class="tagLogo" src="/static/images/overseaTag1.png" />
          <p class="tagTitle">全场包税</p>
        </div>
        <div class="tag">
          <img class="tagLogo" src="/static/images/overseaTag4.png" />
          <p class="tagTitle">破损退换</p>
        </div>
      </div>
      <div class="list-box" v-if="BrandList.length > 0">
        <ul class="list">
          <li class="item" v-for="item in BrandList" :key="item.Id">
            <a @click="$navigateTo(item.TargetUrl)">
              <!-- <img class="normal" :src="item.ColorImageUrl" /> -->
              <img :class="{normal:true,show:item.show,hide:!item.show}" :src="item.ColorImageUrl" />
					    <img :class="{normal:true,show:!item.show,hide:item.show}" :src="item.DefaultImageUrl" />
            </a>
          </li>
        </ul>
        <p class="dorpdown-icon">
          <img
            :class="{up: BrandList.length > 12}"
            src="/static/images/icon_dropdown.png"
            v-if="OriginalBrandList.length > 12"
            @click="toggleBrandEvent"
          />
        </p>
      </div>
      <!-- <div class="brandShow">
		  <p>BRAND SELECTED|品牌精选</p>
		  <div class="brandWall">
		  </div>
      </div>-->
    </div>
    <div class="topImg">
      <div class="topImgBar">
        <text class="topImgBarText">FEATURED SPECIALS | 精选特惠</text>
        <em class="topImgBarEm">
          到货时间
          <i class="topImgBarEmI">?</i>
        </em>
      </div>
      <a class="topImgBody" @click="$navigateTo(AdvertisementTopImage.TargetUrl)">
        <img class="topImgBodyImg" :src="AdvertisementTopImage.ImageUrl" />
      </a>
    </div>
    <div class="middleImg">
      <a class="midImgNavBg" href="www.baidu.com">
        <img
          class="midImgNavBgImg"
          @click="$navigateTo(AdvertisementList[0].TargetUrl)"
          :src="AdvertisementList[0].ImageUrl"
        />
        <a class="midImgNavL" href="www.163.com">
          <img
            class="midImgNavLImg"
            @click="$navigateTo(AdvertisementList[1].TargetUrl)"
            :src="AdvertisementList[1].ImageUrl"
          />
        </a>
        <a class="midImgNavR" href="www.163.com">
          <img
            class="midImgNavRImg"
            @click="$navigateTo(AdvertisementList[2].TargetUrl)"
            :src="AdvertisementList[2].ImageUrl"
          />
        </a>
      </a>
    </div>
    <div class="bottomImg">
      <a class="bottomImgA" @click="$navigateTo(AdvertisementBottomImage.TargetUrl)">
        <img class="bottomImgAImg" :src="AdvertisementBottomImage.ImageUrl" />
      </a>
    </div>
    <div class="footerShow">
      <div class="footerLogoNav">
        <div
          @click="footerLogoNavDivClick(1)"
          :class="{active:footerLogoNavDivCheck == 1,footerLogoNavDiv:footerLogoNavDivCheck !=1}"
        >
          <img
            v-if="footerLogoNavDivCheck!=1"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList1.png"
          />
          <img
            v-if="footerLogoNavDivCheck==1"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList1-show.png"
          />
          <p class="footerLogoNavDivP">{{OverSeasTabList[0].Value}}</p>
          <span></span>
        </div>
        <div
          @click="footerLogoNavDivClick(2)"
          :class="{active:footerLogoNavDivCheck == 2,footerLogoNavDiv:footerLogoNavDivCheck !=2}"
        >
          <img
            v-if="footerLogoNavDivCheck!=2"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList2.png"
          />
          <img
            v-if="footerLogoNavDivCheck==2"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList2-show.png"
          />
          <p class="footerLogoNavDivP">{{OverSeasTabList[1].Value}}</p>
          <span></span>
        </div>
        <div
          @click="footerLogoNavDivClick(3)"
          :class="{active:footerLogoNavDivCheck == 3,footerLogoNavDiv:footerLogoNavDivCheck !=3}"
        >
          <img
            v-if="footerLogoNavDivCheck!=3"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList3.png"
          />
          <img
            v-if="footerLogoNavDivCheck==3"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList3-show.png"
          />
          <p class="footerLogoNavDivP">{{OverSeasTabList[2].Value}}</p>
          <span></span>
        </div>
        <div
          @click="footerLogoNavDivClick(4)"
          :class="{active:footerLogoNavDivCheck == 4,footerLogoNavDiv:footerLogoNavDivCheck !=4}"
        >
          <img
            v-if="footerLogoNavDivCheck!=4"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList4.png"
          />
          <img
            v-if="footerLogoNavDivCheck==4"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList4-show.png"
          />
          <p class="footerLogoNavDivP">{{OverSeasTabList[3].Value}}</p>
          <span></span>
        </div>
        <div
          @click="footerLogoNavDivClick(5)"
          :class="{active:footerLogoNavDivCheck == 5,footerLogoNavDiv:footerLogoNavDivCheck !=5}"
        >
          <img
            v-if="footerLogoNavDivCheck!=5"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList5.png"
          />
          <img
            v-if="footerLogoNavDivCheck==5"
            class="footerLogoNavDivImg"
            src="/static/images/overseaList5-show.png"
          />
          <p class="footerLogoNavDivP">{{OverSeasTabList[4].Value}}</p>
          <span></span>
        </div>
      </div>
      <div class="footerRecommend">
        <img
          class="footerNavBodyImg"
          v-if="footerLogoNavDivCheck == 1"
          @click="$navigateTo(OverSeasTabList[0].TargetUrl)"
          :src="OverSeasTabList[0].AdvertisementImageUrl"
        />
        <img
          class="footerNavBodyImg"
          v-if="footerLogoNavDivCheck == 2"
          @click="$navigateTo(OverSeasTabList[1].TargetUrl)"
          :src="OverSeasTabList[1].AdvertisementImageUrl"
        />
        <img
          class="footerNavBodyImg"
          v-if="footerLogoNavDivCheck == 3"
          @click="$navigateTo(OverSeasTabList[2].TargetUrl)"
          :src="OverSeasTabList[2].AdvertisementImageUrl"
        />
        <img
          class="footerNavBodyImg"
          v-if="footerLogoNavDivCheck == 4"
          @click="$navigateTo(OverSeasTabList[3].TargetUrl)"
          :src="OverSeasTabList[3].AdvertisementImageUrl"
        />
        <img
          class="footerNavBodyImg"
          v-if="footerLogoNavDivCheck == 5"
          @click="$navigateTo(OverSeasTabList[4].TargetUrl)"
          :src="OverSeasTabList[4].AdvertisementImageUrl"
        />
        <div class="footerNavBodyContent">
          <div class="recItemDiv" v-for="item in RecommendList" :key="item.key">
            <a
              class="recItemA"
              :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
            >
              <img class="recImg" :src="item.ImageUrl" />
              <p class="recTitle">{{item.GoodsName}}</p>
              <p class="recNational">{{item.National}}</p>
              <p class="recDesc">{{item.ShortDescription}}</p>
              <div class="recPrice">
                <i class="recPraiseProportion">{{item.PraiseProportion}}好评</i>
                <div>
                  <em class="recSalePrice">￥{{item.SalePrice}}</em>
                  <em class="recPriceLabel" v-if="item.PriceLabel != ''">{{item.PriceLabel}}</em>
                  <em class="recShopCartLogo">
                    <img class="recShopCartLogoImg" src="/static/images/redCart.png" />
                  </em>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="recEndInfo" v-if="IsRecEnd">
          <p>就到这里了呦~~~</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      swiperIndex: 0,
      //横幅1
      BannerList: [],
      //品牌2
      BrandList: [],
      OriginalBrandList: [],
      //3 Floor 广告顶部图片
      AdvertisementTopImage: {},
      AdvertisementList: [],
      AdvertisementBottomImage: {},
      OverSeasTabList: [],
      RecommendList: [],
      footerLogoNavDivCheck: 1,
      currentPage: 1,
      IsRecEnd: false,
      appHomeId: ""
    };
  },
  created() {
    this.init();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.init();
  },
  //上拉刷新
  onReachBottom: function() {
    if (!this.IsRecEnd) {
      api
        .getOverSeasRecommendGoodsByPage({
          appHomeId: this.appHomeId,
          overseasModuleType: this.OverSeasTabList[
            this.footerLogoNavDivCheck - 1
          ].Key,
          pageIndex: ++this.currentPage
        })
        .then(({ Data, TotalPage }) => {
          this.RecommendList = this.RecommendList.concat(
            Data.map(ele => {
              //当PriceLabel中的价格含有“.00”时，进行去除
              if (/\d+.\d+/.test(ele.PriceLabel)) {
                ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
              }
              return ele;
            })
          );
          if (TotalPage <= this.currentPage) {
            this.IsRecEnd = true;
          }
        });
    }
  },

  methods: {
    init() {
      api.appHomeOverseasPage().then(({ Data }) => {
        this.BannerList = Data.BannerList;
        this.OriginalBrandList = Data.BrandList;
        this.BrandList = Data.BrandList.slice(0, 12);
        this.AdvertisementTopImage = Data.AdvertisementTopImage;
        this.AdvertisementList = Data.AdvertisementList;
        this.AdvertisementBottomImage = Data.AdvertisementBottomImage;
        this.OverSeasTabList = Data.OverSeasTabList;
        this.appHomeId = Data.AppHomeId;
        this.footerLogoNavDivCheck = 1;
        this.reversalBrand(Data.BrandList)
        api
          .getOverSeasRecommendGoodsByPageNoLoading({
            appHomeId: this.appHomeId,
            overseasModuleType: this.OverSeasTabList[0].Key
          })
          .then(({ Data, TotalPage }) => {
            this.RecommendList = Data.map(ele => {
              //当PriceLabel中的价格含有“.00”时，进行去除
              if (/\d+.\d+/.test(ele.PriceLabel)) {
                ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
              }
              return ele;
            });
            if (TotalPage <= 1) {
              this.IsRecEnd = true;
            }
          });
      });
    },
    //同步swiper page
    swiperChangeEvent(e) {
      this.swiperIndex = e.mp.detail.current;
    },
    //显示所有品牌
    toggleBrandEvent() {
      this.BrandList =
        this.BrandList.length == this.OriginalBrandList.length
          ? this.OriginalBrandList.slice(0, 12)
          : this.OriginalBrandList;
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
				
        list[arr[0]].show = true;
        this.BrandList =
            list.length > 12
              ? list.slice(0, 12)
              : list;
        arr.shift()
        if(arr.length==0){
          clearInterval(timerID)
        }
      },5000)
    },
    footerLogoNavDivClick(key) {
      this.footerLogoNavDivCheck = key;
      this.IsRecEnd = false;
      this.currentPage = 1;
      api
        .getOverSeasRecommendGoodsByPage({
          appHomeId: this.appHomeId,
          overseasModuleType: this.OverSeasTabList[key - 1].Key
        })
        .then(({ Data, TotalPage }) => {
          this.RecommendList = Data.map(ele => {
            if (/\d+.\d+/.test(ele.PriceLabel)) {
              ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
            }
            return ele;
          });
          if (TotalPage <= 1) {
            this.IsRecEnd = true;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.slideshow {
  width: 710rpx;
  margin: 10px;
  .swiperClass {
    width: 710rpx;
    height: 771rpx;
    overflow: hidden;
    border-radius: 9px;

    height: 711rpx;
    .swiperImg {
      width: 100%;
      height: 711rpx;
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
.quickNavigation {
  width: 700rpx;
  margin: 30rpx 25rpx;
  border: 1px solid #e9e9e9;
  border-radius: 20rpx;
  overflow: hidden;
  .headBar {
    display: flex;
    align-item: center;
    background: #cfbb98;
    height: 112rpx;
    width: 100%;
    margin-bottom: 15rpx;
    .tag {
      width: 25%;
      height: 77.4rpx;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tagLogo {
        width: 35rpx;
        height: 33rpx;
      }
      .tagTitle {
        margin-top: 7.6rpx;
        font-size: 24rpx;
        text-align: center;
        color: white;
      }
    }
  }
  .list-box {
    position: relative;
    .list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 14px 5px;
      .item {
        // flex: 0 0 10%;
        width: 160rpx;
        height: 90rpx;
        // box-sizing: border-box;
        border-bottom: 0.5px solid #e9e9e9;
        border-right: 0.5px solid #e9e9e9;
        position: relative;
        img {
          display: block;
          width: 157rpx;
          height: 87rpx;
          transition: all 1s;
          position: absolute;
          left: 1.5rpx;
          top: 1.5rpx;
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
      background: #fff;
      left: 0;
      right: 0;
      z-index: 5;
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
.topImg {
  overflow: hidden;
  margin: 15px 10px;
  border-radius: 16px;
  border: 1px solid #c7c7c7;
  width: 100%px;
  .topImgBar {
    height: 33.1px;
    line-height: 33.1px;
    .topImgBarText {
      color: #000;
      display: inline-block;
      margin-left: 15px;
      font-size: 26rpx;
    }
    .topImgBarEm {
      color: #fff;
      background: #a34c2c;
      width: 30%;
      text-align: right;
      display: inline-block;
      float: right;
      font-size: 30rpx;
      .topImgBarEmI {
        display: inline-block;
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        border-radius: 100%;
        border: 1px solid #fff;
        margin-left: 10px;
        margin-right: 8px;
      }
    }
  }
  .topImgBody {
    width: 100%;
    height: 234px;
    .topImgBodyImg {
      width: 100%;
      height: 234px;
    }
  }
}
.middleImg {
  overflow: hidden;
  margin: 30rpx 25rpx;
  border-radius: 30rpx;
  border: 1px solid white;
  width: 700rpx;
  height: 514rpx;
  .midImgNavBg {
    width: 100%;
    height: 514rpx;
    position: relative;
    display: block;
    clear: both;
    .midImgNavBgImg {
      width: 100%;
      height: 514rpx;
    }
    .midImgNavL {
      width: 320rpx;
      height: 158rpx;
      position: absolute;
      left: 20rpx;
      bottom: 20rpx;
      border-radius: 20rpx;
      overflow: hidden;
      z-index: 2;
      .midImgNavLImg {
        width: 100%;
        height: 100%;
      }
    }
    .midImgNavR {
      width: 320rpx;
      height: 158rpx;
      position: absolute;
      right: 20rpx;
      bottom: 20rpx;
      border-radius: 20rpx;
      overflow: hidden;
      z-index: 2;
      .midImgNavRImg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.bottomImg {
  width: 700rpx;
  height: 282rpx;
  margin: 30rpx 25rpx;
  border-radius: 30rpx;
  border: 1px solid white;
  overflow: hidden;
  .bottomImgA {
    width: 100%;
    height: 100%;
    .bottomImgAImg {
      width: 100%;
      height: 100%;
    }
  }
}
.footerShow {
  width: 700rpx;
  margin: 30rpx 25rpx;

  .footerLogoNav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    margin-bottom: 10rpx;
    .footerLogoNavDiv {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      position: relative;
      .footerLogoNavDivImg {
        width: 36rpx;
        height: 36rpx;
      }
      .footerLogoNavDivP {
        font-size: 26rpx;
        margin-bottom: 10rpx;
      }
    }
    .active {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      position: relative;
      color: #a74c2d;
      .footerLogoNavDivImg {
        width: 36rpx;
        height: 36rpx;
      }
      .footerLogoNavDivP {
        font-size: 26rpx;
        margin-bottom: 4rpx;
      }
      // .footerLogoNavDivP:after{
      // 	height: 4rpx;
      // 	width: 50rpx;
      // 	background: #A74C2D;
      // }
      span {
        height: 4rpx;
        width: 50rpx;
        background: #a74c2d;
      }
    }
    div:nth-child(-n + 4):before {
      content: "";
      width: 1px;
      height: 80%;
      top: 10%;
      right: 0;
      background: #f5f5f5;
      position: absolute;
    }
  }
  .footerRecommend {
    width: 100%;
    border-radius: 30rpx;
    background: #f5f5f5;
    overflow: hidden;
    .footerNavBodyImg {
      width: 100%;
      height: 294rpx;
    }
    .footerNavBodyContent {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-left: 2%;
      padding-top: 1%;
      .recItemDiv {
        width: 43%;
        height: 530rpx;
        padding: 2%;
        margin-bottom: 14rpx;
        margin-right: 2%;
        border-radius: 20rpx;
        overflow: hidden;
        background: #fff;
        .recItemA {
          display: flex;
          flex-direction: column;
          width: 100%;
          .recImg {
            width: 100%;
            height: 306rpx;
          }
          .recTitle {
            color: #b6a380;
            font-size: 28rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
          }
          .recNational {
            background: #c4c5c5;
            color: #fff;
            border-radius: 20rpx;
            font-size: 10px;
            display: inline-block;
            padding: 3px 10rpx;
            width: fit-content;
            margin-bottom: 2px;
          }
          .recDesc {
            color: #878788;
            font-size: 22rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            min-height: 68rpx;
          }
          .recPrice {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            .recPraiseProportion {
              color: #878788;
              font-size: 18rpx;
              margin: auto 4rpx;
            }
            div {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: flex-end;
              .recSalePrice {
                color: #e25256;
                font-size: 30rpx;
                margin: auto 4rpx;
              }
              .recPriceLabel {
                color: #fff;
                font-size: 14rpx;
                background: #e25256;
                border-radius: 40%;
                margin: auto 4rpx;
                padding: 8rpx;
              }
              .recShopCartLogo {
                display: flex;
                flex-direction: row;
                align-items: center;
                .recShopCartLogoImg {
                  width: 30rpx;
                  height: 30rpx;
                }
              }
            }
          }
        }
      }
    }
    .recEndInfo {
      text-align: center;
      margin: auto;
      p {
        text-align: center;
        font-size: 24rpx;
        color: gray;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>