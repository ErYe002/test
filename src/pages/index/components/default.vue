<template>
  <article style="background:#f6f6f6">
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
        <section class="nav-box"><!--新增导航-->
          <scroll-view class="nav-contain" scroll-x @scroll="scroll">
            <div class="out-box">
              <div v-for="(item,index) in model.IconList" :key="index" class="children-box">
                <img :src="item.ImageUrl"  class="nav-img" @click="$navigateTo(item.TargetUrl)">
                <span class="nav-text">{{item.Name}}</span>
              </div>
              </div>
          </scroll-view>
          <div class="nav-dont">
              <div class="dont"></div>
              <div class="line-box">
                <div class="line" :style="{left:xxx+'px'}">

                </div>
              </div>
              <div class="dont"></div>
          </div>
        </section>
        <section class="four-mode" v-if="model.ConfigAdvertList!= null && model.ConfigAdvertList.length > 0"><!--新增模块4-->
          <div v-for="(item,index) in model.ConfigAdvertList" :key="index">
              <img :src="item.ImageUrl" alt="" class="four-mode-img" @click="$navigateTo(item.TargetUrl)" >
          </div>
        </section>
        <section :class="{'hot-box': true, 'new-user': model.IsNewUser || !token}"><!--新人或者未登录模块-->
          <div class="new-user-box" v-if="model.IsNewUser || !token">
            <button class="coupon" open-type="getUserInfo" @getuserinfo="getUserInfo">
                <img :src="model.UserAdvertList[0]['ImageUrl']" mode="widthFix"/>
            </button>
          </div>
          <block v-else>
            <article
                class="three-floor-wrap"
                v-if="model.UserAdvertList != null && model.UserAdvertList.length > 0"
            >
                <img
                :src="model.UserAdvertList[1]['ImageUrl']"
                class="big-img"
                @click="$navigateTo(model.UserAdvertList[1]['TargetUrl'])"
                />
                <img
                :src="model.UserAdvertList[2]['ImageUrl']"
                class="img"
                @click="$navigateTo(model.UserAdvertList[2]['TargetUrl'])"
                />
                <img
                :src="model.UserAdvertList[3]['ImageUrl']"
                class="img"
                @click="$navigateTo(model.UserAdvertList[3]['TargetUrl'])"
                />
            </article>
          </block>
        </section>
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
            <p class="dorpdown-icon" v-if="model.BrandList.length > 12">
              <img
                :class="{up: brandList.length > 12}"
                src="/static/images/icon_dropdown.png"
                v-if="model.BrandList.length > 12"
                @click="toggleBrandEvent"
              />
            </p>
          </div>
        </section>
      </article>
      <article class="goods_nav_one">
        <scroll-view :class="{'nav-list':true,'nav-len1-5':model.EssentialGoodsList.length<=4,'nav-len6':model.EssentialGoodsList.length>4}" scroll-x enable-flex>
          <div
            :class="{'n-item': true, active: select_index == index}"
            v-for="(item,index) in model.EssentialGoodsList"
            :key="index"
            @click="changeNavGoods(item,index)"
          >
            <div class="link">
              <b>{{item.Key.Name}}</b>
            </div>
          </div>
        </scroll-view>
      </article>
      <article class="goods_nav_goods">
        <div class="goods_list">
          <block v-if="tempData != null && tempData.length > 0">
              <block 
                v-for="(item,index) in tempData" 
                :key="index">
                <a
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
                class="item"
                v-if="index<=3"
                >
                <div>
                    <img :src="item.ImageUrl" class="img" />
                </div>
                <div class="content">
                    <div class="goodsName">{{item.GoodsName}}</div>
                    <div class="integral">
                    <span class="integral_pont" v-if="item.GoodsScoreText!=null&&item.GoodsScoreText!=''">{{item.GoodsScoreText}}</span></div>
                    <div class="price">
                    <div class="price-left">
                        <div class="old">原价￥{{item.SalePrice}}</div>
                        <div class="svip" v-if="item.SvipPrice-0>0">
                            <span class="svip-price">￥{{item.SvipPrice}}</span>
                            <span class="svip-icon">SVIP价</span>
                        </div>
                    </div>
                    <div class="price-right">
                        <img src="/static/images/bg_car.png" alt="" class="bg-price">
                        <span class="mar-price">￥{{item.SaveMoney}}</span>
                        <span class="triangle"></span>
                    </div>
                    </div>
                </div>
                </a>
            </block>
          </block>
        </div>
        <div class="goods_more" v-if="tempData != null && tempData.length >= 4">
          <a :href="'/pages/search/goodsList/main?data='+encodeURIComponent(tempData)" class="goods_more_text">
            查看更多商品 >
          </a>
        </div>
      </article>
      <article class="second-floor-wrap"
          v-if="model.EssentialAdvertList!= null && model.EssentialAdvertList.length > 0">
        <div class="title">
          <div>活动推荐</div>
        </div>
        <section
          class="grid-box"
        >
          <img
            class="img"
            :src="model.EssentialAdvertList[0]['ImageUrl']"
            @click="$navigateTo(model.EssentialAdvertList[0]['TargetUrl'])"
          />
          <img
            class="img"
            :src="model.EssentialAdvertList[1]['ImageUrl']"
            @click="$navigateTo(model.EssentialAdvertList[1]['TargetUrl'])"
          />
        </section>
      </article>
      <article class="goods_nav_two">
        <scroll-view :class="{'nav-list':true,'nav-len1-5':model.RecommendChannelList.length<=4,'nav-len6':model.RecommendChannelList.length>4}" scroll-x enable-flex>
          <div
            :class="{'n-item': true, active: select_recommendChannel == index}"
            v-for="(item,index) in model.RecommendChannelList"
            :key="index"
            @click="changeRecommendNavGoods(item,index)"
          >
              <b class="text">{{item.Name}}</b>
              <span class="des">{{item.Subtitle}}</span>
          </div>
        </scroll-view>
      </article>
      <article class="like-goods-wrap" v-if="goodsList.length > 0">
        <ul class="list">
          <block v-if="goodsList.length > 0">
          <a
            :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
            class="item"
            v-for="item in goodsList"
            :key="item.SeoCode"
          >
            <div class="save_money" v-if="item.SaveMoney-0>0">立省{{item.SaveMoney}}元</div>
            <img :src="item.ImageUrl" class="img" />
            <p class="name">{{item.GoodsName}}</p>
            <div class="info">
              <div class="floor_one">
                <span class="jifen" v-if="item.GoodsScoreText!=null&&item.GoodsScoreText!=''">{{item.GoodsScoreText}}</span>
                <span class="quan" v-if="item.HasCoupon">券</span>
              </div>
              <div class="floor_two">
                <span class="price-old">原价 ￥{{item.SalePrice}}</span>
              </div>
              <div class="floor_three" v-if="item.SvipPrice-0>0">
                <img src="/static/images/goods_vip.png" alt="" class="img">
                <em class="price-icon">￥</em>
                <span class="price">{{item.SvipPrice}}</span>
              </div>
            </div>
            <div class="three-piont">...</div>
          </a>
          </block>
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
  BackGoodsList:[],
  currentSeckillIdx: 1,
  tempData:[],
  xxx:0,
  select_index:0,
  id:"",
  select_recommendChannel:0,
  goodsType:""
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
    // await this._getGoodsListData();
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
    // await this._getGoodsListData();
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
        wx.setStorageSync("EssentialGoodsList",null)
      api.getHomePageData().then(({ Data }) => {
        if (Data != null ) {
          //处理秒杀数据
          if(Data.SeckillList!=null){
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
          }
          if(Data.BrandList != null){
                      this.reversalBrand(Data.BrandList)
            this.brandList =
              Data.BrandList.length > 12
                ? Data.BrandList.slice(0, 12)
                : Data.BrandList;
          }
          if(Data.RecommendChannelList!=null){
              this.goodsType = Data.RecommendChannelList[0]['GoodsType'];
              this._getGoodsListData();
          }
          if(Data.EssentialGoodsList!=null){
              this.id = Data.EssentialGoodsList[0]['Key']['Id'];
              this.tempData = Data.EssentialGoodsList[0]['Value']
              if(this.tempData.length!=null&&this.tempData.length>4){
                  wx.setStorageSync("EssentialGoodsList",this.tempData)
              }
          }
        //   this.backGoodsList(Data.RecommendLikeGoodsList)
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
        wx.hideLoading();
        api
          .getHomePageGoods(this.page, this.size,this.goodsType)
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
    //后台推荐猜你喜欢商品
    backGoodsList(data){
      if(data!=null&&data.length>0){
          let list = data.map(ele => {
            //当PriceLabel中的价格含有“.00”时，进行去除
            if (/\d+.\d+/.test(ele.PriceLabel)) {
              ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
            }
            return ele;
          });
          this.BackGoodsList = list
      }
    },
    scroll(e){
      let that = this
      wx.getSystemInfo({
        success (res) {
          that.xxx  = (e.mp.detail.scrollLeft*10/(e.mp.detail.scrollWidth-res.screenWidth))
          }
      })
      console.log(e.mp.detail)
      // this.xxx = e.mp.detail.scrollLeft;//scrollWidth
    },
    changeNavGoods(item,index){
        wx.setStorageSync("EssentialGoodsList",null)
        this.select_index = index;
        this.id= item.Key.Id;
        this.tempData =item.Value;
        if(this.tempData.length!=null&&this.tempData.length>4){
            wx.setStorageSync("EssentialGoodsList",this.tempData)
        }
    },
    changeRecommendNavGoods(item,index){
        wx.showLoading();
        this.select_recommendChannel = index;
        this.goodsType = item.GoodsType;
        this.page=1;
        this.size=10;
        this.totalPage=0;
        this.isLoding=false;
        this._getGoodsListData();
    }
  }
};
</script>

<style lang="less" scoped>
.first-floor-wrap {
  background: #fff;
  // padding-bottom: 39.5px;
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
        padding: 6px 0px 6px 0px;
        display: flex;
        align-items: center;
        .coupon {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          img{
            display: block;
            width: 100%;
          height: 100%;
          }
        }
      }
    }
  }
  .nav-box{
    width: 100%;
    .out-box{
      width: 150%;
      display: flex;
      flex-wrap: wrap;
    }
    .nav-contain{
      height: 100%;
      width: 100%;
      .children-box{
        width: 75px;
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .nav-img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          background: pink;
        }
        .nav-text{
          font-size: 12px;
          color: #231815;
        }
      }
    } 
    .nav-dont{
      width: 100%;
      height: 3px;
      padding: 5px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .dont{
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #f7e6c3;
      }
      .line-box{
        width: 30px;
        height: 3px;
        position: relative;
        .line{
          width: 20px;
          height: 3px;
          position: absolute;
          transition: all 1s;
          background: #3e3a39;
        }
      }
    }
  }
  .four-mode{
    padding: 5px 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .four-mode-img{
      width: 85px;
      height: 54px;
    }
  }
}

