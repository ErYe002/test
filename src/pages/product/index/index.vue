<template>
  <div class="pro">
    <!-- 轮播 -->
    <div class="proImgBoxCon">
      <swiper
        autoplay="true"
        circular="true"
        interval="3000"
        duration="1000"
        @change="bannerChange"
        v-if="bannerType=='Img'"
      >
        <block v-for="item in Data.GoodsBase.AppendImgs" :key="item.index">
          <swiper-item>
            <img
              :src="item"
              alt
              mode="widthFix"
              onerror="this.src = 'https://pic.keede.com//app/images/goods_errimg.png'"
            />
          </swiper-item>
        </block>
      </swiper>
      <div class="video-box" v-if="bannerType=='Video'">
        <video
          :src="Data.GoodsBase.VieoUrl"
          controls="controls"
          style="width:100%"
          :poster="Data.GoodsBase.VieoImageUrl"
        ></video>
      </div>
      <div class="typeChange" v-if="Data.GoodsBase.VieoUrl!=null">
        <a :class="'videoBtn '+ (bannerType=='Video'?'selected':'')" v-on:click="_showVideo()">
          <img
            :src="(bannerType=='Video'?'/static/images/video-select.png':'/static/images/video-none.png')"
            alt
          />
        </a>
        <a :class="'picBtn '+(bannerType=='Img'?'selected':'')" v-on:click="_showImg()">
          <img
            :src="(bannerType=='Img'?'/static/images/img-select.png':'/static/images/img-none.png')"
            alt
          />
        </a>
      </div>
      <cover-view v-if="bannerType=='Img'" class="pic-indecator">{{bannerIndicator}}/{{Data.GoodsBase.AppendImgs.length}}</cover-view>
    </div>
    <!-- 品类切换 -->
    <div class="proType">
      <div class="typeCon">
        <scroll-view :class="'scroll-wrapper '+(SeriesShowType=='More'?'':'close')" scroll-x scroll-with-animation="true">
          <view
            :class="'series '+(Data.GoodsBase.SeoCode==item.SeoCode?'selected':'')"
            v-for="item in Data.Series"
            :key="item.index"
          >
            <a :href="'/main?seocode='+item.SeoCode">
              <img
                :src="item.SeriesImg"
                onerror="this.src = 'https://pic.keede.com//app/images/goods_errimg.png'"
              />
              <span>{{item.AnotherName}}</span>
            </a>
          </view>
        </scroll-view>
      </div>
      <div class="closeproType" v-on:click="_showMoreSeries()">
        <img
          :src="SeriesShowType=='More'?'/static/images/closeMore.png':'/static/images/showMore.png'"
          alt
        />
      </div>
    </div>
    <!-- 商品属性 -->
    <div class="proInfo">
      <div class="proInfoTop">
        <div class="proprice">
          <div class="truePrice">
            <em>￥</em>
            <span>{{Data.GoodsBase.SalePrice}}</span>
          </div>
          <div class="priceMsg">
            <i class="price">
              <em
                class="oldPrice"
                v-if="Data.GoodsBase.MarketPrice>0"
              >￥{{Data.GoodsBase.MarketPrice}}</em>
              <span v-if="Data.GoodsBase.ReducePrice>0">↓￥{{Data.GoodsBase.ReducePrice}}</span>
            </i>
            <span
              class="priceTag"
              v-if="Data.GoodsBase.PriceLable=='降价'"
            >{{Data.GoodsBase.PriceLable}}</span>
            <span class="priceTag" v-else>
              <img class="tagImg" :src="'/static/images/level_0'+Data.UserInfo.RoleId+'.jpg'" />会员价
            </span>
          </div>
        </div>
        <div class="prolabelBox">
          <div class="prolabel">
            <span>快递:{{Data.GoodsBase.ShopId==2?Data.GoodsBase.AmoyFreight+"元":"满80包邮"}}</span>
            <span>已售: {{Data.GoodsBase.SaleQuantity}}件</span>
            <span class="proloveNum">
              <i>♡</i>
              {{Data.GoodsBase.CollectionCount}}
            </span>
          </div>
          <div class="prolabel">
            <span class="label">
              <em class="icon"></em>正品保障
            </span>
            <span class="label">
              <em class="icon"></em>
              {{Data.GoodsBase.ShopId==2?"贴心客服":"7天退还"}}
            </span>
            <span class="label">
              <em class="icon"></em>极速物流
            </span>
          </div>
        </div>
      </div>
      <div class="proInfoBottom">
        <div class="labelImg">
          <div class="overseaTag" v-if="Data.GoodsBase.ShopId==2"></div>
          <div class="addTag" v-if="Data.GoodsBase.ShopId==2">
            <img :src="Data.GoodsBase.NationalFlagUrl" mode="widthFix" />
          </div>
          <div class="selfShop" v-if="Data.GoodsBase.ShopId!=2">自营</div>
        </div>
        <div class="proNameBox">
          <div class="proName">{{Data.GoodsBase.GoodsName}}</div>
          <div class="proAdd" v-if="Data.GoodsBase.ShopId==2">{{Data.GoodsBase.National}}</div>
          <div class="proDes">{{Data.GoodsBase.ShortDescription}}</div>
        </div>
      </div>
    </div>
    <!-- 优惠活动一览 -->
    <div class="blackLine">FULL OFFER | 优惠满满</div>
    <div class="actCon">
      <div
        class="act-lingquan actLine"
        v-if="Data.GoodsPagePromotion != null&&Data.GoodsPagePromotion.Coupons != null && Data.GoodsPagePromotion.Coupons.length>0"
        v-on:click="_showCoupon()"
      >
        <span class="act-name">领券</span>
        <span
          class="coupon"
          v-for="item in Data.GoodsPagePromotion.Coupons"
          :key="item.index"
        >满{{item.MeetAmount}}-{{item.DeductionAmount}}</span>
        <span class="act-info">
          领券
          <span class="icon">></span>
        </span>
      </div>
      <div class="act-jifen actLine" v-if="Data.GoodsBase.GiftScore > 0">
        <span class="act-name">积分</span>
        <span class="act-con">购买送{{Data.GoodsBase.GiftScore}}积分</span>
        <span class="act-info">
          <span class="icon">></span>
        </span>
      </div>
      <div class="act-dikou actLine" v-if="Data.GoodsBase.ScoreDeductionPrice > 0">
        <span class="act-name">抵扣</span>
        <span class="act-con">积分至多抵扣￥{{Data.GoodsBase.ScoreDeductionPrice}}</span>
      </div>
      <div
        class="act-zengpin actLine"
        v-if="Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.Gift != null && Data.GoodsPagePromotion.Gift.length>0"
      >
        <span class="act-name">赠品</span>
        <span
          class="act-con"
        >{{Data.GoodsPagePromotion.Gift[0].GoodsName}}{{Data.GoodsPagePromotion.Gift.length>1?"等":""}}</span>
        <span class="act-info">
          <span class="icon">></span>
        </span>
      </div>
      <block
        v-if="Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.FullGift != null && Data.GoodsPagePromotion.FullGift.length>0"
      >
        <div
          class="act-manzeng actLine"
          v-for="item in Data.GoodsPagePromotion.FullGift"
          :key="item.index"
        >
          <span class="act-name">满赠</span>
          <span class="act-con">{{item.PromotionTheme}}</span>
          <span class="act-info">
            <span class="icon">></span>
          </span>
        </div>
      </block>
      <div
        class="act-huangou actLine"
        v-if="Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.FreeCollocation != null && Data.GoodsPagePromotion.FreeCollocation.length>0"
      >
        <span class="act-name">换购</span>
        <span class="act-con">{{Data.GoodsPagePromotion.FreeCollocation[0].PromotionTheme}}</span>
        <span class="act-info">
          <span class="icon">></span>
        </span>
      </div>
      <div
        class="act-manjian actLine"
        v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.FullReducePromotion != null"
      >
        <span class="act-name">满减</span>
        <span class="act-con">{{Data.GoodsPagePromotion.FullReducePromotion.PromotionTheme}}</span>
        <span class="act-info">
          <span class="icon">></span>
        </span>
      </div>
      <block
        v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.ChangeBuy != null && Data.GoodsPagePromotion.ChangeBuy.length>0"
      >
        <div
          class="act-manhuan actLine"
          v-for="item in Data.GoodsPagePromotion.ChangeBuy"
          :key="item.index"
        >
          <span class="act-name">满换</span>
          <span class="act-con">{{item.PromotionTheme}}</span>
          <span class="act-info">
            <span class="icon">></span>
          </span>
        </div>
      </block>
      <div class="act-peijian actLine" v-if="Data.ErpGifts != null && Data.ErpGifts.length>0">
        <span class="act-name">配件</span>
        <span class="act-con">{{Data.ErpGifts[0].GoodsName}}</span>
        <span class="act-info">
          <span class="icon">></span>
        </span>
      </div>
    </div>
    <!-- 海淘明细 -->
    <block v-if="Data.GoodsBase.ShopId==2">
      <div class="blackLine">SEA SCOURING | 海淘明细</div>
      <div class="actCon">
        <div class="act-wuliu actLine">
          <span class="act-name">物流</span>
          <span class="act-con">
            <img
              :src="Data.GoodsBase.IsDirectPost?'https://pic.keede.com//app/images/wuliu2.png':'https://pic.keede.com//app/images/wuliu1.png'"
              mode="widthFix"
            />
          </span>
        </div>
        <div class="act-shuifei actLine">
          <span class="act-name">税费</span>
          <span class="act-con">进口税 商家承担</span>
          <span class="act-info">
            税费说明
            <span class="icon">></span>
          </span>
        </div>
      </div>
    </block>
    <!-- 套餐组合 -->
    <block v-if="Data.isComp&&!Data.CompGoods!=null&&Data.CompGoods.CompCount>0">
      <div class="line"></div>
      <div class="actCon">
        <div class="act-taocan actLine">
          <span class="act-name">套餐组合</span>
          <a class="act-info" :href="'/product/Combine?goodsid='+Data.GoodsBase.GoodsId">
            更多套餐
            <span class="icon">></span>
          </a>
        </div>
      </div>
      <div class="compBox">
        <div class="tczh-note">
          套餐商品不参与单品活动，最高可省下￥
          <em>{{Data.CompGoods.MaxReduceMoney}}</em>
          &nbsp;共{{Data.CompGoods.CompCount}}款
        </div>
        <div class="tczh-title">
          <block v-for="item in Data.CompGoods.CompGoods" :key="item.index">
            <div class="tczh-notelist">
              <div class="tczh-note-1">
                套餐{{item.index}}
                <em>￥{{item.Price}}</em>
                <i>立省￥{{item.ReduceMoney}}</i>
              </div>
            </div>
            <div class="tczh-namelist">
              <div class="select">套餐{{item.index}}</div>
            </div>
          </block>
        </div>
        <div class="tczh-proListBox">
          <swiper display-multiple-items="3.5">
            <block v-for="item in Data.CompGoods.CompGoods" :key="item.index">
              <swiper-item>
                <view class="tczh-item">
                  <div>
                    <img :src="item.Img" />
                  </div>
                  <span>{{item.GoodsName}}</span>
                  <em>￥{{item.Price}}</em>
                </view>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
    </block>
    <!-- 功能参数 -->
    <block v-if="!Data.Attributes!=null && Data.Attributes.length> 0">
      <div class="blackLine">FUNCTION PARAMETER | 功能参数</div>
      <div class="actCon">
        <div class="act-canshu actLine">
          <span class="act-name">参数</span>
          <span class="act-con" ><block v-for="item in Data.Attributes" :key="item.index"><span>{{item.Name}}</span></block>...</span>
          <span class="act-info">
            <span class="icon">></span>
          </span>
        </div>
      </div>
      <div class="xuanGou">
        <span class="xuanGou-name">选购</span>
        <div class="eyeBox">
          <div class="eyeMsg">
            <div class="eyeType">右眼R</div>
            <div class="eyeNote">点击选择参数</div>
          </div>
          <div class="eyeImg">
            <img src="https://pic.keede.com//app/images//productInfo/eye.png" />
          </div>
        </div>
        <div class="eyeBox">
          <div class="eyeMsg">
            <div class="eyeType">左眼L</div>
            <div class="eyeNote">点击选择参数</div>
          </div>
          <div class="eyeImg">
            <img src="https://pic.keede.com//app/images//productInfo/eye.png" />
          </div>
        </div>
        <div class="dshsBox">
          <img src="https://pic.keede.com//app/images//productInfo/eye.png" />
          <div>度数换算</div>
        </div>
      </div>
    </block>
    <!-- 评论 -->
    <div class="line"></div>
    <div class="actCon remarkBox">
      <div class="act-remark actLine">
        <span class="act-name">瞳学评论(0)</span>
        <span class="act-info">
          100%好评 &nbsp;全部
          <span class="icon">></span>
        </span>
      </div>
    </div>
    <div class="remarkTag">
      <ul>
        <li class="tag">
          <a>全部</a>
        </li>
        <li class="tag">
          <a>有图（123）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
        <li class="tag">
          <a>师傅（456）</a>
        </li>
      </ul>
    </div>
    <div class="remarkCon">
      <div class="comment-header">
        <img
          lazy-load="true"
          class="header-icon"
          src="https://pic.keede.com//app/images/login_img.png"
        />
        <div class="comment-header-right">
          <div class="kd-level">
            <img lazy-load="true" class="comment-star" src />
            <img lazy-load="true" class="comment-star" src />
            <img lazy-load="true" class="comment-star" src />
            <img lazy-load="true" class="comment-star" src />
            <img lazy-load="true" class="comment-star" src />
          </div>
          <text class="comment-time">2019-10-21 21:26:28</text>
        </div>
      </div>
      <div class="comment-text-style">这是商品系列</div>
      <div class="comment-text">评论内容</div>
    </div>
    <!-- 同价位 同类别 同周期 -->
    <div class="guessLike">
      <div class="goodsTypeTag">
        <div class="tjw selected" data-target="tjw" data-type="117.00">同价位</div>
        <div class="tlb" data-target="tlb" data-type="2">同类别</div>
        <div class="tzq" data-target="tzq" data-type="日抛 ">同周期</div>
      </div>
      <div class="goodsTypeBox">
        <swiper display-multiple-items="3.2">
          <block v-for="item in background" :key="item.index">
            <swiper-item>
              <a href>
                <img src="https://pic.keede.com//app/images/goods_errimg.png" mode="widthFix" />
                <div class="goodsName">SHANGPREE/香蒲丽 螺旋藻水光面膜 5片/盒 海淘专享</div>
                <div class="goodsPrice">￥180.00</div>
              </a>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <div class="detailNote" name="detail" id="detail">
      ——— &nbsp;
      <img src="https://pic.keede.com//app/images//productInfo/detail.png" /> 详情 ———
    </div>
    <!-- 详情 -->
    <div class="detailBox"></div>
    <div class="overline">——— 我是有底线的 ———</div>
  </div>
