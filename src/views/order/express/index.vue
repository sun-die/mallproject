<!-- 快递公司  -->
<template>
  <div class>
    <h4 class="orderTitle">快递公司列表</h4>
    <!-- 添加快递公司  弹出框 -->
    <div>
       <el-button type="primary" plain @click="addExpress" >添加快递公司</el-button>

      <el-dialog title="添加快递公司" :visible.sync="dialogFormVisible" width="450px">
        <el-form :model="form" append-to-bod="true" ref="cateForm"   :rules="formRule" >
          <el-form-item label="快递公司" :label-width="formLabelWidth" required  prop="name">
            <el-input v-model="form.name" autocomplete="off" value></el-input>
          </el-form-item>

            <el-form-item label="快递公司电话" :label-width="formLabelWidth" prop="tel">
            <el-input v-model="form.tel" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="快递公司地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>

             <el-form-item label="联系人/收件人" :label-width="formLabelWidth" prop="contact">
            <el-input v-model="form.contact" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话" :label-width="formLabelWidth" prop="contact_tel">
            <el-input v-model="form.contact_tel" autocomplete="off"></el-input>
          </el-form-item> 



          <!-- <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="submit">提交</el-button>
        </div> -->
        </el-form>  
           <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" submit">提 交</el-button>
      </div>
      </el-dialog>
    </div>
    <!-- 添加快递公司  弹出框    结束-->
    <!-- 快递公司  名片 -->
    <div class="business">
      <el-row :gutter="30">
        <el-col :span="8" v-for="(item,index) in card">
          <div class="grid-content bg-purple">
            <h2 class="title">
              <div>{{item.name}}</div>
              <div class="titleButton">
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  circle
                  size="small"
                  @click="redact(index)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="handleDel(item.id, index)"
                ></el-button>
              </div>
            </h2>
            <div>
              <div>公司电话</div>
              <div>{{item.tel}}</div>
            </div>
            <div>
              <div>公司地址</div>
              <div>{{item.address}}</div>
            </div>
            <div>
              <div>联系人/收件人</div>
              <div>{{item.contact}}</div>
            </div>
            <div>
              <div>联系人电话</div>
              <div>{{item.contact_tel}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 快递公司  名片  结束 -->
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
      dialogFormVisible: false,
      form: {
        name: "", //快递公司
        tel: "", //快递公司电话
        address: "", //快递公司地址
        contact: "", //l联系人
        contact_tel: "", //联系人电话
      },
      formLabelWidth: "120px",
      card: [],
      formRule: {
                name: [
                    { required: true, message: '快递公司必填', trigger: 'blur' }
                ]
            }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //请求数据
    handelUserList() {
      this.$http
        .get("/express/index", {})
        .then((res) => {
          this.card = res.data; //获取的数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加快递公司
    addExpress() {
      this.dialogFormVisible = true;
      Object.keys(this.form).map((item) => {
        this.form[item] = "";
      });
    },
    //删除事件
    handleDel(id, index) {
      this.$confirm("是否确定删除快递公司", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(111);
        this.$http.post("express/delExpress", {
            id: id,
          })
          .then((res) => {
            console.log(222);
            this.handelUserList();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //修改事件
    redact: function (index) {
      this.form = {};
      this.form = this.card[index];
      this.dialogFormVisible = true;
      return index;
    },

    //提交事件
    submit: function () {
      this.$refs.cateForm.validate((valid) => {
        if (!valid) {
          return false;
        }else{
          if (this.form.id > 0) {
          //修改
            this.$http.post('express/editExpress',this.form)
            .then(res =>{
              this.$message({
                message:res.msg,
                type:'success'
              })
              this.handelUserList()//再次获取数据渲染
              this.dialogFormVisible = false
            });
        } else {
            //添加
            this.$http.post('express/addExpress',this.form)
            .then(res =>{
              this.$message({
                message:res.msg,
                type:'success'
              })
              this.card.unshift(this.form)//追加到数据最前面
              this.dialogFormVisible = false;
              this.handelUserList();
            })
          }
        }
        
      }
    )},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.handelUserList();
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
.orderTitle {
  height: 50px;
  border-bottom: 1px dashed rgb(204, 204, 204);
  color: rgb(204, 204, 204);
  font-weight: 400;
  text-align: left;
  line-height: 70px;
  margin-bottom: 20px;
}
.business {
  margin-top: 20px;
 
}
.grid-content {
  background: rgb(230, 251, 227);
  border-radius: 10px;
  padding: 15px 0;
  margin-bottom: 30px;
   box-shadow:0 0 20px -6px rgb(187, 187, 187);
  h2.title {
    display: flex;
    height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 0 15px;
    div.titleButton {
      el-button {
        width: 30px;
      }
    }
  }
  > div {
    display: flex;
    border-bottom: 1px dashed #ddd;
    height: 40px;
    margin: 0 15px;
    padding: 0 5px;
    div {
      width: 200px;
      height: 40px;
      line-height: 40px;
    }
  }
  div:nth-last-child(1) {
    border: none;
  }
}
</style>