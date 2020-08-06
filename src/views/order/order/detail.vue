<!--  -->
<template>
    <div>
        <div class='orderDeails'>
            <div class="orderDeailsLeft">
                <el-steps :active="userList.uid+1" align-center width='300px'>
                    <el-step title="添加商品"></el-step>
                    <el-step title="等待支付" ></el-step>
                    <el-step title="等待发货"></el-step>
                    <el-step title="等待收货"></el-step>
                    <el-step title="完成订单"></el-step>
                </el-steps>
                <div class="title">商品列表</div>
                <div class="productList">
                    <div class="listLeft">
                        <div class="listLeft1">
                            图片
                        </div>
                        <div class="listLeft2">
                            <p>这是测试测试测试</p>
                            <p>商品属性 : 天王盖地虎</p>
                        </div>
                    </div>
                    <div class="listRight">
                        <p>价格 : ￥99.00</p>
                        <p>购买数量 : 1</p>
                    </div>
                </div>
            </div>
            <div class="orderDetailsRight">
                <div class="price">
                    <div>
                        <div>商品总价</div>
                        <div>￥{{userList.amount}}</div>
                    </div>
                    <div>
                        <div>邮费</div>
                        <div>￥{{userList.payment}}</div>
                    </div>
                    <div>
                        <div>优惠</div>
                        <div>￥{{userList.postage}}</div>
                    </div>
                    <div>
                        <div>订单总价</div>
                        <div>￥{{userList.money}}</div>
                    </div>
                    <div class="have">
                        <div>已支付</div>
                        <div>￥{{userList.reduce}}</div>
                    </div>
                </div>
                <div class="message">
                    <div class="take">收货信息</div>
                    <div>
                        <div>收货人</div>
                        <div>{{userList.post_name}}</div>
                    </div>
                    <div>
                        <div>收货电话</div>
                        <div>{{userList.post_tel}}</div>
                    </div>
                    <div>
                        <div>收货地址</div>
                        <div>{{userList.post_address}}</div>
                    </div>
                <p class="express">快递信息</p>
                </div>
            </div>
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
  userList:[]

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 //获取数据
    handelUserList(){
        this.$http.get("/order/index",{}
        ).then(res=>{      
         for(var item of res.data.data){
             if(item.id == this.$route.query.id){
                  this.userList = item
                  console.log(this.userList)//获取到对应的数据
                  return
             }
         }
        }).catch(err=>{
          console.log(err)
        })
        
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
   this. handelUserList()
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
.orderDeails {
    width: 100%;
    display: flex;
    justify-content: center;
    .orderDeailsLeft {
        width: 900px;
        height: 240px;
        border-radius: 15px;
        padding: 50px;
        margin-right:50px ;
        box-shadow:0 0 10px 3px rgb(100, 100, 100) ;
        .title{
                border-bottom: 1px dashed rgb(92, 91, 91);
                height: 40px;
                color: rgb(160, 157, 157);
                text-align: left;
                line-height: 40px;
                margin-top: 20px;
                padding-left:10px ;
        }
        .productList {
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: 15px;
            box-shadow:0 0 5px 1px rgb(100, 100, 100)  ;
            margin: 20px 0;
            .listLeft {
                    display: flex;
                .listLeft1 {
                    width: 100px;
                    height: 100px;
                    border: 1px solid #000;
                    line-height: 100px;
                    border-radius: 8px;
                    margin-right: 15px;
                }
                .listLeft2 {
                    p {
                        line-height: 50px;
                        text-align: left;
                    }
                }
            }
            .listRight {
                width: 150px;
                margin-left: 20px;
                p {
                    line-height: 50px;
                    text-align: left;
                }

            }
            }
    } 
}
    .orderDetailsRight {
        background-color: rgb(22,22,22);
        width: 350px;
        min-height: 108px;
        border: 2px solid #000;
        border-radius: 15px;
        font-size: 15px;
        padding: 20px;
        color: #ddd;
        box-shadow:0 0 10px 3px rgb(100, 100, 100)  ;
    }

    .price {
        
        div {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        }
        .have{
        border-top: 1px dashed yellow ;
        color:yellow ;
        margin-top:10px ;
        }
    }
    .message {
        .take {
            text-align: left;
            margin-top: 30px;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 20px;
        }

        div {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        }

        .express {
            text-align: left;
            border-bottom: 1px dashed #ddd;
            margin-top: 20px;
            padding-bottom: 20px;
        }
    }
    
</style>