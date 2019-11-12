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
              <span class="priceTag" v-if="isComp">套餐价</span>
              <span
                class="priceTag"
                v-else-if="Data.GoodsBase.PriceLable=='降价'"
              >{{Data.GoodsBase.PriceLable}}</span>
              <span class="priceTag" v-else>
                <img
                  class="tagImg"
                  :src="'/static/images/level_0'+(Data.UserInfo.RoleId?Data.UserInfo.RoleId:'0')+'.jpg'"
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
            <span class="icon"></span>
          </span>
        </div>
        <div class="act-dikou actLine" v-if="Data.GoodsBase.ScoreDeductionPrice > 0">
          <span class="act-name">抵扣</span>
          <span class="act-con">积分至多抵扣￥{{Data.GoodsBase.ScoreDeductionPrice}}</span>
        </div>
        <div
          class="act-zengpin actLine"
          v-if="Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.Gift != null && Data.GoodsPagePromotion.Gift.length>0"
          @click=" _showActive('ZP')"
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
            @click=" _showActive('MZ')"
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
          @click=" _showActive2('HG')"
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
          @click=" _showActive('MJ')"
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
            @click=" _showActive2('MH')"
          >
            <span class="act-name">满换</span>
            <span class="act-con">{{item.PromotionTheme}}</span>
            <span class="act-info">
              <span class="icon">></span>
            </span>
          </div>
        </block>
        <div
          class="act-peijian actLine"
          v-if="Data.ErpGifts != null && Data.ErpGifts.length>0"
          @click=" _showActive('PJ')"
        >
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
          <div class="act-shuifei actLine" @click="_showShuiFei()">
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
      <block
        v-if="Data.isComp&&Data.Items!=null&&Data.Items[0]!=null&&Data.Items[0].IsSpecificationGoods"
      >
        <div class="actCon">
          <div class="act-canshu actLine" @click="_showCanShu()">
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
          <div class="act-canshu actLine" @click="_showCanShu2()">
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
          <a
            :href="Data.GoodsBase.GoodsType==4?frameAttrHref+'&IsBuyNow=false':normalAttrHref+'&IsBuyNow=false'"
          >
            <div class="eyeBox">
              <div class="eyeMsg">
                <div class="eyeType">右眼R</div>
                <div class="eyeNote">点击选择参数</div>
              </div>
              <div class="eyeImg">
                <img src="/static/images/icon-pro-eye.png" />
              </div>
            </div>
          </a>
          <a
            :href="Data.GoodsBase.GoodsType==4?frameAttrHref+'&IsBuyNow=false':normalAttrHref+'&IsBuyNow=false'"
          >
            <div class="eyeBox">
              <div class="eyeMsg">
                <div class="eyeType">左眼L</div>
                <div class="eyeNote">点击选择参数</div>
              </div>
              <div class="eyeImg">
                <img src="/static/images/icon-pro-eye.png" />
              </div>
            </div>
          </a>
          <div class="dshsBox" @click="_showDSHS()">
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
          <a class="act-info" v-if="Data.Remark != null" :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&&label=1'" >
            {{Data.Remark.PraiseRatio}}%好评 &nbsp;全部
            <span class="icon">></span>
          </a>
        </div>
      </div>
      <div class="remarkTag" v-if="Data.Remark != null && Data.Remark.TotalCount > 0">
        <ul>
          <li class="tag">
            <a :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&&label=1'">全部</a>
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
                :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&&label='+(item.index+3)"
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
            <div
              :class="'tjw '+(QueryGoodsType=='price'?'selected':'')"
              @click="_getSameTypeData('price')"
            >同价位</div>
            <div
              :class="'tlb '+(QueryGoodsType=='goodsType'?'selected':'')"
              @click="_getSameTypeData('goodsType')"
            >同类别</div>
            <div
              :class="'tzq '+(QueryGoodsType=='period'?'selected':'')"
              @click="_getSameTypeData('period')"
            >同周期</div>
          </div>
          <div class="goodsTypeBox" v-if="QueryGoodsData!=null">
            <swiper display-multiple-items="3.2">
              <block v-for="item in QueryGoodsData" :key="item.index">
                <swiper-item>
                  <a href>
                    <img :src="item.Img" mode="widthFix" />
                    <div class="goodsName">{{item.GoodsName}}</div>
                    <div class="goodsPrice">￥{{item.Price}}</div>
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
            <div
              :class="'tjw '+(QueryGoodsType2=='PPTJ'?'selected':'')"
              @click="_getSameTypeData2('PPTJ')"
            >品牌推荐</div>
            <div
              :class="'tlb '+(QueryGoodsType2=='CNXH'?'selected':'')"
              @click="_getSameTypeData2('CNXH')"
            >猜你喜欢</div>
            <div
              :class="'tzq '+(QueryGoodsType2=='RXPH'?'selected':'')"
              @click="_getSameTypeData2('RXPH')"
            >热销排行</div>
          </div>
          <div class="goodsTypeBox">
            <swiper display-multiple-items="3.2">
              <block v-for="item in QueryGoodsData2" :key="item.index">
                <swiper-item>
                  <a href>
                    <img :src="item.GoodsImg" mode="widthFix" />
                    <div class="goodsName">{{item.GoodsName}}</div>
                    <div class="goodsPrice">￥{{item.Price}}</div>
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
          <text class="link" @click="_userAgreement">《可得用户注册协议》</text>
        </div>
        <div class="detailCon" v-if="GoodsAbout">
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
          <a
            class="addCart"
            :href="Data.GoodsBase.GoodsType==4?frameAttrHref+'&IsBuyNow=false':normalAttrHref+'&IsBuyNow=false'"
          >加入购物车</a>
          <a
            class="buyNow"
            :href="Data.GoodsBase.GoodsType==4?frameAttrHref+'&IsBuyNow=true':normalAttrHref+'&IsBuyNow=true'"
          >立即购买</a>
        </div>
      </div>
    </template>
    <!-- 打包参数弹出框 -->
    <bottomFlip :isShow.sync="isShowCanShu">
      <div class="bf-con bf-canshu" v-if="Data.Items != null && Data.Items.length>0">
        <div class="compMsg" v-for="(item,index_) in Data.Items" :key="index_">
          <div class="pack-content">
            <div class="pack-name">
              <img :src="item.Img" :alt="item.GoodsName" />
              <div>
                <h3>商品参数</h3>
                <span>{{item.GoodsName}}</span>
              </div>
            </div>
            <div class="pack-attributes">
              <span v-for="itemAttr in item.Attributes" :key="itemAttr.index">
                <em>{{itemAttr.Key}}</em>
                {{itemAttr.Value}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 税费说明 -->
    <bottomFlip :isShow.sync="isShowShuiFei">
      <div class="bf-con bf-shuifei">
        <h2>税费说明</h2>
        <div class="hwBuy-content">
          <p>1、该商品税费由可得承担。</p>
          <br />
          <p>
            2、进口税计算：进口税=商品完税价格（包括运费）*税率
            （完税价格由海关最终认定）。
          </p>
          <br />
          <p>
            3、单笔交易总金额超过2000元，个人年度交易总金额超过
            20000元，将按一般贸易方式全额征税。
          </p>
          <br />
        </div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 普通商品参数属性 -->
    <bottomFlip :isShow.sync="isShowCanShu2">
      <div
        class="bf-con bf-canshu2"
        v-if="Data.Attributes != null||(Data.GoodsBase!=null&&Data.GoodsBase.ApproveDocumentNumber!=null)||(Data.GoodsBase!=null&&Data.GoodsBase.BrandName!=null) "
      >
        <h2>产品参数</h2>
        <div class="canShu-content">
          <ul>
            <block v-for="item in Data.Attributes" :key="item.index">
              <li v-if="item.Name!='品牌'">
                <em>{{item.Name}}</em>
                <span>{{item.Value}}</span>
              </li>
            </block>
            <li v-if="Data.Series!=null && Data.Series.length > 0">
              <em>颜色分类</em>
              <span class="CanShuSeries">
                <scroll-view
                  class="scroll-wrapper colorSeries"
                  scroll-x
                  scroll-with-animation="true"
                  enable-flex="true"
                >
                  <div
                    :data-bigimg="color.GoodsMainImageUrl"
                    v-for="color in Data.Series"
                    :key="color.index"
                  >
                    <em>{{color.AnotherName}}</em>
                    <img :src="color.SeriesImg" />
                  </div>
                </scroll-view>
              </span>
            </li>
            <li v-if="Data.GoodsBase.ApproveDocumentNumber!=null">
              <em>批准文号</em>
              <span>{{Data.GoodsBase.ApproveDocumentNumber}}</span>
            </li>
            <li v-if="Data.GoodsBase!=null&&Data.GoodsBase.BrandName!=null">
              <em>品牌</em>
              <span>{{Data.GoodsBase.BrandName}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 领券弹框 -->
    <bottomFlip :isShow.sync="isShowCoupon">
      <div class="bf-con bf-coupon">
        <div class="lingQuan-title">
          适用优惠券
          <em>已有积分：{{Data.UserInfo != null ? Data.UserInfo.Score : 0}}</em>
        </div>
        <div class="lingQuan-content">
          <div class="yhqList">
            <ul
              v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.Coupons != null && Data.GoodsPagePromotion.Coupons.length>0"
            >
              <li
                :class="(item.LimitationType == 1? 'newman' : '')"
                v-for="item in Data.GoodsPagePromotion.Coupons"
                :key="item.index"
              >
                <div>
                  <span>
                    <span class="yhqmz">
                      <em>
                        ￥
                        <i>{{item.DeductionAmount}}</i>
                      </em>
                      满{{item.MeetAmount}}元可用
                    </span>
                    <span class="yhqmsg">
                      <span>{{item.PromotionTheme}}</span>
                      <em
                        class="c_start"
                      >开始时间:{{(item.UseStartTime==null? "点击领券后获得时间" : item.UseStartTime)}}</em>
                      <em
                        class="c_end"
                      >截止时间:{{(item.UseEndTime==null? "点击领券后获得时间" : item.UseEndTime)}}</em>
                    </span>
                    <span
                      :class="'yhqbtn'+(item.HasPicked ? 'disabled' : '')"
                      :data-cid="item.PromotionID"
                      @click="_getCoupon(item.PromotionID)"
                    >{{(item.HasPicked ? "已领取" : "领券")}}</span>
                  </span>
                </div>
                <div class="yhqmsg-slide">
                  <p @click="_showYHQmsg()">
                    <span>{{item.UseDescription}}</span>
                    <em :class="(isshowyhqmsg?'change':'')">∨</em>
                  </p>
                  <div
                    class="msg-slidebox"
                    v-html="item.OrderDescription"
                    v-if="isshowyhqmsg"
                  >{{item.OrderDescription}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <span class="pricenote">以上价格仅为初步预估，不代表最终购买价格</span>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 满减、满赠、赠品、配件弹出框 -->
    <bottomFlip :isShow.sync="isShowActive">
      <div class="bf-con bf-active">
        <h2>促销活动</h2>
        <div class="zengpin-content">
          <div
            class="manJian-type"
            v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.FullReducePromotion != null&&isShowMJ"
          >
            <div>
              <em>满额减</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SalePrice}}</span>
            </div>
            <div
              v-if="Data.GoodsPagePromotion.FullReducePromotion.DeductionSettings != null && Data.GoodsPagePromotion.FullReducePromotion.DeductionSettings.length>0"
            >
              <span
                v-for="item in Data.GoodsPagePromotion.FullReducePromotion.DeductionSettings"
                :key="item.index"
              >满{{item.StartMeetAmount}}-{{item.ReduceAmount}}元</span>
            </div>
            <div>
              <em
                v-for="item in Data.GoodsPagePromotion.FullReducePromotion.DeductionSettings"
                :key="item.index"
              >{{item.Content==null ? "" : "(" + item.Content + ")"}}</em>
            </div>
            <div class>
              <a
                :href="'Piecetogether?promotionID='+Data.GoodsPagePromotion.FullReducePromotion.PromotionID+'&couponTitle='+Data.GoodsPagePromotion.FullReducePromotion.PromotionTheme+'&shopid='+Data.GoodsBase.ShopId"
              >
                点击凑单
                <em>&gt;</em>
              </a>
            </div>
          </div>
          <div
            class="mfzp-type"
            v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.Gift != null && Data.GoodsPagePromotion.Gift.length>0&&isShowZP"
          >
            <div>
              <em>免费赠品</em>
            </div>
            <div class="mfzp-list">
              <scroll-view class="swiper-wrapper" scroll-x scroll-with-animation="true">
                <li
                  class="swiper-slide"
                  v-for="erpItem in Data.GoodsPagePromotion.Gift"
                  :key="erpItem.index"
                >
                  <a :href="'/'+erpItem.SeoCode">
                    <div class="imgbox">
                      <img :src="erpItem.Img" />
                    </div>
                    <span>{{erpItem.GoodsName}}{{(erpItem.MaxTimes > 0 ? "（限赠" + erpItem.MaxTimes + "）" : "")}}</span>
                  </a>
                </li>
              </scroll-view>
            </div>
          </div>
          <div class="erpzp-type" v-if="Data.ErpGifts != null && Data.ErpGifts.length>0&&isShowPJ">
            <div>
              <em>配件</em>
            </div>
            <div class="pj-list">
              <scroll-view scroll-x scroll-with-animation="true">
                <li class="swiper-slide" v-for="erpItem in Data.ErpGifts" :key="erpItem.index">
                  <a :href="'/'+erpItem.SeoCode">
                    <div class="imgbox">
                      <img :src="erpItem.ImageUrl" />
                    </div>
                    <span>{{erpItem.GoodsName}}{{(erpItem.MaxTimes > 0 ? "（限赠" + erpItem.MaxTimes + "）" : "")}}</span>
                  </a>
                </li>
              </scroll-view>
            </div>
          </div>
          <div
            class="mezp-type"
            v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.FullGift != null && Data.GoodsPagePromotion.FullGift.length>0&&isShowMZ"
          >
            <div>
              <em>满额赠品</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SalePrice}}</span>
            </div>
            <div class="mezp-list">
              <ul>
                <li v-for="item in Data.GoodsPagePromotion.FullGift" :key="item.index">
                  <div class="mezp-pro">
                    <div class="imgbox">
                      <img :src="item.Img" />
                      <a
                        :href="'Piecetogether?promotionID='+item.PromotionID+'&couponTitle='+item.PromotionTheme+'&shopid'+Data.GoodsBase.ShopId"
                      >
                        点击凑单
                        <em>&gt;</em>
                      </a>
                    </div>
                    <span>{{item.GoodsName}}{{(item.ExchangeQuantity > 0 ? "(限赠" + item.ExchangeQuantity + ")" : "")}}</span>
                    <em v-if="item.Content!=null">· {{item.Content}}</em>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 换购、满换 弹出框-->
    <bottomFlip :isShow.sync="isShowActive2">
      <div class="bf-con bf-active2">
        <h2>促销活动</h2>
        <h5>换购商品不参与满赠和满减</h5>
        <div class="active-content">
          <div
            class="jqhg-type"
            v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.FreeCollocation != null && Data.GoodsPagePromotion.FreeCollocation.length>0&&isShowHG"
          >
            <div>
              <em>加钱换购</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length"
              >该品售价￥{{Data.GoodsBase.SalePrice}}</span>
            </div>
            <div class="jqhg-list">
              <ul>
                <li
                  class="afterline"
                  v-for="item in Data.GoodsPagePromotion.FreeCollocation"
                  :key="item.index"
                >
                  <div class="jqhg-pro">
                    <em>+￥{{item.Price}}换购</em>
                    <div class="imgbox">
                      <img :src="item.Img" />
                      <div class="jqhg-btn">
                        <span>{{item.GoodsName}}</span>
                        <a :href="'/'+item.Seocode">
                          商品详情
                          <em>&gt;</em>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="mehg-type"
            v-if="Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.ChangeBuy != null && Data.GoodsPagePromotion.ChangeBuy.length>0&&isShowMH"
          >
            <div>
              <em>满额换购</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SalePrice}}</span>
            </div>
            <div class="mehg-list">
              <ul>
                <li
                  class="afterline"
                  v-for="item in Data.GoodsPagePromotion.ChangeBuy"
                  :key="item.index"
                >
                  <div class="mehg-pro">
                    <em>订单{{item.Content}}</em>
                    <div class="imgbox">
                      <img :src="item.Img" />
                    </div>
                  </div>
                  <div class="mehg-btn">
                    <span>换购 {{item.GoodsName}}</span>
                    <a
                      :href="'Piecetogether?promotionID='+item.PromotionID+'&couponTitle='+item.PromotionTheme+'&shopid='+Data.GoodsBase.ShopId"
                    >
                      点击凑单
                      <em>&gt;</em>
                    </a>
                    <a :href="'/'+item.SeoCode">
                      商品详情
                      <em>&gt;</em>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="huanGouNote">以上价格计算仅为初步预估，不代表最终购买价格,换购默认1件</div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
  </div>
