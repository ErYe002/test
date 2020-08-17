<template>
  <article>
    <template v-if="model">
      <section class="info-box">
        <p class="title">
          <text class="ht-tag">海淘</text>
          <span>订单编号：{{model.OrderNo}}</span>
        </p>
      </section>
      <section class="package-box">
        <scroll-view class="p-list" scroll-x enable-flex v-if="model.Logistics.length > 0">
          <p
            :class="{item: true, active: idx == currentPack}"
            v-for="(item, idx) in model.Logistics"
            :key="item.ExpressNo"
            @click="changePackIndex(idx)"
          >包裹{{idx}}</p>
        </scroll-view>
        <scroll-view
          class="g-list"
          scroll-x
          enable-flex
          v-if="model.Logistics.length > 0 && model.Logistics[currentPack].GoodsList.length > 0"
        >
          <div
            class="item"
            v-for="item in model.Logistics[currentPack].GoodsList"
            :key="item.GoodsImageUrl"
          >
            <img class="img" :src="item.GoodsImageUrl" />
            <span>x{{item.Quantity}}</span>
          </div>
        </scroll-view>
      </section>
      <section class="logistics-info-box">
        <p class="title">
          <span>
            物流公司：
            <em>{{model.Logistics[currentPack].ExpressName}}</em>
          </span>
          <span>
            运单号：
            <em>{{model.Logistics[currentPack].ExpressNo}}</em>
          </span>
        </p>
        <div class="timeline-box">
          <time-line :list="model.Logistics[currentPack].Routes" />
        </div>
      </section>
    </template>
  </article>
</template>

<script>
import timeLine from "./timeLine";
export default {
  props: {
    model: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentPack: 0
    };
  },
  components: {
    timeLine
  },
  methods: {
    changePackIndex(idx) {
      this.currentPack = idx;
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  font-size: 14px;
  padding: 14px;
  border-bottom: solid 10px #eee;
  .title {
    display: flex;
    align-items: center;
    .icon {
      display: block;
      width: 48px;
      height: 15px;
      margin-right: 5px;
    }
  }
}

.package-box {
  border-bottom: solid 10px #eee;
  .p-list {
    display: flex;
    // align-items: center;
    height: 45px;
    width: 100%;
    .item {
      height: 45px;
      line-height: 45px;
      width: 125px;
      text-align: center;
      font-size: 15px;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e5e5e5;
      &.active {
        border-bottom: 2px solid #cab894;
        color: #cab894;
      }
    }
  }

  .g-list {
    display: flex;
    // align-items: center;
    height: 100px;
    // padding: 0 14px;
    width: 100%;
    box-sizing: border-box;
    .item {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 12px;
      padding-right: 10px;
      margin-left: 10px;
      .img {
        display: block;
        width: 72px;
        height: 72px;
        margin-right: 17.5px;
        border: 0.5px solid #dcdcdc;
        box-sizing: border-box;
      }
    }
  }
}

.logistics-info-box {
  .title {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    color: #666666;
    font-size: 13px;
    border-bottom: 0.5px solid #e5e5e5;
    span {
      display: flex;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.timeline-box {
  padding: 10px 18px 18px;
}

.ht-tag {
  font-size: 12px;
  color: #fff;
  background: #000;
  padding: 2px 4px;
  margin-right: 3px;
  font-weight: 300;
}
</style>