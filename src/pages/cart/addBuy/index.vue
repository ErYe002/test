<template>
  <article class="wrap">
    <div class="cart-list-box" v-if="model != null">
      <ul class="goods-list">
        <li class="g-item" v-for="(item, nidx) in model" :key="nidx">
          <div class="goods-box">
            <span class="check-btn">
              <img
                v-if="item.IsNeedReSelect"
                src="/static/images/icon_checked.png"
                class="icon"
                @click="cancelSelectedEvent(item.UniqueId)"
              />
              <img
                v-else
                src="/static/images/icon_no_checked.png"
                class="icon"
                @click="editCartItemEvent(item.UniqueId, item.GoodsId, '00000000-0000-0000-0000-000000000000', 0)"
              />
            </span>
            <div class="g-info">
              <img class="g-img" :src="item.ImageUrl" />
              <div class="info">
                <p class="g-name">{{item.GoodsName}}</p>
                <!-- 有属性商品光度和数量 -->
                <template
                  v-if="item.SpecificationItems != null && item.SpecificationItems.length > 0"
                >
                  <p
                    class="g-attr"
                    v-for="spItem in item.SpecificationItems"
                    :key="spItem.RealGoodsId"
                  >
                    <span
                      :class="{attr: true}"
                      @click="editCartItemEvent(item.UniqueId, item.GoodsId, spItem.RealGoodsId, spItem.Quantity)"
                    >
                      <em
                        class="text"
                      >{{spItem.Specification}} {{spItem.AnotherName == null ? '' : spItem.AnotherName}}</em>
                      <img
                        class="icon"
                        v-if="item.BuyType != 3"
                        src="/static/images/icon_attr_down.png"
                      />
                      <em v-else>×{{spItem.Quantity}}</em>
                    </span>
                    <span class="modify">
                      <i
                        class="cut"
                        @click="editCartItemEvent(item.UniqueId, item.GoodsId, spItem.RealGoodsId, spItem.Quantity)"
                      >-</i>
                      <input class="input" :value="spItem.Quantity" disabled />
                      <i
                        class="add"
                        @click="editCartItemEvent(item.UniqueId, item.GoodsId, spItem.RealGoodsId, spItem.Quantity)"
                      >+</i>
                    </span>
                  </p>
                </template>
                <!-- 无属性商品 -->
                <template v-else>
                  <p class="g-attr">
                    <span class="attr-text">{{item.Attributes == null ? '':item.Attributes}}</span>
                    <span class="modify">
                      <i
                        class="cut"
                        @click="editCartItemEvent(item.UniqueId, item.GoodsId, '00000000-0000-0000-0000-000000000000', item.Quantity)"
                      >-</i>
                      <input class="input" :value="item.Quantity" disabled />
                      <i
                        class="add"
                        @click="editCartItemEvent(item.UniqueId, item.GoodsId, '00000000-0000-0000-0000-000000000000', item.Quantity)"
                      >+</i>
                    </span>
                  </p>
                </template>
                <div class="g-price">
                  <div class="price">
                    <em class="unit">¥</em>
                    <b>{{item.Price}}</b>
                  </div>
                  <div class="promotion">
                    <span class="tag">最大购买数量{{item.MaxQuantity}}件</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <section class="footer">
      <div class="text">已换购<b>{{selectEdGoodsCount}}/{{model.length}}件</b></div>
      <a class="kd-btn btn-lg" @click="confirmEvent">确定</a>
    </section>
    <attrs :is-show.sync="isShowAttr" :shop-id="shopId" :unique-id="editCartItemInfo.uniqueId" :goods-id="editCartItemInfo.goodsId" :real-goods-id="editCartItemInfo.realGoodsId" @done="changeAttrDone" :quantity="editCartItemInfo.quantity"/>
  </article>
</template>

<script>
import api from "@/api/cart";
import attrs from "../components/attrs";

export default {
  data() {
    return {
      shopId: 1,
      uniqueId: "",
      model: [],
      selectEdGoodsCount: 0,
      isShowAttr: false,  //是否显示选择属性弹窗
      editCartItemInfo: {uniqueId: '', goodsId: '', realGoodsId: '', quantity: 1}, //正在编辑的商品信息
    };
  },
  components:{
    attrs
  },
  onLoad(options) {
    if (options) {
      this.shopId = options.shopId;
      this.uniqueId = options.uniqueId;
    }
    this._getPageData();
  },
  methods: {
    //在购物车编辑商品属性
    editCartItemEvent(uniqueId, goodsId, realGoodsId, quantity){
      this.editCartItemInfo = {uniqueId, goodsId, realGoodsId, quantity}
      this.isShowAttr = true
    },
    changeAttrDone(){
      this.isShowAttr = false
      this._getPageData();
    },
    confirmEvent(){
      wx.navigateBack({
        delta: 1
      })
    },
    //取消商品选中
    cancelSelectedEvent(uniqueId){
      api.delete(uniqueId, this.shopId).then(() => {
        this._getPageData()
      })
    },
    _getPageData() {
      api.getExchangeGifts(this.shopId, this.uniqueId).then(({Data}) => {
        if(Data){
          Data.forEach(ele => {
            if(ele.IsNeedReSelect){
              this.selectEdGoodsCount++
            }
          });
          this.model = Data
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../main.less";
.cart-list-box .goods-list .g-item .goods-box .g-info .info .g-price .promotion .tag, .cart-list-box.pack-box .tips .promotion .tag{
  border: none;
  color: #e31436;
}

.footer{
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .text{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    background: #000;
    padding-left: 15px;
    height: 49px;
    b{
      margin-left: 10px;
    }
  }
  .kd-btn{
    width: 100px;
  }
}
</style>