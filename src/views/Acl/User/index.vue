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
            @click="assignRole(row.id)"
          >
            分配角色
          </el-button>
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
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
          <el-input placeholder="请输入职位列表"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="assignDrawer = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { queryUserList, deleteUser, queryRoleList } from '@/api/acl/user'
import type { userInfo, rolesInfo, rolesInfoList } from '@/api/acl/user/type'
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
// 所有用户角色
let allRolesList = ref([])
// 当前用户拥有角色
let assignedRolesList = ref([])
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
const handleCurrentChange = (val) => {
  getUserList(currentPage.value, pageSize.value)
}
// 页数改变
const handleSizeChange = (val) => {
  getUserList(currentPage.value, pageSize.value)
}
// 分配角色
const assignRole = async (userId) => {
  assignDrawer.value = true
  let result: rolesInfoList = await queryRoleList(userId)
  console.log(result, 'result是啥')
  let allRolesList: rolesInfo = result.data.allRolesList
  let assignedRolesList: rolesInfo = result.data.assignRoles
  console.log(allRolesList, assignedRolesList)
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
</script>

<style scoped lang="scss">
.search-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
</style>
