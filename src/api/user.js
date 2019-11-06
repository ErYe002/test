import http from '@/utils/request.js';

const api = {
  //当前登录用户信息是否过期
  checkToken() {
    return http.postByNoLoading('Account/GetScoreMallHead');
  },
  //用户登录
  appLogin(session_key, encryptedData, iv) {
    return http.post(
      '/ThirdPartnerLogin/WechatSamllApplciationLogin',
      {
        session_key,
        encryptedData,
        iv
      },
      {
        'content-type': 'application/x-www-form-urlencoded'
      },
      false
    );
  },
  //通过code获取用户openid等信息
  getAppMainInfo(code) {
    return http.post(
      '/ThirdPartnerLogin/WechatSamllApplciationOpenId?code=' + code
    );
  },
  //绑定手机号
  bindMobileForMinProgram(
    isNewUser,
    partnerId,
    encryptedData,
    iv,
    session_key
  ) {
    return http.post(
      '/Account/BindMobileForMinProgram',
      {
        isNewUser,
        partnerId,
        encryptedData,
        iv,
        session_key
      },
      {
        'content-type': 'application/x-www-form-urlencoded'
      }
    );
  },
  //获取最新的AccessToken
  getAccessToken() {
    return http.post(
      '/api/ThirdPartnerLogin/WechatSamllApplciationAccessToken'
    );
  },
  //获取个人中心用户信息
  getHomePageOfPersonnel() {
    return http.post('Account/GetHomePageOfPersonnel');
  },
  //获取个人中心钱包等信息
  getWalletOfPersonnel() {
    return http.post('Account/GetWalletOfPersonnel');
  },
  //获取我的收藏列表
  getFavoriteList(pageIndex, pageSize) {
    return http.post(`Account/GetFavoriteList?pageSize=${pageSize}&pageIndex=${pageIndex}&shopId=0`);
  },
  //根据商品Id取消收藏商品
  cancelFavoriteByGoodsId(goodsId){
    return http.post(`Account/CancelFavoriteByGoodsId?goodsId=${goodsId}`)
  }
};

export default api;
