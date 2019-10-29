import http from '@/utils/request.js';

const api = {
  //获取分类
  getGoodsClass() {
    return http.post('/Goods/GetAllAppClassList');
  }
};

export default api;
