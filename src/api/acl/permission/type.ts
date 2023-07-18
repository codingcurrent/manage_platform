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
