<template>
  <div class="userInfo">
    <div class="item">
      <p class="left">收货人姓名：</p>
      <input class="input" :value="isEdit ? addressInfo.ConsigneeName : ''" v-model="addressInfo.ConsigneeName" placeholder="请填写收货人姓名"  type="text" confirm-type="done"/>
    </div>
    <div class="item">
      <p class="left">手机号码；</p>
      <input class="input" :value="isEdit ? addressInfo.ContactMobile : ''" v-model="addressInfo.ContactMobile" placeholder="请填写收货人手机号" type="number" confirm-type="done"/>
    </div>
    <div class="item">
      <p class="left">所在区域：</p>
      <picker v-if="!isLoadRegion" class='pickerInput' mode="multiSelector" @change="regionPickerChange"  @columnchange="regionPickerColumnChange" :value="regionIndex"  :range="regionArray" range-key="name">
        <p>{{region.length >0 ? addressInfo.ProvinceName + addressInfo.CityName + addressInfo.DistrictName : '请选择所在地区'}}</p>
      </picker>
   </div>
    <div class="item">
      <p class="left">详细地址：</p>
      <input class="input" :value="isEdit ? addressInfo.Address : ''" v-model="addressInfo.Address" placeholder="请填写详细地址(街道/门牌号)" type="text" confirm-type="done"/>
    </div>
    <div class="item">
      <p class="left">邮政编码：</p>
      <input class="input" :value="isEdit ? addressInfo.PostalCode : ''" v-model="addressInfo.PostalCode" placeholder="请填写邮政编码" type="number" confirm-type="done"/>
    </div>
    <div class="default" v-if="!addressInfo.IsDefault">
      <p class="title">设置为默认地址</p>
      <div class="content">
        <p class="contentText">提醒：每次下单时会默认使用该地址（客服代下单除外），实际下单地址请您在提交订单前仔细核对，您可以使用地址标签功能方便区分</p>
        <switch class="swiper" checked="" @change="changeIndicatorDots" />
      </div>
    </div>

    <div class="bottom-btn-box">
      <div class="btn" @click="saveAddress">保存</div>
    </div>
  </div>
</template>

<script>
import api from "@/api/address";

