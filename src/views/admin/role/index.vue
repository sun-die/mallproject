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
            @click="addRole">添加角色</el-button>
          </div>
        </el-col>
        <!-- 添加搜索功能结束 -->

        <!-- 显示角色表格 roletable -->
        <el-col>
          <div class="grid-content bg-purple-dark roletable">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column type="index" label="ID" align="center" width="60px"></el-table-column>
              <el-table-column prop="name" label="角色" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="500px">
                <!-- 编辑按键 弹出框 -->
                <el-button type="primary" size="mini" @click="editorRole">编辑</el-button>
                <el-button type="success" size="mini" @click="power">分配权限</el-button>
                <el-button type="danger" size="mini">删除</el-button>
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
                :current-page="currentPage4"
                :page-sizes="[10, 25, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="4"
              ></el-pagination>
            </div>
          </div>
        </el-col>
        <!-- 底部 分页兰结束 -->

        <!-- 点击添加/编辑角色后的显示框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="80px" status-icon :rules="rules">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加角色显示框结束 -->

      <!-- 点击分配角色显示框 -->
      <el-dialog title="分配权限" :visible.sync="roleShowup" width="30%">
        <!-- 树节点 -->
        <el-tree ref="tree" show-checkbox node-key="id" default-expand-all
            :data="tree"
            :default-checked-keys="choseKeys">
        </el-tree>
        <el-button type="primary" style="float: right">确定分配</el-button>
        <!-- 多选框结束 -->
      </el-dialog>
      <!-- 点击分配角色显示框结束 -->
      </el-row>
    </div>
  </div>
</template>

<script>
const cityOptions = ['添加快递公司', '修改快递公司', '删除快递公司'];
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      input: "",
      // 表格
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      // 角色规定
      ruleForm: {
        name:""
      },
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 5,
      // 默认弹出框不可见
      dialogFormVisible:false,
      // 引入的角色表单
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 标题名
        title:"",
        name:"",
        // 对话框
        roleShowup:false,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addRole:function() {
      this.dialogFormVisible = true;
      this.title = "添加角色";
    },
    editorRole:function() {
      this.dialogFormVisible = true;
      this.title = "编辑角色";
      // 添加编辑角色功能
    },
    power:function() {
      this.roleShowup = true;
      // 后台获取用户权限
    }
    // 提交表单
    // submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getUserList();
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
  }
}
</style>