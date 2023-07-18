<template>
  <el-table border :data="menuLists" row-key="id" default-expand-all>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button
          type="primary"
          size="small"
          icon="Plus"
          @click="addMenu(row)"
          :disabled="row.level == 4"
        >
          {{ row.level !== 3 ? '添加菜单' : '添加功能' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="Edit"
          :disabled="row.level == 1"
          @click="EditMenu(row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="Delete"
          :disabled="row.level == 1"
          @click="deletes(row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="addOrEditDialog">
    <template #header>添加菜单</template>
    <el-form model="addOrEditForm">
      <el-form-item label="名称">
        <el-input
          placeholder="请输入菜单名称"
          v-model="addOrEditForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input
          placeholder="请输入权限名称"
          v-model="addOrEditForm.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addOrEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import {
  getMenuList,
  saveNewMenu,
  updateMenu,
  deleteMenu,
} from '@/api/acl/permission/index'
import type { menuList, menu, menuForm } from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'

// 所有菜单列表
let menuLists = ref<menu>([])
onMounted(() => {
  menuList()
})
// 查询菜单列表
const menuList = async () => {
  let result: menuList = await getMenuList()
  menuLists.value = result.data
}
// 添加/编辑菜单对话框
let addOrEditDialog = ref<boolean>(false)
// 添加/编辑菜单表单
let addOrEditForm = reactive<menuForm>({
  id: 0,
  name: '',
  code: '',
  pid: 0,
  level: 0,
})
// 添加菜单
const addMenu = (val) => {
  Object.assign(addOrEditForm, {
    id: 0,
    name: '',
    code: '',
    pid: 0,
    level: 0,
  })
  addOrEditDialog.value = true
  addOrEditForm.pid = val.id // 上级id
  addOrEditForm.level = val.level + 1 // 要成为的菜单级别
}
// 编辑菜单
const EditMenu = (val) => {
  addOrEditDialog.value = true
  Object.assign(addOrEditForm, val)
}
// 保存新增/编辑
const saveMenu = async () => {
  let result: any = {}
  addOrEditForm.id
    ? (result = await updateMenu(addOrEditForm))
    : (result = await saveNewMenu(addOrEditForm))

  console.log(result, 'result')
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: addOrEditForm.id ? '修改成功！' : '新增成功！',
    })
    addOrEditDialog.value = false
    menuList()
  } else {
    ElMessage({
      type: 'error',
      message: addOrEditForm.id ? '修改失败！' : '新增失败！',
    })
  }
}
// 删除菜单
const deletes = async (val) => {
  let result: any = await deleteMenu(val.id)
  console.log(result, 'result')
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    menuList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}
</script>
<style scoped lang="scss"></style>
