<!-- 订单列表 -->
<template>
  <div class="order">
    <h4 class="orderTitle">订单列表</h4>
    <!-- 搜索区 -->
    <div class="orderSearch">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click='state'>搜索</el-button>
    </div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border>
      <el-table-column width='50px' align='center' prop="id" label="ID" border></el-table-column>
      <el-table-column width='200px' align='center' prop="no" label="订单编号"></el-table-column>
      <el-table-column align='center' prop="post_name" label="用户"></el-table-column>
      <el-table-column align='center' prop="amount" label="货物金额"></el-table-column>
      <el-table-column align='center' prop="postage" label="邮费"></el-table-column>
      <el-table-column align='center' prop="money" label="总金额"></el-table-column>
      <el-table-column align='center' prop="reduce" label="优惠金额"></el-table-column>
      <el-table-column align='center' prop="money" label="支付金额"></el-table-column>
      <el-table-column width='200px' align='center' prop="add_date" label="添加订单时间"></el-table-column>
      <el-table-column width='200px' align='center' prop="time" label="支付订单时间"></el-table-column>
      <el-table-column align='center' ref='qqq' prop="state" label="订单状态">
        <template slot-scope="scope">   
            <el-tag v-if='scope.row.pay_way == -1'>取消</el-tag>  
            <el-tag v-if='scope.row.pay_way == 0'>待付款</el-tag>  
            <el-tag v-if='scope.row.pay_way == 1'>待发货</el-tag>  
            <el-tag v-if='scope.row.pay_way == 2'>待签收</el-tag>  
            <el-tag v-if='scope.row.pay_way == 3'>已完成</el-tag>  
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
         <template slot-scope="scope">   
                    <el-button size="mini"
                        type="primary"
                        @click="detail(scope.row.id)">详情
                    </el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20,50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userList.length">
    </el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    
  },
  data() {
    //这里存放数据
    return {
         options: [
            {value: '-1',label: '取消'}, 
            {value: '0',label: '待支付'},
            {value: '1',label: '待发货'}, 
            {value: '2',label: '待收货'},
            {value: '3',label: '完成'}
        ],
       value: "",
       currentPage: 1,//初始页
       pagesize:5,//每页的数据
       userList:[],//获取的数据
       tableData:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //搜索功能
      state:function(){
          var shis =  this.value 
          this.tableData = this.userList
          var arr = this.tableData.filter(function(item){ 
            console.log(item)                 
              return item.pay_way == shis
          })  
          this.tableData = arr
      },
      //每页显示多少条数据
       handleSizeChange(size) {
         this.pagesize = size;
          console.log(`每页 ${this.pagesize} 条`);
      },
      //当前是第几页
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        console.log(`当前页: ${this.currentPage}`);
      },
      //请求数据
      handelUserList(){
        this.$http.get("/order/index",{}
        ).then(res=>{
         this.userList = res.data.data//获取的数据
        this.tableData = res.data.data
        }).catch(err=>{
          console.log(err)
        }) 
      },
      //详情页跳转
      detail:function(id){
         console.log(id)
         this.$router.push({path:'/order/order/detail',query: {id: id}})
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
     this.handelUserList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
.el-table thead{
          line-height: 50px;
          height: 50px;
          text-align: center;
        }
.el-tabel .cell{
    text-align: center;
}

.order {
  width: 100%;
  height: 100%;
  .orderTitle {
    height: 70px;
    border-bottom: 1px dashed rgb(204, 204, 204);
    color: rgb(204, 204, 204);
    font-weight: 400;
    text-align: left;
    line-height: 70px;
  }

  .orderSearch {
    height: 80px;
    text-align: right;
    line-height: 80px;
  }
}

</style>