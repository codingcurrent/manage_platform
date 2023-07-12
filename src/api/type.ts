export interface loginForm {
  usrname: string
  password: string
}

// 定义所有接口返回类型
export interface responseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回类型
export interface loginResponseData extends responseData {
  data: string
}

// 定义用户信息查询接口返回类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
