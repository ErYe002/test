import http from '@/utils/request.js';

const api = {
  //领取礼券
  presentCouponNo(couponId) {
    return http.post(`/Account/PresentCouponNo?id=${couponId}`);
  },
  //判断是否打包商品
  IsCompGoods(seocode) {
    return http.getByNoErrorTips(`/Goods/IsCompGoods?seocode=${seocode}`);
  },
  //商品详情
  getGoodsDetail(seocode, isCompGoods) {
    return http.post(`/Goods/GoodsDeatilAsync?seocode=${seocode}&isCompGoods=${isCompGoods}`);
  },
  //获取商品详情描述
  getGoodsAbout(goodsId) {
    return http.post(`/Goods/GoodsDiscription?goodsId=${goodsId}`);
  },
  //海外商品获取同类别同周期等数据
  getQueryGoods(goodsType, price, period) {
    return http.postByNoErrorTips(`/Goods/QueryGoods?goodsType=${goodsType}&price=${price}&period=${decodeURIComponent(period)}&shopId=2`);
  },
  //自营商品获取品牌推荐、热销排行数据
  getLikeGoods1(brandIds, KeyWord, Sort) {
    return http.post(`/Goods/SearchSimilar?brandIds=${brandIds}&KeyWord=${KeyWord}&Sort=${Sort}&shopId=1&Page=1&Size=10`);
  },
  //自营商品获取猜你喜欢数据
  getLikeGoods2(shopId) {
    return http.post(`/Goods/GoodsLike?shopId=${shopId}`);
  },
  //全部评论获取数据
  getRemarkData(GoodsId, RemarkType, LableName, Page) {
    return http.post(`/Goods/GoodsRemark?GoodsId=${GoodsId}&RemarkType=${RemarkType}&LableName=${LableName}&Size=10&Page=${Page}`);
  },
  //套餐组合列表数据
  getCombineData(goodsId) {
    return http.post(`/Goods/CompGoods?GoodsId=${goodsId}`);
  },
  //打包商品获取属性
  getCombineAttr(goodsId) {
    return http.post(`/Goods/GoodsField?GoodsId=${goodsId}`);
  },
  //打包商品提交
  buyCompGoods(GoodsId, Quantity, IsConfirmedBuy, ShopId, IsFreeCarriage, GDPropertyItems, NoPropertyItems) {
    return http.post(`/Cart/BuyCompGoods?GoodsId=${GoodsId}&Quantity=${Quantity}&IsConfirmedBuy=${IsConfirmedBuy}&ShopId=${ShopId}&IsFreeCarriage=${IsFreeCarriage}&GDPropertyItems=${GDPropertyItems}&NoPropertyItems=${NoPropertyItems}`);
  },
  //无属性商品提交
  buyNoProperty(GoodsId, IsBuyByScore, IsConfirmedBuy, Quantity, RealGoodsId, MaxSellNumber, GoodsName,SeriesId,MarketPrice,SalePrice,SaleScore,MaxDeduction,ShopId,IsFreeCarriage) {
    return http.postByNoErrorTips(`/Cart/BuyNoProperty?
    GoodsId=${GoodsId}
    &IsBuyByScore=${IsBuyByScore}
    &IsConfirmedBuy=${IsConfirmedBuy}
    &Quantity=${Quantity}
    &RealGoodsId=${RealGoodsId}
    &MaxSellNumber=${MaxSellNumber}
    &GoodsName=${GoodsName}
    &SeriesId=${SeriesId}
    &SalePrice=${SalePrice}
    &MaxDeduction=${MaxDeduction}
    &ShopId=${ShopId}
    &IsFreeCarriage=${IsFreeCarriage}`);
  },
  //获取关于商品社区文章
  getHotCommentList(GoodsId, PageSize) {
    return http.post(`/Community/GetHotCommentListByGoodsId?goodsId=${GoodsId}&pageSize=${PageSize}`);
  },
  //关注店铺
  Follow(BrandStoreId) {
    return http.post(`/BrandStore/Follow?brandStoreId=${BrandStoreId}`);
  },
  //取消关注店铺
  CancelFollow(BrandStoreId) {
    return http.post(`/BrandStore/CancelFollow?brandStoreId=${BrandStoreId}`);
  },
};

export default api;
