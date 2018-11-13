<template>
  <div class="tree-tab-box">
    <a v-for="(tab, index) in param.options"
      :key="index"
      class="tab-item"
      :class="{active: tab.value === param.value}"
      @click="handleTab(tab)">
      {{ tab.label }}
    </a>
  </div> 
</template>

<script>
  export default {
    name: 'tree-tab',
    props: {
      param: {
        type: Object
      }
    },
    methods: {
      handleTab (tab) {
        if (tab.value !== this.param.value) {
          this.param.value = tab.value
          this.$emit('change', tab, this.param.value)
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .tree-tab-box {
    width: 100%;
    height: 40px;
    border: solid 1px #ddd;
    line-height: 40px;
    margin-top: 10px;
    font-size: 13px;
    display: flex;
    .tab-item {
      flex: 1;
      text-align: center;
      background-color: #f5f5f5;
      cursor: pointer;
      &.active {
        background-color: #fff;
        color: #815abc;
        font-weight: bold;
      }
    }
    .tab-item + .tab-item {
      border-left: solid 1px #ddd;
    }
  }
</style>


