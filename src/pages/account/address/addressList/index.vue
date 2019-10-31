<template>
  <div>
    <li class="list" v-for="item in addressList" :key="item.ID">
      <div>
        <div class="userInfo">
          <p> {{item.ConsigneeName}} </p>
          <p class='phone'>{{item.ContactMobile}}</p>
          <p class="default" v-if="item.IsDefault"> 默认 </p>
          <p class="tag" v-if="item.Tag != null">{{item.Tag}}</p>
        </div>
        <div class="address">{{item.Address}}</div>
        <p class="line"></p>
        <div class="editBtns">
          <a :href="'/pages/account/address/editAddress/main'" >
            <Img class="imgIcon" src="https://pic.keede.com/app/images/icon_cart.png"></Img>
            设为默认 
          </a>
          <a :href="'/pages/account/address/editAddress/main?isEdit=true&consigneeId=' + item.ID" >
            <Img class="imgIcon" src="https://pic.keede.com/app/images/icon_cart.png"></Img>
            编辑 
          </a>
          <div> 
            <Img class="imgIcon" src="https://pic.keede.com/app/images/icon_cart.png"></Img>
            删除 
          </div>
        </div>
      </div>
    </li>
    <p class="no-data-box" v-if="isNoData">还没有收货地址哦，赶快添加吧</p>
    <div class="bottom-btn-box">
      <navigator url="/pages/account/address/editAddress/main?isEdit=fasle" class="btn">+ 新建收货地址</navigator>
    </div>
  </div>
</template>
<script>
import api from "@/api/address";

export default {
  data() {
    return {
      addressList: [],
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
    getListData() {
      api.getAddressList().then(({ Data }) => {
        //重新整理数据
        this.addressList = [...Data];
      });
      if (this.addressList.leng) {
        this.isNoData = true;
      }
    }
  }
};
</script>
<style scoped lang="less">
page {
  height: 100%;
}
.list {
  border-bottom: 5rpx solid #dcdcdc;
  padding-top: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-bottom: 5rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.userInfo {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.phone {
  padding-left: 10rpx;
  padding-right: 10rpx;
  color: #717171;
  display: flex;
  align-items: center;
  font-size: 24rpx;
}
.default {
  border: 1rpx solid #ff0000;
  margin-right: 10rpx;
  color: #ff0000;
  font-size: 18rpx;
  padding: 2rpx 2rpx 2px 2px;
}
.tag {
  border: 1rpx solid #cab894;
  margin-right: 10rpx;
  color: #cab894;
  font-size: 16rpx;
  padding: 2px 2px 2px 2px;
}
.address {
  margin-top: 10rpx;
  padding-bottom: 10rpx;
  color: #717171;
  font-size: 24rpx;
}
.line {
  margin: 5rpx;
  width: 100%;
  height: 1rpx;
  background: #dcdcdc
}
.editBtns {
  height: 60rpx;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 2;
  font-size: 24rpx
}
.imgIcon {
  width: 20rpx;
  height: 20rpx;
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