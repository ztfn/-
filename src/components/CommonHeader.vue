<template>
  <div class="header-container">
    <div class="l-content">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <!-- <span class="text">首页</span> -->
        <el-breadcrumb separator="/" style="margin-left: 20px;">
            <el-breadcrumb-item v-for="item in menuData" :key="item.name" :to="{ path: item.path }" style="color: #fff;">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>    
    </div>
    <div class="r-content">
        <el-dropdown  @command="handleClick">
            <span class="el-dropdown-link">
                <img class='user' src="../assets/image/斋藤飞鸟.jpeg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
    </div> 
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';

import Cookie from 'js-cookie'
export default {
    name:'CommonHeader',
    methods:{
        // handleMenu(){
        //     this.$store.commit('collapseMenu')
        // }
        ...mapMutations('tab',{handleMenu:'collapseMenu'}),

        handleClick(command){
            if(command === 'logout'){
                // console.log('登出');
                // 清除tooken
                Cookie.remove('tooken')
                //清除路由列表
                Cookie.remove('menu')
                this.$router.push({name:'Login'})
            }
        }
    },
    computed:{
        ...mapState('tab',['menuData'])
    }
}
</script>

<style lang="less" scoped>
    .header-container{
        padding: 0 20px;
        background: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .l-content{
            display: flex;
            align-items: center;//纵轴居中
            /deep/.el-breadcrumb__item{     //deep样式穿刺!!!
                .el-breadcrumb__inner{
                    font-weight: normal;
                    &.is-link {    //满足两个class才有的样式
                        color: #666;
                    }
                }
                &:last-child{
                    .el-breadcrumb__inner{
                        color: #fff;
                    }
                }
            }
        }
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>