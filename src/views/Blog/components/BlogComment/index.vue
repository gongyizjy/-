<template>
  <div class="blog-comment-container">
    <MessageArea @submit="handleSubmit" title="评论列表" :subTitle="''+ data.total" :list="data.rows" :isListLoading="isloading"/>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea"
import {getCommentPage, postComment} from "@/api/blog.js"
import Data from "@/mixins/fetchData"
export default {
  mixins:[Data({total:0,rows:[]})],
  data(){
    return {
      page:1,
      limit:10
    }
  },
  components:{
      MessageArea
  },
  computed:{
    hasMore(){
      // console.log(this.data.rows.length);
      return  this.data.rows.length < this.data.total 
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll)
    // window.fetchMoreData = this.fetchMoreData
  },
  destroyed(){
    // console.log('我销毁了');
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  methods:{
    async fetchData(){
      //加载评论
      const result = await getCommentPage(this.page, this.limit,this.$route.params.blogId)
      // console.log(result.rows);
      return result
    },
    async handleSubmit(formData, callback){
      const result = await postComment({
        blogId:this.$route.params.blogId,
        ...formData
      })
      // console.log(result);
      this.data.rows.unshift(result)
      this.data.total++
      result ? callback('评论成功', 'success') : callback('评论失败', 'error')

    },
    async fetchMoreData(){
      if(!this.hasMore){
        return;
      }
      this.page++
      this.isloading = true
      // const top = dom.getBoundingClientRect().top

      const resp = await getCommentPage(this.page, this.limit,this.$route.params.blogId)
      this.data.rows = this.data.rows.concat(resp.rows)
      this.data.total = resp.total
      this.isloading = false

    },
    handleScroll(dom){
      // console.log(dom);
      // console.log('滚动了');
      if(this.isloading || !dom){
        //目前正在加载
        return;
      }
      
      const range = 100
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)
      if(dec <= range){
        this.fetchMoreData()
      }
    }
  }
}
</script>

<style>

</style>