<template>
  <article class="container">
    <article class="tab-box">
      <ul class="list">
        <li
          :class="{item: true, current: shopId == 1}"
          @click="changeShopEvent(1)"
        >境内自营({{domesticShop}})</li>
        <!-- <li
          :class="{item: true, current: shopId == 2}"
          @click="changeShopEvent(2)"
        >海淘({{overseasShop}})</li> -->
      </ul>
      <span v-if="isHasCartData" class="edit-btn" @click="editCartEvent">{{isEdit ? '完成':'编辑'}}</span>
    </article>
    <!-- 购物车为空 -->
    <article v-if="!isHasCartData" class="no-data-box">
      <section class="tips-box">
        <img src="/static/images/icon_cart.png" class="icon" />
        <div class="tips">
          <b class="title">温馨提示：</b>
          <p>
            购物车空空
            <br />去选几件中意的商品吧~
          </p>
        </div>
      </section>
      <a href="/pages/index/main" open-type="switchTab" class="kd-btn btn-default">去逛逛吧></a>
      <section class="may-like-box" v-if="likeGoodsList.length > 0">
        <p class="title">猜你喜欢</p>
        <scroll-view class="may-like-list" scroll-x="true" enable-flex="true" @scroll="scroll">
          <view class="ml-item" v-for="item in likeGoodsList" :key="item.GoodsId">
            <a :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'">
              <img :src="item.Img" class="p-img" />
              <p class="p-name">{{item.GoodsName}}</p>
              <b class="price">¥{{item.Price}}</b>
            </a>
          </view>
        </scroll-view>
      </section>
    </article>
    <!-- 购物车不为空 -->
    <article v-else :class="{'cart_box': isIphone}">
      <p class="reduction-tips" v-if="model.PriceReminder">
        <img src="/static/images/icon_cart_bell.png" class="icon-bell" />
        <span class="text">{{model.PriceReminder}}</span>
        <span class="close-btn">
          <img src="/static/images/icon_cart_tips_close.png" class="icon-close" />
        </span>
      </p>
      <p class="announcement-tips" v-if="model.TopHint">
        <img src="/static/images/icon_cart_horn.png" class="icon-horn" />
        <span class="text">{{model.TopHint}}</span>
      </p>
      <p class="shop-info">
        <span class="shop-name">
          <img src="/static/images/icon_shop.png" v-if="shopId == 1" class="icon-shop" />
          <img src="/static/images/icon_earth.png" v-if="shopId == 2" class="icon-shop" />
          <em>{{shopId == 1 ? '可得境内自营':'品质进口海淘'}}</em>
        </span>
        <span class="rules">
          <img
            src="/static/images/icon_question.png"
            class="icon-question"
            @click="showTariffEvent"
          />
          <em>{{shopId == 1 ? '满80包邮':'已包税'}}</em>
          <em class="space">|</em>
          <em class="coupon-btn" @click="showCouponListEvent">优惠券</em>
        </span>
      </p>
      <div class="box-good">
        <template v-for="(cartItem, idx) in model.Carts">
          <!-- 打包商品项 -->
            <template v-if="cartItem.Packages!= null && cartItem.Packages.length > 0">
                <div
                  v-for="(packItem, pidx) in cartItem.Packages"
                  :key="packItem.UniqueId+pidx"
                >
                    <i-swipeout i-class="i-swipeout-demo-item" :actions="actions" @change="(e)=>{handleDelete(e,packItem.UniqueId)}" :toggle="toggle" :unclosable="unclosable">
                        <view slot="content">
                          <div class="cart-list-box pack-box">
                            <p class="tips">
                              <span class="check-btn" v-if="packItem.IsDisplayDelete">
                                <img
                                  v-if="packItem.IsSelected"
                                  src="/static/images/icon_checked.png"
                                  class="icon"
                                  @click="unSelectGoodsEvent(packItem.UniqueId)"
                                />
                                <img
                                  v-else
                                  src="/static/images/icon_no_checked.png"
                                  class="icon"
                                  @click="selectGoodsEvent(packItem.UniqueId)"
                                />
                              </span>
                              <span class="tag">套餐</span>
                              <span class="title" v-if="packItem.IsDisplayChangeQuantity">
                                <em
                                  class="cut"
                                  @click="modifyQuantityEvent(packItem.UniqueId, '', packItem.Quantity, 0)"
                                >-</em>
                                <input class="input" :value="packItem.Quantity" disabled />
                                <em
                                  class="add"
                                  @click="modifyQuantityEvent(packItem.UniqueId, '', packItem.Quantity, 1)"
                                >+</em>
                              </span>
                              <span class="promotion">
                                <em class="tag" v-if="packItem.LimitQuantity > 0">限购{{packItem.LimitQuantity}}件</em>
                                <em
                                  class="tag"
                                  v-if="packItem.ReductionPrice > 0"
                                >比加入时降了{{packItem.ReductionPrice}}元</em>
                              </span>
                              <span class="link">
                                <em>¥</em>
                                <span>{{packItem.PackagePrice}}</span>
                              </span>
                            </p>
                            <ul
                              class="goods-list"
                              v-if="packItem.PackageItems != null && packItem.PackageItems.length > 0"
                            >
                              <li
                                class="g-item"
                                v-for="(goodItem, gidx) in packItem.PackageItems"
                                :key="goodItem.GoodsId+gidx"
                              >
                                <div class="goods-box">
                                  <div class="g-info">
                                    <a :href="'/pages/product/index/main?seocode='+goodItem.SeoCode+'&isComp=true'">
                                      <img class="g-img" :src="goodItem.ImageUrl" />
                                    </a>
                                    <div class="info">
                                      <a
                                        :href="'/pages/product/index/main?seocode='+goodItem.SeoCode+'&isComp=true'"
                                        class="g-name"
                                      >
                                        <span class="oversea-tag" v-if="shopId == 2">海淘</span>
                                        {{goodItem.GoodsName}}
                                      </a>
                                      <template v-if="goodItem.Specifications">
                                        <p class="g-attr" v-for="spItem in goodItem.Specifications" :key="spItem">
                                          <span class="attr-text">{{spItem}}</span>
                                        </p>
                                      </template>
                                      <p v-else class="g-attr">
                                        <span class="attr-text"></span>
                                        <span class="num">×{{goodItem.TotalQuantity}}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </view>
                    </i-swipeout>
                </div>
            </template>
          <!-- 满类型促销的商品 -->
          <template v-if="cartItem.MeetPromotions != null && cartItem.MeetPromotions.length > 0">
            <div
              v-for="(mpItem, midx) in cartItem.MeetPromotions"
              :key="mpItem.PromotionId+midx"
            >
                  <div class="cart-list-box">
                    <p class="tips">
                      <span class="tag">{{mpItem.MeetPromotionType == 2 ? '满赠':'满减'}}</span>
                      <span class="title">{{mpItem.MeetPriceHint}}</span>
                      <a
                        :href="'/pages/search/pieceTogether/main?shopId='+shopId+'&promotionId='+mpItem.PromotionId+'&title=满减'"
                        class="link"
                      >{{mpItem.IsMeet ? '再逛逛':'去凑单'}}></a>
                    </p>
                    <!-- 商品列表 -->
                    <ul class="goods-list">
                      <li class="g-item" v-for="(gItem, gidx) in mpItem.BuyGoodsList" :key="gItem.UniqueId+gidx">
                          <i-swipeout i-class="i-swipeout-demo-item" :actions="actions" @change="(e)=>{handleDelete(e,gItem.UniqueId)}" :key='idx' :toggle="toggle" :unclosable="unclosable">
                            <view slot="content">
                                <div class="goods-box">
                                  <span class="check-btn" v-if="gItem.IsDisplayDelete">
                                    <img
                                      v-if="gItem.IsSelected"
                                      src="/static/images/icon_checked.png"
                                      class="icon"
                                      @click="unSelectGoodsEvent(gItem.UniqueId)"
                                    />
                                    <img
                                      v-else
                                      src="/static/images/icon_no_checked.png"
                                      class="icon"
                                      @click="selectGoodsEvent(gItem.UniqueId)"
                                    />
                                  </span>
                                  <div class="g-info">
                                    <a :href="'/pages/product/index/main?seocode='+gItem.SeoCode+'&isComp=false'">
                                      <img class="g-img" :src="gItem.ImageUrl" />
                                    </a>
                                    <div class="info">
                                      <a
                                        :href="'/pages/product/index/main?seocode='+gItem.SeoCode+'&isComp=false'"
                                        class="g-name"
                                      >
                                        <span class="oversea-tag" v-if="shopId == 2">海淘</span>
                                        {{gItem.GoodsName}}
                                      </a>
                                      <!-- 有属性商品光度和数量 -->
                                      <template
                                        v-if="gItem.SpecificationItems != null && gItem.SpecificationItems.length > 0"
                                      >
                                        <p class="g-attr" v-if="gItem.BuyType == 3">
                                          <span
                                            class="attr-text"
                                          >{{gItem.Attributes == null ? '' : gItem.Attributes}}</span>
                                          <span class="modify">
                                            <i
                                              class="cut"
                                              @click="modifyQuantityEvent(gItem.UniqueId, '', gItem.Quantity, 0)"
                                            >-</i>
                                            <input class="input" :value="gItem.Quantity" disabled />
                                            <i
                                              class="add"
                                              @click="modifyQuantityEvent(gItem.UniqueId, '', gItem.Quantity, 1)"
                                            >+</i>
                                          </span>
                                        </p>
                                        <p
                                          class="g-attr"
                                          v-for="spItem in gItem.SpecificationItems"
                                          :key="spItem.RealGoodsId"
                                        >
                                          <span
                                            :class="{attr: true, line: gItem.BuyType == 3}"
                                            v-if="gItem.BuyType != 3"
                                            @click="editCartItemEvent(gItem.UniqueId, '', spItem.RealGoodsId, spItem.Quantity)"
                                          >
                                            <em
                                              class="text"
                                            >{{spItem.Specification}} {{spItem.AnotherName == null ? '' : spItem.AnotherName}}</em>
                                            <img class="icon" src="/static/images/icon_attr_down.png" />
                                          </span>
                                          <span v-else :class="{attr: true, line: gItem.BuyType == 3}">
                                            <em
                                              class="text"
                                            >{{spItem.Specification}} {{spItem.AnotherName == null ? '' : spItem.AnotherName}}</em>
                                            <em>×{{spItem.Quantity}}</em>
                                          </span>
                                          <span
                                            class="modify"
                                            v-if="gItem.IsDisplayChangeQuantity && gItem.BuyType != 3"
                                          >
                                            <i
                                              class="cut"
                                              @click="modifyQuantityEvent(gItem.UniqueId, spItem.RealGoodsId, spItem.Quantity, 0)"
                                            >-</i>
                                            <input class="input" :value="spItem.Quantity" disabled />
                                            <i
                                              class="add"
                                              @click="modifyQuantityEvent(gItem.UniqueId, spItem.RealGoodsId, spItem.Quantity, 1)"
                                            >+</i>
                                          </span>
                                        </p>
                                      </template>
                                      <!-- 无属性商品 -->
                                      <template v-else>
                                        <p
                                          class="g-attr"
                                          v-if="gItem.IsDisplayChangeQuantity && gItem.BuyType != 3"
                                        >
                                          <span class="attr-text">{{gItem.Attributes == null ? '':gItem.Attributes}}</span>
                                          <span class="modify">
                                            <i
                                              class="cut"
                                              @click="modifyQuantityEvent(gItem.UniqueId, '', gItem.Quantity, 0)"
                                            >-</i>
                                            <input class="input" :value="gItem.Quantity" disabled />
                                            <i
                                              class="add"
                                              @click="modifyQuantityEvent(gItem.UniqueId, '', gItem.Quantity, 1)"
                                            >+</i>
                                          </span>
                                        </p>
                                      </template>
                                      <div class="g-price">
                                        <div class="price">
                                          <em class="unit">¥</em>
                                          <b>{{gItem.Price}}</b>
                                          <div :class="{tag: true, vip: gItem.PriceLable == '会员价'}">
                                            <img
                                              v-if="gItem.PriceLable == '会员价'"
                                              :src="'/static/images/level_0'+ model.RoleId + '.jpg'"
                                            />
                                            <span class="span-label" v-if="gItem.PriceLable == '会员价'||gItem.PriceLable == '促销价'">{{gItem.PriceLable}}</span>
                                            <span class="span-label"
                                              v-if="shopId==1&&model.IsSvip&&gItem.Price==gItem.SvipPrice&&gItem.NomalPrice>gItem.SvipPrice"
                                              >SVIP价 已优惠{{gItem.hasSaveSvipPrice}}元</span>
                                          </div>
                                        </div>
                                        <div class="promotion">
                                          <span v-if="gItem.IsNewMemberPromotion" class="tag">新人专享价</span>
                                          <span
                                            v-if="gItem.LimitQuantity > 0 && !gItem.IsNewMemberPromotion"
                                            class="tag"
                                          >限购{{gItem.LimitQuantity}}件</span>
                                          <span
                                            v-if="gItem.ReductionPrice > 0"
                                            class="tag"
                                          >比加入时降了{{gItem.ReductionPrice}}元</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!-- 买送 -->
                                <template v-if="gItem.FreeGifts != null && gItem.FreeGifts.length > 0">
                                  <p
                                    class="repurchase-box"
                                    v-for="(fItem, fidx) in gItem.FreeGifts"
                                    :key="fItem.UniqueId+fidx"
                                  >
                                    <span class="tag">买送</span>
                                    <template v-if="gItem.FreeGifts.length > 1">
                                      <span class="title">该品买就送{{fItem.GoodsName}}等{{gItem.FreeGifts.length}}种商品</span>
                                      <a class="link" @click="editCartItemEvent(fItem.UniqueId, '', '', 0)">去看看></a>
                                    </template>
                                    <template v-else-if="fItem.IsSpecificationGoods">
                                      <span class="title">该品买就送{{fItem.GoodsName}}</span>
                                      <template
                                        v-if="fItem.Specifications != null && fItem.Specifications.length > 0"
                                      >
                                        <span v-for="spItem in fItem.Specifications" :key="spItem">{{spItem}}</span>
                                      </template>
                                      <span class="num">×{{fItem.TotalQuantity}}</span>
                                      <a class="link">选属性></a>
                                    </template>
                                    <template v-else>
                                      <span class="title">该品买就送{{fItem.GoodsName}}</span>
                                      <span class="num">×{{fItem.TotalQuantity}}</span>
                                      <a class="link" @click="editCartItemEvent(fItem.UniqueId, '', '', 0)">去看看></a>
                                    </template>
                                  </p>
                                </template>

                                <!-- 换购 -->
                                <template
                                  v-if="gItem.FreedomCollocations != null && gItem.FreedomCollocations.length > 0"
                                >
                                  <p
                                    class="repurchase-box"
                                    v-for="fItem in gItem.FreedomCollocations"
                                    :key="fItem.UniqueId"
                                  >
                                    <span class="tag">换购</span>
                                    <span class="title">
                                      已
                                      <b>+{{fItem.SumPrice}}</b>
                                      元，换购{{fItem.GoodsName}}
                                    </span>
                                    <span class="num">×{{fItem.SumQuantity}}</span>
                                    <a
                                      :href="'/pages/cart/addBuy/main?shopId='+shopId+'&uniqueId='+gItem.UniqueId"
                                      class="link"
                                    >去切换></a>
                                  </p>
                                </template>
                                <p class="repurchase-tips" v-else-if="gItem.IsFillFreedomCollocation">
                                  <span class="tag">加钱换购</span>
                                  <span class="title">该商品参与加钱换购</span>
                                  <a
                                    :href="'/pages/cart/addBuy/main?shopId='+shopId+'&uniqueId='+gItem.UniqueId"
                                    class="link"
                                  >去换购></a>
                                </p>
                            </view>
                          </i-swipeout>
                      </li>
                    </ul>
                  </div>

            </div>
          </template>

          <!-- 普通商品 -->
          <template v-if="cartItem.NormalGoods != null && cartItem.NormalGoods.length > 0">
            <div class="cart-list-box" :key='idx'>
              <ul class="goods-list">
                <li
                  class="g-item"
                  v-for="(nItem, nidx) in cartItem.NormalGoods"
                  :key="nItem.UniqueId+nidx"
                >
                    <i-swipeout i-class="i-swipeout-demo-item" :actions="actions" @change="(e)=>{handleDelete(e,nItem.UniqueId)}" :toggle="toggle" :unclosable="unclosable">
                      <view slot="content">
                        <div class="goods-box">
                          <span class="check-btn" v-if="nItem.IsDisplayDelete">
                            <img
                              v-if="nItem.IsSelected"
                              src="/static/images/icon_checked.png"
                              class="icon"
                              @click="unSelectGoodsEvent(nItem.UniqueId)"
                            />
                            <img
                              v-else
                              src="/static/images/icon_no_checked.png"
                              class="icon"
                              @click="selectGoodsEvent(nItem.UniqueId)"
                            />
                          </span>
                          <div class="g-info">
                            <a :href="'/pages/product/index/main?seocode='+nItem.SeoCode+'&isComp=false'">
                              <img class="g-img" :src="nItem.ImageUrl" />
                            </a>
                            <div class="info">
                              <a
                                :href="'/pages/product/index/main?seocode='+nItem.SeoCode+'&isComp=false'"
                                class="g-name"
                              >
                                <span class="oversea-tag" v-if="shopId == 2">海淘</span>
                                {{nItem.GoodsName}}
                              </a>
                              <!-- 有属性商品光度和数量 -->
                              <template
                                v-if="nItem.SpecificationItems != null && nItem.SpecificationItems.length > 0"
                              >
                                <p class="g-attr" v-if="nItem.BuyType == 3">
                                  <span
                                    class="attr-text"
                                  >{{nItem.Attributes == null ? '' : nItem.Attributes}}</span>
                                  <span class="modify">
                                    <i
                                      class="cut"
                                      @click="modifyQuantityEvent(nItem.UniqueId, '', nItem.Quantity, 0)"
                                    >-</i>
                                    <input class="input" :value="nItem.Quantity" disabled />
                                    <i
                                      class="add"
                                      @click="modifyQuantityEvent(nItem.UniqueId, '', nItem.Quantity, 1)"
                                    >+</i>
                                  </span>
                                </p>
                                <p
                                  class="g-attr"
                                  v-for="spItem in nItem.SpecificationItems"
                                  :key="spItem.RealGoodsId"
                                >
                                  <span
                                    :class="{attr: true, line: nItem.BuyType == 3}"
                                    @click="editCartItemEvent(nItem.UniqueId, nItem.GoodsId, spItem.RealGoodsId, spItem.Quantity)"
                                  >
                                    <em
                                      class="text"
                                    >{{spItem.Specification}} {{spItem.AnotherName == null ? '' : spItem.AnotherName}}</em>
                                    <img
                                      class="icon"
                                      v-if="nItem.BuyType != 3"
                                      src="/static/images/icon_attr_down.png"
                                    />
                                    <em v-else>×{{spItem.Quantity}}</em>
                                  </span>
                                  <span
                                    class="modify"
                                    v-if="nItem.IsDisplayChangeQuantity && nItem.BuyType != 3"
                                  >
                                    <i
                                      class="cut"
                                      @click="modifyQuantityEvent(nItem.UniqueId, spItem.RealGoodsId, spItem.Quantity, 0)"
                                    >-</i>
                                    <input class="input" :value="spItem.Quantity" disabled />
                                    <i
                                      class="add"
                                      @click="modifyQuantityEvent(nItem.UniqueId, spItem.RealGoodsId, spItem.Quantity, 1)"
                                    >+</i>
                                  </span>
                                </p>
                              </template>
                              <!-- 无属性商品 -->
                              <template v-else>
                                <p
                                  class="g-attr"
                                  v-if="nItem.IsDisplayChangeQuantity && nItem.BuyType != 3"
                                >
                                  <span class="attr-text">{{nItem.Attributes == null ? '':nItem.Attributes}}</span>
                                  <span class="modify">
                                    <i
                                      class="cut"
                                      @click="modifyQuantityEvent(nItem.UniqueId, '', nItem.Quantity, 0)"
                                    >-</i>
                                    <input class="input" :value="nItem.Quantity" disabled />
                                    <i
                                      class="add"
                                      @click="modifyQuantityEvent(nItem.UniqueId, '', nItem.Quantity, 1)"
                                    >+</i>
                                  </span>
                                </p>
                              </template>
                              <div class="g-price">
                                <div class="price">
                                  <template v-if="nItem.IsScore">
                                    <b>{{nItem.BuyScore}}积分</b>
                                  </template>
                                  <template v-else>
                                    <em class="unit">¥</em>
                                    <b>{{nItem.Price}}</b>
                                    <div :class="{tag: true, vip: nItem.PriceLable == '会员价'}">
                                      <img
                                        v-if="nItem.PriceLable == '会员价'"
                                        :src="'/static/images/level_0'+ model.RoleId + '.jpg'"
                                      />
                                      <span class="span-label" v-if="nItem.PriceLable == '会员价'||nItem.PriceLable == '促销价'">{{nItem.PriceLable}}</span>
                                      <span class="span-label"
                                      v-if="shopId==1&&model.IsSvip&&nItem.Price==nItem.SvipPrice&&nItem.NomalPrice>nItem.SvipPrice"
                                      >SVIP价 已优惠{{nItem.hasSaveSvipPrice}}元</span>
                                    </div>
                                  </template>
                                </div>
                                <div class="promotion">
                                  <span v-if="nItem.IsNewMemberPromotion" class="tag">新人专享价</span>
                                  <span
                                    v-if="nItem.LimitQuantity > 0 && !nItem.IsNewMemberPromotion"
                                    class="tag"
                                  >限购{{nItem.LimitQuantity}}件</span>
                                  <span
                                    v-if="nItem.ReductionPrice > 0"
                                    class="tag"
                                  >比加入时降了{{nItem.ReductionPrice}}元</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- 买送 -->
                        <template v-if="nItem.FreeGifts != null && nItem.FreeGifts.length > 0">
                          <p
                            class="repurchase-box"
                            v-for="(fItem, fidx) in nItem.FreeGifts"
                            :key="fItem.UniqueId+fidx"
                          >
                            <span class="tag">买送</span>
                            <template v-if="nItem.FreeGifts.length > 1">
                              <span class="title">该品买就送{{fItem.GoodsName}}等{{nItem.FreeGifts.length}}种商品</span>
                              <a class="link" @click="editCartItemEvent(fItem.UniqueId, '', '', 0)">去看看></a>
                            </template>
                            <template v-else-if="fItem.IsSpecificationGoods">
                              <span class="title">该品买就送{{fItem.GoodsName}}</span>
                              <template
                                v-if="fItem.Specifications != null && fItem.Specifications.length > 0"
                              >
                                <span v-for="spItem in fItem.Specifications" :key="spItem">{{spItem}}</span>
                              </template>
                              <span class="num">×{{fItem.TotalQuantity}}</span>
                              <a class="link">选属性></a>
                            </template>
                            <template v-else>
                              <span class="title">该品买就送{{fItem.GoodsName}}</span>
                              <span class="num">×{{fItem.TotalQuantity}}</span>
                              <a class="link" @click="editCartItemEvent(fItem.UniqueId, '', '', 0)">去看看></a>
                            </template>
                          </p>
                        </template>
                        <!-- 换购 -->
                        <template
                          v-if="nItem.FreedomCollocations != null && nItem.FreedomCollocations.length > 0"
                        >
                          <p
                            class="repurchase-box"
                            v-for="fItem in nItem.FreedomCollocations"
                            :key="fItem.UniqueId"
                          >
                            <span class="tag">换购</span>
                            <span class="title">
                              已
                              <b>+{{fItem.SumPrice}}</b>
                              元，换购{{fItem.GoodsName}}
                            </span>
                            <span class="num">×{{fItem.SumQuantity}}</span>
                            <a
                              :href="'/pages/cart/addBuy/main?shopId='+shopId+'&uniqueId='+nItem.UniqueId"
                              class="link"
                            >去切换></a>
                          </p>
                        </template>
                        <p class="repurchase-tips" v-else-if="nItem.IsFillFreedomCollocation">
                          <span class="tag">加钱换购</span>
                          <span class="title">该商品参与加钱换购</span>
                          <a
                            :href="'/pages/cart/addBuy/main?shopId='+shopId+'&uniqueId='+nItem.UniqueId"
                            class="link"
                          >去换购></a>
                        </p>
                        </view>
                    </i-swipeout>
                </li>
              </ul>
            </div>

          </template>

          <!-- 满赠换专区 -->
          <template
            v-if="cartItem.AllExchangeAndGifts != null && cartItem.AllExchangeAndGifts.length > 0 && !isEdit"
          >
                <div class="cart-list-box promotion-box" :key='idx'>
                  <p class="tips">
                    <span class="title">满赠换专区</span>
                    <a class="link">可多选</a>
                  </p>
                  <ul class="goods-list">
                    <li
                      class="g-item"
                      v-for="(eItem, eidx) in cartItem.AllExchangeAndGifts"
                      :key="eItem.GoodsId+eidx"
                    >
                        <i-swipeout i-class="i-swipeout-demo-item" :actions="actions" @change="(e)=>{handleDelete(e,eItem.UniqueId)}" :toggle="toggle" :unclosable="unclosable">
                          <view slot="content">
                                  <div class="goods-box">
                                    <span class="check-btn">
                                      <img
                                        v-if="eItem.IsSelected"
                                        src="/static/images/icon_checked.png"
                                        class="icon"
                                        @click="unSelectGoodsEvent(eItem.UniqueId)"
                                      />
                                      <img
                                        v-else-if="!eItem.IsSelected && eItem.IsSpecificationGoods && eItem.SpecificationItems == null"
                                        src="/static/images/icon_no_checked.png"
                                        class="icon"
                                        @click="editCartItemEvent(eItem.UniqueId, '', '', 1)"
                                      />
                                      <img
                                        v-else-if="!eItem.IsSelected && !eItem.IsSpecificationGoods && eItem.TotalQuantity == 0"
                                        src="/static/images/icon_no_checked.png"
                                        class="icon"
                                        @click="editCartItemEvent(eItem.UniqueId, '', '', 1)"
                                      />
                                      <img
                                        v-else
                                        src="/static/images/icon_no_checked.png"
                                        class="icon"
                                        @click="selectGoodsEvent(eItem.UniqueId)"
                                      />
                                    </span>
                                    <div class="g-info">
                                      <a
                                        :href="'/pages/product/index/main?seocode='+eItem.SeoCode+'&isComp=false'"
                                        class="g-name"
                                      >{{eItem.PromotionTheme}}</a>
                                      <div class="info-box">
                                        <img :src="eItem.ImageUrl" class="g-img" />
                                        <div class="info">
                                          <!-- 有属性商品 -->
                                          <template
                                            v-if="eItem.SpecificationItems != null && eItem.SpecificationItems.length > 0"
                                          >
                                            <p
                                              class="g-attr"
                                              v-for="spItem in eItem.SpecificationItems"
                                              :key="spItem.RealGoodsId"
                                            >
                                              <span
                                                class="attr"
                                                @click="editCartItemEvent(eItem.UniqueId, '', spItem.RealGoodsId, spItem.Quantity)"
                                              >
                                                <em
                                                  class="text"
                                                >{{spItem.Specification}} {{spItem.AnotherName == null ? '' : spItem.AnotherName}}</em>
                                                <img class="icon" src="/static/images/icon_attr_down.png" />
                                              </span>
                                              <span class="modify">
                                                <i
                                                  class="cut"
                                                  @click="editCartItemEvent(eItem.UniqueId, '', spItem.RealGoodsId, spItem.Quantity)"
                                                >-</i>
                                                <input class="input" :value="spItem.Quantity" disabled />
                                                <i
                                                  class="add"
                                                  @click="editCartItemEvent(eItem.UniqueId, '', spItem.RealGoodsId, spItem.Quantity)"
                                                >+</i>
                                              </span>
                                            </p>
                                          </template>
                                          <p v-else class="g-attr">
                                            <span
                                              class="attr-text"
                                            >{{eItem.Attributes == null ? '' : eItem.Attributes}}</span>
                                            <span class="modify">
                                              <i
                                                class="cut"
                                                @click="editCartItemEvent(eItem.UniqueId, '', '00000000-0000-0000-0000-000000000000', eItem.TotalQuantity)"
                                              >-</i>
                                              <input class="input" :value="eItem.TotalQuantity" disabled />
                                              <i
                                                class="add"
                                                @click="editCartItemEvent(eItem.UniqueId, '', '00000000-0000-0000-0000-000000000000', eItem.TotalQuantity)"
                                              >+</i>
                                            </span>
                                          </p>
                                          <div class="g-price">
                                            <div class="price">
                                              <em class="unit">¥</em>
                                              <b>{{eItem.Price}}</b>
                                              <em class="unit">x1</em>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                          </view>
                        </i-swipeout>
                    </li>
                  </ul>
                </div>

          </template>

        </template>
      </div>
    </article>
    <!-- 底部结算 -->
    <article class="bottom-box" v-if="isHasCartData">
      <div class="left">
        <img
          v-if="selectedCartItem.length == canSelectedCartItem.length"
          src="/static/images/icon_checked.png"
          class="icon"
          @click="selectOrNotByIdsEvent(0)"
        />
        <img
          v-else
          class="icon"
          src="/static/images/icon_no_checked.png"
          @click="selectOrNotByIdsEvent(1)"
        />
        <span class="check-all">全选</span>
        <span class="amount">
          应付：¥{{model.Carts[0].RealTotalPrice}}
          <em
            class="small"
            v-if="model.Carts[0].TotalGoodsPrice > 0"
          >(不含运费)</em>
        </span>
      </div>
      <div class="right">
        <template v-if="isEdit">
          <div class="btn" @click="moveInFavoritesEvent">移入收藏</div>
          <div class="btn" @click="delGoodsEvent">删除</div>
        </template>
        <button
          v-else
          class="kd-btn btn-big"
          @click="toOrderEvent"
        >结算（{{model.Carts[0].GoodsQuantity}}）</button>
      </div>
    </article>
    <coupon :is-show.sync="isShowCouponList" :shop-id="shopId" />
    <attrs
      :is-show.sync="isShowAttr"
      :shop-id="shopId"
      :unique-id="editCartItemInfo.uniqueId"
      :goods-id="editCartItemInfo.goodsId"
      :real-goods-id="editCartItemInfo.realGoodsId"
      @done="changeAttrDone"
      :quantity="editCartItemInfo.quantity"
    />
    <tariff :is-show.sync="isShowTariff" :shop-id="shopId" />
  </article>
