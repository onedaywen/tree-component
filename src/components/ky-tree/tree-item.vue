<template>
  <div class="tree-item">
    <i class="icon" :class="hasChildren ? (item.open ? 'icon-open' : 'icon-close') : ''"></i>
    <i class="icon" v-if="item.depth > 2" :class="item.checked ? 'icon-checked' : 'icon-checkbox'"></i>
    <div :title="item.n + '(' + childrenLength +'/' + lastNodeLength + ')'">
      <span class="tree-item-title">{{ item.n }}</span>
      <span v-if="!item.v">{{ '(' + childrenLength +'/' + lastNodeLength + ')'}}</span>
    </div> 
  </div> 
</template>

<script>
  export default {
    name: 'tree-item',
    props: {
      item: {
        type: Object
      },
      max: {
        type: Number
      },
      hasChildren: {
        type: Boolean,
        default: true
      },
      childrenLength: {
        type: Number,
        default: 0
      },
      lastNodeLength: {
        type: Number,
        default: 0
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .tree-item {
    width: 100%;
    height: calc(100% - 90px);
    @treeItemHeight: 24px;
    @iconHeight: 15px;
    height: @treeItemHeight;
    line-height: @treeItemHeight;
    font-size: 12px;
    .icon {
      float: left;
      width: @iconHeight;
      height: @iconHeight;
      margin-top: calc((@treeItemHeight - @iconHeight)/2);
      margin-right: 6px;
      &.icon-open {
        cursor: pointer;
        background: url('./imgs/icon-open.svg') no-repeat center center;
        background-size: 100% 100%;
      }
      &.icon-close {
        cursor: pointer;
        background: url('./imgs/icon-close.svg') no-repeat center center;
        background-size: 100% 100%;
      }
      &.icon-checked {
        cursor: pointer;
        background: url('./imgs/icon-checked.svg') no-repeat center center;
        background-size: 100% 100%;
      }
      &.icon-checkbox {
        cursor: pointer;
        background: url('./imgs/icon-checkbox.svg') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
</style>


