<template>
  <el-menu 
    default-active="Home" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"  
  >
    <!-- <h3 v-if="isCollapse">后台</h3>
    <h3 v-else>通用后台管理系统</h3> -->
    <h3>{{ isCollapse? '后台':'通用后台管理系统' }}</h3>

    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name" >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
        <!-- <router-link :to="item.path" slot="title">{{ item.label }}</router-link> -->
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </template>
      <el-menu-item @click="clickMenu(subitem)" v-for="subitem in item.children" :key="subitem.name" :index="subitem.name">{{ subitem.label }}</el-menu-item>
  </el-submenu>


</el-menu>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    name:'CommonAside',
    data() {
      return {
        // isCollapse: false,
        // menuData:[
        //     {
        //         path:'/',
        //         name:'Home',
        //         label:'首页',
        //         icon:'s-home',
        //         url:'Home/Home'
        //     },
        //     {
        //         path:'/Mall',
        //         name:'Mall',
        //         label:'商品管理',
        //         icon:'video-play',
        //         url:'MallManage/MallManage'
        //     },
        //     {
        //         path:'/User',
        //         name:'User',
        //         label:'用户管理',
        //         icon:'user',
        //         url:'UserManage/UserManage'
        //     },
        //     {
        //         label:'其他',
        //         icon:'location',
        //         children:[
        //             {
        //                 path:'/Page1',
        //                 name:'Page1',
        //                 label:'页面1',
        //                 icon:'setting',
        //                 url:'Other/PageOne'
        //             },
        //             {
        //                 path:'/Page2',
        //                 name:'Page2',
        //                 label:'页面2',
        //                 icon:'setting',
        //                 url:'Other/PageTwo'
        //             },
        //         ]
        //     },
        // ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    //   点击菜单
      clickMenu(item){
        //当前页面的路由和跳转的路由不一致时才发生跳转
        //this.$route.path 当前路由的地址
        console.log(this.$route.path);
        console.log(item.path);
        if(this.$route.path !== item.path && !(this.$route.path==='/Home' && item.path==='/')){
            this.$router.push({
              path:item.path
            })
        }
        console.log(this.$route);
        this.$store.commit('tab/selectMenu',item)
      }
    },
    computed:{
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item=>!item.children)
        },
         //有子菜单
        hasChildren(){
            return this.menuData.filter(item=>item.children)
        },
        //采用不同权限下后端传来的需要注册的路由模块来显示页面
        menuData(){
          // 判断当前数据，如果缓存中不存在，将在游览器中找
          return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.meun
        },

        // vuex全局数据
        ...mapState('tab',['isCollapse'])
    }

}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;  //vh占据当前屏幕的百分比
    border-right: none;
    h3{
        text-align: center; 
        color: #fff;
        font-size: 16px;
        line-height: 48px;
        font-weight: 400;
    }
    // a{
    //     text-decoration: none;
    //     color: #fff;
    // }
  }
</style>