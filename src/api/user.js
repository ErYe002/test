import http from '@/utils/request.js';

const api = {
  //当前登录用户信息是否过期
  checkToken() {
    return http.postByNoLoading('/Account/GetScoreMallHead');
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
      '/ThirdPartnerLogin/WechatMinProgramAccessToken'
    );
  },
  //获取个人中心用户信息
  getHomePageOfPersonnel() {
    return http.post('/Account/GetHomePageOfPersonnel');
  },
  //获取个人中心钱包等信息
  getWalletOfPersonnel() {
    return http.post('/Account/GetWalletOfPersonnel');
  },
  //获取我的收藏列表
  getFavoriteList(pageIndex, pageSize) {
    let url = `/Account/GetFavoriteList?pageSize=${pageSize}&pageIndex=${pageIndex}&shopId=0`;
    if (pageIndex > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
  //根据商品Id取消收藏商品
  cancelFavoriteByGoodsId(goodsId) {
    return http.post(`/Account/CancelFavoriteByGoodsId?goodsId=${goodsId}`);
  },
  //获取用户的基本信息
  getPersonnelProfile() {
    return http.post('/Account/GetPersonnelProfile');
  },
  //获取会员等级数据
  getRoleOfPersonnel() {
    return http.post('/Account/GetRoleOfPersonnel');
  },
  //设置会员头像
  setHeadPortrait(){
    return http.upload('/Account/SetHeadPortrait');
  },
  //修改用户名
  changeUserName(userName) {
    return http.post('/Account/ChangeUserName?newLoginName=' + userName);
  },
  //设置用户昵称
  setUserNick(nick) {
    return http.post('/Account/SetNick?nick=' + nick);
  },
  //设置用户性别
  setUserSex(sex) {
    return http.post('/Account/SetSex?sex=' + sex);
  },
  //设置生日
  setBirthday(birthday) {
    return http.post('/Account/SetBirthday?birthday=' + birthday);
  },
  //获取优惠券列表
  getCouponsByState(conponState, pageIndex = 1, pageSize = 10){
    let url = `/Account/GetCouponsByState?conponState=${conponState}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    if (pageIndex > 1) {
      return http.post(url);
    }
    return http.postByNoLoading(url);
  },
   //获取客服二维码
   getCustomerService() {
    return http.post('/Account/CustomerService');
    },
    //获取告状二维码
    getFeedBack() {
      return http.post('/Account/Feedback');
    },
  //svip确认订单页
  getSvipPageData() {
    return http.post('/SvipBuy/ConfirmSvipOrder?versionNo=5.0.0');
  },
  //svip提交订单
  submitSvipOrder(CouponNo,ConsigneeId,GoodsList) {
    return http.post(
      `/SvipBuy/SubmitSvipOrder`,
      {
        CouponNo:CouponNo,
        ConsigneeId:ConsigneeId,
        Goods:JSON.stringify(GoodsList)
      },
      {
        'content-type':'application/x-www-form-urlencoded'
      }
    );
  },
  //svip获取权益照片
  SvipOrderImg() {
    return http.post('/Account/PrivilegeUrl');
  },
  //svip优惠券使用
  UseSvipCoupon(couponNo) {
      return http.post(`/SvipBuy/UseSvipCoupon?couponNo=${couponNo}`);
    },
   //微信支付
   payOrder(orderId, openId) {
    return http.post(`/Payment/WechatPayForMinprogram?orderId=${orderId}&ip=&wechatOpenId=${openId}`)
  },
  //获取新人礼券【登录后仅新人时调用】
  GetNewUserCoupons() {
    return http.post(`/Account/GetNewUserCoupons`)
  },
   //领取新人礼券
   PresentNewUserCoupons() {
    return http.post(`/Account/PresentNewUserCoupons`)
  },
  //svip订单明细
  GetSvipOrderDeductionList(pageIndex = 1,pageSize = 10){
    return http.get(`/Order/GetSvipOrderDeductionList?pageSize=${pageSize}&pageIndex=${pageIndex}`)
  },
  //红包头信息
  GetRedPackage(){
    return http.get(`/Account/GetRedPackage`)
  },
  //红包明细
  GetRedPackageDetail(pageIndex = 1,pageSize = 10){
    return http.get(`/Account/GetRedPackageDetail?pageSize=${pageSize}&pageIndex=${pageIndex}`)
  },
   //大转盘抽奖
   startGame(UnionId) {
    return http.post(`/Game/LotteryNew?openId=${UnionId}`)
  },
};
export default api;
