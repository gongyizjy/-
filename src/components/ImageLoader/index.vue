4<template>
  <div class="imageLoader-container">
    <img v-if="!everythingDone" :src="placeholder" class="placeholder">
    <img @load="changeImage" class="src" :src="src" :style="{opacity:getLoaderStatus,transition:`${duration}ms`}" >
  </div>
</template>

<script>

export default {
    data(){
        return{
            isLoader:false,
            everythingDone: false //是否全部加载出来了
        }
    },
    computed:{
        getLoaderStatus(){
            return this.isLoader ? 1 : 0
        },

    }
    ,
    props:{
        src:{
            type: String,
            required: true
        },
        placeholder:{
             type: String,
             required: true
        },
        duration:{
            type: Number,
            default: 500
        }
    },
    methods:{
        changeImage(){
            this.isLoader = true
            // console.log('图片加载完了');
            setTimeout(() => {
                this.everythingDone = true
                this.$emit('load')
            }, this.duration);
        }
    }
}
</script>

<style lang="less" scoped>
    .imageLoader-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        img{
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
        }
        .placeholder{
            filter: blur(3vw);
        }
        
    }
</style>

