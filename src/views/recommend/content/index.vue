<!--推荐内容管理-->
<template>
  <div class>
    <!-- 标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">推荐位内容管理</div>
      </el-col>
    </el-row>
    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <div class="add-buttom">
          <el-button type="primary" plain @click="handleAdd()">添加推荐内容</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="table_loading"
      element-loading-text="加载中..."
      :data="tableData"
      border
      :cell-style="rowClass"
      :header-cell-style="headClass"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="所属分类" width="200"></el-table-column>
      <el-table-column prop="memo" label="推荐信息"></el-table-column>
      <el-table-column prop="msg" label="推荐摘要"></el-table-column>
      <el-table-column prop="img" label="图片"></el-table-column>
      <el-table-column prop="link" label="链接"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size="20" layout="total, prev, pager, next" :total="total"></el-pagination>

    <!-- 添加推荐位内容 -->

    <el-dialog
      title="添加推荐为内容"
      :visible.sync="dialogFormVisible"
      width="30%"
      text-align="left"
      @submit.native.prevent
    >
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <!-- 选择所属推荐位 -->
        <el-form-item label="选择所属推荐位" prop="name">
          <el-select v-model="form.name" placeholder="请选择" :label-width="formLabelWidth">
            <el-option label="首页Banner" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <!-- 推荐信息 -->
        <el-form-item label="推荐信息" :label-width="formLabelWidth" prop="msg">
          <el-input v-model="form.msg" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐摘要 -->
        <el-form-item label="推荐摘要" :label-width="formLabelWidth" prop="memo">
          <el-input v-model="form.memo" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐链接 -->
        <el-form-item label="推荐链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐图片 -->
        <el-form-item label="推荐图片" :label-width="formLabelWidth" prop="img">
          <el-upload
            :on-success="skuImgUploadSuccess"
            :show-file-list="false"
            :action="imgPostUrl"
            list-type="pictrue"
            limit="1"
          >
            <el-button slot="trigger" size="small" v-if="!form.img" type="primary">选取文件</el-button>
            <img :src="cdn+form.img" class="upload-img" v-else slot="trigger" alt />
          </el-upload>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
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
      table_loading: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: "",
        pid: "",
        name: "",
        msg: "",
        memo: "",
        link: "",
        img: "",
        sort: 0,
      },
      total: 0,
      page: 1,
      isAdd: true,
      rules: {
        name: [{ required: true, message: "请选择所属分类" }],
      },
      inputValue: "",
      imgPostUrl: "",
      formLabelWidth: "120px",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // element表格居中
    headClass() {
      return "text-align:center;";
    },
    rowClass() {
      return "text-align:center;";
    },
    handleAdd() {
      this.form = ["", "", "", "", "", "", "", 0];
      this.isAdd = true;
      this.dialogFormVisible = true;
    },

    skuImgUploadSuccess() {},


    // 获取数据
    _getDAta() {
      this.$http
        .get("/Recommend/content", {
          page: this.page,
          pageSize: 20,
        })
        .then((res) => {
          (this.tableData = res.data.data),
            (this.total = res.data.total),
            (this.page = res.current_page),
            (this.table_loading = false);
        })
        .catch((res) => {
          this.table_loading = true;
        });
    },

    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
     this._getDAta();
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