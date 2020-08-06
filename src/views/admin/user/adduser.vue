<!-- 添加用户页面 -->
<template>
  <div class="adduser">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm addform"
    >
      <el-form-item label="管理员账号" prop="name">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="设置角色" prop="region">
        <el-select placeholder="请选择"  class="addinput" v-model="ruleForm.role_id">
          <!-- 循环渲染数据（必须 因为是动态的数据 且要按数据输出） -->
          <el-option v-for="(role,i) in roles"
              :key="i"
              :label="role.role_name"
              :value="role.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="relname">
        <el-input v-model="ruleForm.real_name"></el-input>
      </el-form-item>

      <!-- 设置一个循环 -->
      <el-form-item label="是否启用">
        <el-radio-group v-model="ruleForm.status">
          <el-radio border
              v-for="(la, i) in status"
              :key="i"
              :label="i">{{la}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name:"adduser",
  //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
        ruleForm: {
            // 姓名
            user_name: "",
            // 是否启用
            status: 0,
            // 密码
            password: "",
            // 角色id
            role_id:1,
            // 账户id
            id:null,
            // 真实姓名
            real_name:"",
        },
        status:{},
        roles: {},
        // 表单规则
        rules: {
            name: [
            // { required: true, message: "必填项", trigger: "change" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            relname: [
            // { required: true, message: "必填项", trigger: "change" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            region: [
            // { required: true, message: "必选项", trigger: "blur" },
            ],
            password: [
            { min:6, message: "最少输入六位数", trigger: "blur" },
            ],
        },
        };
    },

  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        //   发起添加用户的请求并跳转页面
        this.$http.post("/user/userAdd",this.ruleForm).then(res=> {
          // this.$message({
          //   message:res.msg,
          //   type:"success"
          // })
          this.$router.push('/admin/user')
        })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取角色数据 渲染到页面
    getRole() {
      this.$http.get("/user/userAdd").then(res=> {
        this.roles = res.data.role;
        this.status = res.data.status;
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
        this.$nextTick(() => {
        this.getRole()
    })
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
<style  lang='less' scoped>
.adduser {
    margin: 20px 60px;
    .addinput {
        width: 300px;
    }
    .addform {
        width: 400px;
    }
    .userstatus {
        margin-right: 7px;
    }
}

</style>