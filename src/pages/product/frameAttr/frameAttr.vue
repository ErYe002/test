<template>
  <article class="contain">
    <!--最顶部选择-->
    <section class="out-box">
      <div class="black_line">
        <span>Step1</span> 请确认购买需求
      </div>
      <div class="frame_buy_type">
        <div @click="changeTypeEvent(1)" class="frame_buy_type_box">
            <img v-if="buyType===1" src='/static/images/frameA_light.png' class="frame_bug_frame_and_glass"
             />
             <img v-else src='/static/images/frameA_gray.png' class="frame_bug_frame_and_glass"
             />
             <span :class="{'active':buyType===1}">需要镜架+镜片</span>
        </div>
        <div @click="changeTypeEvent(2)" class="frame_buy_type_box">
            <img v-if="buyType===2" src='/static/images/frameB_light.png' class="frame_bug_frame_and_glass"
             />
             <img v-else src='/static/images/frameB_gray.png' class="frame_bug_frame_and_glass"
             />
             <span :class="{'active':buyType===2}">仅需要镜架</span>
        </div>
      </div>
      <!-- <div class="line"/> -->
    </section>

    <!--仅框架购买的数量选择-->
    <div style="padding: 10px 15px" v-if="buyType===2" class="out-box">
      <span>
        数量
      </span>
      <div style="display: flex;margin-top: 13px">
        <img src="/static/images/cart_sub_icon.png" class="change-num-btn" @click="onlyBuyFrameChangeNumEvent(-1)"/>
        <input type="tel" :value="onlyBuyFrameNum" v-model="onlyBuyFrameNum" autocomplete="off"
               class="input-only-buy-num"/>
        <img src="/static/images/cart_add_icon.png" class="change-num-btn" @click="onlyBuyFrameChangeNumEvent(1)"/>
      </div>
    </div>

    <section class="out-box" v-if="buyType===1">
    <!--验光单选择-->
    <div class="black_line" v-if="buyType===1">
      <span>Step2</span> 请选择光度
    </div>

      <section class="not_choose_gd_layout" v-if="buyType===1">

        <!--<div class="frame_old_buy_gd_net_select_layout">
          <span class="text_title_choose_gdinfo">
            直接选用验光单
          </span>
          <img src='/static/images/frame_frequenter_suggest.png' class="frame_old_customer_suggest_text"/>
        </div>

        <a class="btn_chose_glass">
          选择验光单
        </a>

        <div style="height: 20px"></div>-->
        <div class="frame_old_buy_gd_net_select_layout">
          <span class="text_title_choose_gdinfo">
            选择光度
          </span>
          <img src='/static/images/frame_new_customer_suggest.png' class="frame_old_customer_suggest_text"/>
        </div>

        <a class="gd_choose_click" @click="openGdpop('R')" v-if="postInfoBean.sphR===''">
          右眼(R)
        </a>
        <a class="gd_choose_click" @click="openGdpop('R')" v-if="postInfoBean.sphR!==''">
          {{'右眼 光度:'+postInfoBean.sphR+' 散光:'+postInfoBean.cylR+' 轴位:'+postInfoBean.axisR}}
        </a>
        <a class="gd_choose_click" @click="openGdpop('L')" v-if="postInfoBean.sphL===''">
          左眼(L)
        </a>
        <a class="gd_choose_click" @click="openGdpop('L')" v-if="postInfoBean.sphL!==''">
          {{'左眼 光度:'+postInfoBean.sphL+' 散光:'+postInfoBean.cylL+' 轴位:'+postInfoBean.axisL}}
        </a>
        <a class="gd_choose_click black" @click="openGdpop('P')">
          {{'瞳距：'+postInfoBean.pd}}
        </a>
      </section>
    </section>
    <!--精品选择-->
    <section v-if="buyType===1&& groupGlassData.length>0" class="out-box">
      <div class="black_line jingpian">
        <i><span>Step3</span> 请选择镜片</i>
        <div class="view_chose_glass_layout">
          <a :class="glassBtnCanClick?'btn_chose_glass': 'btn_chose_glass disable'" @click="startGlassAct"
            v-if="!glassSelected">
            选择镜片
          </a>
        </div>
      </div>
        <div class="view_chose_glass_layout">
          <!-- <a :class="glassBtnCanClick?'btn_chose_glass': 'btn_chose_glass disable'" @click="startGlassAct"
            v-if="!glassSelected">
            选择镜片
          </a> -->

          <div class="glass-choosed-layout" v-if="glassSelected">
            <img :src="glassBean.ImageUrl" class="glass-image"/>
            <div class="mid-text-view">
              <div class="glass-text">
                {{glassBean.GoodsName}}
              </div>

              <div class="text-pair">
                一对 ￥{{glassBean.SellPrice}}
              </div>
            </div>

            <div class="text-change" @click="startGlassAct">
              更换 >
            </div>
          </div>
        </div>
    </section>
    <div class="contact-service-layout">
      <div>
        联系客服
      </div>
      <img src="/static/images/icon_exclamation_mark.png" style="height: 20px;width: 20px"/>
    </div>

    <!--单买镜架显示-->
    <section class="bottom-buy-btn-layout">
      <div class="btn-50-percent black" v-if="buyType===1">
        <span style="color: white;font-size: 13px">
          实际付款：￥{{frameSalePrice+glassSalePrice}}
        </span>
        <span style="color: white;font-size: 10px">
          (镜架：￥{{frameSalePrice}}+镜片：￥{{glassSalePrice}})
        </span>

      </div>

      <a class="btn-50-percent black" :style="buyType===2?'':'background:#BCB092'"  @click="buyGoods(false)">
        加入购物车
      </a>

      <a class="btn-50-percent gold" v-if="buyType===2" @click="buyGoods(true)">
        立即购买
      </a>
    </section>
    <gdSelectPop :is-show.sync="isShowGdSelectPop" :sphere-range="SphereRange"
                 :cylinder-range="CylinderRange"
                 :axis-range="AxisRange"
                 :pd-range="PDRange"
                 :open-state="openGdPopState"
                 :select-bean="postInfoBean"
                 @backData="gdBackInfo"/>
  </article>
