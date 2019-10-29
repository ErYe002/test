import http from '@/utils/request.js';

const api = {
  //领取礼券
  presentCouponNo(couponId) {
    return http.post(`/Account/PresentCouponNo?id=${couponId}`);
  }
};

export default api;
