<template>
  <article class="contain">
    <section class="top-view">
      <section :class="{'user-box': true}">
        <img class="bg" src="/static/images/member_bg.jpg" mode="scaleToFill"/>
        <img class="head" :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'" />
        <div class="info-box" v-if="token">
          <p class="name">
            <span>{{userInfoModel.Nick}}</span>
          </p>
          <!-- <p class="svip-level" v-if="userInfoModel.IsSvip">
            <span> · </span>
            <i>SVIP</i>
            <span> | </span>
            <em>{{userInfoModel.SvipBeginDate + '-' +  userInfoModel.SvipEndDate}}</em>
            <span> · </span>
          </p> -->
          <div class="level">
            <img :class="{'icon':true,'icon_1':userInfoModel.levelNum==1,'icon_2':userInfoModel.levelNum==2,
            'icon_3':userInfoModel.levelNum==3,'icon_4':userInfoModel.levelNum==4,
            'icon_5':userInfoModel.levelNum==5,'icon_6':userInfoModel.levelNum==6}" :src="'/static/images/level_0'+userInfoModel.levelNum+'.jpg'" />
            <span class="text">会员</span>
          </div>
        </div>
        <div :class="{'svip_box': true}" v-if="!token">
              <button class="userInFo_btn"
                      open-type="getUserInfo"
                      @getuserinfo="getUserInfo">立即开通</button>
        </div>
        <div :class="{'svip_box': true}" v-else>
          <div class="svip_content" v-if="userInfoModel.IsSvip">
              <div class="left">
                <div class="title">SVIP累计已省（元）</div>
                <div class="amount">{{userInfoModel.SvipDeductionTotalAmount}}</div>
              </div>
              <!-- <div class="right">
                <div class="title">返可得积分（元）</div>
                <div class="amount">500</div>
              </div> -->
          </div>
          <div class="svip_btn" v-else @click="goDredgeSvip">立即开通</div>
        </div>
      </section>
      <section class="assets-box">
        <ul class="assets-list">
          <li class="assets-item">
            <a  href="/pages/account/balance/main" class="link">
              <p class="number">{{walletModel.Balance || 0.00}}</p>
              <p class="text">余额</p>
            </a>
          </li>
          <li class="assets-item">
            <a  href="/pages/account/coupon/main" class="link">
              <p class="number">{{walletModel.CountOfCoupon || 0}}</p>
              <p class="text">优惠券</p>
            </a>
          </li>
          <li class="assets-item">
            <a  @click="toAppTips('下载可得眼镜APP可查看积分明细')" class="link">
              <p class="number">{{walletModel.Score || 0}}</p>
              <p class="text">积分</p>
            </a>
          </li>
        </ul>
      </section>
    </section>
    <section class="top-view">
      <section class="banner_box">
        <!-- 图片 -->
        <img :src="PrivilegeUrl" mode="widthFix" class="banner">
      </section>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import { mapState } from "vuex";
import authorization from "@/utils/authorization";

const userInfoModelTemp = {
  GradeName: "普通会员",
  HeadUrl: "https://pic.keede.com/app/images/login_img.png",
  Nick: "可得会员",
  OrderCountOfCustomerService: 0,
  OrderCountOfWaitDeliver: 0,
  OrderCountOfWaitEvaluate: 0,
  OrderCountOfWaitPay: 0,
  IsSvip: false
};

const walletModelTemp = {
  Balance: 0.0,
  CountOfCoupon: 0,
  Score: 0
};

export default {
  data() {
    return {
      //填充userInfoModel和walletModel的默认字段，以免控制台报错
      userInfoModel: {
        ...userInfoModelTemp
      },
      walletModel: {
        ...walletModelTemp
      },
      PrivilegeUrl:""
    };
  },
  onLoad(){
    if(this.token){
      this._getPageData();
    }else{
      this._getImg();
    }
  },
  computed: {
    ...mapState("user", ["token"])
  },
  watch: {
    token: {
      handler: function(val, oldVal) {
        console.log("token==", val);
        if (oldVal == "" && val != "") {
          //登录成功
          this._getPageData();
          this.$getCartCount()
        } else if (oldVal != '' && val == ''){
          //退出登录
          this.userInfoModel = Object.assign({}, userInfoModelTemp)
          this.walletModel = Object.assign({}, walletModelTemp)
        }
      },
      immediate: true
    }
  },
  methods: {
    getUserInfo(e) {
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
            wx.switchTab({
              url: "/pages/svip/index/main"
            });
      });
    },
    toAppTips(content) {
      wx.showModal({
        title: "提示",
        content,
        confirmColor: "#cab894"
      });
    },
    _getPageData() {
      api.getHomePageOfPersonnel().then(({ Data }) => {
        Data.OrderCountOfWaitPay = this._changeOverflowNum(
          Data.OrderCountOfWaitPay
        );
        Data.OrderCountOfWaitDeliver = this._changeOverflowNum(
          Data.OrderCountOfWaitDeliver
        );
        Data.OrderCountOfWaitEvaluate = this._changeOverflowNum(
          Data.OrderCountOfWaitEvaluate
        );
        Data.OrderCountOfCustomerService = this._changeOverflowNum(
          Data.OrderCountOfCustomerService
        );
        Data.levelNum = this._getLevelNum(Data.GradeName);
        this.userInfoModel = Object.assign({}, Data);
        this.PrivilegeUrl = Data.PrivilegeUrl
      });
      api.getWalletOfPersonnel().then(({ Data }) => {
        this.walletModel = Object.assign({}, Data);
      });
    },
    _getImg(){
      api.SvipOrderImg().then(({ Data }) => {
        this.PrivilegeUrl = Data.PrivilegeUrl;
      });
    },
    _getLevelNum(gradeName) {
      let num;
      switch (gradeName) {
        case "普通会员":
        case "普通会员价":
          num = 1;
          break;
        case "水晶会员":
        case "水晶会员价":
          num = 2;
          break;
        case "白银会员":
        case "白银会员价":
          num = 3;
          break;
        case "黄金会员":
        case "黄金会员价":
          num = 4;
          break;
        case "铂金会员":
        case "铂金会员价":
          num = 5;
          break;
        case "钻石会员":
        case "钻石会员价":
          num = 6;
          break;
        default:
          num = 0;
          break;
      }
      return num;
    },
    _changeOverflowNum(num) {
      return num > 99 ? "99+" : num;
    },
    goDredgeSvip(){
      wx.navigateTo({
          url:
            "/pages/svip/dredgeSvip/main"
        });
    }
  }
};
</script>

