<template>
  <div class="blog-category-container" v-loading="isloading">
    <h2 v-show="data.length">文章分类</h2>
    <SubList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import SubList from "../SubList"
import Data from "@/mixins/fetchData.js"
import { getBlogType } from "@/api/blog"
export default {
  mixins:[Data([])],
  components:{
    SubList
  },
  computed:{
    categoryId(){
      return (this.$route.params.categoryId || -1)
    },
    limit(){
      return +(this.$route.query.limit || 10)
    },
    list(){
      if(!this.data.length){
        return;
      }
      const totalArticleCount = this.data.reduce((prev, next) => prev + +next.articleCount, 0)
      const result = [
        {name:'全部', id:-1,articleCount:totalArticleCount},
        ...this.data
      ]
      return result.map(item => {
        return{
          ...item,
          isSelected: item.id === this.categoryId,
          aside: `${item.articleCount}篇`
        }

      })
    }
    
  },
  methods:{
    async fetchData(){
      const result = await getBlogType()
      return result
    },
    handleSelect(item){
      // console.log(item);
      const query = {
        page:1,
        limit: this.limit
      }
      if(item.id === -1){
        this.$router.push({
          name:'blog',
          query
        })
      }else{
        this.$router.push({
          name:'categoryBlog',
          query,
          params:{
            categoryId:item.id
          }
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.blog-category-container{
  width: 300px;
  height: 100%;
  padding: 20px;
  position: relative;
  h2{
    font-size: 1em;
    letter-spacing: 2px;
  }
}
</style>