import http from '@/utils/request.js';

const api = {
  //当前登录用户信息是否过期
  getAddressList(){
    return http.post(`/Account/GetConsigneeList`)
  },
  getAddressDetail(consigneeId){
    return http.post(`/Account/GetWaitEditConsignee?consigneeId=${consigneeId}`)
  }
}

export default api