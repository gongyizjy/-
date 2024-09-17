<template>
  <div v-show="show" @click="handleClick" class="move-top-container">
    <span>toTop</span>
  </div>
</template>

<script>
export default {
    data(){
        return {
            show: false
        }
    },
    created(){
        this.$bus.$on('mainScroll', this.handleScroll)
    },
    destroyed(){
        this.$bus.$off('mainScroll', this.handleScroll)
    },
    methods: {
        handleScroll(dom){
            if(!dom){
                this.show = false
                return;
            }
            if(dom.scrollTop >= 300){
                this.show = true
            }else{
                this.show = false
            }
        },
        handleClick(){
            this.$bus.$emit('setMainScroll', 0)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
    .move-top-container{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: @primary;
        text-align: center;
        position: fixed;
        bottom: 50px;
        right: 50px;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        line-height: 50px;
        z-index: 999;
    }
</style>

