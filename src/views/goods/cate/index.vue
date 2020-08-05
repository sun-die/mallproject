<!--  -->
<template>
  <div class="app-container">
    <div class="page-title">商品分类列表</div>
    <div class="filter-container">
      <button
        type="button"
        class="el-button filter-item el-button--primary is-plain"
        @click="addCate"
      >
        <span>添加分类</span>
      </button>
      <div style="float:right">
        <div class="filter-item el-input" style="width:200px">
          <input type="text" placeholder="分类名" class="el-input__inner" autocomplete="off" />
        </div>
        <button type="button" class="el-button filter-item el-button--primary">
          <span>搜索</span>
        </button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-tag type="success">商品属性1:</el-tag>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增属性</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" prop="id" width="60px"></el-table-column>
      <el-table-column align="center" label="分类名" prop="name"></el-table-column>
      <el-table-column align="center" label="排序(降序)" prop="desc" width="100px"></el-table-column>
      <el-table-column align="center" label="添加时间" prop="time"></el-table-column>
      <el-table-column align="center" label="操作" prop="id" width="400px">
        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-close" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="8"
      ></el-pagination>
    </div>
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
            <el-button type="primary">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      tableData: [
        {
          id: "10",
          name: "行",
          desc: "50",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "8",
          name: "住",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "7",
          name: "食",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "6",
          name: "衣",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "5",
          name: "乐",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "3",
          name: "玩",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "2",
          name: "喝",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
        {
          id: "1",
          name: "吃",
          desc: "1",
          time: "2018-04-17 19:49:39",
        },
      ],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      currentPage: 1,
      showDialog: false,
      params: {
        name: "",
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //添加顶级商品分类属性
    addCate() {
      this.form.name = "";
      this.form.sort = 1;
      this.showDialog = true;
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
<style lang = 'less' scoped>
.app-container {
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