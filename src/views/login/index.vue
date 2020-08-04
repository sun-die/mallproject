<!--  -->
<template>
<div class='login-container'>
    <div class="login_box">
        <div class="avatar_box">
            <img src="../../assets/img/logo.jpg" alt="">
        </div>
        <el-form label-width="0px"
            :model="loginForm"
            class="login_form">
            <!-- 用户名 -->
            <el-form-item>
                <el-input autoComplete="on"
                    placeholder="user"
                ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item>
                <el-input
                    placeholder="password" 
                    show-password
                ></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item >
                <el-button type="primary" class="btns">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
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
    loginForm:{
        
    }
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
<style lang='less'>
.login-container{
    background: #2D3A4B;
    height: 100vh;
}
.login_box{
    width: 400px;
    height: 300px;
    // background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height: 80px;
        width: 80px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 5px;
        background: #fff;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 30px 15px;
    outline: none;
    }
    .btns{
        width: 100%;
        cursor: pointer;
    }
    .el-input input{
        height: 50px;
        background: transparent;
        outline: none;
        padding-left: 30px;
    }
}




</style>