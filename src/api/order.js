import http from '@/utils/request.js';

const api = {
  //根据订单状态获取订单列表
  getOrderList({queryState, isFreshCache = false, page = 1, size = 10} = {}) {
    return http.postByNoLoading(`/order/GetOrderList?QueryState=${queryState}&Size=${size}&Page=${page}&isFreshCache=${isFreshCache}`);
  },
  //根据关键字查询订单/获取全部订单
  searchOrderList({queryString = '', page = 1, size = 10} = {}){
    return http.postByNoLoading(`/Order/QueryOrderList?Size=${size}&Page=${page}&queryString=${queryString}`)
  },
  //查询订单详情
  getOrderDetail(orderId){
    return http.post(`/order/GetOrderDetail?orderId=${orderId}`)
  },
};

export default api;
