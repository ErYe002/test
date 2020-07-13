<template>
  <article class="contain">
  <section class="user-box">
    <div class="line">
      <a class=" h-90" @click="_setHeadPortrait">
        <label class="l-lab">头像</label>
        <img
          class="head" 
          :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'"
        />
        <img
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>
    </div>
    <div class="line">
      <a :href="'/pages/account/setting/modifyUserName/main?userName=' + userInfoModel.UserName">
        <label class="l-lab">用户名</label>
        <label class="r-lab">{{userInfoModel.UserName}}</label>
        <img
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>
    </div>
    <div class="line">
      <a :href="'/pages/account/setting/modifyUserNick/main?nick=' + userInfoModel.Nick">
        <label class="l-lab">昵称</label>
        <label class="r-lab">{{userInfoModel.Nick}}</label>
        <img
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>  
    </div>
    <div class="line">
      <a href="/pages/account/setting/role/main">
        <label class="l-lab">我的等级</label>
        <label class="r-lab">V{{userInfoModel.LevelNum}}会员</label>
        <img
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>
    </div>
    <div class="line">
      <a @click="_showBottomFlip">
        <label class="l-lab">性别</label>
        <label class="r-lab">{{userInfoModel.Sex}}</label>
        <img 
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>
    </div>
    <div class="line">
      <a>
        <label class="l-lab">出生日期</label>
        <div class="r-lab">
          <picker mode="date" :value="userInfoModel.Birthday" :start="startDate" :end="endDate" @change="_dateChange">
            <div class="picker-Msg">{{ userInfoModel.Birthday }}</div>
          </picker>
        </div>
        <img 
          class="go-right-icon"
          src="/static/images/icon_right_grey.png"
        />
      </a>
    </div>
  </section>
  <bottomFlip :isShow.sync="isShow">
    <div class="sex-box">
      <div @click="_setUserSex(1)" :class="'sex-line ' + (tempSex == 1 ? 'active' : '')">男</div>
      <div @click="_setUserSex(0)" :class="'sex-line ' + (tempSex == 0 ? 'active' : '')">女</div>
      <div class="sex-line c-888" @click="_hideBottomFlip">取消</div>
    </div>
  </bottomFlip>
  </article>
</template>

<script>
import api from '@/api/user'
import bottomFlip from "@/components/bottomFlip"
import config from "@/utils/config"

export default {
  data(){
    return{
      userInfoModel: {
        HeadUrl: "",
        UserName: "",
        Nick: "",
        GradeName: "",
        Sex: "",
        Birthday: ""
      },
      startDate:"",
      endDate: "",
      userBirthday: "",
      isShow: false,
      tempSex: -1
    }
  },
  onLoad(){
    this._initDate();
    this._getPersonnelProfile();
  },
  components: {
    bottomFlip
  },
  methods:{
    _initDate(){
      const date = new Date();
      let year = date.getFullYear();
      this.startDate = (year-90)+"-01-01";
      this.endDate = year + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      // console.log(this.startDate, this.endDate);
    },
    _setHeadPortrait(){
      api.setHeadPortrait().then(({Data}) => {
        this.userInfoModel.HeadUrl = Data;
      })
    },
    _dateChange(e){
      let value = e.mp.detail.value;
      this.userInfoModel.Birthday = value;

      api.setBirthday(value).then(({State})=>{
        console.log("生日修改成功。");
        wx.showToast({
          title: "修改成功！",
          mask: true
        });
      })
    },
    _getPersonnelProfile(){
      api.getPersonnelProfile().then(({Data})=>{
        console.log(Data);
        // Data.Birthday = "2019-10-10T11"
        let birthday = "";
        if(Data.Birthday != null && Data.Birthday != ''){
          let tempArr = Data.Birthday.match(/(\S*)T/);
          if(tempArr != null && tempArr.length > 0){
            birthday = tempArr[1]
          }
        }

        this.userInfoModel = {
          HeadUrl: Data.HeadUrl,
          UserName: Data.UserName,
          Nick: Data.Nick,
          LevelNum: Data.RoleId,
          GradeName: Data.GradeName,
          Sex: Data.Sex,
          Birthday: birthday //Data.Birthday.match(/(\S*)T/)[1]
        };
      });
    },
    //显示底部弹窗
    _showBottomFlip(){
      this.tempSex = this.userInfoModel.Sex == "男" ? 1: (this.userInfoModel.Sex == "女" ? 0 : -1);
      this.isShow = true;
    },
    _hideBottomFlip(){
      this.isShow = false;
    },
    //切换选中的性别
    _switchActive(i){
      this.tempSex = i;
    },
    //设置用户性别
    _setUserSex(i){
      this.tempSex = i;
      // if(this.tempSex != 1 && this.tempSex != 0){
      //   wx.showToast({
      //     title: "请选择性别！"
      //   });
      //   return;
      // }

      api.setUserSex(this.tempSex).then(({})=>{
        wx.showToast({
          title: "修改性别成功！",
          mask: true
        });
        this.userInfoModel.Sex = this.tempSex == 1 ? "男" : "女";
        this.isShow = false;
        this.tempSex = -1;
      });
    }
  }
}
</script>

<style lang="less">
.contain{
  background: #F2F2F2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  padding: 0 10px;
}
.user-box{
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  .head{
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 25px;
  }
  .line{
    border-bottom: 1px solid #dcdcdc!important;
    font-size: 14px;
    a{
      display: flex;
      height: 50px;
      align-items: center;
      .l-lab{
          flex: 1;
          padding-left: 10px;
          color: #363636;
          font-size: 14px;
      }
      .r-lab{
          flex: 2;
          padding-right: 25px;
          text-align: right;
          color:#9D9D9D;
          font-size: 12px;
      }
    }
    a.h-90{
      height: 90px;
    }
    &:last-child{
      border: 0 !important;
    }
  }
  .go-right-icon {
    position: absolute;
    right: 21px;
    display: inline-block;
    height:14px;
    width: 8px;
  }
  .picker-Msg{
    line-height: 50px;
    height: 50px;
  }
}
.sex-line{
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #dcdcdc;
  text-align: center;
  font-size: 15px;
  color: #0075FF;
  background: #fff;
   &:nth-child(1){
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:nth-child(2){
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  // margin: 0 10px;
}
// .active{
//   background-color: #e8e6e6;
// }
.c-888{
  border-radius: 10px;
  margin-top: 10px;
  background: #fff;
}
.sex-box{
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
}

</style>