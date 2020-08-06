<!--  -->
<template>
<div class='adminUser'>
    <!-- <Public></Public> -->
    <div class="adminUsermain">
        <el-row>
        <!-- usertitle -->
        <el-col><div class="grid-content bg-purple-dark usertitle">管理员列表</div></el-col>

        <!-- 中间位置 实现添加搜索管理员功能 usermiddle -->
        <el-col>
            <div class="grid-content bg-purple-dark usermiddle">
                <!-- 添加管理员按钮 -->
                <el-button type="primary" plain @click="adduser">添加管理员</el-button>
                <!-- 搜索管理员功能 -->
                <div class="add-right">
                    <!-- 输入管理员名字搜索 含v-model -->
                    <el-input class="middleinput" placeholder="管理员用户名" clearable 
                    v-model="queryInfo.query">
                    </el-input>
                    <!-- 搜索按钮 需添加功能 -->
                    <el-button type="primary" class="middlebutton" @click="search">搜索</el-button>
                </div>
            </div>
        </el-col>
        <!-- 添加搜索功能结束 -->

        <!-- 显示管理员表格 usertable -->
        <el-col >
            <div class="grid-content bg-purple-dark usertable">
                <el-table border style="width: 100%"
                    :data="list">
                    <el-table-column label="ID" align="center" width="60px"
                        prop="id">
                    </el-table-column>
                    <el-table-column label="管理员名称" align="center"
                        prop="user_name">
                    </el-table-column>
                    <el-table-column label="管理员真实姓名" align="center"
                        prop="real_name">
                    </el-table-column>
                    <el-table-column label="管理员角色" align="center"
                        prop="role.role_name">
                    </el-table-column>
                    <el-table-column label="最后登录IP" align="center"
                        prop="last_login_ip">
                    </el-table-column>
                    <el-table-column label="最后登录时间" align="center"
                        prop="last_login_time">
                    </el-table-column>
                    <el-table-column label="状态" align="center" width="80px"
                        prop="date">
                        <!-- 使用slot-scope中的.row获取这一行的数据 进行状态转换 -->
                        <template slot-scope="scope">
                            <!-- 标签 -->
                            <el-tag type="success" effect="dark" v-if="scope.row.status==1">正常</el-tag>
                            <el-tag type="warning" effect="dark" v-if="scope.row.status==0">封停</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editor(scope.row)" size="mini">编辑</el-button>
                            <el-button type="danger" @click="open(scope.$index,scope.row)" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
        <!-- 显示管理员表格结束 -->

        <!-- 底部 分页栏开始 -->
        <!-- :current-page="currentPage4" -->
        <el-col>
            <div class="grid-content bg-purple-dark">
                <div class="block usersearch">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10,25,50,100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-col>
        <!-- 底部 分页兰结束 -->

        <!-- 修改用户对话框 -->
        <el-dialog title="编辑管理员" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm editorform"
                >
                <!-- 根据选中数据变换 -->
                <el-form-item label="管理员账号" prop="name">
                    <el-input v-model="ruleForm.user_name"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="设置角色" prop="region">
                    <el-select placeholder="请选择"  class="editorinput" v-model="ruleForm.role_id">
                    <!-- 循环渲染数据（必须 因为是动态的数据 且要按数据输出） -->
                    <el-option v-for="(role,i) in roles"
                        :key="i"
                        :label="role.role_name"
                        :value="role.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="不填不修改"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="relname">
                    <el-input v-model="ruleForm.real_name"></el-input>
                </el-form-item>

                <!-- 设置一个循环 -->
                <el-form-item label="是否启用">
                    <el-radio-group v-model="ruleForm.status">
                    <el-radio border
                        v-for="(la, i) in status"
                        :key="i"
                        :label="i">{{la}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 修改用户对话框结束 -->
        </el-row>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { mapMutations } from 'vuex'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
},
data() {
//这里存放数据
return {
    // 搜索栏数据
    input: '',
    // 表格数据
    list:[],
    currentPage1: 5,
    pageSize:"",
    total:0,
    pageSize:10,
    queryInfo: {
        query:"",
    },
    ruleForm: {
            // 姓名
            user_name: "",
            // 是否启用
            status: 0,
            // 密码
            password: "",
            // 角色id
            role_id:1,
            // 账户id
            id:0,
            // 真实姓名
            real_name:"",
        },
        status:{},
        roles: {},
        // disabled:true,
        // 表单规则
        rules: {
            name: [
            // { required: true, message: "必填项", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            relname: [
            // { required: true, message: "必填项", trigger: "change" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            region: [
            // { required: true, message: "必选项", trigger: "blur" },
            ],
            password: [
            { min:6, message: "最少输入六位数", trigger: "blur" },
            ],
        },
        dialogFormVisible: false,
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    handleSizeChange(pageSize) {
    console.log(`每页 ${pageSize} 条`);
    },
    handleCurrentChange(page) {
    console.log(`当前页: ${page}`);
    },
    // 跳转页面
    adduser:function() {
        this.$router.push('/admin/addUser/');
    },
    // userEditer(index,info) {
    //     this.setEditAdmin(info);
    //     // 跳转至更改用户的路径
    //     this.$router.push('/admin/editoruser');
    // },
    // 发起get请求 请求地址 获取管理数据
    getUserList() {
       this.$http.get('/user/index',{params:this.queryInfo}).then(res=> {
        //    console.log(res);
           this.list = res.data.data;
           this.total = res.data.total;
           this.pageSize = res.data.per_page;
           this.page = res.data.current_page;
        //    console.log(this.list);
       }).catch(err => {
           console.log(err);
       })
    },
    // 搜索功能未完成
    search() {
        this.getUserList();
    },

    // 删除功能
    userDelete(info) {
        this.$http.post("/user/userDel",info);
    },
    // 删除弹窗
    open(index,info) {
        // console.log(index);
        // console.log(info);
        this.$confirm('删除管理员将不可恢复', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  
            this.userDelete(info);  
        }).then(res=> {
            this.list.splice(index, 1);
            this.$message({
                type: 'success',
                message: '删除成功!',
            })
            // 当前页面重新刷新
            this.getUserList();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    getRole() {
        this.$http.get("/user/userAdd").then(res=> {
            this.roles = res.data.role;
            this.status = res.data.status;
        })
    },
    // 修改功能数据渲染部分
    editor(row) {
        console.log(row);
        console.log(row.user_name);
        this.ruleForm.user_name = row.user_name;
        this.ruleForm.role_id = row.role_id;
        this.ruleForm.real_name = row.real_name;
        this.ruleForm.status = row.status;
        this.dialogFormVisible = true;
        this.ruleForm.id = row.id;
        // this.getRole();
    },
    // 表单验证  无验证 缺少取消功能
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$http.post("/user/userEdit",this.ruleForm);
            this.dialogFormVisible = false;
            this.getUserList();
        //   跳转页面
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    
    // ...mapMutations({
    //     'setEditAdmin': 'SET_EDIT_ADMIN'
    // })
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getUserList();
    this.getRole();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  lang='less' scoped>
.adminUser {
    height: 100%;
    .adminUsermain {
        .usertitle {
            padding-left: 10px;
            height: 38px;
            margin: 16px 0;
            color: #ccc;
            border-bottom: 1px dashed #ccc;
            }
        .usermiddle {
            padding-bottom: 10px;
            .add-right {
                float:right;
                .middleinput {
                    width: 200px;
                    margin-right: 5px;
                } 
            }
        }
        .usertable {
            margin-bottom: 20px;
        }
        .usersearch {
            float:right;
        }
        .editorform {
            width: 400px;
            .editorinput {
                width:300px;
            }
        }
    }
}
</style>