<template>
  <div id="app">
    <Header/>
    <div class="app_content" >
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
 import  Header from './components/Header/Header'

  export default {
    name: 'app',
    components: {
      Header
    }
  }
</script>

<style lang="scss">
  body , html {
    margin: 0;
    padding: 0;
  }
  .el-menu {
    background-color: #4464e6 !important;
  }
  .el-submenu__title:hover {
    background: none !important;
  }
  .el-submenu__title i.el-icon-arrow-down:before {
    content: '';
  }
  .el-submenu .el-submenu__title {
    height: 50px!important;
  }
  #app {

  }
</style>
