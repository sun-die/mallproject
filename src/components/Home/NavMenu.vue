<!--  -->
<template>
<div> 
 <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#263445" text-color="#fff"   @open="handleOpen" @close="handleClose" :collapse="isCollapse">
<el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-suitcase"></i>
      <span slot="title">后台管理</span>
    </template>
    <el-menu-item index="1-1">后台管理列表</el-menu-item>
    <el-menu-item index="1-2">用户角色管理</el-menu-item>
    
  </el-submenu> 
 <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-user"></i>
      <span slot="title">会员管理</span>
    </template>
     
    <el-menu-item index="2-1">会员列表</el-menu-item>
     
  </el-submenu> 

 <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-goods"></i>
      <span slot="title">商品管理</span>
    </template>
     <el-menu-item index="3-1"> 商品分类 </el-menu-item>
     <el-menu-item index="3-2">商品管理</el-menu-item>
  </el-submenu> 


<el-submenu index="4">
    <template slot="title">
      <i class="el-icon-s-order"></i>
      <span slot="title">订单管理</span>
    </template>
    <el-menu-item index="4-1">订单列表</el-menu-item>
     <el-menu-item index="4-2">快递公司</el-menu-item>
  </el-submenu> 


<el-submenu index="">
    <template slot="title">
      <i class="el-icon-thumb"></i>
      <span slot="title">推荐管理</span>
    </template>
    <el-menu-item index="5-1">推荐位置管理</el-menu-item>
     <el-menu-item index="5-2">推荐内容管理</el-menu-item>
  </el-submenu> 
</el-menu>
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
      isCollapse: false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
 
</style>