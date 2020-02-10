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
      if(options['path'].indexOf('http') != -1){
        this.url = options['path']
      } else {
        this.url = 'https://m.kede.com/'+decodeURIComponent(options.path)
      }
    }
  },
  methods:{
    error(e){
      console.error('网页加载失败',e)
    },
    succ(e){
      console.log('网页加载成功',e)
    }
  },
  /**
   * 用户点击右上角分享
   */
    onShareAppMessage() {
      // return {
      //   title: '¥' +
      //     this.Data.GoodsBase.SellPrice +
      //     ' ' +
      //     this.Data.GoodsBase.GoodsName,
      //   imageUrl: this.Data.GoodsBase.MainImageUrl || ''
      // };
    },
};
</script>

<style>
</style>