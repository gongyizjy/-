<template>
  <div class="site-aside-container">
    <div class="avatar">
      <Avatar v-if="data" :url="data.favicon" :width="150" :height="150"/>
    </div>
    <div class="menu">
      <Menu/>
    </div>
    <div class="contact">
      <Contact  v-if="data"/>
    </div>
    <p v-if="data">{{data.icp}}</p>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Contact from "./Contact";
import Menu from './Menu'
import { mapState } from 'vuex';
export default {
    components:{
        Avatar,
        Contact,
        Menu
    },
    computed:{
      ...mapState('setting', ['data'])
    }
    
    
}
</script>

<style lang="less" scoped>
  .site-aside-container{
    width: 100%;
    height: 100%;
    padding: 20px 0;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    background: #272727;
    .avatar{
      display: flex;
      justify-content: center;
    }
    p{
      color: #555;
      font-size: 12px;
      margin-top: 20px;
    }
  }
</style>