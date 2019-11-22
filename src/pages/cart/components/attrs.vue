<template>
  <div>
    <bottom-flip :is-show.sync="isShow">
      <section class="wrap" v-if="info != null">
        <p class="title">{{info.SelectedGoodsHint}}</p>
        <div class="style-box" v-if="info.GoodsItems != null && info.GoodsItems.length > 0">
          <p class="text">款式花色</p>
          <scroll-view
            class="style-list"
            enable-flex="true"
            scroll-x="true"
            :scroll-into-view="'sItem'+selectedGoodsId"
          >
            <li
              :class="{'s-item': true, 'selected': selectedGoodsId == item.GoodsId}"
              v-for="item in info.GoodsItems"
              :key="item.GoodsId"
              :id="'sItem'+item.GoodsId"
              @click="changeStyleEvent(item.GoodsId)"
            >
              <img :src="item.ImageUrl" class="s-img" />
              <span class="s-name">{{item.AnotherName}}</span>
            </li>
          </scroll-view>
        </div>
        <div class="attr-box">
          <p class="text">
            <span class="left">{{info.HasProperty ? '光度及':''}}数量</span>
            <span class="right" v-if="info.MaxQuantity > 0">最大限购数量：{{info.MaxQuantity}}</span>
          </p>
          <div class="attr-line">
            <!-- <span class="lable">右眼R</span> -->
            <div
              :class="{'select-list': true, 'long': info.CYLFieldProperty != null}"
              @click="showGdPopEvent"
              v-if="info.HasProperty && info.GDFieldProperty != null"
            >
              <view
                class="picker"
                v-if="selectedGDIdx >= 0"
              >光度:{{info.GDFieldProperty.Children[selectedGDIdx]['Value']}}</view>
              <view
                class="picker"
                v-if="info.CYLFieldProperty != null && selectedCYLIdx >= 0"
              >散光:{{info.CYLFieldProperty.Children[selectedCYLIdx]['Value']}}</view>
              <view
                class="picker"
                v-if="info.AXISFieldProperty != null && selectedAXISIdx >= 0"
              >轴位:{{info.AXISFieldProperty.Children[selectedAXISIdx]['Value']}}</view>
              <view class="empty" v-if="selectedGDIdx == -1 && selectedCYLIdx == -1 && selectedAXISIdx == -1">请选择</view>
              <img src="/static/images/icon_attr_down.png" class="icon" />
            </div>
            <div class="num-box">
              <i class="cut" @click="modifyQuantityEvent(0)">-</i>
              <input class="input" :value="newQuantity" disabled />
              <i class="add" @click="modifyQuantityEvent(1)">+</i>
            </div>
          </div>
          <!-- <div class="attr-line">
          <span class="lable">左眼L</span>
          <picker
            class="select-list"
            mode="multiSelector"
            bindchange="bindMultiPickerChange"
            bindcolumnchange="bindMultiPickerColumnChange"
          >
            <view class="picker">-3.0</view>
          </picker>
          <div class="num-box">
            <i class="cut">-</i>
            <input class="input" value="1" disabled />
            <i class="add">+</i>
          </div>
          </div>-->
        </div>
      </section>
      <section class="btn-box" v-if="info != null">
        <button class="kd-btn btn-lg" @click="saveEvent">确定</button>
      </section>
    </bottom-flip>
    <gd-nromal-select-pop :is-show.sync="isShowGdPop" :sph-list="info != null && info.GDFieldProperty != null ? info.GDFieldProperty.Children : []" :cyl-list="info != null && info.CYLFieldProperty != null ? info.CYLFieldProperty.Children : []" :axis-list="info != null && info.AXISFieldProperty != null ? info.AXISFieldProperty.Children : []" @backData="selectGdDoneEvent" :select-sph-position="selectedGDIdx" :select-cyl-position="selectedCYLIdx" :select-axis-position="selectedAXISIdx"/>
  </div>
</template>

<script>
import bottomFlip from "@/components/bottomFlip";
import cartApi from "@/api/cart";
import gdNromalSelectPop from "@/components/gdNromalSelectPop";

