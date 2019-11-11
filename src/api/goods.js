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
    return http.post(`/Goods/QueryGoods?goodsType=${goodsType}&price=${price}&period=${decodeURIComponent(period)}&shopId=2`);
  },
  //自营商品获取品牌推荐、热销排行数据
  getLikeGoods1(brandIds,KeyWord,Sort) {
    return http.post(`/Goods/SearchSimilar?brandIds=${brandIds}&KeyWord=${KeyWord}&Sort=${Sort}&shopId=1&Page=1&Size=10`);
  },
  //自营商品获取猜你喜欢数据
  getLikeGoods2(shopId) {
    return http.post(`/Goods/GoodsLike?shopId=${shopId}`);
  },
};

export default api;
