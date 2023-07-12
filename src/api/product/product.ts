import request from '@/utils/request'
import { queryProducts } from '@/config/allApi'
import type { AllBrandResponseData } from '@/api/product/type'

// 获取所有的品牌
export const getAllBrand = (page: number, limit: number) => {
  request.get<any, AllBrandResponseData>(`${queryProducts}/${page}/${limit}`)
}
