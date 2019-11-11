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
  //海外商品获取同类别同周期等数据
  getQueryGoods(goodsType,price,period) {
    return http.post(`/api/Goods/QueryGoods?goodsType=${goodsType}&price=${price}&period=${period}&shopId=2`);
  },
};

export default api;
