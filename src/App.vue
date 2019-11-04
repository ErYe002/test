<script>
import api from '@/api/user'
import {mapActions} from 'vuex';

export default {
  async created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    
    //检验当前token是否过期，如果过期则清除
    let flag = await this._checkToken()
    if(!flag){
      this.removeToken()
    } else {
      this.setTokenByStorage()
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        this._getWXinfo(res.code)
      }
    })

    //储存当前机型信息到本地
    // const sysInfo = wx.getSystemInfoSync()
    // wx.setStorageSync('sysInfo', sysInfo)
  },
  methods: {
    ...mapActions('user', [
        'setTokenByStorage', 'removeToken'
    ]),
    ...mapActions('wxinfo', [
        'setWXinfo'
    ]),
    _checkToken(){
      return new Promise((resolve, reject) => {
        api.checkToken().then(({State}) => {
          resolve(State)
        }).catch(() => {
          reject()
        })
      })
    },
    _getWXinfo(code){
      api.getAppMainInfo(code).then((Data) => {
        this.setWXinfo(Data)
      })
    }
  }
}
</script>

<style lang="less">
//生成按钮类型
.generate_btn_type(@bgColor: #cab894, @bdColor: #cab894, @color: #fff) {
  background: @bgColor;
  border:.5px solid @bdColor;
  color: @color;
}

//生成按钮大小样式
.generate_btn_size(@height: 36px, @lineHeight: 36px, @fontSize: 14px) {
  height: @height;
    line-height: @lineHeight;
    font-size: @fontSize;
}

.kd-btn {
  border-radius: 0;
  width: 100%;
  position: initial;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  .generate_btn_type();
  .generate_btn_size();
  &.btn-black {
    .generate_btn_type(#000000, #000000);
  }
  &.btn-default{
    .generate_btn_type(#fff, #ccc, #888);
  }
  &.btn-small {
    .generate_btn_size(30px, 30px, 13px);
  }
  &.btn-big {
    .generate_btn_size(55px, 55px, 16px);
  }
  &.btn-lg{
    .generate_btn_size(49px, 49px, 15px);
  }
}

button::after {
  border: none;
  border-radius: 0;
  position: absolute;
  width: 0;
  height: 0;
}
</style>
