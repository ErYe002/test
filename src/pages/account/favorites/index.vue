<template>
  <article class="wrap">
    <ul class="list" v-if="list.length > 0">
      <li
        class="item"
        v-for="item in list"
        :key="item.GoodsId"
      >
        <div class="info-box">
          <img class="g-img" :src="item.ImageUrl" />
          <div class="info">
            <div class="g-name">{{item.GoodsName}}</div>
            <div class="g-price">¥{{item.FavoritePrice}}</div>
          </div>
        </div>
        <div class="op-box">
          <img @click="del_img_click(item.GoodsId)" src="/static/images/account_favorite_delete.png" />
        </div>
      </li>
      <!-- <li class="item">
        <div class="info-box">
          <img
            class="g-img"
            src="https://pic.keede.com//Main/5ec960c0-047a-423d-8847-52f0abbc2fd8-350-350.jpg"
          />
          <div class="info">
            <div class="g-name">[安室奈美惠御用]ReVIA蕾美彩色日抛10片装ReVIA蕾美彩色日抛10片装</div>
            <div class="g-price">¥1000</div>
          </div>
        </div>
        <div class="op-box">
          <span>删除</span>
        </div>
      </li>-->
    </ul>
    <div class="favo_Clear" :if="list.length <= 0">
      <p>您还没有收藏任何商品!</p>
      <button href="">去查看商品</button>
    </div>
  </article>
</template>

<script>
import api from "@/api/user";

export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 10
    };
  },
  onLoad() {
    this._getPageData();
  },
  methods: {
    _getPageData() {
      api.getFavoriteList(this.page, this.size).then(({ Data }) => {
        this.list = Data;
      });
    },
    del_img_click(key){
      var current=this;
      wx.showModal({
        title: '提示',
        content: '确定要删除该收藏吗？',
        success (res) {
          if (res.confirm) {
            current.list.splice(key, 1);
            api.cancelFavoriteByGoodsId(key);
          } 
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 0.5px solid #e5e5e5;
    position: relative;
    display:flex;
    flex-direction:row;
    .info-box {
      display: flex;
      position: relative;
      padding: 10px;
      background: #fff;
      .g-img {
        display: block;
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .info {
        flex: 1;
        .g-name {
          font-size: 14px;
          font-weight: 300;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 36px;
        }
        .g-price {
          margin-top: 10px;
          font-size: 16px;
          color: #e31436;
        }
      }

      &.show-del {
        transform: translateX(-90px);
      }
    }
    .op-box {
      position: absolute;
      right: 0;
      bottom:0;
      font-size: 14px;
      height: 70px;
      width: 70px;
      display: flex;
      justify-content: center;
      &:active {
        background: lighten(#f00, 10%);
      }
      img{
        position:absolute;
        right:10px;
        bottom:10px;
        width:25px;
        height:25px;
      }
    }
  }
  
}
.favo_Clear{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  color:gray;
  margin:auto auto;
  margin-top:150px;
  button{
    width:130px;
    height:30px;
    line-height:30px;
    margin-top:15px;
    color:#cab894;
    border:1px solid #cab894;
    border-radius:20px;    
    background:none;
  }
}
</style>