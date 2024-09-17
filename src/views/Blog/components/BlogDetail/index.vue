<template>
  <div class="blog-detail-container">
    <div class="head">
        <h1 class="title">{{blog.title}}</h1>
        <div class="aside">
            <span>时间：{{formate(blog.createDate)}}</span>
            <span>浏览{{blog.scanNumber}}</span>
            <a href="#form-comment">评论：{{blog.commentNumber}}</a>
            <router-link :to="{
                name:'categoryBlog',
                params:{
                    categoryId:blog.category.id
                }
            }">{{blog.category.name}}</router-link>
        </div>
    </div>
    <div class="body markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script>
import "highlight.js/styles/github.css";
import formate from '@/utills/formate'

export default {
    props:{
        blog:{
            type: Object
        }
    },
    methods:{
        formate
    }
}
</script>

<style lang='less' scoped>
@import '~@/style/var.less';
@import '~@/style/markdown.css';
.blog-detail-container{
    width: 100%;
    min-height: 100%;
}
.aside{
    margin: 1em 0;
}
span,a{
    font-size: 12px;
    margin-right: 15px;
    color: @gray;
}
a:hover{
    color: @primary;
}

</style>