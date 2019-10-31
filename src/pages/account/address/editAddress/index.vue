<template>
  <div class="userInfo">
    <div class="item">
      <p>收货人姓名：</p>
      <input class="input" :value="isEdit == true ? addressInfo.ConsigneeName : ''" placeholder="" type="text" />
      {{isEdit}}
      {{isEdit == true ? addressInfo.ConsigneeName : ''}}
    </div>
    <div class="item">
      <p>手机号码；</p>
      <input class="input" :value='addressInfo.ContactMobile' placeholder="" type="number" />
    </div>
    <div class="item">
      <p>所在区域：</p>
      <input class="input" :value='addressInfo.ProvinceName + addressInfo.CityName + addressInfo.DistrictName' placeholder="" type="text" />
    </div>
    <div class="item">
      <p>详细地址：</p>
      <input class="input" :value='addressInfo.Address' placeholder="" type="text" />
    </div>
    <div class="item">
      <p>邮政编码：</p>
      <input class="input" :value='addressInfo.PostalCode' placeholder="" type="number" />
    </div>

    <div class="tag">
      标签
    </div>
    <div class="default">
      <p class="title">设置为默认地址</p>
      <div class="content">
        <p class="contentText">提醒：每次下单时会默认使用该地址（客服代下单除外），实际下单地址请您在提交订单前仔细核对，您可以使用地址标签功能方便区分</p>
        <switch class="swiper" checked="" @change="changeIndicatorDots" />
      </div>
    </div>

    <div class="bottom-btn-box">
      <div class="btn" @click="editAddress">保存</div>
    </div>
  </div>
</template>

<script>
import api from "@/api/address";

export default {
  data() {
    return {
      isEdit:false,
      consigneeId: "",
      addressInfo: null,
      indicatorDots:true,
    };
  },
  onLoad(options) {
    if(options){
      this.consigneeId = options.consigneeId;
      this.isEdit = options.isEdit;
    }

    if(this.isEdit && this.consigneeId){
      this.getAddressDetailEvent();
    }


    console.log('编辑 isEdit == '+this.isEdit)
    console.log(this.isEdit == true ? 'true' : 'false')
  },

  methods: {
    //编辑收货地址
    getAddressDetailEvent() {
      api.getAddressDetail(this.consigneeId).then(({ Data }) => {
        this.addressInfo = Object.assign({}, Data);
      });
    },
    //设置默认
    changeIndicatorDots() {
      this.indicatorDots = !this.indicatorDots
    },
    //保存
    editAddress() {
      console.log(this.consigneeId);
    },
  }
};
</script>

<style lang="less">
page {
  height: 100%;
}
.userInfo {
  padding-top: 5rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-bottom: 5rpx;
}
.item {
  border-bottom: 1rpx solid #dcdcdc;
  font-size: 24rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
}
.input {
  color: #717171;
  background: #dcdcdc;
  margin-left: 0rpx;
  margin-right: 20rpx;
  // width: 100%
}
.tag {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}

.default {
  font-size: 24rpx;
  .title {
      color: #000000;
      margin-top: 10rpx;
      margin-bottom: 10rpx;
  }
  .content {
    display: flex;
    align-items: center;
  }
  .contentText {
    color: #616161;
    font-size: 22rpx;
  }
  .swiper {
    margin-left: 20rpx;
    margin-right: 10rpx;
  }
}


/*保存收货地址按钮*/
.bottom-btn-box {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
}

.bottom-btn-box .btn {
  width: 100%;
  height: 110rpx;
  line-height: 110rpx;
  font-size: 32rpx;
  background: #cab894;
  color: #fff;
  text-align: center;
}

</style>