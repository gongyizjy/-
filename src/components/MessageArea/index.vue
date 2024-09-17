<template>
  <div class="message-area-container">
    <!-- //加载表单 -->
    <FormArea v-on="$listeners"></FormArea>
    <h3 class="title">{{title}} <span>({{subTitle}})</span></h3>
    <!-- //加载评论列表 -->
    <ListArea :title="title" :subTitle="subTitle" :list="list" :isListLoading="isListLoading"></ListArea>
    <!-- //加载动画 -->
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import FormArea from './FormArea.vue';
import ListArea from './ListArea.vue';
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        subTitle:{
            type:String,
            default:''
        },
        list:{
            type:Array,
            default: ()=>{[]}
        },
        isListLoading:{
            type:Boolean,
            default: false
        }
    },
    components:{
        FormArea,
        ListArea
    }
}
</script>

<style lang="less" scoped>
    .title{
        margin-bottom: 20px;
    }
    .loading{
        position: relative;
        height: 100px;
    }
</style>

