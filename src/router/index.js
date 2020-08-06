import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:"/404",
      name:"404",
      component: () => import("@/views/404"),
    },
    {
      path:'/login',
      component:() => import('../views/login/index')
    },
    {
      path:'/home',
      component:Home,
      redirect:'pagetop',
      children:[
        {
          path:'/pagetop',
          name:"pagetop",
          component:() => import('../components/Home/HomeMain')
        },
        {
          path:'/admin/user',
          name:"user",
          component:() => import('../views/admin/user/index')
        },
        {
          path:'/admin/role',
          name:"role",
          component:() => import('../views/admin/role/index'),
        },
        {
          path:'/admin/adduser',
          name:"adduser",
          component:() => import('../views/admin/user/adduser')
        },
        {
          path:'/product/cate',
          name:"cate",
          component:() => import('../views/goods/cate/index')
        },
        {
          path:'/product/goods',
          name:"goods",
          component:() => import('../views/goods/pro/index')
        },
        {
          path:'/product/addgoods',
          name:"addgoods",
          component:() => import('../views/goods/pro/addgoods')
        },
        {
          path:'/product/editgoods',
          name:"editgoods",
          component:() => import('../views/goods/pro/editgoods')
        },
        {
          path:'/member/list',
          good:"list",
          component:() => import('../views/member/index')
        },
        {
          path:'/recommend/content',
          name:"content",
          component:() => import('../views/recommend/content/index')
        },
        {
          path:'/recommend/position',
          name:"position",
          component:() => import('../views/recommend/position/index')
        },
        {
          path:'/order/order',
          name:"order",
          component:() => import('../views/order/order')
        },
        {
          path:'/order/express',
          name:"express",
          component:() => import('../views/order/express')
        },
        {
          path:'/order/order/detail',
          name:"detail",
          component:() => import('../views/order/order/detail')
        }
      ]
    },
    { path: "*", redirect: "/404"}
  ]
  
  // 防止重复点击当前网址跳转
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path==="/login") return next()
  const token=window.sessionStorage.getItem("token")
  if(!token) return next('/login')
  next();
})



export default router
