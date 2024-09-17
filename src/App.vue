<template>
  <div id="app">
      <Layout>
        <template slot="left">
          <div class="left">
            <SiteAside />
          </div>
        </template>
          <div class="main">
            <router-view></router-view>
          </div>
      </Layout>
      <MoveTop />
  </div>
</template>

<script>
import MoveTop from '@/components/MoveTop'
import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
export default {
  name:'App',
  components: {//注册组件
    Layout,
    SiteAside,
    MoveTop
  },
  
  
}
</script>

<style lang="less" scoped>
#app{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  
}
.left{
  width: 250px;
  height: 100%;
}
.main{
  width: 100%;
  height: 100%;
}

</style>
  

