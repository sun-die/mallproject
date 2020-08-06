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

          <el-button size="mini" type="primary" v-if="!scope.row.edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <!-- 添加推荐位 -->
    <el-dialog title="添加推荐位" 
      :visible.sync="dialogFormVisible" 
      @close="addDialogClose" 
      width="30%" text-align="left">
      <el-form :model="addForm" status-icon :rules="ruleForm" ref="refForm" >
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
      // tableData:{
      //   formdate:[],
      //   edit:false
      // },
      tableData: [
        {
          id: 2,
          name: "首页Baner",
          edit:false,
        },
      ],
      
      pages:0,
      dialogFormVisible: false,

      addForm: {
        name: "",
      },

      ruleForm: {
        name: [
          { required: true, message: "请输入类名", trigger: "blur" },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
    
    // 保存按钮
    handleEdit(index, row) {
      console.log(row)
      this.editRecommendList(row)
    },

    //取消修改分类
    handleCancel(row) {
      row.edit = false
      row.name = row.old_name
    },
    //删除按钮 
    handleDelete(index, row){
      this.$confirm('是否确定删除该推荐位', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.delRecommendList(row.id)
        this.getRecommendList()
      })
    },
    getRecommendList(){
      this.$http.get('/Recommend/index')
      .then(res=>{
        res.data.map(item => {
          item.edit = false
          item.old_name = item.name
        })
        if (res.status!==1) {
          return this.$message.error('用户列表获取失败！');
        }
        this.tableData=res.data
        this.pages=res.data.length
      })
    },
    editRecommendList(row){
      this.$http.post("/Recommend/editRecommendList",{
        id:row.id,
        name:row.name, 
        edit: row.edit, 
        old_name: row.old_name
      })
      .then(res => {
        if(res.status==1){
          this.$message({
            message: res.msg,
            type: 'success'
          })
          row.old_name = row.name
          row.edit = false
        }
      })
    },
    
    delRecommendList(id){
      this.$http.post("/Recommend/delRecommendList",{id:id})
      .then(res=>{
        if(res.status==0){
          this.$message.error(res.msg)
        }else{
          this.$message.success(res.msg)
          this.tableData.splice(index, 1)
        }
      })
    },
    addDialogClose(){
      this.$refs.refForm.resetFields()
    },
    onSubmit(){
      this.$refs.refForm.validate(async valid=>{
        console.log(this.$refs.refForm)
        if (!valid) return;
        await this.$http.post('/Recommend/addRecommendList',this.addForm)
        .then(res=>{
          console.log(res)
          if(res.status !==1){
            return this.$message.error('添加任务失败')
          }
          this.$message.success(res.msg)
          this.dialogFormVisible=false
          this.getRecommendList()
        })
        
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
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