<!--  -->
<template>
 
    <el-container class="app-el-contairner">
      <el-aside width="180px">
        <!-- 左侧导航栏 -->
        <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <!-- 头部 -->
          <Header></Header>
        </el-header>

        <!-- 内容主体 -->
        <el-main>
          <HomeMain></HomeMain>
        </el-main>
      </el-container>
    </el-container>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavMenu from "../../components/Home/NavMenu";
import Header from "../../components/Home/Header";
// import HomeMain from "../../components/Home/HomeMain"
import HomeMain from "../../components/OrderList/orderList"

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavMenu,
    Header,
    HomeMain
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
<style  lang='less' >

html,body{
   height: 100%;
  
}
 .app-el-contairner{
     height: 100%;
   }
 .el-header{
   border-bottom: 1px solid  #dddddd;
 }
 .el-aside{
    background-color: #263445;
    color: #ffffff;
 }
 
</style>