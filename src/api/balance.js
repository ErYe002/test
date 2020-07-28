import http from '@/utils/request.js';

const api = {
  //获取用户的账户余额信息
  getBalanceOfPersonnel(){
    return http.post(`/account/GetBalanceOfPersonnel`)
  },
  //分页获取余额明细。
  getBalanceDetails({pageIndex = 1, pageSize = 10 }={}){
    return http.post(`/account/GetBalanceDetails?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  },
  // 分页获取提现记录
  getBalanceWithdraws({pageIndex = 1,pageSize = 10}={}){
    return http.post(`/account/GetBalanceWithdraws?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  },
  //获取可提现的账户类型。（如 支付宝等）
  getWithdrawBankAccounts(){
    return http.post(`/account/GetWithdrawBankAcounts`)
  },
  //申请一个用户提现的短信验证码
  applyBalanceWithdrawVerifyCode(){
    return http.post(`/account/ApplyBalanceWithdrawVerifyCode`)
  },
  //申请提现
  applyWithdraw({WithdrawMode,Amount,PayeeRealName,PayeeAccount,WithdrawVerificationCode}){
    return http.post(`/account/ApplyWithdraw?WithdrawMode=${WithdrawMode}&Amount=${Amount}&PayeeRealName=${PayeeRealName}&PayeeAccount=${PayeeAccount}&WithdrawVerificationCode=${WithdrawVerificationCode}`)
  }
};

export default api;
