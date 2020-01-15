<template>
  <div class="pro">
    <template v-if="Data!=null&&Data.GoodsBase!=null">
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
        <div class="typeChange" v-if="Data.GoodsBase.VieoUrl!=null&&Data.GoodsBase.VieoUrl!=''">
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
              <a :href="'/pages/product/index/main?seocode='+item.SeoCode">
                <img :src="item.SeriesImg" />
                <span v-if="Data.GoodsBase.SeoCode==item.SeoCode">{{item.AnotherName}}</span>
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
              <span>{{Data.GoodsBase.SellPrice}}</span>
            </div>
            <div class="priceMsg">
              <i
                class="price"
                v-if="Data.GoodsBase.PriceLable!=null&&Data.GoodsBase.PriceLable == '限时直降'"
              >
                <em
                  class="oldPrice"
                  v-if="Data.GoodsBase.PlatformPrice>0"
                >￥{{Data.GoodsBase.PlatformPrice}}</em>
                <span v-if="Data.GoodsBase.ReducePrice>0">限时直降↓</span>
              </i>
              <block>
                <block v-if="isComp">
                  <span class="priceTag">套餐价</span>
                </block>
                <block v-else>
                  <span
                    class="priceTag rolepriceTag"
                    v-if="Data.GoodsBase.RolePrice!=0&&Data.GoodsBase.RolePrice-0<Data.GoodsBase.SellPrice-0"
                  >
                    <img
                      class="tagImg"
                      :src="'/static/images/level_0'+(Data.UserInfo.RoleId?Data.UserInfo.RoleId:'0')+'.jpg'"
                    />
                    价:￥{{Data.GoodsBase.RolePrice}}
                  </span>
                  <span
                    class="priceTag SVIP"
                    v-if="(Data.GoodsBase.SvipPrice!=0&&Data.GoodsBase.SvipPrice-0<Data.GoodsBase.SellPrice-0)&&(Data.GoodsBase.RolePrice!=0&&Data.GoodsBase.RolePrice-0>Data.GoodsBase.SvipPrice-0)"
                  >SVIP价:￥{{Data.GoodsBase.SvipPrice}}</span>
                  <span
                    class="priceTag SVIP"
                    v-if="(Data.GoodsBase.SvipPrice!=0&&Data.GoodsBase.SvipPrice-0<Data.GoodsBase.SellPrice-0)&&(Data.GoodsBase.RolePrice==0)"
                  >SVIP价:￥{{Data.GoodsBase.SvipPrice}}</span>
                </block>
              </block>
            </div>
          </div>
          <div class="prolabelBox">
            <div class="prolabel">
              <span>已售: {{Data.GoodsBase.SaleQuantity}}件</span>
            </div>
            <div class="prolabel">
              <span class="proloveNum">
                <i>♡</i>
                {{Data.GoodsBase.CollectionCount}}
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
      <div class="promotionBox"
          v-if="Data.GoodsPagePromotion != null&& (Data.GoodsBase.GiftScore > 0|| Data.GoodsBase.ScoreDeductionPrice > 0|| Data.GoodsPagePromotion.isHave||Data.GoodsPagePromotion.FullReducePromotion != null|| Data.ErpGifts != null)"
        > 
        <div
          class="blackLine"
          v-if="Data.GoodsPagePromotion != null&& (Data.GoodsBase.GiftScore > 0|| Data.GoodsBase.ScoreDeductionPrice > 0|| Data.GoodsPagePromotion.isHave||Data.GoodsPagePromotion.FullReducePromotion != null|| Data.ErpGifts != null)"
        >FULL OFFER | 优惠满满</div>
        <div class="actCon">
          <div
            class="act-lingquan actLine"
            v-if="Data.GoodsPagePromotion != null&&Data.GoodsPagePromotion.Coupons != null && Data.GoodsPagePromotion.Coupons.length>0"
            v-on:click="_showCoupon()"
          >
            <span class="act-name">领券</span>
            <block v-for="item in Data.GoodsPagePromotion.Coupons" :key="item.index">
              <span class="coupon" v-if="index<3">满{{item.MeetAmount}}-{{item.DeductionAmount}}</span>
            </block>
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
          <div class="discountsFull" 
              v-if="(Data.GoodsBase.FirstBuyContent!=null&&Data.GoodsBase.FirstBuyContent>0)||(Data.GoodsPagePromotion.BuyReduceContent!=null&&Data.GoodsPagePromotion.BuyReduceContent!='')||(Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.Gift != null && Data.GoodsPagePromotion.Gift.length>0)||(Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.FullGift != null && Data.GoodsPagePromotion.FullGift.length>0)||(Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.FreeCollocation != null && Data.GoodsPagePromotion.FreeCollocation.length>0)||(Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.FullReducePromotion != null)||(Data.GoodsPagePromotion != null && Data.GoodsPagePromotion.ChangeBuy != null && Data.GoodsPagePromotion.ChangeBuy.length>0)||(Data.ErpGifts != null && Data.ErpGifts.length>0)"  
            >
              <span class="act-name">优惠</span>
              <div class="discountsFull-item">
                <div
                  class="act-dikou actLine"
                  v-if="Data.GoodsBase.FirstBuyContent!=null&&Data.GoodsBase.FirstBuyContent>0"
                >
                  <!-- <span class="act-name">优惠</span> -->
                  <span class="act-con">新人专享价:￥{{Data.GoodsBase.FirstBuyContent}}</span>
                </div>
                <div
                  class="act-dikou actLine"
                  v-if="Data.GoodsPagePromotion.BuyReduceContent!=null&&Data.GoodsPagePromotion.BuyReduceContent!=''"
                >
                  <!-- <span class="act-name">量贩</span> -->
                  <span class="act-con">{{Data.GoodsPagePromotion.BuyReduceContent}}</span>
                </div>
                <div
                  class="act-zengpin actLine"
                  v-if="Data.GoodsPagePromotion!= null && Data.GoodsPagePromotion.Gift != null && Data.GoodsPagePromotion.Gift.length>0"
                  @click=" _showActive('ZP')"
                >
                  <!-- <span class="act-name">赠品</span> -->
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
                    <!-- <span class="act-name">满赠</span> -->
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
                  <!-- <span class="act-name">换购</span> -->
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
                  <!-- <span class="act-name">满减</span> -->
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
                    <!-- <span class="act-name">满换</span> -->
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
                  <!-- <span class="act-name">配件</span> -->
                  <span class="act-con">{{Data.ErpGifts[0].GoodsName}}</span>
                  <span class="act-info">
                    <span class="icon">></span>
                  </span>
                </div>
              </div>
          </div>

        </div>
      </div>
      <!-- 海淘明细 -->
      <!-- <div class="promotionBox" v-if="Data.GoodsBase.ShopId==2">
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
            <div class="left-text">
              <span class="act-name">税费</span>
              <span class="act-con">进口税 商家承担</span>
            </div>
            <span class="act-info">
              税费说明
              <span class="icon">></span>
            </span>
          </div>
        </div>
      </div> -->
      <!-- 套餐组合 -->
      <block
        v-if="!Data.isComp&&Data.CompGoods!=null&&Data.CompGoods.CompCount!=null&&Data.CompGoods.CompCount>0"
      >
        <div class="promotionBox">
          <div class="actCon">
            <div class="blackLine">PACKAGE COMBINATION | 套餐组合</div>
            <div class="act-taocan actLine">
              <span class="act-name">套餐组合</span>
              <a
                class="act-info"
                :href="'/pages/product/combineList/main?goodsid='+Data.GoodsBase.GoodsId"
              >
                更多套餐
                <span class="icon">></span>
              </a>
            </div>
          </div>
          <div class="compBox">
            <block v-if="CompList">
              <div class="tczh-title">
                <div class="tczh-notelist">
                  <div class="tczh-note-1">
                    套餐1
                    <em>￥{{CompList.Price}}</em>
                    <i>立省￥{{CompList.ReduceMoney}}</i>
                  </div>
                </div>
                <div class="tczh-namelist">
                  <block v-for="item in Data.CompGoods.CompGoods" :key="item.index">
                    <div
                      :class="index==compIndex?'select':''"
                      v-if="index<3"
                      @click="selectComp(index)"
                    >套餐{{index+1}}</div>
                  </block>
                </div>
              </div>
              <div class="tczh-proListBox">
                <scroll-view scroll-x scroll-with-animation="true">
                  <div class="combproList">
                    <li
                      class="tczh-item"
                      v-for="(combitem,combindex) in CompList.Items"
                      :key="combindex"
                    >
                      <a :href="'/pages/product/index/main?seocode='+combitem.SeoCode">
                        <div class="img-box">
                          <img :src="combitem.Img" />
                        </div>
                        <span>{{combitem.GoodsName}}</span>
                        <em>￥{{combitem.Price}}</em>
                      </a>
                    </li>
                  </div>
                </scroll-view>
              </div>
            </block>
              <div class="tczh-note">
                套餐商品不参与单品活动，最高可省下￥
                <em>{{Data.CompGoods.MaxReduceMoney}}</em>
                &nbsp;共{{Data.CompGoods.CompCount}}款
              </div>
          </div>
        </div>
      </block>
      <!-- 功能参数 -->
      <!-- <block
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
      </block> -->
      <div class="promotionBox" v-if="Data.Attributes!=null && Data.Attributes.length> 0">
        <div class="blackLine" v-if="Data.GoodsBase.ShopId==1">FUNCTION PARAMETER | 功能参数</div>
        <div class="blackLine" v-if="Data.GoodsBase.ShopId==2">SEA SCOURING | 海淘明细</div>
        <div class="actCon" v-if="Data.GoodsBase.ShopId==2">
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
            <div class="left-text">
              <span class="act-name">税费</span>
              <span class="act-con">进口税 商家承担</span>
            </div>
            <span class="act-info">
              税费说明
              <span class="icon">></span>
            </span>
          </div>
        </div>
        <!-- 打包功能参数 -->
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
        <!-- 普通功能参数 -->
        <div class="actCon" v-else>
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
        <div class="xuanGou" v-if="Data.GoodsBase.IsSpecificationGoods">
          <span class="xuanGou-name">选购</span>
          <block v-if="isLogin">
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
          </block>
          <block v-else>
              <button
                open-type="getUserInfo"
                @getuserinfo="loginEvent"
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
              </button>
              <button
                open-type="getUserInfo"
                @getuserinfo="loginEvent"
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
              </button>
          </block>
          <div class="dshsBox" @click="_showDSHS()">
            <img src="/static/images/icon-pro-eye.png" />
            <div>度数换算</div>
          </div>
        </div>
      </div>
      <!-- 套餐详情 -->
      <div class="compDetail promotionBox" v-if="Data.Items != null && Data.Items.length > 0">
        <div class="blackLine">PACKAGE DETAILS | 套餐详细</div>
        <div class="compTitle">
          <div class="left">套餐组合</div>
          <div>
            含
            <span>{{Data.Items.length}}</span>件商品，剩余
            <span>{{selectCompNum}}</span>件商品需要选择属性
          </div>
        </div>
        <div class="compGoods" v-if="NowCompData==null">
          <block v-for="item in Data.Items" :key="item.index">
            <div class="compGoodBox">
              <a
                class="compGoodImg"
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
              >
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
                <div
                  class="compSelectBox"
                  v-if="item.IsSpecificationGoods"
                  @click="_selectCombineAttr(item.GoodsId,index)"
                >
                  <div>
                    <span
                      v-if="item.ShowText==null"
                      :data-text="item.ShowText"
                    >{{item.IsSeries?"请选择花色/度数":"请选择度数规格等参数"}}</span>
                    <span v-else>{{item.ShowText}}</span>
                  </div>
                  <div class="icon-bottom">﹀</div>
                </div>
                <div class="noAttr" v-else>x1</div>
              </div>
            </div>
          </block>
        </div>
        <div class="compGoods" v-else>
          <block v-for="item in NowCompData" :key="item.index">
            <div class="compGoodBox">
              <a
                class="compGoodImg"
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
              >
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
                <div
                  class="compSelectBox"
                  v-if="item.IsSpecificationGoods"
                  @click="_selectCombineAttr(item.GoodsId,index)"
                >
                  <div>
                    <span
                      v-if="item.ShowText==null"
                      :data-text="item.ShowText"
                    >{{item.IsSeries?"请选择花色/度数":"请选择度数规格等参数"}}</span>
                    <span v-else>{{item.ShowText}}</span>
                  </div>
                  <div class="icon-bottom">﹀</div>
                </div>
                <div class="noAttr" v-else>x1</div>
              </div>
            </div>
          </block>
        </div>
      </div>
      <!-- 评论 -->
      <div class="prolabelLine">
        <span><img src="/static/images/product_duihao.png">&nbsp;快递:{{Data.GoodsBase.ShopId == 2 ? (Data.GoodsBase.AmoyFreight + "元") : " 满80包邮"}}</span>
        <span v-if="Data.GoodsBase.ShopId == 2"><img src="/static/images/product_duihao.png">&nbsp;贴心客服</span>
        <span v-else><img src="/static/images/product_duihao.png">&nbsp;7天退换</span>
        <span><img src="/static/images/product_duihao.png">&nbsp;正品保障</span>
        <span><img src="/static/images/product_duihao.png">&nbsp;急速物流</span>
      </div>
      <div class="promotionBox" >
          <div class="blackLine">REVIEWS AND COMMUNITIES | 评论与社区</div>
          <div class="actCon remarkBox">
            <div class="act-remark actLine">
              <span class="act-name">瞳学评论({{Data.Remark==null?"0":Data.Remark.TotalCount}})</span>
              <a
                class="act-info"
                v-if="Data.Remark != null&&Data.Remark.TotalCount!=null&&Data.Remark.TotalCount>0"
                :href="'/pages/product/remark/main?goodsid='+Data.GoodsBase.GoodsId+'&label=全部'"
              >
                <span class="haoping">{{Data.Remark.PraiseRatio}}%好评</span> &nbsp;全部
                <span class="icon">></span>
              </a>
            </div>
          </div>
          <div class="remarkTag" v-if="Data.Remark != null && Data.Remark.TotalCount > 0">
            <ul>
              <li class="tag">
                <a :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&label=全部'">全部</a>
              </li>
              <li class="tag">
                <a
                  :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&label=有图'"
                >有图（{{Data.Remark.ImageCount}}）</a>
              </li>
              <block v-if="Data.Remark.LableTags != null && Data.Remark.LableTags.length>0">
                <li
                  :class="'tag '+(Data.Sentiment==0?'badlabel':'')"
                  v-for="item in  Data.Remark.LableTags"
                  :key="item.index"
                >
                  <a
                    :href="'../remark/main?goodsid='+Data.GoodsBase.GoodsId+'&label='+(item.CommentLabel)"
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
                    {{item.UserName==null?'':item.UserName}}
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
            <div class="actCon remarkBox" v-if="HotCommentList != null && HotCommentList.length > 0">
              <div class="act-remark actLine">
                <span class="act-name">社区笔记</span>
                <div class="communtiyBox">
                    <swiper  class="communtiy-swiper" :display-multiple-items="HotCommentList.length>1?1.2:1">
                      <block v-for="item in HotCommentList" :key="item.index">
                        <swiper-item class="communtiy-swiperItem"  >
                            <div class="com-content">
                                <div class="com-text">
                                    <div class="com-text-top">
                                      <!-- <image :src="item.UserInfo.HeadUrl"/> -->
                                      <img :src="item.UserInfo.HeadUrl?item.UserInfo.HeadUrl:'/static/images/default_img.gif'" alt="" class="heder-img">
                                      <div>
                                        <span class="com-name">{{item.UserInfo.UserName}}</span><br/>
                                        <span class="com-label">社区心得</span>
                                      </div>
                                    </div>
                                    <div class="com-bottom">
                                      {{item.Content}}
                                    </div>
                                </div>
                                <div class="com-img">
                                    <img :src="item.CoverImg" mode="widthFix" >
                                </div>
                            </div>
                        </swiper-item>
                      </block>
                    </swiper>
                </div>
              </div>
            </div>
      </div>
      <div class="promotionBox">
        <div class="brand-store" v-if="Data.BrandStore != null && Data.BrandStore.Name !=null&& Data.BrandStore.ImageUrl !=null">
            <div class="brand-tips">
                <img :src="Data.BrandStore.ImageUrl?Data.BrandStore.ImageUrl:'/static/images/default_img.gif'" alt="" class="brand-img">
                <div>
                  <div class="brand-name">{{Data.BrandStore.Name}}</div>
                  <div class="brand-follow" v-if="!IsFollow" @click="follow(Data.BrandStore.Id)">+关注</div>
                  <div class="brand-follow" v-else @click="cancelFollow(Data.BrandStore.Id)">已关注</div>
                </div>
            </div>
            <a
              :href="'/pages/search/results/main?shopId='+Data.GoodsBase.ShopId + '&keywords=' + Data.GoodsBase.BrandName"
              class="link"
            >
              <div class="brand-btn">
                  <div class="btn_all">全部商品</div>
                  <div class="btn_store">进店逛逛</div>
              </div>
            </a>
        </div >
        <!-- 同价位 同类别 同周期 -->
        <div v-if="Data.GoodsBase.ShopId==2">
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
                    <a :href="'/pages/product/index/main?seocode='+item.SeoCode">
                      <img :src="item.Img" mode="widthFix" />
                      <div class="goodsName">{{item.GoodsName}}</div>
                      <div class="goodsPrice">￥{{item.Price}}</div>
                    </a>
                  </swiper-item>
                </block>
              </swiper>
            </div>
          </div>
        </div>
        <!-- 品牌推荐 猜你喜欢 热销排行 -->
        <div v-else>
          <div class="guessLike">
            <div class="goodsTypeTag">
              <div
                :class="'tjw '+(QueryGoodsType2=='PPTJ'?'selected':'')"
                @click="_getSameTypeData2('PPTJ')"
                v-if="!isComp"
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
                    <a :href="'/pages/product/index/main?seocode='+item.SeoCode">
                      <img :src="item.GoodsImg" mode="widthFix" />
                      <div class="goodsName">{{item.GoodsName}}</div>
                      <div class="goodsPrice">￥{{item.Price}}</div>
                    </a>
                  </swiper-item>
                </block>
              </swiper>
            </div>
          </div>
        </div>
      </div>
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
          <wxParse :content="GoodsAbout.Discription" :imageProp='imageProp'/>
        </div>
      </div>
      <div class="overline">——— 我是有底线的 ———</div>
      <!-- 底部通栏 -->
      <div class="bottomNav">
        <div class="navBtn">
          <a @click="goindex">
            <img src="/static/images/icon-pro-index.png" alt />首页
          </a>
          <button open-type="contact" bindcontact="contactService">
            <img src="/static/images/icon-pro-sev.png" alt />客服
          </button>
          <a @click="gocart">
            <img src="/static/images/icon-pro-cart.png" alt />购物车
            <i class="cartNum">{{cartNum}}</i>
          </a>
        </div>
        <div class="proBtn">
          <block v-if="Data.GoodsBase.GoodsType==5&&isFromAttr">
            <a class="selectnow" @click="BackToFrom()">立即选择</a>
          </block>
          <block v-else-if="Data.GoodsBase.GoodsType==5">
            <a class="disabled">不支持单独购买</a>
          </block>
          <block v-else-if="!Data.GoodsBase.GoodsState">
            <a class="disabled">商品已下架</a>
          </block>
          <block v-else-if="!Data.GoodsBase.IsCanBuy">
            <a class="disabled">无法购买</a>
          </block>
          <block v-else>
            <!-- 区分登录 -->
            <block v-if="isLogin">
              <a class="addCart" @click="addCart()">加入购物车</a>
              <a class="buyNow" @click="buyNow()">立即购买</a>
            </block>
            <block v-else>
              <button
                class="addCart"
                open-type="getUserInfo"
                @getuserinfo="loginEvent"
                data-is-buy-now="true"
              >加入购物车</button>
              <button
                class="buyNow"
                open-type="getUserInfo"
                @getuserinfo="loginEvent"
                data-is-buy-now="false"
              >立即购买</button>
            </block>
          </block>
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
                      :class="'yhqbtn '+(item.HasPicked ? 'disabled' : '')"
                      :data-cid="item.PromotionID"
                      @click="_getCoupon(item.PromotionID,item.HasPicked)"
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
              <em class="promo-tag">满额减</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SellPrice}}</span>
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
                @click="_close()"
                :href="'/pages/search/pieceTogether/main?promotionId='+Data.GoodsPagePromotion.FullReducePromotion.PromotionID+'&title='+Data.GoodsPagePromotion.FullReducePromotion.PromotionTheme+'&shopid='+Data.GoodsBase.ShopId+'&tag=满减'"
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
              <em class="promo-tag">免费赠品</em>
            </div>
            <div class="mfzp-list">
              <scroll-view class="swiper-wrapper" scroll-x scroll-with-animation="true">
                <li
                  class="swiper-slide"
                  v-for="erpItem in Data.GoodsPagePromotion.Gift"
                  :key="erpItem.index"
                >
                  <a :href="'/'+erpItem.SeoCode">
                    <!-- <div class="imgbox"> -->
                      <img :src="erpItem.Img" />
                    <!-- </div> -->
                    <span>{{erpItem.GoodsName}}{{(erpItem.MaxTimes > 0 ? "（限赠" + erpItem.MaxTimes + "）" : "")}}</span>
                  </a>
                </li>
              </scroll-view>
            </div>
          </div>
          <div class="erpzp-type" v-if="Data.ErpGifts != null && Data.ErpGifts.length>0&&isShowPJ">
            <div>
              <em class="promo-tag">配件</em>
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
              <em class="promo-tag">满额赠品</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SellPrice}}</span>
            </div>
            <div class="mezp-list">
              <ul>
                <li v-for="item in Data.GoodsPagePromotion.FullGift" :key="item.index">
                  <div class="mezp-pro">
                    <div class="imgbox">
                      <img :src="item.Img" />
                      <a
                        @click="_close()"
                        :href="'/pages/search/pieceTogether/main?promotionId='+item.PromotionID+'&title='+item.PromotionTheme+'&shopid='+Data.GoodsBase.ShopId+'&tag=满减'"
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
        <div class="huanGouNote">以上价格计算仅为初步预估，不代表最终购买价格,换购默认1件,优惠商品请把当前主商品加车后，前往购物车享受优惠</div>
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
              <em class="promo-tag">加钱换购</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length"
              >该品售价￥{{Data.GoodsBase.SellPrice}}</span>
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
                        <a :href="'/pages/product/index/main?seocode='+item.SeoCode">
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
              <em class="promo-tag">满额换购</em>
              <span
                v-if="Data.GoodsPagePromotion.LadderPrice == null || !Data.GoodsPagePromotion.LadderPrice.length>0"
              >该品售价￥{{Data.GoodsBase.SellPrice}}</span>
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
                      @click="_close()"
                      :href="'/pages/search/pieceTogether/main?promotionId='+item.PromotionID+'&title='+item.PromotionTheme+'&shopid='+Data.GoodsBase.ShopId+'&tag=满减'"
                    >
                      点击凑单
                      <em>&gt;</em>
                    </a>
                    <a :href="'/pages/product/index/main?seocode='+item.SeoCode">
                      商品详情
                      <em>&gt;</em>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="huanGouNote">以上价格计算仅为初步预估，不代表最终购买价格,换购默认1件,优惠商品请把当前主商品加车后，前往购物车享受优惠</div>
      </div>
      <div class="KnowBtn" @click="_close()">知道了</div>
    </bottomFlip>
    <!-- 打包商品属性显示 -->
    <bottomFlip :isShow.sync="isShowCombine">
      <div class="js_maingoods" v-if="combineData!=null">
        <div class="showMsg">
          <div class="goods_img">
            <img :src="combineData.ImageUrl" />
          </div>
          <div class="goods_name">
            <span
              class="spec-name"
              :data-marketp="combineData.MarketPrice"
            >{{combineData.GoodsName}}</span>
          </div>
          <div class="close_mc" id="close_mc">×</div>
        </div>
        <div class="over_cont">
          <!-- 款式 -->
          <template v-if="combineData.SeriesItems != null && combineData.SeriesItems.length > 0">
            <div class="choice_color" :data-gid="combineData.GoodsId">
              <span class="choice_title">
                颜色：
                <span>
                  <block v-for="info in combineData.SeriesItems" :key="info.index">
                    <span v-if="info.GoodsId == combineData.GoodsId">{{info.AnotherName}}</span>
                  </block>
                </span>
              </span>
            </div>
            <div class="goodsstylelist">
              <div id="js_mainsytle" class="goodscolor">
                <scroll-view scroll-x scroll-with-animation="true" scroll-into-view="select_img">
                  <block v-for="info in combineData.SeriesItems" :key="info.index">
                    <li
                      :class="(info.GoodsId == combineData.GoodsId? 'select' :'')"
                      @click="_selectCombineAttr(info.GoodsId)"
                      :id="info.GoodsId == combineData.GoodsId? 'select_img' :'_img'"
                    >
                      <img :src="info.SeriesImg" />
                    </li>
                  </block>
                </scroll-view>
              </div>
            </div>
          </template>
          <!-- 光度 -->
          <block v-if="combineData.GoodsFields != null && combineData.GoodsFields.length > 0">
            <div
              class="div_single js_gdContent"
              v-for="listinfo in combineData.GoodsFields"
              :key="listinfo.index"
            >
              <div :data-field="listinfo.FieldId">
                <span class="choice_title">
                  {{index == 0 ? "光度 SPH" : ""}}
                  {{index == 1 ? "散光 CYL" : ""}}
                  {{index == 2 ? "轴位 AXIS" : ""}}
                </span>
              </div>
              <ul class="js_gd">
                <li
                  :data-fieldid="item.Id"
                  v-for="(item,index_) in listinfo.Children"
                  :key="index_"
                  @click="_selectGD(item.Id,item.Value)"
                  :class="item.Id==combineGDId?'select':''"
                  :data-Seid="combineGDId"
                >{{item.Value}}</li>
              </ul>
            </div>
          </block>
        </div>
      </div>
      <div class="KnowBtn" @click="selectAttr()">确定</div>
    </bottomFlip>
  </div>
