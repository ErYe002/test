import http from '@/utils/request.js';

const api = {
  //当前登录用户信息是否过期
  checkToken(){
    return http.postByNoLoading('Account/GetScoreMallHead')
  },
  //获取 openId, sessionKey
  getAppMainInfo(code){
    return http.post('ThirdPartnerLogin/WechatSamllApplciationOpenId?code=' + code)
  },
  //用户登录
  appLogin(session_key, encryptedData, iv){
    return http.post('ThirdPartnerLogin/WechatSamllApplciationLogin?session_key=' + encodeURIComponent(session_key) + '&encryptedData=' + encodeURIComponent(encryptedData) + '&iv=' + encodeURIComponent(iv))
  },
  //是否获取过于频繁而需显示图片验证码
  isShowImgCode(){
    return http.post('Account/IsShowPictureVerificationCode')
  },
  //绑定手机时获取短信验证码
  getMobileCode({ partnerID, thirdLoginSourceType = "Wechat", mobile, verifyCode, verifyCodeUid, isVoice = false}={}) {
    return http.post('Account/ApplyThirdRegisterVerifyCode?partnerID=' + encodeURIComponent(partnerID) + '&thirdLoginSourceType=' + thirdLoginSourceType + '&mobile=' + mobile + '&verifyCode=' + verifyCode + '&verifyCodeUid=' + verifyCodeUid + '&isVoice=' + isVoice)
  },
  //当登录后返回token为空时，为第三方首次登录绑定手机号
  bindMobileForNoToken({ mobile, code, openId, loginSourceType = "Wechat", unionId} = {}) {
    return http.post('Account/ThirdPartyRegisterForAPP?mobile=' + mobile + '&mobileVerificationCode=' + code + '&thirdPartUserId=' + encodeURIComponent(openId) + '&loginSourceType=' + loginSourceType + '&unionId=' + encodeURIComponent(unionId))
  },
  //当登录后返回token不为空时，直接绑定手机号
  bindMobile(mobile, code) {
    return http.post('Account/VerifyBindMobile?mobile=' + mobile + '&verificationCode=' + code)
  },
  //获取个人中心用户信息
  getHomePageOfPersonnel(){
    return http.post('Account/GetHomePageOfPersonnel')
  },
  //获取个人中心钱包等信息
  getWalletOfPersonnel(){
    return http.post('Account/GetWalletOfPersonnel')
  }
}

export default api