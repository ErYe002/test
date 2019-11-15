import Vue from 'vue';
import App from './App';
import store from './store';

let MIXIN = {
  onUnload() {
    console.log('mixin onUnload触发');
    if (this.$options.data) {
      console.log('进行data数据重置', this.$data, this.$options.data());
      Object.assign(this.$data, this.$options.data());
      console.log('data数据重置完成', this.$data);
    }
  },
  methods: {
    $navigateTo(link) {
      if (!link) return;
      // console.log('link', link);
      let doDirect = (path)=>{
        if (/^\/[a-zA-Z]*[0-9]*.(html)/.test(path)) {
          let seocode = path.substring(1, path.indexOf('.'));
          console.log('seocode', seocode);
          if (/^[a-zA-Z]+[0-9]+$/.test(seocode)) {
            console.log('商详');
            let isComp = false
            //path中是否带参，带参需取出
            if(path.toLocaleLowerCase().indexOf('iscomp') != -1){
              var search = link.split('?')[1]
              var search2 = search.split('&')
              search2.forEach(ele => {
                  if(ele.toLocaleLowerCase().indexOf('iscomp=') != -1){
                    isComp = ele.split('=')[1]
                  }
              })
            }
            console.log('isComp', isComp)
            wx.navigateTo({
              url:
                '/pages/product/index/main?seocode=' + seocode + '&isComp='+isComp
            });
          } else {
            // console.log('筛选结果');
            wx.navigateTo({
              url:
                '/pages/search/screen/main?from=m&className=&classId=&seoCode=' +
                seocode
            });
          }
        } else {
          // console.log('其他路径');
          //除活动页外，其余M站的页面都不能进行跳转
          if (
            path.indexOf('/event/') != -1 ||
            path.indexOf('/templateforapp/') != -1 ||
            path.indexOf('/templatefornojs/') != -1 ||
            path.indexOf('/templatefornewapp/') != -1
          ) {
            console.log('此路径可以进行跳转', path);
            //跳转还需把/event/替换为/templatefornewapp/
            path = path.replace(/^\/event\//, '/templatefornewapp/');
            wx.navigateTo({ url: '/pages/htmlPreview/main?path=' + path });
          } else {
            console.log('此路径禁止跳转', path);
          }
        }
      }
      //如果是完整url，抓取页面路径
      if (/^http/.test(link)) {
        let path = link
          .toLocaleLowerCase()
          .replace(
            /^(http)[s]?:\/\/(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):\d{2,4})|(m.kede.com|m.keede.com))/,
            ''
          );
        // console.log('path', path);
        doDirect(path)
      } else {
        doDirect(link)
      }
    }
  }
};

Vue.mixin(MIXIN);

Vue.config.productionTip = false;
App.mpType = 'app';

//mpvue必须用此方法注入store，否则mapState、mapActions、mapMutations方法无法使用
Vue.prototype.$store = store;

const app = new Vue(App);
app.$mount();
