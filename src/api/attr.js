import http from '@/utils/request.js';

const api = {
  //获取有属性商品加入购物车属性
  getFrameJoinCart(GId, isAllSaleScore) {
    return http.post(`/Goods/FrameJoinCart?GId=${GId}&isAllSaleScore=${isAllSaleScore}`);
  },
  //获取光度信息列表
  getOptometryBillBaiscDataLibrary() {
    return http.postByNoLoading(`/Account/GetOptometryBillBaiscDataLibrary`);
  },
  //购买无属性框架商品
  buyNoPropertyFrame(mapPrams) {
    return http.post(`/cart/BuyNoPropertyFrame?
goodsId=${mapPrams.get('goodsId')}
&IsConfirmedBuy=${mapPrams.get('IsConfirmedBuy')}
&ShopId=${mapPrams.get('ShopId')}
&Quantity=${mapPrams.get('Quantity')}
&GDPropertyGifts=${mapPrams.get('GDPropertyGifts')}
&SelectedSpecifications=${mapPrams.get('SelectedSpecifications')}
&NoPropertyGifts=${mapPrams.get('NoPropertyGifts')}
&MaxSellNumber=${mapPrams.get('MaxSellNumber')}
&GoodsName=${mapPrams.get('GoodsName')}
&SeriesId=${mapPrams.get('SeriesId')}
&MarketPrice=${mapPrams.get('MarketPrice')}
&SalePrice=${mapPrams.get('SalePrice')}
&SaleScore=${mapPrams.get('SaleScore')}
&IsScarcity=${mapPrams.get('IsScarcity')}
&IsSpecialOffer=${mapPrams.get('IsSpecialOffer')}
&SaleStockType=${mapPrams.get('SaleStockType')}
&MaxDeduction=${mapPrams.get('MaxDeduction')}
&IsFreeCarriage=${mapPrams.get('IsFreeCarriage')}`);
  },
  //购买框架和镜片（框架配镜）
  buyFrameAndGlass(mapParms) {
    return http.post(`/Cart/BuyFrameAndGlass?
goodsId=${mapParms.get('goodsId')}
&IsConfirmedBuy=${mapParms.get('IsConfirmedBuy')}
&ShopId=${mapParms.get('ShopId')}
&IsBuyByScore=${mapParms.get('IsBuyByScore')}
&LeftQuantity=${mapParms.get('LeftQuantity')}
&RightQuantity=${mapParms.get('RightQuantity')}
&GlassGroupId=${mapParms.get('GlassGroupId')}
&GlassGoodsId=${mapParms.get('GlassGoodsId')}
&LeftGD=${mapParms.get('LeftGD')}
&RightGD=${mapParms.get('RightGD')}
&LeftSG=${mapParms.get('LeftSG')}
&RightSG=${mapParms.get('RightSG')}
&LeftZW=${mapParms.get('LeftZW')}
&RightZW=${mapParms.get('RightZW')}
&TongJu=${mapParms.get('TongJu')}`);
  }
};

export default api;
