<template>
  <ul class="goods-list">
    <li class="goods-item" v-for="item in dataList" :key="item.GoodsId">
      <a :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp='+item.IsCompGoods" class="link">
        <div class="g-img-box">
          <img class="tag-img" v-if="item.GoodsTagImage" :src="item.GoodsTagImage" />
          <img class="g-img" :src="item.GoodsImg" mode="aspectFill" />
        </div>
        <div class="g-info">
          <p class="g-name">
            <text class="ht-tag" v-if="item.ShopId == 2">海淘</text>
            <text>{{item.GoodsName}}</text>
          </p>
          <p class="price-info">
            <span class="price">¥{{item.Price}}</span>
            <span class="cut-price" v-if="item.Lable">{{item.Lable}}</span>
          </p>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: 100
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  overflow: hidden;
  .goods-item {
    float: left;
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 0.5px solid #e8e8e8;
    .link {
      .g-img-box {
        position: relative;
        .g-img {
          display: block;
          width: 164px;
          height: 164px;
          margin: 0 auto;
        }
        .tag-img {
          position: absolute;
          left: 10px;
          top: 10px;
          display: block;
          width: 45px;
          height: 45px;
        }
      }
      .g-info {
        .g-name {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 5px 0;
          color: #888;
          min-height: 38px;
          .ht-tag {
            font-size: 12px;
            color: #fff;
            background: #000;
            padding: 2px 4px;
            margin-right: 3px;
            font-weight: 300;
          }
        }
        .price-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          .price {
            font-weight: bold;
          }
          .cut-price {
            font-weight: 350;
            font-size: 12px;
            padding: 1px 4px;
            color: #ff7c7c;
            border: solid 0.5px #ff7c7c;
          }
        }
      }
    }
    &:nth-child(odd) {
      border-right: 0.5px solid #e8e8e8;
    }
  }
}
</style>