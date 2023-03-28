<template>
  <!-- 首页内容 -->
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/image/斋藤飞鸟.jpeg" alt="">
          <div class="userinfo">
            <div class="name">Admin</div>
            <div class="access">超级管理员</div>
          </div>
        </div>
        <hr>
        <div class="login-info">
          <p>上次登录时间：<span>2023-1-2</span></p>
          <p>上次登录地点：<span>四川</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column v-for="(value,key) in tablelable" 
          :key="key"
          :prop='key'
          :label="value"
          >

          </el-table-column>
          <!-- <el-table-column
            prop="name"
            label="课程">
          </el-table-column>
          <el-table-column
            prop="todaybuy"
            label="今日购买">
          </el-table-column>
          <el-table-column
            prop="monthbuy"
            label="本月购买">
          </el-table-column>
          <el-table-column
            prop="totalbuy"
            label="总购买">
          </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px;">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="datail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
       
      </div>
      <el-card  style="height: 280px;">
        <!-- 折线图 -->
        <div ref="echart1" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="echart2" style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="echart3" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>

</el-row>
</template>

<script>
import { getData } from '@/api';
import axios from 'axios';
import * as echarts from 'echarts'
export default {
    name:'Home',
    data(){
      return{
        tablelable:{
          name:'课程',
          todaybuy:'今日购买',
          monthbuy:'本月购买',
          totalbuy:'总购买'
        },
        tableData:[],
        // tableData:[
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // {
        //   name:'oppo',
        //   todaybuy:100,
        //   monthbuy:300,
        //   totalbuy:800
        // },
        // ],
        countData:[
          {
            name:'今日支付订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'今日收藏订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'今日未支付订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'本月支付订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'本月收藏订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'本月未支付订单',
            value:1234,
            icon:'success',
            color:'#2ec7c9'
          }
        ]
      }
    },
    mounted(){
      getData().then((respon)=>{
        console.log(respon.data);
        this.tableData = respon.data.tableData  //左下角展示数据
        const  zhexian = respon.data.zhexian
        // console.log(zhexian);
        // console.log(Object.keys(zhexian));
        // 线型图
        // 基于准备好的dom,初始化echarts实例
        const echart1 = echarts.init(this.$refs.echart1)
        // 配置图表的配置项和数据
        const option = {
          tooltip: {},
          legend:{
            data:Object.keys(zhexian)
          },
          xAxis:{
            data:Object.keys(zhexian['2023-1-1'])
          },
          yAxis: {},
          series:[]
        }
        for(let key in zhexian){
          // console.log(zhexian[key]);
          option.series.push({
            name:key,
            data:Object.values(zhexian[key]),
            type:'line'
          })
        }
        // console.log(option);
        //根据配置项显示图表
        echart1.setOption(option)
        
        // 柱状图
        const zhuzhuang = respon.data.zhuzhuang
        // 基于准备好的dom,初始化echarts实例
        const echart2 = echarts.init(this.$refs.echart2)
        // 配置图表的配置项和数据
        const echart2option = {
          tooltip: {},
          legend:{
            data:['新增用户','活跃用户']
          },
          xAxis:{
            data:zhuzhuang.map(item=>item.date)
          },
          yAxis: {},
          series:[
            {
              name:'新增用户',
              data:zhuzhuang.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:zhuzhuang.map(item=>item.active),
              type:'bar'
            }
          ]
        }
        //根据配置项显示图表
        echart2.setOption(echart2option)
        
        // 饼状图
        const bingzhuang = respon.data.bingzhuang
        // 基于准备好的dom,初始化echarts实例
        const echart3 = echarts.init(this.$refs.echart3)
        // 配置图表的配置项和数据
        const echart3option = {
          tooltip: {},
          series:[
            {
              type:'pie',
              data:bingzhuang
            }
          ]
        }
        //根据配置项显示图表
        echart3.setOption(echart3option)
        
      })
      // axios.get('api/home/getData').then((data)=>{
      //   console.log(data);
      // })
      


    }
}
</script>

<style lang="less" scoped>
.box-card{
  .user{
    display: flex;
    align-items: center;  //垂直居中
    img{
      margin-right: 40px;
      width: 150px; 
      height: 150px;
      border-radius: 50%; 
    }
    .userinfo{
      .name{
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access{
        color: #999999;
      }
    }
    margin-bottom: 20px;
  }
  .login-info{
    p{
      font-size: 14px;
      line-height: 28px;
      color: #999999;
      span{
        margin-left: 50px;
      }
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 20px;
    .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color:#fff;
  }
  .datail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      text-align: center;
      color: #999999 ;
    }
  }
  }
  
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between; //左右贴边
  .el-card{
    width: 48%;
  } 
}
</style>