<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="50%">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select placeholder="请选择性别" v-model="form.sex">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker  type="date" placeholder="选择日期" v-model="form.birth"  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click= "submit">确 定</el-button>
            </span>
        </el-dialog> 
        <div class="manage-header">
            <el-button @click="dialogVisible = true,modalType=0" type="primary">
                +新增
            </el-button>
            <!-- form搜索框 -->
            <el-form :model="userform" :inline="true">
                <el-form-item  >
                    <el-input placeholder="请输入姓名" v-model="userform.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click= "onsubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common">
            <!-- 表格 -->
            <el-table
                stripe
                height="90%"
                :data="tableData"
                style="width: 100%">
                <el-table-column 
                    v-for="(val,key) in tablelable"
                    :key="key"
                    :prop="key"
                    :label="val"
                ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页显示 -->
            <div class="page">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// 表单数据
// {
//     model:'name',
//     label:'姓名',
//     type:'input'
// },
// {
//     model:'age',
//     label:'年龄',
//     type:'input'
// },
// {
//     model:'sex',
//     label:'性别',
//     type:'select',
//     opts:[
//         {
//             label:'男',
//             value:1
//         },
//         {
//             label:'女',
//             value:0
//         },
//     ]
// },
// {
//     model:'birth',
//     label:'出生日期',
//     type:'date'
// },
// {
//     model:'addr',
//     label:'地址',
//     type:'input'
// },
import {getList,addList,updateList,delList } from '../api'
export default {
    name:'User',
    data() {
        return {
            dialogVisible:false,
            // 表单数据
            form: {
                id:'',
                name:'',
                age:'',
                sex:'',
                birth:'',
                addr:''
            },
            // 表单数据校检规则
            rules:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期', trigger: 'change' }
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                
            },
            tableData:[] ,   //列表数据
            tablelable:{
                name:'姓名',
                age:'年龄',
                sex:'性别',
                birth:'出生日期',
                addr:'地址'
            },   //列表数据目录
            modalType:0,     //0表示新增，1表示编辑修改
            total:0,     //表格总条数
            pageData:{  //分页参数
                page:1,     //当前页数
                limit:10    //一页多少个
            },
            userform:{      //搜索的内容
                name:''
            }
        }
    },
    methods:{
        submit(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    console.log('提交成功');
                    // 后续对表单数据的处理，如传后端
                    if(this.modalType === 0){
                        //新增
                        addList(this.form).then(()=>{
                            this.getList1() //重新获取数据
                        })
                    }else{
                        //修改编辑
                        this.form.sex==='男'?1:0
                        updateList(this.form).then(()=>{
                            this.getList1() //重新获取数据
                        })
                    }
                    
                    this.$refs.form.resetFields()       //清空表单 
                    console.log(this.form);
                    // 关闭表单
                    this.dialogVisible = false 
                }else{
                    console.log('提交失败');
                }
            })  //校验是否完成
        },
        handleClose(){      //右上角关闭提示框时触发
            this.$refs.form.resetFields()       //清空表单 
            this.dialogVisible = false

        },
        cancel(){       //点击关闭按钮触发的事件
            this.handleClose
            
        },
        // ,本是调用接口处理后端的数据，index下标，row行内容
        handleEdit(index, row) {    //编辑
            // console.log(index, row);
            // 需要对当前数据进行深拷贝，不然会导致form和row进行关联
            this.form = JSON.parse(JSON.stringify(row))
            this.dialogVisible = true
            this.modalType=1

        },
        handleDelete(index, row) {  //删除
            // console.log(index, row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // 删除操作
                    delList(row).then(()=>{
                        this.getList1()
                    }) 

                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 获取列表
        getList1(){
            getList({params:{...this.userform,...this.pageData}}).then(({data})=>{
            // console.log(data);
            this.tableData = data.pdata.map((val)=>{
                return {...val,sex:val.sex==1?'男':'女'}
            })
            this.total = data.count ||0
        })
        },
        handlePage(val){       //点击页码触发的事件
            // console.log(val);
            this.pageData.page =val
            this.getList1()
        },
        onsubmit(){         //查询功能
            this.getList1() //
        }
    },
    mounted(){
        this.getList1()
    }
}
</script>

<style lang="less" scoped>
    .manage{
        height: 90%;
        .manage-header{
            display: flex;
            justify-content: space-between;    //向左向右靠边
            align-items: center;    //垂直居中
        }
        .common{
            height: calc(100% - 62px);
            position: relative;
            .page{
                position: absolute;
                bottom: 0;
                right: 20px;
            }
        }
    }
</style>