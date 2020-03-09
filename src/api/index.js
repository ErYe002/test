import http from '@/utils/request.js';

const api = {
  //获取首页menu
  getHomeMenuData(){
    return http.postByNoLoading(`/Home/AppHomeMenuList`)
  },
  //获取首页-推荐页数据
  getHomeRecommendData(){
    return http.postByNoLoading(`/Home/AppHomeRecommendPage?versionNo=4.5.4`)
  },
  //获取首页-推荐页猜你喜欢商品列表
  getHomeRecommendGoods(pageIndex, pageSize){
    let url = `/Home/GetAppHomeRecommendGoodsByPage?pageSize=${pageSize}&pageIndex=${pageIndex}`
    if(pageIndex == 1){
      return http.postByNoLoading(url)
    }
    return http.post(url)
  },
  //获取首页-框架页数据
  getHomeFramesData(){
    return http.postByNoLoading(`/Home/AppHomeFramesPage?versionNo=4.5.4`)
  },
  //获取首页-框架页商品列表
  getHomeFramesGoods({wordIdList, stringWordIds, pageSize = 10, pageIndex = 1, isDefaultGoods = true} = {}){
    let url = `/Home/FilterFramesGoodsListByWordIds`
    let data = {wordIdList, stringWordIds: JSON.stringify(stringWordIds), pageSize, pageIndex, isDefaultGoods}
    if(pageIndex == 1 && stringWordIds == null){
      return http.postByNoLoading(url, data)
    }
    return http.post(url, data)
  },
  //获取首页-海淘页数据
  appHomeOverseasPage(){
    return http.postByNoLoading(`/home/AppHomeOverSeasPage?versionNo=4.5.4`)
  },
  //初始化推荐
  getOverSeasRecommendGoodsByPageNoLoading({appHomeId,overseasModuleType ,pageSize = 10,pageIndex = 1}){
    return http.postByNoLoading(`/home/GetOverseasRecommendGoodsByPage?appHomeId=${appHomeId}&overseasModuleType=${overseasModuleType}&pageSize=${pageSize}&pageIndex=${pageIndex}`)
  },
  //获取海淘推荐商品
  getOverSeasRecommendGoodsByPage({appHomeId,overseasModuleType ,pageSize = 10,pageIndex = 1}){
    return http.post(`/home/GetOverseasRecommendGoodsByPage?appHomeId=${appHomeId}&overseasModuleType=${overseasModuleType}&pageSize=${pageSize}&pageIndex=${pageIndex}`)
  },
    //获取首页-美瞳页数据
    getHomeMeiTongData(){
      return http.postByNoLoading(`/home/AppHomeColoredContactsPage?versionNo=4.5.4`)
    },
    //获取首页-美瞳页商品列表
    getHomeMeiTongGoods(pageIndex, pageSize){
      let url = `/home/GetAppHomeColoredContactsGoodsByPage?versionNo=4.5.4&pageSize=${pageSize}&pageIndex=${pageIndex}`
      if(pageIndex == 1){
        return http.postByNoLoading(url)
      }
      return http.post(url)
    },
    //获取首页-隐形护理页数据
    getHomeNurseData(){
      return http.postByNoLoading(`/home/AppHomeContactCarePage?versionNo=4.5.4`)
    },
    //获取首页-隐形护理页商品列表
    getHomeNurseGoods(pageIndex, pageSize){
      let url = `/home/GetAppHomeContactCareGoodsByPage?versionNo=4.5.4&pageSize=${pageSize}&pageIndex=${pageIndex}`
      if(pageIndex == 1){
        return http.postByNoLoading(url)
      }
      return http.post(url)
    },
    
}

export default api