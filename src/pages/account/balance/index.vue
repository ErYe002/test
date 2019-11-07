<template>
    <div class="container">
      <div class="info">
        <div class="account padding_set">
          <p class="account_P">当前余额：<span class="account_detail">¥ {{TotalBalance}}</span></p>
          <p class="account_P">冻结金额：<span class="account_detail">¥ {{FreezingBalance}}</span></p>
          <p class="account_P">可用金额：<span class="account_detail">¥ {{AvailableBalance}}</span></p>
        </div>
        <div class="operation">
          <button @click="gotoCash">余额提现</button>
        </div>
      </div>
      <div id="note_div">
        <p class="note">注:活动类现金金额不能提现,只供本站购物使用</p>
      </div>
      <div class="record">
        <div id="record_button">
          <div @click="record_changeFunc" class="border_bottom" :class="{buttonChecked:IsDetail}">
            <p>余额明细</p>
          </div>
          <div @click="record_changeFunc" class="border_bottom" :class="{buttonChecked:!IsDetail}">
            <p>提现记录</p>
          </div>
        </div>
        <div class="record_detail" v-if="NotClear">
          <ul id="record_detail" v-if="IsDetail">
            <li class="record_item" v-for="(item,index) in balanceDetailList" :key="index">
              <div class="record_detail_item_one">
                <p>{{item.Title}}</p>
                <p>{{item.OccurTime}}</p>
              </div>
              <div class="record_detail_item_two">
                <p>余额: <span>¥{{item.ChangedBalance}}</span></p>
                <p id="change">¥{{item.ChangeAmount}}</p>
              </div>
            </li>
            <div class="footer" v-if="IsDetailEnd">
                <span class="line"></span>
                <span class="text">就到这里了哦</span>
                <span class="line"></span>
            </div>
          </ul>
          <ul v-else>
            <li class="record_info" v-for="(item,index) in cashHistoryList" :key="index">
              <div class="title_bar">
                <p>{{item.No}}</p>
                <p>{{item.ProcessState}}</p>
              </div>
              <div class="record_info_detail">
                <p>提现：￥{{item.Amount}}</p>
                <p>收款人：{{item.PayeeRealName}}</p>
                <p>收款账户：{{item.PayeeAccount}}</p>
                <p>提款方式：{{item.WithdrawMode}}</p>
                <p>申请时间：{{item.ApplyTime}}</p>
              </div>
            </li>
            <div class="footer" v-if="IsHistoryEnd">
                <span class="line"></span>
                <span class="text">就到这里了哦</span>
                <span class="line"></span>
            </div>
          </ul>
        </div>
        <div class="record_clear" v-if="!NotClear">
            <p>暂时没有记录!</p>
        </div>
      </div>
    </div>
</template>

<script>

