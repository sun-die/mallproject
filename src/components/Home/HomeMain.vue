<!--  -->
<template>
  <div class="home-main">
    <!-- 最上层2个图表 -->
    <el-row class="header-container">
      <el-col :span="12" style="height:300px" id="number"></el-col>
      <el-col :span="12" style="height:300px" id="sales">
        <!-- <div class="grid-content bg-purple-light"></div> -->
      </el-col>
    </el-row>

    <!-- 中间四个小方块 -->
    <el-row :gutter="20"  >
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div  class="img">
            <i class="el-icon-user"></i>
          </div>
          <div class="text">
            <div class="number">12</div>
            <div class="title">会员数目</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="img" >
            <i class="el-icon-goods"></i>
          </div>
          <div class="text">
            <div class="number">16</div>
            <div class="title">商品数目</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="img">
            <i class="el-icon-s-order"></i>
          </div>
          <div class="text">
            <div class="number">21</div>
            <div class="title">订单数目</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="img">
            <i class="el-icon-goods"></i>
          </div>
          <div class="text">
            <div class="number">123</div>
            <div class="title">商品数目</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 最下面的图表 -->

    <el-row class="footer-enter-container">
      <el-col :span="24" id="order" style="height:300px;"></el-col>
    </el-row>

    <!-- 为ECharts准备一个具备大小（宽高）的Dom
    <div id="navs1" style="width: 640px;height:300px;"></div>
    <div id="navs2" style="width: 640px;height:300px;"></div>-->
  </div>
</template>
    
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from "echarts";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      echarts1: "",
      // echarts2: null,
      // echarts3: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initChart1() {
      this.echarts1 = echarts.init(document.getElementById("number"));
      this.echarts1.setOption({
        title: {
          x: "center",
          text: "销售额度",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          data: ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"],
          // data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            data: ["0", "1", "1.2", "1", "0.2", "0.6", "0.5"],
            // data: [],
            type: "line",
            areaStyle: {},
          },
        ],
      });
    },

    initChart2() {
      this.echarts2 = echarts.init(document.getElementById("sales"));
      this.echarts2.setOption({
        title: {
          x: "center",
          text: "注册人数",
        },
        legend: {
          x: "right",
          data: ["注册人数", "活跃人数"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"],
            // data: ['12','14','4','12'   data:['8.2','8.3','8.4','8.5','8.6'],,'15'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            data: ["12", "11", "14", "14", "2", "10", "12"],
            type: "bar",
            name: "注册人数",
            barWidth: "40%",
          },
          {
            data: ["10", "1", "12", "14", "20", "10", "12"],
            type: "bar",
            name: "活跃人数",
            barWidth: "40%",
          },
        ],
      });
    },

    initChart3() {
      this.echarts3 = echarts.init(document.getElementById("order"));
      this.echarts3.setOption({
        title: {
          x: "center",
          text: "订单状态",
        },
        legend: {
          data: [
            "取消订单",
            "待支付订单",
            "待发货订单",
            "待收货订单",
            "完成订单",
          ],
          x: "right",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          data: ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"],
          // data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            data: ["0", "0", "0", "0", "0", "0", "8"],
            type: "bar",
            name: "取消订单",
            animationDelay(idx) {
              return idx * 10;
            },
          },
          {
            data: ["0", "0", "0", "0", "0", "0", "4"],
            type: "bar",
            name: "待支付订单",
            animationDelay(idx) {
              return idx * 10 + 100;
            },
          },
          {
            data: ["0", "0", "0", "0", "0", "0", "6"],
            type: "bar",
            name: "待发货订单",
            animationDelay(idx) {
              return idx * 10 + 200;
            },
          },
          {
            data: ["0", "0", "0", "0", "0", "0", "2"],
            type: "bar",
            name: "待收货订单",
            animationDelay(idx) {
              return idx * 10 + 300;
            },
          },
          {
            data: ["0", "0", "0", "0", "0", "0", "4"],
            type: "bar",
            name: "完成订单",
            animationDelay(idx) {
              return idx * 10 + 400;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate(idx) {
          return idx * 5;
        },
      });
    },

    // _getData1() {
    //         this.echarts1.showLoading();
    //         salesCharts().then(res => {
    //             this.echarts1.setOption({
    //                 xAxis: { data:res.data.time  },
    //                 series: [{ data: res.data.data}]
    //             })
    //             this.echarts1.hideLoading()
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$nextTick(() => {
      this.initChart1();
      this.initChart2();
      this.initChart3();
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      //  this._getData1()
    });
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
.home-main {
  width: 100%;
  padding: 10px;
  .header-container {
    width: 100%; 
  }
     
  .el-row{
    margin:20px  0;
  }
 
  
}
.grid-content {
  height: 90px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 10px 30px;
  box-shadow: 0 0 3px #000;
   
   .img{
      height: 91px;
      width:  91px;
      background: #2ec7c9;
      border-right:1px solid #fff;
      i{
        width: 30px;
        height: 30px;
        margin: 30px;
        fill: #fff;
      }
   }
   .text{
     flex: 1;
     text-align: center;
     .number{
       font-size:30px
     }
     .time{
       font-size: 15px;
     }
     .title{
       color: #ccc;
     }
   }
}

</style>