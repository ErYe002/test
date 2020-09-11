import userApi from '@/api/user'
import store from '@/store'
let timerCount = 0    //请求接口登录失败次数，连续两次失败后不再请求

function doLogin(encryptedData, iv, callback) {
    console.log(store.state)
    let requestLogin = () => {
        userApi.appLogin(store.state.wxinfo.sessionKey, encryptedData, iv).then((res) => {
            if (!res.Data.IsBindMobile) {
                //绑定手机号
                wx.navigateTo({
                    url: '/pages/bindMobile/main?isNewUser=' + res.Data.IsNewUser + '&partnerId=' + res.Data.UnionId
                })
            } else {
                // wx.setStorageSync('TOKEN', res.Data.Token)  //保存token到本地
                store.dispatch('user/setToken', res.Data.Token)
                store.dispatch("user/setUserId",res.Data.UserId)
                store.dispatch("user/setFirstGift",res.Data.CanReceivedNewUserCoupons)//IsNewUser 新用户弹新人礼券对外子段firstgift
                wx.setStorageSync("newUserCoupon",true)
                if (typeof callback == 'function') {
                    callback()
                }
            }
        }).catch(e => {
            //重新登录
            if(e.indexOf('重新登录') != -1 && timerCount <= 2){
                timerCount++
                wxLogin()
            }
        })
    }
    let wxLogin = () => {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey
                userApi.getAppMainInfo(res.code).then(({ Data }) => {
                    store.dispatch('wxinfo/setWXinfo', {...Data})
                    requestLogin()
                })
            }
        })
    }
    wx.checkSession({
        success() {
            console.log('session_key未过期')
            requestLogin()
        },
        fail() { //session_key过期
            console.log('session_key已过期，正在重新登录')
            wxLogin()
        }
    })
}

export default {
    doLogin
  }