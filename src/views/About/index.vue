<template>
    <div class="about-container" v-loading="loading || !srcLoading">
      <iframe v-if="data" class="about-content" :src="data" frameborder="0" @load="srcLoading=true"></iframe>
    </div>
  </template>
  
  <script>
import { mapState } from 'vuex';

  export default {
    created(){
      this.$store.dispatch('about/fetchData');
    },
    computed:{
      ...mapState('about', ['loading', 'data'])
    },
    data(){
      return {
        srcLoading: false
      }
    }
  }
  </script>
  
  <style>
  .about-container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
  .about-content{
    width: 100%;
    height: 100%;
    display: block;
  }
  </style>