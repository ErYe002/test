<template>
  <bottom-flip :is-show.sync="isShow">
    <div class="topTitles">
        <div>商品清单</div>
        <div>共计{{GoodsCount}}件(包括配件)</div>
        <!-- <img class="deletImg" src="/static/images/icon_cart_tips_close.png" alt=""> -->
    </div>
    <scroll-view scroll-y="true" class="goods-list">
      <!-- 套餐商品 -->
      <div  v-for="(packageItem, idx) in PackageGoods" :key="idx"> 
        <div class="packageTitleWiew">
          <div>套餐:{{idx+1}} x{{packageItem.Quantity}}</div>
          <div class="packePriceView">￥{{packageItem.Price}}</div>
        </div>
        <div class="goodsView"  v-for="item in packageItem.PackageGoodsItems" :key="item.GoodsId"> 
          <img class="goodsImg" :src="item.ImageUrl" alt="">
          <div class="goodsInfo">
            <p class="g-name"><span class="oversea-tag" v-if="item.ShopId == 2">海淘</span> {{item.GoodsName}}</p>
            <div class="g-attr" v-for="(attrItem, indx) in item.SpecificationItems" :key="indx">
              <div class="attr-text" > <span v-if="attrItem.Specification"></span>{{attrItem.Specification}}<span v-if="attrItem.AnotherName">{{attrItem.AnotherName}}</span></div>
              <div class="attr-text">x {{attrItem.Quantity}}</div>
            </div>
          </div>
        </div>
      </div>    
      <!-- 普通商品 -->
      <div class="goodsView" v-for="(item, idx) in NormalGoods" :key="idx">
        <img class="goodsImg" :src="item.ImageUrl" alt="">
        <div class="goodsInfo">
            <p class="g-name"><span class="oversea-tag" v-if="item.ShopId == 2">海淘</span>{{item.GoodsName}}</p>
            <div class="g-attr" v-for=" attrItem in item.SpecificationItems" :key="attrItem">
              <div class="attr-text" > <span v-if="attrItem.Specification"></span>{{attrItem.Specification}}<span v-if="attrItem.AnotherName">{{attrItem.AnotherName}}</span></div>
              <div class="attr-text">x {{attrItem.Quantity}}</div>
            </div>
            <div class="g-price" v-if="item.IsScore">{{item.BuyScore}}积分</div>
            <div class="g-price" v-else>
              <em class="unit">¥</em>
              <b>{{item.Price}}</b>
              <div :class="{tag: true, vip: item.isVIP}">
                <img
                  v-if="item.isVIP == true"
                  :src="'/static/images/level_0'+ roleId + '.jpg'"
                />
                <span>{{item.PriceLable}}</span>
              </div>
            </div>
        </div>
      </div>
      <div class="footerView">
        <img class="iconItem" mode="aspectFit" src="/static/images/confirm7day.png" alt="">
        <button open-type="contact" class="iconItem">
          <img class="iconimg" mode="aspectFit" src="/static/images/confirmCustom.png" alt="">
        </button>
      </div>
    </scroll-view>
  </bottom-flip>
</template>

<script>
//底部弹窗
import bottomFlip from "@/components/bottomFlip"
import cartApi from "@/api/cart"
import tool from '@/utils'

export default {
  data(){
    return {
      GoodsCount:0,
      PackageGoods: [],
      NormalGoods:[],
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: Number,
      default: 1
    },
    roleId: {
      type: String,
      default: ""
    },
    issinglegoodsbuy:{
      type:Boolean,
      default: false
    }
  },
  watch:{
    isShow:{
      handler: function(val){
        //父与子组件同步isShow值
        this.$emit('update:isShow', val)
        if(val == true){
          this._getGoodsList()
        }
      },
      immediate: true
    }
  },
  components: {
    bottomFlip
  },
  methods:{
    hideEvent(){
      this.$emit('update:isShow', false)
    },
    //获取商品清单
    _getGoodsList(){
      console.log("shopId = "+this.shopId);
      console.log("roleId = "+this.roleId);
      cartApi.getPendingBuyGoods(this.shopId,this.issinglegoodsbuy).then(({Data}) => {
        console.log("--- 获取商品清单 ----")
        this.PackageGoods = Data.PackageGoods
        this.NormalGoods = Data.NormalGoods
        this.GoodsCount = Data.GoodsCount
        console.log(this.PackageGoods)
        console.log(this.NormalGoods)
        
        this.NormalGoods.forEach(function(item, index) {
          if (item.PriceLable.indexOf('会员') >= 0) {
            item.isVIP = true;
          }else{
            item.isVIP = false;
          }
        });
      })
    }
  }
};
</script>

<style lang="less" scoped>


.topTitles {
  height: 60rpx;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 24rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  justify-content: space-between;
  // .right {
  //   display: flex;
  //   align-items: center;
  //   flex-direction: row;    
  // }
  // .deletImg {
  //   width: 30rpx;
  //   height: 30rpx;
  // }
}
.goods-list {
  display: flex;
  max-height: 480px;
}
.packageTitleWiew {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  margin: 20rpx;
  .packePriceView {
    font-size: 28rpx;
    color: #ff0000;
  }
}



.goodsView {
  flex: 1;
  display: flex;
  margin: 20rpx;
  border-bottom: 1px solid #dcdcdc;
}
.goodsInfo {
  flex: 1;
  .g-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
    margin-bottom: 6px;
    word-break: break-all;
    color: #333333;
  }
  .g-attr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    margin-bottom: 5px;
    .attr-text {
      color: #6b6b6b;
    }
  }
  .g-price {
    margin-bottom: 20rpx;
    color: #e31436;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    float:left;
    bottom: 20rpx;
    .unit {
      font-size: 10px;
    }
    b {
      // margin: -1.5px 2px -1.5px;
      margin: 0 2px 0 0;
    }
    .tag {
      font-size: 9px;
      background: #000;
      color: #fff;
      padding: 1px 2px;
      &.vip {
        display: flex;
        align-items: center;
        padding: 0 2px 0 0;
        img {
          display: block;
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}

.goodsImg {
  margin-bottom: 20rpx;
  margin-right: 10rpx;
  width: 120rpx;
  height: 120rpx;
  border: 1px solid #dcdcdc;
}

.oversea-tag {
  display: inline-block;
  font-size: 10px;
  color: #fff;
  background: #000;
  padding: 1px 1px;
  margin-right: 3px;
  font-weight: 300;
}


.footerView {
  height: 100rpx;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconItem {
    background: transparent;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: inherit;
    border-radius: 0;
    line-height: initial;
    color: inherit;
      &::after {
        border: none;
        border-radius: 0;
        position: absolute;
        width: 0;
        height: 0;
      }
    height: 50rpx;
    width: 50%;
  }
  .iconimg{
    height: 100%;
    width: 100%;
  }
}

</style>