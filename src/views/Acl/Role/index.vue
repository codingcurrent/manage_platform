<template>
  <el-card>
    <el-form :inline="true" class="search-area">
      <el-form-item label="职位搜索：">
        <el-input
          placeholder="请输入要搜索的职位"
          v-model="searchText"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList">搜索</el-button>
        <el-button @click="resetList">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button
      type="primary"
      @click="addRole"
      style="margin-bottom: 10px"
      icon="Plus"
    >
      添加职位
    </el-button>
    <el-table border :data="roleLists">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column
        label="职位名称"
        prop="roleName"
        aline="center"
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
            分配权限
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
            @click="deletes(row.id)"
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
        <el-form-item label="用户名称">
          <el-input
            placeholder="请输入用户名称"
            v-model="roleInfoForm.name"
          ></el-input>
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
      <h4>{{ roleInfoForm.id ? '添加职位' : '更新职位' }}</h4>
    </template>
    <template #default>
      <el-form :model="roleInfoForm" :rules="rules" ref="roleInfoRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请输入职位名称"
            v-model="roleInfoForm.roleName"
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
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  getRolesList,
  deleteRole,
  saveRole,
  updateRole,
  // queryRoleList,
  // assignRolesToUser,
} from '@/api/acl/permission'
import type {
  roleList,
  roleForm,
  rolesInfoList,
  userInfoList,
  setRole,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

onMounted(() => {
  getRoleList()
})
// 当前页
let currentPage = ref<number>(1)
// 当前页码
let pageSize = ref<number>(5)
// 总页码
let total = ref<number>(0)
// 职位列表数据
let roleLists = ref<roleLists>([])
// 搜索字段
let searchText = ref<string>('')
// 分配角色控制
let assignDrawer = ref<boolean>(false)
// 添加或编辑职位控制
let addOrEditDrawer = ref<boolean>(false)
// 要分配角色的职位id
let assignId = ref<number>(0)
// 职位信息
let roleInfoForm = reactive<roleForm>({
  id: 0,
  roleName: '',
})
let selectArr = ref([])
// 表单
let roleInfoRef = ref('')
// 新增或编辑表单规则（可补充更复杂校验功能~）
let rules = {
  roleName: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
}
// 所有职位
let allRolesList = ref<rolesInfoList>([])
// 当前用户拥有角色
let assignedRolesList = ref<rolesInfoList>([])
// 查询用户列表
const getRoleList = async () => {
  let result = await getRolesList(
    currentPage.value,
    pageSize.value,
    searchText.value,
  )
  if (result.code == 200) {
    roleLists.value = result.data.records
    total.value = result.data.total
  }
}
// 重置
const resetList = () => {
  searchText.value = ''
  getRoleList()
}
// 页码改变
const handleCurrentChange = (val: number) => {
  getRoleList()
}
// 页数改变
const handleSizeChange = (val: number) => {
  getRoleList()
}
// 分配角色控制
const assignRole = async (val: userInfoList) => {
  Object.assign(roleInfoForm, val)
  assignDrawer.value = true
  let result: rolesInfoList = await queryRoleList(val.id)
  assignId.value = val.id
  allRolesList.value = result.data.allRolesList
  assignedRolesList.value = result.data.assignRoles
}
// 删除角色
const deletes = async (id: number) => {
  let result = await deleteRole(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '已成功删除该职位',
    })
    getRoleList()
  }
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
    getRoleList()
  } else {
    ElMessage({
      type: 'success',
      message: '用户角色分配失败',
    })
  }
}
// 添加职位
const addRole = () => {
  addOrEditDrawer.value = true
  Object.assign(roleInfoForm, {
    id: 0,
    roleName: '',
  })
  nextTick(() => {
    roleInfoRef.value.clearValidate('roleName')
  })
}
// 编辑某职位
const editUser = (row: userInfoList) => {
  addOrEditDrawer.value = true
  Object.assign(roleInfoForm, row)
  nextTick(() => {
    roleInfoRef.value.clearValidate('roleName')
  })
}
// 保存新增/编辑职位
const saveInfo = async () => {
  let result = []
  roleInfoForm.id
    ? (result = await updateRole(roleInfoForm))
    : (result = await saveRole(roleInfoForm))
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleInfoForm.id ? '职位新增成功' : '职位修改成功',
    })
    addOrEditDrawer.value = false
    getRoleList()
  } else {
    ElMessage({
      type: 'error',
      message: roleInfoForm.id ? '职位新增失败' : '职位修改失败',
    })
  }
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
