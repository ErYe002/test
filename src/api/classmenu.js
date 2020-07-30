import http from '@/utils/request.js';

const api = {
  //获取分类
  getGoodsClass() {
    return http.post('/Goods/GetAllAppClassList?versionNo=5.0.0');
  }
};

export default api;
