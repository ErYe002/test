<template>

  <div>
    <div class="goods-name">
      {{mainGoods.GoodsName}}
    </div>

    <div class="series-title">
      款式花色
    </div>

    <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
      <div class="item-series-layout">
        <div class="item-single" v-for="(item,index) in SeriesItems" :key="index" @click="changeSeries(index)">
          <img :src="item.SeriesImg" :class="seriesPosition===index?'series-image select':'series-image'"/>
          <div class="item-text-color">
            {{item.AnotherName}}
          </div>
        </div>
      </div>
    </scroll-view>

    <img src="/static/images/imaginary_line.png" class="line"/>

    <div class="yinx-gd-layout" v-if="currentGoodsType!==0">
      <div class="gd-num-title">
        光度及数量
      </div>

      <div class="gd-choose-layout" v-if="currentGoodsType===2">
        <div class="text-eye">
          右眼R
        </div>

        <div class="choose-gd-click-layout" @click="openGdSelectPop('R')">
          <div class="text-gd-show" v-if="GoodsFields.length===1">
            {{postShowDouble.sphR===''?'请选择光度':postShowDouble.sphR}}
          </div>
          <div class="text-gd-show" v-if="GoodsFields.length>1">
            {{postShowDouble.sphR===''?'请选择光度':('光度 '+postShowDouble.sphR+' 散光 '+postShowDouble.cylR + ' 轴位 ' +
            postShowDouble.axisR)}}
          </div>
          <img src="/static/images/icon_attr_down.png" class="icon-arr-down"/>
        </div>
        <div style="display: flex;">
          <img src="/static/images/cart_sub_icon.png" class="change-num-btn" @click="numchangeEvent('R',-1)"/>
          <input type="tel" :value="rightNum" v-model="rightNum" autocomplete="off"
                 class="input-only-buy-num"/>
          <img src="/static/images/cart_add_icon.png" class="change-num-btn" @click="numchangeEvent('R',1)"/>
        </div>
      </div>

      <div class="gd-choose-layout" v-if="currentGoodsType===2">
        <div class="text-eye">
          左眼L
        </div>

        <div class="choose-gd-click-layout" @click="openGdSelectPop('L')">
          <div class="text-gd-show" v-if="GoodsFields.length===1">
            {{postShowDouble.sphL===''?'请选择光度':postShowDouble.sphL}}
          </div>
          <div class="text-gd-show" v-if="GoodsFields.length>1">
            {{postShowDouble.sphL===''?'请选择光度':('光度 '+postShowDouble.sphL+' 散光 '+postShowDouble.cylL + ' 轴位 ' +
            postShowDouble.axisL)}}
          </div>
          <img src="/static/images/icon_attr_down.png" class="icon-arr-down"/>
        </div>
        <div style="display: flex;">
          <img src="/static/images/cart_sub_icon.png" class="change-num-btn" @click="numchangeEvent('L',-1)"/>
          <input type="tel" :value="leftNum" v-model="leftNum" autocomplete="off"
                 class="input-only-buy-num"/>
          <img src="/static/images/cart_add_icon.png" class="change-num-btn" @click="numchangeEvent('L',1)"/>
        </div>
      </div>

      <div class="gd-choose-layout" v-if="currentGoodsType===1">
        <div class="text-eye">
          光度
        </div>

        <div class="choose-gd-click-layout" @click="openGdSelectPop('S')">
          <div class="text-gd-show" v-if="GoodsFields.length===1">
            {{postShowSingle.sph===''?'请选择光度':postShowSingle.sph}}
          </div>
          <div class="text-gd-show" v-if="GoodsFields.length>1">
            {{postShowSingle.sph===''?'请选择光度':('光度 '+postShowSingle.sph+' 散光 '+postShowSingle.cyl + ' 轴位 ' +
            postShowSingle.axis)}}
          </div>
          <img src="/static/images/icon_attr_down.png" class="icon-arr-down"/>
        </div>
        <div style="display: flex;">
          <img src="/static/images/cart_sub_icon.png" class="change-num-btn" @click="numchangeEvent('S',-1)"/>
          <input type="tel" :value="singleNum" v-model="singleNum" autocomplete="off"
                 class="input-only-buy-num"/>
          <img src="/static/images/cart_add_icon.png" class="change-num-btn" @click="numchangeEvent('S',1)"/>
        </div>
      </div>

    </div>

    <div class="bottom-layou">
      <img src="/static/images/icon_sph_conversion.png" class="gd-huansuan"/>
      <img src="/static/images/icon_contact_service_new.png" class="contact-service"/>
    </div>


    <div class="btm-buy-btn-layout">
      <div class="put-into-cart" @click="buyGoods(false)">
        加入购物车
      </div>

      <div class="buy-it-now" @click="buyGoods(true)">
        立即购买
      </div>

    </div>
    <gdNromalSelectPop
      :is-show.sync="isShowGdSelectPop"
      :gd-list="GoodsFields"
      :sph-list="sphList"
      :cyl-list="cylList"
      :axis-list="axisList"
      @backData="gdBackInfo"
    />
  </div>

