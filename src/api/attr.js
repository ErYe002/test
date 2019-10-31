import http from '@/utils/request.js';

const api = {
  //获取有属性商品加入购物车属性
  getFrameJoinCart(GId, isAllSaleScore) {
    return http.post(`/Goods/FrameJoinCart?GId=${GId}&isAllSaleScore=${isAllSaleScore}`);
  },

  getOptometryBillBaiscDataLibrary() {
    return http.postByNoLoading(`/Account/GetOptometryBillBaiscDataLibrary`);
  },
};

export default api;
