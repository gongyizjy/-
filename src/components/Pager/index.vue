<template>
    <div class="pager-container" v-if="pageNumber > 1">
      <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
      <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>
      <a @click="handleClick(item)" v-for="(item, i) in pageNum" :key="i" :class="{active: item === current }">{{ item }}</a>
      <a @click="handleClick(current + 1)" :class="{disabled: current === pageNumber}">&gt;&gt;</a>
      <a @click="handleClick(pageNumber)" :class="{disabled: current === pageNumber}">&gt;&gt;|</a>
    </div>
  </template>
  
  <script>
  export default {
    props:{
      current:{
        type:Number,
        default:1
      },
      total:{
        type:Number,
        default:0
      },
      limit:{
        type:Number,
        default:10
      },
      visibleNum:{//页码数
        type:Number,
        default:10
      }
    },
    computed:{
      pageNumber(){
        return Math.ceil(this.total / this.limit)
      },
      visibleMin(){
        let min = Math.floor(this.current - this.visibleNum / 2)
        min < 1 && (min = 1)
        return min
      },
      visibleMax(){
        let max = this.visibleMin + this.visibleNum - 1
        max > this.pageNumber && (max = this.pageNumber)
        return max
      },
      pageNum(){
        let arr = []
        for (let i = this.visibleMin; i <= this.visibleMax; i++) {
          arr.push(i)
        }
        return arr
      }
  
    },
    methods:{
      handleClick(newPage){
        //抛出一个事件
        // console.log(newPage);
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > this.pageNumber) {
          newPage = this.pageNumber
        }
        if (newPage === this.current) {
          return;
        }
        this.$emit('pageChange', newPage)
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    @import  '~@/style/var.less';
    .pager-container{
      display: flex;
      margin: 15px 0;
      justify-content: center;
      a{
        color: @primary;
        margin: 0 5px;
        padding: 0 5px;
        cursor: pointer;
        &.disabled{
          color: @lightWords;
          cursor: not-allowed;
        }
        &.active{
          color: @words;
          font-weight: bold;
          cursor: auto;
        }
        
      }
     
    }
  </style>