</template>

<script>
  import api from "@/api/attr";
  import gdNromalSelectPop from "../components/gdNromalSelectPop"

  export default {
    name: "normal-attr",

    props: {
      buyNoProperty: 'api/cart/BuyNoProperty',
      buyDoubleProperty: 'api/cart/BuyDoubleProperty',
      buyDoubleCustomizedProperty: 'api/cart/BuyDoubleCustomizedProperty',
      buyNoPropertyFrame: 'api/cart/BuyNoPropertyFrame',
      buySinglePropertyFrame: 'api/cart/BuySingleProperty',
    },

    data() {
      return {
        seriesPosition: -1,
        mainData: {},
        mainGoods: {},
        SeriesItems: [],
        GoodsFields: [],
        sphList: [],
        cylList: [],
        axisList: [],
        leftNum: 1,
        rightNum: 1,
        singleNum: 1,
        noPropertyQuantity: 1,
        currentGoodsType: 2,// 0 无属性  1 有单个属性 2有2个属性
        isShowGdSelectPop: false,
        openSide: '',
        postShowDouble: {sphL: '', sphR: '', cylL: '', cylR: '', axisL: '', axisR: ''},
        postShowSingle: {sph: '', cyl: '', axis: ''},
        postShowIdSingle: {sphId: ''},
        postIdDouble: {sphLId: '', sphRId: '', cylLId: '', cylRId: '', axisLId: '', axisRId: ''},
      };
    },
    onLoad() {
      this._getData('96019ffe-607d-44d1-b567-00e7a85e899e');

    },
    watch: {
      leftNum: function (val, oldVal) {
        if (val < 0) {
          this.leftNum = 0;
        }
      },
      rightNum: function (val, oldVal) {
        if (val < 0) {
          this.rightNum = 0;
        }
      },
      singleNum: function (val, oldVal) {
        if (val < 0) {
          this.singleNum = 0;
        }
      },
    },
    components: {
      gdNromalSelectPop
    },
    methods: {
      _getData(goodsId) {
        // api.postGoodsJoinCartNormal('179e08dc-d38a-42ed-a2ab-5b9516ea1bfd', null, false, false, true).then(({Data}) => {
        api.postGoodsJoinCartNormal(goodsId, null, false, false, true).then(({Data}) => {
          console.log("主数据", Data);
          this.mainData = Data;
          this.mainGoods = Data.MainGoods;
          this.SeriesItems = Data.MainGoods.SeriesItems;
          this.GoodsFields = Data.MainGoods.GoodsFields;
          this.setGdInfo(Data.MainGoods.GoodsFields);


          //设置当前选中的系列坐标
          for (let i = 0; i < Data.MainGoods.SeriesItems.length; i++) {
            let item = Data.MainGoods.SeriesItems[i];
            if (item.GoodsId === Data.MainGoods.GoodsId) {
              this.seriesPosition = i;
            }
          }

          //清除数据
          this.postShowDouble = {sphL: '', sphR: '', cylL: '', cylR: '', axisL: '', axisR: ''};
          this.postShowSingle = {sph: '', cyl: '', axis: ''};
          this.postIdDouble = {sphLId: '', sphRId: '', cylLId: '', cylRId: '', axisLId: '', axisRId: ''};
        });

      },
      numchangeEvent(side, num) {
        if (side === 'R') {//右
          this.rightNum += num;
        } else if (side === 'L') {//左
          this.leftNum += num;
        } else {//单
          this.singleNum += num;
        }
      },
      openGdSelectPop(side) {
        this.openSide = side;
        this.isShowGdSelectPop = true;
      },
      gdBackInfo(Data) {

        if (this.openSide === 'R') {
          this.postShowDouble.sphR = this.sphList[Data.selectSPHPosition].Value;
          this.postShowDouble.cylR = this.cylList[Data.selectCYLPosition].Value;
          this.postShowDouble.axisR = this.axisList[Data.selectAXISPosition].Value;
          console.log('返回', this.postShowDouble);
        } else if (this.openSide === 'L') {
          this.postShowDouble.sphL = this.sphList[Data.selectSPHPosition].Value;
          this.postShowDouble.cylL = this.cylList[Data.selectCYLPosition].Value;
          this.postShowDouble.axisL = this.axisList[Data.selectAXISPosition].Value;
          console.log('返回', this.postShowDouble);
        } else if (this.openSide === 'S') {
          this.postShowSingle.sph = this.sphList[Data.selectSPHPosition].Value;
          this.postShowSingle.cyl = this.cylList[Data.selectCYLPosition].Value;
          this.postShowSingle.axis = this.axisList[Data.selectAXISPosition].Value;
          console.log('返回', this.postShowDouble);
        }
      },
      setGdInfo(gdlist) {
        for (let item of gdlist) {
          if (item.FieldName === '光度') {
            this.sphList = item.Children;
          } else if (item.FieldName === '散光') {
            this.cylList = item.Children;
          } else if (item.FieldName === '轴位') {
            this.axisList = item.Children;
          }
        }
      },
      changeSeries(index) {
        let series = this.SeriesItems[index];
        this._getData(series.GoodsId);
      },
      BuyGoods(immediately) {
        if (this.getTotalNum() > 0) {
          wx.showToast({
            title: "请至少选择一个购买",
            icon: "none"
          });
          return;
        }


        let postData = new Map();
        postData.set('goodsId', this.mainData.GoodsId);
        postData.set('IsConfirmedBuy', 'false');
        postData.set('ShopId', this.mainData.MainGoods.ShopId);

        switch (this.mainData.BuyUrl) {
          case this.buyNoProperty:
            postData.set('Quantity', this.noPropertyQuantity);
            this.setTogerData(postData, 0);
            api.buyNoProperty(postData).then(({Data}) => {
              console.log("无属性 返回",Data);
            });
            break;
          case this.buyDoubleProperty:
            if (this.postIdDouble.sphLId === '' && this.postIdDouble.sphRId) {
              wx.showToast({
                title: "请至少选择一个购买",
                icon: "none"
              });
              return;
            }
            if (this.postIdDouble.sphLId !== '' && this.leftNum > 0) {
              postData.set('LeftQuantity', this.leftNum);
              postData.set('LeftGD', this.postIdDouble.sphLId);
              postData.set('LEFTGDNAME', this.postShowDouble.sphL);
            } else {
              postData.set('LeftQuantity', 0)
            }

            if (this.postIdDouble.sphRId !== '' && this.rightNum > 0) {
              postData.set('RightQuantity', this.rightNum);
              postData.set('RightGD', this.postIdDouble.sphRId);
              postData.set('RIGHTGDNAME', this.postShowDouble.sphR)
            } else {
              postData.set('RightQuantity', 0)
            }

            api.buyDoubleProperty(postData).then(({Data}) => {
              console.log("双属性 返回",Data);
            });
            this.setTogerData(postData, 2);
            break;
          case this.buyDoubleCustomizedProperty:
            if (this.postIdDouble.sphLId === '' && this.postIdDouble.sphRId) {
              wx.showToast({
                title: "请至少选择一个购买",
                icon: "none"
              });
              return;
            }
            if (this.postIdDouble.sphLId !== '' && this.leftNum > 0) {
              postData.set('LeftQuantity', this.leftNum);
              postData.set('LeftGD', this.postIdDouble.sphLId);
              postData.set('LeftSG', this.postIdDouble.cylLId);
              postData.set('LeftZW', this.postIdDouble.axisLId);
            } else {
              postData.set('LeftQuantity', 0)
            }

            if (this.postIdDouble.sphRId !== '' && this.rightNum > 0) {
              postData.set('RightQuantity', this.leftNum);
              postData.set('RightGD', this.postIdDouble.sphRId);
              postData.set('RightSG', this.postIdDouble.cylRId);
              postData.set('RightZW', this.postIdDouble.axisRId);
            } else {
              postData.set('RightQuantity', 0)
            }

            api.buyDoubleCustomizedProperty(postData);
            this.setTogerData(postData, 2).then(({Data}) => {
              console.log("双属性散光定制 返回",Data);
            });
            break;
          case this.buyNoPropertyFrame:
            postData.set('Quantity', this.noPropertyQuantity);
            this.setTogerData(postData, 0);

            api.buyNoPropertyFrame(postData).then(({Data}) => {
              console.log("无属性框架 返回",Data);
            });
            break;
          case this.buySinglePropertyFrame:
            postData.set('Quantity', this.singleNum);
            postData.set('GD', this.postShowIdSingle.sphId);

            api.buySingleProperty(postData);
            this.setTogerData(postData, 1);
            break;
        }
      },
      setTogerData(postData, type) {
        postData.set("MaxSellNumber", '0');
        postData.set("GoodsName", this.mainGoods.GoodsName);
        postData.set("SeriesId", this.SeriesItems[seriesPosition].GoodsId);
        postData.set("MarketPrice", '69.0');
        postData.set("SalePrice", this.mainGoods.SalePrice);
        postData.set("SaleScore", '69.0');
        postData.set("IsScarcity", 'false');
        postData.set("IsSpecialOffer", 'false');
        postData.set("SaleStockType", '0');
        postData.set("MaxDeduction", '0');
        postData.set("IsFreeCarriage", 'false');
        postData.set("RealGoodsId", this.mainData.GoodsId);

        for (let item of GoodsFields) {
          if (item.FieldName === '光度') {
            for (let sphItem of item.Children) {
              if (type === 1) {
                if (this.postShowSingle.sph === sphItem.Value) {
                  postData.set("RealGoodsId", this.mainData.GoodsId);
                }
              } else if (2) {
                if (this.postShowDouble.sphL === sphItem.Value) {
                  postData.set("LeftRealGoodsId", sphItem.RealGoodsId);
                }
                if (this.postShowDouble.sphR === sphItem.Value) {
                  postData.set("RightRealGoodsId", sphItem.RealGoodsId);
                }
              } else {
                postData.set("RealGoodsId", sphItem.RealGoodsId);
              }
            }
          }
        }
      },
      getTotalNum() {
        switch (this.currentGoodsType) {
          case 0:
            return this.noPropertyQuantity;
          case 1:
            return this.singleNum;
          case 2:
            return this.leftNum + this.rightNum;
        }
      }
    }
  };
