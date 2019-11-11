<template>
  <article></article>
</template>

<script>
import api from '@/api/order'

export default {
  data(){
    return {

    }
  },
  onLoad(options){
    api.logisticsQuery('a9442a47-782b-49dc-adb0-0e7780476d70')
  }
}
</script>

<style>

</style>