export default {
  data() {
    return {
      info: null,
      selectedGDIdx: -1,
      selectedCYLIdx: -1,
      selectedAXISIdx: -1,
      newQuantity: 1,
      selectedGoodsId: "",
      isShowGdPop: false
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: Number,
      default: 1
    },
    uniqueId: {
      type: String,
      default: ""
    },
    goodsId: {
      type: String,
      default: ""
    },
    realGoodsId: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  watch: {
    isShow: {
      handler: function(val) {
        //父与子组件同步isShow值
        this.$emit("update:isShow", val);
        if (val == true) {
          this.info = null;
          this._getData();
        } else {
          Object.assign(this.$data, this.$options.data())
        }
      },
      immediate: true
    },
    quantity: {
      handler: function(val) {
        this.newQuantity = val;
      },
      immediate: true
    }
  },
  components: {
    bottomFlip,
    gdNromalSelectPop
  },
  methods: {
    showGdPopEvent(){
      this.isShowGdPop = true
    },
    selectGdDoneEvent(e){
      console.log(e)
      this.selectedGDIdx = e.selectSPHPosition
      this.selectedCYLIdx = e.selectCYLPosition
      this.selectedAXISIdx = e.selectAXISPosition
    },
    _getData() {
      cartApi
        .getEditGoodsInCartData({
          uniqueId: this.uniqueId,
          goodsId: this.goodsId,
          shopId: this.shopId,
          realGoodsId: this.realGoodsId
        })
        .then(({ Data }) => {
          if (Data.GDFieldProperty) {
            Data.GDFieldProperty.Children.forEach((ele, idx) => {
              if (ele.IsSelected) {
                this.selectedGDIdx = idx;
              }
            });
          }
          if (Data.CYLFieldProperty) {
            Data.CYLFieldProperty.Children.forEach((ele, idx) => {
              if (ele.IsSelected) {
                this.selectedCYLIdx = idx;
              }
            });
          }
          if (Data.AXISFieldProperty) {
            Data.AXISFieldProperty.Children.forEach((ele, idx) => {
              if (ele.IsSelected) {
                this.selectedAXISIdx = idx;
              }
            });
          }

          if (Data.GoodsItems) {
            Data.GoodsItems.forEach(ele => {
              if (ele.Selected) {
                this.selectedGoodsId = ele.GoodsId;
              }
            });
          }
          this.info = Data;
        });
    },
    //修改款式花色
    changeStyleEvent(gid) {
      // this.info.GoodsItems = this.info.GoodsItems.map(ele => {
      //   ele.Selected = ele.GoodsId == gid
      //   return ele
      // })
      this.selectedGoodsId = gid;
    },
    //修改数量  type：0减数量  1加数量
    modifyQuantityEvent(type) {
      if (type == 0) {
        if (this.newQuantity <= 0) {
          this.newQuantity = 0;
          return;
        }
        this.newQuantity--;
      } else {
        this.newQuantity++;
      }
    },
    //修改光度
    // gdPickerChangeEvent(e) {
    //   let index = e.mp.detail.value;
    //   this.selectedGDIdx = index;
    // },
    //保存修改
    saveEvent() {
      if (this.info.HasProperty) {
        if(this.selectedGDIdx == -1){
          wx.showToast({
            title: "请先选择一个光度",
            icon: "none"
          });
          return;
        }
        if(this.info['CYLFieldProperty'] != null && this.selectedCYLIdx == -1){
          wx.showToast({
            title: "请选择散光",
            icon: "none"
          });
          return;
        }
        if(this.info['AXISFieldProperty'] != null && this.selectedAXISIdx == -1){
          wx.showToast({
            title: "请选择轴位",
            icon: "none"
          });
          return;
        }
      }
      let selectedProperty = [], obj = {},
        quantity = 0;
      if (this.info.HasProperty) {
        obj.GD = this.info.GDFieldProperty.Children[this.selectedGDIdx].Id
        obj.Quantity = this.newQuantity
        if(this.info['CYLFieldProperty'] != null && this.selectedCYLIdx != -1){
          obj.SG = this.info.CYLFieldProperty.Children[this.selectedCYLIdx].Id
        }
        if(this.info['AXISFieldProperty'] != null && this.selectedAXISIdx != -1){
          obj.ZW = this.info.AXISFieldProperty.Children[this.selectedAXISIdx].Id
        }
        selectedProperty.push(obj);
      } else {
        quantity = this.newQuantity;
      }

      //验证
      let vldQuantity = this.info.HasProperty ? 0 : quantity;
      if (this.info.HasProperty) {
        selectedProperty.forEach(ele => {
          vldQuantity += ele.Quantity;
        });
      }
      if (vldQuantity <= 0) {
        wx.showToast({
          title: "商品数量不能为0",
          icon: "none",
          duration: 2000
        });
        return;
      }
      if (this.info.MaxQuantity > 0) {
        if (vldQuantity > this.info.MaxQuantity) {
          wx.showToast({
            title: "最多只能加购" + this.info.MaxQuantity + "件哦",
            icon: "none",
            duration: 2000
          });
          return;
        }
      }
      this._saveChangeRequest(selectedProperty, quantity);

      // [{"GD":"63343a72-9906-4fbc-86dc-c7117ad29e74","Quantity":"1"},{"GD":"63343a72-9906-4fbc-86dc-c7117ad29e74","Quantity":"1","SG":"978f0f3f-4e81-4496-a96d-a497ab779614","ZW":"5c873d18-b2a9-413b-97d4-81677dea09ce"}]
    },
    _saveChangeRequest(selectedProperty, quantity, isConfirmedBuy = false) {
      cartApi
        .editGoodsInCart({
          uniqueId: this.uniqueId,
          goodsId: this.selectedGoodsId,
          isConfirmedBuy,
          shopId: this.shopId,
          deleteRealGoodsId: this.realGoodsId,
          hasProperty: this.info.HasProperty,
          selectedProperty,
          quantity
        })
        .then(({ Data }) => {
          this.$emit("done");
        })
        .catch(msg => {
          if (msg.indexOf("愿意等待") != -1) {
            let _this = this;
            wx.showModal({
              title: "提示",
              content: msg,
              confirmColor: "#cab894",
              success(res) {
                if (res.confirm) {
                  _this._saveChangeRequest(selectedProperty, quantity, true);
                }
              }
            });
          } else {
            wx.showToast({
              title: msg,
              icon: "none",
              duration: 5000
            });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 21px;
  .title {
    font-size: 13px;
    color: #7e7e7eff;
  }
  .style-box {
    margin-top: 20px;
    .text {
      font-size: 15px;
      color: #484848ff;
    }
    .style-list {
      padding: 15px 0;
      border-bottom: 0.5px dashed #dedede;
      display: flex;
      width: 100%;
      height: 93px;
      .s-item {
        text-align: center;
        margin: 0 5.5px;
        width: 68px;
        .s-img {
          display: block;
          width: 68px;
          height: 68px;
          margin-bottom: 5px;
          border: 0.5px solid #d2d2d2ff;
          box-sizing: border-box;
        }
        .s-name {
          color: #b6b6b6ff;
          font-size: 11px;
        }
        &.selected {
          .s-img {
            border: 2px solid #cab894ff;
          }
          .s-name {
            color: #484848ff;
          }
        }
      }
    }
  }
  .attr-box {
    margin-top: 20px;
    .text:extend(.style-box .text) {
      margin-bottom: 23.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        color: #e31436ff;
        font-size: 12px;
      }
    }

    .attr-line {
      display: flex;
      align-items: center;
      font-size: 13px;
      margin-bottom: 10px;
      .lable {
        color: #484848ff;
      }
      .select-list {
        flex: 1;
        height: 35px;
        line-height: 35px;
        border: 0.5px solid #c4c4c4ff;
        // text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        position: relative;
        .picker {
          color: #000000ff;
        }
        .empty {
          color: #b6b6b6ff;
        }
        .icon {
          display: block;
          width: 13px;
          height: 8px;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
        &.long{
          box-sizing: border-box;
          padding-left: 10px;
          justify-content: flex-start;
          .picker{
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
      .num-box {
        display: flex;
        align-items: center;
        .add,
        .cut {
          width: 30px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          background: #fbfbfb;
          &:active {
            background: #cab894;
          }
        }
        .cut {
          color: #cdcdcd;
        }
        .add {
          background: #eeeeee;
        }
        .input {
          width: 34.5px;
          height: 25px;
          background: #f5f5f5;
          line-height: 25px;
          text-align: center;
          min-height: 0;
          margin: 0 0.5px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>