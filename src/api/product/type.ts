// 所有返回结果
interface responseData {
  code: number
  message: string
  ok: boolean
}

// 品牌参数
export interface brand {
  id?: number
  logoUrl: string
  tmName: string
}

// 查询所有品牌的返回结果
export interface AllBrandResponseData extends responseData {
  data: {
    pages: number
    records: brand[]
    size: number
    total: number
    current: number
    searchCount: boolean
  }
}