<style lang="less" scoped>
/* 去除按钮默认样式 */
.link {
  background: transparent;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: inherit;
  border-radius: 0;
  line-height: initial;
  color: inherit;
  &::after {
    border: none;
    border-radius: 0;
    position: absolute;
    width: 0;
    height: 0;
  }
}
.contain{
  padding:6px;
}
.top-view{
  border-radius: 10px;
  // border: 1px solid #CECECE;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 20px;
}
.svip_box{
  height: 46px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 90%;
  background-size: cover;
  background-image: url("data:image/png;base64,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");
  .svip_content{
    width: 100%;
    display: flex;
    .left,.right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 46px;
      .title{
        color: #FFF497;
        font-size: 9px;
      }
      .amount{
        color: #FFF497;
        font-size: 15px;
      }
    }
  }
  .svip_btn{
     width: 100%;
     height: 100%;
     color:#FFF497;
     font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .userInFo_btn{
    background: transparent;
    color: #FFF497;
    font-size: 15px;
    height: 46px;
    line-height: 46px;
  }
}
.user-box {
  display: flex;
  align-items: flex-start;
  height: 159px;
  position: relative;
  font-size: 15px;
  .bg {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .head {
    display: block;
    width: 74px;
    height: 74px;
    margin-left: 10px;
    border-radius: 50%;
    margin-top: 20px;
  }
  .btn {
    width: 80px;
    border-radius: 20px;
    margin-left: 10px;
    margin-top: 47px;
  }
  .info-box {
    margin-left: 10px;
    margin-top: 40px;
    .name{
      font-size: 14px;
    }
    .level {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 12px;
      height: 14.5px;
      margin-top: 10px;
      width: 55px;
      border-radius: 7.25px;
      overflow: hidden;
       .icon {
        display: block;
        width: 14.5px;
        height: 14.5px;
        padding-left: 5px;
        border-top-left-radius: 7.25px;
        border-bottom-left-radius: 7.25px;
        overflow: hidden;
      }
      .icon_1{
        background: #f7d7a4;
      }
      .icon_2{
        background: #dfb266;
      }
      .icon_3{
        background: #fcb348;
      }
      .icon_4{
        background: #e67810;
      }
      .icon_5{
        background: #dd341f;
      }
      .icon_6{
        background: #b123df;
      }
      .text {
        flex: 1;
        text-align: center;
        background: #000;
      }
    }
  }
}
.assets-box {
  font-size: 12px;
  color: #666;
  .assets-list {
    display: flex;
    align-items: center;
    .assets-item {
      flex: 1;
      .link {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin: 10px 0;
        .number {
          color: red;
          font-size: 14px;
        }
      }

      &:nth-child(2) {
        .link {
          border-left: 0.5px solid #D1CED1;
          border-right: 0.5px solid #D1CED1;
          box-sizing: border-box;
        }
      }
    }
  }
}
.order-nav-box {
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 15px;
    box-sizing: border-box;
    font-size: 14px;
    background: #CBB795;
    color: #fff;
    height: 26.5px;
    .link {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;
      .icon {
        display: block;
        width: 7px;
        height: 12px;
        margin-left: 7px;
      }
    }
  }
  .list {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .item {
      flex: 0 0 25%;
      .link {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #666;
        .dot {
          position: absolute;
          left: 55%;
          top: -2px;
          z-index: 1;
          background: #e31436;
          padding: 1px 5px;
          border-radius: 8px;
          font-size: 10px;
          color: #fff;
        }
        .icon {
          display: block;
          width: 30px;
          height: 30px;
          margin-bottom: 5px;
        }
      }
    }
  }
}

.service-box:extend(.order-nav-box all) {
  .list {
    .item {
      .link {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #666;
        .icon {
          display: block;
          width: 30px;
          height: 30px;
          margin-bottom: 5px;
        }
      }
    }
  }
}

.banner_box{
  // height: 250px;
  .banner{
    width: 100%;
    height: 100%;
  }
}

</style>