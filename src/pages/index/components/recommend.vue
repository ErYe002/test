<template>
  <article>
    <article class="first-floor-wrap">
      <section class="banner-box">
        <swiper class="swiper">
          <swiper-item>
            <img src="https://pic.keede.com/AppImages/69ae003a-4cc6-4b8d-be56-20971648134f.jpg" />
          </swiper-item>
          <swiper-item>
            <img src="https://pic.keede.com/AppImages/0c7539a3-95a0-4578-9f96-3a93e43c0280.jpg" />
          </swiper-item>
          <swiper-item>
            <img src="https://pic.keede.com/AppImages/ede96008-9cb6-4315-acab-0360c6ec2977.jpg" />
          </swiper-item>
          <swiper-item>
            <img src="https://pic.keede.com/AppImages/2d64f8a5-b6dd-4a11-b5a3-6cd848137939.jpg" />
          </swiper-item>
        </swiper>
        <ul class="pages">
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
      <section class="hot-box">
        <ul class="service-list">
          <li>全球精选</li>
          <li>品牌直供</li>
          <li>满80包邮</li>
          <li>7天退换</li>
        </ul>
      </section>
    </article>
    <article class="second-floor-wrap">
      <button class="group-link">
        <img src="/static/images/index_group_link_bg.jpg" />
      </button>
      <section class="grid-box">
        <img
          class="left-img"
          src="https://pic.keede.com/AppImages/fe315806-212d-42b5-87fe-09a7c5822f40.jpg"
        />
        <div class="right-box">
          <img
            class="img"
            src="https://pic.keede.com/AppImages/d5286cc0-46ca-4e42-919c-3eed2726e6e9.jpg"
          />
          <img
            class="img"
            src="https://pic.keede.com/AppImages/d5286cc0-46ca-4e42-919c-3eed2726e6e9.jpg"
          />
          <img
            class="img"
            src="https://pic.keede.com/AppImages/d5286cc0-46ca-4e42-919c-3eed2726e6e9.jpg"
          />
        </div>
      </section>
    </article>
  </article>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.first-floor-wrap {
  padding-bottom: 39.5px;
  .banner-box {
    margin-bottom: 12px;
    .swiper {
      height: 135px;
      img {
        display: block;
        width: 345px;
        height: 135px;
        border-radius: 15px;
        margin: 0 auto;
      }
    }
    .pages {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
      li {
        width: 7.5px;
        height: 3px;
        background: #f7e6c3;
        margin: 0 5px;
        border-radius: 5px;
        &.active {
          width: 36.5px;
          background: #3e3a39;
        }
      }
    }
  }
  .hot-box {
    .service-list {
      color: #cfbb98ff;
      font-size: 12.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        width: 21%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:before {
          content: "";
          display: block;
          width: 4.5px;
          height: 4.5px;
          border-radius: 50%;
          background: #cfbb98ff;
          margin-right: 3.5px;
        }
      }
    }
  }
}

.second-floor-wrap {
  background: #f5f5f5ff;
  position: relative;
  padding-top: 30.5px;
  .group-link {
    background: transparent;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: -29.5px;
    img {
      display: block;
      width: 354.5px;
      height: 59px;
    }
  }
  .grid-box {
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      border-radius: 6px;
    }
    .left-img {
      display: block;
      width: 194px;
      height: 266.5px;
    }
    .right-box {
      margin-left: 8px;
      .img {
        display: block;
        width: 153px;
        height: 84.5px;
        margin-bottom: 6.5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>