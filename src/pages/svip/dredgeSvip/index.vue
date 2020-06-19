<template>
  <article class="contain">
    <!-- <img src="/static/images/svip_big_bg.png" class="big_bg"> -->
    <div class="big_bg"></div>
    <!-- <section>
      <div class="page_title">
        <div class="page_title"></div>
        <div class="point"></div>
        <span class="page_title_text">SVIP会员卡</span>
        <div class="point"></div>
        <div class="page_title"></div>
      </div>
    </section> -->
    <section class="top-view">
        <div class="top-box" :style="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.PrivilegeBackground?'background-image:url('+Data.SvipBuyInfo.PrivilegeBackground+')':'background:#1C1C1C'">
          <div class="module-first">
            <div class="module-first-title">
              <span>SVIP会员专享10大特权</span>
              <!-- <span class="title-r">查看权益<img  src="/static/images/icon_right_grey.png" /></span> -->
            </div>
            <div class="banner_box" v-if="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.PrivilegeIconList.length>0">
              <!-- 图片 -->
              <!-- <img :src="Data.PrivilegeUrl" mode="widthFix" class="banner"> -->
              <div v-for="(item,index) in Data.SvipBuyInfo.PrivilegeIconList" :key="index" class="item">
                  <div>
                    <img :src="item.ImageUrl" alt="" class="img">
                  </div>
                  <div class="text">{{item.ImageName}}</div>
              </div>
            </div>
          </div>
          <div class="module-two">
            <!-- <div>服务类型</div> -->
            <div class="type-box">
                  <span class="type-tip">服务类型</span>
                  <div class="price-b">
                    <span class="big-price"><span class="big">年卡</span><span class="big-l">￥</span>{{Data.SvipSellPrice}}<span class="big-r">/年</span></span>
                    <!-- <span class="small-price">￥298/年</span> -->
                  </div>
            </div>
          </div>
          <div class="module-three">
            <!-- <div class="item">活动价：<span class="ac-price">￥149</span></div> -->
            <div class="item">
              <div>已享优惠：<span class="de-price">-￥{{Data.SvipDeductionCouponAmount}}</span></div>
              <div class="quan-box">
                  <div class="quan">
                    <input type="text" placeholder="输入券码" class="input" v-model="couponCode">
                    <div class="btn" @click="useCoupon">兑换</div>
                  </div>
                  <div class="quan-tip">已经为您自动使用最优惠优惠券，或者您可以手动输入券码</div>
              </div>
            </div>
            <div class="item">优惠后金额：<span class="to-price">￥{{allmoney}}</span></div>
          </div>
        </div>  
    </section>
     <section class="middle-view">
        <div class="goods-box">
          <div class="content-code">
              <div class="content-tip" v-if="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.SVIPPresentList.length>0">
                <span class="tip-one">开通SVIP即送{{allGiftMoney}}元开卡礼</span>
              </div>
              <div class="img-box">
                <img :src="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.SVIPAdvertUrl" mode="widthFix" alt="" class="img">
              </div>
          </div>
          <div class="goods-item"  v-if="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.SVIPPresentList.length>0">
            <blcok v-for="(gItem,idx) in Data.SvipBuyInfo.SVIPPresentList" :key="idx">
              <div class="goods-box">
                <span class="check-btn">
                  <img
                    v-if="gItem.IsSelected"
                    src="/static/images/icon_checked.png"
                    class="icon"
                    @click="unSelectGoodsEvent(gItem.GoodsId)"
                  />
                  <img
                    v-else
                    src="/static/images/icon_no_checked.png"
                    class="icon"
                    @click="selectGoodsEvent(gItem.GoodsId)"
                  />
                </span>
                <div class="g-info">
                  <img class="g-img" :src="gItem.ImageUrl" />
                  <div class="info">
                    <a
                      class="g-name"
                    >
                      {{gItem.GoodsName}}
                    </a>
                    <!-- 有属性商品光度和数量 -->
                    <block v-if="gItem.HasProperty ">
                      <p
                        class="g-attr"
                      >
                        <span
                          :class="{attr: true}"
                          @click="openGdSelectPop('L',gItem)"
                        >
                          <div class="attr-item">
                            <em
                              class="text"
                            >L眼光度</em>
                            <img
                              class="icon"
                              v-if="gItem.BuyType != 3"
                              src="/static/images/icon_attr_down.png"
                            />
                          </div>
                          <block v-for="(gd,gdidx) in gItem.GoodsFieldsL[0].Children" :key="gdidx">
                            <em class="text" v-if="gItem.SureIdL==gd.RealGoodsId">{{gd.Value}}{{ gItem.AnotherNameL}}</em>
                            <em class="text" v-else-if="gItem.SureIdL==''&&gdidx==0">{{"选择光度"}}</em>
                          </block>
                        </span>
                        <span
                          :class="{attr: true}"
                          @click="openGdSelectPop('R',gItem)"
                        >
                          <div class="attr-item">
                            <em
                              class="text"
                            >R眼光度</em>
                            <img
                              class="icon"
                              v-if="gItem.BuyType != 3"
                              src="/static/images/icon_attr_down.png"
                            />
                          </div>
                          <block v-for="(gd,gdidx) in gItem.GoodsFieldsR[0].Children" :key="gdidx">
                            <em class="text" v-if="gItem.SureIdR==gd.RealGoodsId">{{gd.Value}}{{ gItem.AnotherNameR}}</em>
                            <em class="text" v-else-if="gItem.SureIdR==''&&gdidx==0">{{"选择光度"}}</em>
                          </block>
                        </span>
                      </p>
                    </block>
                    <div class="g-price">
                      <div class="price">
                        <em class="unit">价值¥{{gItem.OriginalPrice}}</em>
                        <div :class="{tag: true}">
                          <img
                            :src="'/static/images/xiaoV.png'"
                          />
                          <span>¥</span><span class="zero">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </blcok>
          </div>
        </div>   
    </section>
    <section class="bottom-view" v-if="Data.SvipBuyInfo!=null&&Data.SvipBuyInfo.SVIPPresentList.length>0">
        <div class="address-box">
          <view class='top-bg'></view>
          <navigator v-if="addressInfo!=null" :url="'/pages/order/chooseAddress/main?SelectedConsigneeId='+addressInfo.ID" class='info-box'>
            <view class='info'>
              <view class='contact-name'>
                {{addressInfo.ConsigneeName}}
                <text v-if="addressInfo.IsDefault"  class='default'> 默认</text>
              </view>
              <view class='contact-address'>{{addressInfo.ProvinceName}}{{addressInfo.CityName}}{{addressInfo.DistrictName}}{{addressInfo.Address}}{{addressInfo.PostalCode}}</view>
              <view class='contact-phone'>{{addressInfo.ContactMobile}}</view>
            </view>
            <view class='icon'>更改</view>
          </navigator>
          <navigator v-else :url="'/pages/order/chooseAddress/main?SelectedConsigneeId='" class='no-adress'>
            <view class='icon'>请选择地址</view>
          </navigator>
        </div>
    </section>
    <!-- <section class="top-view">
      <div class="bottom-box">
        <div class="item">
          <div><span>发票信息</span><span class="span-first">电子普通发票</span><span  class="span-two">(会员服务个人)</span></div>
          <img  src="/static/images/icon_right_grey.png" />
        </div>
        <div class="item">
          <div>兑换码购买</div>
          <img  src="/static/images/icon_right_grey.png" />
        </div>
        <div class="item">
          <div>企业采购</div>
          <img  src="/static/images/icon_right_grey.png" />
        </div>
      </div>
    </section> -->
    <section class="bottom-nav">
      <div class="tcp">
          <div @click="checkboxChange">
                <img v-if="chekedTcp" src="/static/images/svipicon_checked.png" alt="">
                <img v-else src="/static/images/svipicon_nochecked.png" alt="">
                <text>已阅读并同意</text>
          </div>
          <div class="tcp-tip" @click="showUserysxy">《可得SVIP会员用户协议》</div>
      </div>
      <div class="btn-pay" @click="pay">立即支付：￥<span class="total_pay">{{allmoney}}</span></div>
    </section>
    <div class="login-box" v-if="!token">
        <div class="content">
            <div class="tips">提示</div>
            <div class="text">尚未登录，请先登录</div>
            <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
        </div>
    </div>
     <gdNromalSelectPop
      :is-show.sync="isShowGdSelectPop"
      :gid="goodsId"
      :real-goods-id="realGoodsId"
      :select-goods-id="selectGoodsId"
      @backData="gdBackInfo"
    />
  </article>
  
