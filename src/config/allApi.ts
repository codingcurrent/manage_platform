// 系统相关
export const loginApi = '/admin/acl/index/login' // 登录接口
export const userInfoApi = '/admin/acl/index/info' // 查询用户信息接口
export const logoutApi = '/admin/acl/index/logout' // 退出登录接口

// 商品管理相关
export const queryBrandsApi = '/admin/product/baseTrademark' // 查询品牌接口
export const addBrandApi = '/admin/product/baseTrademark/save' // 保存新增接口
export const updateBrandApi = '/admin/product/baseTrademark/update' // 保存修改接口
export const deleteBrandApi = 'admin/product/baseTrademark/remove' // 删除品牌接口

export const getCategory1Api = '/admin/product/getCategory1' // 查询一级分类接口
export const getCategory2Api = '/admin/product/getCategory2/' // 查询二级分类接口
export const getCategory3Api = '/admin/product/getCategory3/' // 查询三级分类接口
export const attrInfoListApi = '/admin/product/attrInfoList/' // 查询分类下的所有属性列表
export const deleteAttValueApi = '/admin/product/deleteAttr/' // 删除某商品分类下的某条属性
export const saveAttrInfoApi = '/admin/product/saveAttrInfo' // 保存属性信息

// 权限管理相关
export const queryAllUsersApi = '/admin/acl/user' // 查询用户角色列表
export const getAllRolesApi = '/admin/acl/user/toAssign/' // 获取全部的职位的数据与当前用户已有的职位的数据
export const assignRolesApi = '/admin/acl/user/doAssignRole' // 给用户分配角色
export const addNewUserApi = '/admin/acl/user/save' // 新增用户
export const updateUserApi = '/admin/acl/user/update' // 更新用户
export const batchDeleteApi = '/admin/acl/user/batchRemove' // 批量删除用户
export const deleteUserApi = '/admin/acl/user/remove' // 删除某用户

export const getRolesApi = '/admin/acl/role' // 获取全部职位
export const addNewRoleApi = '/admin/acl/role/save' // 保存新增职位
export const updateRoleApi = '/admin/acl/role/update' // 更新已有职位
export const deleteRoleApi = '/admin/acl/role/remove/' // 删除某职位

export const menuListApi = '/admin/acl/permission' // 获取所有的菜单
export const saveNewMenuApi = '/admin/acl/permission/save' // 保存新增菜单
export const updateMenuApi = '/admin/acl/permission/update' // 修改菜单信息
export const deleteMenuApi = '/admin/acl/permission/remove' // 删除某个菜单
export const assignApi = '/admin/acl/permission/toAssign' // 给菜单分配权限
export const saveAssignMenuApi = '/admin/acl/permission/save' // 保存分配菜单
