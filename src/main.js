import Vue from "vue";
import App from "./App";
import store from "./store";
import cartApi from "./api/cart";

let MIXIN = {
  onUnload() {
    console.log("mixin onUnload触发");
    if (this.$options.data) {
      console.log("进行data数据重置", this.$data, this.$options.data());
      Object.assign(this.$data, this.$options.data());
      console.log("data数据重置完成", this.$data);
    }
  },
  methods: {
    //根据连接跳转到对应原生页面
    $navigateTo(link) {
      if (!link) return;
      console.log('link', link);
      let getQueryFromPath = (path, variable) => {
        if (path.toLocaleLowerCase().indexOf("?") != -1) {
          let query = path.split("?")[1];
          let vars = query.split("&");
          for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
              return pair[1];
            }
          }
          return false;
        } else {
          return false;
        }
      };
      let doDirect = path => {
        if (/^\/[a-zA-Z]*[0-9]*.(html)/.test(path)) {
          let seocode = path.substring(1, path.indexOf("."));
          console.log("跳转到商详页或筛选结果页：seocode", seocode);
          if (/^[a-zA-Z]+[0-9]+$/.test(seocode)) {
            console.log("跳转至商详");
            wx.navigateTo({
              url:
                "/pages/product/index/main?seocode=" + seocode
            });
          } else {
            console.log("跳转至筛选结果页");
            wx.navigateTo({
              url:
                "/pages/search/screen/main?from=m&className=&classId=&seoCode=" +
                seocode
            });
          }
        } else {
          // console.log('其他路径');
          //除活动页、搜索页外，其余M站的页面都不能进行跳转
          if (
            path.indexOf("/event/") != -1 ||
            path.indexOf("/templateforapp/") != -1 ||
            path.indexOf("/templatefornojs/") != -1 ||
            path.indexOf("/templatefornewapp/") != -1
          ) {
            console.log("跳转到活动页", path);
            //跳转还需把/event/替换为/templatefornewapp/，目的是为了去除网页顶部的返回栏
            path = path.replace(/^\/event\//, "/templatefornewapp/");
            wx.navigateTo({ url: "/pages/htmlPreview/main?path=" + path });
          } else if (path.indexOf("/search/searchlist") != -1) {
            console.log('跳转到搜索结果页')
            let keywords = getQueryFromPath(path, 'keyword')
            let shopid = getQueryFromPath(path, 'shopid') || 1
            if(keywords){
              wx.navigateTo({
                url:
                  "/pages/search/results/main?shopId="+shopid+"&keywords=" + keywords
              });
            }
          } else {
            console.log("此路径禁止跳转", path);
          }
        }
      };
      //如果是完整url，抓取页面路径
      if (/^http/.test(link)) {
        let path = link
          .toLocaleLowerCase()
          .replace(
            /^(http)[s]?:\/\/(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):\d{2,4})|(m.kede.com|m.keede.com))/,
            ""
          );
        // console.log('path', path);
        doDirect(path);
      } else {
        doDirect(link);
      }
    },
    //设置tabbar购物车栏展示的商品数量：当商品有变动需要调用此接口进行更新（商品加购、购物车内商品增删改、提交订单成功等）
    $getCartCount() {
      console.log("获取购物车总数量");
      cartApi.getCartCount().then(({ Data }) => {
        console.log("设置购物车总数量", Data);
        wx.setTabBarBadge({
          index: 2,
          text: Data.toString()
        });
      });
    }
  }
};

Vue.mixin(MIXIN);

Vue.config.productionTip = false;
App.mpType = "app";

//mpvue必须用此方法注入store，否则mapState、mapActions、mapMutations方法无法使用
Vue.prototype.$store = store;

const app = new Vue(App);
app.$mount();
