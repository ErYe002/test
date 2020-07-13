<template>
    <article class="contain">
        <section class="user-box">
          <img class="bg" src="/static/images/level_bg.png" model="aspectFit" />
          <div class="user-top-box">
            <img
              class="head"
              :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'"
            />
            <div class="info-box">
              <p class="name">{{userInfoModel.Nick}}</p>
              <p class="level">
                <img
                    class="icon"
                    :src="'/static/images/level_0' + userInfoModel.LevelNum + '.jpg'"
                />
                <span class="text">会员</span>
              </p>
            </div>
          </div>
          <div class="role-level-box">
            <p class="icon-level">
              <img
                src="/static/images/level_01.jpg"
              />
              <img
                src="/static/images/level_02.jpg"
              />
              <img
                src="/static/images/level_03.jpg"
              />
              <img
                src="/static/images/level_04.jpg"
              />
              <img
                src="/static/images/level_05.jpg"
              />
              <img
                src="/static/images/level_06.jpg"
              />
            </p>
            <div class="lines">
              <p class="bg-circle">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </p>
              <p class="bg-line"></p>
            </div>
            <div class="level-name">
              <label>V1会员</label>
              <label>V2会员</label>
              <label>V3会员</label>
              <label>V4会员</label>
              <label>V5会员</label>
              <label>V6会员</label>
            </div>
            <p class="experience">经验值：{{userInfoModel.EmpiricalValueMemo}}</p>
          </div>
        </section>
        <section class="level-list-box">
          <div class="head">
            <span>会员等级</span>
            <span>经验值</span>
            <span>享受待遇</span>
         </div>
         <div class="line" v-for="(item,i) in roleList" :key="i+1">
            <span>
              <label class="level">
                <img
                  class="icon"
                  :src="'/static/images/level_0'+(i+1)+'.jpg'"
                />
                <label class="text">会员</label>
              </label>
              
            </span>
            <span>{{item.AttainScore}}积分</span>
            <span>
              可得价
              <label class="DiscountRate" v-if="item.DiscountRate>0&&item.DiscountRate<1"> {{item.DiscountRate*100}} 折</label>
            </span>
         </div>
          <div class="area c-888">
            <p>注：</p>
            <p>1.个别活动及商品团购不再享受以上折扣，不同会员等级优惠幅度及售价以产品页面及购物车显示价格为准。</p>
            <p>2.V6会员优惠不与其他形式的返利返现优惠同享。</p>
          </div>
        </section>
        <section class="text-box">
          <div class="area">
            <p>晋级说明</p>
            <p>随着您购买商品金额的累加，您账户的等级积分将对应增加，一旦符合晋级条件，系统将自动升级您的会员级别。</p>
          </div>
        </section>
        <section class="text-box">
          <div class="area">
            <p>等级积分如何获得</p>
            <p>1.新注册会员即得100等级积分。</p>
            <p>2.成功购买商品，将获得与商品价格相应数量的等级积分；如购买产品价格145，将获得145积分。</p>
            <p>3.每日连续在个人中心签到赠送</p>
            <p>4.晒单好评奖励积分</p>
            <p>5.参与毒物社区点赞、评论等互动获得积分</p>
            <p>6.活动赠送积分</p>
          </div>
        </section>
    </article>
</template>

<script>
import api from "@/api/user"

