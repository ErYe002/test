<template>
  <ul class="list">
    <template v-if="list.length > 0">
      <li :class="{item: true, 'current': idx == 0}" v-for="(item, idx) in list" :key="item.Time">
        <i class="dot"></i>
        <div class="text">
          <p>{{item.Description}}</p>
          <em>{{item.Time}}</em>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props:{
    list:{
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  // padding: 20px 28px 28px;
  .item {
    font-size: 14px;
    color: #888;
    display: flex;
    padding: 7.5px 0;
    align-items: center;
    position: relative;
    .dot {
      width: 18px;
      height: 18px;
      background: #dddddd;
      border-radius: 50%;
      margin-right: 10px;
      position: relative;
      z-index: 1;
    }
    .text {
      em {
        font-size: 13px;
      }
    }
    &.current {
      color: #333;
      .dot {
        background: #ff6b6b;
        box-shadow: 0 0 5px rgba(255, 107, 107, 1);
      }
    }
    &:after,
    &:before {
      content: "";
      display: block;
      width: 0.5px;
      background: #dddddd;
      height: 50%;
      position: absolute;
      left: 9px;
    }
    &:before {
      top: 0;
    }
    &:after {
      bottom: 0;
    }
    &:first-child {
      &:before {
        display: none;
      }
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
}
</style>