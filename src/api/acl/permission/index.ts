// 该文件用于设置菜单管理接口
import request from '@/utils/request'
import {
  menuListApi,
  saveNewMenuApi,
  updateMenuApi,
  deleteMenuApi,
  getRolesApi,
  deleteRoleApi,
  addNewRoleApi,
  updateRoleApi,
} from '@/config/allApi'
import type { menuForm, roleForm } from './type'

export const getMenuList = () => request.get(menuListApi) // 获取所有菜单
export const saveNewMenu = (data: menuForm) =>
  request.post(saveNewMenuApi, data) // 保存新增菜单
export const updateMenu = (data: menuForm) => request.put(updateMenuApi, data) // 修改现有菜单
export const deleteMenu = (id: number) =>
  request.delete(deleteMenuApi + `/${id}`) // 删除某菜单

export const getRolesList = (page: number, limit: number, roleName: string) =>
  request.get(getRolesApi + `/${page}/${limit}?roleName=${roleName}`) // 获取当下全部职位
export const saveRole = (data: roleForm) => request.post(addNewRoleApi, data) // 保存新增职位
export const updateRole = (data: roleForm) => request.put(updateRoleApi, data)
export const deleteRole = (id: number) =>
  request.delete(deleteRoleApi + `${id}`) // 删除某职位
