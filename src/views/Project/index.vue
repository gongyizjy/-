<template>
    <div class="project-container" ref="mainContainer" v-loading="loading">
      <div class="project-item" v-for="item in data" :key="item.id">
        <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
            :target="item.url? '_blank' : '_self'">
          <img  class="thumb" v-lazy="item.thumb">
        </a>
        <div class="info">
          <h2>
            <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
            :target="item.url? '_blank' : '_self'">
              {{item.name}}
            </a>
          </h2>
          <a :href="item.github" target="_blank" v-if="item.github" class="github">github</a>
          <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { mapState } from 'vuex';
import mainScroll from '@/mixins/setScroll'
  export default {
    mixins:[mainScroll('mainContainer')],
    created(){
      this.$store.dispatch('project/fetchData')
    },
    computed: {
      ...mapState('project', ['loading', 'data'])
    }
  }
  </script>
  
  <style lang="less" scoped>
  @import '~@/style/var.less';
  .project-container{
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    scroll-behavior: smooth;
    position: relative;
  }
  .project-item{
    transition: all 0.3s;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    &:hover{
      box-shadow: -1px 1px 5px #000;
      transform: scale(1.01) translate(3px, -3px);
      color: inherit;
    }
    .thumb{
      width: 250px;
      min-height: 150px;
      flex: 0 0 auto;
      object-fit: cover;
      border-radius: 5px;
      margin-right: 15px;
    }
    .info{
      line-height: 1.7;
      flex: 1 1 auto;
      h2{
        margin: 0;
      }
    }
    .github{
      font-size: 12px;
      color: #ccc;
      &:hover{
        color: @primary;
      }
    }
  }
  </style>