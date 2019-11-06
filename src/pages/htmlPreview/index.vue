<template>
  <web-view :src="url" @error="error" @load="succ"></web-view>
</template>

<script>

export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(options){
    if(options['path']){
      this.url = 'https://m.kede.com/'+decodeURIComponent(options.path)
    }
  },
  methods:{
    error(e){
      console.error('网页加载失败',e)
    },
    succ(e){
      console.log('网页加载成功',e)
    }
  }
};
</script>

<style>
</style>