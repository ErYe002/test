<template>
  <article>
    <section class="user-box">
      <img class="bg" src="/static/images/member_bg.jpg" mode="aspectFit" />
      <img
        class="head"
        :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'"
      />
      <a href="/pages/account/login/main" v-if="!token" class="btn">立即登录</a>
      <div v-else class="info-box">
        <p class="name">{{userInfoModel.Nick}}</p>
        <p class="level">
          <img
            class="icon"
            :src="'/static/images/level_0'+userInfoModel.levelNum+'.jpg'"
          />
          <span class="text">会员</span>
        </p>
      </div>
    </section>
    <section class="assets-box">
      <ul class="assets-list">
        <li class="assets-item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <p class="number">{{walletModel.Balance || 0.00}}</p>
            <p class="text">余额</p>
          </a>
        </li>
        <li class="assets-item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <p class="number">{{walletModel.CountOfCoupon || 0}}</p>
            <p class="text">优惠券</p>
          </a>
        </li>
        <li class="assets-item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <p class="number">{{walletModel.Score || 0}}</p>
            <p class="text">积分</p>
          </a>
        </li>
      </ul>
    </section>
    <section class="order-nav-box">
      <div class="title">
        <div class="text">我的订单</div>
        <a :href="!token ? loginUrl:'/pages/account/order/list/main?queryState=0'" class="link">
          <span>查看全部</span>
          <img src="/static/images/icon_right_grey.png" class="icon" />
        </a>
      </div>
      <ul class="list">
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/account/order/list/main?queryState=3'" class="link">
            <span
              class="dot"
              v-if="userInfoModel.OrderCountOfWaitPay > 0"
            >{{userInfoModel.OrderCountOfWaitPay}}</span>
            <img class="icon" src="/static/images/home_waitpay.png" />
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/account/order/list/main?queryState=4'" class="link">
            <span
              class="dot"
              v-if="userInfoModel.OrderCountOfWaitDeliver > 0"
            >{{userInfoModel.OrderCountOfWaitDeliver}}</span>
            <img class="icon" src="/static/images/home_waitdeliver.png" />
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/account/order/list/main?queryState=6'" class="link">
            <span
              class="dot"
              v-if="userInfoModel.OrderCountOfWaitEvaluate > 0"
            >{{userInfoModel.OrderCountOfWaitEvaluate}}</span>
            <img class="icon" src="/static/images/home_waitEvaluate.png" />
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/account/order/list/main'" class="link">
            <span
              class="dot"
              v-if="userInfoModel.OrderCountOfCustomerService > 0"
            >{{userInfoModel.OrderCountOfCustomerService}}</span>
            <img class="icon" src="/static/images/home_tuihuan.png" />
          </a>
        </li>
      </ul>
    </section>
    <section class="service-box">
      <p class="title">我的服务</p>
      <ul class="list">
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_mygroup.png" class="icon" />
            <p class="text">我的拼团</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_collection.png" class="icon" />
            <p class="text">我的收藏</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_address.png" class="icon" />
            <p class="text">收货地址</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? '/pages/account/setting/role/main':'/pages/index/main'" class="link">
            <img src="/static/images/home_set.png" class="icon" />
            <p class="text">设置</p>
          </a>
        </li>
      </ul>
    </section>
    <section class="function-box">
      <p class="title">更多功能</p>
      <ul class="list">
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_customeonline.png" class="icon" />
            <p class="text">在线客服</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_callcustome.png" class="icon" />
            <p class="text">电话客服</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_feedback.png" class="icon" />
            <p class="text">我要告状</p>
          </a>
        </li>
        <li class="item">
          <a :href="!token ? loginUrl:'/pages/index/main'" class="link">
            <img src="/static/images/home_security.png" class="icon" />
            <p class="text">账户安全</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import { mapState } from "vuex";

export default {
  data() {
    return {
      //填充userInfoModel和walletModel的默认字段，以免控制台报错
      userInfoModel: {
        GradeName: "普通会员",
        HeadUrl: "https://pic.keede.com//app/images/login_img.png",
        Nick: "可得会员",
        OrderCountOfCustomerService: 0,
        OrderCountOfWaitDeliver: 0,
        OrderCountOfWaitEvaluate: 0,
        OrderCountOfWaitPay: 0
      },
      walletModel: {
        Balance: 0.00,
        CountOfCoupon: 0,
        Score: 0
      },
      loginUrl: "/pages/account/login/main"
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  mounted() {
    // console.log(this.token);
    if (this.token) {
      this._getPageData();
    }
  },
  methods: {
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
      });
      api.getWalletOfPersonnel().then(({ Data }) => {
        this.walletModel = Object.assign({}, Data);;
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
    }
  }
};
</script>

<style lang="less" scoped>
.user-box {
  display: flex;
  align-items: center;
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
    width: 80px;
    height: 80px;
    margin-left: 30px;
    border-radius: 50%;
  }
  .btn {
    background: #cab894;
    color: #fff;
    padding: 4px 7px;
    border-radius: 2px;
    margin-left: 10px;
  }
  .info-box {
    margin-left: 10px;
    .level {
      display: flex;
      align-items: center;
      background: #000;
      color: #fff;
      font-size: 12px;
      height: 14.5px;
      margin-top: 10px;
      width: 55px;
      .icon {
        display: block;
        width: 14.5px;
        height: 14.5px;
      }
      .text {
        flex: 1;
        text-align: center;
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
    border-bottom: 0.5px solid #e3e3e3;
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
          border-left: 0.5px solid #e3e3e3;
          border-right: 0.5px solid #e3e3e3;
          box-sizing: border-box;
        }
      }
    }
  }
}
.order-nav-box {
  border-bottom: 5px solid #e3e3e3;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
    .link {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #888;
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
      flex: 1;
      .link {
        position: relative;
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
          width: 50px;
          height: 50px;
          margin: 0 auto;
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

.function-box:extend(.service-box all) {
  border-bottom: none;
}
</style>