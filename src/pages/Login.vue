<template>
    <el-form ref="form" class="login-container" :model="form" :rules="rules" label-width="80px">
        <h3 class="login_title">登录页面</h3>
        <el-form-item label="用户名:" prop="username">
            <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="subimt" style="margin-left: 30px;margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import  Mock  from 'mockjs';
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:'Login',
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        subimt(){
            // tooken信息
            // const tooken = Mock.Random.guid()   //模拟随机数
            // 将tooken存入cookie用于不同页面直接的通信，在这之前可以用网页存储
            // Cookie.set('tooken',tooken)

            //校验
            this.$refs.form.validate((valid)=>{
                if(valid){
                    // 将账号密码发送给后端
                    getMenu({params:this.form}).then(({data})=>{
                        // console.log(data);
                        if(data.code===2000){
                            Cookie.set('tooken',data.tooken)    //获取tooken登录凭证
                            this.$store.commit('tab/setMenu',data.menu)
                            this.$store.commit('tab/addMenu',this.$router)
                            // console.log(this.$router);
                            // 跳转home页
                            this.$router.push({name:'Home'})
                        }
                        else{
                            this.$message.error('账号或者密码错误！');
                        }
                    })
                }
            }
                
            )
        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        width: 300px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        // box-sizing: border-box;
        .el-intput{
            width: 198px;
        }
        .login_title{
            text-align: center;
            margin-bottom: 30px;
            color: #505458
        }
    }
</style>