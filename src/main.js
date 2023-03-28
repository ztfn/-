import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//完全引入，引入全部的element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入router路由
import router from './router'

// 引入vuex
import store from './store';

//引入mock接口来应对前端对后端的访问
import './api/mock'

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('tab/addMenu', router)
  }
}).$mount('#app')
