<!--会员列表-->
<template>
  <div class>
    <!-- 标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">会员管理</div>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="member-search">
          <el-input v-model="input" placeholder="手机号/姓名/状态"></el-input>
          <el-button type="primary" @click="seek">搜索</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 会员列表 -->
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align='center' prop="id" label="ID" width="55"></el-table-column>
      <el-table-column align='center' prop="tel" label="电话号码" width="180"></el-table-column>
      <el-table-column align='center' prop="true_name" label="真实姓名" width="180"></el-table-column>
      <el-table-column align='center' prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>封停</el-tag>
        </template>
      </el-table-column>
      <el-table-column align='center' prop="amoney" label="内置积分" width="120"></el-table-column>
      <el-table-column align='center' prop="add_time" label="注册时间" width="240"></el-table-column>
      <el-table-column align='center' prop="last_login_time" label="最后登录时间" width="240"></el-table-column>
      <el-table-column align='center' prop="caozuo" label="操作" width="100">
        <template slot-scope="scope">
          <el-tooltip content="设置会员是否封停" placement="top">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click.native="setStatus(scope.$index, scope.row)"
              v-model="scope.row.status"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 10, 20, 40]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
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
      input: "",
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 1, //每页的数据
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    setStatus(index, row) {
      const status = row.status == 1 ? 0 : 1;
      console.log(row.id);
      this.$http
        .post("member/changeStatus", {
          id: row.id,
          status: row.status,
        })
        .then((res) => {
          row.status = row.status;
        });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(`每页 ${this.pagesize} 条`);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(`当前页: ${this.currentPage}`);
    },
    gitList() {
      this.$http.get("member/index").then((res) => {
        this.tableData = res.data.data;
      });
    },
    //搜索功能
    seek(){
      var input = this.input
      if(input == '正常'){
        input = 1
      }else if(input == '封停'){
        input = '0'
      }
        this.$http.get('member/index').then(res=>{
              var arr = res.data.data.filter(function(item){ 
                  console.log(input)              
                  return item.id == input || item.tel === input || item.status == input//返回对应的数据
                })
                this.tableData = arr
          }) 
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.gitList();
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
.member-search {
  text-align: right;
  padding: 15px;
  height: 50px;
  .el-input {
    margin-right: 5px;
    width: 200px;
  }
}
.el-pagination {
  padding: 10px;
  text-align: right;
}
</style>