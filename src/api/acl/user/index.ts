import request from '@/utils/request'
import {
  queryAllUsersApi,
  deleteUserApi,
  getAllRolesApi,
  assignRolesApi,
  addNewUserApi,
  updateUserApi,
  batchDeleteApi,
} from '@/config/allApi'
import { userListResponseData, setRole, userInfoList } from './type'
// 查询用户列表
export const queryUserList = (page: number, limit: number, username: string) =>
  request.get<any, userListResponseData>(
    queryAllUsersApi + `/${page}/${limit}?username=${username}`,
  )
// 查询全部用户以及某用户下的角色
export const queryRoleList = (userId: number) =>
  request.get(getAllRolesApi + `/${userId}`)

// 给某用户分配角色
export const assignRolesToUser = (data: setRole) => {
  return request.post<any, any>(assignRolesApi, data)
}
// 新增用户
export const addNewUser = (data: userInfoList) =>
  request.post<any, any>(addNewUserApi, data)

// 更新用户
export const updateUser = (data: userInfoList) =>
  request.put<any, any>(updateUserApi, data)

// 批量删除用户
export const batchDelete = (idList: number[]) => {
  return request.delete<any, any>(batchDeleteApi, { data: idList })
}
// 删除某用户
export const deleteUser = (id: number) =>
  request.delete<any, any>(deleteUserApi + `/${id}`)
