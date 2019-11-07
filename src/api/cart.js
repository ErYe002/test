import http from '@/utils/request.js';

const api = {
  //获取购物车数据
  getCartDetail(shopid) {
    return http.post(`/Cart/GetNewCartDetail?shopid=${shopid}`);
  },
  //获取购物车海内外商品数量
  getCartGoodsQuantity(){
    return http.postByNoLoading(`/Cart/GetCartGoodsQuantityAsync`)
  },
  //选择店铺：海外或自营
  selectShop(isUseScore, shopId){
    return http.post(`/Cart/SelectShop?isUseScore=${isUseScore}&shopId=${shopId}`)
  },
  //购物车项打钩
  selectGoods(uniqueId, shopId){
    return http.post(`/Cart/Select?uniqueId=${uniqueId}&shopId=${shopId}`)
  },
  //购物车项打钩
  unSelectGoods(uniqueId, shopId){
    return http.post(`/Cart/UnSelect?uniqueId=${uniqueId}&shopId=${shopId}`)
  },
  //批量选中商品
  selectGoodsByIds(uniqueIds){
    return http.post(`/Cart/SelectCartItems?uniqueIds=${JSON.stringify(uniqueIds)}`)
  },
  //批量取消选中商品
  unSelectGoodsByIds(uniqueIds){
    return http.post(`/Cart/UnSelectCartItems?uniqueIds=${JSON.stringify(uniqueIds)}`)
  },
  //批量收藏
  collectionCartGoods(uniqueIds){
    return http.post(`/Cart/CollectionCartGoods?uniqueIds=${JSON.stringify(uniqueIds)}`)
  },
  //批量删除购物车项
  deleteCartGoods(uniqueIds){
    return http.post(`/Cart/DeleteCartItems?uniqueIds=${JSON.stringify(uniqueIds)}`)
  },
  //获取商品编辑的数据
  getEditGoodsInCartData({uniqueId, goodsId, shopId, realGoodsId} = {}){
    return http.post(`/Cart/GetEditGoodsInCartData?uniqueId=${uniqueId}&goodsId=${goodsId}&shopId=${shopId}&realGoodsId=${realGoodsId}`)
  },
  //在购物车编辑商品信息
  editGoodsInCart({uniqueId, goodsId, isConfirmedBuy, shopId, deleteRealGoodsId, hasProperty, selectedProperty, quantity} = {}){
    let requestUrl = `/Cart/EditGoodsInCart?UniqueId=${uniqueId}&GoodsId=${goodsId}&IsConfirmedBuy=${isConfirmedBuy}&ShopId=${shopId}&DeleteRealGoodsId=${deleteRealGoodsId}`
    if(hasProperty){
      //如果是有属性商品
      if(selectedProperty.length > 0){
        let selectedPropertyList = []
        selectedProperty.forEach(ele => {
          selectedPropertyList.forEach(item => {
            //相同光度合并数量
            if(ele.GD == item.GD){
              item.Quantity += ele.Quantity
            }
          })
          selectedPropertyList.push({
            GD: ele.GD,
            Quantity: ele.Quantity
          })
        })
        requestUrl += ('&SelectedProperty=' + JSON.stringify(selectedPropertyList))
      }
    } else {
      //无属性商品
      requestUrl += ('&Quantity=' + quantity)
    }
    return http.post(requestUrl)
  },
  //修改数量
  modifyQuantity({shopId, uniqueId, realGoodsId, quantity} = {}){
    return http.post(`/Cart/ModifyQuantity?shopId=${shopId}&uniqueId=${uniqueId}&realGoodsId=${realGoodsId}&quantity=${quantity}`)
  },
  //删除指定商品。只有返回IsDisplayDelete = true的才允许删除
  delete(uniqueId, shopId){
    return http.post(`/Cart/Delete?shopId=${shopId}&uniqueId=${uniqueId}`)
  },
  //获取用户当前购物车内可用的礼券集合
  getCanUseCoupons(shopId){
    return http.post(`/Cart/GetShopCartCouponList?shopId=${shopId}&isEffective=true`)
  },
  //使用礼券
  useCoupon(couponNo, shopId){
    return http.post(`/Cart/UseCoupon?couponNo=${couponNo}&shopId=${shopId}`)
  },
  //取消使用礼券
  cancelUseCoupon(shopId){
    return http.post(`/Cart/CancelUseCoupon?shopId=${shopId}`)
  },
  //获取赠换品的信息
  getSpecialExchangeGifts(shopId){
    return http.post(`/Cart/GetSpecialExchangeGifts?shopId=${shopId}`)
  },
  //获取加钱换购商品的信息
  getExchangeGifts(shopId, uniqueId){
    return http.post(`/Cart/GetFreedomCollocationByUniqueId?shopId=${shopId}&uniqueId=${uniqueId}`)
  },
  //获取买1送多赠品商品信息
  getFreeGiftByUniqueId(shopId, uniqueId){
    return http.post(`/Cart/GetFreeGiftByUniqueId?shopId=${shopId}&uniqueId=${uniqueId}`)
  },
  //去结算--验证
  toBalance(shopId){
    return http.post(`/Cart/ToBalance?shopId=${shopId}`)
  },
  //=====================================以下是订单确认页用到的接口=====================================
  //结算页获取用户当前购物车内可用的礼券集合
  getCanUseCouponsInOrder(shopId){
    return http.post(`/Cart/GetCanUseCoupons?shopId=${shopId}&isEffective=true`)
  },
  //在订单确认页面的任何一项数据发生变化时调用
  getConfirmOrderDetail({isUseScore, selectedConsigneeId, selectedPayMode, selectedExpressId, isUseBalance, invoiceType, invoiceTitle, invoiceItemId, selectInvoiceMode, axpayerIdentityNumber, bankName, bankAccount, companyAddress, mobileNo, IDCard, selectShopId} = {}){
    return http.post(`/Cart/GetConfirmOrderDetail?IsUseScore=${isUseScore}&SelectConsigneeId=${selectedConsigneeId}&SelectPayMode=${selectedPayMode}&SelectExpressId=${selectedExpressId}&IsUseBalance=${isUseBalance}&InvoiceType=${invoiceType}&InvoiceTitle=${invoiceTitle}&InvoiceItemId=${invoiceItemId}&InvoiceMode=${selectInvoiceMode}&identityNumber=${axpayerIdentityNumber}&bankName=${bankName}&bankAccount=${bankAccount}&companyAddress=${companyAddress}&mobileNo=${mobileNo}&IDCard=${IDCard}&selectShopId=${selectShopId}`)
  },
  //获取支付配送页面的数据
  getPaymentAndDelivery(consigneeId, shopId){
    return http.post(`/Cart/GetPaymentAndDelivery?shopId=${shopId}&consigneeId=${consigneeId}`)
  },
  //修改支付配送页面的数据（修改快递）
  editPaymentAndDelivery(expressId, price){
    return http.post(`/Cart/EditPaymentAndDelivery?payMode=1&expressId=${expressId}&price=${price}`)
  },
  //修改发票信息
  editInvoiceInfo({invoiceTypeId, invoiceTitle, invoiceMode, axpayerIdentityNumber} = {}){
    return http.post(`/Cart/EditInvoiceInfo?invoiceTypeId=${invoiceTypeId}&invoiceTitle=${invoiceTitle}&invoiceContentId=&invoiceMode=${invoiceMode}&identityNumber=${axpayerIdentityNumber}`)
  },
  //获取发票信息页面的基本信息
  getInvoiceBasicLibrary(){
    return http.post(`/Cart/GetInvoiceBasicLibrary`)
  },
  //获取商品清单
  getPendingBuyGoods(shopid){
    return http.post(`/Cart/GetPendingBuyGoods?shopId=${shopid}`)
  },
  //获取猜你喜欢商品
  getGoodsLike(shopid){
    return http.postByNoLoading(`/Goods/GoodsLike?shopId=${shopid}`)
  },
  //提交订单
  submitOrder({isUseScore, selectConsigneeId, selectPayMode, selectExpressId, isUseBalance, invoiceType, invoiceTitle, invoiceItemId, selectInvoiceMode, axpayerIdentityNumber, bankName, bankAccount, companyAddress, mobileNo, IDCard, warehouseId, selectShopId} = {}){
    return http.post(`/Cart/SubmitOrder?IsUseScore=${isUseScore}&SelectConsigneeId=${selectConsigneeId}&SelectPayMode=${selectPayMode}&SelectExpressId=${selectExpressId}&IsUseBalance=${isUseBalance}&SelectInvoiceType=${invoiceType}&InvoiceTitle=${invoiceTitle}&InvoiceItemId=${invoiceItemId}&SelectInvoiceMode=${selectInvoiceMode}&identityNumber=${axpayerIdentityNumber}&bankName=${bankName}&bankAccount=${bankAccount}&companyAddress=${companyAddress}&mobileNo=${mobileNo}&IDCard=${IDCard}&WarehouseId=${warehouseId}&SelectShopId=${selectShopId}`)
  }
};

export default api;
