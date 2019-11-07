<template>
  <bottom-flip :is-show.sync="isShow">
    <scroll-view scroll-y="true" class="coupon-list" v-if="couponList.length > 0">
      <li class="c-item" v-for="item in couponList" :key="item.PromotionID">
        <div class="">
          
        </div>
        <div class="" v-if="item.MatchingGoods.length > 0">
          
        </div>
      </li>
    </scroll-view>
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





</style>