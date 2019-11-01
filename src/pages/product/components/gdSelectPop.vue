<template>
  <bottom-flip :is-show.sync="isShow">
    <p class="title-box">
      <b>选择参数</b>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </p>
    <!--近视-->

    <div class="type-choose-sph">
      <span class="sph select" @click="changeTypeEvent(1)" v-if="displayType===1">
        近视 SPH
      </span>
      <span class="sph" @click="changeTypeEvent(1)" v-if="displayType===2">
        近视 SPH
      </span>
      <span class="sph select" @click="changeTypeEvent(2)" v-if="displayType===2">
        远视/老光 SPH
      </span>
      <span class="sph" @click="changeTypeEvent(2)" v-if="displayType===1">
        远视/老光 SPH
      </span>

      <span class="sph select" v-if="displayType===3">
        散光 CYL
      </span>
      <span class="sph select" v-if="displayType===4">
        轴位 AXIS
      </span>
      <span class="sph select" v-if="displayType===5">
        瞳距 PD
      </span>
    </div>
    <section>
      <scroll-view scroll-y="true" class="item-list">
        <div class="list-layout">
          <div v-for="(item,index) in sphMinus" v-bind:key="item" style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="displayType===1">
            <div :class="{'item-gd':true,'select':selectSPH===item}" @click="sphSelectEvent(index)">
              {{item}}
            </div>
          </div>

          <div v-for="(item,index) in sphpositive" v-bind:key="item"
               style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="displayType===2">
            <div :class="{'item-gd':true,'select':selectSPH===item}" @click="sphSelectEvent(index)">
              {{item}}
            </div>
          </div>

          <div v-for="(item,index) in cylinderRange" v-bind:key="item"
               style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="displayType===3">
            <div :class="{'item-gd':true,'select':selectCYL===item}" @click="cylSelectEvent(index)">
              {{item}}
            </div>
          </div>

          <div v-for="(item,index) in axisRange" v-bind:key="item" style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="displayType===4">
            <div :class="{'item-gd':true,'select':selectAXIS===item}" @click="axisSelectEvent(index)">
              {{item}}
            </div>
          </div>

          <div v-for="(item,index) in pdRange" v-bind:key="item" style="padding:5px;box-sizing:border-box;width: 20%"
               v-if="displayType===5">
            <div :class="{'item-gd':true,'select':selectPD===item}" @click="pdSelectEvent(index)">
              {{item}}
            </div>
          </div>
        </div>

      </scroll-view>
    </section>

    <!--远视-->


    <!--底部按钮-->
    <div class="btm-layout">

      <div class="bottom-btn yellow" @click="changeStape()" v-if="displayType===1 || displayType===2">
        下一步
      </div>

      <div class="bottom-btn black" v-if="displayType===3 || displayType===4" @click="perStep()">
        上一步
      </div>

      <div class="bottom-btn yellow" @click="changeStape()"
           v-if="displayType===3 || displayType===4 || displayType===5">
        确定
      </div>

    </div>
  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";


  export default {
    name: "gd-select-pop",

    props: {
      isShow: {type: Boolean, default: false},
      sphereRange: [String],
      cylinderRange: [String],
      axisRange: [String],
      pdRange: [String],
      openState: Number,//1L 2R 3PD
      selectBean: Object
    },
    data() {
      return {
        displayType: 1,
        sphMinus: ['0.00'],
        sphpositive: ['0.00'],
        selectSPH: '0.00',
        selectCYL: '无',
        selectAXIS: '',
        selectPD: '62',
        SPHyj: 1
      };
    },

    components: {
      bottomFlip
    },

    watch: {
      isShow: {
        handler: function (val) {
          //父与子组件同步isShow值
          this.$emit('update:isShow', val);
          if (val === true) {
            //数据初始化
            this.sphMinus = ['0.00'];
            this.sphpositive = ['0.00'];


            //数据整理
            for (let sph of this.sphereRange) {
              if (sph.startsWith('-')) {
                this.sphMinus.push(sph);
              } else if (sph.startsWith('+')) {
                this.sphpositive.push(sph);
              }
            }
            //打开状态
            if (this.openState === 3) {
              this.displayType = 5;
              this.selectPD = this.selectBean.pd;
            } else if (this.openState === 2) {
              this.displayType = 1;
              if (this.selectBean.sphR !== '' && this.selectBean.cylR !== '' && this.selectBean.axisR !== '') {
                this.selectSPH = this.selectBean.sphR;
                this.selectCYL = this.selectBean.cylR;
                this.selectAXIS = this.selectBean.axisR;
              } else {
                this.selectSPH = '0.00';
                this.selectCYL = '无';
                this.selectAXIS = '';
              }
            } else {
              this.displayType = 1;
              if (this.selectBean.sphL !== '' && this.selectBean.cylL !== '' && this.selectBean.axisL !== '') {
                this.selectSPH = this.selectBean.sphL;
                this.selectCYL = this.selectBean.cylL;
                this.selectAXIS = this.selectBean.axisL;
              } else {
                this.selectSPH = '0.00';
                this.selectCYL = '无';
                this.selectAXIS = '';
              }
            }
          }
        },
        immediate: true
      }
    },


    methods: {
      hideEvent() {
        this.$emit('update:isShow', false)
      },

      changeTypeEvent(type) {
        if (type === 1) {
          this.SPHyj = 1;
        } else if (type === 2) {
          this.SPHyj = 2;
        }
        this.displayType = type;
      },
      sphSelectEvent(index) {
        if (this.displayType === 1) {
          this.selectSPH = this.sphMinus[index];
        } else {
          this.selectSPH = this.sphpositive[index];
        }
      },
      cylSelectEvent(index) {
        this.selectCYL = this.cylinderRange[index];
      },
      axisSelectEvent(index) {
        this.selectAXIS = this.axisRange[index];
      },
      pdSelectEvent(index) {
        this.selectPD = this.pdRange[index];
      },
      changeStape() {
        if (this.displayType === 1 || this.displayType === 2) {
          this.displayType = 3;
        } else if (this.displayType === 3 && this.selectCYL !== '无') {
          this.displayType = 4;
        } else {

          if (this.displayType === 4) {
            if (this.selectAXIS === '') {
              wx.showToast({title: '请选择轴位', icon: 'none'});
              return;
            }
          }

          this.$emit('backData', {
            selectSPH: this.selectSPH,
            selectCYL: this.selectCYL,
            selectAXIS: this.selectAXIS,
            selectPD: this.selectPD
          });
          this.hideEvent();
        }
      },
      perStep() {
        if (this.displayType === 3) {
          if (this.SPHyj === 1) {
            this.displayType = 1;
          } else {
            this.displayType--;
          }
        } else {
          this.displayType--;
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .title-box {
    position: relative;
    padding: 12px 0;
    font-size: 16px;
    text-align: center;
    .icon-close {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      z-index: 1;
      display: block;
      width: 12px;
      height: 12px;
    }
  }

  .type-choose-sph {
    display: flex;
    padding-left: 15px;
    padding-bottom: 10px;
    .sph {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 30px;
      font-size: 15px;
      color: #cab894;
      background-color: white;
      margin: 20px 10px 0 0;
      border: #cab894 solid 1px;
      &.select {
        color: white;
        background-color: #cab894;
      }
    }
  }

  .item-list {
    max-height: 300px;
    height: 300px;
    .list-layout {
      display: flex;
      padding: 20px 10px;
      flex-wrap: wrap;
      .item-gd {
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: #c7c7c7 solid 1px;
        color: #6b6b6b;

        &.select {
          color: #cab894;
          border: #cab894 solid 1px;
        }
      }
    }
  }

  .btm-layout {
    display: flex;
    width: 100%;
    height: 50px;
    .bottom-btn {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      color: white;
      &.yellow {
        background-color: #cab894;
      }

      &.black {
        background-color: black;
      }
    }
  }
</style>
