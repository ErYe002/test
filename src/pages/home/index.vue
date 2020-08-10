<template>
  <article class="bgcolor">
    <section class="top-box">
      <section :class="{'user-box': true}">
        <img class="bg" src="/static/images/member_bg.jpg" mode="scaleToFill"/>
        <img class="head" :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'" @error="error"/>
        <button
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
          v-if="!token"
          class="kd-btn btn btn-small"
        >立即登录</button>
        <div v-else class="info-box">
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
            <img :class="{'icon':true}" :src="'/static/images/level_0'+userInfoModel.levelNum+'.jpg'" />
            <span class="text">会员</span>
            <img v-if="userInfoModel.IsSvip" :class="{'svip_icon':true}" :src="'/static/images/svip_icon.png'" />
          </div>
        </div>
      </section>
      <section class="assets-box">
        <ul class="assets-list">
          <li class="assets-item">
            <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!token" class="link">
              <p class="number">0</p>
              <p class="text">SVIP已节省</p>
            </button>
            <a v-else  class="link">
              <p class="number">{{userInfoModel.SvipDeductionTotalAmount || 0.00}}</p>
              <p class="text">SVIP已节省</p>
            </a>
          </li>
          <li class="assets-item">
            <button
              open-type="getUserInfo"
              @getuserinfo="getUserInfo"
              data-link="/pages/account/balance/main"
              v-if="!token"
              class="link"
            >
              <p class="number">0.00</p>
              <p class="text">余额</p>
            </button>
            <a v-else href="/pages/account/balance/main" class="link">
              <p class="number">{{walletModel.Balance || 0.00}}</p>
              <p class="text">余额</p>
            </a>
          </li>
          <li class="assets-item">
            <button
              open-type="getUserInfo"
              @getuserinfo="getUserInfo"
              data-link="/pages/account/coupon/main"
              v-if="!token"
              class="link"
            >
              <p class="number">0</p>
              <p class="text">优惠券</p>
            </button>
            <a v-else href="/pages/account/coupon/main" class="link">
              <p class="number">{{walletModel.CountOfCoupon || 0}}</p>
              <p class="text">优惠券</p>
            </a>
          </li>
          <li class="assets-item">
            <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!token" class="link">
              <p class="number">0</p>
              <p class="text">积分</p>
            </button>
            <a v-else @click="toAppTips('下载可得眼镜APP可查看积分明细')" class="link">
              <p class="number">{{walletModel.Score || 0}}</p>
              <p class="text">积分</p>
            </a>
          </li>
        </ul>
        <div :class="{'noSvip_box': !userInfoModel.IsSvip,'svip_box': userInfoModel.IsSvip}">
            <div class="svip_tips">
              SVIP会员
            </div>
            <div class="svip_time" v-if="userInfoModel.IsSvip">{{userInfoModel.SvipBeginDate}}——{{userInfoModel.SvipEndDate}}</div>
            <div class="svip_content" v-else>尊享会员特权</div>
            <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!token" class="btn_vip" >
                <span class="btn_vip_text">查看详情</span>
                <i class="icon_right"></i>
            </button>
            <div v-else class="btn_vip" @click="goSvipDetail">
              <span class="btn_vip_text">查看详情</span>
              <i class="icon_right"></i>
            </div>
        </div>
      </section>
    </section>
    <article class="contain">
      <section class="top-view">
        <section class="order-nav-box">
          <div class="title">
            <div class="text">我的订单</div>
            <button
              open-type="getUserInfo"
              @getuserinfo="getUserInfo"
              v-if="!token"
              data-link="/pages/account/order/list/main?queryState=0"
              class="link"
            >
              <span>查看全部</span>
              <img src="/static/images/icon_right_light.png" class="icon" />
            </button>
            <a v-else href="/pages/account/order/list/main?queryState=0" class="link">
              <span>查看全部订单</span>
              <img src="/static/images/icon_right_grey.png" class="icon" />
            </a>
          </div>
          <ul class="list">
            <li class="item" @click="onTD('待付款')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/order/list/main?queryState=3"
                class="link"
              >
                <img class="icon" src="/static/images/home_waitpay.png" />
                <p class="text">待付款</p>
              </button>
              <a v-else href="/pages/account/order/list/main?queryState=3" class="link">
                <span
                  class="dot"
                  v-if="userInfoModel.OrderCountOfWaitPay > 0"
                >{{userInfoModel.OrderCountOfWaitPay}}</span>
                <img class="icon" src="/static/images/home_waitpay.png" />
                <p class="text">待付款</p>
              </a>
            </li>
            <li class="item" @click="onTD('待发货')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/order/list/main?queryState=4"
                class="link"
              >
                <img class="icon" src="/static/images/home_waitdeliver.png" />
                <p class="text">待发货</p>
              </button>
              <a v-else href="/pages/account/order/list/main?queryState=4" class="link">
                <span
                  class="dot"
                  v-if="userInfoModel.OrderCountOfWaitDeliver > 0"
                >{{userInfoModel.OrderCountOfWaitDeliver}}</span>
                <img class="icon" src="/static/images/home_waitdeliver.png" />
                <p class="text">待发货</p>
              </a>
            </li>
            <li class="item" @click="onTD('待评价')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/order/list/main?queryState=6"
                class="link"
              >
                <img class="icon" src="/static/images/home_waitEvaluate.png" />
                <p class="text">待评价</p>
              </button>
              <a v-else href="/pages/account/order/list/main?queryState=6" class="link">
                <span
                  class="dot"
                  v-if="userInfoModel.OrderCountOfWaitEvaluate > 0"
                >{{userInfoModel.OrderCountOfWaitEvaluate}}</span>
                <img class="icon" src="/static/images/home_waitEvaluate.png" />
                <p class="text">待评价</p>
              </a>
            </li>
            <li class="item" @click="onTD('退换货')">
              <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!token" class="link">
                <img class="icon" src="/static/images/home_tuihuan.png" />
                <p class="text">退换货</p>
              </button>
              <a v-else @click="toAppTips('可得小程序暂时不支持退换货功能哦，请下载可得眼镜APP使用此功能或者联系在线客服')" class="link">
                <span
                  class="dot"
                  v-if="userInfoModel.OrderCountOfCustomerService > 0"
                >{{userInfoModel.OrderCountOfCustomerService}}</span>
                <img class="icon" src="/static/images/home_tuihuan.png" />
                <p class="text">退换货</p>
              </a>
            </li>
          </ul>
        </section>
      </section>
      <section class="top-view">
        <section class="service-box">
          <p class="title">我的应用</p>
          <ul class="list">
            <li class="item" @click="onTD('我的拼团')">
              <navigator
                open-type="navigate"
                target="miniProgram"
                app-id="wxbb2e8b1089947444"
                class="link"
                version="release"
              >
                <img src="/static/images/home_mygroup.png" class="icon" />
                <p class="text">我的拼团</p>
              </navigator>
            </li>
            <li class="item" @click="onTD('我的收藏')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/favorites/main"
                class="link"
              >
                <img src="/static/images/home_collection.png" class="icon" />
                <p class="text">我的收藏</p>
              </button>
              <a v-else href="/pages/account/favorites/main" class="link">
                <img src="/static/images/home_collection.png" class="icon" />
                <p class="text">我的收藏</p>
              </a>
            </li>
            <li class="item" @click="onTD('收货地址')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/address/addressList/main"
                class="link"
              >
                <img src="/static/images/home_address.png" class="icon" />
                <p class="text">收货地址</p>
              </button>
              <a v-else href="/pages/account/address/addressList/main" class="link">
                <img src="/static/images/home_address.png" class="icon" />
                <p class="text">收货地址</p>
              </a>
            </li>
          </ul>
        </section>
      </section>
      <section class="top-view">
        <section class="function-box">
          <p class="title">我的服务</p>
          <ul class="list">
            <li class="item" @click="onTD('微信客服')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                class="link"
              >
                <img src="/static/images/home_wxicon.png" class="icon" />
                <p class="text">微信客服</p>
              </button>
              <a v-else @click="_alertWx" class="link">
                <img src="/static/images/home_wxicon.png" class="icon" />
                <p class="text">微信客服</p>
              </a>
            </li>
            <li class="item" @click="onTD('在线客服')">
              <button open-type="contact" class="link">
                <img src="/static/images/home_customeonline1.png" class="icon" />
                <p class="text">在线客服</p>
              </button>
            </li>
            <li class="item" @click="onTD('电话客服')">
              <a @click="contactServiceByPhone" class="link">
                <img src="/static/images/home_callcustome.png" class="icon" />
                <p class="text">电话客服</p>
              </a>
            </li>
            <li class="item" @click="onTD('我要告状')">
                <button
                  open-type="getUserInfo"
                  @getuserinfo="getUserInfo"
                  v-if="!token"
                  class="link"
                >
                  <img src="/static/images/home_feedback1.png" class="icon" />
                  <p class="text">我要告状</p>
                </button>
                <a v-else @click="_alertGz" class="link">
                  <img src="/static/images/home_feedback1.png" class="icon" />
                  <p class="text">我要告状</p>
                </a>
            </li>
            <li class="item" @click="onTD('账户设置')">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/account/setting/home/main"
                class="link"
              >
                <img src="/static/images/home_set.png" class="icon" />
                <p class="text">账户设置</p>
              </button>
              <a v-else href="/pages/account/setting/home/main" class="link">
                <img src="/static/images/home_set.png" class="icon" />
                <p class="text">账户设置</p>
              </a>
            </li>
            <!-- <li class="item">
              <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                v-if="!token"
                data-link="/pages/index/main"
                class="link"
              >
                <img src="/static/images/home_security.png" class="icon" />
                <p class="text">账户安全</p>
              </button>
              <a v-else href="/pages/index/main" class="link">
                <img src="/static/images/home_security.png" class="icon" />
                <p class="text">账户安全</p>
              </a>
            </li> -->
          </ul>
        </section>
      </section>
    </article>
    <section class="more-like" v-if="goodsList != null && goodsList.length > 0">
      <div class="title">猜你喜欢</div>
      <article class="goods_nav_goods">
        <div class="goods_list">
          <block v-if="goodsList != null && goodsList.length > 0">
              <block 
                v-for="(item,index) in goodsList" 
                :key="index">
                <a
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=false'"
                class="item"
                v-if="index<4"
                @click="onTD('我的下方商品点击量',1,item.GoodsId)"
                >
                <div>
                    <img :src="item.ImageUrl" class="img" />
                </div>
                <div class="content">
                    <div class="goodsName">{{item.GoodsName}}</div>
                    <div class="integral">
                    <span class="integral_pont" v-if="item.GoodsScoreText!=null&&item.GoodsScoreText!=''">{{item.GoodsScoreText}}</span></div>
                    <div class="price">
                    <div class="price-left">
                        <div class="old">原价￥{{item.SalePrice}}</div>
                        <div class="svip" v-if="item.SvipPrice-0>0&&item.SvipPrice-0<item.SalePrice-0">
                            <span class="svip-price">￥{{item.SvipPrice}}</span>
                            <span class="svip-icon">SVIP价</span>
                        </div>
                    </div>
                    <div class="price-right" v-if="item.SvipPrice-0>0&&item.SvipPrice-0<item.SalePrice-0">
                        <img src="/static/images/bg_car.png" alt="" class="bg-price">
                        <span class="mar-price">￥{{item.SaveMoney}}</span>
                        <span class="triangle"></span>
                    </div>
                    </div>
                </div>
                </a>
            </block>
          </block>
        </div>
        <div class="goods_more" v-if="HasMore">
          <a :href="'/pages/search/goodsList/main?channelId='+id+'&channelTitle='+channelTitle" class="goods_more_text">
            查看更多商品 >
          </a>
        </div>
      </article>
    </section>
      <!-- 微信客服 -->
    <centerFlip :isShow.sync="isShowWxCodeUrl" @hide="_close">
      <div class="contact_wx" @click="_loadCode(CodeUrl)">
        <img :src="CodeImgUrl" alt="" mode='widthFix' class="action_btn">
        <img :src="CodeUrl" alt="" class="codeurl">
      </div>
    </centerFlip>
      <!-- 我要告状 -->
    <centerFlip :isShow.sync="isShowGzCodeUrl" @hide="_closeGz">
      <div class="contact_wx" @click="_loadCode(GzCodeUrl)">
        <img :src="GzImgUrl" alt="" mode='widthFix' class="action_btn">
        <img :src="GzCodeUrl" alt="" class="codeurl">
      </div>
    </centerFlip>
  </article>

