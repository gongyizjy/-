<template>
  <div class="contact-container">
    <a class="contacy-item" target="_blank" :href="data.github">
      <Icon type="github"/>
      <p class="desc">{{data.githubName}}</p>
    </a>
    <a class="contacy-item" :href="`mailto:${data.mail}`" >
      <Icon type="mail"/>
      <p class="">{{data.mail}}</p>
    </a>
    <a class="contacy-item" :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
      <Icon type="qq"/>
      <p class="">{{data.qq}}</p>
      <div class="scan">
        <img :src="data.qqQrCode" alt="">
      </div>
    </a>
    <a class="contacy-item">
      <Icon type="weixin"/>
      <p class="">{{data.weixin}}</p>
      <div class="scan">
        <img :src="data.weixinQrCode" alt="">
      </div>
    </a>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
    components:{
        Icon
    },
    computed:{
      ...mapState('setting', ['data'])
    }

}
</script>

<style lang="less" scoped>
  @import '~@/style/var.less';
  .contact-container{
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    color: @gray;
  .contacy-item{
    display: flex;
    height: 30px;
    align-items: center;
    cursor: pointer;
    margin: 14px 0;
    position: relative;
    &:hover .scan{
        transform: scaleY(1);
    }
    .desc{
      font-size: 14px;
    }
    .scan{
      bottom: 35px;
      left: 0;
      transform: translateX(20%);
      transform: scaleY(0) ;
      transform-origin: center bottom;
      padding: 10px 15px;
      background: #fff;
      border-radius: 5px;
      position: absolute;
      transition: all 0.5s;
      cursor: auto;
      &::after{
        content: '';
        width: 8px;
        height: 8px;
        background: #fff;
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg) ;
      }
      img{
        width: 150px;
        height: 150px;
      }
    }
    &:hover{
      color: @primary;
    }
    .iconfont{
      font-size: 26px;
      margin: 0 5px 0 15px;
      &.iconweixin{
      font-size: 32px;
      text-indent: -3px;
    }
    }
    
   }
  }

</style>