export default {
  data(){
    return{
      userInfoModel:{
        GradeName: "",
        HeadUrl: "",
        Nick: "",
        LevelNum: 1,
        EmpiricalValueMemo:""
      },
      roleList: [
        // {
        //   AttainScore:100,
        //   DiscountRate: 1
        // },
        // {
        //   AttainScore:101,
        //   DiscountRate: 1
        // },
        // {
        //   AttainScore:300,
        //   DiscountRate: 0.98
        // },
        // {
        //   AttainScore:1500,
        //   DiscountRate: 0.97
        // },
        // {
        //   AttainScore:2500,
        //   DiscountRate: 0.96
        // },
        // {
        //   AttainScore:3500,
        //   DiscountRate: 0.95
        // }
      ]
    }
  },
  onLoad(){
    this._getRoleOfPersonnel();
  },
  methods:{
    _getRoleOfPersonnel: function(){
      api.getRoleOfPersonnel().then(({Data}) => {
        console.log(JSON.stringify(Data));
        this.userInfoModel = {
          GradeName: Data.CurrentUserRoleName,
          HeadUrl: Data.HeadUrl,
          Nick: Data.Nick,
          LevelNum: Data.RoleId,
          EmpiricalValueMemo: Data.EmpiricalValueMemo
        };
        this.roleList = Data.RoleList.map((item) => {
          return {
            AttainScore: item.AttainScore, 
            DiscountRate: item.DiscountRate
          };
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.contain{
  background: #F2F2F2;
  padding-bottom: 10px;
}
.user-box{
  height: 250px;
  position: relative;
  .bg{
      display: block;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 0;
  }
  .user-top-box{
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 20rpx;
    left: 0rpx;
    background: transparent;
    .head {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .info-box {
      margin-left: 10px;
      font-size: 12px;
      .name{
        font-size: 15px;
        color: white;
        margin-top: 10px;
      }
      .level{
        margin-top: 8px;
      }
    }
  }
  .role-level-box{
    background: transparent;
    position: absolute;
    top: 90px;
    display: block;
    width: 100%;
    .icon-level{
      display: flex;
      justify-content: space-between;
      padding-left: 5%;
      padding-right: 5%;
      img {
        width: 18px;
        height: 18px;
        display: inline-block;
      }
    }
    .lines{
      position: relative;
      top: 0px;
      left: 0px;
      .bg-line{
        background-color: #E2CB77;
        height: 4px;
        margin-top: -8px;
        width: 321px;
        margin-left: 31px;
      }
      .bg-circle{
        display: flex;
        justify-content: space-between;
        padding-left: 6%;
        padding-right: 6%;
        margin-top: 8px;
        i {
          width: 10px;
          height: 10px;
          border-radius: 100%;
          display: inline-block;
          background-color: #E2CB77;
          box-shadow: 0 0 0 6px #e2cb774d;
        }
      }
    }
    .level-name{
      display: flex;
      justify-content: space-between;
      padding-left: 3%;
      padding-right: 3%;
      line-height: 16px;
      margin-top: 16px;
      color:#E2CB77;
      font-size: 14px;
    }
    .experience{
      text-align: center;
      color:white;
      margin-top: 20px;
      font-size: 12px;
    }
  }
}

.level-list-box{
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 10px;
  background: #fff;
  border-radius: 10px;
  .head{
    line-height: 60px;
    height: 60px;
    border: 1px solid #cccccc;
    display: flex;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .line{
    border-left: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    display: flex;
    overflow: hidden;
    line-height: 60px;
    height: 60px;
    color:#888888;
    .DiscountRate{
      color: #FF435E;
    }
    &:nth-last-child(2){
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  span{
      width: 33.33%;
      font-size: 14px;
      text-align: center;
      display: inline-block;
  }
  .area{
    font-size: 11px;
    color: #676666;
    background: #fff;
    p{
      line-height: 18px;
    }
  }
}

.text-box{
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 10px;
  margin-top: 10px;
  font-size: 12px;
  background: #fff;
  border-radius: 10px;
  .c-888{
    color:#888888;
  }
  .area{
    margin-bottom: 10px;
    p{
      line-height: 18px;
      &:first-child{
        font-size: 14px;
        color: #000;
        font-weight: bold
      }
    }
  }
}
.level {
  display: inline-flex;
  background: #000;
  color: #fff;
  height: 14.5px;
  line-height: 14.5px;
  width: 55px;
  vertical-align: middle;
  .icon {
    display: block;
    width: 14.5px;
    height: 14.5px;
  }
  .text {
    flex: 1;
    text-align: center;
    font-size:12px;
    }
  }
</style>