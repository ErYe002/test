<template>

  <div>
    <div class="normal-box">
      <div class="goods-name">
        {{mainGoods.GoodsName}}
      </div>

      <img src="/static/images/imaginary_line.png" class="line"/>

      <div class="series-title">
        款式花色
      </div>

      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
        <div class="item-series-layout">
          <div class="item-single" v-for="(item,index) in SeriesItems" :key="index" @click="changeSeries(index)">
            <div class="series-img" :class="seriesPosition===index?'select ':''">
              <img :src="item.SeriesImg" :class="seriesPosition===index?'series-image':'series-image'"/>
            </div>
            <div class="item-text-color">
              {{item.AnotherName}}
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="normal-box">
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
              {{postShowDouble.sphR===''?'请选择光度':'光度: '+postShowDouble.sphR}}
            </div>
            <div class="text-gd-show" v-if="GoodsFields.length>1">
              {{postShowDouble.sphR===''?'请选择光度':('光度: '+postShowDouble.sphR+' 散光: '+postShowDouble.cylR + ' 轴位: ' +
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
              {{postShowDouble.sphL===''?'请选择光度':'光度: '+postShowDouble.sphL}}
            </div>
            <div class="text-gd-show" v-if="GoodsFields.length>1">
              {{postShowDouble.sphL===''?'请选择光度':('光度: '+postShowDouble.sphL+' 散光: '+postShowDouble.cylL + ' 轴位: ' +
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

      <div class="no-property-layout" v-if="currentGoodsType===0">
        <div style="display: flex;flex: 1">

        </div>
        <div style="display: flex;">
          <img src="/static/images/cart_sub_icon.png" class="change-num-btn" @click="numchangeEvent('N',-1)"/>
          <input type="tel" :value="noPropertyQuantity" v-model="noPropertyQuantity" autocomplete="off"
                class="input-only-buy-num"/>
          <img src="/static/images/cart_add_icon.png" class="change-num-btn" @click="numchangeEvent('N',1)"/>
        </div>
      </div>
    </div>


    <div class="bottom-layou">
      <img src="/static/images/icon_sph_conversion.png" class="gd-huansuan" @click="_showDSHS()"/>
      <button open-type="contact" bindcontact="contactService" >
      <img src="/static/images/icon_contact_service_new.png" class="contact-service"/>
      </button>
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
      :sale-stock-type="SaleStockType"
      :select-sph="selectSph"
      :select-cyl="selectCyl"
      :select-axis="selectAxis"
      @backData="gdBackInfo"
    />
  </div>

</template>

<script>
  import api from "@/api/attr";
  import gdNromalSelectPop from "@/components/gdNromalSelectPop"

  const buyNoProperty = 'api/cart/BuyNoProperty';
  const buyDoubleProperty = 'api/cart/BuyDoubleProperty';
  const buyDoubleCustomizedProperty = 'api/cart/BuyDoubleCustomizedProperty';
  const buyNoPropertyFrame = 'api/cart/BuyNoPropertyFrame';
  const buySinglePropertyFrame = 'api/cart/BuySingleProperty';

  export default {
    name: "normal-attr",
    props: {},

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
        currentGoodsType: 0,// 0 无属性  1 有单个属性 2有2个属性
        isShowGdSelectPop: false,
        openSide: '',
        postShowDouble: {sphL: '', sphR: '', cylL: '', cylR: '', axisL: '', axisR: ''},
        postShowSingle: {sph: '', cyl: '', axis: ''},
        postShowIdSingle: {sphId: '', cylId: '', axisI的: ''},
        postIdDouble: {sphLId: '', sphRId: '', cylLId: '', cylRId: '', axisLId: '', axisRId: ''},
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
        IsConfirmedBuy: false,
        shopId: '',
        selectSph: '',
        selectCyl: '',
        selectAxis: ''
      };
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
      this._getData(this.goodsId);
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
          this.shopId = Data.MainGoods.ShopId;
          // this.SaleStockType = Data.MainGoods.SaleStockType;

          //设置当前选中的系列坐标
          if (Data.MainGoods.SeriesItems !== null) {
            for (let i = 0; i < Data.MainGoods.SeriesItems.length; i++) {
              let item = Data.MainGoods.SeriesItems[i];
              if (item.GoodsId === Data.MainGoods.GoodsId) {
                this.seriesPosition = i;
              }
            }
          }


          //区分当前商品类型
          if (!Data.MainGoods.IsShowSingle) {//双
            if (Data.MainGoods.GoodsFields.length === 0) {
              this.currentGoodsType = 0;
            } else {
              this.currentGoodsType = 2;
            }
          } else {
            if (Data.MainGoods.GoodsFields.length > 0) {
              this.currentGoodsType = 1;
            } else {
              this.currentGoodsType = 0;
            }
          }

          console.log('当前商品类型', this.currentGoodsType);


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
        } else if (side === 'S') {//单
          this.singleNum += num;
        } else {
          this.noPropertyQuantity += num;
        }
      },
      openGdSelectPop(side) {
        this.openSide = side;
        this.isShowGdSelectPop = true;
        if (side === 'R') {
          this.selectSph = this.postShowDouble.sphR;
          this.selectCyl = this.postShowDouble.cylR;
          this.selectAxis = this.postShowDouble.axisR;
        } else if (side === 'L') {
          this.selectSph = this.postShowDouble.sphL;
          this.selectCyl = this.postShowDouble.cylL;
          this.selectAxis = this.postShowDouble.axisL;
        } else {
          this.selectSph = this.postShowSingle.sph;
          this.selectCyl = this.postShowSingle.cyl;
          this.selectAxis = this.postShowSingle.axis;
        }
      },
      gdBackInfo(Data) {

        if (this.openSide === 'R') {
          this.postShowDouble.sphR = this.sphList[Data.selectSPHPosition].Value;
          this.postIdDouble.sphRId = this.sphList[Data.selectSPHPosition].Id;
          if (this.cylList.length > 0) {
            this.postShowDouble.cylR = this.cylList[Data.selectCYLPosition].Value;
            this.postIdDouble.cylRId = this.cylList[Data.selectCYLPosition].Id;
          }
          if (this.axisList.length > 0) {
            this.postShowDouble.axisR = this.axisList[Data.selectAXISPosition].Value;
            this.postIdDouble.axisRId = this.axisList[Data.selectAXISPosition].Id;
          }
          console.log('返回', this.postIdDouble);
        } else if (this.openSide === 'L') {
          this.postShowDouble.sphL = this.sphList[Data.selectSPHPosition].Value;
          this.postIdDouble.sphLId = this.sphList[Data.selectSPHPosition].Id;
          if (this.cylList.length > 0) {
            this.postShowDouble.cylL = this.cylList[Data.selectCYLPosition].Value;
            this.postIdDouble.cylLId = this.cylList[Data.selectCYLPosition].Id;
          }
          if (this.axisList.length > 0) {
            this.postShowDouble.axisL = this.axisList[Data.selectAXISPosition].Value;
            this.postIdDouble.axisLId = this.axisList[Data.selectAXISPosition].Id;
          }
          console.log('返回', this.postIdDouble);
        } else if (this.openSide === 'S') {
          this.postShowSingle.sph = this.sphList[Data.selectSPHPosition].Value;
          this.postShowIdSingle.sphId = this.sphList[Data.selectSPHPosition].Id;
          if (this.cylList.length > 0) {
            this.postShowSingle.cyl = this.cylList[Data.selectCYLPosition].Value;
            this.postShowIdSingle.cylId = this.cylList[Data.selectCYLPosition].Id;
          }
          if (this.axisList.length > 0) {
            this.postShowSingle.axis = this.axisList[Data.selectAXISPosition].Value;
            this.postShowIdSingle.axisI的 = this.axisList[Data.selectAXISPosition].Id;
          }
          console.log('返回', this.postShowIdSingle);
        }
        this.IsConfirmedBuy = Data.isConfirmedBuy;
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

          console.log('参数', this.sphList.length, this.cylList.length, this.axisList.length);
        }
      },
      changeSeries(index) {
        let series = this.SeriesItems[index];
        this._getData(series.GoodsId);
      },
      buyGoods(immediately) {
        if (this.getTotalNum() === 0) {
          wx.showToast({
            title: "请至少选择一个购买",
            icon: "none"
          });
          return;
        }
        // this.setIdOfSelectrGd();

        let postData = new Map();
        postData.set('goodsId', this.mainData.MainGoods.GoodsId);
        postData.set('IsConfirmedBuy', this.IsConfirmedBuy);
        postData.set('ShopId', this.mainData.MainGoods.ShopId);

        if (buyNoProperty === this.mainData.BuyUrl) {
          postData.set('Quantity', this.noPropertyQuantity);
          this.setTogerData(postData, 0);
          api.buyNoProperty(postData).then(({Data}) => {
            console.log("无属性 返回", Data);
            this.goToCart(immediately);
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        } else if (buyDoubleProperty === this.mainData.BuyUrl) {
          if (this.postIdDouble.sphLId === '' && this.postIdDouble.sphRId === '') {
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

          this.setTogerData(postData, 2);
          api.buyDoubleProperty(postData).then(({Data, Msg, State}) => {
            console.log("双属性 返回", Data, Msg, State);
            this.goToCart(immediately);
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        } else if (buyDoubleCustomizedProperty === this.mainData.BuyUrl) {
          if (this.postIdDouble.sphLId === '' && this.postIdDouble.sphRId === '') {
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
          this.setTogerData(postData, 2);
          api.buyDoubleCustomizedProperty(postData).then(({Data}) => {
            console.log("双属性散光定制 返回", Data);
            this.goToCart(immediately);
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        } else if (buyNoPropertyFrame === this.mainData.BuyUrl) {
          postData.set('Quantity', this.noPropertyQuantity);
          this.setTogerData(postData, 0);

          api.buyNoPropertyFrame(postData).then(({Data}) => {
            console.log("无属性框架 返回", Data);
            this.goToCart(immediately);
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        } else if (buySinglePropertyFrame === this.mainData.BuyUrl) {
          console.log(this.buySinglePropertyFrame);
          postData.set('Quantity', this.singleNum);
          postData.set('GD', this.postShowIdSingle.sphId);

          this.setTogerData(postData, 1);
          api.buySingleProperty(postData).then(({Data}) => {
            console.log("无属性框架 返回", Data);
            this.goToCart(immediately);
          }).catch((Msg) => {
            this.confirmedBuyShow(Msg);
          });
        }
      },
      setTogerData(postData, type) {
        postData.set("MaxSellNumber", this.MaxSellNumber);
        postData.set("GoodsName", this.mainGoods.GoodsName);
        postData.set("SeriesId", this.mainGoods.SeriesId);
        postData.set("MarketPrice", this.MarketPrice);
        postData.set("SalePrice", this.mainGoods.SalePrice);
        postData.set("SaleScore", this.SaleScore);
        postData.set("IsScarcity", this.IsScarcity);
        postData.set("IsSpecialOffer", this.IsSpecialOffer);
        postData.set("SaleStockType", this.SaleStockType);
        postData.set("MaxDeduction", this.MaxDeduction);
        postData.set("IsFreeCarriage", this.IsFreeCarriage);
        postData.set("RealGoodsId", this.mainData.MainGoods.GoodsId);

        if (this.GoodsFields.length > 0) {
          for (let item of this.GoodsFields) {
            if (item.FieldName === '光度') {
              for (let sphItem of item.Children) {
                if (type === 1) {
                  if (this.postShowSingle.sph === sphItem.Value) {
                    postData.set("RealGoodsId", this.mainData.MainGoods.GoodsId);
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
        }

      },
      getTotalNum() {
        switch (this.currentGoodsType) {
          case 0:
            return this.noPropertyQuantity;
          case 1:
            let signleQuantity = 0;
            if (this.postShowSingle.sph !== '') {
              signleQuantity += this.singleNum;
            }
            return signleQuantity;
          case 2:
            let leftQuantity = 0;
            let rightQuantity = 0;
            if (this.postShowDouble.sphL !== '') {
              leftQuantity += this.leftNum;
            }

            if (this.postShowDouble.sphR !== '') {
              rightQuantity += this.rightNum;
            }
            return leftQuantity + rightQuantity;
        }
      },
      goToCart(imid) {
        if (imid) {
          wx.switchTab({
            url: '/pages/cart/main?shopId=' + this.shopId
          });
        } else {
          wx.showToast({
            title: "加入购物车成功",
            icon: "none"
          });
        }
        this.$getCartCount();
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
              self.IsConfirmedBuy = true;
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
       //度数换算跳转
    _showDSHS() {
      wx.navigateTo({
        url:
          "/pages/htmlPreview/main?path=" +
          encodeURIComponent("/TemplateForNewApp/degreeConversion")
      });
    },
    }

  }
  ;
</script>

<style lang="less" scoped>
.normal-box{
   border: 1px solid #B9B9B9;
    margin: 10px;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;
}
  .goods-name {
    color: #7e7e7e;
    font-size: 13px;
    margin: 10px 15px 0 15px;
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
        .series-img{
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          &.select {
            border: #cab894 solid 1px;
          }
        }
        .series-image {
          width: 58px;
          height: 58px;
          // padding: 5px;
          border-radius: 50%;
          overflow: hidden;
          // border: #eeeeee solid 1px;
          // &.select::after {
          //   content:'';
          //   width: 68px;
          //   height: 68px;
          //   box-sizing: border-box;
          //   border: #cab894 solid 1px;
          //   position: absolute;
          //   left: 0;
          //   top: 0;
          // }
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
          text-align: center;
        }
      }
    }
  }

  .yinx-gd-layout {
    margin: 10px 15px;

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
    ._button{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 2rpx solid #F4F4F4;
      background: transparent;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-size: inherit;
      border-radius: 0;
      line-height: initial;
      color: inherit;
      border: 0;
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
      background-color: #A74C2D;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 15px;
    }

    .buy-it-now {
      color: white;
      background-color: #CAB894;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 15px;
    }
  }

  .no-property-layout {
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px;
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
</style>
