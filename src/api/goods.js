import http from '@/utils/request.js';

const api = {
  //领取礼券
  presentCouponNo(couponId) {
    return http.post(`/Account/PresentCouponNo?id=${couponId}`);
  },
  //商品详情
  getGoodsDetail(seocode,isCompGoods){
    return http.post(`/Goods/GoodsDeatilAsync?seocode=${seocode}&isCompGoods=${isCompGoods}`);
  },
  //获取商品详情描述
  getGoodsAbout(goodsId) {
    return http.post(`/Goods/GoodsDiscription?goodsId=${goodsId}`);
  },
};

export default api;
