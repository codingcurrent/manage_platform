export interface responseData {
  code: number
  message: string
  ok: boolean
}
// 用户数据类型
export interface userInfo {
  id?: number
  createTime: string
  updateTime: string
  username: string
  password: string
  name: string
  phone: null
  roleName: string
}
// 权限管理/用户列表接口查询返回数据类型
export interface userListResponseData extends responseData {
  data: userInfo[]
}

// 用户角色信息
export interface rolesInfo {
  createTime: string
  id: number
  remark: null
  roleName: string
  updateTime: string
}

export interface rolesInfoList extends responseData {
  data: rolesInfo[]
}