</template>

<script>
import api from "@/api/goods";
import { mapActions, mapState } from 'vuex'
import bottomFlip from "@/components/bottomFlip";
import wxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      GoodsAbout: "",
      Data: "",
      bannerIndicator: 1,
      isComp: false,
      bannerType: "Img",
      SeriesShowType: "More",
      isShowCanShu: false,
      isShowCanShu2: false,
      isShowCoupon: false,
      isshowyhqmsg: false,
      isShowActive: false,
      isShowMJ: false,
      isShowMZ: false,
      isShowZP: false,
      isShowPJ: false,
      isShowHG: false,
      isShowMH: false,
      frameAttrHref: "",
      normalAttrHref: "",
      QueryGoodsData: "",
      QueryGoodsType: "price",
      QueryGoodsType2: "PPTJ",
      QueryGoodsData2: "",
    };
  },
  computed: {},
  onLoad(options) {
    this._getPageData(options.seocode, options.isComp);
  },
  filters: {
    toFixed: function(num) {
      num = Number(num);
      return num.toFixed(2);
    }
  },
  components: {
    bottomFlip,
    wxParse
  },
  methods: {
    ...mapActions('remark', ['setData']),
    _getPageData(seocode, isComp) {
      //var seocode="revia6";//自营
      //var seocode = "htyx6"; //海淘
      //var seocode = "hankj744"; //有配件
      //var seocode = "revia180"; //打包
      //var seocode = "ns33"; //多个活动
      //var isComp = false;
      //var isComp = true;
      api.getGoodsDetail(seocode, isComp).then(({ Data }) => {
        console.log(Data);
        Data.GoodsBase.SalePrice = Data.GoodsBase.SalePrice.toFixed(2);
        Data.GoodsBase.MarketPrice = Data.GoodsBase.MarketPrice.toFixed(2);
        Data.GoodsBase.ReducePrice = Data.GoodsBase.ReducePrice.toFixed(2);
        Data.GoodsBase.ScoreDeductionPrice = Data.GoodsBase.ScoreDeductionPrice.toFixed(
          2
        );
        Data.GoodsPagePromotion.FreeCollocation = Data.GoodsPagePromotion.FreeCollocation.map(
          function(value, index) {
            value.Price = value.Price.toFixed(2);
            return value;
          }
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
        Data.GoodsPagePromotion.Coupons = Data.GoodsPagePromotion.Coupons.map(
          function(value, index) {
            value.UseStartTime = value.UseStartTime.replace("T", " ");
            value.UseEndTime = value.UseEndTime.replace("T", " ");
            return value;
          }
        );
        this.setData(Data.Remark);
        this.isComp = isComp == "false" ? false : true;
        this.Data = Data;
        this._getGoodsAbout();
        if (this.Data.GoodsBase.ShopId == 2) {
          this._getSameTypeData("price");
        } else {
          this._getSameTypeData2("PPTJ");
        }
        this._AttrHref();
      });
    },
    _getGoodsAbout() {
      var GoodsId = this.Data.GoodsBase.GoodsId;
      api.getGoodsAbout(GoodsId).then(({ Data }) => {
        this.GoodsAbout = Data;
      });
    },
    //获取同类别同周期等数据
    _getSameTypeData(type) {
      this.QueryGoodsType = type;
      var goodsType = "",
        price = 0,
        period = "";
      switch (type) {
        case "goodsType":
          goodsType = this.Data.GoodsBase.GoodsType;
          break;
        case "price":
          price = this.Data.GoodsBase.PlatformPrice;
          break;
        case "period":
          period = this.Data.Attributes.find(item => item.Name === "周期")
            .Value;
          break;
        default:
          goodsType = this.Data.GoodsBase.GoodsType;
          break;
      }
      api.getQueryGoods(goodsType, price, period).then(({ Data }) => {
        this.QueryGoodsData = Data.map(function(value, index) {
          value.Price = value.Price.toFixed(2);
          return value;
        });
      });
    },
    //获取猜你喜欢等数据
    _getSameTypeData2(type) {
      this.QueryGoodsType2 = type;
      var brandIds = "",
        KeyWord = "",
        Sort = 0;
      switch (type) {
        case "PPTJ":
          brandIds = this.Data.GoodsBase.BrandId;
          break;
        case "CNXH":
          break;
        case "RXPH":
          brandIds = this.Data.GoodsBase.BrandId;
          Sort = "7";
          break;
        default:
          goodsType = this.Data.GoodsBase.GoodsType;
          break;
      }
      if (type == "CNXH") {
        api.getLikeGoods2(this.Data.GoodsBase.ShopId).then(({ Data }) => {
          this.QueryGoodsData2 = Data.map(function(value, index) {
            value.Price = value.Price.toFixed(2);
            value.GoodsImg = value.Img;
            return value;
          });
        });
      } else {
        api.getLikeGoods1(brandIds, KeyWord, Sort).then(({ Data }) => {
          this.QueryGoodsData2 = Data.map(function(value, index) {
            value.Price = value.Price.toFixed(2);
            return value;
          });
        });
      }
    },
    //
    _AttrHref() {
      var normalAttrHref =
        "../normalAttr/main?MaxSellNumber=" +
        this.Data.GoodsBase.MaxSellNumber +
        "&GoodsName=" +
        this.Data.GoodsBase.GoodsName +
        "&SeriesId=" +
        this.Data.GoodsBase.SeriesId +
        "&MarketPrice=" +
        this.Data.GoodsBase.MarketPrice +
        "&SalePrice=" +
        this.Data.GoodsBase.SalePrice +
        "&SaleScore=" +
        this.Data.GoodsBase.SaleScore +
        "&IsScarcity=" +
        this.Data.GoodsBase.IsScarcity +
        "&IsSpecialOffer=" +
        this.Data.GoodsBase.IsSpecialOffer +
        "&SaleStockType=" +
        this.Data.GoodsBase.SaleStockType +
        "&MaxDeduction=" +
        this.Data.GoodsBase.ScoreDeductionPrice +
        "&IsFreeCarriage=" +
        this.Data.GoodsBase.IsFreeCarriage;
      var frameAttrHref =
        "../frameAttr/main?MaxSellNumber=" +
        this.Data.GoodsBase.MaxSellNumber +
        "&GoodsName=" +
        this.Data.GoodsBase.GoodsName +
        "&SeriesId=" +
        this.Data.GoodsBase.SeriesId +
        "&MarketPrice=" +
        this.Data.GoodsBase.MarketPrice +
        "&SalePrice=" +
        this.Data.GoodsBase.SalePrice +
        "&SaleScore=" +
        this.Data.GoodsBase.SaleScore +
        "&IsScarcity=" +
        this.Data.GoodsBase.IsScarcity +
        "&IsSpecialOffer=" +
        this.Data.GoodsBase.IsSpecialOffer +
        "&SaleStockType=" +
        this.Data.GoodsBase.SaleStockType +
        "&MaxDeduction=" +
        this.Data.GoodsBase.ScoreDeductionPrice +
        "&IsFreeCarriage=" +
        this.Data.GoodsBase.IsFreeCarriage;
      this.normalAttrHref = normalAttrHref;
      this.frameAttrHref = frameAttrHref;
    },
    bannerChange: function(e) {
      this.bannerIndicator = e.target.current + 1;
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
    //优惠券弹框
    _showCoupon() {
      this.isShowCoupon = true;
    },
    //打包参数弹框
    _showCanShu() {
      this.isShowCanShu = true;
    },
    //税费弹框
    _showShuiFei() {
      this.isShowShuiFei = true;
    },
    //普通属性参数弹框
    _showCanShu2() {
      this.isShowCanShu2 = true;
    },
    //满减满赠赠品配件弹出框
    _showActive(type) {
      this.isShowActive = true;
      switch (type) {
        case "MJ":
          this.isShowMJ = true;
          break;
        case "MZ":
          this.isShowMZ = true;
          break;
        case "PJ":
          this.isShowPJ = true;
          break;
        case "ZP":
          this.isShowZP = true;
          break;

        default:
          break;
      }
    },
    //满换、换购弹出框
    _showActive2(type) {
      this.isShowActive2 = true;
      switch (type) {
        case "MH":
          this.isShowMH = true;
          break;
        case "HG":
          this.isShowHG = true;
          break;
        default:
          break;
      }
    },
    //关闭弹框
    _close() {
      this.isShowCanShu2 = false;
      this.isShowShuiFei = false;
      this.isShowCanShu = false;
      this.isShowActive = false;
      this.isShowActive2 = false;
      this.isShowCoupon = false;
      this.isShowZP = false;
      this.isShowMJ = false;
      this.isShowMH = false;
      this.isShowPJ = false;
      this.isShowMZ = false;
      this.isShowHG = false;
      this.isShowDSHS = false;
    },
    //优惠券信息显示
    _showYHQmsg() {
      this.isshowyhqmsg == true
        ? (this.isshowyhqmsg = false)
        : (this.isshowyhqmsg = true);
    },
    //领券
    _getCoupon(id) {
      console.log(id);
    },
    //度数换算跳转
    _showDSHS() {
      wx.navigateTo({
        url: '/pages/htmlPreview/main?url=' + encodeURIComponent('/TemplateForNewApp/degreeConversion')
      })
    },
    //用户协议跳转
    _userAgreement() {
      wx.navigateTo({
        url: '/pages/htmlPreview/main?url=' + encodeURIComponent('/TemplateForNewApp/userAgreement')
      })
    }
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>