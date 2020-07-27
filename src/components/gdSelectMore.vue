<template>
  <bottom-flip :is-show.sync="isShow">
    <div class="title-box">
        <div class="img-box">
            <img :src="imgUrl" class="img"/>
        </div>
        <div class="name">
            <span class="price">￥{{price}}</span>
            <span class="goodname">{{GoodsName}}</span>
        </div>
      <img @click="hideEvent" class="icon-close" src="/static/images/icon_cart_tips_close.png"/>
    </div>
    <scroll-view scroll-y="true" class="scroll-box" :scroll-top="scrollHeight">
         <div class="item-title">
            <div>
                <span class="sph-title" v-if="serisItem.length>0">
                颜色
                </span>
                <div class="item-layout" v-if="serisItem.length>0">
                <div v-for="(item,index) in serisItem" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
                    >
                    <div :class="{'item-gd':true,'select':selectGoodsId==item.GoodsId}" @click="selectSeriesEvent(item.GoodsId)">
                    {{item.AnotherName}}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div  class="item-list">
            <div>
                <span class="sph" v-if="sphList.length>0">
                度数 <span style="color:red" v-if="cylList.length==0||axisList.length==0">(可多选)</span>
                </span>
                <div class="item-layout" v-if="sphList.length>0">
                <div v-for="(item,index) in sphList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
                    >
                    <div :class="{'item-gd':true,'select':item.checked}" @click="selectEvent('sph',item.Id,item.Value)">
                    {{item.Value}}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div  class="item-list">
            <div>
                <span class="sph" v-if="cylList.length>0">
                散光 
                </span>
                <div class="item-layout" v-if="cylList.length>0">
                <div v-for="(item,index) in cylList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
                    >
                    <div :class="{'item-gd':true,'select':item.checked}" @click="selectEvent('cyl',item.Id,item.Value)">
                    {{item.Value}}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div  class="item-list">
            <div>
                <span class="sph" v-if="axisList.length>0">
                轴位 
                </span>
                <div class="item-layout" v-if="axisList.length>0">
                <div v-for="(item,index) in axisList" v-bind:key="index" style="padding:5px;box-sizing:border-box;width: 20%"
                    >
                    <div :class="{'item-gd':true,'select':item.checked}" @click="selectEvent('axis',item.Id,item.Value)">
                    {{item.Value}}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div  class="good-list" v-if="cylList.length==0||axisList.length==0">
            <div>
                <span class="sph" v-if="joinGoodsList.length>0">
                数量
                </span>
                <div class="item-layout" v-if="joinGoodsList.length>0">
                    <div v-for="(item,index) in joinGoodsList" v-bind:key="index" class="quantiy-box">
                        <span class="fl field_item">{{item.value}}</span>
                        <div class="cart_goods_num">
                            <div class="cart_goods_num_min" @click="cartGoodsQuantiy('min',item.SphereId)">-</div>
                            <div class="goods_num">{{item.Quantity}}</div>
                            <div class="cart_goods_num_add" @click="cartGoodsQuantiy('add',item.SphereId)">+</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="sell-out-text">
        {{sellOutMsg}}
        </div>
    </scroll-view>
    <div style="display: flex;height: 50px;width: 100%">
      <div class="btn-confirm-sellout" @click="showArriveMsg" v-if="sellOut">
        到货通知
      </div>
      <div class="btn-confirm" @click="disMissPoo" v-else>
        确定
      </div>
      <div class="btn-confirm" @click="disMissPoo" v-if="sellOut && saleStockType==='1'">
        继续购买
      </div>
    </div>
  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";
  import api from "@/api/attr";

  export default {
    name: "gd-select-more",
    props: {
      isShow: {type: Boolean, default: false},
      gid:"",
      price:"",
      imid:""
    },
    data() {
      return {
        sphSelectId: "",
        sellOut: false,
        sellOutMsg: "",
        isConfirmedBuy: false,
        scrollHeight: 0,
        sphList: [],
        cylList:[],
        axisList:[],
        serisItem:[],
        selectGoodsId:"",
        specification:"",
        imgUrl:"",
        GoodsName:"",
        joinGoodsList:[],
        joinCylList:[],
        joinAxisList:[]
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
            this.isConfirmedBuy = false;
            this.scrollHeight = 0;
            this.selectGoodsId = this.gid;
            this.getData()
          }else{
            this.joinGoodsList = []
            this.joinCylList = []
            this.joinAxisList = []
          }
        }
      },
    },
    methods: {
      hideEvent() {
        this.joinGoodsList = []
        this.joinCylList = []
        this.joinAxisList = []
        this.$emit('update:isShow', false)
      },
      selectSeriesEvent(Id){
        this.selectGoodsId = Id;
       this.joinGoodsList = []
        this.joinCylList = []
        this.joinAxisList = []
        this.getData()
      },
      getData(){
        api.getGoodsField(this.selectGoodsId).then(({Data})=>{
          if(Data!=null){
            this.imgUrl = Data.ImageUrl
            this.GoodsName = Data.GoodsName
            this.serisItem = Data.SeriesItems
           this.setGdInfo(Data.GoodsFields)
          }
        })
      },
       setGdInfo(gdlist) {
            for (let item of gdlist) {
            if (item.FieldName === '光度') {
                this.sphList = item.Children;
            } else if (item.FieldName === '散光') {
                this.cylList = item.Children;
            } else if (item.FieldName === '轴位') {
                this.axisList = item.Children;
            }

            console.log('参数', this.sphList.length, this.cylList.length, this.axisList.length);
            }
      },
      checkId(){
        this.sphList.forEach(item=>{
            item.checked = false
            this.joinGoodsList.forEach(obj=>{
                if(obj.SphereId == item.Id ){
                     item. checked = true  
                }
            })
        })
        this.cylList.forEach(item=>{
            item.checked = false
            this.joinCylList.forEach(obj=>{
                if(obj.SphereId == item.Id ){
                     item. checked = true  
                }
            })
        })
        this.axisList.forEach(item=>{
            item.checked = false
            this.joinAxisList.forEach(obj=>{
                if(obj.SphereId == item.Id ){
                     item. checked = true  
                }
            })
        })
      },
      selectEvent(type,RealGoodsId,value) {
        if(type=='sph'){
            if(this.cylList.length==0||this.axisList.length==0){
                let obj = {SphereId:RealGoodsId,Quantity:1,value:value}
                let flag = this.joinGoodsList.some(item=>{return item.SphereId==RealGoodsId})
                if(!flag){
                    this.scrollHeight = this.scrollHeight+20
                    this.joinGoodsList.push(obj)
                }else{
                    this.scrollHeight = this.scrollHeight-20
                    let arr = this.joinGoodsList.filter(item=>{return item.SphereId!=RealGoodsId})
                    this.joinGoodsList = arr
                }
            }else{
                let obj = {SphereId:RealGoodsId,value:value}
                let arr = []
                arr.push(obj)
                this.joinGoodsList = arr
            }
        }else if(type=='cyl'){
             let obj = {SphereId:RealGoodsId,value:value}
            let arr = []
            arr.push(obj)
            this.joinCylList = arr
        }else if(type=='axis'){
            let obj = {SphereId:RealGoodsId,value:value}
            let arr = []
            arr.push(obj)
            this.joinAxisList = arr
        }

         this.checkId();
      },
      cartGoodsQuantiy(type,RealGoodsId){
        if(type=="min"){
            this.joinGoodsList.forEach(item=>{
                if(RealGoodsId==item.SphereId){
                    let Quantity = item.Quantity-1
                    if(Quantity>0){
                        item.Quantity = Quantity
                    }
                }
            })
        }else if(type=="add"){
            this.joinGoodsList.forEach(item=>{
                if(RealGoodsId==item.SphereId){
                    let Quantity = item.Quantity+1
                    
                    item.Quantity = Quantity
                    
                }
            })
        }
      },
      disMissPoo() {
        if (this.joinGoodsList.length == 0) {
          wx.showToast({
            title: "请选择光度",
            icon: "none"
          });
          return;
        }
        if (this.cylList.length > 0&&this.axisList.length>0) {
          if (this.joinCylList.length ==0) {
            wx.showToast({
              title: "请选择散光",
              icon: "none"
            });
            return;
          } else if (this.joinAxisList.length ==0) {
            wx.showToast({
              title: "请选择轴位",
              icon: "none"
            });
            return;
          }
        }

        if (this.saleStockType === '1' && this.sellOut) {
          this.isConfirmedBuy = true;
        }
        this.$emit('backData', {
          goodsId:this.selectGoodsId,
          joinGoodsList:this.joinGoodsList,
          joinCylList:this.joinCylList,
          joinAxisList:this.joinAxisList,
          imid:this.imid
          // isConfirmedBuy: this.isConfirmedBuy
        });

        // this.hideEvent();

      },
      showArriveMsg() {
        let cutem = this.sphList[this.sphSelectPosition];
        api.arrivalStockNotice(cutem.RealGoodsId, cutem.Id).then(({Data}) => {
          console.log('到货通知成功');
        });
        wx.showModal({
          title: '提示',
          content: '商品到货后，小可会第一时间给您发送APP消息通知，请注意查看',
          icon: "none",
          confirmText: '知道了',
          confirmColor: '#CAB894',
          showCancel: false
        });
      },
      changeTypeEvent(){}
    }
  };