</template>

<script>
  import gdSelectPop from "../components/gdSelectPop"
  import api from "@/api/attr";
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        buyType: 1,
        isShowGdSelectPop: false,
        SphereRange: [],
        CylinderRange: [],
        AxisRange: [],
        PDRange: [],
        postInfoBean: {sphR: '', sphL: '', cylR: '', cylL: '', axisR: '', axisL: '', pd: '62'},
        gdStartSide: '',
        openGdPopState: 1,
        onlyBuyFrameNum: 1,
        mainData: {},
        groupGlassData: [],
        glassSelected: false,
        glassBean: {},
        frameSalePrice: 0,
        glassSalePrice: 0,
        glassBtnCanClick: false,
        postIdBean: {
          sphRId: '',
          sphLId: '',
          cylRId: '',
          cylLId: '',
          axisRId: '',
          axisLId: '',
          pdId: '62',
          groupPId: '',
          glassPId: ''
        },
        MaxSellNumber: '',
        GoodsName: '',
        SeriesId: '',
        MarketPrice: '',
        SalePrice: '',
        SaleScore: '',
        IsScarcity: '',
        IsSpecialOffer: '',
        SaleStockType: '',
        MaxDeduction: '',
        IsFreeCarriage: '',
        RealGoodsId: '',
        goodsId: '',
        shopId:"",
        RoleId:"",
        isConfirmedBuy: false,
        glassSelectPosiition: -1,
        groupSelectPosition: -1
      };
    },

    computed: {
      ...mapState("groupGlassList", ["glassGroupSelectPosition"]),
    },


    components: {
      gdSelectPop
    },

    onLoad(options) {
      console.log("传递过来的参数", options);
      this.MaxSellNumber = options.MaxSellNumber;
      this.GoodsName = options.GoodsName;
      this.SeriesId = options.SeriesId;
      this.MarketPrice = options.MarketPrice;
      this.SalePrice = options.SalePrice;
      this.SaleScore = options.SaleScore;
      this.IsScarcity = options.IsScarcity;
      this.IsSpecialOffer = options.IsSpecialOffer;
      this.SaleStockType = options.SaleStockType;
      this.MaxDeduction = options.MaxDeduction;
      this.IsFreeCarriage = options.IsFreeCarriage;
      this.RealGoodsId = options.RealGoodsId;
      this.goodsId = options.goodsId;
       this.RoleId =  options.RoleId;
      this._getFrameData(options.goodsId);
      this._getOptometryBillBaiscDataLibrary();
      if(wx.getStorageSync('postIdBean')&&wx.getStorageSync('postInfoBean')){
        this.postInfoBean = Object.assign({},wx.getStorageSync('postInfoBean'))
        this.postIdBean = Object.assign({},wx.getStorageSync('postIdBean'),{groupPId: '',glassPId: ''})
      }
        
    },

    watch: {
      onlyBuyFrameNum: function (val, oldVal) {
        if (val < 1) {
          this.onlyBuyFrameNum = 1;
        }
      },
      glassGroupSelectPosition: {
        handler: function (val, oldVal) {
          if (this.groupGlassData.length > 0) {
            let glassList = this.groupGlassData[val.groupPosition].EyeGlassList;
            this.groupSelectPosition = val.groupPosition;
            this.glassSelectPosiition = val.glassosition;

            if (glassList.length > val.glassosition) {
              this.glassBean = glassList[val.glassosition];
              this.glassSelected = true;
              this.glassSalePrice = glassList[val.glassosition].SellPrice;
              this.postIdBean.groupPId = this.groupGlassData[val.groupPosition].GlassGroupId;
              this.postIdBean.glassPId = glassList[val.glassosition].GlassGoodsId;
              console.log('姜片集合', this.groupGlassData[val.groupPosition].GlassGroupId, glassList[val.glassosition].GlassGoodsId);
            }
          }
        },
      },
      postInfoBean: {
        handler: function (val, oldVal) {
          console.log('光度', val);
          this.glassBtnCanClick = (val.cylL !== '' && val.cylR !== '');
        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      changeTypeEvent(type) {
        this.buyType = type;
      },
      ...mapActions('groupGlassList', ['setAttrGlassList']),

      _getImageUrlByType(whichUse) {

        if (whichUse === 1) {
          if (this.buyType === 1) {
            return '/static/images/a_frame_select.png';
          } else {
            return '/static/images/a_frame_unselect.png';
          }
        } else {
          if (this.buyType === 2) {
            return '/static/images/a_frame_select.png';
          } else {
            return '/static/images/a_frame_unselect.png';
          }
        }
      },
      openGdpop(side) {

        if (side === 'L') {
          this.openGdPopState = 1;
          this.gdStartSide = 'L';
        } else if (side === 'R') {
          this.openGdPopState = 2;
          this.gdStartSide = 'R';
        } else {
          this.gdStartSide = 'P';
          this.openGdPopState = 3;
        }

        this.isShowGdSelectPop = true;
      },
      _getFrameData(goodsId) {
        api.getFrameJoinCart(goodsId, false).then(({Data}) => {
          console.log("主数据", Data);
          this.mainData = Data;
          this.groupGlassData = Data.GlassGroup;
          this.frameSalePrice = this.SalePrice;
          this.shopId = Data.MainGoods.ShopId;
        });
      },
      _getOptometryBillBaiscDataLibrary() {
        api.getOptometryBillBaiscDataLibrary().then((Data) => {
          console.log('光度信息', Data);
          this.SphereRange = Data.Data.SphereRange;
          this.CylinderRange = Data.Data.CylinderRange;
          this.AxisRange = Data.Data.AxisRange;
          this.PDRange = Data.Data.PDRange;
        });
      },
      gdBackInfo(data) {
        console.log('返回', data);

        if (this.gdStartSide === 'L') {
          this.postInfoBean.sphL = data.selectSPH;
          this.postInfoBean.cylL = data.selectCYL;
          if (data.selectCYL === '无') {
            this.postInfoBean.axisL = '无';
          } else {
            this.postInfoBean.axisL = data.selectAXIS;
          }
        } else if (this.gdStartSide === 'R') {
          this.postInfoBean.sphR = data.selectSPH;
          this.postInfoBean.cylR = data.selectCYL;
          if (data.selectCYL === '无') {
            this.postInfoBean.axisR = '无';
          } else {
            this.postInfoBean.axisR = data.selectAXIS;
          }
        } else if (this.gdStartSide === 'P') {
          this.postInfoBean.pd = data.selectPD;
        }

      },
      onlyBuyFrameChangeNumEvent(addOrSub) {
        this.onlyBuyFrameNum += addOrSub;
      },
      startGlassAct() {

        if (this.postInfoBean.cylR !== '' && this.postInfoBean.cylL !== '') {
          this.setAttrGlassList({GlassGroup: this.mainData.GlassGroup, frameEyeInfo: this.postInfoBean});
          wx.navigateTo({
            url: '/pages/product/glassSelect/main?groupSelectPosition=' + this.groupSelectPosition + '&glassSelectPosiition=' + this.glassSelectPosiition,
          });
        } else {
          wx.showToast({title: '请选择双眼光度', icon: 'none'});
        }

      },
      selectGlassEvent() {

      },
      confirmedBuyShow(Msg) {
        let self = this;
        wx.showModal({
          title: '提示',
          content: Msg,
          icon: "none",
          confirmText: '确定',
          cancelText: '取消',
          confirmColor: '#CAB894',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              self.isConfirmedBuy = true;
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      buyGoods(immediately) {
        let that = this;
        let pushData = new Map();

        pushData.set('goodsId', this.mainData.GoodsId);
        pushData.set('IsConfirmedBuy', this.isConfirmedBuy);
        pushData.set('ShopId', this.mainData.MainGoods.ShopId);
         if(immediately){
          pushData.set('IsSingleGoodsBuy', true);//标记是否是单买商品。
        }
        if (this.buyType === 2) {
          pushData.set('Quantity', this.onlyBuyFrameNum);
          pushData.set('GDPropertyGifts', '');
          pushData.set('SelectedSpecifications', '');
          pushData.set('NoPropertyGifts', '');

          //只购买框架增加的额外参数
          pushData.set("MaxSellNumber", '0');
          pushData.set("GoodsName", 'HAN COLLECTION光学眼镜架HD3101 F01哑黑');
          pushData.set("SeriesId", '70b84d88-0689-48c9-89fb-738f51094395');
          pushData.set("MarketPrice", '69.0');
          pushData.set("SalePrice", '69.0');
          pushData.set("SaleScore", '69.0');
          pushData.set("IsScarcity", 'false');
          pushData.set("IsSpecialOffer", 'false');
          pushData.set("SaleStockType", '0');
          pushData.set("MaxDeduction", '0');
          pushData.set("IsFreeCarriage", 'false');
          api.buyNoPropertyFrame(pushData).then(({Data}) => {
            console.log("提交订单", Data);
            this.$getCartCount();
            if (immediately) {
              // wx.switchTab({
              //   url: '/pages/cart/main'
              // });
               wx.navigateTo({
                url:
                    "/pages/order/index/main?shopId=" +
                    that.shopId +
                    "&RoleId=" +
                    that.RoleId + 
                    "&IsSingleGoodsBuy=" + true
              });
            } else {
              wx.showToast({
                title: "加入购物车成功",
                icon: "none"
              });
            }
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        } else {
          ///选择ID

          if (!this.glassSelected) {
            wx.showToast({title: '请选择镜片', icon: 'none'});
            return;
          }

          for (let sph of this.mainData.Sph) {
            if (sph.FieldValue === this.postInfoBean.sphL) {
              this.postIdBean.sphLId = sph.FieldId;
            }

            if (sph.FieldValue === this.postInfoBean.sphR) {
              this.postIdBean.sphRId = sph.FieldId;
            }
          }

          for (let cyl of this.mainData.CYL) {
            if (cyl.FieldValue === this.postInfoBean.cylL) {
              this.postIdBean.cylLId = cyl.FieldId;
            }

            if (cyl.FieldValue === this.postInfoBean.cylR) {
              this.postIdBean.cylRId = cyl.FieldId;
            }
          }

          for (let axis of this.mainData.Axis) {
            if (axis.FieldValue === this.postInfoBean.axisL) {
              this.postIdBean.axisLId = axis.FieldId;
            }

            if (axis.FieldValue === this.postInfoBean.axisR) {
              this.postIdBean.axisRId = axis.FieldId;
            }
          }

          for (let pd of this.mainData.PD) {
            if (pd.FieldValue === this.postInfoBean.pd) {
              this.postIdBean.pdId = pd.FieldId;
            }
          }
          pushData.set("IsBuyByScore", 'false');
          pushData.set("LeftQuantity", '0');
          pushData.set("RightQuantity", '0');
          pushData.set("GlassGroupId", this.postIdBean.groupPId);
          pushData.set("GlassGoodsId", this.postIdBean.glassPId);
          pushData.set("LeftGD", this.postIdBean.sphLId);
          pushData.set("RightGD", this.postIdBean.sphRId);
          pushData.set("LeftSG", this.postIdBean.cylLId);
          pushData.set("RightSG", this.postIdBean.cylRId);
          pushData.set("LeftZW", this.postIdBean.axisLId);
          pushData.set("RightZW", this.postIdBean.axisRId);
          pushData.set("TongJu", this.postIdBean.pdId);
          wx.setStorageSync('postIdBean', this.postIdBean)
          wx.setStorageSync('postInfoBean', this.postInfoBean)
          api.buyFrameAndGlass(pushData).then(({Data}) => {

            this.$getCartCount();
            if (immediately) {
              // wx.switchTab({
              //   url: '/pages/cart/main'
              // });
              wx.navigateTo({
                url:
                    "/pages/order/index/main?shopId=" +
                    that.shopId +
                    "&RoleId=" +
                    that.RoleId + 
                    "&IsSingleGoodsBuy=" + true
              });
            } else {
              wx.showToast({
                title: "加入购物车成功",
                icon: "none"
              });
            }

          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        }

      },

    }
  };
</script>

<style lang="less">
.contain{
  background: #f2f2f2;
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
}
.out-box{
    background: #fff;
    margin: 10px;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;
}
.jingpian{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px !important;
}
  .black_line {
    width: 100%;
    height: 26px;
    line-height: 26px;
    color: #000;
    font-size: 13px;
    padding: 5px;
    // margin-top: 20px;
    text-indent: 1em;
    span{
      font-weight: bold;
    }
  }

  .frame_buy_type {
    width: 100%;
    height: 70px;
    display: flex;
    border-top: 0.5px solid #CCCCCC;
    box-sizing: border-box;
    align-items: center;
    .frame_buy_type_box{
      width: 50%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9C9C9E;
      box-sizing: border-box;
      .frame_bug_frame_and_glass{
        width: 26.5px;
        height: 26.5px;
      }
      &:first-child{
        border-right: 0.5px solid #CCCCCC;
      }
      span{
        margin-left: 5px;
      }
    }
    .active{
      color: #BCB092;
    }
  }

  .line {
    background: #F2F2F2;
    height: 6px;
    width: 100%;
  }

  .btn_chose_glass {
    background: #cab894;
    color: #fff;
    height: 30px;
    width: 100%;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.disable {
      background-color: #aaaaaa;
    }
  }

  .view_chose_glass_layout {
    margin: 8px 16px;
    box-sizing: border-box;
  }

  .change-num-btn {
    width: 30px;
    height: 18px;
  }

  .input-only-buy-num {
    width: 35px;
    height: 18px;
    text-align: center;
  }

  .not_choose_gd_layout {
    background: #f2f2f2;
    padding: 0 15px 10px 15px;
    margin: 5px;
    border-radius: 20px;
    .frame_old_buy_gd_net_select_layout {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 35px;
      .text_title_choose_gdinfo {
        color: #343434;
        margin-top: 4px;
        font-size: 13px;
      }
      .frame_old_customer_suggest_text {
        width: 88px;
        height: 18px;
        margin-left: 6px;
      }
    }
    .gd_choose_click {
      border: 1px solid #eeeeee;
      margin-top: 8px;
      height: 37px;
      display: flex;
      color: #b6b6b6;
      align-items: center;
      justify-content: center;
      background: #fff;
      &.black {
        color: black;
      }
    }
  }

  .contact-service-layout {
    display: flex;
    flex-direction: row-reverse;
    padding: 20px 15px;
  }

  .bottom-buy-btn-layout {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    flex-direction: row;
    .btn-50-percent {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 50px;
      color: white;
      align-items: center;
      justify-content: center;
      &.black {
        background-color: #000;
      }
      &.gold {
        background-color: #BCB092;
      }

    }
  }

  .glass-choosed-layout {
    display: flex;
    flex-direction: row;

    .glass-image {
      width: 80px;
      height: 80px;
    }

    .mid-text-view {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 5px 10px;

      .glass-text {
        font-size: 14px;
        color: #333333;
      }

      .text-pair {
        font-size: 14px;
        color: red;
        margin-top: 3px;
      }

    }

    .text-change {
      font-size: 14px;
      color: #cab894;
      margin-top: 5px;
    }
  }


</style>
