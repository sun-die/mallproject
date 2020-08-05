import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index'
import Home from '../views/home/index'
import HomeMain from '../components/Home/HomeMain'
import User from '../views/admin/user/index'
import addUser from '../views/admin/user/adduser'
import Role from '../views/admin/role/index'
import Cate from '../views/goods/cate/index'
import Pro from '../views/goods/pro/index'
import Member from '../views/member/index'
import Content from '../views/recommend/content/index'
import Position from '../views/recommend/position/index'
import Order from '../views/order/order'
import OrderDetail  from '../views/order/order/detail'
import  Express from '../views/order/express'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    // {
    //   path:'/pagetop',
    //   redirect:'/home'
    // },
    {
      path:'/home',
      component:Home,
      redirect:'pagetop',
      children:[
        {path:'/pagetop',component:HomeMain},
        {path:'/admin/user',component:User},
        {path:'/admin/role',component:Role},
        {path:'/admin/adduser',component:addUser},
        {path:'/product/cate',component:Cate},
        {path:'/product/goods',component:Pro},
        {path:'/member/list',component:Member},
        {path:'/recommend/content',component:Content},
        {path:'/recommend/position',component:Position},
        {path:'/order/order',component:Order},
        {path:'/order/express',component:Express}
      ]
    }
  ]

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
