<template>
  <bottom-flip :is-show.sync="isShow">

  </bottom-flip>
</template>

<script>
  import bottomFlip from "@/components/bottomFlip";


  export default {
    name: "gd-glasses-list",

    props: {},
    data() {
      return {};
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

          }
        }
      },


      methods: {
        hideEvent() {
          this.$emit('update:isShow', false)
        },

      }
    }
  }
</script>

<style lang="less" scoped>

</style>
