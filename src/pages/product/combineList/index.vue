<template>
  <div class="page">
    <div>
      <div class="combine_content" v-if="Data != null && Data.length > 0">
        <div class="ui_listview" v-for="item in Data" :key="item.index">
          <div class="uil_titlecon">
            <div class="ui_listtitle">
              <h3 class="title">
                套餐{{index+1}}
                <div class="to_title">
                  <p class="ui_text">
                    <b>￥{{item.Price}}</b>
                    <i>立省￥{{item.ReduceMoney}}</i>
                  </p>
                </div>
              </h3>
              <i class="icon_down" @click="showMore()">{{isshowMore?'﹀':'︿'}}</i>
            </div>
            <div class="ui_titlegoods" v-if="isshowMore">
              <ul v-if="item.Items != null && item.Items.length > 0">
                <li v-for="(goodslist,index_) in item.Items" :key="index_">
                  <img :src="goodslist.Img" />
                </li>
              </ul>
            </div>
          </div>
          <div
            class="ui_content combine_goodsitem"
            v-if="item.Items != null && item.Items.length > 0&&!isshowMore"
          >
            <a
              :href="'/pages/product/index/main?seocode='+goodslist.SeoCode+'&isComp=false'"
              class="cg_link"
              v-for="(goodslist,index_) in item.Items"
              :key="index_"
            >
              <div class="cgs_img">
                <img :src="goodslist.Img" />
              </div>
              <div class="cgs_info">
                <h3>
                  <i v-if="item.ShopId==2" class="outsourcing_label">海淘</i>
                  {{goodslist.GoodsName}}
                </h3>
                <p class="cgs_prs">￥{{goodslist.Price}}</p>
              </div>
              <div class="cgs_count">x {{goodslist.Quantity}}</div>
            </a>
            <div class="ui-btn">
              <a
                class="bnt_link btncard_icon"
                :href="'/pages/product/index/main?seocode='+item.SeoCode+'&isComp=true'"
              >加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/goods";

export default {
  data() {
    return {
      goodsId: "",
      Data: "",
      isshowMore:false
    };
  },
  onLoad(options) {
    this.goodsId = options.goodsid;
    this._getData();
  },
  methods: {
    _getData(goodsId) {
      var goodsId = this.goodsId;
      api.getCombineData(goodsId).then(({ Data }) => {
        this.Data = Data;
        console.log(Data);
      });
    },
    showMore(){
      this.isshowMore = !this.isshowMore;
    }
  }
};
</script>

<style lang="less" scoped>
.page{
    background: #f5f5f5;
  font-size: 12px;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
.combine_content {
  // background: #f5f5f5;
  // font-size: 12px;
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // height: 100%;
  // width: 100%;
  .ui_listview {
    background-color: #fff;;
    margin: 10px;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;
    .uil_titlecon {
      overflow: hidden;
      // border-bottom: dashed 1px #dcdcdc;
      padding-left: 1em;
      padding-right: 1em;
      .ui_listtitle {
        cursor: pointer;
        font-size: 0;
        line-height: 50px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          color: #000;
          display: inline-block;
          font-size: 16px;
          font-weight: normal;
          display: flex;
        }
        .to_title {
          padding-left: 2%;
          display: inline-block;
          .ui_text {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            ._b {
              font-size: 16px;
              font-weight: bold;
              color: #ff7c7c;
              margin-left: 2%;
            }
            ._i {
              border: 0.5px solid #7A7A7A;
              padding: 2px 6px;
              color: #7A7A7A;
              margin-left: 2%;
              font-size: 11px;
              white-space: nowrap;
              height: 17px;
              display: flex;
              align-items: center;
              border-radius: 8px;
            }
          }
        }
        .icon_down {
          transform: scale(1, 1.5);
          width:50px;
          height: 30px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .ui_content {
    padding: 0 10px;
    .cg_link {
      display: block;
      // border-bottom: solid 1px #dcdcdc;
      padding: 10px 0;
      position: relative;
      .cgs_img {
        display: table-cell;
        vertical-align: middle;
        border-radius: 5px;
        overflow: hidden;
        ._img {
          width: 90px;
          border: solid 1px #f1f1f1;
          display: block;
          height: 90px;
          border-radius: 5px;
          overflow: hidden;
        }
      }
      .cgs_info {
        display: table-cell;
        vertical-align: middle;
        padding-left: 10px;
        width: 2000px;
        ._h3 {
          width: 70%;
          font-weight: normal;
          font-size: 14px;
          word-break: normal;
          color: #888;
          ._i {
            display: inline-block;
          }
        }
        .cgs_prs {
          line-height: 34px;
          font-size: 16px;
          color: #000000;
          font-weight: 400;
        }
      }
      .cgs_count {
        position: absolute;
        right: 1em;
        top: 65px;
        font-size: 12px;
        color: #888;
      }
    }
  }
  .ui-btn {
    background: #cab894;
    border: solid 1px #cab894;
    min-height: 32px;
    margin-bottom: 1em;
    margin-top: 1em;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .bnt_link {
      background: 0;
      border: 0;
      color: #fff;
      cursor: pointer;
      display: block;
      font-size: 16px;
      
      text-align: center;
      width: 100%;
    }
  }
  .ui_titlegoods ._li {
    font-size: 0;
    margin-bottom: 10px;
    float: left;
    margin-right: 10px;
    display: block;
    ._img {
      width: 80px;
      height: 80px;
      border: solid 1px #dcdcdc;
      font-size: 0;
    }
  }
}
</style>
