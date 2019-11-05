import http from '@/utils/request.js';

const api = {
  //根据订单状态获取订单列表
  getOrderList({queryState, isFreshCache = false, page = 1, size = 10} = {}) {
    let url = `/order/GetOrderList?QueryState=${queryState}&Size=${size}&Page=${page}&isFreshCache=${isFreshCache}`
    if(page > 1){
      return http.post(url)
    }
    return http.postByNoLoading(url)
  },
  //根据关键字查询订单/获取全部订单
  searchOrderList({queryString = '', page = 1, size = 10} = {}){
    let url = `/Order/QueryOrderList?Size=${size}&Page=${page}&queryString=${queryString}`
    if(page > 1){
      return http.post(url)
    }
    return http.postByNoLoading(url)
  },
  //查询订单详情
  getOrderDetail(orderId){
    return http.post(`/order/GetOrderDetail?orderId=${orderId}`)
  },
  //取消订单
  cancelOrder(orderId){
    return http.post(`/order/CancelOrder?orderId=${orderId}`)
  },
};

export default api;