</template>

<script>
import api from "@/api/user";
import goodsapi from "@/api";
import authorization from "@/utils/authorization";
import centerFlip from "@/components/centerFlip";
import { mapState } from "vuex";
import utils from "@/utils"; 
const TDSDK = require('../../../static/tdsdk/tdweapp'); 

const userInfoModelTemp = {
  GradeName: "普通会员",
  HeadUrl: "https://pic.keede.com/app/images/login_img.png",
  Nick: "可得会员",
  OrderCountOfCustomerService: 0,
  OrderCountOfWaitDeliver: 0,
  OrderCountOfWaitEvaluate: 0,
  OrderCountOfWaitPay: 0,
  IsSvip: false,
  SvipDeductionTotalAmount:0
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
      isShowWxCodeUrl:false,
      isShowGzCodeUrl:false,
      CodeUrl:"",
      CodeImgUrl:"",
      GzCodeUrl:"",
      GzImgUrl:"",
      page: 1,
      size: 10,
      goodsType:0,
      totalPage:0,
      isLoding:false,
      goodsList:[]
    };
  },
   components: {
    centerFlip
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
          this._getGoodsListData()
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
  onShow(){
     let value = wx.getStorageSync('isSvipRedirect');
    if(value){
       wx.setStorageSync('isSvipRedirect',false)
        this._getPageData();
        this.$getCartCount()
        this._getGoodsListData()
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    if (this.token) {
      this._getPageData();
      this._getGoodsListData()
    }
  },
  methods: {
    getUserInfo(e) {
      const link = e.mp.currentTarget.dataset.link || "";
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
        if (link) {
          if (
            link.indexOf("/pages/index/main") != -1 ||
            link.indexOf("/pages/classmenu/main") != -1 ||
            link.indexOf("/pages/cart/main") != -1
          ) {
            wx.switchTab({
              url: link
            });
          } else {
            wx.navigateTo({
              url: link
            });
          }
        }
      });
    },
    contactServiceByPhone() {
      wx.makePhoneCall({
        phoneNumber: "4006-20-20-20"
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
    goSvipDetail(){
       wx.switchTab({
          url:
            "/pages/svip/index/main"
        });
    },
    _alertWx(){ 
      if(!this.CodeUrl){
        api.getCustomerService().then(({ Data }) => {
          this.CodeUrl = Data.WeChatQrCodeUrl;
          this.CodeImgUrl = Data.IllustrationUrl;
          this.isShowWxCodeUrl = !this.isShowWxCodeUrl
        });
      }else{
         this.isShowWxCodeUrl = !this.isShowWxCodeUrl
      }
    },
    _alertGz(){
        if(!this.GzCodeUrl){
          api.getFeedBack().then(({ Data }) => {
            this.GzCodeUrl = Data.WeChatQrCodeUrl;
            this.GzImgUrl = Data.IllustrationUrl;
            this.isShowGzCodeUrl = !this.isShowGzCodeUrl
          });
        }else{
          this.isShowGzCodeUrl = !this.isShowGzCodeUrl
        }
    },
    _close(){
      this.isShowWxCodeUrl = false
    },
     _closeGz(){
      this.isShowGzCodeUrl = false
    },
    _loadCode(url){
      const _this = this
      wx.downloadFile({
        url: url, 
        success (result) {
          if (result.tempFilePath) {
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      _this.savePhoto(result.tempFilePath)
                    },
                    fail(e) {
                      wx.hideLoading()
                      //authorize:fail auth deny  如果用户拒绝授权后，短期内调用不会出现弹窗，而是直接进入 fail 回调
                      console.log('authorize', e)
                      //弹出设置页面让用户手动开启相册权限
                      wx.showModal({
                        title: '提示',
                        content: '请在即将打开的设置页中，打开保存到相册的权限',
                        showCancel: false,
                        confirmColor: '#cab894',
                        success() {
                          wx.openSetting({
                            success(res) {
                              console.log(res.authSetting)
                              // res.authSetting = {
                              //   "scope.userInfo": true,
                              //   "scope.userLocation": true
                              // }
                            }
                          })
                        }
                      })
                    }
                  })
                } else {
                  _this.savePhoto(result.tempFilePath)
                }
              }
            })
          }
        },
        fail(err){
          console.log(err)
        }
      })
    },
    savePhoto(src) {
      let _this = this
      wx.saveImageToPhotosAlbum({
        filePath: src,
        success() {
          wx.hideLoading()
          wx.showToast({
            title: '已保存',
            duration: 2000,
            mask: true
          })
          setTimeout(() => {
            _this._close()
          }, 2000)
        },
        fail(e) {
          console.log(e)
          wx.hideLoading()
        }
      })
    },
    error(r){
      this.userInfoModel.HeadUrl = 'https://pic.keede.com/app/images/login_img.png';
    },
    //获取猜你喜欢商品列表
    _getGoodsListData() {
      if (!this.isLoding) {
        this.isLoding = true;
        wx.hideLoading();
        goodsapi
          .getHomePageGoods(this.page, this.size,this.goodsType)
          .then(({ Data, TotalPage }) => {
            if (Data != null && Data.length > 0) {
              let list = Data.map(ele => {
                //当PriceLabel中的价格含有“.00”时，进行去除
                if (/\d+.\d+/.test(ele.PriceLabel)) {
                  ele.PriceLabel = ele.PriceLabel.replace(/(\d+).00/g, "$1");
                }
                return ele;
              });
              this.goodsList =
                this.page > 1 ? this.goodsList.concat(list) : list;
              this.totalPage = TotalPage;
            }
          })
          .finally(() => {
            this.isLoding = false;
          });
      }
    },
    //统计
    onTD(name,type,GoodsId){
      TDSDK.Event.event({id: type==1?name:"mine_"+name})
      
       this.$onInformationCollection({
        token:"WeChat",
        uid:wx.getStorageSync('USERID'),
        opentype:"click",
        time:Date.now().toString(),
        page:utils.getCurrentPageUrl(),
        eventname:type==1?name:"mine_"+name,
        eventval:type==1?JSON.stringify({"GoodsId":GoodsId}):""
      })
    }
  }
};
</script>

