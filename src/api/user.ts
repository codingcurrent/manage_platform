import request from '@/utils/request'
import { loginApi, userInfoApi, logoutApi } from '@/config/allApi'
import { loginForm, loginResponseData, userInfoResponseData } from './type'
export const login = (data: loginForm) =>
  request.post<any, loginResponseData>(loginApi, data)
export const userInfo = () =>
  request.get<any, userInfoResponseData>(userInfoApi)
export const logout = () => request.post<any, any>(logoutApi)
