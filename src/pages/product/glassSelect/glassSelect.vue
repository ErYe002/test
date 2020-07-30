<template>
  <div style="height: 100%" class="contain">
    <section>
      <div class="menu-pop-toggle-layout" >
        <span class="text-t6">当前选择：{{groupName}}</span>
        <div class="dropdown-box" >
          <img src="/static/images/icon_right_grey.png" alt="" class="trans-bg" />
          <scroll-view class="pop-group-select-layout" scroll-x @scroll="scroll">
            <radio-group class="radio-group" @change="radioChange">
              <radio
                class="radio"
                v-for="item in groupNameList"
                :key="item.value"
                :value="item.index"
                :checked="groupSelectPosition===item.index"
                :color="'#cab894'"
              >
                <text class="text-group-name">{{item.value}}</text>
              </radio>
            </radio-group>
          </scroll-view>
          <div class="nav-dont">
                  <div class="dont"></div>
                  <div class="line-box">
                    <div class="line" :style="{left:xxx+'px'}">

                    </div>
                  </div>
                  <div class="dont"></div>
              </div>
        </div>
      </div>
      

    </section>
    <div class="glass-list-layout">
      <div :class="(index===glassSelectPosiition && item.canEnable)?'glass-item select':'glass-item'"
           v-for="(item,index) in atttGlassListData[groupSelectPosition].EyeGlassList"
           :key="item.Seocode" @click="chooseGlassEvent(index)">
        <img :src="item.ImageUrl" class="image-goods"/>
        <div class="goods-name">{{item.GoodsName}}</div>

        <div class="price-layout">
          <div class="goods-price">{{item.SellPrice}}</div>

          <a class="ck-detail" v-if="item.canEnable" @click="goToGoodsDetail(item,index)">查看详情</a>
          <a class="ck-detail disable" v-else>查看详情</a>
        </div>
        <img src="/static/images/eye-select-sj.png" class="select-item-image"
             v-if="(index===glassSelectPosiition && item.canEnable)"/>
      </div>
    </div>
    <div class="btn-confirm-btm" @click="backToFinish">确定</div>
  </div>
</template>

<script>
  import api from "@/api/attr";
  import {mapState, mapGetters, mapActions} from "vuex";

  export default {
    name: "glass-select",

    onLoad(options) {
      if (options) {
        console.log('穿过来的参数', options);
        this.groupName = this.atttGlassListData[0].GroupName;
        if (options.groupSelectPosition !== undefined && options.groupSelectPosition != -1 ) {
          this.groupSelectPosition = Number(options.groupSelectPosition);
          this.groupName = this.atttGlassListData[options.groupSelectPosition].GroupName;
          console.log('穿过来的参数进来了');
        }
        if (options.glassSelectPosiition !== undefined && options.glassSelectPosiition != -1) {
          this.glassSelectPosiition = Number(options.glassSelectPosiition);
        }
      }
    },
    data() {
      return {
        menuOpened: false,
        groupSelectPosition: 0,
        glassSelectPosiition: 0,
        groupName: '',
        xxx:0
      };
    },
    computed: {
      ...mapState("groupGlassList", ["atttGlassListData"]),
      ...mapGetters("groupGlassList", ["groupNameList"])
    },

    watch: {},
    methods: {
      ...mapActions('groupGlassList', ['setGroupSelectPosition']),

      radioChange: function (e) {

        this.groupSelectPosition = Number(e.mp.detail.value);
        this.groupName = this.atttGlassListData[this.groupSelectPosition].GroupName;
      },
      openMenu() {
        this.menuOpened = !this.menuOpened;
      },
      chooseGlassEvent(index) {
        if (this.atttGlassListData[this.groupSelectPosition].EyeGlassList[index].canEnable) {
          this.glassSelectPosiition = index;
        }
      },
      backToFinish() {
        this.setGroupSelectPosition({groupPosition: this.groupSelectPosition, glassosition: this.glassSelectPosiition});
        wx.navigateBack({
          delta: 1
        });
      },
      goToGoodsDetail(item, index) {
        wx.navigateTo({
          url: '/pages/product/index/main?seocode=' + item.Seocode + '&isComp=false&groupSelectPosition=' + this.groupSelectPosition + '&glassSelectPosiition=' + this.glassSelectPosiition + '&isFromAttr=true'
        });
        this.glassSelectPosiition = index;
        this.setGroupSelectPosition({groupPosition: this.groupSelectPosition, glassosition: this.glassSelectPosiition});
      },
      scroll(e){
        let that = this
        wx.getSystemInfo({
          success (res) {
            that.xxx  = (e.mp.detail.scrollLeft*10/(e.mp.detail.scrollWidth-res.screenWidth))
            }
        })
        // console.log(e.mp.detail)
        // this.xxx = e.mp.detail.scrollLeft;//scrollWidth
      },

    }
  }
</script>

<style lang="less">
  page {
    height: 100%;
    padding-top: 153px;
    box-sizing: border-box;
    background: #f2f2f2;
  }
  .contain{
    padding: 0 10px;
  }
  .menu-pop-toggle-layout {
    border-top: 10px solid #f2f2f2;
    height: 140px;
    display: flex;
    margin: 0 10px;
    flex-direction: column;
    box-sizing: border-box;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 3;

    .ic-up-or-down {
      height: 33px;
      width: 33px;
    }
    .text-t6 {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      width: 100%;
      color: #666666;
      font-size: 14px;
      height: 40px;
      padding-left:15px ;
      line-height: 40px;
      text-align: left;
    }
  }

  .dropdown-box {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 0.5px solid #DEDEDE;
    position: relative;
    background: #fff;
    box-sizing: border-box;
    .trans-bg{
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -6px;
      width: 8px;
      height: 12px;
      z-index: 5;
    }
  }

  .pop-group-select-layout {
    height: 100px;
    width: 100%;
    .radio-group {
      padding: 0 15px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      height: 100px;
      .radio {
        width: 60%;
        margin-top: 5px;
      }
      .text-group-name {
        color: #333333;
      }
    }
  }

  .btn-confirm-btm {
    height: 50px;
    width: 100%;
    color: white;
    background-color: #cab894;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    z-index: 1;
  }

  .glass-list-layout {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 70px;
    background: #fff;
    .glass-item {
      width: calc(50% - 20px);
      margin: 10px 10px 0 10px;
      box-sizing: border-box;
      border: #d9d9d9 solid 1px;
      position: relative;
      border-radius: 3px;
      &.select {
        border: #d8c29b solid 1px;
      }
    }

    .select-item-image {
      width: 34px;
      height: 34px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .image-goods {
      width: 100%;
      height: 158px;
    }

    .goods-name {
      font-size: 12px;
      color: #333333;
      margin: 5px 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      height: 48px;
    }

    .price-layout {
      display: flex;
      justify-content: space-between;
      padding: 0px 10px 10px 10px;
      .goods-price {
        color: red;
        font-size: 15px;
      }

      .ck-detail {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 60px;
        height: 25px;
        background: #cab894;
        font-size: 12px;
        border-radius: 3px;
        &.disable {
          background-color: #cccccc;
        }
      }
    }
  }
  .nav-dont{
      width: 100%;
      height: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      .dont{
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #f7e6c3;
      }
      .line-box{
        width: 30px;
        height: 3px;
        position: relative;
        .line{
          width: 20px;
          height: 3px;
          position: absolute;
          transition: all 1s;
          background: #3e3a39;
        }
      }
    }
</style>
