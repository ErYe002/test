<template>
  <article>
    <section class="pro">
      <!-- 轮播 -->
      <div class="proImgBoxCon">
        <swiper  autoplay="true" circular="true" interval="3000" duration="1000" @change='bannerChange'>
          <block v-for="item in background" :key="item.index">
            <swiper-item>
              <img
                src="https://pic.keede.com/extend/15c240e0-bd4c-461a-a646-cac242acda70-750-750.jpg"
                alt
                mode="widthFix"
              />
            </swiper-item>
          </block>
        </swiper>
        <div class="typeChange">
          <a class="videoBtn selected"></a>
          <a class="picBtn"></a>
        </div>
        <cover-view class='pic-indecator' >
        {{bannerIndicator}}/4
        </cover-view>
      </div>
      <!-- 品类切换 -->
      <div class="proType">
        <div class="closeproType selected"></div>
        <div class="typeCon">
          <ul>
            <li class="selected">
              <a href>
                <img
                  src="https://pic.keede.com/extend/9b2cd747-45a2-41d1-a7c5-c4ce49d44de4-45-45.jpg"
                  onerror="this.src = 'https://pic.keede.com//app/images/goods_errimg.png'"
                />
                <span></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品属性 -->
      <div class="proInfo">
        <div class="proInfoTop">
          <div class="proprice">
            <div class="truePrice">
              <em>￥</em>
              <span>99.99</span>
            </div>
            <div class="priceMsg">
              <i class="price">
                <em class="oldPrice">￥99.99</em> ↓9.99￥
              </i>
              <span class="priceTag memberLever_6">
                <em class="tagImg"></em>会员价
              </span>
            </div>
          </div>
          <div class="prolabelBox">
            <div class="prolabel">
              <span>快递: 满80包邮</span>
              <span>已售: 2680件</span>
              <span class="proloveNum">
                <i>♡</i>58
              </span>
            </div>
            <div class="prolabel">
              <span class="label">
                <em class="icon"></em>正品保障
              </span>
              <span class="label">
                <em class="icon"></em>贴心客服
              </span>
              <span class="label">
                <em class="icon"></em>极速物流
              </span>
            </div>
          </div>
        </div>
        <div class="proInfoBottom">
          <div class="labelImg">
            <div class="overseaTag"></div>
            <div class="addTag">
              <img src="https://pic.keede.com//app/countryimages/日本.jpg" mode="widthFix" />
            </div>
          </div>
          <div class="proNameBox">
            <div class="proName">xxxxx隐形眼镜xxxx护理液xxxxxxxxxxxxxxxxxxxasdasdsa啊实打实的啊实打实的</div>
            <div class="proAdd">日本</div>
            <div class="proDes">这里是商品描述啊实打实啊实打实的</div>
          </div>
        </div>
      </div>
      <!-- 优惠活动一览 -->
      <div class="blackLine">FULL OFFER | 优惠满满</div>
      <div class="actCon">
        <div class="act-lingquan actLine">
          <span class="act-name">领券</span>
          <span class="coupon">满0.01-10</span>
          <span class="coupon">满0.01-10</span>
          <span class="act-info">
            领券
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-jifen actLine">
          <span class="act-name">积分</span>
          <span class="act-con">购买送9999积分</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-dikou actLine">
          <span class="act-name">抵扣</span>
          <span class="act-con">积分至多抵扣￥999</span>
        </div>
        <div class="act-zengpin actLine">
          <span class="act-name">赠品</span>
          <span class="act-con">商品xxxxxxxxxxxxxx</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-manzeng actLine">
          <span class="act-name">满赠</span>
          <span class="act-con">商品xxxxxxxxxxxxxx</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-huangou actLine">
          <span class="act-name">换购</span>
          <span class="act-con">加￥5换购商品xxxxxxxx</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-manjian actLine">
          <span class="act-name">满减</span>
          <span class="act-con">满￥5减低999999</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
        <div class="act-peijian actLine">
          <span class="act-name">配件</span>
          <span class="act-con">配件xxxxxxxx</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
      </div>
      <!-- 海淘明细 -->
      <div class="blackLine">SEA SCOURING | 海淘明细</div>
      <div class="actCon">
        <div class="act-wuliu actLine">
          <span class="act-name">物流</span>
          <span class="act-con">
            <img src="https://pic.keede.com//app/images/wuliu2.png" mode="widthFix" />
          </span>
        </div>
        <div class="act-shuifei actLine">
          <span class="act-name">税费</span>
          <span class="act-con">进口税 商家承担</span>
          <span class="act-info">
            税费说明
            <span class="icon"></span>>
          </span>
        </div>
      </div>
      <!-- 套餐组合 -->
      <div class="actCon">
        <div class="act-taocan actLine">
          <span class="act-name">套餐组合</span>
          <span class="act-info">
            更多套餐
            <span class="icon"></span>>
          </span>
        </div>
      </div>
      <div class="compBox">
        <div class="tczh-note">
          套餐商品不参与单品活动，最高可省下￥
          <em>165</em>&nbsp;共1款
        </div>
        <div class="tczh-title">
          <div class="tczh-notelist">
            <div class="tczh-note-1">
              套餐1
              <em>￥159</em>
              <i>立省￥165</i>
            </div>
          </div>
          <div class="tczh-namelist">
            <div class="select">套餐1</div>
          </div>
        </div>
        <div class="tczh-proListBox">
          <swiper display-multiple-items="3.5">
            <block v-for="item in background" :key="item.index">
              <swiper-item>
                <view class="tczh-item">
                  <div>
                    <img
                      src="https://pic.keede.com/MobileMain/67fd7524-5032-4b55-bc76-030890a2d3ee-150-150.jpg"
                    />
                  </div>
                  <span>ReVIA蕾美彩色日抛10片装-迷雾深灰 MIst Iris（Namie同款）</span>
                  <em>￥53</em>
                </view>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
      <!-- 功能参数 -->
      <div class="blackLine">FUNCTION PARAMETER | 功能参数</div>
      <div class="actCon">
        <div class="act-canshu actLine">
          <span class="act-name">参数</span>
          <span class="act-con">商品编码 品牌 周期...</span>
          <span class="act-info">
            <span class="icon"></span>>
          </span>
        </div>
      </div>
      <div class="xuanGou">
        <span class="xuanGou-name">选购</span>
      </div>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import { mapState } from "vuex";

export default {
  data() {
    return {
      background: ["demo-text-1", "demo-text-2", "demo-text-3", "demo-text-4"],
      bannerIndicator: '1',
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
        Balance: 0.0,
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
      this._getPageData();
  },
  methods: {
     bannerChange: function(e) {
      this.bannerIndicator = e.target.current + 1;
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
      });
      api.getWalletOfPersonnel().then(({ Data }) => {
        this.walletModel = Object.assign({}, Data);
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
   
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>