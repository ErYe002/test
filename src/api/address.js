import http from '@/utils/request.js';

const api = {
  //当前登录用户信息是否过期
  getAddressList(){
    return http.post(`/Account/GetConsigneeList`)
  },
  getAddressDetail(consigneeId){
    return http.post(`/Account/GetWaitEditConsignee?consigneeId=${consigneeId}`)
  },
  addNewAddress(ConsigneeName,ContactMobile,ProvinceId,ProvinceName,CityId,CityName,DistrictId,DistrictName,Address,PostalCode,IsDefault){
    return http.post(`/Account/AddConsignee?&ConsigneeName=${ConsigneeName}&ContactMobile=${ContactMobile}&ProvinceId=${ProvinceId}&ProvinceName=${ProvinceName}&CityId=${CityId}&CityName=${CityName}&DistrictId=${DistrictId}&DistrictName=${DistrictName}&Address=${Address}&PostalCode=${PostalCode}&IsDefault=${IsDefault}`)
  },
  editAddresss(consigneeId,ConsigneeName,ContactMobile,ProvinceId,ProvinceName,CityId,CityName,DistrictId,DistrictName,Address,PostalCode,IsDefault){
    return http.post(`/Account/ModifyConsignee?ID=${consigneeId}&ConsigneeName=${ConsigneeName}&ContactMobile=${ContactMobile}&ProvinceId=${ProvinceId}&ProvinceName=${ProvinceName}&CityId=${CityId}&CityName=${CityName}&DistrictId=${DistrictId}&DistrictName=${DistrictName}&Address=${Address}&PostalCode=${PostalCode}&IsDefault=${IsDefault}`)
  },
  //拉取省市区级联数据
  getAddressListLib() {
    return http.post('/Account/GetAddressLibrary')
  },
  doSetDefaultAddress(consigneeId) {
    return http.post(`/Account/SetDefaultConsignee?consigneeId=${consigneeId}`)
  },
  doDeleteAddress(consigneeId){
    return http.post(`/Account/DeleteConsignee?consigneeId=${consigneeId}`)
  }

}

export default api