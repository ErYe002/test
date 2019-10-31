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
        <img src="/static/images/cart_sub_icon.png" class="change-num-btn"/>
        <input type="tel" value="1" autocomplete="off" class="input-only-buy-num"/>
        <img src="/static/images/cart_add_icon.png" class="change-num-btn"/>
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

      <a class="gd_choose_click" @click="openGdpop('R')">
        右眼(R)
      </a>
      <a class="gd_choose_click" @click="openGdpop('L')">
        左眼(L)
      </a>
      <a class="gd_choose_click black">
        瞳距：62
      </a>
    </section>
    <!--精品选择-->
    <section v-if="buyType===1">
      <div class="black_line">
        Step3 请选择镜片
      </div>
      <div class="view_chose_glass_layout">
        <a class="btn_chose_glass disable">
          选择镜片
        </a>
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
          实际付款：￥0.00
        </span>
        <span style="color: white;font-size: 10px">
          (镜架：￥0.00+镜片：￥0.00)
        </span>

      </div>

      <a class="btn-50-percent black" v-if="buyType===2">
        加入购物车
      </a>

      <a class="btn-50-percent gold">
        立即购买
      </a>
    </section>
    <gdSelectPop :is-show.sync="isShowGdSelectPop" :sphere-range="SphereRange"
                 :cylinder-range="CylinderRange"
                 :axis-range="AxisRange"
                 :PD-range="PDRange"/>
  </article>
</template>

<script>
  import gdSelectPop from "../components/gdSelectPop"
  import api from "@/api/attr";

  export default {
    data() {
      return {
        buyType: 1,
        isShowGdSelectPop: false,
        SphereRange: [],
        CylinderRange: [],
        AxisRange: [],
        PDRange: []
      };
    },

    components: {
      gdSelectPop
    },

    onLoad() {
      this._getFrameData();
      this._getOptometryBillBaiscDataLibrary();
    },

    methods: {
      changeTypeEvent(type) {
        this.buyType = type;
      },

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
          this.isShowGdSelectPop = true;
        } else if (side === 'R') {
          this.isShowGdSelectPop = true;
        }
      },
      _getFrameData() {
        api.getFrameJoinCart('665cc444-4bd4-4f63-80b4-78bb58a00116', false).then(({Data}) => {
          console.log("主数据", Data)

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
      }

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


</style>
