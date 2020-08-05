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
      <el-table-column prop="name" label="分类名">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" class="edit-input" size="small" v-model="scope.row.name"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">

        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            icon="el-icon-refresh"
            size="mini"
            type="warning"
            @click="handleCancel(scope.row)"
          >取消</el-button>
          <el-button
            v-if="scope.row.edit"
            icon="el-icon-circle-check-outline"
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
          >保存</el-button>

          <el-button size="mini" type="primary" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size="20" layout="total, prev, pager, next" :total="40"></el-pagination>

    <!-- 添加推荐位 -->
    <el-dialog title="添加推荐位" :visible.sync="dialogFormVisible" width="30%" text-align="left">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="添加推荐名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('formRule')">确 定</el-button>
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
        {
          id: 12,
          name: "首页Baner",
          edit:false
        },
      ],
      dialogFormVisible: false,

      ruleForm: {
        name: "",
      },

      rules: {
        name: [
          { required: true, message: "请输入类名", trigger: "blur" },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    //  点击添加按钮
    addPosition() {
      this.form.name = "";
      this.dialogFormVisible = true;
    },
    onSubmit() {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
        
        handleEdit(index, row) {
           row.edit = false
            // editRecommendList(row).then(res => {
            //     this.$message({
            //         message: res.msg,
            //         type: 'success'
            //     })
            //     row.old_name = row.name
            //     row.edit = false
            // })
        },

        //取消修改分类
        handleCancel(row) {
            row.edit = false
            // row.name = row.old_name
        },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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