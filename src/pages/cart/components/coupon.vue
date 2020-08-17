<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
      <b>优惠券</b>
      <img @click="hideEvent" class="icon" src="/static/images/icon_cart_tips_close.png" />
    </p>
    <scroll-view scroll-y="true" class="coupon-list" v-if="couponList.length > 0">
      <li class="c-item" v-for="item in couponList" :key="item.PromotionID">
        <div class="coupon-wrap">
          <div class="poster-wrap">
            <span class="price-box">{{item.DeductionAmount}}</span>
            <p class="rules">满{{item.MeetAmount}}元可用</p>
            <p class="fake-btn">立即抢购</p>
          </div>
          <div class="info-wrap">
            <p class="title">{{item.PromotionTheme}}</p>
            <p
              class="validity"
            >有效期:{{item.UseStartTime == '点击领券后获得时间' ? '':(item.UseStartTime+'-'+item.UseEndTime)}}</p>
            <p class="desc">{{item.UseDescription}}</p>
          </div>
          <div class="btn picked" v-if="item.HasPicked == true">
            <span>已</span>
            <span>领</span>
            <span>取</span>
          </div>
          <div class="btn" v-else @click="reciveCoupon(item.PromotionID)">
            <span>领</span>
            <span>券</span>
          </div>
        </div>
        <div class="goods-wrap" v-if="item.MatchingGoods.length > 0">
          <p class="text">购物车以下商品可用该券</p>
          <scroll-view class="goods-list" enable-flex="true" scroll-x="true">
            <li class="g-item" v-for="(gItem, idx) in item.MatchingGoods" :key="idx">
              <img class="g-img" :src="gItem.ImageUrl" />
              <p class="price">¥{{gItem.Price}}</p>
            </li>
          </scroll-view>
        </div>
      </li>
    </scroll-view>
    <p class="no-data" v-else>
      <img src="/static/images/logo_text.png"/>
      没有可用的优惠券
    </p>
  </bottom-flip>
</template>

<script>
//底部弹窗
import bottomFlip from "@/components/bottomFlip";
import cartApi from "@/api/cart";
import goodsApi from '@/api/goods'
import tool from '@/utils'

export default {
  data(){
    return {
      couponList: []
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
    }
  },
  watch:{
    isShow:{
      handler: function(val){
        //父与子组件同步isShow值
        this.$emit('update:isShow', val)
        if(val == true){
          this._getCouponList()
        } else {
          this.couponList = []
        }
      },
      immediate: true
    }
  },
  components: {
    bottomFlip
  },
  methods:{
    reciveCoupon(couponId){
      goodsApi.presentCouponNo(couponId).then(() => {
        wx.showToast({
          title: '领取成功！',
          mask: true
        })
        this._getCouponList()
      })
    },
    hideEvent(){
      this.$emit('update:isShow', false)
    },
    //获取礼券列表
    _getCouponList(){
      cartApi.getCanUseCoupons(this.shopId).then(({Data}) => {
        this.couponList = Data.map(ele => {
          ele.UseStartTime = tool.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseStartTime))
          ele.UseEndTime = tool.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseEndTime))
          return ele
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.title-box {
  position: relative;
  padding: 12px 0;
  font-size: 16px;
  text-align: center;
  .icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    z-index: 1;
    display: block;
    width: 12px;
    height: 12px;
  }
}
.coupon-list {
  display: flex;
  max-height: 400px;

  .c-item {
    padding: 13px;
    border-bottom: 0.5px solid #dedede;
    .coupon-wrap {
      display: flex;
      .poster-wrap {
        width: 105px;
        height: 65px;
        background: linear-gradient(to right, #b59252, #f6ecae);
        text-align: center;
        font-size: 9px;
        position: relative;
        .price-box {
          position: relative;
          color: #fff;
          font-size: 30px;
          font-weight: 300;
          &:after {
            content: "元";
            display: inline-block;
            width: 12.5px;
            height: 12.5px;
            line-height: 12.5px;
            text-align: center;
            background: #89641e;
            font-size: 9px;
            border-radius: 50%;
            margin-left: -5px;
          }
        }
        .rules {
          color: #8c661d;
        }
        .fake-btn {
          background: #89641e;
          color: #fff;
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          padding: 1px 0;
        }
      }
      .info-wrap {
        margin-left: 8px;
        flex: 1;
        .title {
          font-size: 12px;
        }
        .validity,
        .desc {
          font-size: 10px;
          color: #524e4d;
          line-height: 12px;
          margin-top: 3px;
        }
        .desc {
          margin-top: 6px;
        }
      }
      .btn {
        width: 20px;
        height: 50px;
        font-size: 12px;
        border: 0.5px solid #000;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.picked {
          color: #cab894;
          border-color: #cab894;
        }
      }
    }
    .goods-wrap {
      .text {
        font-size: 11px;
        padding: 12px 0 7.5px;
      }
      .goods-list {
        display: flex;
        height: 70px;
        .g-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 3px;
          .g-img {
            display: block;
            width: 54px;
            height: 54px;
            border: 0.5px solid #e4e2e2;
          }
          .price {
            font-size: 12px;
            color: #e31436;
            margin-top: 2px;
          }
        }
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.no-data{
  text-align: center;
  color: #666;
  font-size: 12px;
  padding-bottom: 50px;
  img{
    display: block;
    width: 70px;
    height: 70px;
    margin: 40px auto 10px;
  }
}
</style>