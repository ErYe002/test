<template>
  <article>
    <section class="info-box">
      <p class="title">快递单号：{{model.ExpressNo}}</p>
      <p class="company">配送公司：{{model.ExpressName}}</p>
    </section>
    <section class="timeline-box">
      <time-line :list="model.Routes"/>
  </section>
  </article>
</template>

<script>
import timeLine from './timeLine'
export default {
  components:{
    timeLine
  },
  props:{
    model:{
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  font-size: 14px;
  padding: 4px 14px 14px;
  // color: #888;
  border-bottom: solid 10px #eee;
  .title,
  .company {
    margin-top: 10px;
  }
}

.timeline-box{
  padding: 20px 28px 28px;
}
</style>