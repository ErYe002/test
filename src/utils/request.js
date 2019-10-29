import config from './config.js';

const request = (url, method, data, header, showLoading = true, isNeedErrorTips = true) => {
  console.log('当前请求连接：', url);
  return new Promise((resolve, reject) => {
    if(showLoading){
      wx.showLoading();
    } else {
      wx.showNavigationBarLoading();
    }
    let requestUrl = config.apiurl + '/api/' + url;
    wx.request({
      url: requestUrl,
      data,
      method,
      header: {
        SalePlatformId: config.salePlatformId,
        token: wx.getStorageSync('TOKEN'),
        ...header
      },
      success(result) {
        if(showLoading){
          wx.hideLoading(); 
        }
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        //token失效
        if (result.statusCode == '401') {
          return resolve({ State: false, Msg: 'token已失效' });
        }
        const data = result.data;
        //后台返回一般格式示例：{ "State": true, "Msg": "", "Data": 4 }
        if (data['State']) {
          resolve(data);
        } else {
          if(isNeedErrorTips){
            wx.showToast({
              title: data['Msg'] || '请求异常，请稍后再试',
              icon: 'none'
            });
          }
          reject(data['Msg']);
        }
      },
      fail() {
        if(showLoading){
          wx.hideLoading(); 
        }
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        if(isNeedErrorTips){
          wx.showToast({
            title: '请求异常，请稍后再试',
            icon: 'none',
            duration: 3000
          }); 
        }
        reject('请求异常，请稍后再试');
      }
    });
  });
};

const http = {
  /**
   * http post请求
   */
  post(url = '', data = null, header = {}) {
    return request(url, 'post', data, header);
  },
  /**
   * http post请求：不展示加载框
   */
  postByNoLoading(url = '', data = null, header = {}) {
    return request(url, 'post', data, header, false);
  },
  /**
   * http post请求：请求出错时不弹窗提示错误信息，让外层处理
   */
  postByNoErrorTips(url = '', data = null, header = {}) {
    return request(url, 'post', data, header, true, false);
  },
  /**
   * http get请求
   */
  get(url = '', data = null) {
    return request(url, 'get', data, {});
  }
};

export default http
