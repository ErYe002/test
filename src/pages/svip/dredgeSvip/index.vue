<template>
  <article class="contain">
    <img src="/static/images/svip_big_bg.png" class="big_bg">
    <section>
      <div class="page_title">
        <div class="page_title"></div>
        <div class="point"></div>
        <span class="page_title_text">SVIP会员卡</span>
        <div class="point"></div>
        <div class="page_title"></div>
      </div>
    </section>
    <section class="top-view">
        <div class="top-box">
          <div class="module-first">
            <div class="module-first-title">
              <span>尊享八大特权</span>
              <!-- <span class="title-r">查看权益<img  src="/static/images/icon_right_grey.png" /></span> -->
            </div>
            <div class="banner_box">
              <!-- 图片 -->
              <img :src="Data.PrivilegeUrl" mode="widthFix" class="banner">
            </div>
          </div>
          <div class="module-two">
            <div>服务类型</div>
            <div class="type-box">
                  <span class="type-name">年卡</span>
                  <div class="price-b">
                    <span class="big-price"><span class="big-l">￥</span>{{Data.SvipSellPrice}}<span class="big-r">/年</span></span>
                    <!-- <span class="small-price">￥298/年</span> -->
                  </div>
                  <span class="type-tip">低至￥{{Data.QuarterPrice}}/季</span>
            </div>
          </div>
          <div class="module-three">
            <!-- <div class="item">活动价：<span class="ac-price">￥149</span></div> -->
            <div class="item">已享优惠：<span class="de-price">-￥{{Data.SvipDeductionCouponAmount}}</span><span class="coupon">可得优惠券</span></div>
            <div class="item">优惠后金额：<span class="to-price">￥{{Data.RealSellPrice}}</span></div>
          </div>
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
      <div class="btn-pay" @click="pay">立即支付：￥<span class="total_pay">{{Data.RealSellPrice}}</span></div>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import authorization from "@/utils/authorization";
import { mapState } from "vuex";

export default {
  data() {
    return {
      //填充userInfoModel和walletModel的默认字段，以免控制台报错
      Data:{},
      chekedTcp:false,
       submitResultInfo:{},
      submitResultMsg:""
    };
  },
  computed: {
    ...mapState("user", ["token"]),
    ...mapState("wxinfo", ["openId"])
  },
 
  onLoad(){
    this._getPageData()
  },
  methods: {
    _getPageData() {
      api.getSvipPageData().then(({Data})=>{
        this.Data = {...Data}
      })
    },
    checkboxChange(){
      this.chekedTcp = !this.chekedTcp;
    },
    pay(){
      if(!this.chekedTcp){
        wx.showModal({
          title: "提示",
          content:"请阅读并勾选用户协议！",
          confirmColor: "#cab894"
        });
        return false;
      }
      this.submitOrder();
    },
       //提交订单 去支付
    submitOrder() {
      api.submitSvipOrder(this.Data.CouponNo).then(({Data,Msg,State}) => {
        console.log(Data)
         this.submitResultInfo = Data;
        this.submitResultMsg = Msg
        if (State){
          console.log(Data.OrderId + '订单号')//
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
    height: 100%;
    width: 100%;
    z-index: -1;
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
   background: -webkit-linear-gradient(top,#fff,#f7f5f5);
  .module-first-title{
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #4B4B4B;
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
    .type-box{
      margin: 8px 0;
      border-radius: 10px;
      border: 1px solid #A7A596;
      background: #FFF5D2;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      .type-name{
        position: absolute;
        top: 5px;
        left: 15px;
        font-size: 14px;
        font-weight: bold;
      }
      .type-tip{
          margin-right: 20px;
          padding: 5px 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          background: #F7D352;
          color: #FFF;
          border-top-left-radius:17px;
          border-bottom-right-radius:17px;
      }
      .price-b{
        margin-left: 50px;
        .big-price{
            font-size: 38px;
            font-weight: bold;
            .big-l{
              font-size: 14px;
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
      font-size: 12.5px;
      color: #4B4B4B;
      height: 40px;
      border-bottom: 1px solid #ECE9EC;
      &:last-child{
         border: none;
      }
    }
    .ac-price,.de-price,.to-price{
      color: #DBC47D;
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
  .banner{
    width: 100%;
    // height: 100%;
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
</style>