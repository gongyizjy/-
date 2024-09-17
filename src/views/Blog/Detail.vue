<template>
    <Layout>
        <div ref="mainContainer" class="main-container" v-loading='isloading'>
            <BlogDetail :blog="data" v-if="data"/>
            <BlogComment v-if="!isloading"/>
        </div>
        <template #right>
          <div class="right" v-loading='isloading'>
            <BlogToc :toc="data.toc" v-if="data"/>
          </div>
        </template>
    </Layout>
</template>

<script>
import title from '@/utills/titleControl'
import setScroll from "@/mixins/setScroll.js"
import BlogComment from "./components/BlogComment"
import Layout from '@/components/Layout/'
import BlogDetail from './components/BlogDetail'
import BlogToc from './components/BlogToc'
import {getDetail} from '@/api/blog'
import Data from '@/mixins/fetchData'
export default {
  mixins:[Data(null), setScroll('mainContainer')],
  components:{
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
    
  },
  data(){
    return{
      isShow: false,
    }
  },
  methods:{
    async fetchData(){
      //获取文章
        const result = await getDetail(this.$route.params.blogId)
        console.log(this.$route);
        if(!result){
          this.$router.push('/404')
          return
        }
        if(result.title){
          title.setRouteTitle(result.title)
        }
        // const html = new DOMParser().parseFromString(result.htmlContent, 'text/html').body
        // console.log(html);
        return result
    },
    
  },
  updated(){
    const $hash = location.hash
    location.hash = ''
    setTimeout(() => {
      location.hash = $hash
    }, 50);
  }
}
</script>

<style lang='less' scoped>
  .main-container{
    width: 100%;
    height: 100%;
    padding: 20px;
    scroll-behavior: smooth;
    overflow-y: scroll;
    position: relative;
  }
  .right{
    width: 300px;
    height: 100%;
    position: relative;
  }
</style>