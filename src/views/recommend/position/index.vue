<!--推荐位置管理--->
<!--  -->
<template>
  <div class>
    <!-- 标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">推荐位置管理(请勿随意添加)</div>
      </el-col>
    </el-row>
    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <div class="add-buttom">
          <el-button type="primary" @click="dialogFormVisible = true" plain>添加推荐位置</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      :cell-style="rowClass"
      :header-cell-style="headClass"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="分类名"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size="5" layout="total, prev, pager, next" :total="pages"></el-pagination>

    <!-- 添加推荐位 -->
    <el-dialog title="添加推荐位" 
      :visible.sync="dialogFormVisible" 
      @close="addDialogClose"
      width="30%" text-align="left">
      <!-- <span>这是一段信息</span> -->
      <el-form :model="addForm" status-icon :rules="formRule" ref="formRef">
        <el-form-item label="添加推荐名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
      tableData: [
        // {
        //   id: 12,
        //   name: "首页Baner",
        // },
      ],
      pages:0,
      dialogFormVisible: false,
      // ruleForm: {
      //   content: "",
      // },
      addForm: {
        name:"",
      },
      formRule: {
        name: [
          { required: true, message: "请输入推荐名", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleEdit: function () {},
    handleDelete: function () {},
    // 表头样式设置
    headClass() {
      return "text-align: center; ";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    // //  点击添加按钮
    // addPosition() {
    //   this.form.name = "";
    //   this.dialogFormVisible = true;
    // },
    // onSubmit() {
    //   this.$refs[cateForm].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    getRecommendList(){
      this.$http.get('/Recommend/index')
      .then(res=>{
        if (res.status!==1) {
          return this.$message.error('用户列表获取失败！');
        }
        this.tableData=res.data
        this.pages=res.data.length
      })
    },
    addDialogClose(){
      this.$refs.formRef.resetFields()
    },
    onSubmit(){
      this.$refs.formRef.validate(valid=>{
        if (!valid) return;
        this.$http.post('/Recommend/addRecommendList',this.addForm)
        .then(res=>{
          this.$message=res.mgs
        })
        
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  // /Recommend/index
  created() {
    this.getRecommendList()
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
<style lang='less' scoped>
.title {
  color: #cccccc;
  border-bottom: 1px dashed #ccc;
  text-align: left;
  padding: 10px;
}
.add-buttom {
  padding: 20px 0;
  text-align: left;
}
.el-pagination {
  padding: 10px;
  text-align: right;
}
</style>