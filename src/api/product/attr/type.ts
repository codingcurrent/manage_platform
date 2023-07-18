// 商品管理/属性管理相关的类型设定
interface responseData {
  message: string
  code: number
  ok: boolean
}

export interface recordsObj {
  id: number
  createTime: string
  updateTime: string
  name: string
  category1Id?: number | string
  category2Id?: number | string
}

export interface CategoryResponseData extends responseData {
  data: recordsObj[]
}
// 属性值列表类型
export interface attrInfo {
  attrId: number
  id: number
  valueName: string
}

// 利用type为变量起别名
export type AttrInfo = attrInfo[]

// 属性对象
export interface attrInfoObject extends responseData {
  attrName: string
  attrValueList: AttrInfo
  categoryId: number
  categoryLevel: number
  createTime: string
  id: number
  updateTime: string
}
export interface attrInfoLists extends responseData {
  data: attrInfoObject[]
}
