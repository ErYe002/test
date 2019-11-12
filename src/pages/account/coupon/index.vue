<template>
  <article class="wrap">
    <section class="type-box">
      <ul class="type-list">
        <li
          :class="{'t-item':true, 'current': listQuery.queryState == 3}"
          @click="changeStateEvent(3)"
        >未使用</li>
        <li
          :class="{'t-item':true, 'current': listQuery.queryState == 2}"
          @click="changeStateEvent(2)"
        >已使用</li>
        <li
          :class="{'t-item':true, 'current': listQuery.queryState == 1}"
          @click="changeStateEvent(1)"
        >已过期</li>
      </ul>
    </section>
    <section class="coupon-box">
      <ul class="list" v-if="list.length > 0">
        <li :class="{item: true, 'pass': listQuery.queryState != 3}" v-for="(item, idx) in list" :key="item.PromotionID">
          <div class="t-box">
            <div class="price">
              <p class="p">
                ¥
                <b>{{item.Value}}</b>
              </p>
              <span>{{item.SatisfactionAmountContent}}</span>
            </div>
            <div class="info">
              <h3 class="title">{{item.Title}}</h3>
              <p class="time">开始时间：{{item.UseStartTime}}</p>
              <p class="time">结束时间：{{item.UseEndTime}}</p>
            </div>
            <div class="btn">
              <a class="kd-btn btn-small" v-if="listQuery.queryState == 3" :href="'/pages/search/pieceTogether/main?shopId='+item.ShopId+'&promotionId='+item.PromotionID+'&title=' + item.promotionTitle">去使用</a>
              <img src="/static/images/icon_used.png" class="icon" v-if="listQuery.queryState == 2"/>
              <img src="/static/images/icon_expire.png" class="icon" v-if="listQuery.queryState == 1"/>
            </div>
          </div>
          <p class="line"></p>
          <div class="b-box">
            <div :class="{title: true, bd: item.isShowDesc}">
              <span class="text">{{item.UseDescription}}</span>
              <span class="icon">
                <img src="/static/images/ic_arrow_gray_down.png" v-if="!item.isShowDesc" @click="changeDescShowEvent(idx)"/>
                <img src="/static/images/ic_arrow_gray_up.png" v-else @click="changeDescShowEvent(idx)"/>
              </span>
            </div>
            <div class="content" v-if="item.isShowDesc">{{item.OrderDescription}}</div>
          </div>
        </li>
      </ul>
      <img
        class="loading"
        v-if="listQuery.page == 1 && isLoading"
        src="/static/images/mu_loading.gif"
      />
      <p class="no-data-box" v-else-if="isNoData">抱歉，没有此类优惠券哦~</p>
      <p class="no-more-tips" v-if="listQuery.page == totalPage">没有更多了哟~</p>
    </section>
  </article>
</template>

<script>
import api from "@/api/user";
import tools from '@/utils'

export default {
  data() {
    return {
      isNoData: false,
      isLoading: false,
      totalPage: 0,
      listQuery: {
        page: 1,
        queryState: 3
      },
      list: []
    };
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.listQuery.page < this.totalPage) {
      this.listQuery.page++;
      this._getListData();
    }
  },
  onLoad() {
    this._getListData();
  },
  methods: {
    changeDescShowEvent(idx){
      this.list = this.list.map((ele, index) => {
        if(index == idx){
          ele.isShowDesc = !ele.isShowDesc
        }
        return ele
      })
    },
    changeStateEvent(state){
      this.listQuery.page = 1
      this.listQuery.queryState = state
      this.totalPage = 0
      this.list = []
      this.isNoData = false
      this._getListData()
    },
    _getListData() {
      if (!this.isLoading) {
        this.isLoading = true;
        api
          .getCouponsByState(this.listQuery.queryState, this.listQuery.page)
          .then(({ Data, TotalPage }) => {

            let list = Data.map(ele => {
              ele.isShowDesc = false
              ele.promotionTitle = ele.SatisfactionAmountContent.replace(/元可用/g, '') + '-' + ele.Value
              ele.UseStartTime = tools.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseStartTime))
              ele.UseEndTime = tools.formatDate('yyyy/MM/dd hh:mm', new Date(ele.UseEndTime))
              return ele
            })

            this.list = this.listQuery.page > 1 ? this.list.concat(list) : list;
            this.totalPage = TotalPage;
            //没有搜索到任何数据
            if (!Data || Data.length <= 0) {
              this.isNoData = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-height: 100vh;
  background: rgb(243, 243, 243);
  padding-top: 42px;
  box-sizing: border-box;
}

.type-box {
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  .type-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .t-item {
      padding: 10px 0;
      color: #888;
      box-sizing: border-box;
      &.current {
        font-weight: bold;
        color: #cab894;
        border-bottom: 2px solid #cab894;
      }
    }
  }
}

.coupon-box {
  margin-top: 15px;
  .list {
    padding: 0 12px;
    overflow: hidden;
    .item {
      background: #fff;
      border-radius: 5px;
      margin-bottom: 15px;
      .t-box {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        .price {
          font-size: 10px;
          color: #666;
          border-right: 0.5px dotted #e3e3e3;
          padding-right: 10px;
          .p {
            display: flex;
            align-items: flex-end;
            color: red;
            margin-bottom: 5px;
            font-weight: bold;
            b {
              font-size: 24px;
              margin: -5px 0;
            }
          }
        }
        .info {
          flex: 1;
          padding-left: 10px;
          .title {
            font-size: 14px;
            color: #333;
            font-weight: bold;
          }
          .time {
            font-size: 10px;
            color: #666;
            &:first-child {
              margin-top: 5px;
            }
          }
        }
        .btn {
          .kd-btn {
            border-radius: 20px;
            height: 20px;
            line-height: 20px;
            padding: 0 7px;
            font-size: 12px;
          }
          .icon {
            display: block;
            width: 60px;
            height: 50px;
          }
        }
      }
      .line {
        height: 0.5px;
        border-top: 0.5px dashed #e3e3e3;
        width: 100%;
        position: relative;
        &::after,
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: -7px;
          width: 14px;
          height: 14px;
          background: rgb(243, 243, 243);
          border-radius: 50%;
        }
        &::before {
          left: -7px;
        }
        &::after {
          right: -7px;
        }
      }
      .b-box {
        .title {
          padding: 2.5px 10px;
          font-size: 13px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text{
             overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
          }
          .icon {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              display: block;
              width: 20px;
              height: 20px;
            }
          }
          &.bd {
            border-bottom: 0.5px dashed #e3e3e3;
          }
        }
        .content {
          padding: 7px 10px;
          color: #666;
          font-size: 12px;
          line-height: 18px;
        }
      }
      &.pass {
        .t-box {
          .price {
            .p {
              color: #333;
            }
          }
        }
      }
    }
  }
}

.no-more-tips,
.no-data-box {
  color: #666;
  font-size: 12px;
  text-align: center;
  margin: 20px 0;
}
.loading {
  margin: 20px auto;
  display: block;
  width: 20px;
  height: 20px;
}
</style>