export default {
  data() {
    return {
      addressListLib:{},
      region: [],
      regionIndex: [0, 0, 0],
      regionArray: [],  //省市区级联列表展示数据
      provinces: [],  //省市区级联省原始数据
      cities: [], //省市区级联市原始数据
      districts: [],  //省市区级联区原始数据
      isLoadRegion: true,
      isEdit:false,
      consigneeId: "",
      addressInfo: null,
      IsDefault:true,
    };
  },
  onLoad(options) {
    if(options){
      this.consigneeId = options.consigneeId;
      let editStr = options.isEdit
      this.isEdit = editStr == "true" ? true :false;
    }
    this.addressInfo = {};
    if(this.isEdit && this.consigneeId){
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
      this.getAddressDetailEvent();
    }else{
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
    }

    api.getAddressListLib().then(({ Data }) => {
      //原省市区数据
      console.log(Data);
      this.cities = Data.Cities;
      this.districts = Data.Districts;
      this.provinces = Data.Provinces;

      let provinceNameList = []
      // let currentProvice
      this.provinces.forEach((val, idx) => {
        // if (idx == 0) {
        //   currentProvice = val
        // }
        provinceNameList.push({
          name: val.Province,
          id: val.ProvinceId
        })
      });
      console.log('provinceNameList',provinceNameList[0])
      //同步市
      let cityNameList = this._getCityNameListByProvince(provinceNameList[0])

      console.log('cityNameList',cityNameList[0])

      //同步区
      let districtNameList = this._getDistrictNameListByCity(cityNameList[0])
      console.log('districtNameList',districtNameList[0])
      this.regionArray = [provinceNameList, cityNameList, districtNameList],
      this.isLoadRegion = false
    })

  },

  methods: {
    //编辑收货地址
    getAddressDetailEvent() {
      api.getAddressDetail(this.consigneeId).then(({ Data }) => {
        this.addressInfo = Object.assign({}, Data);
        this.region = [{name:Data.ProvinceName, id: Data.ProvinceId}, {name: Data.CityName, id: Data.CityId}, {name: Data.DistrictName, id: Data.DistrictName}];
      });
    },
    //设置默认
    changeIndicatorDots() {
      this.IsDefault = !this.IsDefault
      
    },
    //省市区picker发生变化：确定按钮事件
   regionPickerChange(e) {
         console.log(e)

    console.log("-------1111111-------")
    const idxArray = e.mp.detail.value
    const ProvinceName = this.regionArray[0][idxArray[0]].name;
    const CityName = this.regionArray[1][idxArray[1]].name;
    const DistrictName = this.regionArray[2][idxArray[2]].name;
    const ProvinceId = this.regionArray[0][idxArray[0]].id;
    const CityId = this.regionArray[1][idxArray[1]].id;
    const DistrictId = this.regionArray[2][idxArray[2]].id;
    const _district = this.districts.find((val) => val.DistrictId == DistrictId);
    const PostalCode = _district['ZipCode'];
    this.regionIndex = idxArray;
    this.region = [this.regionArray[0][idxArray[0]], this.regionArray[1][idxArray[1]], this.regionArray[2][idxArray[2]]];
    this.addressInfo.ProvinceName = ProvinceName;
    this.addressInfo.CityName = CityName;
    this.addressInfo.DistrictName = DistrictName;
    this.addressInfo.ProvinceId = ProvinceId;
    this.addressInfo.CityId = CityId;
    this.addressInfo.DistrictId = DistrictId;
    this.addressInfo.PostalCode = PostalCode;

    console.log(this.addressInfo.ProvinceName + this.addressInfo.CityName + this.addressInfo.DistrictName)

  },
  //省市区联动
  regionPickerColumnChange(e) {
    const idx = e.mp.detail.column //当前是第几列的操作
    const val = e.mp.detail.value  //当前该行下标
    let _tempObj
    switch (idx) {
      case 0:
        //修改了省，同步后该省对应的市、区
        _tempObj = this.regionArray[0][val]
        
        //同步市
        let cityNameList = this._getCityNameListByProvince(_tempObj)

        //同步区
        let districtNameList = this._getDistrictNameListByCity(cityNameList[0])

        this.regionIndex = [val, 0, 0],
        this.regionArray = [this.regionArray[0], cityNameList, districtNameList]
        break;
      case 1:
        //修改了市，同步该市下面的区
        _tempObj = this.regionArray[1][val]
        //同步区
        let districtNameList1 = this._getDistrictNameListByCity(_tempObj)

        this.regionIndex = [this.regionIndex[0], val, 0],
        this.regionArray = [this.regionArray[0], this.regionArray[1], districtNameList1]
        break;
      case 2:
        this.regionIndex = [this.regionIndex[0], this.regionIndex[1], val]
        break;
    }
  },


  /**
   * 通过省名筛选出对应的城市名列表
   * @param {} pObj 
   */
  _getCityNameListByProvince(pObj) {
    // let currentProvice = this.provinces.find((val) => val.ProvinceId == pObj.ProvinceId)
    let cityNameList = []
    this.cities.forEach((val) => {
      if (val.ProvinceId == pObj.id) {
        cityNameList.push({
          name: val.City,
          id: val.CityId
        })
      }
    });
    return cityNameList
  },

  /**
   * 通过城市名筛选出对应的区名称列表
   * @param {*} cname 
   */
  _getDistrictNameListByCity(cObj) {
    // const currentCity = this.cities.find((val) => val.City == cname)
    let districtNameList = []
    this.districts.forEach(val => {
      if (val.CityId == cObj.id) {
        districtNameList.push({
          name: val.District,
          id: val.DistrictId
        })
      }
    });
    return districtNameList
  },
    //保存
    saveAddress() {

      if (!this.addressInfo.ConsigneeName){
        wx.showToast({
            title: '请填写收货人姓名',
            icon: 'none',
        }); 
        return;
      }
      if (!this.addressInfo.ContactMobile){
        wx.showToast({
            title: '请填写收货人手机号',
            icon: 'none',
        }); 
        return;
      }
      if (!this.addressInfo.DistrictName){
        wx.showToast({
            title: '请填选择收货人所在区域',
            icon: 'none',
        }); 
        return;
      }
      if (!this.addressInfo.Address){
        wx.showToast({
            title: '请填写收货人详细地址',
            icon: 'none',
        }); 
        return;
      }

      if (this.isEdit) {
        this.saveEditAddress()
      }else{
        this.saveNewAddress()
      }

    },
    //编辑保存
    saveEditAddress(){      
      api.editAddresss(this.consigneeId,this.addressInfo.ConsigneeName,this.addressInfo.ContactMobile,this.addressInfo.ProvinceId,this.addressInfo.ProvinceName,this.addressInfo.CityId,this.addressInfo.CityName,this.addressInfo.DistrictId,this.addressInfo.DistrictName,this.addressInfo.Address,this.addressInfo.PostalCode,this.IsDefault).then(({ Data, State, Msg }) => {
        let tempMsg = "";
        if (State){
          if (Msg) {
            tempMsg = Msg;
          }else{
            tempMsg = "保存成功";
          }
        }else{
          if (Msg) {
            tempMsg = Msg;
          }else{
            tempMsg = "保存失败";
          }
        }
        wx.showToast({
            title: tempMsg,
            icon: 'none',
        }); 
      });
    },
    //新增保存
    saveNewAddress(){
      api.addNewAddress(this.addressInfo.ConsigneeName,this.addressInfo.ContactMobile,this.addressInfo.ProvinceId,this.addressInfo.ProvinceName,this.addressInfo.CityId,this.addressInfo.CityName,this.addressInfo.DistrictId,this.addressInfo.DistrictName,this.addressInfo.Address,this.addressInfo.PostalCode,this.IsDefault).then(({ Data, State, Msg }) => {
        console.log(State);
        let tempMsg = "";
        if (State){
          if (Msg) {
            tempMsg = Msg;
          }else{
            tempMsg = "保存成功";
          }
        }else{
          if (Msg) {
            tempMsg = Msg;
          }else{
            tempMsg = "保存失败";
          }
        }
        wx.showToast({
            title: tempMsg,
            icon: 'none',
        }); 
      });
    }
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
.left {
  width: 150rpx;
}
.input {
  color: #717171;
  // background: #dcdcdc;
  margin-left: 0rpx;
  margin-right: 20rpx;
  flex: 1
}
.pickerInput {
  color: #717171;
  // background: #dcdcdc;
  margin-left: 0rpx;
  margin-right: 20rpx;
  flex: 1
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