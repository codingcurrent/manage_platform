// 此文件用于设置路由鉴权，即路由权限
import router from '@/router'
//获取用户仓库内部token数据,去判断用户是否登录成功
import userStore from '@/store/modules/user'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置全局路由守卫：所有路由都遵循
router.beforeEach(async(to:any, from:any, next) => {
  nprogress.start()
  const token = userStore().token
  
  const username = userStore().username
  if(token) {
    if(to.path == '/login') {
      next('/home')
    } else {
      if(username) {
        next()
      } else {
        try {
          await userStore().getUserInfo()
          next(`${to.path}`)
        } catch (error) {
          await userStore().userLogout()
          next({path: '/login', query: {redirect: to.path}})
        }
      }
    }
  } else {
    if(to.path == '/login') {
      next()
    } else {
      next({path: '/login', query: {redirect: to.path}})
    }
  }
});

router.afterEach((to, from, next) => {
  nprogress.done()
})