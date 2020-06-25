import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter)
import routes from './routes.js'
import store from '@/store' 

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 创建路由器对象
const router=new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass:"active"
})

// 添加全局前置守卫
//功能.只有登陆了,才能看个人中心界面
router.beforeEach((to,from,next)=>{
  const targetPath=to.path
  if(targetPath==='/personal'){ //需要进行登录检查
    // 如果已经登录,放行
    if(store.state.userModule.userInfo.nickname){
      next()
    }else{
      // 如果没有,强制跳转到登录页面
      next('/login?redirect=' + targetPath) // 同时需要使用query参数将目标路径携带给Login
    }
  }else{
    // 否则不需要检查,直接放行
    next()
  }
})


export default router