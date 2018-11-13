<template>
  <div class="search-input-box">
    <input class="search-input"
      :placeholder="param.placeholder || '请输入'"
      v-model="param.value"/>
    <button class="search-btn" @click="search">搜</button>
  </div> 
</template>

<script>
  export default {
    name: 'tree-input',
    props: {
      param: {
        type: Object
      }
    },
    methods: {
      async search () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-input-box {
    width: 100%;
    height: 40px;
    position: relative;
    .search-input {
      width: 100%;
      height: 100%;
      border: solid 1px #ddd;
      padding: 0 10px;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .search-btn {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 40px;
      border: solid 1px #815abc;
      border-radius: 4px;
      background: #815abc;
      color: #fff;
    }

  }
</style>


