<template>
  <article class="wrap">
    <section class="search-box">
      <a href="/pages/search/index/main" class="flex-wrap">
        <img src="/static/images/icon_search_black.png" class="icon" />
        <span class="text">"改变从选一副眼镜开始"</span>
      </a>
    </section>
    <section class="nav-box">
      <scroll-view class="nav-list" scroll-x enable-flex>
        <div
          :class="{'n-item': true, active: item.SeoCode == currentMenuCode}"
          v-for="item in menu"
          :key="item.Id"
          @click="changeIndexEvent(item.SeoCode)"
        >
          <navigator open-type="navigate" target="miniProgram" app-id="wx59914c27d9618111" version="release" @fail="openMiniFail" class="link" v-if="item.SeoCode == 'code350'">
            <b>{{item.ChName}}</b>
            <em>{{item.EnName}}</em>
          </navigator>
          <div class="link" v-else>
            <b>{{item.ChName}}</b>
            <em>{{item.EnName}}</em>
          </div>
        </div>
      </scroll-view>
    </section>
    <recommend v-if="currentMenuCode == 'code000'"/>
    <oversea v-if="currentMenuCode == 'code050'"/>
    <frames v-if="currentMenuCode == 'code200'"/>
  </article>
</template>

<script>
import recommend from "./components/recommend";
import oversea from "./components/oversea";
import frames from "./components/frames";
import api from "@/api";

export default {
  data() {
    return {
      menu: [],
      currentMenuCode: 'code-1'
    };
  },
  components: {
    recommend,
    oversea,
    frames
  },
  methods: {
    _getMenuData() {
      api.getHomeMenuData().then(({ Data }) => {
        let list = Data.filter((ele) => {
          return ele.SeoCode == 'code000' || ele.SeoCode == 'code350' || ele.SeoCode == 'code200' || ele.SeoCode == 'code050'
        });
        list.push({
          Id: 0,
          ChName: "更多",
          EnName: "MORE",
          SeoCode: 'code-1'
        });
        this.menu = list;
        this.currentMenuCode = this.menu[0]["SeoCode"];
      });
    },
    changeIndexEvent(code){
      if(code != 'code-1' && code != 'code350'){
       this.currentMenuCode = code
      }
    },
    openMiniFail(e){
      console.log('失败', e)
    }
  },

  created() {
    this._getMenuData();
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
    justify-content: space-around;
    .n-item {
      // flex: 1;
      .link{
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
      }
      &.active {
        .link{
          b {
          font-weight: bold;
            font-size: 23px;
          }
          em {
            display: none;
          }
        }
      }
    }
  }
}
</style>