import api from "@/api/balance";

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      balance: {
        current: 999,
        frozen: 999,
        available:999
      },
      items:[
        {id:1,operation:'取消订单',date:'2019-10-26 01:32:53',balance:424.54,change:124.54},
        {id:2,operation:'下单扣除',date:'2019-10-22 16:55:17',balance:'300.00',change:'-124.54'}
      ],
      //是否在余额明细页面
      IsDetail:true,
      // 可用余额，不包含冻结金额
      AvailableBalance:0,
      // 冻结余额
      FreezingBalance:0,
      // 总计余额
      TotalBalance:0,
      balanceDetailList:[],
      cashHistoryList:[],
      //余额明细索引
      detail_index:2,
      history_index:1,
      IsDetailEnd:false,
      IsHistoryEnd:false,
      //提现页面是否第一次加载
      IsHistoryFirstLoad:true,
      NotClear:true
    }
  },

  onLoad: function () {
    api.getBalanceOfPersonnel().then(({Data})=>{
      this.AvailableBalance = Data.AvailableBalance;
      this.FreezingBalance = Data.FreezingBalance;
      this.TotalBalance = Data.TotalBalance;
    });
    this.get_getBalanceDetails({pageIndex:this.detail_index});
  },
  //上拉刷新
  onReachBottom: function(){
    if(this.IsDetail && !this.IsDetailEnd){
      this.get_getBalanceDetails({pageIndex:this.detail_index});
    }
    else{
      if(!this.IsHistoryEnd){
        this.get_BalanceWithdraws({pageIndex:this.history_index});
      }
    }
  },



  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    gotoCash () {
      wx.navigateTo({
        url:'/pages/account/cash/main?AvailableBalance='+this.AvailableBalance+'&FreezingBalance='+this.FreezingBalance+'&TotalBalance='+this.TotalBalance
      })
    },
    //页面切换
    record_changeFunc(){
      this.IsDetail=!this.IsDetail;
      if(this.IsHistoryFirstLoad){
        this.get_BalanceWithdraws({pageIndex:this.history_index});
        this.IsHistoryFirstLoad = false;
      }
    },
    get_getBalanceDetails({pageIndex=this.detail_index}){
      api.getBalanceDetails({pageIndex}).then(({Data,TotalPage})=>{
        if(this.detail_index==1){
          this.balanceDetailList = [...Data];
        }
        else{
          this.balanceDetailList = this.balanceDetailList.concat(Data);
        }
        this.NotClear = this.balanceDetailList.length > 0;
        if(pageIndex >= TotalPage){
          this.IsDetailEnd = true;
        }
        this.detail_index = ++this.detail_index;
      });
    },
    get_BalanceWithdraws({pageIndex=this.history_index}){
      api.getBalanceWithdraws({pageIndex}).then(({Data,TotalPage})=>{
        if(this.history_index==1){
          this.cashHistoryList = [...Data];
        }
        else{
          this.cashHistoryList = this.cashHistoryList.concat(Data)
        }
        this.NotClear = this.cashHistoryList.length > 0;
        if(pageIndex >= TotalPage){
          this.IsHistoryEnd = true;
        }
        this.history_index = ++this.history_index;
      })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="less">
.account_detail{
  color:#f6a2b1;
  font-size:14px;
}

.account_P{
  margin-bottom:9px;
  font-size:14px;
}

.info{
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.operation{
  margin-top:15px;
  margin-right:15px;
  color:yellow;
}

.operation button{
  border:solid 1px #cab894;
  color:#cab894;
  font-size:14px;
  border-radius:4px;
  background: transparent;
}

.note{
  color:gray;
  font-size:12px;
}

#record_button{
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
  justify-content:space-around;
  padding-top:15px;
  color:gray;
}

ul{
  list-style-type:none;
}

#record_detail li{
  display:flex;
  flex-direction:column;
  flex-wrap:nowrap;
}

#record_detail li div{
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.padding_set{
  padding:10px;
  padding-bottom:0;
}

#note_div{
  padding:10px;
  padding-top:0;
  padding-bottom:8px;
  border-bottom:9px solid #ececec;
}

.border_bottom{
  width:50%;
  height:100%;
  text-align:center;
  font-size:14px;
  padding-bottom:15px;
  border-bottom:1px solid #eeeeee;
}

.record_item{
  padding:15px;
  padding-top:10px;
  padding-bottom:8px;
  border-bottom:5px solid #eaeaea;
}

.record_detail_item_one{
  font-size:12px;
  margin-bottom:10px;
  color:#7d7d7d;
}

.record_detail_item_two{
  font-size:10px;
  color:#7d7d7d;
}

#change{
  color:#e58e94;
}

.record_info{
  padding:10px;
  padding-top:0;
  border-bottom:5px solid #eaeaea;
}

.title_bar{
  padding-top:10px;
  padding-bottom:10px;
  border-bottom:2px solid #eaeaea;
  font-size:12px;
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.record_info_detail p{
  margin-top:10px;
  font-size:12px;
  color:#828282;
}

.title_bar p:nth-child(2){
  color:#f6a2b1;
}

.buttonChecked{
  border-bottom:3px solid #cab894;
  color:#cab894;
}

.footer
{
    width:100%;
    height:36px;
    line-height:36px;
    text-align:center;
    color:gray;
    font-size:12px;
}
.line
{
    display:inline-block;
    width:100px;
    border-top:1px solid #cccccc;
    vertical-align:5px;  
}

.record_clear{
  width:100%;
  text-align:center;
  margin-top:150px;
  color:gray;
  font-size:14px;
}

</style>