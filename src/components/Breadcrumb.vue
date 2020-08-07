<!--  -->
<template>
<div class=''>
    <el-breadcrumb separator="/"  v-show="$route.path=='/pagetop'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/"  v-show="$route.path=='/admin/user'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/user'}">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加 -->
    <el-breadcrumb separator="/"  v-show="$route.path=='/admin/addUser/'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/user'}">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/"  v-show="$route.path=='/admin/role'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/admin/user'}">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/"  v-show="$route.path=='/member/list'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/member/list'}">会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/"  v-show="$route.path=='/product/cate'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/cate'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/"  v-show="$route.path=='/product/goods'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/cate'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
     <el-breadcrumb separator="/"  v-show="$route.path=='/order/order'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/order/order'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加 -->
    <el-breadcrumb separator="/"  v-show="$route.path=='/order/order/detail'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/order/order'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
     <el-breadcrumb separator="/"  v-show="$route.path=='/order/express'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/order/order'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>快递公司</el-breadcrumb-item>
    </el-breadcrumb>
     <el-breadcrumb separator="/"  v-show="$route.path=='/recommend/position'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/recommend/position'}">推荐管理</el-breadcrumb-item>
      <el-breadcrumb-item>推荐位置管理</el-breadcrumb-item>
    </el-breadcrumb>
     <el-breadcrumb separator="/"  v-show="$route.path=='/recommend/content'">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/recommend/position'}">推荐管理</el-breadcrumb-item>
      <el-breadcrumb-item>推荐内容管理</el-breadcrumb-item>
    </el-breadcrumb>
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
    currentroute:this.$route.path
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // var href=window.location.href
    // href=href.split('/#')[1]
    // this.currentroute=href
    // console.log(this.$route.path)
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