</template>

<script>
import api from "@/api/user";
import addressapi from "@/api/address";
import attrapi from "@/api/attr";
import authorization from "@/utils/authorization";
import gdNromalSelectPop from "@/components/newGdNromalSelectPop"
import { mapState } from "vuex";

export default {
  data() {
    return {
      //填充userInfoModel和walletModel的默认字段，以免控制台报错
      Data:{
      },
      addressInfo:null,
      chekedTcp:true,
       submitResultInfo:{},
      submitResultMsg:"",
      allGiftMoney:0,
      isShowGdSelectPop: false,
      openSide: '',
      goodsId:"",
      realGoodsId:"",
      selectGoodsId:"",
      sphList: [],
      checkSelectStatus:true,
      goodsArr:[],
      couponCode:"",
      allmoney:0
    };
  },
  computed: {
    ...mapState("user", ["token"]),
    ...mapState("wxinfo", ["openId"]),
    Data(){
      return this.Data
    }
  },
   components: {
      gdNromalSelectPop
    },
  onShow(){
    var flag = wx.getStorageSync('isRefreshOrder');//增加开关 以防微信支付成功后会触发onshow，出现无用弹框 
    //监测地址，快递变化, 每次返回到页面都刷新数据，（修改地址，地址id不变的情况下 回到页面也要刷新数据）
    if(flag){
      wx.setStorageSync('isRefreshOrder',false)
      let addresId = wx.getStorageSync('addresId')
      this.getAddressDetail(addresId);
    }
  },
  onLoad(){
    this._getPageData()
  },
  methods: {
     getUserInfo(e) {
      let that = this;
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {
          that._getPageData()
      });
    },
    _getPageData() {
      let that = this
      api.getSvipPageData().then(({Data})=>{
        if(Data!=null&&Data.SvipBuyInfo.SVIPPresentList.length>0){
          let temp = 0;
          Data.SvipBuyInfo.SVIPPresentList.forEach(item=>{
            if(item.HasProperty){
              temp=temp+item.OriginalPrice*2
            }else{
               temp=temp+item.OriginalPrice
            }
            item.IsSelected = true
            item.SureIdL = ""
            item.SureIdR = ""
            item.SureGoodsIdR = ""
            item.SureGoodsIdL = ""
            item.AnotherNameR = ""
            item.AnotherNameL = ""
            item.SpecificationR = ""
            item.SpecificationL = ""
            item.GoodsFieldsR = item.GoodsFields
            item.GoodsFieldsL = item.GoodsFields
          })
          that.allGiftMoney = temp
        }
        this.Data = {...Data}
        this.allmoney = Data.RealSellPrice
        this.addressInfo = Object.assign({}, Data.DefaultConsigneeInfo);
      })
    },
    getAddressDetail(addresId){
      addressapi.getAddressDetail(addresId).then(({ Data }) => {
        this.addressInfo = Object.assign({}, Data);
      });
    },
    useCoupon(){
      if(!this.couponCode){
        wx.showModal({
          title: "提示",
          content:"请输入礼券码",
          confirmColor: "#cab894",
          mask:true
        });
        return false;
      }
      api.UseSvipCoupon(this.couponCode).then(({Data,State,Msg})=>{
        if(State){
          let temp = this.Data.RealSellPrice -Data.SvipDeductionCouponAmount;
          if(temp<0){
            this.allmoney =  0
          }else{
            this.allmoney =  temp
          }
          this.Data.SvipDeductionCouponAmount = Data.SvipDeductionCouponAmount
        }else{
          wx.showModal({
            title: "提示",
            content:Msg,
            confirmColor: "#cab894",
            mask:true
          });
        }
      })
     
    },
    checkboxChange(){
      this.chekedTcp = !this.chekedTcp;
    },
    pay(){
      let that = this;
      //验证是否勾选协议
      if(!this.chekedTcp){
        wx.showModal({
          title: "提示",
          content:"请阅读并勾选用户协议！",
          confirmColor: "#cab894",
          mask:true
        });
        return false;
      }
      //赠品选中提示
      let flag = this.Data.SvipBuyInfo.SVIPPresentList.some(item=>{return item.IsSelected==false})
      if(flag&&this.checkSelectStatus){
        wx.showModal({
          title: '提示',
          content: '尊敬的用户，您还有赠品没有选择，如果您不勾选，视为您自愿放弃赠品',
          cancelText:"再想想",
          confirmText:"继续购买",
          success (res) {
            if (res.confirm) {
              that.checkSelectStatus  = false;
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false
      }
      //赠品选中属性提示
      let filed = this.Data.SvipBuyInfo.SVIPPresentList.filter(item=>{
          if(item.IsSelected&&item.HasProperty){
            return item.SureGoodsIdL==""||item.SureGoodsIdR==""
          }
        })
      if(filed.length>0){
         wx.showModal({
          title: "提示",
          content:"请选择赠品属性",
          mask:true
        });
        return false;
      }
      //地址判断
      if(this.addressInfo==null&&!this.addressInfo.ID){
        wx.showModal({
          title: "提示",
          content:"请选择地址",
          mask:true
        });
        return false;
      }
      //处理发送数据
      let goodsArr = [];
      this.Data.SvipBuyInfo.SVIPPresentList.forEach(item=>{
        let temp = {};
        if(item.IsSelected){
          if(item.HasProperty){
            if(item.SureGoodsIdL){
              goodsArr.push({"GoodsId":item.SureGoodsIdL,"RealGoodsId":item.SureIdL,"Specification":item.SpecificationL})
            }
            if(item.SureGoodsIdR){
              goodsArr.push({"GoodsId":item.SureGoodsIdR,"RealGoodsId":item.SureIdR,"Specification":item.SpecificationR})
            }
          }else{
            goodsArr.push({"GoodsId":item.GoodsId})
          }
        }
      })
      this.goodsArr = goodsArr;
      this.submitOrder();
    },
       //提交订单 去支付
    submitOrder() {
      api.submitSvipOrder(this.Data.CouponNo,this.addressInfo.ID,this.goodsArr).then(({Data,Msg,State}) => {
        // console.log(Data)
         this.submitResultInfo = Data;
        this.submitResultMsg = Msg
        if (State){
          // console.log(Data.OrderId + '订单号')//
          if (Data.IsToPay) { 
            //订单创建成功，唤起微信支付
            this._wechatPay(Data.OrderId)
          }else{
            // wx.setStorageSync('isSvipRedirect',true)
            // wx.switchTab({
            //   url: '/pages/home/main'
            // })
            wx.redirectTo({
              url: '/pages/order/submitResult/main?resultMsg='+Msg+'&shopId=1&orderNo='+Data.OrderNo+'&OrderAmount='+Data.OrderAmount+'&OrderId='+Data.OrderId+"&svip=true",
            })
          }
        }else{
          let tempMsg = "";
          if (Msg) {
            tempMsg = Msg;
          }else{
            tempMsg = "支付异常请稍后再试";
          }
          wx.showToast({
            title: tempMsg,
            icon: 'none',
          });
        } 
      })
    },
    // 微信支付
    _wechatPay(orderId) {
      const _this = this;
      api
        .payOrder(orderId, _this.openId)
        .then(result => {
          const { nonceStr, paySign, signType, timeStamp } = result.Data;
          const package1 = result.Data.package; //package是小程序关键字
          wx.showLoading();
          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: package1,
            signType: signType,
            paySign: paySign,
            success: function(res) {
                // wx.setStorageSync('isSvipRedirect',true)
                // wx.switchTab({
                //   url: '/pages/home/main'
                // })
              wx.redirectTo({
                url: '/pages/order/submitResult/main?resultMsg='+_this.submitResultMsg+'&shopId=1&orderNo='+_this.submitResultInfo.OrderNo+'&OrderAmount='+_this.submitResultInfo.OrderAmount+'&OrderId='+orderId+"&svip=true",
              })
            },
            fail: function() {
              // wx.reportMonitor("3", 1);
              wx.showModal({
                title: "提示",
                content: "支付失败，您可以稍后再进行支付",
                showCancel: false,
                confirmColor: "#cab894",
                success() {}
              });
            },
            complete: function() {
              wx.hideLoading();
            }
          });
        })
        .catch(() => {
          // wx.reportMonitor("3", 1);
        });
    },
    showUserysxy() {
      wx.navigateTo({
        url: '/pages/htmlPreview/main?path=' + encodeURIComponent('/TemplateForNewApp/SvipRule')
      })
    },
    unSelectGoodsEvent(goodsId){
      this.Data.SvipBuyInfo.SVIPPresentList.map(item=>{
            if(item.GoodsId==goodsId){
              item.IsSelected = false
            }
          })
    },
    selectGoodsEvent(goodsId){
        this.Data.SvipBuyInfo.SVIPPresentList.map(item=>{
            if(item.GoodsId==goodsId){
              item.IsSelected = true
            }
          })
    },
    openGdSelectPop(side,gItem) {
      
      this.openSide = side;
      this.isShowGdSelectPop = true;
      if (side === 'R') {
        this.selectGoodsId = gItem.SureIdR;
        this.realGoodsId = gItem.GoodsId;
        this.goodsId = gItem.SureGoodsIdR==""?gItem.GoodsId:gItem.SureGoodsIdR;
      } else if (side === 'L') {
        this.selectGoodsId =gItem.SureIdL;
        this.realGoodsId = gItem.GoodsId;
        this.goodsId = gItem.SureGoodsIdL==""?gItem.GoodsId:gItem.SureGoodsIdL;
      } 
    },
    gdBackInfo(obj) {
      this.Data.SvipBuyInfo.SVIPPresentList.map(item=>{
            if(item.GoodsId==obj.realGoodsId){
              if (this.openSide === 'R') {
                  item.SpecificationR = "光度:"+obj.specification//光度名称
                  item.SureIdR = obj.sphSelectId//光度id
                  item.SureGoodsIdR = obj.goodsId//商品id
              } else if (this.openSide === 'L') {
                item.SpecificationL = "光度:"+obj.specification
                item.SureIdL = obj.sphSelectId
                item.SureGoodsIdL = obj.goodsId
              }
              //筛选名称
              for (let i = 0; i < item.SeriesItems.length; i++) {
                let items = item.SeriesItems[i];
                if (items.GoodsId === obj.goodsId) {
                  if (this.openSide === 'R') {
                        item.AnotherNameR = items.AnotherName
                    } else if (this.openSide === 'L') {
                      item.AnotherNameL = items.AnotherName
                    } 
                }
              }
              // if(item.GoodsId!=obj.goodsId){//切换系列就更新光度列表并替换Data对象
                  attrapi.getGoodsField(obj.goodsId).then(({Data})=>{
                    if(Data!=null){
                      if (this.openSide === 'R') {
                        item.GoodsFieldsR = Data.GoodsFields
                    } else if (this.openSide === 'L') {
                        item.GoodsFieldsL = Data.GoodsFields
                    } 
                      
                    }
                  })
              // }
            }
          })
      // this.IsConfirmedBuy = Data.isConfirmedBuy;
    }
  }
};
</script>

<style lang="less" scoped>
/* 去除按钮默认样式 */

.contain{
  height: 100%;
  padding:7px;
  padding-bottom: 50px;
  .big_bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 75%;
    width: 100%;
    z-index: -1;
    background: -webkit-linear-gradient(top,#CAB894,#fff);
  }
}
.page_title{
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  .page_title{
    width: 30px;
    height: 1px;
    background: #fff;
  }
  .point{
    width: 2px;
    height: 2px;
    background: #fff;
    margin: 0 10px;
  }
}
.top-view{
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
}
.top-box{
   
  padding: 10px 15px 0 15px;
  //  background: -webkit-linear-gradient(top,#fff,#f7f5f5);
  //  background: red;
  background-size: cover;
  .module-first-title{
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #FFE0A7;
    font-weight: bold;
    .title-r{
      font-size: 12.5px;
      img{
        width: 6px;
       height: 8px;
       margin-left: 5px;
      }
    }
  }
  .module-two{
     font-size: 14px;
    color: #4B4B4B;
    font-weight: bold;
    margin-top: 10px;
    .type-box{
      margin: 8px 0;
      border: 1px solid #A7A596;
      background: -webkit-linear-gradient(top,#FBF7F1,#FCEAD3);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      .type-tip{
          margin-left: 10px;
          font-size: 15px;
          color: #1B1B1B;
      }
      .price-b{
        margin-right: 20px;
        .big-price{
            font-size: 38px;
            font-weight: bold;
            .big-l{
              font-size: 14px;
            }
            .big{
              font-size: 14px;
              margin-right: 5px;
            }
            .big-r{
              font-size: 14px;
            }
        }
        .small-price{
          font-size: 12px;
            text-decoration: line-through;
            color: #C6C6C6;
            margin-left: 5px;
        }
      }
    }
  }
  .module-three{
    .item{
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #fff;
      height: 40px;
      border-bottom: 1px solid #FBE9D1;
      &:last-child{
         border: none;
      }
    }
    .ac-price,.de-price,.to-price{
      color: #fff;
      font-size: 15px;
      margin-left: 10px;
    }
    .old-price{
      font-size: 12px;
      text-decoration: line-through;
      margin-left: 5px;
      color: #C6C6C6;
    }
    .to-price{
      color: #fff;
      font-size: 24px;
    }
    .coupon{
      margin-left: 15px;
      padding: 2px 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10.4px;
      color: #DBC47D;
      border-top-left-radius:17px;
      border-bottom-right-radius:17px;
      border: 1px solid #DBC47D;
    }
    .quan-box{
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    .quan-tip{
      margin-top: 3px;
      color: #C5B797;
      font-size: 7px;
    }
    .quan{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 15px;
      flex: 1;
    }
    .input{
      // width: 100px;
      height: 18px;
      font-size: 12px;
      text-indent: 30px;
      border: 1px solid #C6B798;
      margin-right: 5px;
      border-radius: 3px;
    }
    .btn{
      width: 40px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #FFE1A8;
      font-size: 12px;
      color: #1B1B1B;
      border-radius: 3px;
    }
  }
}
.bottom-box{
  padding: 0 15px;
  background: -webkit-linear-gradient(top,#fff,#f7f5f5);
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ECE9EC;
    color: #4B4B4B;
    font-size: 14px;
    height: 40px;
    img{
      width: 6px;
      height: 8px;
    }
    .span-first{
      margin-left: 20px;
      font-size: 12px;
      color: #CCB485;
    }
    .span-two{
      font-size: 12px;
      color: #C6C6C6
    }
    &:last-child{
      border: none;
    }
  }

}
.banner_box{
  margin-top: 10px;
  margin-bottom: 10px;
  // height: 180px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  .item{
    margin-bottom: 20px;
    display: flex;
    width: 20%;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    .img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .text{
      color: #C5B797;
      font-size: 10.5px;
      margin-top: 3px;
    }
  }
}
.bottom-nav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  .tcp,.btn-pay{
    flex: 1;
  }
  .tcp{
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12.5px;
    color: #4B4B4B;
    img{
     width: 15px;
     height: 15px;
     vertical-align: text-bottom;
    }
    .tcp-tip{
      line-height: 10px;
      color: #CCB485;
      font-size: 10px;
      margin-top: 5px;
    }
  }
  .btn-pay{
    background: #C9BC9C;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #FFF;
    font-size: 14px;
    .total_pay{
      font-size: 23px;
    }
  }
  
}
.login-box{
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    width: 200px;
    background: #fff;
    border-radius: 8px;
    .tips{
      padding: 5px;
      text-align: center;
      font-size: 15px;
    }
    .text{
      padding: 20px 5px;
      text-align: center;
      font-size: 13px;
    }
    .btn{
      background: transparent;
    }
  }
}
.middle-view{
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #C6B798;
  overflow: hidden;
  margin-bottom: 10px;
}
.goods-box{
  width: 100%;
  .content-code{
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .img-box{
      width: 100%;
    }
    .content-tip{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      font-size: 9px;
      color: #1C1C1C;
      .tip-one{
        color: #1C1C1C;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    .img{
      width: 100%;
    }
  }
.goods-item{
  margin: 10px;
 .goods-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        height: 100px;
        .check-btn {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            width: 18px;
            height: 18px;
          }
        }
        .g-info {
          flex: 1;
          display: flex;
          .g-img {
            display: block;
            width: 90px;
            height: 90px;
            margin: 0 12px 0 8px;
            border: 1px solid #dcdcdc;
          }
          .info {
            flex: 1;
            width: 0;
            .g-name {
              overflow: hidden;
              text-overflow: ellipsis;
              // display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 12px;
              color: #C6B798;
              margin-bottom: 6px;
              word-break: break-all;
              word-wrap: break-word;
              white-space: pre-line;
              margin-top: -17px;
            }
            .g-attr {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 11px;
              margin-bottom: 5px;
              .attr-text {
                color: #6b6b6b;
              }
              .attr {
                margin-left: 10px;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                flex-direction: column;
                background: #f2f2f2;
                color: #6b6b6b;
                padding: 1.5px 2px;
                // width: 140px;
                box-sizing: border-box;
                .attr-item{
                  display: flex;
                  align-items: center;
                }
                .text {
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .icon {
                  display: block;
                  width: 9px;
                  height: 5px;
                  margin:0 3px; 
                }
                &.line {
                  width: 100%;
                  background: transparent;
                }
              }
            }
            .g-price {
              display: flex;
              justify-content: space-between;
              padding-top: 3px;
              .price {
                color: #000;
                font-size: 16px;
                display: flex;
                align-items: center;
                .unit {
                  font-size: 10px;
                  color: #999;
                  text-decoration: line-through;
                  margin-right: 5px;
                }
                .tag {
                  font-size: 9px;
                  padding: 1px 2px;
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  img {
                    display: block;
                    width: 14px;
                    height: 14px;
                    margin-right: 2px;
                  }
                  .zero{
                    margin-left: 2px;
                    font-size: 20px;
                    font-weight: bold;
                  }
                }
              }
              .promotion {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .tag {
                  color: #cab894;
                  font-size: 9px;
                  padding: 1px 2px;
                  border: 0.5px solid #cab894;
                  margin: 0 2px;
                }
              }
            }
          }
        }
      }
  }
}
.bottom-view{
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
}
.address-box .info-box {
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.address-box .info-box .info .contact-name {
  font-size: 30rpx;
}
.address-box .info-box .info .contact-address,
.address-box .info-box .info .contact-phone {
  color: #999;
  font-size: 24rpx;
}
.address-box .info-box .info .contact-address {
  margin: 4rpx 0;
}
.address-box .info-box .icon {
  padding: 2px 5px;
  background: #000;
  font-size: 12px;
  color: #fff;
}
.default {
  border: 1rpx solid #ff0000;
  margin-right: 10rpx;
  color: #ff0000;
  font-size: 20rpx;
  padding-left: 2rpx;
  padding-right: 2rpx;
}
.address-box .top-bg {
  background-image: url(https://pic.keede.com/app/images/icon_cart.png);
  background-position: 0 -496rpx;
  background-size: 200rpx auto;
  height: 8rpx;
  width: 100%;
}
.no-adress{
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content:center;
  .icon {
    padding: 2px 5px;
    background: #000;
    font-size: 12px;
    color: #fff;
  }
}
</style>