</script>

<style lang="less" scoped>
  .title-box {
    position: relative;
    // padding: 12px 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    .img-box{
        width: 80px;
        height: 80px;
        position: absolute;
        left: 20px;
        top: -25px;
        background: #fff;
        box-sizing: border-box;
        border: 0.5px solid #A9A8AB;
        border-radius: 10px;
        display: block;
        position: relative;
        img{
            position: absolute;
            left: 10px;
            top: 10px;
            width: 60px;
            height: 60px;
            // border-radius: 50%;
            overflow: hidden;
        }
    }
    .icon-close {
      position: absolute;
      right: 12px;
      top: 30%;
      transform: translate3d(0, -50%, 0);
      z-index: 1;
      display: block;
      width: 12px;
      height: 12px;
    }
    .name{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-left: 30px;
        width: 180px;
        .price{
            color: #FF435E;
            font-size: 15px;
        }
        .goodname{
            font-size: 12px;
            color: #1B1B1B;
        }
    }
  }
  .item-title {
    .sph-title{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #000;
      margin: 0 10px;
      font-weight: bold;
    }

    .item-layout {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 5px;
      .item-gd {
        border-radius: 5px;
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        background: #f1f6f7;
        justify-content: center;
        color: #000;
        box-sizing: border-box;

        &.select {
          color: #a60f0c;
          background: #faf2ef;
          border: #a60f0c solid 1px;
        }
      }
    }

  }
  .scroll-box{
      height: 3500px;
      max-height: 350px;

  }
  .item-list {
    .sph {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #000;
      margin: 0 10px;
      font-weight: bold;
    }
    .item-layout {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 5px;
      .item-gd {
        border-radius: 5px;
        font-size: 12px;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
        background: #F5F5F5;
        justify-content: center;
        color: #000;
        box-sizing: border-box;

        &.select {
          color: #FF435E;
          background: #FFEDEF;
          border: #FF435E solid 1px;
        }
      }
    }

  }

  .btn-confirm {
    color: white;
    background-color: #cab894;
    font-size: 15px;
    width: 100%;
    height: 50px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .btn-confirm-sellout {
    color: white;
    background-color: #F7B500;
    font-size: 15px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex: 1;
  }

  .sell-out-text {
    font-size: 12px;
    color: red;
    margin-left: 15px;
    height: 30px;

  }

  .good-list {
    .sph {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #000;
      margin: 0 10px;
      font-weight: bold;
    }
    .item-layout {
        margin: 0 10px;
      .quantiy-box{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2px 0;
          .cart_goods_num{
              display: flex;
              justify-content: center;
              align-items: center;
              .goods_num{
                  width: 34.5px;
                  height: 25px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 13px;
                  color: #000000;
              }
              .cart_goods_num_min{
                  width: 30px;
                  height: 25px;
                  background: #FBFBFB;
                  text-align: center;
                  line-height: 25px;
              }
              .cart_goods_num_add {
                  width: 30px;
                  height: 25px;
                  background: #F5F5F5;
                  text-align: center;
                  line-height: 25px;
              }
          }

      }
    }

  }
</style>

