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
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="设置角色" prop="region">
        <el-select placeholder="请选择"  class="addinput" v-model="ruleForm.region">
          <el-option label="超管" value="shanghai"></el-option>
          <el-option label="系统维护员" value="beijing"></el-option>
          <el-option label="仓库管理员" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="relname">
        <el-input v-model="ruleForm.relname"></el-input>
      </el-form-item>

      <!-- 设置一个循环 -->
      <el-form-item label="是否启用">
        <el-radio-group v-model="ruleForm.status">
            <el-radio border label="正常" class="userstatus"></el-radio>
            <el-radio border label="停封"></el-radio>
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
            name: "",
            // 设置角色
            region: "",
            // 是否启用
            status: 0,
            // 密码
            password: "",
            // 角色id
            role_id:"",
            // 账户id
            id:null,
        },
        status:{},
        // 表单规则
        rules: {
            name: [
            { required: true, message: "必填项", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            relname: [
            { required: true, message: "必填项", trigger: "change" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
            region: [
            { required: true, message: "必选项", trigger: "blur" },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        //   跳转页面
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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