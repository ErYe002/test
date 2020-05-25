import config from './config.js';

const request = (url, method, data, header, showLoading = true, isNeedErrorTips = true) => {
  console.log('当前请求连接：', url);
  return new Promise((resolve, reject) => {
    if(showLoading){
      if(url.indexOf('WechatSamllApplciationLogin') != -1){
        wx.showLoading({
          title: '正在登录'
        });
      } else {
        wx.showLoading();
      }
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
              icon: 'none',
              duration: 5000
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

const uploadFile = (url) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,                   //默认9张图
      sizeType: ["compressed"],   //可以指定原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"],      //可以指定来源是相册还是相机，默认二者都有
      success: function(result){
        //返回选定照片的本地文件路径列表，tempFilePaths可以作为img标签的src属性显示图片
        let filePaths = result.tempFilePaths;
        wx.showToast({
          icon: "loading",
          title: "正在上传中......"
        });
        wx.uploadFile({
          url: config.apiurl + "/api/" + url,
          filePath: filePaths[0],
          name: "file",
          header: {
            "Content-Type": "multipart/form-data",
            SalePlatformId: config.salePlatformId,
            token: wx.getStorageSync('TOKEN')
          },
          formData: {
            //和服务器约定的token，也可以放到header中。
          },
          success: function(result){
            console.log(result);
            //token失效
            if (result.statusCode == '401') {
              return resolve({ State: false, Msg: 'token已失效' });
            }
            if(result.statusCode != 200){
              wx.showModal({
                title: "提示",
                content: "上传失败！",
                showCancel: false
              });
              return;
            }
            //后台返回一般格式示例：{ "State": true, "Msg": "", "Data": 4 }
            const data = JSON.parse(result.data);
            if(data.State){
              data.Data = filePaths[0];
              resolve(data);
              return;
            }
            // console.log(data.State, data['State'], data);
            wx.showModal({
              title: "提示",
              content: data.Msg || "糟糕！API走丢了，容我找一会儿，请稍后再试！",
              showCancel: false
            });
          },
          fail: function(result){
            // console.log(result);
            wx.showModal({
              title: "提示",
              content: "上传失败！",
              showCancel: false
            });
          },
          complete: function(){
            wx.hideToast();
          }
        })
      }
    });
  })
}

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
  },
    /**
   * http get请求：不展示加载框
   */
  getByNoLoading(url = '', data = null, header = {}) {
    return request(url, 'get', data, header, false);
  },
  getByNoErrorTips(url = '', data = null, header = {}) {
    return request(url, 'get', data, header, true, false);
  },
  upload(url = ''){
    return uploadFile(url);
  }
};

export default http
