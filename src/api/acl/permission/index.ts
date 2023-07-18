// 该文件用于设置菜单管理接口
import request from '@/utils/request'
import {
  menuListApi,
  saveNewMenuApi,
  updateMenuApi,
  deleteMenuApi,
} from '@/config/allApi'
import type { menuForm } from './type'

export const getMenuList = () => request.get(menuListApi) // 获取所有菜单
export const saveNewMenu = (data: menuForm) =>
  request.post(saveNewMenuApi, data) // 保存新增菜单
export const updateMenu = (data: menuForm) => request.put(updateMenuApi, data) // 修改现有菜单
export const deleteMenu = (id: number) =>
  request.delete(deleteMenuApi + `/${id}`)
