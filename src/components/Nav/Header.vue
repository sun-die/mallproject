<!--  -->
<template>
  <div class="home-header">
     <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->


    <Breadcrumb></Breadcrumb>

    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 弹出框 -->
    <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img class="user-avatar" :src="avatar" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="toPagetop">主页</span></el-dropdown-item>
        <el-dropdown-item><span @click="toLogin">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import avatar from "@/assets/img/avatar.gif";
import Breadcrumb from '../../components/Breadcrumb'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Breadcrumb
  },
  data() {
    //这里存放数据
    return {
      avatar,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toPagetop(){
      this.$router.push("/pagetop")
    },
    toLogin(){
      window.sessionStorage.clear();
      this.$router.push("/login")
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
<style lang='less' scoped>
.home-header {
    height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  .el-dropdown-link {
    cursor: pointer;
    .user-avatar {
      height: 40px;
      width: 40px;
      border-radius: 5px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>