</template>

<script>
import api from "@/api/goods";
import { mapState } from "vuex";

export default {
  data() {
    return {
      Data: "",
      bannerIndicator: 1,
      isComp: false,
      bannerType: "Img",
      SeriesShowType: "More"
    };
  },
  computed: {},
  onLoad() {
    this._getPageData();
  },
  methods: {
    _getPageData() {
      //var seocode="revia6";//自营
      var seocode = "htyx6"; //海淘
      var isComp = false;
      api.getGoodsDetail(seocode, isComp).then(({ Data }) => {
        console.log(Data);
        this.Data = Data;
        Data.GoodsBase.SalePrice = Data.GoodsBase.SalePrice.toFixed(2);
        Data.GoodsBase.MarketPrice = Data.GoodsBase.MarketPrice.toFixed(2);
        Data.GoodsBase.ReducePrice = Data.GoodsBase.ReducePrice.toFixed(2);
        Data.GoodsBase.ScoreDeductionPrice = Data.GoodsBase.ScoreDeductionPrice.toFixed(
          2
        );
        Data.isComp = isComp;
      });
    },
    bannerChange: function(e) {
      this.bannerIndicator = e.target.current + 1;
    },
    _getLevelNum(gradeName) {
      let num;
      switch (gradeName) {
        case "普通会员":
        case "普通会员价":
          num = 1;
          break;
        case "水晶会员":
        case "水晶会员价":
          num = 2;
          break;
        case "白银会员":
        case "白银会员价":
          num = 3;
          break;
        case "黄金会员":
        case "黄金会员价":
          num = 4;
          break;
        case "铂金会员":
        case "铂金会员价":
          num = 5;
          break;
        case "钻石会员":
        case "钻石会员价":
          num = 6;
          break;
        default:
          num = 0;
          break;
      }
      return num;
    },
    _changeOverflowNum(num) {
      return num > 99 ? "99+" : num;
    },
    _showVideo() {
      this.bannerType = "Video";
    },
    _showImg() {
      this.bannerType = "Img";
    },
    _showMoreSeries() {
      this.SeriesShowType == "More"
        ? (this.SeriesShowType = "Less")
        : (this.SeriesShowType = "More");
    },
    _showCoupon(){
      console.log(1,2);
    }
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>