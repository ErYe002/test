import http from '@/utils/request.js';

const api = {
  //根据订单状态获取订单列表
  getOrderList({ queryState, isFreshCache = false, page = 1, size = 10 } = {}) {
    let url = `/order/GetOrderList?QueryState=${queryState}&Size=${size}&Page=${page}&isFreshCache=${isFreshCache}`;
    if (page > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //根据关键字查询订单/获取全部订单
  searchOrderList({ queryString = '', page = 1, size = 10 } = {}) {
    let url = `/Order/QueryOrderList?Size=${size}&Page=${page}&queryString=${queryString}`;
    if (page > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //查询订单详情
  getOrderDetail(orderId) {
    return http.post(`/order/GetOrderDetail?orderId=${orderId}`);
  },
  //取消订单
  cancelOrder(orderId) {
    return http.post(`/order/CancelOrder?orderId=${orderId}`);
  },
  //自营物流信息
  logisticsQuery(orderId) {
    return http.post(`/order/OrderQuery?orderId=${orderId}`);
  },
  //海外物流信息
  logisticsOverseaQuery(orderId) {
    return http.post(`/order/QueryOrderLogisticsForOverseas?orderId=${orderId}`);
  },
  //获取待评价商品列表
  pendingComments(page, pageSize = 10) {
    return http.post(
      `/comment/PendingComments?pageIndex=${page}&pageSize=${pageSize}`
    );
  },
  //添加商品评论
  addGoodsComment(OrderId, GoodsId, GoodsScore, Remark,ImageUrl,Srate,Erate) {
    return http.post(
      `/comment/AddGoodsComment`,
      {
        OrderId:OrderId,
        GoodsId:GoodsId,
        GoodsScore:GoodsScore,
        Remark:Remark,
        ImageUrl:ImageUrl,
        Srate:Srate,
        Erate:Erate
      },
      {
        'content-type':'application/x-www-form-urlencoded'
      }
    );
  },
  //获取单条评论
  getGoodsComment(commentId){
    return http.post(
      `/comment/GetGoodsComment?commentId=${commentId}`
    )
  }
};

export default api;
