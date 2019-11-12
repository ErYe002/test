<template>
  <!-- 评论 -->
  <div>
    <div class="actCon remarkBox">
      <div class="act-remark actLine">
        <img src="static/images/smile.jpg" alt="">
        <span>99%</span>好评
      </div>
    </div>
    <div class="remarkTag" v-if="Data != null && Data.TotalCount > 0">
      <ul>
        <li class="tag">
          <a :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label=1'">全部</a>
        </li>
        <li class="tag">
          <a
            :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label=2'"
          >有图（{{Data.ImageCount}}）</a>
        </li>
        <block v-if="Data.LableTags != null && Data.LableTags.length>0">
          <li
            :class="'tag '+(Data.Sentiment==0?'badlabel':'')"
            v-for="item in  Data.LableTags"
            :key="item.index"
          >
            <a
              :href="'/AllComment?goodsid='+Data.GoodsBase.GoodsId+'&&label='+(item.index+3)"
            >{{item.CommentLabel}}（{{item.Count}}）</a>
          </li>
        </block>
      </ul>
    </div>
    <block>
      <div
        class="remarkCon"
        v-if="Data != null && Data.Remarks != null && Data.Remarks.length>0"
      >
        <div class="remarkBox" v-for="item in Data.Remarks" :key="item.index">
          <div class="comment-header">
            <div class="userInfo">
              <img
                class="header-icon"
                :src="item.HeadImg?item.HeadImg:'/static/images/default_img.gif'"
              />
              {{item.UserName}}
            </div>
            <div class="comment-header-right">
              <div class="kd-level" :data-id="item.Rate">
                <img
                  class="comment-star"
                  :src="item.Rate>0?'/static/images/full-start.png':'/static/images/empty-start.png'"
                />
                <img
                  class="comment-star"
                  :src="item.Rate>1?'/static/images/full-start.png':'/static/images/empty-start.png'"
                />
                <img
                  class="comment-star"
                  :src="item.Rate>2?'/static/images/full-start.png':'/static/images/empty-start.png'"
                />
                <img
                  class="comment-star"
                  :src="item.Rate>3?'/static/images/full-start.png':'/static/images/empty-start.png'"
                />
                <img
                  class="comment-star"
                  :src="item.Rate>4?'/static/images/full-start.png':'/static/images/empty-start.png'"
                />
              </div>
              <text class="comment-time">{{item.PubTime}}</text>
            </div>
          </div>
          <div class="comment-text-style" v-if="item.AnotherName!=null">{{item.AnotherName}}</div>
          <div class="comment-text">{{item.Content}}</div>
        </div>
      </div>
      <div class="noremark" v-else>暂无评论</div>
    </block>
  </div>
</template>

<script>
import api from "@/api/goods";
import { mapState } from "vuex";
import bottomFlip from "@/components/bottomFlip";

export default {
  data() {
    return {
      GoodsAbout: "",
      Data: "",
      label:""
    };
  },
  onLoad(options) {
    this.label=options.label;
    this._getData();
  },
  methods: {
    _getData(goodsId) {
      api.getGoodsDetail(seocode, isComp).then(({ Data }) => {
        this.Data=Data.remark
      })
    }
  }
};
</script>

<style lang="less" scoped>
.remarkBox {
  .actLine::after {
    height: 0;
  }
  &.actCon .actLine .act-name {
    font-size: 11px;
    border-right: none;
  }
}
.remarkTag {
  padding: 0 15px;
  max-height: 52px;
  overflow: hidden;
  ._li {
    background: #f4f2e6;
    color: #313131;
    float: left;
    font-size: 12px;
    margin-bottom: 8px;
    margin-right: 8px;
    padding: 2px 6px;
    &.badlabel {
      background: #f3f3f3;
    }
  }
}
.remarkCon {
  .comment-header {
    display: flex;
    margin: 10rpx 20rpx 0;
    justify-content: space-between;
  }
  .userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-icon {
    width: 30px;
    height: 30px;
    margin-right: 10rpx;
    border-radius: 100%;
    border: 1rpx solid #f0f0f0;
  }
  .comment-header-right {
    display: flex;
    flex-direction: column;
    .kd-level {
      display: flex;
      justify-content: space-between;
    }
  }
  .comment-star {
    display: inline-block;
    height: 24rpx;
    margin-right: 10rpx;
    width: 24rpx;
  }
  .comment-text {
    font-size: 12px;
    color: #010101;
    word-wrap: break-word;
    margin: 10rpx 20rpx 20rpx;
  }
  .comment-text-style {
    font-size: 24rpx;
    color: #888;
    margin-top: 10rpx;
    word-wrap: break-word;
    margin: 5rpx 20rpx;
  }
}
</style>
