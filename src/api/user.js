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
    return http.postByNoLoading(
      '/ThirdPartnerLogin/WeChatMinProgramOpenId?code=' + code
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
      'ThirdPartnerLogin/WechatSamllApplciationAccessToken'
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
    let url = `Account/GetFavoriteList?pageSize=${pageSize}&pageIndex=${pageIndex}&shopId=0`;
    if (pageIndex > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //根据商品Id取消收藏商品
  cancelFavoriteByGoodsId(goodsId) {
    return http.post(`Account/CancelFavoriteByGoodsId?goodsId=${goodsId}`);
  },
  //获取用户的基本信息
  getPersonnelProfile() {
    return http.post('Account/GetPersonnelProfile');
  },
  //获取会员等级数据
  getRoleOfPersonnel() {
    return http.post('Account/GetRoleOfPersonnel');
  },
  //设置会员头像
  setHeadPortrait(){
    return http.upload('Account/SetHeadPortrait');
  },
  //修改用户名
  changeUserName(userName) {
    return http.post('Account/ChangeUserName?newLoginName=' + userName);
  },
  //设置用户昵称
  setUserNick(nick) {
    return http.post('Account/SetNick?nick=' + nick);
  },
  //设置用户性别
  setUserSex(sex) {
    return http.post('Account/SetSex?sex=' + sex);
  },
  //设置生日
  setBirthday(birthday) {
    return http.post('Account/SetBirthday?birthday=' + birthday);
  },
  //获取优惠券列表
  getCouponsByState(conponState, pageIndex = 1, pageSize = 10){
    let url = `Account/GetCouponsByState?conponState=${conponState}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    if (pageIndex > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //svip确认订单页
  getSvipPageData() {
    return http.post('Cart/ConfirmSvipOrder');
  },
  //svip提交订单
  submitSvipOrder(PromotionId) {
    return http.post('Cart/SubmitSvipOrder',{
      PromotionId:PromotionId
    });
  },
   //微信支付
   payOrder(orderId, openId) {
    return http.post(`/Payment/WechatPayForMinprogram?orderId=${orderId}&ip=&wechatOpenId=${openId}`)
  }
};
export default api;
