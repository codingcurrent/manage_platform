import { defineStore } from 'pinia';
import {login, userInfo, logout} from '@/api/user'
import type { loginForm, loginResponseData, userInfoResponseData } from "@/api/type";
import { REMOVE_TOKEN, SET_TOKEN, GET_TOKEN } from '@/utils/token'

let userStore = defineStore('user', {
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: [],
      username: '',
      avatar: ''
    }
  },
  actions: {
    // 登录接口
    async userLogin(data: loginForm) {
      let result:loginResponseData = await login(data)
      if(result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      let result:userInfoResponseData = await userInfo()
      if(result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    // 退出登录接口
    async userLogout() {
      let result = await logout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(result.data))
      }
    }
  }
})

//对外暴露获取小仓库方法
export default userStore;