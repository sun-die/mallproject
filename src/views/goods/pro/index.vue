<!--  -->
<template>
  <div class="app-container" id="product-index">
    <el-row>
      <el-col :span="24">
        <div class="title">商品列表</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="addgoods">
          <el-button type="primary" plain @click="addgoods">添加商品</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="member-search">
          <el-select v-model="params.cate_id" placeholder="分类">
            <el-option v-for="(item, index) in cate" :label="item" :value="index" :key="index"></el-option>
          </el-select>
          <el-input
            placeholder="商品名"
            style="width: 200px; margin: 0 3px"
            class="filter-item"
            v-model="params.title"
          ></el-input>
          <el-button type="primary" class="filter-item">搜索</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
      <el-table-column align="center" width="48px"></el-table-column>
      <el-table-column align="center" prop="id" label="ID" width="60px"></el-table-column>
      <el-table-column align="center" prop="title" label="商品名"></el-table-column>
      <el-table-column align="center" prop="img" label="商品图片">
        <template slot-scope="scope">
          <div class="img-container">
            <img :src="'http://www.masterjoy.top/uploads/' + scope.row.img" class="img-container" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cate_id" label="所属分类"></el-table-column>
      <el-table-column align="center" prop="market_price" label="市场价"></el-table-column>
      <el-table-column align="center" prop="price" label="售价"></el-table-column>
      <el-table-column align="center" prop="stock" label="库存" width="80px"></el-table-column>
      <el-table-column align="center" prop="sales_volume" label="销量"></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="80px">
        <el-tag type="success">
          <span>上架</span>
        </el-tag>
      </el-table-column>
      <el-table-column align="center" prop label="操作" width="150px">
        <el-button type="primary" size="mini" @click="editgoods">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
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
      cate: {},
      params: {
        title: "",
        cate_id: "",
        pageSize:10
      },
      total:null,
      currentPage: 1,
      tableData: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //获取商品数据
    _getGoods() {
      this.$http
        .get("product/index", {
          params: this.params,
        })
        .then((res) => {
          this.tableData = res.data.pro.data;
          this.cate = res.data.cate;
          this.total = res.data.pro.total;
          this.pageSize = res.data.pro.per_page;
          this.page = res.data.pro.current_page;
        });
    },
   handleSizeChange(val) {
      this.params.pageSize = val
      console.log(`每页 ${val} 条`);
      this._getGoods()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this._getGoods()
      console.log(`当前页: ${val}`);
    },
    addgoods() {
      return this.$router.push("/product/addgoods");
    },
    editgoods() {
      return this.$router.push("/product/addgoods");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this._getGoods();
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
.img-container {
  width: 53px;
  height: 53px;
  margin: 0 auto;
}
.title {
  color: #cccccc;
  border-bottom: 1px dashed #ccc;
  text-align: left;
  padding: 10px;
}
.addgoods {
  text-align: left;
  padding: 15px;
  height: 50px;
}
.member-search {
  text-align: right;
  padding: 15px;
  height: 50px;
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
</style>