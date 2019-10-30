<template>
<div>
  <div class='list'>
    
  </div>
  <div class='bottom-btn-box'>
    <navigator url='/shopping/modifyAddress/modifyAddress' class='btn'>+ 新建收货地址</navigator>
  </div>
</div>
</template>
<script>
// import api from "@api/Account";

export default {
  data() {
    return {
      list:[],
      SelectConsigneeId:''
    };
  },
  components: {
    
  },
  onload: {

  },
  onshow:function () {
      // this.getAddresssListData()
  },
  methods: {
    getAddresssListData() {
        api.getAddresssListData().then(({ Data }) => {
        //重新整理数据
        sourceData = [...Data]

      });

    },
  },
  created() {
    // let app = getApp()
  }
};
</script>
<style scoped lang="less">
page {
  padding-bottom: 110rpx;
  box-sizing: border-box;
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