</template>

<script>
import api from "@/api/goods";
import userapi from "@/api/user";
import cartapi from "@/api/cart";
import { mapActions, mapState } from "vuex";
import bottomFlip from "@/components/bottomFlip";
import wxParse from "mpvue-wxparse";
import authorization from "@/utils/authorization";

export default {
  data() {
    return {
      GoodsAbout: "",
      HotCommentList:[],
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
      combineIndex: 0,
      combineData: null,
      isShowCombine: false,
      combineGDId: "",
      selectCompData: [], //选中的打包具体属性数组
      selectCompNum: 0, //剩余多少打包未选择属性
      isLogin: false,
      isFromAttr: false, //属性页过来的镜片
      CompList: [],
      compIndex: 0,
      groupSelectPosition: -1,
      glassSelectPosiition: -1,
      cartNum: 0,
      MinPrice: 0,//当前可以享受到的最低价格
      NowCompData:null,
      imageProp:{mode:'widthFix'},//详情关于 配置
      IsFollow:false,
    };
  },
  computed: {},
  onLoad(options) {
    this.glassSelectPosiition =
      options.glassSelectPosiition != undefined
        ? options.glassSelectPosiition
        : -1;
    this.groupSelectPosition =
      options.groupSelectPosition != undefined
        ? options.groupSelectPosition
        : -1;
    this.isFromAttr =
      options.isFromAttr != undefined ? options.isFromAttr : false;
    this.isComp = options.isComp;
    this.getisComp(options.seocode);
    this._getCartNum();
  },
  components: {
    bottomFlip,
    wxParse
  },
  methods: {
    ...mapActions("remark", ["setData"]),
    getisComp(seocode) {
      api
        .IsCompGoods(seocode)
        .then(({ Data }) => {
          this.isComp = Data;
          this._getPageData(seocode);
        })
        .catch(error => {
          this.isComp = false;
          this._getPageData(seocode);
        });
    },
    _getCartNum() {
      cartapi.getCartCount().then(({ Data }) => {
        this.cartNum = Data;
      });
    },
    _getPageData(seocode) {
      //判断是否登录
      userapi.checkToken().then(({ State }) => {
        this.isLogin = State;
      });
      api.getGoodsDetail(seocode, this.isComp).then(({ Data }) => {
        Data.GoodsBase.SellPrice = Data.GoodsBase.SellPrice.toFixed(2);
        Data.GoodsBase.RolePrice = Data.GoodsBase.RolePrice.toFixed(2);
        Data.GoodsBase.SvipPrice = Data.GoodsBase.SvipPrice.toFixed(2);
        Data.GoodsBase.MarketPrice = Data.GoodsBase.MarketPrice.toFixed(2);
        Data.GoodsBase.ReducePrice = Data.GoodsBase.ReducePrice.toFixed(2);
        Data.GoodsBase.ScoreDeductionPrice = Data.GoodsBase.ScoreDeductionPrice.toFixed(
          2
        );
        if (
          Data.GoodsBase.SellPrice > Data.GoodsBase.RolePrice &&
          Data.GoodsBase.RolePrice != 0
        ) {
          if (
            Data.GoodsBase.RolePrice > Data.GoodsBase.SvipPrice &&
            Data.GoodsBase.SvipPrice != 0 &&
            Data.UserInfo.IsSvip
          ) {
            this.MinPrice = Data.GoodsBase.SvipPrice;
          } else {
            this.MinPrice = Data.GoodsBase.RolePrice;
          }
        } else {
          if (
            Data.GoodsBase.SellPrice > Data.GoodsBase.SvipPrice &&
            Data.GoodsBase.SvipPrice != 0 &&
            Data.UserInfo.IsSvip
          ) {
            this.MinPrice = Data.GoodsBase.SvipPrice;
          } else {
            this.MinPrice = Data.GoodsBase.SellPrice;
          }
        }
        if (Data.GoodsPagePromotion.FreeCollocation != null) {
          Data.GoodsPagePromotion.FreeCollocation = Data.GoodsPagePromotion.FreeCollocation.map(
            function(value, index) {
              value.Price = value.Price.toFixed(2);
              return value;
            }
          );
        }
        if (Data.CompGoods != null && Data.CompGoods.CompGoods != null) {
          this.CompList = Data.CompGoods.CompGoods[0];
        }
        if (Data.Items != null) {
          var that = this;
          Data.Items = Data.Items.map(function(value, index) {
            if (value.IsSpecificationGoods) {
              that.selectCompNum++;
            }
            var obj = {};
            that.selectCompData.push(obj);
            value.Price = value.Price.toFixed(2);
            value.MarketPrice = value.MarketPrice.toFixed(2);
            value.ShowText=null;
            return value;
          });
        }

        if (Data.Remark.Remarks != null) {
          Data.Remark.Remarks = Data.Remark.Remarks.map(function(value, index) {
            value.PubTime = value.PubTime.replace("T", " ");
            return value;
          });
        }

        if (Data.GoodsPagePromotion.Coupons != null) {
          Data.GoodsPagePromotion.Coupons = Data.GoodsPagePromotion.Coupons.map(
            function(value, index) {
              value.UseStartTime = value.UseStartTime.replace("T", " ").slice(
                0,
                19
              );
              value.UseEndTime = value.UseEndTime.replace("T", " ").slice(
                0,
                19
              );
              return value;
            }
          );
        }

        this.setData(Data.Remark);
        this.IsFollow = Data.BrandStore!=null&&Data.BrandStore.IsFollow;
        this.Data = Data;
        this._getGoodsAbout();
        this._getHotCommentList(Data.GoodsBase.GoodsId)
        if (this.Data.GoodsBase.ShopId == 2) {
          this._getSameTypeData("price");
        } else {
          this.isComp
            ? this._getSameTypeData2("CNXH")
            : this._getSameTypeData2("PPTJ");
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
    _getHotCommentList(GoodsId){
        api.getHotCommentList(GoodsId,10).then(({ Data }) => {
          console.log(Data)
          wx.setStorageSync('HotCommentList', Data)
          this.HotCommentList = Data;
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
        this.Data.GoodsBase.SellPrice +
        "&SalePrice=" +
        this.MinPrice +
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
        "&goodsId=" +
        this.Data.GoodsBase.GoodsId +
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
        this.Data.GoodsBase.SellPrice +
        "&SalePrice=" +
        this.MinPrice +
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
        "&goodsId=" +
        this.Data.GoodsBase.GoodsId +
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
      this.isShowMZ = false;
      this.isShowMJ = false;
      this.isShowPJ = false;
      this.isShowZP = false;
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
      this.isShowMH = false;
      this.isShowHG = false;
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
    _getCoupon(id, bool) {
      if (bool == true) {
        return false;
      }
      api.presentCouponNo(id).then(({ State }) => {
        if (State) {
          wx.showToast({
            title: "领券成功",
            icon: "none"
          });
          //改变领券数据
          this.Data.GoodsPagePromotion.Coupons.map(function(value, index) {
            if (value.PromotionID == id) {
              value.HasPicked = true;
            }
          });
        } else {
          wx.showToast({
            title: "领券失败，请稍后再试",
            icon: "none"
          });
        }
      });
    },
    //度数换算跳转
    _showDSHS() {
      wx.navigateTo({
        url:
          "/pages/htmlPreview/main?path=" +
          encodeURIComponent("/TemplateForNewApp/degreeConversion")
      });
    },
    //用户协议跳转
    _userAgreement() {
      wx.navigateTo({
        url:
          "/pages/htmlPreview/main?path=" +
          encodeURIComponent("/TemplateForNewApp/userAgreement")
      });
    },
    //打包获取属性（切换系列获取属性）
    _selectCombineAttr(id, index) {
      if (!this.isLogin) {
        wx.showToast({
            title: "请先登录",
            icon: "none"
          });
        wx.switchTab({
          url: "/pages/home/main"
        });
        return false;
      };
      this.combineIndex = index != undefined ? index : this.combineIndex;
      var that = this;
      api.getCombineAttr(id).then(({ Data }) => {
        Data.SalePrice = Data.SalePrice.toFixed(2);
        Data.MarketPrice = Data.MarketPrice.toFixed(2);
        that.combineData = Object.assign({}, Data);
        that.isShowCombine = true;
        that.combineGDId = "";
        //遍历打包数据获取当前打包系列颜色
        var selectCompData = that.selectCompData[that.combineIndex];
        if (that.combineData.SeriesItems.length > 0) {
          this.combineData.SeriesItems.map(function(value, index) {
            if (value.GoodsId == id) {
              selectCompData.AnotherName = value.AnotherName + " / ";
              selectCompData.GoodsId = value.GoodsId;
            }
          });
        } else {
          selectCompData.AnotherName = "";
          selectCompData.GoodsId = this.combineData.GoodsId;
        }
      });
    },
    //打包选属性
    _selectGD(Id, Value) {
      this.combineGDId = Id;
      this.selectCompData[this.combineIndex].Id = Id;
      this.selectCompData[this.combineIndex].Value = Value;
    },
    //打包确认按钮
    selectAttr() {
      if (this.combineGDId == "") {
        wx.showToast({
          title: "请先选择一个光度",
          icon: "none"
        });
      } else {
        this.isShowCombine = false;
        //获取选中的信息数据
        this.selectCompData[
          this.combineIndex
        ].GoodsName = this.combineData.GoodsName;
        this.selectCompData[
          this.combineIndex
        ].ImageUrl = this.combineData.ImageUrl;
        this.selectCompData[
          this.combineIndex
        ].SellPrice = this.combineData.SellPrice;
        this.selectCompData[
          this.combineIndex
        ].MarketPrice = this.combineData.MarketPrice;
        //更改打包的数组
        var someData=Object.assign({}, this.Data);
        this.Data=null;
        someData.Items[this.combineIndex].Id = this.selectCompData[
          this.combineIndex
        ].Id;
        someData.Items[this.combineIndex].GoodsName = this.selectCompData[
          this.combineIndex
        ].GoodsName;
        someData.Items[this.combineIndex].Img = this.selectCompData[
          this.combineIndex
        ].ImageUrl;
        someData.Items[this.combineIndex].SellPrice = this.selectCompData[
          this.combineIndex
        ].SellPrice;
        someData.Items[this.combineIndex].MarketPrice = this.selectCompData[
          this.combineIndex
        ].MarketPrice;
        someData.Items[this.combineIndex].ShowText =
          this.selectCompData[this.combineIndex].AnotherName +
          this.selectCompData[this.combineIndex].Value;
        this.Data=someData;
        this.NowCompData=someData.Items;
        //改变未选择的套餐数量
        var num = 0;
        var allnum = 0;
        this.selectCompData.map(function(value, index) {
          if (JSON.stringify(value) != "{}") {
            num++;
          }
        });
        this.Data.Items.map(function(value, index) {
          if (value.IsSpecificationGoods) {
            allnum++;
          }
        });
        this.selectCompNum = allnum - num;
      }
    },
    addCart(IsConfirmedBuy) {
      // 判断是否是无属性商品

      var that = this;
      if (!this.Data.GoodsBase.IsSpecificationGoods && !this.isComp) {
        //无属性商品且非打包
        var GoodsId = this.Data.GoodsBase.GoodsId;
        var IsBuyByScore = false;
        var IsConfirmedBuy = IsConfirmedBuy ? IsConfirmedBuy : false;
        var Quantity = 1;
        var RealGoodsId = this.Data.GoodsBase.GoodsId;
        var MaxSellNumber = this.Data.GoodsBase.MaxSellNumber;
        var GoodsName = this.Data.GoodsBase.GoodsName;
        var SeriesId = "00000000-0000-0000-0000-000000000000";
        var SellPrice = this.Data.GoodsBase.SellPrice;
        var MaxDeduction = this.Data.GoodsBase.MaxSellNumber;
        var ShopId = this.Data.GoodsBase.ShopId;
        var IsFreeCarriage = this.Data.GoodsBase.IsFreeCarriage;
        api
          .buyNoProperty(
            GoodsId,
            IsBuyByScore,
            IsConfirmedBuy,
            Quantity,
            RealGoodsId,
            MaxSellNumber,
            GoodsName,
            SeriesId,
            SellPrice,
            MaxDeduction,
            ShopId,
            IsFreeCarriage
          )
          .then(({ State }) => {
            if (State) {
              wx.showToast({
                title: "加入购物车成功~",
                icon: "none"
              });
              this._getCartNum();
            }
          })
          .catch(error => {
            wx.showModal({
              title: "提示",
              content: error,
              success(res) {
                if (res.confirm) {
                  that.addCart(true);
                } else if (res.cancel) {
                  return false;
                }
              }
            });
          });
      } else if (this.isComp) {
        //打包商品
        //判断打包商品是否全部选择了属性
        if (this.selectCompNum == 0) {
          //拼接打包提交链接
          var GoodsId = this.Data.GoodsBase.GoodsId;
          var Quantity = 1;
          var IsConfirmedBuy = true; //是否愿意缺货等待，第一次进来为false，后续弹框确认，打包默认true
          var ShopId = this.Data.GoodsBase.ShopId;
          var IsFreeCarriage = this.Data.GoodsBase.IsFreeCarriage;
          var GDPropertyItems = [];
          var NoPropertyItems = [];
          //遍历选中的打包光度属性selectCompData并赋值给GDPropertyItems;
          //无属性商品数量赋值NoPropertyItems
          this.Data.Items.map(function(value, index) {
            if (value.IsSpecificationGoods) {
              var obj = {};
              var objItem = {};
              obj.SpecificationItems = [];
              obj.GoodsId = value.GoodsId;
              objItem.GD = value.Id;
              objItem.Quantity = 1;
              obj.SpecificationItems.push(objItem);
              var isadd = false;
              var isSameGd = false;
              //遍历有属性商品判断goodsid是否相等，相等则判断其光度ID是否一样，再相等则数量增加，否则增加商品
              if (GDPropertyItems.length > 0) {
                GDPropertyItems.map(function(value_1, index_1) {
                  if (value_1.GoodsId == value.GoodsId) {
                    //遍历属性值,判断其光度ID
                    value_1.SpecificationItems.map(function(value_2, index_2) {
                      if (value_2.GD == value.Id) {
                        value_2.Quantity++;
                        isSameGd = true;
                      }
                    });
                    if (!isSameGd) {
                      value_1.SpecificationItems.push(objItem);
                    }
                    isadd = true;
                  }
                });
                if (!isadd) {
                  GDPropertyItems.push(obj);
                }
              } else {
                GDPropertyItems.push(obj);
              }
            } else {
              var obj = {};
              obj.GoodsId = value.GoodsId;
              obj.Quantity = 1;
              var isadd = false;
              //遍历无属性商品判断goodsid是否相等，相等则增加数量，否则增加商品
              if (NoPropertyItems.length > 0) {
                NoPropertyItems.map(function(value_, index_) {
                  if (value_.GoodsId == value.GoodsId) {
                    value_.Quantity++;
                    isadd = true;
                  }
                });
                if (!isadd) {
                  NoPropertyItems.push(obj);
                }
              } else {
                NoPropertyItems.push(obj);
              }
            }
          });

          GDPropertyItems = JSON.stringify(GDPropertyItems);
          NoPropertyItems = JSON.stringify(NoPropertyItems);
          api
            .buyCompGoods(
              GoodsId,
              Quantity,
              IsConfirmedBuy,
              ShopId,
              IsFreeCarriage,
              GDPropertyItems,
              NoPropertyItems
            )
            .then(({ State }) => {
              if (State) {
                wx.showToast({
                  title: "加入购物车成功~",
                  icon: "none"
                });
                this._getCartNum();
              }
            });
        } else {
          wx.showToast({
            title: "请选择完全部属性再提交哦~",
            icon: "none"
          });
        }
      } else {
        var href =
          this.Data.GoodsBase.GoodsType == 4
            ? this.frameAttrHref + "&IsBuyNow=false"
            : this.normalAttrHref + "&IsBuyNow=false";
        wx.navigateTo({
          url: href
        });
      }
    },
    buyNow(IsConfirmedBuy) {
      var that = this;
      // 判断是否是无属性商品
      if (!this.Data.GoodsBase.IsSpecificationGoods && !this.isComp) {
        //无属性商品且非打包
        var GoodsId = this.Data.GoodsBase.GoodsId;
        var IsBuyByScore = false;
        var IsConfirmedBuy = IsConfirmedBuy ? IsConfirmedBuy : false;
        var Quantity = 1;
        var RealGoodsId = this.Data.GoodsBase.GoodsId;
        var MaxSellNumber = this.Data.GoodsBase.MaxSellNumber;
        var GoodsName = this.Data.GoodsBase.GoodsName;
        var SeriesId = "00000000-0000-0000-0000-000000000000";
        var SellPrice = this.Data.GoodsBase.SellPrice;
        var MaxDeduction = this.Data.GoodsBase.MaxSellNumber;
        var ShopId = this.Data.GoodsBase.ShopId;
        var IsFreeCarriage = this.Data.GoodsBase.IsFreeCarriage;
        api
          .buyNoProperty(
            GoodsId,
            IsBuyByScore,
            IsConfirmedBuy,
            Quantity,
            RealGoodsId,
            MaxSellNumber,
            GoodsName,
            SeriesId,
            SellPrice,
            MaxDeduction,
            ShopId,
            IsFreeCarriage
          )
          .then(({ State }) => {
            if (State) {
              wx.showToast({
                title: "加入购物车成功~",
                icon: "none"
              });
              setTimeout(function() {
                wx.switchTab({
                  url: "/pages/cart/main"
                });
              }, 1000);
            }
          })
          .catch(error => {
            wx.showModal({
              title: "提示",
              content: error,
              success(res) {
                if (res.confirm) {
                  that.buyNow(true);
                } else if (res.cancel) {
                  return false;
                }
              }
            });
          });
      } else if (this.isComp) {
        //打包商品
        //判断打包商品是否全部选择了属性
        if (this.selectCompNum == 0) {
          //拼接打包提交链接
          var GoodsId = this.Data.GoodsBase.GoodsId;
          var Quantity = 1;
          var IsConfirmedBuy = true; //是否愿意缺货等待，第一次进来为false，后续弹框确认,打包默认true
          var ShopId = this.Data.GoodsBase.ShopId;
          var IsFreeCarriage = this.Data.GoodsBase.IsFreeCarriage;
          var GDPropertyItems = [];
          var NoPropertyItems = [];
          //遍历选中的打包光度属性selectCompData并赋值给GDPropertyItems;
          //无属性商品数量赋值NoPropertyItems
          this.Data.Items.map(function(value, index) {
            if (value.IsSpecificationGoods) {
              var obj = {};
              var objItem = {};
              obj.SpecificationItems = [];
              obj.GoodsId = value.GoodsId;
              objItem.GD = value.Id;
              objItem.Quantity = 1;
              obj.SpecificationItems.push(objItem);
              var isadd = false;
              var isSameGd = false;
              //遍历有属性商品判断goodsid是否相等，相等则判断其光度ID是否一样，再相等则数量增加，否则增加商品
              if (GDPropertyItems.length > 0) {
                GDPropertyItems.map(function(value_1, index_1) {
                  if (value_1.GoodsId == value.GoodsId) {
                    //遍历属性值,判断其光度ID
                    value_1.SpecificationItems.map(function(value_2, index_2) {
                      if (value_2.GD == value.Id) {
                        value_2.Quantity++;
                        isSameGd = true;
                      }
                    });
                    if (!isSameGd) {
                      value_1.SpecificationItems.push(objItem);
                    }
                    isadd = true;
                  }
                });
                if (!isadd) {
                  GDPropertyItems.push(obj);
                }
              } else {
                GDPropertyItems.push(obj);
              }
            } else {
              var obj = {};
              obj.GoodsId = value.GoodsId;
              obj.Quantity = 1;
              var isadd = false;
              //遍历无属性商品判断goodsid是否相等，相等则增加数量，否则增加商品
              if (NoPropertyItems.length > 0) {
                NoPropertyItems.map(function(value_, index_) {
                  if (value_.GoodsId == value.GoodsId) {
                    value_.Quantity++;
                    isadd = true;
                  }
                });
                if (!isadd) {
                  NoPropertyItems.push(obj);
                }
              } else {
                NoPropertyItems.push(obj);
              }
            }
          });

          GDPropertyItems = JSON.stringify(GDPropertyItems);
          NoPropertyItems = JSON.stringify(NoPropertyItems);
          api
            .buyCompGoods(
              GoodsId,
              Quantity,
              IsConfirmedBuy,
              ShopId,
              IsFreeCarriage,
              GDPropertyItems,
              NoPropertyItems
            )
            .then(({ State }) => {
              if (State) {
                wx.showToast({
                  title: "加入购物车成功~",
                  icon: "none"
                });
                setTimeout(function() {
                  wx.switchTab({
                    url: "/pages/cart/main"
                  });
                }, 1000);
              }
            });
        } else {
          wx.showToast({
            title: "请选择完全部属性再提交哦~",
            icon: "none"
          });
        }
      } else {
        var href =
          this.Data.GoodsBase.GoodsType == 4
            ? this.frameAttrHref + "&IsBuyNow=false"
            : this.normalAttrHref + "&IsBuyNow=false";
        wx.navigateTo({
          url: href
        });
      }
    },
    gocart() {
      wx.switchTab({
        url: "/pages/cart/main"
      });
    },
    goindex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    selectComp(compIndex) {
      this.CompList = this.Data.CompGoods.CompGoods[compIndex];
      this.compIndex = compIndex;
    },
    BackToFrom() {
      var href =
        this.frameAttrHref +
        "&IsBuyNow=false&groupSelectPosition=" +
        this.groupSelectPosition +
        "&glassSelectPosiition=" +
        this.glassSelectPosiition;
      // wx.navigateTo({
      //   url: href
      // });
      wx.navigateBack({
        delta: 2
      });
    },
    loginEvent(e) {
      const isBuyNow = e.currentTarget.dataset.isBuyNow;
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
        this.isLogin = true;
        if (isBuyNow) {
          this.buyNow();
        } else {
          this.addCart();
        }
      });
    },
    //取消关注店铺
    cancelFollow(id){
      api.CancelFollow(id).then((Data ) => {
        if(Data.State){
            this.IsFollow=false
          }
          
        });
    },
    //关注店铺
    follow(id){
        api.Follow(id).then(( Data ) => {
          if(Data.State){
            this.IsFollow=true
          }
          
        });
    }
  },
        /**
   * 用户点击右上角分享
   */
    onShareAppMessage() {
      return {
        title: '¥' +
          this.Data.GoodsBase.SellPrice +
          ' ' +
          this.Data.GoodsBase.GoodsName,
        imageUrl: this.Data.GoodsBase.MainImageUrl || ''
      };
    },
};
</script>

<style lang="less">
@import "./main.less";
</style>
