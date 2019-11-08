<template>
  <div class="pro">
    <template v-if="Data.GoodsBase!=null">
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
          <swiper-item v-for="item in Data.GoodsBase.AppendImgs" :key="item.index">
            <img :src="item" alt mode="widthFix" />
          </swiper-item>
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
        <cover-view
          v-if="bannerType=='Img'"
          class="pic-indecator"
        >{{bannerIndicator}}/{{Data.GoodsBase.AppendImgs.length}}</cover-view>
      </div>
      <!-- 品类切换 -->
      <div class="proType" v-if="Data.Series!=null&&Data.Series.length>0">
        <div class="typeCon">
          <scroll-view
            :class="'scroll-wrapper '+(SeriesShowType=='More'?'':'close')"
            scroll-x
            scroll-with-animation="true"
          >
            <view
              :class="'series '+(Data.GoodsBase.SeoCode==item.SeoCode?'selected':'')"
              v-for="item in Data.Series"
              :key="item.index"
            >
              <a :href="'/main?seocode='+item.SeoCode">
                <img :src="item.SeriesImg" />
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
              <span class="priceTag" v-if="Data.isComp">套餐价</span>
              <span
                class="priceTag"
                v-else-if="Data.GoodsBase.PriceLable=='降价'"
              >{{Data.GoodsBase.PriceLable}}</span>
              <span class="priceTag" v-else>
                <img
                  class="tagImg"
                  :src="'/static/images/level_'+Data.UserInfo.RoleId?Data.UserInfo.RoleId:'0'+'.jpg'"
                />会员价
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
                {{Data.GoodsBase.ShopId==2?"贴心客服":"7天退换"}}
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
            <div class="proDes">{{Data.GoodsBase.ShortDescription}}</div>
            <div class="proAdd" v-if="Data.GoodsBase.ShopId==2">{{Data.GoodsBase.National}}</div>
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
      <block
        v-if="Data.isComp&&Data.CompGoods!=null&&Data.CompGoods.CompCount!=null&&Data.CompGoods.CompCount>0"
      >
        <div class="line"></div>
        <div class="actCon">
          <div class="act-taocan actLine">
            <span class="act-name">套餐组合</span>
            <a class="act-info" :href="'/Combine?goodsid='+Data.GoodsBase.GoodsId">
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
      <block v-if="Data.isComp&& Data.Items[0].IsSpecificationGoods">
        <div class="actCon">
          <div class="act-canshu actLine">
            <span class="act-name">参数</span>
            <span class="act-con">含水量 直径 基弧...</span>
            <span class="act-info">
              <span class="icon">></span>
            </span>
          </div>
        </div>
      </block>
      <block v-if="Data.Attributes!=null && Data.Attributes.length> 0">
        <div class="blackLine">FUNCTION PARAMETER | 功能参数</div>
        <div class="actCon">
          <div class="act-canshu actLine">
            <span class="act-name">参数</span>
            <span class="act-con">
              <block v-for="(item,index) in Data.Attributes" :key="item.index">
                <span v-if="index<3">{{item.Name}}&nbsp;</span>
              </block>...
            </span>
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
              <img src="/static/images/icon-pro-eye.png" />
            </div>
          </div>
          <div class="eyeBox">
            <div class="eyeMsg">
              <div class="eyeType">左眼L</div>
              <div class="eyeNote">点击选择参数</div>
            </div>
            <div class="eyeImg">
              <img src="/static/images/icon-pro-eye.png" />
            </div>
          </div>
          <div class="dshsBox">
            <img src="/static/images/icon-pro-eye.png" />
            <div>度数换算</div>
          </div>
        </div>
      </block>
      <!-- 套餐详情 -->
      <div class="compDetail" v-if="Data.Items != null && Data.Items.length > 0">
        <div class="blackLine">PACKAGE DETAILS | 套餐详细</div>
        <div class="compTitle">
          <div class="left">套餐组合</div>
          <div>
            含
            <span>{{Data.Items.length}}</span>件商品，剩余
            <span>{{Data.Items.length}}</span>件商品需要选择属性
          </div>
        </div>
        <div class="compGoods">
          <block v-for="item in Data.Items" :key="item.index">
            <div class="compGoodBox">
              <a class="compGoodImg" :href="'/main?seocode='+item.SeoCode+'&isComp=false'">
                <img :src="item.Img" alt />
              </a>
              <div class="compGoodCon">
                <div class="compGoodMsg">
                  <div class="compGoodName">{{item.GoodsName}}</div>
                  <div class="compGoodPrice">
                    <div class="price">￥{{item.Price}}</div>
                    <div class="markPrice">￥{{item.MarketPrice}}</div>
                  </div>
                </div>
                <div class="compSelectBox" v-if="item.IsSpecificationGoods">
                  <div>{{item.IsSeries?"请选择花色/度数":"请选择度数规格等参数"}}</div>
                  <div class="icon-bottom">﹀</div>
                </div>
                <div class="noAttr" v-else>x1</div>
              </div>
            </div>
          </block>
        </div>
      </div>
      <!-- 评论 -->
      <div class="line"></div>
      <div class="actCon remarkBox">
        <div class="act-remark actLine">
          <span class="act-name">瞳学评论({{Data.Remark==null?"0":Data.Remark.TotalCount}})</span>
          <span class="act-info" v-if="Data.Remark != null">
            {{Data.Remark.PraiseRatio}}%好评 &nbsp;全部
            <span class="icon">></span>
          </span>
        </div>
      </div>
      <div class="remarkTag" v-if="Data.Remark != null && Data.Remark.TotalCount > 0">
        <ul>
          <li class="tag">
            <a :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label=1'">全部</a>
          </li>
          <li class="tag">
            <a
              :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label=2'"
            >有图（{{Data.Remark.ImageCount}}）</a>
          </li>
          <block v-if="Data.Remark.LableTags != null && Data.Remark.LableTags.length>0">
            <li
              :class="'tag '+(Data.Sentiment==0?'badlabel':'')"
              v-for="item in  Data.Remark.LableTags"
              :key="item.index"
            >
              <a
                :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label='+(item.index+3)"
              >{{item.CommentLabel}}（{{item.Count}}）</a>
            </li>
          </block>
        </ul>
      </div>
      <block>
        <div
          class="remarkCon"
          v-if="Data.Remark != null && Data.Remark.Remarks != null && Data.Remark.Remarks.length>0"
        >
          <div class="remarkBox" v-for="item in Data.Remark.Remarks" :key="item.index">
            <div class="comment-header">
              <div class="userInfo">
                <img
                  class="header-icon"
                  :src="item.HeadImg?item.HeadImg:'/static/images/default_img.gif'"
                />
                {{item.UserName}}
              </div>
              <div class="comment-header-right">
                <div class="kd-level" :data-id="item.Rate">
                  <img
                    class="comment-star"
                    :src="item.Rate>0?'/static/images/full-start.png':'/static/images/empty-start.png'"
                  />
                  <img
                    class="comment-star"
                    :src="item.Rate>1?'/static/images/full-start.png':'/static/images/empty-start.png'"
                  />
                  <img
                    class="comment-star"
                    :src="item.Rate>2?'/static/images/full-start.png':'/static/images/empty-start.png'"
                  />
                  <img
                    class="comment-star"
                    :src="item.Rate>3?'/static/images/full-start.png':'/static/images/empty-start.png'"
                  />
                  <img
                    class="comment-star"
                    :src="item.Rate>4?'/static/images/full-start.png':'/static/images/empty-start.png'"
                  />
                </div>
                <text class="comment-time">{{item.PubTime}}</text>
              </div>
            </div>
            <div class="comment-text-style" v-if="item.AnotherName!=null">{{item.AnotherName}}</div>
            <div class="comment-text">{{item.Content}}</div>
          </div>
        </div>
        <div class="noremark" v-else>暂无评论</div>
      </block>
      <!-- 同价位 同类别 同周期 -->
      <block v-if="Data.GoodsBase.ShopId==2">
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
      </block>
      <!-- 品牌推荐 猜你喜欢 热销排行 -->
      <block v-else>
        <div class="guessLike">
          <div class="goodsTypeTag">
            <div class="tjw selected" data-target="tjw" data-type="117.00">品牌推荐</div>
            <div class="tlb" data-target="tlb" data-type="2">猜你喜欢</div>
            <div class="tzq" data-target="tzq" data-type="日抛 ">热销排行</div>
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
      </block>
      <div class="detailNote" name="detail" id="detail">
        ——— &nbsp;
        <img src="/static/images/detail.jpg" /> 详情 ———
      </div>
      <!-- 详情 -->
      <div class="detailBox">
        <div class="attention">
          <text class="b">注意事项：</text>隐形眼镜属于第三类医疗器材，购买前建议您先去正规的眼镜销售实体店或医院眼科机构进行专业的验配检查，确保您的使用安全和效果。请仔细选择适合您的光度，仔细阅读产品说明书或在医务人员的指导下购买和使用，禁忌内容或者注意事项详见说明书或
          <text class="link" bindtap="showUserAgreement">《可得用户注册协议》</text>
        </div>
        <div class="detailCon" v-if="GoodsAbout" >
          <wxParse :content="GoodsAbout.Discription" />
        </div>
      </div>
      <div class="overline">——— 我是有底线的 ———</div>
      <!-- 底部通栏 -->
      <div class="bottomNav">
        <div class="navBtn">
          <a href>
            <img src="/static/images/icon-pro-index.png" alt />首页
          </a>
          <a href>
            <img src="/static/images/icon-pro-sev.png" alt />客服
          </a>
          <a href>
            <img src="/static/images/icon-pro-cart.png" alt />购物车
          </a>
        </div>
        <div class="proBtn">
          <a class="addCart" href>加入购物车</a>
          <a class="buyNow" href>立即购买</a>
        </div>
      </div>
    </template>
    <bottomFlip :isShow.sync="isShow">
      asd
      <div class="sex-line c-888" @click="_close()">知道了</div>
    </bottomFlip>
  </div>
