<!--  -->
<template>
  <div class>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="分类" prop="cate_id" class="types">
            <el-select v-model="ruleForm.cate_id" placeholder="请选择">
              <el-option v-for="(item, index) in cate" :label="item" :value="index" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存" prop="stock">
            <el-input style="width: 200px" type="number" v-model.number="ruleForm.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序" prop="sort">
            <el-input style="width: 200px" type="number" v-model.number="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="市场价" prop="market_price">
            <el-input style="width: 200px" type="number" v-model.number="ruleForm.market_price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="售价" prop="price">
            <el-input style="width: 200px" type="number" v-model.number="ruleForm.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="售出" prop="sales_volume">
            <el-input style="width: 200px" type="number" v-model.number="ruleForm.sales_volume"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 添加图片 -->
      <el-row>
        <el-col :span="24">
          <div class="upimg">图片上传(第一张将作为默认显示)</div>
        </el-col>
      </el-row>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>

      <el-row class="choose">
        <el-col :span="12">
          <el-form-item label="是否上架" prop="is_hot">
            <el-radio v-model.number="ruleForm.is_hot" :label="1" border>上架</el-radio>
            <el-radio v-model.number="ruleForm.is_hot" :label="0" border>下架</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否热卖" prop="status">
            <el-radio v-model.number="ruleForm.status" :label="1" border>是</el-radio>
            <el-radio v-model.number="ruleForm.status" :label="0" border>否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="upimg">详细内容</div>
        </el-col>
      </el-row>
      <el-row class="detail">
        <el-col :span="24">
          <el-input
            :rows="4"
            resize="none"
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span = "4" :offset="20" type="flex" justify="end">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="btn">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      dialogImageUrl: "",
      dialogVisible: false,
      text: "",
      textarea: "",
      cate: ["吃", "喝", "玩", "乐", "衣", "食", "住", "行"],
      ruleForm: {
        title: "",
        cate_id: "",
        market_price: 0,
        price: 0,
        stock: 0,
        sales_volume: 0,
        sort: 0,
        imgs: [],
        is_hot: 0,
        status: 1,
        desc: "",
        sku: [],
      },
      rules: {
        title: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 4, max: 25, message: "请输入4-25个字", trigger: "blur" },
        ],
        cate_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur",
          },
        ],
        market_price: [
          {
            required: true,
            min: 0.01,
            message: "市场价不得低于0.01元",
            trigger: "blur",
            type: "number",
          },
        ],
        price: [
          {
            required: true,
            min: 0.01,
            message: "售价不得低于0.01元",
            trigger: "blur",
            type: "number",
          },
        ],
        stock: [
          {
            required: true,
            min: 1,
            message: "库存不能低于1个",
            trigger: "blur",
            type: "number",
          },
        ],
        sales_volume: [
          {
            required: true,
            min: 0,
            message: "销售个数不能为负数",
            trigger: "blur",
            type: "number",
          },
        ],
        sort: [
          {
            required: true,
            min: 0,
            max: 255,
            message: "排序0-255之间",
            trigger: "blur",
            type: "number",
          },
        ],
        is_hot: [
          {
            required: true,
            enum: [0, 1],
            message: "非法数据",
            trigger: "blur",
            type: "number",
          },
        ],
        status: [
          {
            required: true,
            enum: [0, 1],
            message: "非法数据",
            trigger: "blur",
            type: "number",
          },
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
    chooseCate() {
      console.log(111);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
<style lang = 'less' scoped>
.el-form {
  padding: 10px 50px;
  .title {
    margin-bottom: 20px;
  }
  .upimg {
    font-size: 12px;
    color: #ccc;
    line-height: 40px;
    margin-bottom: 22px;
    border-bottom: 1px dashed #ccc;
  }
  .choose {
    margin-top: 20px;
  }
  .detail {
    margin-bottom: 20px;
  }
  .btn{
      float: right;
  }
}
</style>