<template>
  <article class="goods_list">
      <block v-if="tempData != null && tempData.length > 0">
        <block 
          v-for="(item,index) in tempData" 
          :key="index">
          <a
          :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
          class="item"
          >
          <div>
              <img :src="item.ImageUrl" class="img" />
          </div>
          <div class="content">
              <div class="goodsName">{{item.GoodsName}}</div>
              <div class="integral">
              <span class="integral_pont" v-if="item.GoodsScoreText!=null&&item.GoodsScoreText!=''">{{item.GoodsScoreText}}</span></div>
              <div class="price">
              <div class="price-left">
                  <div class="old">原价￥{{item.SalePrice}}</div>
                  <div class="svip">
                  <span class="svip-price">￥{{item.SvipPrice}}</span>
                  <span class="svip-icon">SVIP价</span>
                  </div>
              </div>
              <div class="price-right">
                  <img src="/static/images/bg_car.png" alt="" class="bg-price">
                  <span class="mar-price">￥{{item.SaveMoney}}</span>
                  <span class="triangle"></span>
              </div>
              </div>
          </div>
          </a>
      </block>
    </block>
  </article>
</template>

<script>
import api from "@/api/search";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tempData:""
    };
  },
  onLoad(options) {
    let EssentialGoodsList = wx.getStorageSync("EssentialGoodsList",this.tempData);
    console.log(EssentialGoodsList)
    if(EssentialGoodsList){
      this.tempData = EssentialGoodsList
    }
  },
  methods: {
 
  }
};
</script>

<style lang="less" scoped>
  .goods_list{
    .item{
      border-bottom:1px solid #E6E6E6;
      padding: 5px; 
      display: flex;
      justify-content: flex-start;
      .img{
        width: 100px;
        height: 100px;
        margin: 10px;
      }
      .content{
        flex: 1;
        margin: 10px 10px 10px 0;
        .goodsName{
            height: 38px;
          white-space: initial;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #231815;
        }
        .integral{
          display: flex;
          justify-content: flex-start;
          margin-bottom: 8px;
          margin-top: 5px;
          .integral_pont{
            padding: 2px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #E83828;
            color: #E83828;
            font-size: 10px;
            border-radius: 5px;
          }
        }
        .price{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price-left{
            .old{
              color: #231815;
              font-size: 12px;
            }
            .svip{
              display: flex;
              align-items: center;
              .svip-price{
                color: #231815;
                font-size: 18px;
                font-weight: bold;
                margin-right: 5px;
              }
              .svip-icon{
                color: #FDDF2B;
                font-size: 10px;
                background: #231815;
                border-radius: 5px;
                padding: 2px 4px;
              }
            }
          }
          .price-right{
            position: relative;
            z-index: 0;
            width: 75px;
              height: 27px;
              display: flex;
              justify-content:space-between;
              align-items: center;
            .bg-price{
              width: 75px;
              height: 27px;
              position: absolute;
              right: 0;
              top: 0;
              z-index: -1;
            }
            .mar-price{
              color: #fff;
              font-size: 12px;
              margin-left: 22px;
            }
            .triangle{
              margin-left: 2px;
              border: 3px solid;
              border-color: transparent;
              border-left-color:#fff;
            }
          }
        }
      }
    }
  }
</style>