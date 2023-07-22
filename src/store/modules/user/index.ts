import { defineStore } from 'pinia'
import { login, userInfo, logout } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/type'
import { REMOVE_TOKEN, SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoutes, asyncRoutes, anyRoute } from '@/router/routes'
import router from '@/router/index'
import cloneDeep from 'lodash/cloneDeep'

// userState的类型
import { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
const filterRoutes = (val: any, userRouter: any) => {
  return val.filter((item: any) => {
    if (userRouter.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoutes(item.children, userRouter)
      }
      return true
    }
  })
}

const userStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    // 登录接口
    async userLogin(data: loginForm) {
      const result: loginResponseData = await login(data)
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result: userInfoResponseData = await userInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        let asyncs = filterRoutes(cloneDeep(asyncRoutes), result.data.routes)
        // 所有的菜单数据
        this.menuRoutes = [...constantRoutes, ...asyncs, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...asyncs, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    // 退出登录接口
    async userLogout() {
      const result = await logout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
  },
})

//对外暴露获取小仓库方法
export default userStore
