import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
     {
        path:'/orderList',
        name:'orderList',
        component:()=> import('../components/OrderList/orderList.vue')
     },
     {
        path:'/orderDetails',
        name:'orderDetails',
        component:()=> import('../components/OrderList/orderDetails.vue')
     },
     {
        path:'/couriers',
        name:'courier',
        component:()=> import('../components/OrderList/courier.vue')
     },

    ]
  },
 
  // {
  //   // path: '',
  //   // name: '',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
