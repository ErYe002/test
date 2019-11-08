<template>
  <bottom-flip :is-show.sync="isShow">
    <div class="topTitles">
        <div>商品清单</div>
        <div>共计xxx件(包括配件)</div>
        <img src="/static/images/icon_cart_tips_close.png" alt="">
    </div>
    <!-- 套餐商品 -->
    <div v-for="item in PackageGoods" :key="item.PromotionID"> 

    </div>    
    
    <!-- 普通商品 -->
    <div v-for="item in NormalGoods" :key="item.PromotionID">

    </div>

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
        cartApi.getPendingBuyGoods(this.shopId).then(({Data}) => {
            console.log("--- 获取商品清单 ----")
            console.log(Data)
            this.PackageGoods = Data.PackageGoods
            this.NormalGoods = Data.NormalGoods

        // this.couponList = Data.map(ele => {
        //   ele.UseStartTime = tool.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseStartTime))
        //   ele.UseEndTime = tool.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseEndTime))
        //   return ele
        // })
      })
    }
  }
};
</script>

<style lang="less" scoped>


.topTitles {
  height: 60rpx;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 24rpx;
  justify-content: space-between;
  .right {
    display: flex;
    align-items: center;
    flex-direction: row;    
  }
}


</style>