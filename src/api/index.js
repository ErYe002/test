import http from '@/utils/request.js';

const api = {
  //获取首页menu
  getHomeMenuData(){
    return http.postByNoLoading(`/Home/AppHomeMenuList`)
  },
  //获取首页-推荐页数据
  getHomeRecommendData(){
    return http.postByNoLoading(`/Home/AppHomeRecommendPage?versionNo=4.2.0`)
  },
  //获取首页-推荐页猜你喜欢商品列表
  getHomeRecommendGoods(pageIndex, pageSize){
    let url = `/Home/GetAppHomeRecommendGoodsByPage?pageSize=${pageSize}&pageIndex=${pageIndex}`
    if(pageIndex == 1){
      return http.postByNoLoading(url)
    }
    return http.post(url)
  }
}

export default api