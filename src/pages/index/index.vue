<template>
  <article class="wrap">
    <section class="search-box">
      <div class="flex-wrap">
        <img src="/static/images/icon_search_black.png" class="icon" />
        <span class="text">"改变从选一副眼镜开始"</span>
      </div>
    </section>
    <section class="nav-box">
      <scroll-view class="nav-list" scroll-x enable-flex>
        <p class="n-item active">
          <b>推荐</b>
          <em>RECOMMEND</em>
        </p>
        <p class="n-item">
          <b>拼团</b>
          <em>COLLAGE</em>
        </p>
        <p class="n-item">
          <b>海淘</b>
          <em>OVERSEAS</em>
        </p>
        <p class="n-item">
          <b>框架</b>
          <em>FRAMES</em>
        </p>
        <p class="n-item">
          <b>更多</b>
          <em>MORE</em>
        </p>
      </scroll-view>
    </section>
    <recommend/>
  </article>
</template>

<script>
import recommend from './components/recommend'
import oversea from './components/oversea'
import frames from './components/frames'

export default {
  data() {
    return {};
  },
  components:{
    recommend,
    oversea,
    frames
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang="less">
.search-box {
  padding: 10px;
  .flex-wrap {
    display: flex;
    align-items: center;
    border: 0.5px solid #c7c7c7;
    border-radius: 20px;
    height: 21px;
    .icon {
      display: block;
      width: 14.5px;
      height: 14.5px;
      margin: 0 7.5px 0 5px;
    }
    .text {
      font-size: 12px;
      color: #9e9d9fff;
    }
  }
}

.nav-box {
  margin-bottom: 15px;
  .nav-list {
    display: flex;
    height: 35px;
    .n-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      b {
        font-size: 17px;
        color: #040000ff;
      }
      em {
        font-size: 8.5px;
        color: #595758ff;
        font-weight: 300;
      }
      &.active {
        b {
          font-weight: bold;
          font-size: 25px;
        }
        em {
          display: none;
        }
      }
    }
  }
}

</style>
