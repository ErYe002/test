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
          <div v-for="leftItem in leftList" :class="(leftItem.ClassID == selectedParentID ? 'active ':'') + 'scroll-item'" :key="leftItem.ClassID" @click="leftItemClickEvent(leftItem.ClassID,leftItem.SEOCode)">{{leftItem.ClassName}}</div>
        </scroll-view>
      </div>
      <div class="right-list">
        <scroll-view class="scroll-list" scroll-y :style="{height: 'calc(100vh - 47px)'}" @scrolltolower="bindscrolltolower">
          <div class="banner-img" v-if="SEOCode=='pinpaiguantwo'">
            <img :src="ImageUrl" alt="" mode="heightFix" class="img">
          </div>
          <div class="scroll-item" v-for="rightItem in rightList" :key="rightItem.ClassID">
            <p class="title" v-if="SEOCode!='pinpaiguantwo'">{{rightItem.ClassName}}</p>
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
          <div  class="like-goods-wrap" >
              <ul class="list">
                <block v-if="goodsList.length > 0">
                <a
                  :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
                  class="item"
                  v-for="item in goodsList"
                  :key="item.SeoCode"
                >
                  <!-- <div class="save_money" v-if="item.SvipPrice-0>0&&item.SvipPrice-0<item.SalePrice-0">立省{{item.SaveMoney}}元</div> -->
                  <img :src="item.ImageUrl" class="img" mode="widthFix"/>
                  <p class="name">{{item.GoodsName}}</p>
                  <div class="info">
                    <!-- <div class="floor_one">
                      <span class="jifen" v-if="item.GoodsScoreText!=null&&item.GoodsScoreText!=''">{{item.GoodsScoreText}}</span>
                      <span class="quan" v-if="item.HasCoupon">券</span>
                    </div> -->
                    <div class="floor_two">
                      <span class="price-old">原价 ￥{{item.Price}}</span>
                    </div>
                    <div class="floor_three" v-if="item.SvipPrice-0>0&&item.SvipPrice-0<item.Price-0">
                      <img src="/static/images/goods_vip.png" alt="" class="img">
                      <em class="price-icon">￥</em>
                      <span class="price">{{item.SvipPrice}}</span>
                    </div>
                  </div>
                  <!-- <div class="three-piont">...</div> -->
                </a>
                </block>
              </ul>
              <p class="no-more-tips" v-if="listQuery.page == totalPage">已经到底了哦~</p>
              <p class="no-data-box" v-else-if="isNoData">抱歉，没有找到你想要的商品哦</p>
          </div>
        </scroll-view>
      </div>
    </section>
  </article>
</template>

<script>
import api from "@/api/classmenu";
import searchapi from "@/api/search";
let sourceData

export default {
  data() {
    return {
      // scHeight: 0, //scroll-view高度
      selectedParentID: '',  //左列当前选中的ParentID
        leftList:[],
        rightList:[],
        SEOCode:"",
        ImageUrl:null,
        goodsList:[],
        isLoading:false,
        isNoData:false,
        totalPage:0,
        listQuery: {
          className: "", //分类名称
          classId: "", //分类ID
          page: 1, //页码
          size:10,
          sort: 0, //排序方式：0：综合  2：销量  3：价格从小到大  4：价格从大到小
          seoCode: "", //分类seocode
          //以下数据来自筛选条件页
          brandId: "", //品牌ID
          uPrice: "", //最高价
          lPrice: "", //最低价
          attrs: [] //其余筛选条件组合
        }
    }
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
        this.SEOCode = this.leftList[0].SEOCode
        this.listQuery.classId = this.leftList[0].ClassID;
        this.listQuery.seoCode = this.leftList[0].SEOCode
        this.ImageUrl = this.leftList[0].ImageUrl
        this.changeRightData()
      });
    },
    changeRightData(){
        let rightList = sourceData.filter(ele => {
            return this.selectedParentID == ele.ClassID
        })
        this.rightList = rightList[0]['ChildAppClassDTO']
        if(this.rightList==null||this.rightList.length==0){
          this._searchGoods()
        }
    },
    leftItemClickEvent(pid,SEOCode){
        this.selectedParentID = pid
        this.SEOCode = SEOCode
        this.listQuery.classId = pid;
        this.listQuery.seoCode = SEOCode;
        //初始化商品
        this.listQuery.page = 1;
        this.isNoData = false;
        this.goodsList = [];
        this.totalPage = 0;
        this.changeRightData()
    },
    bindscrolltolower(e){
      if (this.listQuery.page < this.totalPage) {
        this.listQuery.page++;
        this._searchGoods();
      }
    },
    _searchGoods() {
      if (!this.isLoading) {
        this.isLoading = true;
        searchapi
          .getScreeningGoodsList({ ...this.listQuery })
          .then(({ Data, TotalPage }) => {
            this.goodsList =
              this.listQuery.page > 1 ? this.goodsList.concat(Data) : Data;
            this.totalPage = TotalPage;
            //webview页面跳转到原生搜索页时，只会带seocode参数，所以必须补全剩余的classid和classname
            if(this.listQuery.page == 1 && Data.length > 0 && this.$root.$mp.query.from){
              this.listQuery.classId = Data[0].ClassId
              this.listQuery.className = Data[0].ClassName
            }
            //没有搜索到任何数据
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
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
.like-goods-wrap {
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      border: 0.5px solid #E3E3E3;
      box-sizing: border-box;
      width: 125px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 8px;
      padding-bottom: 8px;
      position: relative;
      .img {
        display: block;
        width: 125px;
        height: 125px;
      }
      .name,
      .desc,
      .info {
        padding: 0 9px;
      }
      .name {
          height: 32px;
        color: #B29F7E;
        font-size: 12px;
        margin-top: 5px;
        white-space: initial;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info {
        .floor_one{
          color: #E83828;
          font-size: 8px;
          margin: 10px 0;
          .jifen{
            border: 1px solid #E83828;
            padding: 2px 5px;
            border-radius: 5px;
            margin-right: 5px;
          }
          .quan{
            border: 1px solid #E83828;
            padding: 2px 3px;
            border-radius: 5px;
          }
        }
        .floor_two{
          color: #878788;
          font-size: 10px;
        }
        .floor_three{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img{
            width: 12px;
            height: 12px;
            margin-right: 5px;
          }
          .price-icon{
            font-size: 10px;
            font-weight: bold;
          }
          .price{
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
      .save_money{
        color: #fff;
        background: #E83828;
        font-size: 10px;
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 2px;
        border-radius: 4px;
      }
      .three-piont{
        position: absolute;
        right: 10px;
        bottom: 20px;
        color: #DCDDDD;
      }
      &:nth-child(odd) {
        margin-right: 9px;
      }
    }
  }
}
 .no-more-tips,
  .no-data-box {
    color: #666;
    font-size: 12px;
    text-align: center;
    margin: 20px 0;
  }
</style>