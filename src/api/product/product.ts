import request from '@/utils/request'
import {
  queryBrandsApi,
  deleteBrandApi,
  addBrandApi,
  updateBrandApi,
} from '@/config/allApi'
import type { AllBrandResponseData, brand } from '@/api/product/type'

// 获取所有的品牌
export const getAllBrand = (page: number, limit: number) =>
  request.get<any, AllBrandResponseData>(`${queryBrandsApi}/${page}/${limit}`)

// 保存新增接口
export const saveAddBrand = (data: brand) =>
  request.post<any, any>(addBrandApi, data)

// 保存更新接口
export const updateBrand = (data: brand) => {
  return request.put<any, any>(updateBrandApi, data)
}
// 删除所选品牌
export const deleteBrand = (id: number) =>
  request.delete<any, any>(`${deleteBrandApi}/${id}`)
