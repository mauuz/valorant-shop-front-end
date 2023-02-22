import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../page/login/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        redirect:true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../page/main/index.vue'),
      children:[
        {
          path: 'store',
          name: 'store',
          component: () => import('../page/store/index.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'user',
          name: 'userInfo',
          component: () => import('../page/userInfo/index.vue'),
          meta:{
            auth:true
          }
        },

      ]
    },
    {
      path: '/code',
      name: 'code',
      component: () => import('../page/captcha/index.vue'),
      meta:{
        auth:true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../page/notFound/index.vue'),
    }
  ]
})
router.beforeEach(async (to,from,next) =>{
  let userInfo = localStorage.getItem('userInfo')
  // if(to.name == 'login'){
  //   if(userInfo){
  //     let userInfoObj = JSON.parse(userInfo)
  //     if('token' && 'username' && 'FA2' in userInfoObj){
  //       next('/store')
  //     }else {
  //       next()
  //     }
  //
  //   }else {
  //     next()
  //   }
  //
  // }else {
  //   next()
  // }
  // if (to.matched.length === 0) {
  //   // 如果没有匹配到任何路由，则重定向到 NotFound 页面
  //   next({ name: 'NotFound' })
  // } else {
  //   next()
  // }
  if(to.meta.auth){
    if(userInfo){
      let userInfoObj = JSON.parse(userInfo)
      if('token' && 'username' && 'FA2' in userInfoObj){
        if(to.name == 'code'){
            if(!userInfoObj['FA2']){
              next('/index/store')
            }else {
              next()
            }
        }else {
          next()
        }


      }else {
        localStorage.clear()
        next('/')
      }

    }else {
      next('/')
    }

  }else {
    if(to.meta.redirect){
      if(userInfo){
        let userInfoObj = JSON.parse(userInfo)
        if('token' && 'username' && 'FA2' in userInfoObj){
          next('/index/store')
        }else {
          console.log('123123')
          next()
        }

      }else {
        next()
      }
    }else {
      next()
    }

  }
})
export default router
