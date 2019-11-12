<template>
  <article>
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
    <div @click="_switchActive(1)" :class="'sex-line ' + (tempSex == 1 ? 'active' : '')">男</div>
    <div @click="_switchActive(0)" :class="'sex-line ' + (tempSex == 0 ? 'active' : '')">女</div>
    <div class="sex-line c-888" @click="_setUserSex">确定</div>
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
      this.endDate = year + "-" + date.getMonth() + "-" + date.getDate();
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
        this.userInfoModel = {
          HeadUrl: Data.HeadUrl,
          UserName: Data.UserName,
          Nick: Data.Nick,
          LevelNum: Data.RoleId,
          GradeName: Data.GradeName,
          Sex: Data.Sex,
          Birthday: Data.Birthday.match(/(\S*)T/)[1]
        };
      });
    },
    //显示底部弹窗
    _showBottomFlip(){
      this.tempSex = this.userInfoModel.Sex == "男" ? 1: (this.userInfoModel.Sex == "女" ? 0 : -1);
      this.isShow = true;
    },
    //切换选中的性别
    _switchActive(i){
      this.tempSex = i;
    },
    //设置用户性别
    _setUserSex(){
      if(this.tempSex != 1 && this.tempSex != 0){
        wx.showToast({
          title: "请选择性别！"
        });
        return;
      }

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
.user-box{
  border-bottom: 15rpx solid #eee!important;
  overflow: hidden;
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
      }
      .r-lab{
          flex: 2;
          padding-right: 25px;
          text-align: right;
          color:#888;
      }
    }
    a.h-90{
      height: 90px;
    }
  }
  .go-right-icon {
    position: absolute;
    right: 11px;
    display: inline-block;
    height:14px;
    width: 8px;
  }
  .picker-Msg{
    line-height: 50px;
  }
}
.sex-line{
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #dcdcdc;
  text-align: center;
  font-size: 15px;
}
.active{
  background-color: #e8e6e6;
}
.c-888{
  color: #888;
}

</style>