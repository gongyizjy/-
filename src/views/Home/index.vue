<template>
  <div class="home-container" ref="container" v-loading="loading">
    <ul class="carousel-container" :style="{marginTop}" @wheel="handelWheel" @transitionend="handelTransitionEnd">
      <li v-for="item in banner" :key="item.id" ><Carouselitem :image="item" /> </li>
    </ul>
    <div @click="switchTo(index - 1)" v-show="index >= 1" class="arrow arrow-up">
      <Icon type="arrowUp" />
    </div>
    <div @click="switchTo(index + 1)" v-show="index < banner.length - 1" class="arrow arrow-down">
      <Icon type="arrowDown" />
    </div>
    <ul class="dots-container">
      <li :class="{active: index === i}" @click="switchTo(i)" v-for="(item,i) in banner" :key="item.id"></li>
    </ul>
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import Carouselitem from './Carouselitem.vue' 
import Icon from '@/components/Icon'

export default {
  components:{
    Icon,
    Carouselitem
  },
  data(){
    return{
      index: 0,
      containerHeight:0,
      isWheel:false,
    }
  },
  created(){
    this.$store.dispatch('banner/fetchBanner')
  },
  mounted(){
    this.containerHeight = this.$refs.container.clientHeight
    window.addEventListener("resize",this.Resize)
  },
  computed:{
    marginTop(){
      return -this.index * this.containerHeight + 'px'
    },
    ...mapState('banner', ['banner', 'loading'])
    
  },
  destroyed(){
    window.removeEventListener("resize",this.Resize)
  },
  methods:{
    switchTo(i){
      this.index = i
    },
    handelWheel(e){
      // console.log(e.deltaY);
      if(this.index <= 0 || this.index >= this.banner.length -1){
        this.isWheel = false
      }
      if(this.isWheel){
        return
      }
      if(e.deltaY > 0){
        this.isWheel = true
        if(this.index < this.banner.length - 1){
          this.index++
        }
      }
      if(e.deltaY < 0){
        this.isWheel = true
        if(this.index > 0){
          this.index--
        }
      }
    },
    handelTransitionEnd(){
      this.isWheel = false
    },
    Resize(){
      this.containerHeight = this.$refs.container.clientHeight
    },

  }
}
</script>

<style lang="less" scroped>
@import '~@/style/var.less';
.home-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  // background: #333;
  color: #fff;
}
.carousel-container{
  width: 100%;
  height: 100%;
  transition: 0.5s;
  li{
    width: 100%;
    height: 100%;
  }
}
.arrow{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: @gray;
  cursor: pointer;
}
.arrow-up{
  top: 25px;
  animation: arrowUp 2s infinite;
}
.arrow-down{
  bottom: 25px;
  animation: arrowDown 2s infinite;
}
.dots-container{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  li{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: @words;
    margin: 8px 0;
    border: 1px solid #fff;
    cursor: pointer;
    &.active{
      background: #fff;
    }
  }
}
@keyframes arrowUp {
  0%{
    transform: translate(-50%,5px);
  }
  50%{
    transform: translate(-50%, -5px);
  }
  100%{
    transform: translate(-50%,5px);
  }
}
@keyframes arrowDown {
  0%{
    transform: translate(-50%,-5px);
  }
  50%{
    transform: translate(-50%, 5px);
  }
  100%{
    transform: translate(-50%,-5px);
  }
}
</style>