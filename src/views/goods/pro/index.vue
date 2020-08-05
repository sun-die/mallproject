<!--  -->
<template>
  <div class="app-container" id="product-index">
    <p class="page-title">商品列表</p>
    <div class="filter-container">
      <el-button type="primary" plain class="filter-item">添加商品</el-button>
      <div style="float: right; display: flex">
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
    </div>
    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
      <el-table-column align="center" width = "48px"></el-table-column>
      <el-table-column align="center" prop="id" label="ID" width= "60px"></el-table-column>
      <el-table-column align="center" prop="name" label="商品名" width = "140px"></el-table-column>
      <el-table-column align="center" prop="img" label="商品图片" width = "136px">
          <img src="" alt="">
      </el-table-column>
      <el-table-column align="center" prop="sku" label="所属分类" width = "136px"></el-table-column>
      <el-table-column align="center" prop="market" label="市场价" width = "136px"></el-table-column>
      <el-table-column align="center" prop="sell" label="售价" width = "136px"></el-table-column>
      <el-table-column align="center" prop="inventory" label="库存" width = "80px"></el-table-column>
      <el-table-column align="center" prop="sales" label="销量" width = "80px"></el-table-column>
      <el-table-column align="center"  prop="status" label="状态" width = "80px">
          <el-tag type="success">
              <span>上架</span>
          </el-tag>
      </el-table-column>
      <el-table-column align="center" prop="" label="操作" >
          <el-button type="primary" size="mini">编辑</el-button>
           <el-button type="danger" size="mini">删除</el-button>
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
        :total="6"
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
      cate: ["吃", "喝", "玩", "乐", "衣", "食", "住", "行"],
      params: {
        title: "",
        cate_id: "",
      },
      currentPage: 1,
      tableData: [
           {
            id: 6,
          name: "蒸熊掌",
            img:"",
          sku: "吃",
          market: 666,
          sell:999,
             inventory:111,
             sales:777,
             status:"上架"
        },
        {
            id: 5,
          name: "蒸鹿尾",
            img:"",
          sku: "吃",
          market: 250,
          sell:100,
             inventory:66,
             sales:666,
             status:"上架"
        },
        {
            id: 4,
          name: "蒸熊掌",
            img:"",
          sku: "吃",
          market: 666,
          sell:999,
             inventory:111,
             sales:777,
             status:"上架"
        },
        {
            id: 3,
          name: "蒸鹿尾",
            img:"",
          sku: "吃",
          market: 250,
          sell:100,
             inventory:66,
             sales:666,
             status:"上架"
        },
        {
            id: 2,
          name: "蒸鹿尾",
            img:"",
          sku: "吃",
          market: 250,
          sell:100,
             inventory:66,
             sales:666,
             status:"上架"
        },
        {
            id: 1,
          name: "蒸鹿尾",
            img:"",
          sku: "吃",
          market: 250,
          sell:100,
             inventory:66,
             sales:666,
             status:"上架"
        },
       
      ],
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