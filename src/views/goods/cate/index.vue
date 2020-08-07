<!--  -->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="title">商品分类列表</div>
      </el-col>
    </el-row>
    <!-- 顶部功能栏 -->
    <el-row>
      <el-col :span="12">
        <div class="addcate">
          <el-button type="primary" plain @click="addCate">添加分类</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="member-search">
          <el-input v-model="cateName" placeholder="请输入分类名"></el-input>
          <el-button type="primary" @click="searchCate(cateName)">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格主体开始 -->
    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
      <!-- 隐藏的分类属性开始 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag type="success">商品属性1:</el-tag>
          <el-tag
            :key="tag.name"
            v-for="(tag,index) in scope.row.sku"
            closable
            :disable-transitions="false"
            @close="handleClose(scope.row,tag.id,index,1)"
          >{{tag.name}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row,1)"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增属性</el-button>
        </template>
        <!-- 隐藏的分类属性结束 -->
      </el-table-column>
      <el-table-column align="center" label="ID" prop="id" width="60px"></el-table-column>
      <el-table-column align="center" label="分类名">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" class="edit-input" size="small" v-model="scope.row.name"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序(降序)" prop="sort" width="100px">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.edit"
            class="edit-input"
            size="small"
            type="number"
            v-model.number="scope.row.sort"
          ></el-input>
          <span v-else>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" prop="add_time"></el-table-column>
      <el-table-column align="center" label="操作" prop="id" width="400px">
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
          <el-button
            v-else
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="scope.row.edit=!scope.row.edit"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            @click="handleDel(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格主体结束  -->

    <!-- 分页器开始 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params.page"
        :page-sizes="[10, 25, 50, 100]"
        :page-size.sync="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 分页器结束 -->

    <!-- 添加分类开始 -->
    <el-dialog :visible.sync="showDialog" title="添加分类" width="30%">
      <el-form
        :model="form"
        status-icon
        label-width="100px"
        :rules="formRule"
        ref="cateForm"
        @submit.native.prevent
      >
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button type="primary" @click="onSubmit()">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加分类结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "goods-cate",
  components: {},
  data() {
    //这里存放数据
    return {
      // edit:false,
      tableData: [],
      inputVisible: false,
      inputValue: "",
      // pagesize:null,
      // currentPage: null,
      total: null,
      showDialog: false,
      cateName: "",
      params: {
        name: "",
        pageSize: 10,
      },
      form: {
        name: "",
        sort: 1,
      },
      formRule: {
        name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
        sort: [
          { required: true, message: "请输入排序", trigger: "blur" },
          { type: "number", message: "必须是数字", trigger: "blur" },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //请求获取分类数据
    _getData() {
      // let _this = this;
      this.$http
        .get("cate/index", {
          params: this.params,
        })
        .then((res) => {
          res.data.data.forEach((item) => {
            item.edit = false;
            item.old_name = item.name;
            item.old_sort = item.sort;
          });
          this.tableData = res.data.data;
          this.total = res.data.total;
          // _this.pageSize = res.data.per_page;
          // _this.page = res.data.current_page;
          console.log(this.tableData);
          console.log(res);
        });
    },
    //添加顶级商品分类属性
    addCate() {
      this.form.name = "";
      this.form.sort = 1;
      this.showDialog = true;
    },
    //提交商品分类顶级属性
    onSubmit() {
      // let _this = this;
      this.$refs.cateForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$http.post("cate/addCate", this.form).then((res) => {
          this.$message({
            message: res.msg,
            type: "success",
          });
          // this.tableData.unshift(this.form)
          this._getData();
          this.showDialog = false;
        });
      });
    },

    //搜索顶级分类
    searchCate(name) {
      this.$http.get("cate/index", {}).then((res) => {
        let arr = res.data.data.filter((item) => {
          return item.name === name;
        });
        this.tableData = arr;
        this.total = arr.length;
      });
    },
    // 编辑顶级分类
    handleEdit(row) {
      console.log(row);
      row.edit = !row.edit;
    },
    // 取消编辑顶级分类
    handleCancel(row) {
      console.log(row);
      row.edit = false;
      row.name = row.old_name;
      row.sort = row.old_sort;
    },
    //保存编辑的顶级分类
    handleEdit(index, row) {
      this.$http.post("cate/editCate", row).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        row.old_name = row.name;
        row.edit = false;
      });
    },
    //删除顶级分类属性
    handleDel(index, row) {
      this.$confirm("是否确定删除", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("cate/delCate", {
            id: row.id,
          })
          .then(() => {
            console.log(row);
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.tableData.splice(index, 1);
          });
      });
    },
    //删除分类属性
    handleClose(row,id,index,attr) {
      this.$http.post('cate/delCateSku',{
        id:id
      }).then(res=>{
        row.sku.splice(index,1)
      })
    },
    //编辑分类属性
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //提交分类属性
    handleInputConfirm(row, attr) {
      // const data = { pid: row.id, level: attr, name: this.inputValue }
      // this.$http.post('cate/addCateSku',data)
      // .then(res=>{

      // })
      let inputValue = this.inputValue;
      if (inputValue) {
        sc.sku.push({
          name: inputValue,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      console.log(`每页 ${val} 条`);
      this._getData();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this._getData();
      console.log(`当前页: ${val}`);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this._getData();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang = 'less' scoped>
.app-container {
  .title {
    color: #cccccc;
    border-bottom: 1px dashed #ccc;
    text-align: left;
    padding: 10px;
  }
  .addcate {
    text-align: left;
    padding: 15px;
    height: 50px;
  }
  .member-search {
    text-align: right;
    padding: 15px;
    height: 50px;
    .el-input {
      margin-right: 5px;
      width: 200px;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .block {
    float: right;
    margin: 20px;
    button {
      :disabled {
        background-color: red;
      }
    }
  }
}
</style>