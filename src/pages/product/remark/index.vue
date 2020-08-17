<template>
  <!-- 评论 -->
  <div class="page">
    <div class="common-top">
      <div class="actCon remarkBox">
        <div class="act-remark actLine">
          <img src="/static/images/smile.png" class="smile" alt />
          <span>{{ramarkData.PraiseRatio}}%</span>
          好评
        </div>
      </div>
      <div
        :class="'remarkTag '+(isShowMoreTag?'showMore':'')"
        v-if="ramarkData != null && ramarkData.TotalCount > 0"
      >
        <ul>
          <li :class="'tag '+(selecLabel=='全部'?'select':'')">
            <a @click="_selectLabel('全部')">全部</a>
          </li>
          <li :class="'tag '+(selecLabel=='有图'?'select':'')">
            <a @click="_selectLabel('有图')">有图（{{ramarkData.ImageCount}}）</a>
          </li>
          <block v-if="ramarkData.LableTags != null && ramarkData.LableTags.length>0">
            <li
              :class="'tag '+(item.Sentiment==0?'badlabel':'')+(item.CommentLabel==selecLabel?' select':'')"
              v-for="(item, index) in  ramarkData.LableTags"
              :key="index"
            >
              <a @click="_selectLabel(item.CommentLabel)">{{item.CommentLabel}}（{{item.Count}}）</a>
            </li>
          </block>
        </ul>
      </div>
      <div :class="'showTagBtn'" @click="_showMoreTag()"><span :class="(isShowMoreTag?'showMoreIcon':'icon')">{{isShowMoreTag?'∧':'∨'}}</span></div>
    </div>
    <block>
      <div class="remarkCon" v-if="Data != null ">
        <div v-for="(item,index) in Data" :key="index">
          <div class="remarkBox" v-if="item.NoteId==defaultId">
            <div class="comment-header">
              <div class="userInfo">
                <img
                  class="header-icon"
                  :src="item.HeadImg?item.HeadImg:'/static/images/default_img.gif'"
                />
                {{item.Nick!=null?item.Nick:''}}
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
            <div class="comment-pic" v-if="item.Imgs != null && item.Imgs.length> 0">
              <scroll-view scroll-x scroll-with-animation="true">
                <block v-for="(imgitem,imgindex) in item.Imgs" :key="imgindex">
                  <li class="comment-pic-li">
                    <img :src="imgitem" mode="aspectFit" @click="_previewImage(imgitem,item.Imgs)" />
                  </li>
                </block>
              </scroll-view>
            </div>
          </div>
          <div v-else class="communtiyBox">
            <div  class="communtiy-swiper">
              <block>
                <div class="communtiy-swiperItem">
                    <div class="com-content">
                        <div class="com-text">
                            <img :src="item.HeadImg?item.HeadImg:'/static/images/default_img.gif'" alt="" class="heder-img">
                            <div>
                              <span class="com-name">{{item.Nick}}</span><br/>
                            </div>
                        </div>
                        <div class="com-title">{{item.NoteTitle}}</div>
                        <div class="com-tips">{{item.Content}}</div>
                    </div>
                    <div class="scroll-img" v-if="item.Imgs != null && item.Imgs.length> 0">
                      <scroll-view scroll-x scroll-with-animation="true">
                        <block v-for="(imgitem,imgindex) in item.Imgs" :key="imgindex">
                          <li class="comment-pic-li">
                            <img :src="imgitem" mode="aspectFit"  />
                          </li>
                        </block>
                      </scroll-view>
                    </div>
                    <div class="com-box">
                      <div class="com-from">来自社区心得</div>
                      <div class="count">
                        <div class="comment-count">
                          <img src='/static/images/like.png' alt="" class="img">{{item.NoteThumbsUpCount}}
                        </div>
                        <div class="thums-count">
                          <img src='/static/images/news.png' alt="" class="img">{{item.NoteCommentCount}}
                        </div>
                      </div>
                    </div>
                    
                </div>
              </block>
            </div>
          </div>
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
      selecLabel: "",
      selectLabelIndex: "1",
      isShowMoreTag: false,
      RemarkType: -1,
      LableName: "",
      Page: 1,
      totalPage: 3,
      noData: false,
      HotCommentList:"",
      defaultId:"00000000-0000-0000-0000-000000000000"//true 不是社区贴
    };
  },
  onLoad(options) {
    // let HotCommentList = wx.getStorageSync("HotCommentList");
    // this.HotCommentList = HotCommentList
    this.selecLabel = options.label;
    if (this.selecLabel == "有图") {
      this.RemarkType = 4;
    }
    this.goodsId = options.goodsid;
    console.log(this.selecLabel, this.goodsId);
    this._getData();
  },
  onReachBottom() {
    if (!this.noData) {
      this.Page++;
      this._getData();
    }
  },
  computed: {
    ...mapState("remark", ["ramarkData"])
  },
  methods: {
    _getData(goodsId) {
      var goodsId = this.goodsId;
      var RemarkType = this.RemarkType;
      var LableName = this.LableName;
      var Page = this.Page;
      api
        .getRemarkData(goodsId, RemarkType, LableName, Page)
        .then(({ Data }) => {
          Data = Data.map(function(value, index) {
            value.PubTime = value.PubTime.replace("T", " ");
            return value;
          });
          this.Data = Data;
          if (Data.length < 10) {
            this.noData = true;
          }
          // console.log(Data);
        });
    },
    _showMoreTag() {
      this.isShowMoreTag = !this.isShowMoreTag;
    },
    _selectLabel(label) {
      this.selecLabel = label;
      this.noData = false;
      if (label == "全部") {
        this.LableName = "";
        this.RemarkType = -1;
        this.Page = 1;
      } else if (label == "有图") {
        this.LableName = "";
        this.RemarkType = 4;
        this.Page = 1;
      } else {
        this.LableName = label;
        this.RemarkType = -1;
        this.Page = 1;
      }
      this._getData();
    },
    _previewImage(url,urlArry) {
      const cur = url;
      const urls = urlArry;
      wx.previewImage({
        current: cur,
        urls: urls
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page{
  background: #f2f2f2;
}
  .actCon{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
.remarkBox {
  background: #fff;

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
.common-top{
  padding: 10px 10px 0 10px;
  border-radius: 20px;
  overflow: hidden;
}
.remarkTag {
  background: #fff;
  padding: 0 15px;
  max-height: 52px;
  overflow: hidden;
  &.showMore {
    max-height: inherit;
    height: auto;
  }
  ._li {
    background: #E5E5E5;
    color: #313131;
    float: left;
    font-size: 12px;
    margin-bottom: 8px;
    margin-right: 8px;
    padding: 2px 6px;
    border-radius: 5px;
    &.badlabel {
      background: #E5E5E5;
    }
    &.select {
      background: #313131;
      color: #FAE5AA;
    }
  }
}
.showTagBtn {
  background: #fff;
  width: 100%;
  margin: 0 auto;
  // margin-left: -10%;
  text-align: center;
  line-height: 30px;
   border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  .icon{
    transform: scale(2, 1);
    color: #ccc;
  }
  .showMoreIcon {
      transform: scale(2, 1);
      border-bottom: 0;
  }
}
.remarkCon {
  border-radius: 20px;
  margin: 10px 0;
  overflow: hidden;
  .remarkBox {
    margin: 0 10px;
    
    overflow: hidden;
    background: #fff;

    padding: 10px 15px;
    position: relative;
    // padding-bottom: 20px;
    // font-size: 12px;
    border-bottom: 0.5px solid #EBEBEB;
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
  .comment-pic {
    display: flex;
    ._scroll-view {
      white-space: nowrap;
      height: 100px;
    }
  }
  .comment-pic-li {
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
    overflow: hidden;
  }
  .comment-pic ._img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    background: #ececec;
  }
}
.communtiyBox{
      margin: 0px 10px;
      overflow: hidden;
      padding: 10px 15px;
      // height: 120px;
      background: #fff;
      border-bottom: 0.5px solid #EBEBEB;
      .communtiy-swiper{
        margin: 10rpx 20rpx 0;
          // height: 200px;
          .com-text{
            display: flex;
            align-items: center;
            .heder-img{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 10px;
            }
          }
          .com-tips{
            text-overflow: ellipsis;         //超出部分用省略号 ...  来代替
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;           //限制要出现的行数
              overflow: hidden;
              font-size: 24rpx;
              color: #010101;
              word-wrap: break-word;
              margin-top: 5px;
          }
          .com-title{
              font-size: 13px;
              margin-top: 10px;
              font-weight: bold;
              color: #010101;
          }
        .scroll-img {
          display: flex;
          margin-top: 10px;
          margin-bottom: 10px;
          ._scroll-view {
            white-space: nowrap;
            height: 100px;
          }
          .comment-pic-li {
            display: inline-block;
            margin-right: 10px;
            border-radius: 5px;
            overflow: hidden;
          }
           ._img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
            overflow: hidden;
            background: #ececec;
          }
        }

      }
      .com-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .com-from{
          color: #E31436;
          border: 1px solid #E31436;
          vertical-align: middle;
          font-size: 10px;
          border-radius: 5px;
          width: 80px;
          text-align: center;
        }
        .count{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .comment-count,.thums-count{
            border: 1px solid #ABABAB;
            border-radius: 10px;
            padding: 2px 10px;
            color: #8F8F8F;
            font-size: 11px;
            margin-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .img{
            width: 12px;
            height: 12px;
            margin-right: 2px;
          }
        }
      }

    }
</style>
