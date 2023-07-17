// 该文件用于保存三级分类的数据
import { defineStore } from 'pinia'
import {
  getCategory1,
  getCategory2,
  getCategory3,
} from '@/api/product/attr/index'
import type { recordsObj, CategoryResponseData } from '@/api/product/attr/type'

interface stateType {
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  c1Arr: recordsObj[] // 返回一级分类数据
  c2Arr: recordsObj[] // 返回二级分类数据
  c3Arr: recordsObj[] // 返回三级分类数据
}
const useCategoryStore = defineStore('category', {
  state: (): stateType => {
    return {
      c1Id: '',
      c2Id: '',
      c3Id: '',
      c1Arr: [], // 返回一级分类数据
      c2Arr: [], // 返回二级分类数据
      c3Arr: [], // 返回三级分类数据
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponseData = await getCategory1()
      if (result.code == 200) {
        // 在pinia中，可通过this拿到store实例并提供类型支持
        this.c1Arr = result.data
      }
    },
    async getC2(val: number | string) {
      const result: CategoryResponseData = await getCategory2(val)
      this.c1Id = val
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    async getC3() {
      const result: CategoryResponseData = await getCategory3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },
})

export default useCategoryStore
