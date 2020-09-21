<template>
  <article class="viewport">
      <div class="wrapBox">
        <div class="gametoppng">
          <img class="dsp-b" src="https://pic.keede.com//app/images/gameimg/gametop.png" mode="widthFix" style="width:100%"/>
          <a class="ruleBtn" @click="rulerShow"></a>
        </div>
        <div id="fLottery">
            <!--大转盘-->
            <div class="lotteryDrawContent">
                <img :animation="animationData" src="https://pic.keede.com//app/images/gameimg/turntable_tables.png" mode="widthFix" class="turnImg">
                <img src="https://pic.keede.com//app/images/gameimg/turntable_pointer.png" mode="widthFix" class="pointImg">
                <block v-if="token">
                  <a class="startBtn" @click="startGame"></a>
                </block>
                <block v-else>
                  <button class="startBtn" 
                  open-type="getUserInfo"
                  @getuserinfo="getUserInfo"></button>
                </block>
            </div>
        </div>
        <div class="dialogC lotteryResultDialog">
            <a href="javascript:void(0);" class="closeDialog"></a>
            <div class="tipDialogBox">
                <p class="tipText"></p>
                <p class="deputyTipText"></p>
                <button class="opBtn"></button>
            </div>
        </div>
        <div><img class="dsp-b" src="https://pic.keede.com//app/images/gameimg/gamebtms.jpg" mode="widthFix" style="width:100%" /></div>
    </div>
    <centerFlip :isShow.sync="isShow" @hide="_close">
      <div class="gamerule">
        <div class="ruletitle">
          <img src="https://pic.keede.com//app/images/gameimg/ruletitle.png" style="width:124px">
        </div>
        <div class="text">1.本活动仅限可得眼镜网注册3年以上、收到邀请且首次绑定官方微信的可得眼镜网用户参与，每位用户限参与1次。</div>
        <div class="text">2.获得戴森吹风机、花西子套装、星巴克卡等礼品的用户，客服将在24小时内联系您并沟通领奖事宜，请正确填写手机号码。</div> 
        <div class="text">3.获得爱奇艺视频VIP会员将以券码形式通过短信发送，请中奖用户注意查收，<span class="imp">并在2020年9月30日前兑换使用，过期作废。</span></div>
        <div class="text">4.获得红包的用户可得眼镜网将会在24小时内将红包金额充值入您的可得眼镜网账户余额中，余额内金额任意消费可抵扣，<span class="imp">不可提现。</span></div>
        <div class="text">5.获得心の拉花日抛试戴片的用户可前往可得眼镜网app进行兑换，活动奖品将会在24小时内以抵用券的形式发放到您的账户中，前往产品页面下单即可抵扣商品金额，<span class="imp">仅抵扣商品金额不抵扣运费。</span></div>
        <div class="text">6.本次活动所有虚拟奖品或兑换券奖品，使用规则以品牌方规定为准。如有问题请咨询可得眼镜网在线客服。</div>
        <div class="closeBtn" @click="_close">×</div>
    </div>
    </centerFlip>
  </article>
</template>
<script>
import api from "@/api/user";
import centerFlip from "@/components/centerFlip";
import { mapState } from "vuex";
import authorization from "@/utils/authorization";