<style lang="less" scoped>
/* 去除按钮默认样式 */
.bgcolor{
  background: #F6F6F6;
}
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
  padding:0px 10px;
}
.top-box{
  box-sizing: border-box;
  margin-bottom: 50px;
  background: #FF668E;
}
.top-view{
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 14px;
}
.svip_box{
  height: 55px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -35px;
  margin: 0 auto;
  width: 94%;
  background-size: cover;
    display: flex;
  align-items: center;
  justify-content: space-around;
  background: #313131;
  border-radius: 10px;
  // background-image: url("data:image/png;base64,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");
  .svip_tips{
    color: #FFF497;
    font-size: 13px;
  }
  .svip_time{
    color: #FFF497;
    font-size: 9px;
  }
  .btn_vip{
      background: #FAE5AA;
      width: 80px;
      height: 26px;
      color: #060D3B;
      border-radius: 3px;
      font-size: 12px;
      text-indent: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border: 0;
      outline: 0;
      padding: 0;
       margin: 0;
      position: relative;
      .icon_right{
        width: 5px;
        height: 5px;
        position: absolute;
        right: 8px;
        top:10.5px;
        background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAkklEQVQoU2PkELSW+/H+6CMGLICRjdf6G8P//62/vvzvY2A4/h1ZDUjyP1jgP8MjBibGil+fjqwA8xgYGBCSUC2MDAyH/v39V/D72/HzGJJQNe8Y/v+3R5f8w8j4f9bP/2z1DJ8PvIFL/mdgOMD471/er6/HL8McBZK8zcDAWPbr85H16L5hZGBw4GBgOPADmz8BZG47ghcBaQUAAAAASUVORK5CYII=") ;
        background-size: cover;
      }
  }
}
.noSvip_box{
  height: 55px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -35px;
  margin: 0 auto;
  width: 94%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #a9a9a9;
  border-radius: 10px;
  // background-image: url("data:image/png;base64,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");
  .svip_tips{
    color: #D9D9D9;
    font-size: 13px;
  }
  .svip_content{
    color: #D9D9D9;
    font-size: 13px;
  }
  .btn_vip{
      background: #FAE5AA;
      width: 80px;
      height: 26px;
      color: #060D3B;
      border-radius: 3px;
      font-size: 12px;
      text-indent: 12px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 0;
      outline: 0;
       padding: 0;
       margin: 0;
      position: relative;
      .icon_right{
        width: 5px;
        height: 5px;
        position: absolute;
        right: 8px;
        top:10.5px;
        background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAkklEQVQoU2PkELSW+/H+6CMGLICRjdf6G8P//62/vvzvY2A4/h1ZDUjyP1jgP8MjBibGil+fjqwA8xgYGBCSUC2MDAyH/v39V/D72/HzGJJQNe8Y/v+3R5f8w8j4f9bP/2z1DJ8PvIFL/mdgOMD471/er6/HL8McBZK8zcDAWPbr85H16L5hZGBw4GBgOPADmz8BZG47ghcBaQUAAAAASUVORK5CYII=") ;
        background-size: cover;
      }
  }
}
.user-box {
  display: flex;
  align-items: flex-start;
  height: 100px;
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
      font-size: 18px;
      color: #000;
    }
    .level {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 13.5px;
      height: 17.5px;
      margin-top: 10px;
      // width: 64px;
      border-radius: 3px;
      overflow: hidden;
      .icon {
        display: block;
        width: 17.5px;
        height: 17.5px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        overflow: hidden;
      }
      .svip_icon{
        width: 64px;
        height: 17.5px;
        margin-left: 8px;
      }
      .text {
        padding: 0 8px;
        text-align: center;
        background: #000;
      }
    }
  }
}
.assets-box {
  font-size: 12px;
  color: #FFFFFF;
  position: relative;
  padding: 5px 10px 20px 5px;
  .assets-list {
    display: flex;
    align-items: center;
    border-top: 0.5px solid #fff;
    .assets-item {
      flex: 1;
      .link {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin: 10px 0;
        .number {
          color: #fff;
          font-size: 15px;
        }
      }
    }
  }
}
.order-nav-box {
  background: #fff;
  padding: 5px 0;
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;
    box-sizing: border-box;
    font-size: 14px;
    background: #fff;
    color: #010101;
    font-weight: bold;
    height: 26.5px;
    .link {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #959494;
      .icon {
        display: block;
        width: 7px;
        height: 10px;
        margin-left: 7px;
      }
    }
  }
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;
    .item {
      flex: 0 0 25%;
      margin-bottom: 20px;
      .link {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #231815;
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

.function-box:extend(.service-box all) {
  overflow: hidden;
  border-bottom: none;
  margin-bottom: 10px;
  .list{
    margin-bottom: 0;
  }
}
.contact_wx{
   position: fixed;
    z-index: 10000;
    left: 0;
    right: 0;
    top:0;
    width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 260px;
  margin: 50px auto;
  background: #f4f4f4;
  padding: 10px;
  .action_btn{
    width: 100%;
  }
  .codeurl{
    margin-top: 10px;
    width: 130px;
    height: 130px;
  }
}
.more-like{
  .title{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .goods_nav_goods{
    background: #fff;
    .goods_list{
      .item{
        border-bottom:1px solid #E6E6E6;
        padding: 5px; 
        display: flex;
        justify-content: flex-start;
        .img{
          width: 100px;
          height: 100px;
          margin: 10px;
        }
        .content{
          flex: 1;
          margin: 10px 10px 10px 0;
          .goodsName{
              height: 38px;
            white-space: initial;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #231815;
          }
          .integral{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 8px;
            margin-top: 5px;
            .integral_pont{
              padding: 2px 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #E83828;
              color: #E83828;
              font-size: 10px;
              border-radius: 5px;
            }
          }
          .price{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price-left{
              .old{
                color: #231815;
                font-size: 12px;
              }
              .svip{
                display: flex;
                align-items: center;
                .svip-price{
                  color: #231815;
                  font-size: 18px;
                  font-weight: bold;
                  margin-right: 5px;
                }
                .svip-icon{
                  color: #FDDF2B;
                  font-size: 10px;
                  background: #231815;
                  border-radius: 5px;
                  padding: 2px 4px;
                }
              }
            }
            .price-right{
              position: relative;
              z-index: 0;
              width: 75px;
                height: 27px;
                display: flex;
                justify-content:space-between;
                align-items: center;
              .bg-price{
                width: 65px;
                height: 27px;
                position: absolute;
                right: 0;
                top: 0;
                z-index: -1;
              }
              .mar-price{
                color: #fff;
                font-size: 12px;
                margin-left: 30px;
              }
              .triangle{
                margin-left: 2px;
                border: 3px solid;
                border-color: transparent;
                border-left-color:#fff;
              }
            }
          }
        }
      }
    }
    .goods_more{
      background: #F6F6F6;
      display: flex;
      justify-content: center;
      padding: 5px;
      .goods_more_text{
        color: #070001;
        font-size: 12px;
      }
    }
  }
}
</style>