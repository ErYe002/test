<template>
  <article class="container">
    <section class="search-box">
      <a href="/pages/search/index/main" class="fake">
        <img class="icon" src="/static/images/icon_search.png" />
        <span class="text">搜索</span>
      </a>
    </section>
    <section class="classmenu-box">
      <div class="left-list">
        <scroll-view class="scroll-list" scroll-y ="{height: 'calc(100vh - 47px)'}">
          <div v-for="leftItem in leftList" :class="(leftItem.ClassID == selectedParentID ? 'active ':'') + 'scroll-item'" :key="leftItem.ClassID" @click="leftItemClickEvent(leftItem.ClassID)">{{leftItem.ClassName}}</div>
        </scroll-view>
      </div>
      <div class="right-list">
        <scroll-view class="scroll-list" scroll-y :style="{height: 'calc(100vh - 47px)'}" @scrolltolower="bindscrolltolower">
          <!-- <div class="banner-img">
            <img src="https://pic.keede.com/AppImages/1114c2dc-ed81-4927-a3fa-d6ec5969b912.jpg?v=2020071501" alt="" mode="heightFix" class="img">
          </div> -->
          <div class="scroll-item" v-for="rightItem in rightList" :key="rightItem.ClassID">
            <p class="title">{{rightItem.ClassName}}</p>
            <div class="list">
              <a :href="'/pages/search/screen/main?className=' + childItem.ClassName +'&classId=' + childItem.ClassID + '&seoCode=' + childItem.SEOCode" class="link" v-for="(childItem, idx) in rightItem.ChildAppClassDTO" :key="idx">
                <img
                  class="img"
                  :src="childItem.ImageUrl"
                  lazy-load="true"
                />
                <span class="text">{{childItem.ClassName}}</span>
              </a>
            </div>
          </div>
          <!-- <div>

          </div> -->
        </scroll-view>
      </div>
    </section>
  </article>
</template>

<script>
import api from "@/api/classmenu";

let sourceData

export default {
  data() {
    return {
      // scHeight: 0, //scroll-view高度
      selectedParentID: '',  //左列当前选中的ParentID
        leftList:[],
        rightList:[]
    };
  },
  created() {
    // const sysInfo = wx.getStorageSync("sysInfo");
    // //设置scroll-view的高度：页面除去tabbar的剩余高度-搜索框高度
    // this.scHeight = sysInfo["windowHeight"] - 45;
  },
  onLoad(){
    this._getPageData()
  },
  methods: {
    _getPageData() {
      api.getGoodsClass().then(({ Data }) => {
        //重新整理数据
        sourceData = [...Data]
        this.leftList = sourceData.filter(ele => {
            if(ele.SEOCode!="yxht"){
              return {
               ClassName: ele.ClassName,
                SEOCode: ele.SEOCode,
                ClassID: ele.ClassID
              }
            }
        })
        this.selectedParentID = this.leftList[0].ClassID
        this.changeRightData()
      });
    },
    changeRightData(){
        let rightList = sourceData.filter(ele => {
            return this.selectedParentID == ele.ClassID
        })
        this.rightList = rightList[0]['ChildAppClassDTO']
    },
    leftItemClickEvent(pid){
        this.selectedParentID = pid
        this.changeRightData()
    },
    bindscrolltolower(e){
      console.log("滚动到底部")
    }
  }
};
</script>

<style lang="less" scoped>
.search-box {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid #e5e5e5;
  border-bottom: 0.5px solid #e5e5e5;
  box-sizing: border-box;
  .fake {
    width: 90%;
    margin: 0 auto;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    color: #888;
    font-size: 12px;
    border-radius: 20px;
    .icon {
      display: block;
      width: 14px;
      height: 15px;
      margin-right: 5px;
    }
  }
}

.classmenu-box {
  display: flex;
  .left-list {
    width: 90px;
    background: #f7f8f5;
    .scroll-list {
      background: #f7f8f5;
      .scroll-item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        text-align: center;
        &.active {
          color: #cab894;
          font-size: 14px;
          background: #fff;
        }
      }
    }
  }
  .right-list {
    flex: 1;
    .scroll-list {
      padding:0 10px;
      box-sizing: border-box;
      .scroll-item {
        .title {
          font-size: 14px;
          margin: 10px 0;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          .link {
            flex: 0 0 33.3333%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            margin-bottom: 10px;
            .img {
              display: block;
              width: 70px;
              height: 70px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .banner-img{
      margin-top: 10px;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .img{
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>