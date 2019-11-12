<template>
  <article>
    <self-support v-if="shopId == 1" :model="model"/>
    <overseas v-else :model="model"/>
  </article>
</template>

<script>
import api from '@/api/order'
import overseas from './components/overseas'
import selfSupport from './components/selfSupport'

export default {
  data(){
    return {
      shopId: 1,
      model: null,
      orderId: ''
    }
  },
  components:{
    selfSupport,
    overseas
  },
  onLoad(options){
    if(options['shopId']){
      this.shopId = options['shopId']
    }
    if(options['orderId']){
      this.orderId = options['orderId']
    }
    this._getPageData()
  },
  methods:{
    _getPageData(){
      if(this.shopId == 1){
        api.logisticsQuery(this.orderId).then(({Data}) => {
          this.model = Data
        })
      } else {
        api.logisticsOverseaQuery(this.orderId).then(({Data}) => {
          this.model = Data
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>