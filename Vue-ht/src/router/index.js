import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'
// import { Message } from 'element-ui'

import Login from "../views/Login"
import Register from "../views/Register"
import Index from "../views/index"
import NotFound from '../views/404'
import Home from "../views/Home"
import Info from '../views/Info'
import FundList from '../views/FundList'

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
    {
      path:'/register',
      component:Register
    },
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/index',
          redirect:'/home'
        },
        {
          path:'/home',
          component:Home
        },
        {
          path:'/info',
          meta:{title:'用户信息'},
          component:Info,
        },
        {
          path:'/fundlist',
          component:FundList,
          meta:{ login_require: false}
          // beforeEnter:(to,form,next)=>{
          //   if(store.getters.user.identity=='common'){
          //     Message({
          //       message:'权限不足，该页面无法访问',
          //       type: 'error'
          //   })

          //   }else{
          //     next()
          //   }
          // }
        }
      ]
    },
    {
      path:'*',
      name:'/404',
      component:NotFound
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const token=localStorage.token?true:false
  if(to.path=='/login' || to.path=='/register'){
    next()
  }else{
    token?next():next('/login')
  }
})

export default router
