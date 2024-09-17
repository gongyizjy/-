<template>
  <div class="carouselitem-container"  ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="carousel-img" ref="img" :style="imagePosition">
      <ImageLoader
        @load="this.showWords"
        :src="image.bigImg"
        :placeholder="image.midImg"
      />
    </div>
    <p class="title" ref="title">{{ image.title }}</p>
    <p class="desc" ref="desc">{{ image.description }}</p>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader'
export default {
  data(){
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层容器的尺寸
      innerSize: null, //内层容器的尺寸
      mouseX:0, //鼠标的横坐标
      mouseY:0 ////鼠标的纵坐标
    }
  },
  components:{
    ImageLoader
  },
  computed:{
    imagePosition(){
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.containerSize.width - this.innerSize.width 
      const extraHeight = this.containerSize.height - this.innerSize.height
      const left = this.mouseX * extraWidth / this.containerSize.width
      const top = this.mouseY * extraHeight / this.containerSize.height
      // console.log(left, top);
      return{
          transform:`translate(${left}px, ${top}px)`
      }
    },
    center(){
     return{
      x: this.containerSize.width / 2,
      y: this.containerSize.height / 2
     }
    }
  },
  props:['image'],
  mounted(){
    this.titleWidth = this.$refs.title.clientWidth
    this.descWidth = this.$refs.desc.clientWidth
    this.resize()
    window.addEventListener('resize', this.resize)
    this.mouseX = this.center.x
    this.mouseY = this.center.y
  },
  destroyed(){
    window.removeEventListener('resize', this.resize)
  },
  methods:{
    showWords(){
        this.$refs.title.style.width = 0
        this.$refs.title.style.opacity = 1
          //强制回流
        this.$refs.title.clientWidth
        this.$refs.title.style.width = this.titleWidth + "px";

        this.$refs.desc.style.width = 0
        this.$refs.desc.style.opacity = 1
          //强制回流
        this.$refs.desc.clientWidth
        this.$refs.desc.style.width = this.descWidth + "px";
    },
    resize(){
      this.containerSize = { //获取尺寸
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      }
      this.innerSize = { //获取尺寸
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight
      }
    },
    handleMouseMove(e){
      const left = this.$refs.container.getBoundingClientRect().left
      const top = this.$refs.container.getBoundingClientRect().top
      this.mouseX = e.clientX - left
      this.mouseY = e.clientY - top
    },
    handleMouseLeave(){
      this.mouseX = this.center.x
      this.mouseY = this.center.y
    }
  }
}
</script>

<style lang="less" scoped>
.carouselitem-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
}
.carousel-img{
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transition: 0.3s;
}
.desc,.title{
  position: absolute;
  left: 20px;
  text-shadow: 1px 0 1px rgba(0, 0, 0, .3),-1px 0 1px rgba(0, 0, 0, .3),
              0px 1px 1px rgba(0, 0, 0, .3),0px -1px 1px rgba(0, 0, 0, .3);
  letter-spacing: 5px;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;

}
.title{
  top: calc(50% - 20px);
  font-size: 2em;
  transition: 1s;
}
.desc{
  top: calc(50% + 40px);
  font-size: 1.2em;
  transition: 2s 1s;
}
</style>