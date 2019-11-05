import http from '@/utils/request.js';

const api = {
  //领取礼券
  presentCouponNo(couponId) {
    return http.post(`/Account/PresentCouponNo?id=${couponId}`);
  },
  //商品详情
  getGoodsDetail(seocode,isCompGoods){
    return http.post(`Goods/GoodsDeatilAsync?seocode=${seocode}&isCompGoods=${isCompGoods}`);
  }
};

export default api;
