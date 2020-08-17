<template>
  <div class="list-box">
    <li class="list" v-for="item in addressList" :key="item.ID">
      <div class="div">
        <div class="userInfo">
          <p>{{item.ConsigneeName}}</p>
          <p class="phone">{{item.ContactMobile}}</p>
          <p class="default" v-if="item.IsDefault">默认</p>
          <!-- <p class="tag" v-if="item.Tag != null">{{item.Tag}}</p> -->
        </div>
        <div class="address">{{item.Address}}</div>
        <div class="editBtns">
          <div class="defaultBtn" @click="doSetDefaultAddress(item.ID)">
            <img class="imgIcon" v-if="item.IsDefault" src="/static/images/icon_checked.png"/>
            <img class="imgIcon" v-else src="/static/images/icon_no_checked.png"/>
             设置默认
          </div>
          <div class="right">
            <a
              class="editItem"
              :href="'/pages/account/address/editAddress/main?isEdit=true&consigneeId=' + item.ID"
            >
              <img class="imgIcon" src="/static/images/icon_edit.png"/> 编辑
            </a>
            <div class="editItem" @click="doDeleteAddress(item.ID)">
              <img class="imgIcon" src="/static/images/account_favorite_delete.png"/> 删除
            </div>
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
        if (!this.addressList.length) {
          this.isNoData = true;
        }
      });
      
    },
    doSetDefaultAddress(consigneeId){
      console.log(consigneeId)
      api.doSetDefaultAddress(consigneeId).then(({ Data, State, Msg }) => {
        if (State){
          this.getListData();
        }else{
          wx.showToast({
            title: Msg,
            icon: 'none',
          }); 
        }
      });
    },
    doDeleteAddress(consigneeId){
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确定删除收货地址？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            api.doDeleteAddress(consigneeId).then(({ Data, State, Msg }) => {
              if (State){
                _this.getListData();
              }else{
                wx.showToast({
                title: Msg,
                icon: 'none',
                }); 
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
};
</script>
<style scoped lang="less">
page {
  height: 100%;
}
.list-box{
  padding: 10px;
  background: #f2f2f2;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  overflow-y: scroll;
}
.list {
  border-radius: 10px;
  background: #fff;
  padding-top: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-bottom: 5rpx;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  .div {
    width: 100%;
  }
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
  font-size: 20rpx;
  padding-left: 2rpx;
  padding-right: 2rpx;
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
  border-bottom: 1rpx solid #dcdcdc;
  width: 100%;
}
.defaultBtn {
  display: flex;
  align-items: center;
}

.editBtns {
  height: 60rpx;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 24rpx;
  justify-content: space-between;
  .right {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .editItem {
      width: 120rpx;
      display: flex;
      align-items: center;
    }
  }
}

.imgIcon {
  margin-right: 10rpx;
  width: 30rpx;
  height: 33rpx;
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
  z-index: 2;
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