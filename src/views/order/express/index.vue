<!-- 快递公司  -->
<template>
<div class=''>
    <h4 class="orderTitle">快递公司列表</h4>
    <div>
        <el-button type="primary" plain  @click="dialogFormVisible = true">添加快递公司</el-button>
        <el-dialog title="添加快递公司" :visible.sync="dialogFormVisible" width='450px'>
            <el-form :model="form" append-to-bod=true>
                <el-form-item label="* 快递公司" :label-width="formLabelWidth" >
                <el-input v-model="form.name" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="快递公司电话" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="快递公司地址" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="联系人/收件人" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="联系人电话" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
            </div>
        </el-dialog>
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
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
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
<style lang='less' scoped>
.orderTitle {
    height: 50px;
    border-bottom: 1px dashed rgb(204, 204, 204);
    color: rgb(204, 204, 204);
    font-weight: 400;
    text-align: left;
    line-height: 70px;
  }
</style>