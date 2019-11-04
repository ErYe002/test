<template>
  <div>
    <!-- <li class="list" v-for="item in addressList" :key="item.ID">
      <div class="div">
        <div class="userInfo">
          <p>{{item.ConsigneeName}}</p>
          <p class="phone">{{item.ContactMobile}}</p>
          <p class="default" v-if="item.IsDefault">默认</p>
        </div>
        <div class="address">{{item.Address}}</div>
        <div class="editBtns">
          <div @click="doSetDefaultAddress(item.ID)">
            <radio class="radio" :disabled="true" color="#cab894" :checked="item.IsDefault" />设置默认
          </div>
          <div class="right">
            <a
              class="editItem"
              :href="'/pages/account/address/editAddress/main?isEdit=true&consigneeId=' + item.ID"
            >
              <Img class="imgIcon" src="https://pic.keede.com/app/images/icon_cart.png"></Img>编辑
            </a>
          </div>
        </div>
      </div>
    </li> -->
    <view class='list'>
    <view class='item' v-for="item in addressList" :key="item.ID">
      <view :class="item.ID == SelectConsigneeId? 'choose-btn.active':'choose-btn'" :data-id='item.ID' :data-valid='item.IsValid' @click='saveConsigneeId'></view>
        <view class='info-box' :data-id='item.ID' :data-valid='item.IsValid' @click='saveConsigneeId'>
          <view class='contact-user'>
            <text>{{item.ConsigneeName}}</text>
            <text class='phone'>{{item.ContactMobile}}</text>
            <block v-if='!item.IsValid'>
              <text class='default'>地址不合法，请修改</text>
            </block>
            <block wx:else>
              <text class='default' v-if='item.IsDefault'>默认</text>
            </block>
          </view>
          <view class='contact-address'>{{item.Address}}</view>
        </view>
        <view class='edit-btn' @click='toEdit' :data-id='item.ID'>
          <image src="https://pic.keede.com/app/images/icon_cart.png" class="icon" />
        </view>
      </view>
    </view>
    <p class="no-data-box" v-if="isNoData">还没有收货地址哦，赶快添加吧</p>
    <div class="bottom-btn-box">
      <navigator url="/pages/account/address/editAddress/main?isEdit=fasle" class="btn">+ 新建收货地址</navigator>
    </div>
  </div>
</template>
<script>

import api from "@/api/address";
import {mapActions} from "vuex"

export default {
  data() {
    return {
      addressList: [],
      SelectConsigneeId: '',
      isNoData: false,
    };
  },
  onLoad(options) {
    // this.getListData();
  },
  onShow(){
    this.getListData();
  },
  methods: {
    ...mapActions("order",["setSelectAddressId"]),
    getListData() {
      api.getAddressList().then(({ Data }) => {
        //重新整理数据
        this.addressList = [...Data];
        console.log(this.addressList.length)
        if (!this.addressList.length) {
          this.isNoData = true;
        }
      });      
    },
    
    saveConsigneeId(e) {
            console.log(e)
      if (e.currentTarget.dataset.valid) {
        this.setSelectAddressId(e.currentTarget.dataset.id)

        wx.navigateBack({
            delta: 1
          })
        }
    },
    toEdit(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/account/address/editAddress/main?isEdit=true&consigneeId=' + id
      })
    },
  }
};
</script>
<style scoped lang="less">
page {
  height: 100%;
}
.list .item {
  border-bottom: 1rpx solid #dcdcdc;
  padding: 30rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.item .choose-btn {
  background: none repeat scroll 0 0 #fff;
  border: 1rpx solid #cab894;
  border-radius: 50%;
  width: 30rpx;
  height: 30rpx;
}

.item .choose-btn.active {
  background: #cab894 url(https://pic.keede.com/app/images/icon_radioched.png);
  background-position: 0;
  background-size: 30rpx auto;
}

.item .info-box {
  flex: 1;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.item .edit-btn {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item .edit-btn .icon{
  display: block;
  width: 24rpx;
  height: 26rpx;
}

.info-box .contact-address {
  color: #888;
  font-size: 26rpx;
}

.info-box .phone {
  margin-left: 10rpx;
}

.info-box .label {
  font-size: 24rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  border-radius: 4rpx;
  color: #cab894;
  border: solid 1rpx #cab894;
  margin: 0 10rpx;
}

.no-data-box {
  color: #666;
  font-size: 12px;
  text-align: center;
  margin: 20px 0;
}
/*新建收货地址按钮*/
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