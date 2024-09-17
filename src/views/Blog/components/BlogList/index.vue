<template>
  <div class="blog-list-container" v-loading='isloading' ref="mainContainer">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link :to="{name:'blogDetail', params:{
            blogId:item.id,
          }}">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title">
          </router-link>
        </div>
        <div class="main">
          <routerLink :to="{name:'blogDetail', params:{
            blogId:item.id,
          }}">
            <h2>{{item.title}}</h2>
          </routerLink>
          <div class="aside">
            <span>日期：{{formate(item.createDate)}}</span>
            <span>浏览：{{item.scanNumber}}</span>
            <span>评论{{item.commentNumber}}</span>
            <router-link :to="{name:'categoryBlog', params:{
              categoryId:item.category.id,
            }}" class="">分类 {{item.category.name}}</router-link>
          </div>
          <div class="desc">
            {{item.description}}
          </div>
        </div>
      </li>
    </ul>
    <Pager class="pager" @pageChange="handlePageChange" :total='data.total' :current="routeInfo.page" :limit="routeInfo.limit" :visibleNum="10"/>
    <Empty v-if="data.rows.length === 0 && !isloading"/>
  </div>
</template>

<script>
import setScroll from "@/mixins/setScroll.js"
import Pager from "@/components/Pager"
import { getBlog } from '@/api/blog'
import Data from "@/mixins/fetchData.js"
import formate from '@/utills/formate'
import Empty from '@/components/Empty'
export default {
  components:{
    Pager,
    Empty
  },
  mixins:[Data({total:0, rows:[]}), setScroll('mainContainer')],
  methods:{
    formate,
    async fetchData(){
      console.log(this.routeInfo);
      const reuslt =  await getBlog(this.routeInfo.page,this.routeInfo.limit,this.routeInfo.categoryId)
      return reuslt
    },
    handlePageChange(newPage){
      // console.log(newPage);
      //一个是查询全部的
      if(this.routeInfo.categoryId === -1){
        this.$router.push({//控制路由的变化
          name:'blog',
          query:{
            page:newPage,
            limit:this.routeInfo.limit
          }
        })
      }else{
        this.$router.push({
          name:"categoryBlog",
          params:{
            categoryId:this.routeInfo.categoryId
          },
          query:{
            page:newPage,
            limit:this.routeInfo.limit
          }
        })
      }
      //查询单个分类的参数
    },
  },
  computed:{
    routeInfo(){ //获取当前的路由信息
      const categoryId = (this.$route.params.categoryId || -1)
      const page = +(this.$route.query.page || 1)
      const limit = +(this.$route.query.limit || 10)
      // console.log(page,limit,categoryId,);
      return {
        categoryId,
        page,
        limit
      }
    }
  },
  watch:{
    $route:{
      async handler(newVal, oldVal){
        this.isloading = true
        this.$refs.mainContainer.scrollTop = 0
        // console.log('路由改变了');
        this.data = await this.fetchData(this.routeInfo.page,this.routeInfo.limit,this.routeInfo.category)
        // console.log(this.fetchData);
        this.isloading = false
      }
    }
  }
  // created(){
  //   console.log(this.$route);
  // }
}
</script>

<style lang='less' scoped>
@import "~@/style/var.less";
.blog-list-container{
  position: relative;
  line-height: 1.7;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding: 20px;
  scroll-behavior: smooth;
  li{
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid @gray;
    // align-items: center;
    .thumb{
      flex: 0 0 auto;
      margin-right: 15px;
      width: 200px;
      height: 150px;
      img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
    }
    .main{
      flex: 1 1 auto;
    }
    .aside{
      font-size: 12px;
      color: @gray;
      span{
        margin-right: 15px;
      }
    }
    .desc{
      margin: 15px 0;
      font-size: 14px;
    }
  }
}

</style>