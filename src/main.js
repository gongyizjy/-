import Vue from 'vue'
import App from './App.vue'
import './style/global.less'
import router from './router'

// import './mock'

import showMessage from './utills/showMessage'
import vLoading from './directives/loading/loading'
import vLazy from './directives/lazy/lazy'
import store from './store'
import './Bus'
import { getBlog } from '@/api/blog'
getBlog(1, 10, '60f900eac7517f1c080b20e1').then((resp) => {
  console.log(resp);
})

// 60f900eac7517f1c080b20e1
//事件总线
// Vue.prototype.$bus = new Vue({});
Vue.directive('loading',vLoading)
Vue.directive('lazy',vLazy)
Vue.prototype.$showMessage = showMessage
store.dispatch('setting/fetchData')
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
