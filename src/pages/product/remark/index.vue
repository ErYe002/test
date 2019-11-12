<template>

</template>

<script>
  import api from "@/api/attr";
  import gdNromalSelectPop from "../components/gdNromalSelectPop"

  export default {
    name: "normal-attr",

    props: {
      buyNoProperty: 'api/cart/BuyNoProperty',
      buyDoubleProperty: 'api/cart/BuyDoubleProperty',
      buyDoubleCustomizedProperty: 'api/cart/BuyDoubleCustomizedProperty',
      buyNoPropertyFrame: 'api/cart/BuyNoPropertyFrame',
      buySinglePropertyFrame: 'api/cart/BuySingleProperty',
    },

    data() {
      return {
        seriesPosition: -1,
        mainData: {},
        mainGoods: {},
        SeriesItems: [],
        GoodsFields: [],
        sphList: [],
        cylList: [],
        axisList: [],
        leftNum: 1,
        rightNum: 1,
        singleNum: 1,
        noPropertyQuantity: 1,
        currentGoodsType: 2,// 0 无属性  1 有单个属性 2有2个属性
        isShowGdSelectPop: false,
        openSide: '',
        postShowDouble: {sphL: '', sphR: '', cylL: '', cylR: '', axisL: '', axisR: ''},
        postShowSingle: {sph: '', cyl: '', axis: ''},
        postShowIdSingle: {sphId: ''},
        postIdDouble: {sphLId: '', sphRId: '', cylLId: '', cylRId: '', axisLId: '', axisRId: ''},
      };
    },
    onLoad() {
      this._getData('96019ffe-607d-44d1-b567-00e7a85e899e');

    },
    watch: {
      leftNum: function (val, oldVal) {
        if (val < 0) {
          this.leftNum = 0;
        }
      },
      rightNum: function (val, oldVal) {
        if (val < 0) {
          this.rightNum = 0;
        }
      },
      singleNum: function (val, oldVal) {
        if (val < 0) {
          this.singleNum = 0;
        }
      },
    },
    components: {
      gdNromalSelectPop
    },
    methods: {
      _getData(goodsId) {
        // api.postGoodsJoinCartNormal('179e08dc-d38a-42ed-a2ab-5b9516ea1bfd', null, false, false, true).then(({Data}) => {
        api.postGoodsJoinCartNormal(goodsId, null, false, false, true).then(({Data}) => {
          console.log("主数据", Data);
          this.mainData = Data;
          this.mainGoods = Data.MainGoods;
          this.SeriesItems = Data.MainGoods.SeriesItems;
          this.GoodsFields = Data.MainGoods.GoodsFields;
          this.setGdInfo(Data.MainGoods.GoodsFields);


          //设置当前选中的系列坐标
          for (let i = 0; i < Data.MainGoods.SeriesItems.length; i++) {
            let item = Data.MainGoods.SeriesItems[i];
            if (item.GoodsId === Data.MainGoods.GoodsId) {
              this.seriesPosition = i;
            }
          }

          //清除数据
          this.postShowDouble = {sphL: '', sphR: '', cylL: '', cylR: '', axisL: '', axisR: ''};
          this.postShowSingle = {sph: '', cyl: '', axis: ''};
          this.postIdDouble = {sphLId: '', sphRId: '', cylLId: '', cylRId: '', axisLId: '', axisRId: ''};
        });

      }
    }
  };
</script>

<style lang="less" scoped>

</style>
