import Vue from 'vue'
import App from './App'
import store from './store'

let MIXIN = {
  onUnload(){
    console.log('mixin onUnload触发')
    if(this.$options.data){
      console.log('进行data数据重置', this.$data, this.$options.data())
      Object.assign(this.$data, this.$options.data())
      console.log('data数据重置完成', this.$data)
    }
  },
}

Vue.mixin(MIXIN)

Vue.config.productionTip = false
App.mpType = 'app'

//mpvue必须用此方法注入store，否则mapState、mapActions、mapMutations方法无法使用
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
