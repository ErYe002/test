import http from '@/utils/request.js';

const api = {
  //获取热门搜索
  getSerarchSettins(){
    return http.post('/Search/GetSearchKey');
  },
  //联想搜索
  associationSearch(keyWord, shopId = 1){
    return http.postByNoLoading(`/Goods/Association?KeyWord=${keyWord}&ShopId=${shopId}`);
  },
  //搜索商品
  searchGoods({sort = 1, keywords = '', size = 6, page = 1, shopId = 1} = {}){
    let url = `/Goods/SearchSimilar?Sort=${sort}&KeyWord=${keywords}&Size=${size}&Page=${page}&ShopId=${shopId}`
    if(page > 1){
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //筛选条件
  getScreening(classId){
    return http.post(`/Goods/Screening?id=${classId}`);
  },
  //筛选商品列表
  getScreeningGoodsList({page = 1, sort, classId, brandId, seoCode, className, uPrice, lPrice, size = 6, isNewVersion = true, attrs = []}){
    let attrsParam = ''
    if(attrs.length > 0){
      attrs.forEach(ele => {
        attrsParam += ('&Attrs=' + ele)
      })
    }
    // console.log(attrsParam)
    let url = `/Goods/Items?Page=${page}&Sort=${sort}&Cid=${classId}&Bid=${brandId}&Seocode=${seoCode}&ClassName=${className}&UPrice=${uPrice}&LPrice=${lPrice}&Size=${size}&IsNewVersion=${isNewVersion}${attrsParam}`
    if(page > 1){
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //查找促销商品列表
  searchPromotionGoods({shopId, promotionId, settingId, keyWord, sort, page, size} = {}){
    let url = `/Goods/SearchPromotionGoods?shopId=${shopId}&promotionId=${promotionId}&settingId=${settingId}&keyWord=${keyWord}&sort=${sort}&page=${page}&size=${size}`
    if(page > 1){
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
};

export default api;
