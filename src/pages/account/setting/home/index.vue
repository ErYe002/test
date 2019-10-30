<template>
  <article>
    <section class="user-box">
      <img
        class="head"
        :src="userInfoModel.HeadUrl || '/static/images/default_img.gif'"
      />
      <div class="info-box">
        <p class="nick">
            {{userInfoModel.Nick}}
            <img
              class="sex" 
              :src="userInfoModel.sex=='男'?'/static/images/man-icon.png':'/static/images/woman-icon.png'"
            />
        </p>
        <p class="name">
          
        </p>
      </div>
      <img
        class="go-right-icon"
        src="/static/images/icon_jt_rt.png"
      />
    </section>
    <section class="setting">
        <p class="line">
            <a>
                地址管理
                <img
                    class="go-right-icon"
                    src="/static/images/icon_jt_rt.png"
                />
            </a>
        </p>
        <p class="line">
            <a
              href="/pages/account/setting/role/main"
            >
              会员等级
              <span class="tips">多重福利优惠</span>
              <img
                class="go-right-icon"
                src="/static/images/icon_jt_rt.png"
              />
            </a>
        </p>
    </section>
    <section class="logout">
        <a
          href="/pages/index/main"
          open-type="switchTab"
        >
          退出登录
        </a>
    </section>
  </article>
</template>

<script>
export default {
    data(){
        return {
            userInfoModel:{
                userName:"kaikai666",
                Nick: "凯凯",
                levelNum: 6,
                sex: "男"
            }
        }
    }
}
</script>

<style lang="less">
.user-box {
  display: flex;
  align-items: center;
  height: 100px;
  font-size: 12px;
  border-bottom: 15rpx solid #e5e5e5!important;
  .head {
    display: block;
    width: 64px;
    height: 64px;
    margin-left: 30px;
    border-radius: 50%;
  }
  .info-box {
    margin-left: 10px;
    .sex {
      display: inline-block;
      width: 14px;
      height: 14px;
    }
    .name {
      height: 14.5px;
      margin-top: 5px;
      width: 55px;
    }
  }
}
.setting{
  font-size: 14px;
  border-bottom: 15rpx solid #e5e5e5!important;
  .line{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 2rpx solid #e5e5e5!important;
    .tips {
        display:inline-block;
        width: 100px;
        height: 50px;
        position: absolute;
        right: 30px;
        color: #888888;
        text-align: right;
    }
  }
}
.logout{
    border-bottom: 2rpx solid #e5e5e5!important;
    a {
        display: block;
        line-height: 50px;
        text-align: center;
    }
}
.go-right-icon {
      position: absolute;
      right: 11px;
      display: inline-block;
      height:14px;
      width: 8px;
      margin-top: 18px;
  }
</style>