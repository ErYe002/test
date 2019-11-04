<template>
    <div class="container">
      <div class="info bottom_gray padding_set">
        <div class="account">
          <p class="account_P">当前您的账号金额: <span class="account_detail">¥ {{TotalBalance}}</span></p>
          <p class="account_P">冻结金额: <span class="account_detail">¥ {{FreezingBalance}}</span></p>
          <p class="account_P">可用金额: <span class="account_detail">¥ {{AvailableBalance}}</span></p>
        </div>
        <p class="note">注:活动类现金金额不能提现,只供本站购物使用</p>
      </div>
      <div class="padding_set">
        <div class="input_center border_set inline_col_center">
          <picker @change="pickerChange" value="index" v-bind:range="accountType">
            <div class="picker">
               {{accountTypeString}}
            </div>
          </picker>
        </div>
        <div class="inline_flex " >
          <div class="border_set input_center inline_col_center flex_grow">
            <input type="number" v-model="ApplyMoney" placeholder="输入申请金额"/>
          </div>
          <div class="border_set input_center inline_col_center flex_grow">
            <input type="text" v-model="PayeeName" placeholder="输入收款人姓名"/>
          </div>
        </div>
        <div class="input_center border_set inline_col_center">
          <input type="text" v-model="CashAccount" placeholder="提现账号"/>
        </div>
        <div class="input_center border_set inline_col_center">
          <input type="text" v-model="CashAccountAgain" placeholder="再次输入提现账号"/>
        </div>
      </div>
      <div>
        <div class="inline_flex border_topbottom">
          <input id="input_code" v-model="PhoneCode" type="text" placeholder="请输入手机号获取的验证码"/>
          <div id="getCode" @click="get_PhoneCode" >{{getCodeInfo}}</div>
        </div>
      </div>
      <div id="input_info_div" class="bottom_gray">
        <input id="input_info" type="text" v-model="inputInfo" disabled="disabled" />
      </div>
      <div class="bottom_gray padding_set">
        <p class="note">温馨提示：为了将余额更快捷的提现到您的银行账号,我们
          建议您使用原支付账户来申请提现,可得网在收到您的提现申请后,会在两个
          工作日内处理。跨行提现审核时间较长，最多为七个工作日。另为防止利用
          本站进行违规套现行为，信用卡用户只能申请提现原支付账号。</p>
      </div>
      <div class="padding_set">
        <button id="commit" @click="buttonCommit">提交</button>
      </div>
    </div>
</template>

<script>

import api from "@/api/balance";

export default {
  data () {
    return {
      // 可用余额，不包含冻结金额
      AvailableBalance:0,
      // 冻结余额
      FreezingBalance:0,
      // 总计余额
      TotalBalance:0,
      accountType:[],
      accountTypeString:'请选择账户类型 ∨',
      ApplyMoney:'',
      PayeeName:'',
      CashAccount:'',
      CashAccountAgain:'',
      PhoneCode:'',
      inputInfo:'',
      getCodeInfo:'获取验证码',
      show:true,
      timer:null,
      count:''
    }
  },
  //页面加载
  onLoad: function (options) {
    this.AvailableBalance = options.AvailableBalance;
    this.FreezingBalance = options.FreezingBalance;
    this.TotalBalance = options.TotalBalance;
    api.getWithdrawBankAccounts().then(({Data})=>{
      this.accountType = [...Data]
    });
  },

  methods:{
    pickerChange (e) {
      this.accountTypeString = this.accountType[e.mp.detail.value];
    },
    buttonCommit(){
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(this.accountTypeString == '请选择账户类型 ∨'){
        this.inputInfo = "请选择账户类型";
      }
      else if(this.ApplyMoney <= 0){
        this.inputInfo = "请确认申请金额大于等于0"
      }
      else if(this.PayeeName == ''){
        this.inputInfo = "请输入收款姓名"
      }
      else if(this.CashAccount == '' || !(phoneReg.test(this.CashAccount) || emailReg.test(this.CashAccount)) || this.CashAccount != this.CashAccountAgain ){
        this.inputInfo = "请确认提现账号为手机号或邮箱并且两次输入一致"
      }
      else if(this.PhoneCode == ''){
        this.inputInfo = "请填写验证码"
      }
      else{
        api.applyWithdraw({WithdrawMode:this.accountTypeString,Amount:this.ApplyMoney,PayeeRealName:this.PayeeName,PayeeAccount:this.CashAccount,WithdrawVerificationCode:this.PhoneCode}).then(({Data})=>{
          wx.showModal({
            title: '提示',
            content: '我们已经收到您的提现申请,会在1-3个工作日内为您办理提款业务，请注意查收。',
            showCancel:false,
            success (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta:1
                })
              } 
            }
          });
        })
      }
    },
    get_PhoneCode(){
      if(!this.timer){
          api.applyBalanceWithdrawVerifyCode().then(({Data})=>{
          this.inputInfo = "验证码已成功发送到指定手机";
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.getCodeInfo='重新获取('+this.count+'S)';
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
                this.getCodeInfo='重新获取('+this.count+'S)';
              } 
              else {
                this.show = true;
                this.getCodeInfo='获取验证码';
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        });                           
      }
    }
  }

}

</script>

<style scoped lang="less">
.container{
  color:gray;
}
.account_detail{
  color:#f6a2b1;
}

.account_P{
  font-size:12px;
  margin-bottom:9px;
}

.info{
  display:flex;
  flex-direction:column;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.note{
  color:gray;
  font-size:10px;
}

.inline_flex{
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:center;
}

.input_center{
  text-align:center;
}

.bottom_gray{
  border-bottom:10px solid #ececec;
}

.padding_set{
  padding:10px;
  font-size:10px;
}

.border_set{
  border:1px solid #ececec;
  margin-bottom:10px;
  height:40px;
}

.inline_col_center{
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:center;
  align-items:center;
}

.border_topbottom{
  border-top:1px solid #ececec;
  border-bottom:1px solid #ececec;
  margin-top:-10px;
  padding-top:5px;
  padding-bottom:5px;
  padding-left:10px;
  padding-right:10px;
  font-size:10px;
}

#commit{
  background-color:#cbb897;
  color:white;
}

#getCode{
  background-color:#fca402;
  color:yellow; 
  height:30px;
  line-height:30px;
  padding-right:10px;
  padding-left:10px;
}

.flex_grow{
  width:48%;
}

#input_code{
  width:40%;
}

#input_info{
  color:#f6a2b1;
  font-size:9px;
  width:100%;
}

#input_info_div{
  padding-left:10px;
  padding-right:10px;
  padding-top:5px;
  padding-bottom:5px;
}

</style>