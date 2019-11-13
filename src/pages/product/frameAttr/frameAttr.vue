<template>
  <article>
    <!--最顶部选择-->
    <section>
      <div class="black_line">
        Step1 请确认购买需求
      </div>
      <div class="frame_buy_type">
        <img v-if="buyType===1" src='/static/images/a_frame_select.png' class="frame_bug_frame_and_glass"
             @click="changeTypeEvent(1)"/>
        <img v-else="buyType===2" src='/static/images/a_frame_unselect.png' class="frame_bug_frame_and_glass"
             @click="changeTypeEvent(1)"/>
        <img v-if="buyType===2" src='/static/images/b_frame_select.png' class="frame_bug_frame_and_glass"
             @click="changeTypeEvent(2)"/>
        <img v-else="buyType===1" src='/static/images/b_frame_unselect.png' class="frame_bug_frame_and_glass"
             @click="changeTypeEvent(2)"/>
      </div>
      <div class="line"/>
    </section>

    <!--仅框架购买的数量选择-->
    <div style="padding: 10px 15px" v-if="buyType===2">
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
    <!--验光单选择-->
    <div class="black_line" v-if="buyType===1">
      Step2 请选择光度
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
        {{'右眼 光度:'+postInfoBean.sphL+' 散光:'+postInfoBean.cylL+' 轴位:'+postInfoBean.axisL}}
      </a>
      <a class="gd_choose_click black" @click="openGdpop('P')">
        {{'瞳距：'+postInfoBean.pd}}
      </a>
    </section>
    <!--精品选择-->
    <section v-if="buyType===1&& groupGlassData.length>0">
      <div class="black_line">
        Step3 请选择镜片
      </div>
      <div class="view_chose_glass_layout">
        <a :class="glassBtnCanClick?'btn_chose_glass': 'btn_chose_glass disable'" @click="startGlassAct"
           v-if="!glassSelected">
          选择镜片
        </a>

        <div class="glass-choosed-layout" v-else>
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
      <div class="line"/>
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

      <a class="btn-50-percent black" v-if="buyType===2">
        加入购物车
      </a>

      <a class="btn-50-percent gold" @click="buyGoods">
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
        goodsId:''
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
      this._getFrameData();
      this._getOptometryBillBaiscDataLibrary();
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
      _getFrameData() {
        api.getFrameJoinCart('53c107dd-f456-4383-8aa9-a5efb8ac83c7', false).then(({Data}) => {
          console.log("主数据", Data);
          this.mainData = Data;
          this.groupGlassData = Data.GlassGroup;
          this.frameSalePrice = Data.MainGoods.SalePrice;
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
            url: '/pages/product/glassSelect/main',
          });
        } else {
          wx.showToast({title: '请选择双眼光度', icon: 'none'});
        }

      },
      selectGlassEvent() {

      },
      buyGoods() {

        let pushData = new Map();

        pushData.set('goodsId', this.mainData.GoodsId);
        pushData.set('IsConfirmedBuy', 'false');
        pushData.set('ShopId', this.mainData.MainGoods.ShopId);
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
          pushData.set("IsBuyByScore", '');
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

          api.buyFrameAndGlass(pushData).then(({Data}) => {
            console.log("提交订单", Data);
          });
        }

      },

    }
  };
</script>

<style lang="less">
  .black_line {
    width: 100%;
    height: 23px;
    color: #ffffff;
    font-size: 13px;
    background: #000000;
    margin-top: 20px;
    text-indent: 1em;
  }

  .frame_buy_type {
    width: 100%;
    height: 86px;
    display: flex;
    align-items: center;

    .frame_bug_frame_and_glass {
      width: 50%;
      height: 45px;
      margin: 0 15px;
    }

    .frame_only_buy_frame {
      width: 50%;
      height: 45px;
      margin: 0 15px;
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
    height: 36px;
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

    padding: 0 15px;

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
        background-color: black;
      }
      &.gold {
        background-color: #cab894;
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
