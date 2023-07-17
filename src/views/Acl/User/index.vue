<template>
  <el-card>
    <el-form :inline="true" class="search-area">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名" v-model="searchText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList">搜索</el-button>
        <el-button @click="resetList">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser" style="margin-bottom: 10px">
      添加用户
    </el-button>
    <el-button type="primary" @click="deletePatch" style="margin-bottom: 10px">
      批量删除用户
    </el-button>
    <el-table border :data="useLists">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        prop="name"
        aline="center"
      ></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column
        label="用户角色"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="280px">
        <!-- 自定义插槽 -->
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Pointer"
            @click="assignRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Delete"
            @click="deleteRole(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    :background="true"
    layout="prev, pager, next, jumper, ->,sizes,total"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-drawer v-model="assignDrawer">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="assignedRolesList"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="(item, index) in allRolesList"
              :key="index"
              :label="item"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="assignDrawer = false">取消</el-button>
        <el-button type="primary" @click="confirmClick()">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="addOrEditDrawer">
    <template #header>
      <h4>{{ userInfoForm.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userInfoForm">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userInfoForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userInfoForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-if="!userInfoForm.id">
          <el-input
            placeholder="请输入用户密码"
            v-model="userInfoForm.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="addOrEditDrawer = false">取消</el-button>
        <el-button type="primary" @click="saveInfo">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  queryUserList,
  deleteUser,
  queryRoleList,
  assignRolesToUser,
  addNewUser,
  updateUser,
} from '@/api/acl/user'
import type {
  userInfo,
  rolesInfoList,
  userInfoList,
  setRole,
  rolesInfo,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

onMounted(() => {
  getUserList()
})
// 当前页
let currentPage = ref<number>(1)
// 当前页码
let pageSize = ref<number>(5)
// 总页码
let total = ref<number>(0)
// 用户列表数据
let useLists = ref<userInfo>([])
// 搜索字段
let searchText = ref<string>('')
// 分配角色控制
let assignDrawer = ref<boolean>(false)
// 添加或编辑用户控制
let addOrEditDrawer = ref<boolean>(false)
// 要分配角色的用户id
let assignId = ref<number>(0)
// 用户信息
let userInfoForm = reactive<userInfoList>({
  id: 0,
  name: '',
  password: '',
  roleName: '',
  username: '',
})
// 所有用户角色
let allRolesList = ref<rolesInfoList>([])
// 当前用户拥有角色
let assignedRolesList = ref<rolesInfoList>([])
// 是否全选
let checkAll = ref<boolean>(false)
// 是否半选
let isIndeterminate = ref<boolean>(false)
// 查询用户列表
const getUserList = async () => {
  let result = await queryUserList(
    currentPage.value,
    pageSize.value,
    searchText.value,
  )
  if (result.code == 200) {
    useLists.value = result.data.records
    total.value = result.data.total
  }
}
// 重置
const resetList = () => {
  searchText.value = ''
  getUserList()
}
// 页码改变
const handleCurrentChange = (val: number) => {
  getUserList()
}
// 页数改变
const handleSizeChange = (val: number) => {
  getUserList()
}
// 分配角色控制
const assignRole = async (val: userInfoList) => {
  assignDrawer.value = true
  let result: rolesInfoList = await queryRoleList(val.id)
  assignId.value = val.id
  allRolesList.value = result.data.allRolesList
  assignedRolesList.value = result.data.assignRoles
}
// 删除角色
const deleteRole = async (id: number) => {
  let result = await deleteUser(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '已成功删除该用户',
    })
    getUserList()
  }
}
// 全选
const handleCheckAllChange = (val: boolean) => {
  val
    ? (assignedRolesList.value = allRolesList.value)
    : (assignedRolesList.value = [])
  isIndeterminate.value = false
}
// 多选框事件
const handleCheckedChange = (val: []) => {
  assignedRolesList.value = val
  isIndeterminate.value = val.length !== assignedRolesList.value.length
}
// 分配角色提交
const confirmClick = async () => {
  let setUser = []
  setUser = assignedRolesList.value.map((item) => item.id)
  let data: setRole = {
    roleIdList: setUser,
    userId: assignId.value,
  }
  let result: any = await assignRolesToUser(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '用户角色分配成功',
    })
    assignDrawer.value = false
    getUserList()
  } else {
    ElMessage({
      type: 'success',
      message: '用户角色分配失败',
    })
  }
}
// 添加用户
const addUser = () => {
  addOrEditDrawer.value = true
  Object.assign(userInfoForm, {
    id: 0,
    name: '',
    password: '',
    roleName: '',
    username: '',
  })
}
// 编辑某用户
const editUser = (row: userInfoList) => {
  addOrEditDrawer.value = true
  Object.assign(userInfoForm, row)
}
// 保存新增/编辑用户
const saveInfo = async () => {
  let result = []
  userInfoForm.id
    ? (result = await updateUser(userInfoForm))
    : (result = await addNewUser(userInfoForm))
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userInfoForm.id ? '用户新增成功' : '用户修改成功',
    })
    addOrEditDrawer.value = false
    getUserList()
  } else {
    ElMessage({
      type: 'error',
      message: userInfoForm.id ? '用户新增失败' : '用户修改失败',
    })
  }
}
// 批量删除用户
const deletePatch = () => {
  console.log('批量删除用户待开发～')
}
</script>

<style scoped lang="scss">
.search-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
</style>
