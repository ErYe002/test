// shopping/productInfo/sharePoster/sharePoster.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // goodsId: {
    //   type: String,
    //   value: ''
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // canvasW: 375,
    // canvasH: 530,
    isShow: false,
    canvasW: 318,
    canvasH: 450,
    isDrawSucc: false,
    nickName: '', //用户昵称
    groupMemberCount: 0,  //几人成团
    title: '',  //商品的价格+名称
    sellingPoint: '', //卖点
    salePrice: '0', //拼团价
    oldPrice: '0',  //原价
    productImg: '',  //商品的主图地址
    productImgH: 0,
    localProductImg: '',
    userHeadImg: '',  //分享用户的头像地址
    localUserHeadImg: '',
    qrcode: '',  //分享的连接生成的二维码地址
    localQrcode: ''//GroupGoods.GrouponStarTime
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      if (!this.data.isDrawSucc) {
        wx.showLoading()
        console.log('开始下载图片=======',this.data.productImg)
        this.downloadImage(this.data.productImg, (imgPath) => {
          this.setData({
            localProductImg: imgPath
          })
          this.downloadImage(this.data.userHeadImg, (imgPath1) => {
            this.setData({
              localUserHeadImg: imgPath1
              // localUserHeadImg: '/images/default_head.jpg'              
              // localUserHeadImg: this.data.userHeadImg          
            })
            this.downloadImage(this.data.qrcode, (imgPath2) => {
              this.setData({
                localQrcode: imgPath2,
              })
              this.createSharePoster()
            })
          })
        })
      } else {
        this.setData({
          isShow: true
        })
      }
    },
    touchHandler(){
      return
    },
    hide() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('hide')
    },
    createSharePoster() {
      let _this = this
      let ctx = wx.createCanvasContext('shareCanvas', _this)

      //图片背景色
      function drawBg() {
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, _this.data.canvasW, _this.data.canvasH)
        ctx.setFillStyle('#fff')
        ctx.fill()
        ctx.closePath()
        ctx.restore()
      }

      //商品主图
      function drawProductImg() {
        _this.setData({
          productImgH: _this.data.canvasW
        })
        ctx.drawImage(_this.data.localProductImg, 0, 0, _this.data.canvasW, _this.data.productImgH)
      }

      //几人团
      function drawGroupNumber() {
        //背景
        ctx.save()
        ctx.beginPath()
        ctx.rect(10, 5, 52, 20)
        ctx.setFillStyle('#C5B28D')
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        //字体
        ctx.setFontSize(16)
        ctx.setFillStyle("#fff")
        ctx.fillText(_this.data.groupMemberCount + '人团', 14, 21)
      }

      //分享用户
      function drawShareUser() {
        //头像
        ctx.save()
        let r = 13 //头像图片半径
        let x = 20
        let y = _this.data.productImgH + 10
        let d = 2 * r;
        let cx = x + r;
        let cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip()
        ctx.drawImage(_this.data.localUserHeadImg, x, y, d, d)
        ctx.restore()
        //昵称
        const nikeName = _this.data.nickName
        ctx.setFontSize(12)
        ctx.setFillStyle("#888")
        ctx.fillText(nikeName, d + x + 8, y + 18)
        ctx.setFontSize(13)
        ctx.fillText('推荐你看', d + x + ctx.measureText(nikeName)['width'] + 20, y + 18.5)
      }

      //商品信息
      function drawProductName() {
        let pd = 20
        //商品名
        ctx.setFontSize(12)
        ctx.setFillStyle("#000")
        let nameH = _drawText(ctx, _this.data.title, pd, _this.data.productImgH + 10 + 26 + 12 + 10, 180)
        //卖点
        ctx.setFontSize(12)
        ctx.setFillStyle("#D01818")
        let pointH = _drawText(ctx, _this.data.sellingPoint, pd, _this.data.productImgH + 10 + 26 + 12 + 10 + nameH + 2, 180)
        //价格：因为价格是变动的，且售价与原价一行排列，所以需要计算售价、原价等的宽度
        const unit = '￥'
        const price = _this.data.salePrice + '' //必须转成string，不然无法计算出文本宽度
        const oldPrice = '原价￥' + _this.data.oldPrice
        ctx.setFontSize(12)
        ctx.fillText(unit, pd, _this.data.productImgH + 10 + 26 + 12 + 10 + pointH + nameH + 10)
        const unitW = ctx.measureText(unit)['width']  //计算单位¥的宽度
        ctx.setFontSize(18)
        ctx.setFillStyle("#D01818")
        ctx.fillText(price, pd + unitW, _this.data.productImgH + 10 + 26 + 12 + 10 + pointH + nameH + 10)
        const priceW = ctx.measureText(price)['width']  //计算售价的宽度
        ctx.setFontSize(12)
        ctx.setFillStyle("#999")
        ctx.fillText(oldPrice, pd + unitW + priceW + 10, _this.data.productImgH + 10 + 26 + 12 + 10 + pointH + nameH + 10)
        const oldPriceW = ctx.measureText(oldPrice)['width']  //计算原价的宽度
        //绘制原价的划线
        ctx.beginPath()
        ctx.moveTo(pd + unitW + priceW + 10, _this.data.productImgH + 10 + 26 + 12 + 10 + pointH + nameH + 10 - 5)
        ctx.lineTo(pd + unitW + priceW + 10 + oldPriceW, _this.data.productImgH + 10 + 26 + 12 + 10 + pointH + nameH + 10 - 5)
        ctx.setStrokeStyle('#999')
        ctx.stroke()
      }

      function drawQrcode() {
        ctx.drawImage(_this.data.localQrcode, 20 + 180 + 13, _this.data.productImgH + 30, 95, 95)
      }

      //进行绘制
      function render() {
        drawBg()
        drawProductImg()
        // drawGroupNumber()
        drawShareUser()
        drawProductName()
        drawQrcode()
        ctx.draw()
        setTimeout(() => {
          // ctx.draw(true, function () {
          //   console.log('绘制完成')
          //   _this.setData({
          //     isDrawSucc: true,
          //     isShow: true
          //   })
          //   wx.hideLoading()
          // })
          _this.setData({
            isDrawSucc: true,
            isShow: true
          })
          wx.hideLoading()
        }, 0)
      }

      /**
       * 绘制多行文本
       * @param ctx  canvas对象
       * @param str 文本内容
       * @param leftWidth 文本绘制距离画布最左边距离
       * @param initHeight 文本绘制在画布中的初始高度
       * @param canvasWidth 文本绘制的最大宽度
       */
      function _drawText(ctx, str, leftWidth, initHeight, canvasWidth) {
        let lineWidth = 0;
        let lastSubStrIndex = 0; //每次开始截取的字符串的索引
        let lineHeight = 16
        for (let i = 0; i < str.length; i++) {
          lineWidth += ctx.measureText(str[i]).width;
          if (lineWidth > canvasWidth) {
            ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
            initHeight += 16; //14为字体的高度 2为距离底部的距离
            lineWidth = 0;
            lastSubStrIndex = i;
            lineHeight += 16
          }
          if (i == str.length - 1) { //绘制剩余部分
            ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
          }
        }
        // console.log(lineHeight)
        return lineHeight //返回文本高度
      }
      render()
    },
    downloadImage(imgUrl, fn) {
      console.log('图片地址=======',imgUrl)
      wx.downloadFile({
        url: imgUrl,
        success: function (sres) {
          console.log('下载图片成功tempFilePath:',sres.tempFilePath);
          //确保图片已下载到本地，再开始进行canvas操作
          if (sres.tempFilePath) {
            fn(sres.tempFilePath)
          }
        }, fail: function (fres) {
          console.log('下载图片失败=='+imgUrl)
        }
      })
    },
    /**
     * 保存到本地
     */
    save() {
      const _this = this
      if (_this.data.isDrawSucc) {
        //先将画布转成图片
        wx.showLoading({
          title: '保存中',
          mask: true
        })
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          quality: 1,
          // destWidth: 375,
          // destHeight: 530,
          success: function (result) {
            // 获得图片临时路径
            console.log(result.tempFilePath)
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      _this.savePhoto(result.tempFilePath)
                    },
                    fail(e) {
                      wx.hideLoading()
                      //authorize:fail auth deny  如果用户拒绝授权后，短期内调用不会出现弹窗，而是直接进入 fail 回调
                      console.log('authorize', e)
                      //弹出设置页面让用户手动开启相册权限
                      wx.showModal({
                        title: '提示',
                        content: '请在即将打开的设置页中，打开保存到相册的权限',
                        showCancel: false,
                        confirmColor: '#cab894',
                        success() {
                          wx.openSetting({
                            success(res) {
                              console.log(res.authSetting)
                              // res.authSetting = {
                              //   "scope.userInfo": true,
                              //   "scope.userLocation": true
                              // }
                            }
                          })
                        }
                      })
                    }
                  })
                } else {
                  _this.savePhoto(result.tempFilePath)
                }
              }
            })
          },
          fail: function (e) {
            console.log('canvasToTempFilePath', e)
            wx.hideLoading()
          }
        }, _this)
      }
    },
    savePhoto(src) {
      let _this = this
      wx.saveImageToPhotosAlbum({
        filePath: src,
        success() {
          wx.hideLoading()
          wx.showToast({
            title: '已保存',
            duration: 2000,
            mask: true
          })
          setTimeout(() => {
            _this.hide()
          }, 2000)
        },
        fail(e) {
          console.log(e)
          wx.hideLoading()
        }
      })
    },
    touchstart(e) {
      console.log(e)
    },
    canvasError(e) {
      console.log(e)
    }
  }
})
