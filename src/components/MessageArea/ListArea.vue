<template>
    <ul class="list-area-container">
      <li v-for="item in list" :key="item.id">
        <Avatar class="avatar" :url="item.avatar" :height="44" :width="44"/>
        <div class="detail">
          <div class="profile">
            <span class="name">{{item.nickname}}</span>
            <span class="time">{{formate(item.createDate,true)}}</span>
          </div>
          <p class="desc">{{item.content}}</p>
        </div>
      </li>
    </ul>
</template>

<script>
import formate from "@/utills/formate"
import Avatar from "../Avatar"
export default {
  props:{
    list:{
        type:Array,
        default: ()=>{[]}
    },
  },
  components:{
    Avatar
  },
  methods:{
    formate,
  }
}
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
  .title{
    margin-bottom: 20px;
  }
  li{
    border-bottom: 1px solid #ccc;
    display: flex;
    margin: 15px 0;
    // align-items: center;
    .avatar{
      margin-right: 15px;
    }
  }
  .detail{
    flex: 1 1 auto;
    padding-right: 15px;
  }
  .profile{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name{
    font-size: 20px;
    color: darken(@success, 10%);
    // margin-bottom: 10px;
  }
  .time{
    font-size: 12px;
    color: @gray;
  }
  .desc{
    margin: 10px 0 20px 0;
    color: @words;
  }
</style>

