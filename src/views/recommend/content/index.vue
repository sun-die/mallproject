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
          <el-button type="primary" plain>添加推荐内容</el-button>
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
      <el-table-column prop="name" label="所属分类" width="200"></el-table-column>
      <el-table-column prop="msg" label="推荐信息"></el-table-column>
      <el-table-column prop="msg" label="推荐摘要"></el-table-column>
      <el-table-column prop="picture" label="图片"></el-table-column>
      <el-table-column prop="www" label="链接"></el-table-column>
      <el-table-column prop="num" label="排序" width="60"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="40">
    </el-pagination>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    headClass() {
      return "text-align:center;";
    },
    rowClass() {
      return "text-align:center;";
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
.el-pagination{
    padding: 10px;
    text-align: right;
}
</style>