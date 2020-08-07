<!--推荐内容管理-->
<template>
  <div class>
    <!-- 标题 -->
    <el-row >
      <el-col :span="24" >
        <div class="title">推荐位内容管理</div>       
      </el-col>
    </el-row>

    <!-- 添加按钮 -->
    <el-row >
      <el-col :span="24" >
        <div class="add-buttom">
          <el-button type="primary" plain @click="handleAdd()">添加推荐内容</el-button>
        </div>
         <div class="search">
      <el-select v-model="params.cate_id" placeholder="请选择">
    <el-option
      v-for="(item,i) in cate"
      :key="i"
      :label="item.name" 
      :value="item.id">

    </el-option>
     </el-select>
       <el-button class="btn" type="primary" @click="handlSearch()" >搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="table_loading"
      element-loading-text="加载中..."
      :data="tableData"
      border
      highlight-current-row
       
      :cell-style="rowClass"  
      :header-cell-style="headClass"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="pinfo.name" label="所属分类" ></el-table-column>
      <el-table-column prop="name" label="推荐信息"></el-table-column>
      <el-table-column prop="memo" label="推荐摘要"></el-table-column>
      <el-table-column prop="img" label="图片">

           <template slot-scope="scope">
                    <img :src="'http://www.masterjoy.top/uploads/'+ scope.row.img"
                        class="scope-img"
                        v-if="scope.row.img">
                </template>
      </el-table-column>
      <el-table-column prop="link" label="链接"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="params.page"
      :page-size="params.pageSize"
       layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

    <!-- 添加推荐位内容 -->


    <el-dialog
      title="添加推荐为内容"
      :visible.sync="dialogFormVisible"
      width="30%"
      text-align="left"
      
    >
      <el-form   :model="form"  ref="cateForm" :rules="rules"
      @submit.native.prevent
      >
        <!-- 选择所属推荐位 -->
        <el-form-item label="选择所属推荐位" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择" :label-width="formLabelWidth">
             <el-option v-for="(item,i) in cate"
                            :key="i"
                            :label="item.name"
                            :value="item.id"></el-option>
              </el-select>
          </el-select>
        </el-form-item>
        <!-- 推荐信息 -->
        <el-form-item label="推荐信息" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐摘要 -->
        <el-form-item label="推荐摘要" :label-width="formLabelWidth" prop="memo">
          <el-input v-model="form.memo" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐链接 -->
        <el-form-item label="推荐链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 推荐图片 -->
        <el-form-item label="推荐图片" :label-width="formLabelWidth"  >
          <el-upload
            :on-success="skuImgUploadSuccess"
            :show-file-list="false"
            :action="imgPostUrl"
             list-type="pictrue"
            :limit="1"
          >
            <el-button slot="trigger" size="small" v-if="!form.img" type="primary">选取文件</el-button>
             <img :src="'http://www.masterjoy.top/uploads/' + form.img"
                            class="upload-img"
                            v-else
                            slot="trigger"
                            alt="">
          </el-upload>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sortd">             
          <el-input  v-model.number="form.sortd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" submitAdd()">提 交</el-button>
      </div>
    </el-dialog>
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
      table_loading: false,
      tableData: [],
      dialogFormVisible: false,
      cate:[],
      params:{
          cate_id: '',
          pageSize:10,
           
      },
      form:{
        id: "",
        pid: "",
        name: "",        
        memo: "",
        link: "",
        img: "",
        sortd: 0,   
      },
     
      total: 0,     
      isAdd: true,
      rules: {
        name: [{ required: true, message: "请选择所属分类" ,trigger : 'blur'}
        ],
         pid: [
           { required: true, type: 'number', message: '请填写推荐信息', trigger: 'change' }
               ],
      },
      inputValue: "",
      imgPostUrl: ' http://www.masterjoy.top/vueapi//common/uploadImg ',
      // imgPostUrl:  this.$http.+ '/common/uploadImg', //图片上传地址
      formLabelWidth: "120px",
    };
    
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // element表格居中
    headClass() {
      return "text-align:center;";
    },
    rowClass() {
      return "text-align:center;";
    },
  //  分页
   
      handleCurrentChange(val) {
          this.params.page=val;
          this._getDAta();
        
      },

      
// 点击添加推荐内容
    handleAdd() {
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.form={
          id: "",
        pid: "",
        name: "",        
        memo: "",
        link: "",
        img: "",
        sortd: 0,  
      }    
    },
    // 点击修改
       handleEdit(index, row) {
        
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.form ={
           id:row.id,
           name:row.name,
           memo:row.memo,
           sortd:row.sort,
           link:row.link,
           img:row.img,                   
           pid:row.pid,
           pinfo:row.pinfo
      }
            

        },
  //  提交添加表单
    submitAdd(){
        let _this=this;
      this.$refs.cateForm.validate(valid=>{
        if(!valid){

          return false
        }else{
           
        }
        // 是否为添加
        if(this.isAdd){
           this.$http.post("/Recommend/addRecommendContent",{                
                   id:this.form.id,
                   name:this.form.name,
                   memo:this.form.memo,
                   sort:this.form.sortd,
                   link:this.form.link,
                   img:this.form.img,                   
                   pid:this.form.pid,
           }).then(res=>{

              this.$message({
               message:res.msg,
               type:'success'
             })
                _this._getDAta();
                this.dialogFormVisible = false

           })
        }else{
            // 编辑
          this.$http.post("/Recommend/editRecommendContent",{
                  id:this.form.id,
                  pid:this.form.pid, 
                  name:this.form.name,
                  memo:this.form.memo,
                   img:this.form.img,                 
                   
                   link:this.form.link,                   
                   sort:this.form.sortd,                    
                   pinfo:this.form.pinfo
          }).then(res=>{
            this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        _this._getDAta();
                        this.dialogFormVisible = false
          })
        }
      })
      

    },
    // 搜索
  handlSearch(){
        this._getDAta();
        
  },
  // 图片上传
    skuImgUploadSuccess( res, files) {
          if (res.status == 1) {
                this.form.img = res.data
            }
    },
  // 删除
  handleDelete(index,row){
    let  _this=this;
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post("/Recommend/delRecommendContent",{
          id:row.id
        }).then(res=>{
              this.$message({
            type: 'success',
            message: '删除成功!'
         
          });
          _this._getDAta();
        }).catch(()=>{
              this.$message({
             type: 'info',
             message: '删除失败!'
            });
        })       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
  },
  
    // 获取数据
    _getDAta() {
       
      this.$http
        .get("/Recommend/content",{params:this.params})
        .then((res) => {    
            (this.total = res.data.total),
           
            (this.tableData = res.data.data),
            (this.table_loading = false);
        })
        .catch((res) => {
          this.table_loading = true;
        });
    },
   getDAta(){
  this.$http.get("/Recommend/index").then(res => {
            this.cate = res.data
        }).catch(err => {
            console.log(err)
        })
   },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
        this.getDAta();
     

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this._getDAta();
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
 .title {
  color: #cccccc;
  border-bottom: 1px dashed #ccc;
  text-align: left;
  padding: 10px;
}
 
.add-buttom {
  padding: 20px 0;
  text-align: left;
  float: left;
}
.search{
   padding: 20px 0;
   float: right;
   .btn{
     margin-left:10px ;
   }
}

.el-pagination{
    padding: 10px;
    text-align: right;
}
.scope-img {
    width: 53px;
}
.upload-img{
  width: 200px;
}
</style>