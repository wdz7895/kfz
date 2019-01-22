import Vue from 'vue'
import Router from 'vue-router'
import home from "@/view/home"
import login from "@/view/login"
import homeChildren from "@/router/home/routercfg.js"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta:{
        isLogin:true
      },
      name: 'home',
      component: home,
      children:homeChildren.routes
    },{
      path:"/login",
      meta:{
        isLogin:false
      },
      name:"login",
      component:login
    }
  ]
})
