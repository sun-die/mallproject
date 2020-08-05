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
          :label="item.value"
          :value="item.label"
        ></el-option>
      </el-select>
      <el-button type="primary" @click='state'>搜索</el-button>
    </div>
    <!-- 内容区 -->
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" border>
      <el-table-column prop="id" label="ID" border></el-table-column>
      <el-table-column prop="serial" label="订单编号"></el-table-column>
      <el-table-column prop="name" label="用户"></el-table-column>
      <el-table-column prop="original" label="货物金额"></el-table-column>
      <el-table-column prop="postage" label="邮费"></el-table-column>
      <el-table-column prop="aggregate" label="总金额"></el-table-column>
      <el-table-column prop="discount" label="优惠金额"></el-table-column>
      <el-table-column prop="pay" label="支付金额"></el-table-column>
      <el-table-column prop="add" label="添加订单时间"></el-table-column>
      <el-table-column prop="time" label="支付订单时间"></el-table-column>
      <el-table-column ref='qqq' prop="state" label="订单状态">
        <template slot-scope="scope">   
            <el-tag >{{ scope.row.state }}</el-tag>  
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
          <el-button type="primary" @click="detailPage">详情</el-button>
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
      :total="20">
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
            {value: '取消',label: '取消'}, 
            {value: '待支付',label: '待支付'},
            {value: '待发货',label: '待发货'}, 
            {value: '待收货',label: '待收货'},
            {value: '完成',label: '完成'}
        ],
      value: "",
      tableData: [
        {
          id: "1", //id
          serial: "2sdf", //编号
          name: "张珊", //用户
          original: 99, //货物金额
          postage: 20, //邮费
          aggregate: 99, //总金额
          discount: 50, //优惠金额
          pay: 99, //支付金额
          add: "0:00", //添加订单时间
          time: "0:00", //支付订单时间
          state: "取消", //完成
        },
        {
          id: "2", 
          serial: "2sdf", 
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "待支付", 
        },
        {
          id: "3",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "待发货", 
        },
        {
          id: "4",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "待收货", 
        },
        {
          id: "5",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "6",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "7",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "8",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "9",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "10",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
        {
          id: "11",
          serial: "2sdf",
          name: "张珊", 
          original: 99, 
          postage: 20, 
          aggregate: 99, 
          discount: 50, 
          pay: 99, 
          add: "0:00", 
          time: "0:00", 
          state: "完成", 
        },
      ],
       currentPage: 1,//初始页
       pagesize:5,//每页的数据
       userList:[]//*****后面请求数据时需要的容器 ******
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
          this.userList = this.tableData 
          var arr = this.userList.filter(function(item){             
              return item.state === shis
          })
          this.userList = arr
          this.value = ''
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
        // this.$axios({
        //     method:'get',
        //     url:'/order/index?status=&pageSize=10&page=1',
        //     data:{
        //       status:'登录',
        //       pageSize:10,
        //       page:1,
        //       Token:'jjfcbejgcib0vdkq0l0f28bs3l'
        //     }
        // }).then(res=>{
        // console.log(res)
        //   //   this.userList = res.body 
        // }).catch(err=>{
        //   console.log(err)
        // })
         this.userList = this.tableData
      },
      //详情页跳转
      detailPage:function(){
         this.$router.push('/orderDetails')
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
     this.handelUserList()
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