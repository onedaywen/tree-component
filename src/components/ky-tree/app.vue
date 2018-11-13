<template>
  <div class="tree-box">
    <TreeInput :param="inputParam" @click="search"></TreeInput> 
    <TreeTab :param="tabParam" @change="handleTabChange"></TreeTab>
    <div class="tree-item-box" @click="handleDelegate($event)">
      <TreeItem 
        v-for="item in treeData"
        :key="item.key"
        :item="item"
        :hasChildren="hasChildren(item.i)"
        :childrenLength="getChildrenLength(item.i)"
        :lastNodeLength="getLastNodeLength(item.i)"
        :data-id="item.i"
        :data-pid="item.p"
        :style="{paddingLeft: item.depth * 20 + 'px'}"
        :class="(checkedList.length > 0 && checkedList.length >= max && !item.checked) ? 'icon-not-allowed' : ''">
      </TreeItem>
    </div>
  </div> 
</template>

<script>
  import app from './app'
  export default app
</script>

<style lang="less">
@import "./app.less";
</style>