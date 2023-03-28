<template>
  <div class="tabs">
    <el-tag
        v-for="(tag,index) of menuData"
        :key="tag.name"
        :closable="tag.name !=='Home'"
        :effect="$route.name === tag.name?'dark':'plain'"
        @click="chnageMenu(tag)"
        @close="handleClose(tag,index)"
        size="small"
        >
        {{tag.label}}
    </el-tag>   
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'CommonTags',
    computed:{
        ...mapState('tab',['menuData'])
    },
    methods:{
        //点击tag跳转到相应的路由的功能
        chnageMenu(item){
            this.$router.push({
                path:item.path
            })
        },
        //关闭标签实现的功能
        handleClose(item,index){
            const length = this.menuData.length-1   //当前已开启标签的最大索引
            //删除标签
            this.$store.commit('tab/closeTag',item)
            //删除标签后的路由跳转功能
            if(this.$route.name !== item.name){  //删除的是非当前路由
                return
            }
            else if(index === length){      //关闭的是当前开启的路由且是最后一个
                this.$router.push({
                    //路由往前进一位
                    path:this.menuData[index-1].path
                })
            }
            else if(index<length){      //关闭的是中间的标签
                this.$router.push({
                    //路由往后退一位
                    path:this.menuData[index].path
                })
            } 
        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;    //添加鼠标悬浮小手标志
        }
    }
</style>