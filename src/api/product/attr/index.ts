// 产品管理/属性管理相关接口
import request from '@/utils/request'
import {
  getCategory1Api,
  getCategory2Api,
  getCategory3Api,
  attrInfoListApi,
  deleteAttValueApi,
} from '@/config/allApi'
import type { CategoryResponseData } from '@/api/product/attr/type'

export const getCategory1 = () =>
  request.get<any, CategoryResponseData>(getCategory1Api)
export const getCategory2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(getCategory2Api + `${category1Id}`)
export const getCategory3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(getCategory3Api + `${category2Id}`)
export const getAttrInfoList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => {
  return request.get(
    attrInfoListApi + `${category1Id}/${category2Id}/${category3Id}`,
  )
}
// 删除某商品分类下的某条属性
export const deleteAttValue = (attrId: number) => {
  return request.delete<any, any>(deleteAttValueApi + `${attrId}`)
}