.second-floor-wrap {
  margin: 10px;
  border-radius: 8px;
  background: #fff;
  .title{
    color: #070001;
    font-size: 14px;
    text-align:left;
    font-weight: bold;
      padding: 10px;
  }
  .grid-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    img {
      width: 48%;
      height: 100px;
      border-radius: 6px;
    }
  }
}

.three-floor-wrap {
  padding: 12.5px 10.5px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
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
    color: #fff;
    // font-weight: bold;
    font-size: 13px;
    text-align: center;
    padding: 12px 0 16px;
  }
}

.four-floor-wrap {
  padding: 0 10.5px;
  background: #fff;
  padding-bottom: 20px;
  .brand-box {
    background: #FFC2DB;
    border-radius: 10px;
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
      position: relative;
      .img {
        display: block;
        width: 173px;
        height: 173px;
      }
      .name,
      .desc,
      .info {
        padding: 0 9px;
      }
      .name {
          height: 32px;
        color: #B29F7E;
        font-size: 12px;
        margin-top: 5px;
        white-space: initial;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info {
        .floor_one{
          color: #E83828;
          font-size: 8px;
          margin: 10px 0;
          .jifen{
            border: 1px solid #E83828;
            padding: 2px 5px;
            border-radius: 5px;
            margin-right: 5px;
          }
          .quan{
            border: 1px solid #E83828;
            padding: 2px 3px;
            border-radius: 5px;
          }
        }
        .floor_two{
          color: #878788;
          font-size: 10px;
        }
        .floor_three{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img{
            width: 12px;
            height: 12px;
            margin-right: 5px;
          }
          .price-icon{
            font-size: 10px;
            font-weight: bold;
          }
          .price{
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
      .save_money{
        color: #fff;
        background: #E83828;
        font-size: 10px;
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 2px;
        border-radius: 4px;
      }
      .three-piont{
        position: absolute;
        right: 10px;
        bottom: 20px;
        color: #DCDDDD;
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
.goods_nav_one {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #F7F7F7;
  .nav-list {
    height: 40px;
    .n-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        height: 25px;
        margin-top: 7.5px;
        border-right: 1px solid #DCDDDD;
      .link{
          padding:0 5px;
          font-size: 14px;
          color: #898989;
      }
      &.active {
        .link{
            border-radius: 10px;
           background: #FF435E;
            font-size: 14px;
            color: #fff;
        }
      }
    }
  }

}
.goods_nav_goods{
  background: #fff;
  .goods_list{
    .item{
      border-bottom:1px solid #E6E6E6;
      padding: 5px; 
      display: flex;
      justify-content: flex-start;
      .img{
        width: 100px;
        height: 100px;
        margin: 10px;
      }
      .content{
        flex: 1;
        margin: 10px 10px 10px 0;
        .goodsName{
            height: 38px;
          white-space: initial;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #231815;
        }
        .integral{
          display: flex;
          justify-content: flex-start;
          margin-bottom: 8px;
          margin-top: 5px;
          .integral_pont{
            padding: 2px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #E83828;
            color: #E83828;
            font-size: 10px;
            border-radius: 5px;
          }
        }
        .price{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price-left{
            .old{
              color: #231815;
              font-size: 12px;
            }
            .svip{
              display: flex;
              align-items: center;
              .svip-price{
                color: #231815;
                font-size: 18px;
                font-weight: bold;
                margin-right: 5px;
              }
              .svip-icon{
                color: #FDDF2B;
                font-size: 10px;
                background: #231815;
                border-radius: 5px;
                padding: 2px 4px;
              }
            }
          }
          .price-right{
            position: relative;
            z-index: 0;
            width: 75px;
              height: 27px;
              display: flex;
              justify-content:space-between;
              align-items: center;
            .bg-price{
              width: 75px;
              height: 27px;
              position: absolute;
              right: 0;
              top: 0;
              z-index: -1;
            }
            .mar-price{
              color: #fff;
              font-size: 12px;
              margin-left: 22px;
            }
            .triangle{
              margin-left: 2px;
              border: 3px solid;
              border-color: transparent;
              border-left-color:#fff;
            }
          }
        }
      }
    }
  }
  .goods_more{
     background: #F6F6F6;
    display: flex;
    justify-content: center;
    padding: 5px;
    .goods_more_text{
      color: #070001;
      font-size: 12px;
    }
  }
}
.nav-len1-5{
  display: flex;
  justify-content: space-around;
  .link{
      padding:0;
      }
}
.nav-len6{
  width: 100%;
  white-space: nowrap;
  display: flex;
}
.goods_nav_two {
  position: -webkit-sticky;
  position: sticky;
  z-index: 2;
  top: 0;
  background: #F7F7F7;
  .nav-list {
    height: 60px;
    .n-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 10px;
        height: 40px;
        margin-top: 10px;
        border-right: 0.5px solid #DCDDDD;
        .text{
          font-size: 14px;
          color: #040000;
        }
        .des{
          color: #8A8A8A;
          font-size: 11px;
          padding: 2px 5px;
          border-radius: 10px;
        }
      &.active {
        .text{
          font-weight: bold;
        }
        .des{
          color: #040000;
          background: #fff;
        }
      }
    }
  }

}
</style>