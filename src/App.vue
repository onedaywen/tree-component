<template>
  <div id="app">
    <KyTree />
  </div>
</template>

<script>
import KyTree from './components/ky-tree/app.vue'

export default {
  name: 'app',
  components: {
    KyTree
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  margin: 20px;
}
</style>
