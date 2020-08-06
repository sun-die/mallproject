<!--  -->
<template>
  <div class="adminRole">
    <!-- <Public></Public> -->
    <div class="adminRolemain">
      <el-row>
        <!-- usertitle -->
        <el-col>
          <div class="grid-content bg-purple-dark roletitle">角色管理</div>
        </el-col>

        <!-- 中间位置 实现添加搜索管理员功能 rolemiddle -->
        <el-col :span="20">
          <div class="grid-content bg-purple-dark rolemiddle">
            <!-- 添加角色按钮 -->
            <el-button type="primary" plain
            @click="addRolebutton">添加角色</el-button>
          </div>
        </el-col>
        <!-- 添加搜索功能结束 -->

        <!-- 显示角色表格 roletable -->
        <el-col>
          <div class="grid-content bg-purple-dark roletable">
            <el-table :data="list" border style="width: 100%">
              <el-table-column type="index" label="ID" align="center" width="60px" prop="id"></el-table-column>
              <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="500px">
                <!-- 编辑按键 弹出框 -->
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="editorRolebutton(scope.$index,scope.row)">编辑</el-button>
                  <el-button type="success" size="mini" v-if="scope.row.id != 1" @click="power(scope.$index,scope.row)">分配权限</el-button>
                  <el-button type="danger" size="mini" v-if="scope.row.id != 1" @click="deleteRole(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <!-- 显示管理员表格结束 -->

        <!-- 底部 分页栏开始 -->
        <el-col>
          <div class="grid-content bg-purple-dark">
            <div class="block roleselect">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 25, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-col>
        <!-- 底部 分页兰结束 -->

        <!-- 点击添加/编辑角色后的显示框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="80px" status-icon :rules="rules">
            <el-form-item label="角色名" prop="role_name">
              <el-input v-model="form.role_name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加角色显示框结束 -->

      <!-- 点击分配角色显示框 -->
      <el-dialog :visible.sync="showDialogDistribution"
            title="分配权限"
            width="30%"
            class="dialog">
            <el-tree ref="tree"
                :data="tree"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="choseKeys"
                class="my-dialog">
            </el-tree>
            <el-button type="primary" class="rolebutton" @click="giveAccess">确定分配</el-button>
      </el-dialog>
      <!-- 多选框结束 -->
      <!-- 点击分配角色显示框结束 -->
      </el-row>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      input: "",
      list:[],
      // 分页
      pageSize:10,
      page:1,
      total:0,
      // 默认弹出框不可见
      dialogFormVisible:false,
      // 引入的角色表单
      form: {
          role_name: '',
          id:0,
      },
        // 标题名
        title:"",
        name:"",
        // 对话框
        showDialogDistribution:false,
        // 角色输入框规定
        rules: {
          name: [
            { required: true, message: '请添加角色名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        tree: [], //树节点
        choseKeys: [], //已选择的节点
        temp_id: '' //设置权限的ID
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
    addRolebutton:function() {
      this.form.role_name = "",
      this.dialogFormVisible = true;
      this.title = "添加角色";
    },
    editorRolebutton:function(index,row) {
      console.log(row.id);
      this.dialogFormVisible = true;
      this.title = "编辑角色";
      // 将此角色数据渲染到页面上
      this.form.role_name = row.role_name;
      this.form.id = row.id;
    },
    // 权限
    power:function(index,info) {
      this.showDialogDistribution = true;
      // console.log(info);
      // 后台获取用户权限
      this.$http.get("/role/giveAccess?"+"id="+info.id+"&role_name="+info.role_name).then(res=> {
        console.log(res);
        this.temp_id = info.id
        this.tree ? this.tree = res.data.tree : null
        this.choseKeys = res.data.choseKeys ? res.data.choseKeys : []
      })
    },
    // 分配权限
    giveAccess() {
      const ruleStr = this.$refs.tree.getCheckedKeys().join(',');
      const data = { id: this.temp_id, rule: ruleStr };
      this.$http.post("role/giveAccess",data).then(res => {
        console.log(res);
          this.$message({
              message: res.msg,
              type: 'success'
          })
          this.showDialogDistribution = false;
      })
    },
    // 表格 分页栏数据渲染
    getRole() {
      this.$http.get("/role/index").then(res=> {
        // console.log(res);
        this.list = res.data.data;
        this.form.user_name = res.data.data.role_name;
        this.form.id = res.data.data.id;
        this.pageSize = res.data.per_page;
        this.page = res.data.current_page;
        this.total = res.data.total;
      })
    },
    // 提交功能
    onSubmit() {
      if(this.form.id==undefined) {
        // 提交时id名为空
        this.$http.post("/role/roleAdd",this.form).then(res=> {
        this.dialogFormVisible = false;
        })
      }else {
        // 更改时id名存在
        this.$http.post("/role/roleEdit",this.form).then(res=> {
          this.dialogFormVisible = false;
          this.form.id = "";
        })
      }
      this.getRole();
    },
    // 删除功能
    deleteRole(index,row) {
      this.$http.post("/role/roleDel",{id:row.id}).then(res=> {
        this.getRole();
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getUserList();
    this.getRole();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  lang='less' scoped>
.adminRole {
  height: 100%;
  .adminRolemain {
    .roletitle {
      padding-left: 10px;
      height: 38px;
      margin: 16px 0;
      color: #ccc;
      border-bottom: 1px dashed #ccc;
    }
    .rolemiddle {
      padding-bottom: 10px;
      .add-right {
        .middleinput {
          width: 200px;
          margin-right: 5px;
        }
      }
    }
    .roletable {
      margin-bottom: 20px;
    }
    .roleselect {
      float: right;
    }
      .my-dialog {
        height: 260px;
        overflow-y: scroll;
      }
      .rolebutton {
        margin: 0px 130px;
        margin-top: 30px;
      }
    }

}
</style>