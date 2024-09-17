<template>
  <div class="empty-container">
    <i class="iconfont iconempty"></i>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:'无数据'
        }
    }
}
</script>

<style lang="less" scoped>
    @import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';
    @import '~@/style/var.less';
    @import '~@/style/common.less';
    .empty-container{
        .self-container();
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
            color: @gray;
            font-size: 100px;
            margin-bottom: 15px;
        }
        p{
            color: @lightWords;
            font-size: 16px;
            font-weight: bold;
        }
    }

</style>