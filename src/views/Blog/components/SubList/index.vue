<template>
  <ul class="sub-list-container" >
    <li v-for="item in list" :key="item.id">
        <span :class="{active: item.isSelected}"  @click="handleClick(item)">{{ item.name }}</span>
        <span :class="{active: item.isSelected}" @click="handleClick(item)">{{ item.aside }}</span>
        <SubList :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
export default {
    name:'SubList',
    props:{
        list:{
            //属性要求是一个数组或者是一个对象时要用一个函数返回
            type:Array,
            default:() => []
        }
    },
    methods:{
        handleClick(item){
          if (!item.isSelect) {
            // console.log('按下了');
            this.$emit("select", item);
          }
        },
    }
}
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.sub-list-container{
  padding: 0;
  list-style: none;
  .sub-list-container{
    margin-left: 2em;
  }
  li{
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    span{
      cursor: pointer;
      padding: 0 5px;
      &.active{
        color: @warn;
        font-weight: bold;
      }
    }
  }
}
</style>