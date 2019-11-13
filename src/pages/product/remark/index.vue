<template>
  <!-- 评论 -->
  <div>
    <div class="actCon remarkBox">
      <div class="act-remark actLine">
        <img src="static/images/smile.jpg" class="smile" alt />
        <span>{{ramarkData.PraiseRatio}}%</span>
        好评
      </div>
    </div>
    <div
      :class="'remarkTag '+(isShowMoreTag?'showMore':'')"
      v-if="ramarkData != null && ramarkData.TotalCount > 0"
    >
      <ul>
        <li class="tag">
          <a @click="_selectLabel(-1)">全部</a>
        </li>
        <li class="tag">
          <a @click="_selectLabel(4)">有图（{{ramarkData.ImageCount}}）</a>
        </li>
        <block v-if="ramarkData.LableTags != null && ramarkData.LableTags.length>0">
          <li
            :class="'tag '+(item.Sentiment==0?'badlabel':'')"
            v-for="(item, index) in  ramarkData.LableTags"
            :key="index"
          >
            <a @click="_selectLabel(index+3)">{{item.CommentLabel}}（{{item.Count}}）</a>
          </li>
        </block>
      </ul>
    </div>
    <div :class="'showTagBtn '+(isShowMoreTag?'showMoreIcon':'')" @click="_showMoreTag()">∨</div>
    <block>
      <div class="remarkCon" v-if="Data != null ">
        <div class="remarkBox" v-for="item in Data" :key="item.index">
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
import { mapActions, mapState } from "vuex";
import bottomFlip from "@/components/bottomFlip";

export default {
  data() {
    return {
      GoodsAbout: "",
      Data: "",
      label: "",
      selectLabelIndex: "1",
      isShowMoreTag: false
    };
  },
  onLoad(options) {
    this.label = options.label;
    this.goodsId = options.goodsid;
    console.log(this.label, this.goodsId);
    this._getData(options.goodsid, options.label);
  },
  computed: {
    ...mapState("remark", ["ramarkData"])
  },
  methods: {
    _getData(goodsId, label) {
      label ? (label = label) : (label = 1);
      var Page = 1;
      var RemarkType = 4;
      var LableName = "";
      var Page = 1;
      api
        .getRemarkData(goodsId, RemarkType, LableName, Page)
        .then(({ Data }) => {
          this.Data = Data;
          Data = Data.map(function(value, index) {
            value.PubTime = value.PubTime.replace("T", " ");
            return value;
          });
          this.Data = Data;
        });
    },
    _selectLabel(label) {
      console.log(label);
    },
    _showMoreTag() {
      this.isShowMoreTag = !this.isShowMoreTag;
    }
  }
};
</script>

<style lang="less" scoped>
.remarkBox {
  .act-remark {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    color: #313131;
    font-size: 11px;
    ._span {
      color: #e31436;
      margin: 0 3px;
    }
  }
  .actLine::after {
    height: 0;
  }
  .smile {
    width: 19px;
    height: 19px;
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
  &.showMore {
    max-height: inherit;
    height: auto;
  }
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
.showTagBtn {
  width: 120%;
  border-bottom: 1px solid #ececec;
  margin: 0 auto;
  margin-left: -10%;
  text-align: center;
  line-height: 30px;
  transform: scale(2, 1);
  color: #ccc;
  &.showMoreIcon {
    transform: scale(2, 1) rotate(180deg);
    border-top: 1px solid #ececec;
    border-bottom: 0;
  }
}
.remarkCon {
  .remarkBox {
    padding: 10px 15px;
    position: relative;
    padding-bottom: 20px;
    font-size: 12px;
    border-bottom: 5px solid #f5f5f5;
  }
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
