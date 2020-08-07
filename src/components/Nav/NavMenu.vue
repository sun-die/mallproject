<!--  -->
<template>
<div>
<el-aside :width="isCollapse?'66px':'200px'">
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group> -->
  <div class="toggle-button" @click="toggleCollapse">|||</div>
<el-menu class="el-menu-vertical-demo" 
  :default-active="$route.path"
  background-color="#263445" 
  text-color="#fff"  
   router
  :unique-opened='true'
  :collapse='isCollapse'
  :collapse-transition="false">
  <el-menu-item index="/pagetop">
    <i class="el-icon-menu"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-suitcase"></i>
      <span slot="title">后台管理</span>
    </template>
    <el-menu-item index="/admin/user">后台管理列表</el-menu-item>
    <el-menu-item index="/admin/role">用户角色管理</el-menu-item>
    
  </el-submenu> 
 <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-user"></i>
      <span slot="title">会员管理</span>
    </template>
     
    <el-menu-item index="/member/list">会员列表</el-menu-item>
     
  </el-submenu> 

 <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-goods"></i>
      <span slot="title">商品管理</span>
    </template>
     <el-menu-item index="/product/cate"> 商品分类 </el-menu-item>
     <el-menu-item index="/product/goods">商品管理</el-menu-item>
  </el-submenu> 


<el-submenu index="4">
    <template slot="title">
      <i class="el-icon-s-order"></i>
      <span slot="title">订单管理</span>
    </template>
    <el-menu-item index="/order/order">订单列表</el-menu-item>
     <el-menu-item index="/order/express">快递公司</el-menu-item>
  </el-submenu> 


<el-submenu index="">
    <template slot="title">
      <i class="el-icon-thumb"></i>
      <span slot="title">推荐管理</span>
    </template>
    <el-menu-item index="/recommend/position">推荐位置管理</el-menu-item>
     <el-menu-item index="/recommend/content">推荐内容管理</el-menu-item>
  </el-submenu> 
</el-menu>
</el-aside>
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
    isCollapse: false,
    activeNav:"",
    
  };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  toggleCollapse(){
    this.isCollapse=!this.isCollapse;
  },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  var _this=this
    var href=window.location.href
    href=href.split('/#')[1]
    _this.activeNav=href
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
  html,body{
    height: 100vh;
  }
  .el-aside{
    height: 100vh;
    background: #263445;
   
  }
  .el-menu{
    border-right: 1px solid #263445;
    
  }
  .toggle-button{
    background: #263445;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  
  }
  
</style>