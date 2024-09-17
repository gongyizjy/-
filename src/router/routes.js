import "nprogress/nprogress.css"
import { done, start, configure } from "nprogress"
import NotFound from "@/views/NotFound.vue"
configure({
    trickleSpeed:20,
    showSpinner:false
})
function progress(fn){
    return async ()=>{
        //加载组件之前
        start()
        const component = await fn()
        //加载完成之后
        done()
        return component
    }
    
}
export default [
    {name:'home',path:'/', component: progress(()=> import(/* webpackChunkName: "home" */ "@/views/Home")),meta:{
        title:'首页'
    }},
    {name:'about',path:'/about', component: progress(()=> import(/* webpackChunkName: "about" */ "@/views/About")),meta:{
        title:'关于我'
    }},
    {name:'blog',path:'/article', component: progress(()=> import(/* webpackChunkName: "blog" */ "@/views/Blog")),meta:{
        title:'文章'
    }},
    {name:'categoryBlog',path:'/article/cate/:categoryId', component: progress(()=> import(/* webpackChunkName: "blog" */ "@/views/Blog")),meta:{
        title:'文章'
    }},
    {name:'blogDetail',path:'/article/:blogId', component: progress(()=> import(/* webpackChunkName: "detail" */ "@/views/Blog/Detail")),meta:{
        title:'文章详情'
    }},
    {name:'project',path:'/project', component: progress(()=> import(/* webpackChunkName: "project" */ "@/views/Project")),meta:{
        title:'项目&效果'
    }},
    {name:'message',path:'/message', component: progress(()=> import(/* webpackChunkName: "message" */ "@/views/Message")),meta:{
        title:'留言板'
    }},
    {
        name:'notFound',
        path:'*',
        component: NotFound
    }
]