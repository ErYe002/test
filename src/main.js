import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

//mpvue必须用此方法注入store，否则mapState、mapActions、mapMutations方法无法使用
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
