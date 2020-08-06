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
            <el-input v-model="input"   placeholder="请输入内容"></el-input>
            <el-button type="primary">搜索</el-button>
        </div>
      </el-col>
    </el-row>
     
     <!-- 会员列表 -->
     <el-table
    :data="tableData"
    border
    
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="55">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      label="真实姓名"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      
       >
         <template slot-scope="scope">
                    <el-tag type="success"
                        v-if="scope.row.status == 1">正常</el-tag>
                    <el-tag type="warning"
                        v-else>封停</el-tag>
     </template>
    </el-table-column>
    <el-table-column
      prop="jifen"
      label="内置积分"
      >
    </el-table-column>
     <el-table-column
      prop="date"
      label="注册时间"
      w >
    </el-table-column>
    <el-table-column
      prop="time"
      label="最后登录时间"
      >
    </el-table-column>
    <el-table-column
      prop="caozuo"
      label="操作"
      width="100">

      <template slot-scope="scope">
                    <el-tooltip content="设置会员是否封停"
                        placement="top">
                        <el-switch :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click.native="setStatus(scope.$index, scope.row)"
                            v-model="scope.row.status">
                        </el-switch>
                    </el-tooltip>
                </template>
    </el-table-column>

  </el-table>

 <!-- 分页 -->
       <el-pagination

      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="4">
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
    return {
     input:"",
     tableData:[
         {
            id:12,
            phone:1465461265,
            name:"梨花颂",
            status:1,
            jifen:121.0,
            date:123123,
            time:151156,
            caozuo:123

         },
          {
            id:12,
            phone:1465461265,
            name:'防守打法',
            status:true,
            jifen:121.0,
            date:123123,
            time:151156,
            caozuo:123

         },

         ],
          currentPage4: 4
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
            

          
        },
          handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
      
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
.member-search{
    text-align: right;
    padding: 15px;
    height: 50px;
  .el-input{
      margin-right:5px ;
      width: 200px;
  }
}
.el-pagination{
    padding: 10px;
    text-align: right;
}
</style>