export default {
  data() {
    return {
      isShow:false,
      prizeText : ["戴森吹风机", "花西子彩妆套装", "星巴克礼品卡", "爱奇艺VIP月卡", "10元红包",'心の拉花日抛'],
      prizeAngle: [30, 90, 210, 270, 330,150],
      isrote:false,
      animationData:{}
    };
  },
  onShow(){
    let animation1 = wx.createAnimation({
      duration:0
    })
    animation1.rotate(0).step()
    this.animationData=animation1.export()
  },
  components: {
    centerFlip
  },
  computed: {
    ...mapState("user", ["token"])
  },
  methods: {
    startGame(){
      if(this.isrote){
        return false;
      }
      let UnionId= wx.getStorageSync('UnionId')
      this.UnionId = UnionId
      let that = this
      api.startGame(this.UnionId).then(({Data})=>{
        if(parseInt(Data.Awardlevel)==0){
           wx.showModal({
              title: '抽奖提示',
              content: Data.Prize,
              icon: "none",
              confirmText: '马上查看',
               cancelText:'关闭',
              confirmColor: '#CAB894',
              success(res) {
                if (res.confirm) {
                  that.gotobalance()
                } else if (res.cancel) {

                }
              }
            });
        }else{
          this.roteInit(Data)
        }
      })
    },
    roteInit(Data){
      let Awardlevel = parseInt(Data.Awardlevel);
      let Prize = Data.Prize;
      let PrizeType = parseInt(Data.PrizeType);
      let trueLevel = this.prizeAngle[Awardlevel-1];
      let truePrize = this.prizeText[Awardlevel-1];
      this.isrote = true
      let that = this
      let animation1 = wx.createAnimation({
        duration:2000,
        timingFunction:'ease-out'
      })
      animation1.rotate(1440+trueLevel).step()
      that.animationData=animation1.export()
      setTimeout(()=>{
        this.isrote = false
          wx.showModal({
            title: '抽奖提示',
            content: '恭喜您抽中了'+truePrize,
            icon: "none",
            confirmText: '马上查看',
            cancelText:'关闭',
            confirmColor: '#CAB894',
            success(res) {
              if (res.confirm) {
                if(PrizeType==1){//优惠券
                  that.gotocoupon()
                }else if(PrizeType==2){//红包余额
                  that.gotobalance()
                }
                
              } else if (res.cancel) {
              let animation1 = wx.createAnimation({
                    duration:0
                  })
              animation1.rotate(0).step()
              that.animationData=animation1.export()
              }
            }
          });
      },2500)
    },
    rulerShow(){
      this.isShow = true
    },
    getUserInfo(e) {
      const link = e.mp.currentTarget.dataset.link || "";
      authorization.doLogin(e.mp.detail.encryptedData, e.mp.detail.iv, () => {

      });
    },
    _getPageData() {
      if (!this.isLoading) {
        this.isLoading = true;
        api
          .getFavoriteList(this.page, this.size)
          .then(({ Data, TotalPage }) => {
            this.list = this.page > 1 ? this.list.concat(Data) : Data;
            this.totalPage = TotalPage;
            //没有搜索到任何数据
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    gotobalance(){
       wx.navigateTo({
          url:
            '/pages/account/redpackets/main'
        });
    },
    gotocoupon(){
      wx.navigateTo({
        url:
          '/pages/account/coupon/main'
      });
    },
    _close(){
      this.isShow = false
    }
  }
};
</script>

<style lang="less" scoped>
.viewport{
  background: #fff;
}
.startBtn {
    cursor: pointer;
}

.viewport .wrapBox {
    height: auto;
    padding: 0;
}

.viewport .wrapBox {
    background: #fde3ea;
}
.viewport .wrapBox .dialogC {
    margin-top: -53px;
}

.gamerule {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 290px;
    // height: 400px;
    margin-left: -145px;
    margin-top: -250px;
    z-index: 14000;
    color: #F45B87;
    background: #fff;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
    background: #FDE3EA;
    font-size: 13px;
    .ruletitle{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 124px;
        height: 28px;
      }
    }
    .text{
      margin-top: 10px;
    }
    .imp{
      background: #fe668d;
      color: #fff;
    }
}

.closeBtn {
    position: absolute;
    width: 40px;
    height: 40px;
    color: #FDE3EA;
    font-size: 40px;
    border: 3px solid #FDE3EA;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    line-height: 36px;
    bottom: -65px;
    left: 50%;
    margin-left: -20px;
    cursor: pointer;
}

.ruleBtn {
    width: 100px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
}
.gametoppng {
    position: relative;
}

.viewport .wrapBox .lotteryDrawContent {
    text-align: center;
    position: relative;
    width: 100%;
    height: 325px;
    margin-top: 20px;
}

.viewport .wrapBox .lotteryDrawContent img {
    display: block
}

.viewport .wrapBox .lotteryDrawContent .turnImg {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    width: 257px;
    height: 257px;
}

.viewport .wrapBox .lotteryDrawContent .pointImg {
    top: 52px;
    z-index: 2;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    width: 83px;
    height: 121px;
}

.viewport .wrapBox .lotteryDrawContent .startBtn {
    position: absolute;
    z-index: 3;
    top: 109.3px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 81px;
    height: 81px;
    border-radius: 50%;
    opacity: 0
}

</style>