<template>
  <article :class="{'bottomflip-box': true, 'show': isShow}">
    <div class="bf-cover-bg" @click="hide"></div>
    <div class="bf-container-t">
        <div class="coupon" v-if="!flag">
            <img src="/static/images/newCoupon.png" alt="" mode='widthFix' class="action_btn">
            <div class="total-price">新人{{totalCouponValue}}元福利礼包</div>
            <scroll-view scroll-y class="coupon-contain">
                <div class="coupon-box" @click="receiveCoupon">
                    <div class="item" v-for="(item,index) in couponList" :key="index">
                    <span class="left-point"></span>
                    <span class="right-point"></span>
                    <div class="price"><i class="left">￥</i><span class="right">{{item.price}}</span></div>
                    <div class="des">{{item.title}}</div>
                    <div class="btn">去领券></div>
                    </div>
                </div>
            </scroll-view>
            <!-- <a :href="'/pages/account/coupon/main'" class="coupon-a" @click="hide">
            <img src="/static/images/coupongift.png" mode="widthFix" alt="" class="coupon-img"></a> -->
        </div>
         <div class="coupon" v-else>
            <div class="content">
                <div class="first">恭喜您</div>
                <div class="two">收到{{totalCouponValue}}元新人礼券</div>
                <div class="three">
                    <img class="img" src="/static/images/totalCoupon.png" alt="">
                </div>
                <div class="four">/新人券48小时内有效/</div>
                <div class="five">
                    <div class="left" @click="gocoupon">查看礼券</div>
                    <div class="right"  @click="goindex">去购物吧</div>
                </div>
            </div>
        </div>
    </div>
  </article>
</template>

<script>
export default {
  
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
    data() {
        return {
            couponList:[],
            totalCouponValue:'',
            flag:false
        };
    },
    watch: {
        isShow: {
            handler: function (val) {
                //父与子组件同步isShow值
                this.$emit('update:isShow', val);
                if (val === true) {
                this.getData()
                }else{
                this.$emit('update:isShow', false)
                }
            }
        },
    },
  methods: {
    // show(){
    //   this.isShow = true
    // },
    hide() {
      this.$emit('update:isShow', false)
      this.$emit('hide') //事件回调
    },
    getData(){
        let temp = 0
        this.couponList=[
            {
                price:8,
            title:'无门槛券'
            },
            {
                price:10,
            title:'满70-减10'
            },
            {
                price:20,
            title:'满100-减20'
            },
            {
                price:30,
            title:'满200-减30'
            },
            {
                price:40,
            title:'满300-减40'
            },
            {
                price:50,
            title:'满400-减50'
            },
        ]
        this.couponList.forEach(item=>{
            temp+=item.price
        })
        this.totalCouponValue = temp
    },
    receiveCoupon(){
        this.flag=true
        wx.showToast({
            title: '领取成功',
            icon: 'success'
        })
    },
    goindex() {
        this.hide()
        wx.switchTab({
            url: "/pages/index/main"
        });
    },
    gocoupon() {
        this.hide()
        wx.navigateTo({
            url: "/pages/account/coupon/main"
        });
    },
  }
};
</script>

<style lang="less" scoped>
/*底部弹出层*/
.bottomflip-box {
  position: relative;

  .bf-cover-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: none;
  }

  .bf-container-t {
   
    display: none;
  }

  &.show {
    .bf-cover-bg {
      display: block;
    }
    .bf-container-t {
      display: block;
    }
  }
}
.coupon{
    position: fixed;
    z-index: 10000;
    left: 0;
    right: 0;
    top:0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 260px;
    margin: 50px auto;
    padding: 10px;
      .action_btn{
        width: 100%;
        border: 0;
      }
  
  .coupon-contain{
    width: 100%;
    background: #ee1206;
    margin: 0 10px;
    height: 260px;
    margin-top: -1px;
    overflow: hidden;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .coupon-box{
    padding: 0 10px;
    background: #ee1206;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    .item{
      width: 48%;
      height: 70px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .left-point,.right-point{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background:#ee1206;
        position: absolute;
        top: 30px;
      }
      .left-point{
        left: -5px;
      }
      .right-point{
        right: -5px;
      }
      .des{
        font-size: 14px;
      }
      .price{
        font-weight: bold;
        display: flex;
        justify-content: center;
        color: #ee1206;
        align-items: flex-end;
        .left{
          font-size: 12px;
        }
        .right{
          font-size: 18px;
        }
      }
      .btn{
        padding: 1px 4px;
        font-size: 12px;
        color: #fff;
        background:#ee1206;
        border-radius: 10px;
      }
    }
  }
  .total-price{
    position: absolute;
    left: 0;
    right: 0;
    top: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    font-weight: bold;
    color: #ee1206;
    font-size: 18px;
  }
}
.content{
    margin-top: 60px;
    width: 100%;
    padding: 10px;
    // height: 300px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .first,.two{
        color: #000000;
        font-size: 18px;
    }
    .three{
        margin-top: 20px;
        .img{
            width: 175px;
            height: 98px;
        }
    }
    .four{
        color: #FE668D;
        font-size: 12px;
        margin-bottom: 60px;
    }
    .five{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF;
        font-size: 15px;
        .left,.right{
            width: 90px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 5px;
        }
        .left{
            margin-right: 30px;
            background: #BDAF92;
        }
        .right{
            background: #313131;
        }
    }
}
</style>