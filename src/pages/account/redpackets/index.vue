<template>
  <article>
    <section class="top-box">
        <div class="red-value">
          <div class="icon">
            <img class="icon-img" src="/static/images/red_icon.png" alt="">
          </div>
          <div class="value">
            <div>红包余额</div>
            <div>￥{{model.PresentBalance}}</div>
          </div>
        </div>
        <div class="title">
            <div class="title-des">
              <div class="des">您的红包中有{{model.ExpireInfo?model.ExpireInfo.ExpireBalance:0}}元将于{{model.ExpireInfo?model.ExpireInfo.ExpireDate:''}}日到期</div>
              <div class="labels">红包明细</div>
            </div>
        </div>
        <div class="qa">常见问题</div>
    </section>
    <section class="red-detail">
        <div class="detail_list">
            <div 
                class="item"
                v-for="(item,index) in detailsList" 
                :key="index">
                <div class="left">
                  <div class="title">{{item.BalanceFlowKindName}}</div>
                  <div class="date">{{item.CreateTimeStr}}</div>
                </div>
                <div class="right" v-if="item.Amount>0">+ {{item.Amount}}</div>
                <div class="right_out" v-if="item.Amount<0">-{{item.Amount}}</div>
            </div>
            <div class="no-more-tips" v-if="isNoData">
              <p>暂无数据</p>
            </div>
        </div>
        <p class="no-more-tips" v-if="page == totalPage">没有更多了</p>
    </section>
    <div  class="bgcolor"></div>
  </article>

</template>

<script>
import api from "@/api/user";
import authorization from "@/utils/authorization";
import { mapState } from "vuex";
import utils from "@/utils"; 

export default {
  data() {
    return {
      model:"",
      page: 1,
      size: 10,
      goodsType:0,
      totalPage:0,
      isLoding:false,
      detailsList:[],
      isNoData:false
    };
  },
  onLoad(){
    this._getPageData();
    this.GetRedPackageDetail()
  },
  onReachBottom() {
      if (this.page < this.totalPage) {
        this.page++;
        this._getGoodsListData();
      }
    },
  methods: {
    toAppTips(content) {
      wx.showModal({
        title: "提示",
        content,
        confirmColor: "#cab894"
      });
    },
    _getPageData() {
      api.GetRedPackage().then(({ Data }) => {
        this.model = Object.assign({}, Data);
      });
    },
    error(r){
      this.userInfoModel.HeadUrl = 'https://pic.keede.com/app/images/login_img.png';
    },
    //获取猜你喜欢商品列表
    GetRedPackageDetail() {
      if (!this.isLoding) {
        this.isLoding = true;
        wx.hideLoading();
        api
          .GetRedPackageDetail(this.page, this.size)
          .then(({ Data, TotalPage }) => {
              let list = Data;
              this.detailsList =
                this.page > 1 ? this.detailsList.concat(list) : list;
              this.totalPage = TotalPage;
            
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
              this.totalPage = 0
            }
          })
          .finally(() => {
            this.isLoding = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
/* 去除按钮默认样式 */
.bgcolor{
  background: #F6F6F6;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  z-index: -1;
}
.top-box{
  box-sizing: border-box;
  background: #FF668E;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  .red-value{
    margin-left: 26.5px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
    .icon{
      margin-right: 10px;
      .icon-img{
        width: 14.5px;
        height: 13.5px;
      }
    }
    .value{
      font-size: 20px;
      color: #FEFEFE;
      display: flex;
      flex-direction: column;
    }
  }
  .title{
    width: 100%;
    .title-des{
      height: 80px;
      background: #fff;
      margin: 0 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .des{
        font-size: 12px;
        margin-bottom: 10px;
        color: #898989;
      }
      .labels{
        font-size: 20px;
        color: #000;
        font-weight: 550;
      }
    }
  }
  .qa{
    color: #FAE6AB;
    font-size: 12px;
    background: #313131;
    position: absolute;
    right: 0;
    top: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 2px 8px;
  }
}
.red-detail{
  padding: 0 10px;
    padding-bottom: 30px;
  .detail_list{
    background: #fff;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      border-bottom: 0.5px solid #E5E5E5;
      .left{
        display: flex;
        flex-direction: column;
        .title{
          color: #383838;
          font-size: 15px;
          font-weight: 500;
        }
        .date{ 
          color: #898989;
          font-size: 12px;
        }
      }
      .right{
        font-weight: 500;
        color: #FF7C7C;
        font-size: 18px;
      }
      .right_out{
        color: #000;
      }
      &:last-child{
        border: 0;
      }
    }

  }
}
.no-more-tips{
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 12px;
}
</style>