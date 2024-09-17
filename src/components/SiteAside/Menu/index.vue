<template>
  <nav class="menu-container">
    <router-link :exact="item.exact" v-for="item in items" :key="item.link" :to="{name:item.name}" active-class="selected" exact-active-class="">
        <Icon :type="item.icon" class="icon"/>
        <p>{{item.title}}</p>
    </router-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon'

export default {
    components:{
        Icon
    },
    data(){
        return{
            items:[
                {
                    name:"home",
                    title:'主页',
                    icon:'home',
                    exact: true 
                },
                {
                    name:"blog",
                    title:'文章',
                    icon:'blog',
                    exact: false //只要当前路径以link开头，当前菜单是选中的
                },
                {
                    name:"about",
                    title:'关于我',
                    icon:'about',
                    exact: true 
                },
                {
                    name:"project",
                    title:'项目&效果',
                    icon:'code',
                    exact: true 
                },
                {
                    name:"message",
                    title:'留言板',
                    icon:'chat',
                    exact: true 
                }
            ]
        }
    },
    
}
</script>

<style lang="less" scoped>
    @import '~@/style/var.less';
    .menu-container{
        background: transparent;
        color: @gray;
        margin: 24px 0;
        a{
            padding: 0 50px;
            height: 45px;
            align-items: center;
            display: flex;
            .icon{
                margin-right: 5px;
            }
            &:hover{
                color: #fff;
            }
            &.selected{
                background: #2d2d2d;
            }
        }
    }
</style>