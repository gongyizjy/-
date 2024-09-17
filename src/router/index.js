//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import title from '@/utills/titleControl'
if(!window.VueRouter){
  Vue.use(VueRouter)//使用一个vue插件
}

const router = new VueRouter({
  //配置
  routes,
  mode:'history',
})

router.afterEach((to,from)=>{
  // console.log(to.meta.title);
  if(to.meta.title){
    title.setRouteTitle(to.meta.title)
  }
})
export default router
