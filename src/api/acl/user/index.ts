import request from '@/utils/request'
import {
  queryAllUsersApi,
  deleteUserApi,
  getAllRolesApi,
} from '@/config/allApi'
import { userListResponseData } from './type'
// 查询用户列表
export const queryUserList = (page: number, limit: number, username: string) =>
  request.get<any, userListResponseData>(
    queryAllUsersApi + `/${page}/${limit}?username=${username}`,
  )
// 查询全部用户以及某用户下的角色
export const queryRoleList = (userId: number) =>
  request.get(getAllRolesApi + `/${userId}`)
// 删除某用户
export const deleteUser = (id: number) =>
  request.delete<any, any>(deleteUserApi + `/${id}`)