</template>

<script>
import api from "@/api/goods";
import { mapState } from "vuex";
import bottomFlip from "@/components/bottomFlip";
import wxParse from 'mpvue-wxparse'

export default {
  data() {
    return {
      Data: "",
      bannerIndicator: 1,
      isComp: false,
      bannerType: "Img",
      SeriesShowType: "More",
      isShow: false,
      GoodsAbout:""
    };
  },
  computed: {},
  onLoad() {
    this._getPageData();
    
  },
  filters: {
    toFixed: function(num) {
      num = Number(num);
      console.log(num.toFixed(2));
      return num.toFixed(2);
    }
  },
  components: {
    bottomFlip,
    wxParse
  },
  methods: {
    _getPageData() {
      //var seocode="revia6";//自营
      //var seocode = "htyx6"; //海淘
      var seocode = "revia180"; //打包
      //var isComp = false;
      var isComp = true;
      api.getGoodsDetail(seocode, isComp).then(({ Data }) => {
        console.log(Data);
        Data.GoodsBase.SalePrice = Data.GoodsBase.SalePrice.toFixed(2);
        Data.GoodsBase.MarketPrice = Data.GoodsBase.MarketPrice.toFixed(2);
        Data.GoodsBase.ReducePrice = Data.GoodsBase.ReducePrice.toFixed(2);
        Data.GoodsBase.ScoreDeductionPrice = Data.GoodsBase.ScoreDeductionPrice.toFixed(
          2
        );
        Data.Items = Data.Items.map(function(value, index) {
          value.Price = value.Price.toFixed(2);
          value.MarketPrice = value.MarketPrice.toFixed(2);
          return value;
        });
        Data.Remark.Remarks = Data.Remark.Remarks.map(function(value, index) {
          value.PubTime = value.PubTime.replace("T", " ");
          return value;
        });
        Data.isComp = isComp;
        this.Data = Data;
        this._getGoodsAbout();
      });
    },
    _getGoodsAbout(){
      console.log(this.Data.GoodsBase.GoodsId,123);
      var GoodsId=this.Data.GoodsBase.GoodsId;
      api.getGoodsAbout(GoodsId).then(({ Data }) => {
        this.GoodsAbout=Data;
      })
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
    _showCoupon() {
      console.log(1, 2);
    },
    //弹框
    _showJifen() {
      console.log(2);
      this.isShow = true;
    },
    _close() {
      console.log(3);
      this.isShow = false;
    }
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>