</template>

<script>
import api from "@/api/cart";
import { mapState } from "vuex";
import coupon from "./components/coupon";
import attrs from "./components/attrs";
import tariff from "./components/tariff";
import utils from "@/utils"; 
const TDSDK = require('../../../static/tdsdk/tdweapp'); 

export default {
  data() {
    return {
      isIphone:false,
      shopId: 1,
      model: null,
      domesticShop: 0,
      overseasShop: 0,
      isHasCartData: false, //购物车数据是否为空
      likeGoodsList: [], //猜你喜欢商品列表
      isShowCouponList: false, //是否显示可使用礼券的弹窗
      canSelectedCartItem: [], //可以进行选中操作的商品（排除满赠换类商品）
      selectedCartItem: [],
      // selectedItemCount: 0,
      isShowAttr: false, //是否显示选择属性弹窗
      isShowTariff: false,
      isEdit: false, //是否正在编辑购物车
      editCartItemInfo: {
        uniqueId: "",
        goodsId: "",
        realGoodsId: "",
        quantity: 1
      }, //正在编辑的商品信息
      actions:[
          {
                name: '移入收藏夹',
                color: '#fff',
                width : 70,
                background:"#cab894"
            },
            {
                name: '删除',
                color: '#fff',
                width : 40,
                background:"#000"
            }
             
        ],
        toggle:true,
        unclosable:false
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  components: {
    coupon,
    attrs,
    tariff
  },
  onLoad(){
    TDSDK.Event.event({id: '购物车'})

    //kede行为统计
    this.$onInformationCollection({
      token:"WeChat",
      uid:wx.getStorageSync('USERID'),
      opentype:"view",
      time:Date.now().toString(),
      page:utils.getCurrentPageUrl(),
      eventname:"购物车页",
      eventval:""
    })
  },
  onShow() {
    let that = this;
    //如果已经登录，则获取购物车信息
    wx.getSystemInfo({
      success (res) {
        console.log(res)
        if(res.brand.indexOf("iPhone")!=-1){
            that.isIphone=true
          }
        }
    })
    if (this.token) {
      this._getPageData();
      this._getCartItemsCount();
    } else {
      this._getLikeGoods();
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this._getPageData();
    this._getCartItemsCount();
  },
  methods: {
    changeShopEvent(shopId) {
      this.shopId = shopId;
      this._getPageData();
    },
    showCouponListEvent() {
      this.isShowCouponList = true;
    },
    showTariffEvent() {
      this.isShowTariff = true;
    },
    //获取猜你喜欢的商品
    _getLikeGoods() {
      api.getGoodsLike(this.shopId).then(({ Data }) => {
        this.likeGoodsList = [...Data];
      });
    },
    //获取购物车内商品数量
    _getCartItemsCount() {
      api.getCartGoodsQuantity().then(({ Data }) => {
        this.domesticShop = Data.DomesticShop;
        this.overseasShop = Data.OverseasShop;
      });
      this.$getCartCount();
    },
    //选中单个商品
    selectGoodsEvent(uniqueId) {
      api.selectGoods(uniqueId, this.shopId).then(res => {
        this._getPageData();
      });
    },
    //取消选择单个商品
    unSelectGoodsEvent(uniqueId) {
      api.unSelectGoods(uniqueId, this.shopId).then(res => {
        this._getPageData();
      });
    },

    //选中所有商品：type:0取消选中   1选中所有
    async selectOrNotByIdsEvent(type) {
      // console.log(ids)
      let result = await (type == 0
        ? api.unSelectGoodsByIds(this.canSelectedCartItem)
        : api.selectGoodsByIds(this.canSelectedCartItem));
      this._getPageData();
    },

    //在购物车编辑商品属性
    editCartItemEvent(uniqueId, goodsId, realGoodsId, quantity) {
      this.editCartItemInfo = { uniqueId, goodsId, realGoodsId, quantity };
      this.isShowAttr = true;
    },

    changeAttrDone() {
      this.isShowAttr = false;
      this._getPageData();
    },

    //修改商品数量：type: 0减少数量  1增加数量
    modifyQuantityEvent(uniqueId, realGoodsId, quantity, type) {
      let newQuantity = quantity;
      if (type == 0) {
        newQuantity--;
      } else {
        newQuantity++;
      }
      this._modifyQuantity(uniqueId, realGoodsId, newQuantity);
    },
    _modifyQuantity(uniqueId, realGoodsId, quantity) {
      let _request = () => {
        api
          .modifyQuantity({
            shopId: this.shopId,
            uniqueId,
            realGoodsId,
            quantity
          })
          .then(() => {
            this._getPageData();
            this._getCartItemsCount();
          });
      };
      //当减完之后商品数量等于0时，提示用户即将删除此商品
      if (quantity == 0) {
        wx.showModal({
          title: "提示",
          content: "将删除该规格的商品，是否继续？",
          confirmColor: "#cab894",
          success({ confirm }) {
            if (confirm) {
              _request();
            }
          }
        });
      } else {
        _request();
      }
    },

    toOrderEvent() {
      if (this.model.Carts[0].GoodsQuantity <= 0) {
        wx.showToast({
          title: "请先选择要结算的商品",
          icon: "none"
        });
      } else {
        wx.navigateTo({
          url:
            "/pages/order/index/main?shopId=" +
            this.shopId +
            "&RoleId=" +
            this.model.RoleId
        });
      }
    },

    //编辑购物车
    editCartEvent() {
      this.isEdit = !this.isEdit;
    },

    //移入收藏夹
    moveInFavoritesEvent() {
      api.collectionCartGoods(this.selectedCartItem).then(() => {
        this._getPageData();
        this._getCartItemsCount();
      });
    },

    //删除选中商品
    delGoodsEvent() {
      api.deleteCartGoods(this.selectedCartItem).then(() => {
        this._getPageData();
        this._getCartItemsCount();
      });
    },

    //获取购物车数据
    _getPageData() {
      // this.selectedItemCount = 0;
      this.selectedCartItem = [];
      this.canSelectedCartItem = [];
      let that = this;
      api.getCartDetail(this.shopId).then(({ Data }) => {
        if (Data == null) {
          this.model = null;
          this.isHasCartData = false;
          this._getLikeGoods();
        } else {
          let newData = Object.assign({}, Data);
          if (newData.Carts.length > 0) {
            let ids = [];
            let tempSelectedCartItem = []
            newData.Carts.forEach(ele => {
              //处理打包商品
              if (ele.Packages.length > 0) {
                ele.Packages.forEach(item => {
                  ids.push(item.UniqueId);
                  if (item.IsSelected) {
                    tempSelectedCartItem.push(item.UniqueId);
                    // this.selectedItemCount++;
                  }
                });
              }
              //处理普通商品中的换购商品数据
              if (ele.NormalGoods.length > 0) {
                ele.NormalGoods.forEach(nItem => {
                  ids.push(nItem.UniqueId);
                  if (nItem.IsSelected) {
                    // this.selectedItemCount++;
                    tempSelectedCartItem.push(nItem.UniqueId);
                  }
                  if (nItem.FreedomCollocations.length > 0) {
                    nItem.FreedomCollocations.forEach(fItem => {
                      fItem.SumQuantity = 0;
                      if (fItem.IsSpecificationGoods) {
                        //计算有属性换购商品的价格和数量
                        fItem.SpecificationItems.forEach(spItem => {
                          fItem.SumQuantity += spItem.Quantity;
                        });
                        fItem.SumPrice = fItem.SumQuantity * fItem.Price;
                      } else {
                        //计算无属性换购商品的价格和数量
                        fItem.SumQuantity = fItem.Quantity;
                        fItem.SumPrice = fItem.SumQuantity * fItem.Price;
                      }
                    });
                  }
                  if(that.shopId==1&&newData.IsSvip&&nItem.Price==nItem.SvipPrice&&nItem.NomalPrice>nItem.SvipPrice){
                    nItem.hasSaveSvipPrice = (nItem.NomalPrice-nItem.SvipPrice).toFixed(2)
                  }
                });
              }
              //处理满类型商品中的换购商品数据
              if (ele.MeetPromotions.length > 0) {
                ele.MeetPromotions.forEach(nItem => {
                  if (nItem.BuyGoodsList.length > 0) {
                    nItem.BuyGoodsList.forEach(fItem => {
                      ids.push(fItem.UniqueId);
                      if (fItem.IsSelected) {
                        // this.selectedItemCount++;
                        tempSelectedCartItem.push(fItem.UniqueId);
                      }
                      if (fItem.FreedomCollocations.length > 0) {
                        fItem.FreedomCollocations.forEach(fdItem => {
                          fdItem.SumQuantity = 0;
                          if (fdItem.IsSpecificationGoods) {
                            //计算有属性换购商品的价格和数量
                            fdItem.SpecificationItems.forEach(spItem => {
                              fdItem.SumQuantity += spItem.Quantity;
                            });
                            fdItem.SumPrice = fdItem.SumQuantity * fdItem.Price;
                          } else {
                            //计算无属性换购商品的价格和数量
                            fdItem.SumQuantity = fdItem.Quantity;
                            fdItem.SumPrice = fdItem.SumQuantity * fdItem.Price;
                          }
                        });
                      }
                      if(that.shopId==1&&newData.IsSvip&&fItem.Price==fItem.SvipPrice&&fItem.NomalPrice>fItem.SvipPrice){
                        fItem.hasSaveSvipPrice = (fItem.NomalPrice-fItem.SvipPrice).toFixed(2)
                      }
                    });
                  }
                });
              }
            });
            this.canSelectedCartItem = ids.concat([]);
            this.selectedCartItem = tempSelectedCartItem.concat([])
          }
          this.model = newData;
          this.isHasCartData =
            newData["Carts"] != null || newData["InvalidGoods"] != null;
        }
      });
    },

    //左滑删除
    handleDelete (e,uniqueId) {
      let detail = e.mp.detail
      let that = this
      that.selectGoodsEvent(uniqueId) 
      wx.showModal({
        title: '提示',
        content: detail.index==1?"确定删除该商品吗？":'确定移入收藏夹吗？',
        confirmColor: '#5BB53C',
        success: function(res) {
          if (res.confirm) {
            if(detail.index==1){
                api.deleteCartGoods([uniqueId]).then(() => {
                  that._getPageData();
                  that._getCartItemsCount();
                });
            }else{
              api.collectionCartGoods([uniqueId]).then(() => {
                that._getPageData();
                that._getCartItemsCount();
              });
            }
          
          }
          if (res.cancel) {
            that.unSelectGoodsEvent(uniqueId);
          }
        }
      })
    },
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>