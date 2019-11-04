<template>
  <article class="wrap">
    <ul class="list" v-if="list.length > 0">
      <li
        class="item"
        v-for="(item, idx) in list"
        :key="item.GoodsId"
        @touchstart="touchS"
        @touchmove="touchM"
        @touchend="touchE"
        :data-idx="idx"
      >
        <div class="info-box" :style="item.txtStyle">
          <img class="g-img" :src="item.ImageUrl" />
          <div class="info">
            <div class="g-name">{{item.GoodsName}}</div>
            <div class="g-price">¥{{item.FavoritePrice}}</div>
          </div>
        </div>
        <div class="op-box">
          <span>删除</span>
        </div>
      </li>
      <!-- <li class="item">
        <div class="info-box">
          <img
            class="g-img"
            src="https://pic.keede.com//Main/5ec960c0-047a-423d-8847-52f0abbc2fd8-350-350.jpg"
          />
          <div class="info">
            <div class="g-name">[安室奈美惠御用]ReVIA蕾美彩色日抛10片装ReVIA蕾美彩色日抛10片装</div>
            <div class="g-price">¥1000</div>
          </div>
        </div>
        <div class="op-box">
          <span>删除</span>
        </div>
      </li>-->
    </ul>
  </article>
</template>

<script>
import api from "@/api/user";

export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      startX: 0,
      delBtnWidth: 90
    };
  },
  onLoad() {
    this._getPageData();
  },
  methods: {
    _getPageData() {
      api.getFavoriteList(this.page, this.size).then(({ Data }) => {
        this.list = Data;
      });
    },
    touchS(e) {
      console.log("touchS", e);
      if (e.mp.touches.length == 1) {
        this.startX = e.mp.touches[0].clientX;
      }
    },
    touchM(e) {
      // console.log("touchM", e);
      if (e.mp.touches.length == 1) {
        //手指移动时水平方向位置
        let moveX = e.mp.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        let disX = this.startX - moveX;
        let txtStyle = "";
        console.log('disX', disX)
        if (disX == 0 || disX < 0) {
          //如果移动距离小于等于0，说明向右滑动，文本层位置不变
          txtStyle = "left: 0px";
        } else if (disX > 0) {
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= this.delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + this.delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.idx;
        let list = this.list
        //更新列表的状态
        list[index].txtStyle = txtStyle;
        this.list = list

      }
    },
    // touchE(e) {
    //   console.log("touchE", e);
    //   if (e.mp.changedTouches.length == 1) {
    //     //手指移动结束后水平位置
    //     var endX = e.mp.changedTouches[0].clientX;
    //     //触摸开始与结束，手指移动的距离
    //     var disX = this.startX - endX;
    //     //如果距离小于删除按钮的1/2，不显示删除按钮
    //     var txtStyle =
    //       disX > this.delBtnWidth / 2
    //         ? "left:-" + this.delBtnWidth + "px"
    //         : "left:0px;";
    //     //获取手指触摸的是哪一项
    //     var index = e.currentTarget.dataset.idx;
    //     //更新列表的状态
    //     let list = this.list
    //     //更新列表的状态
    //     list[index].txtStyle = txtStyle;
    //     this.list = list
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 0.5px solid #e5e5e5;
    position: relative;
    .info-box {
      display: flex;
      position: relative;
      z-index: 2;
      padding: 10px;
      background: #fff;
      .g-img {
        display: block;
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .info {
        flex: 1;
        .g-name {
          font-size: 14px;
          font-weight: 300;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 36px;
        }
        .g-price {
          margin-top: 10px;
          font-size: 16px;
          color: #e31436;
        }
      }

      &.show-del {
        transform: translateX(-90px);
      }
    }
    .op-box {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      background: #f00;
      color: #fff;
      font-size: 14px;
      height: 100%;
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:active {
        background: lighten(#f00, 10%);
      }
    }
  }
}
</style>