</script>

<style lang="less" scoped>

  .goods-name {
    color: #7e7e7e;
    font-size: 13px;
    margin: 15px;
  }

  .series-title {
    color: #333333;
    font-size: 15px;
    margin: 0 0 15px 15px;
  }

  .scroll-view_H {
    box-sizing: border-box;
    padding-right: 15px;

    .item-series-layout {
      display: flex;
      margin: 0 10px;
      .item-single {
        display: flex;
        width: 68px;
        height: 84px;
        margin: 5px;

        flex-direction: column;
        .series-image {
          width: 68px;
          height: 68px;
          border: #eeeeee solid 1px;
          &.select {
            border: #cab894 solid 1px;
          }
        }

        .item-text-color {
          font-size: 11px;
          color: #b6b6b6;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          height: 16px;
        }
      }
    }
  }

  .yinx-gd-layout {
    margin: 0 15px;

    .gd-num-title {
      margin-bottom: 12px;
      margin-top: 10px;
      font-size: 15px;
      color: #484848;
    }
    .gd-choose-layout {
      display: flex;
      height: 40px;
      align-items: center;

      .text-eye {
        color: #484848;
        font-size: 13px;
      }
      .icon-arr-down {
        width: 13px;
        height: 8px;
      }

      .choose-gd-click-layout {
        margin: 0 10px 0 10px;
        display: flex;
        flex: 1px;
        height: 35px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px 0 20px;
        border: #d9d9d9 solid 1px;
        .text-gd-show {
          color: #b6b6b6;
          font-size: 12px;
          flex: 1;
        }
      }

      .input-only-buy-num {
        width: 40px;
        height: 23px;
        text-align: center;
      }

      .change-num-btn {
        width: 35px;
        height: 21px;
      }
    }
  }

  .line {
    height: 2px;
    width: calc(100% - 30px);
    margin: 0 15px;
  }

  .bottom-layou {
    display: flex;
    margin-top: 32px;
    justify-content: space-around;

    .gd-huansuan {
      width: 170px;
      height: 24px;
    }

    .contact-service {
      width: 104px;
      height: 24px;
    }
  }

  .btm-buy-btn-layout {
    display: flex;
    height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;

    .put-into-cart {
      color: white;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 15px;
    }

    .buy-it-now {
      color: white;
      background-color: #cab894;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 15px;
    }
  }
</style>
