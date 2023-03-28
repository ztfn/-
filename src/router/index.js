import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
// 引入路由组件
import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall.vue'
import PageOne from '../pages/PageOne.vue'
import PageTwo from '../pages/PageTwo.vue'
import Login from '../pages/Login.vue'

import Cookies from "js-cookie";

const router = new VueRouter({
    routes: [
        {
            name: 'Main',
            path: '/',
            component: Main,
            redirect: '/Home',       //重定向，相当于访问Home

            // 由后端传来的路由列表进行动态创建路由，取缔
            // children: [
            //     {
            //         name: 'Home',
            //         path: 'Home',   //首页
            //         component: Home
            //     },
            //     {
            //         name: 'User',
            //         path: 'User',   //用户管理
            //         component: User
            //     },
            //     {
            //         name: 'Mall',
            //         path: 'Mall',   //商品管理
            //         component: Mall
            //     },
            //     {
            //         name: 'Page1',
            //         path: 'Page1',   //其他1
            //         component: PageOne
            //     },
            //     {
            //         name: 'Page2',
            //         path: 'Page2',   //其他2
            //         component: PageTwo
            //     },
            // ]
        },
        // 登录路由
        {
            name: 'Login',
            path: '/Login',
            component: Login
        }

    ]
})

// 添加全局前置路由守卫
router.beforeEach((to, form, next) => {
    // console.log('前置');
    // 判断tooken是否存在
    const tooken = Cookies.get('tooken')
    //tooken不存在，则说明当前用户未登录，应该跳转至登录页
    if (!tooken && to.name !== 'Login') {
        // console.log('不存在');
        next({ name: 'Login' })
    }
    else if (tooken && to.name === 'Login') {
        // console.log('存在');
        //tooken存在，但去的页面是登录页面，将直接跳转至主页
        next({ name: 'Home' })
    }
    else {
        next()
    }

})
export default router