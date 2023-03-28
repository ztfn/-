<template>
    <el-container>
      <!-- 左侧导航栏 -->
    <el-aside width="auto">   
        <CommonAside />
    </el-aside>
    <el-container>
      <!-- 上方标题栏 -->
      <el-header>
        <CommonHeader />
      </el-header>
      <!-- tag标签栏 -->
      <CommonTags />
      <!-- 下方内容展示栏 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTags from '@/components/CommonTags.vue';
export default {
    name:'Main',
    components:{
        CommonAside,
        CommonHeader,
        CommonTags
    }
}
</script>

<style>
  .el-header{
    padding: 0;
  }
  .el-container{
    height: 100vh;
  }
</style>