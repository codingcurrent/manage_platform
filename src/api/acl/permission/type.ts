// 接口返回格式
export interface responseData {
  code: number
  message: string
  ok: boolean
}
// 某级菜单数据类型
export interface menu {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: number
  level: number
  children?: menu[] // children依然是menu类型
}

// 全部菜单返回类型
export interface menuList extends responseData {
  data: menu[]
}

// 添加/编辑菜单表单数据
export interface menuForm {
  id?: number
  name: string
  code: string
  pid: number
  level: number
}
// 添加/编辑职位表单数据
export interface roleForm {
  id?: number
  roleName: string
}
// 职位列表
export interface roleList extends responseData {
  data: roleForm[]
}

// 菜单列表
export interface RolesList {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: RolesList[]
}

// 分配菜单返回数据
// 菜单列表
export interface RolesListResponse extends responseData {
  data: RolesList[]
}
// 分配菜单权限参数
export interface setMenu {
  id?: number
  code: string
  level: number //几级菜单
  name: string //菜单的名字
  pid: number //菜单的ID
}
