<template>
  <div>
    <el-button type="primary" icon="Plus" @click="brand('add')">
      添加品牌
    </el-button>
    <el-table :data="tableData" class="table" border>
      <el-table-column type="index" label="序号" align="center" width="180" />
      <el-table-column
        prop="tmName"
        label="品牌名称"
        align="center"
        width="180"
      />
      <el-table-column label="品牌Logo" align="center">
        <template #default="scope">
          <img
            :src="scope.row.logoUrl"
            alt="无图片"
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            circle
            @click="brand('edit', scope.row)"
          />
          <el-button
            type="danger"
            icon="Delete"
            circle
            @click="deleTe(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form :model="form" ref="formRef" :rules="rule">
      <el-form-item prop="tmName" label="品牌名称">
        <el-input v-model="form.tmName"></el-input>
      </el-form-item>
      <el-form-item prop="logoUrl" label="品牌logo">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 分页器 -->
  <el-pagination
    style="margin-top: 20px"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 7, 9, 11]"
    :background="true"
    layout="prev, pager, next, jumper, ->, sizes, total"
    :total="totalPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  getAllBrand,
  deleteBrand,
  saveAddBrand,
  updateBrand,
} from '@/api/product/product'
import type { AllBrandResponseData, brand } from '@/api/product/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let tableData = ref<brand>([]) // 表单数据
let title = ref('') // 添加/编辑品牌的对话框标题
let currentPage = ref<number>(1) // 当前页码
let pageSize = ref<number>(5) // 当前页面大小
let totalPage = ref<number>(1)
let formRef = ref() // 获取el-form组件实例
// 添加/编辑品牌的表单数据
let form = reactive({
  tmName: '',
  logoUrl: '',
})
onMounted(() => {
  getBrandList()
})
// 表单校验规则
const rule = {
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请输入品牌图片', trigger: 'blur' }],
}
// 控制添加/编辑对话框显示
let dialogVisible = ref(false)
// 处理添加/编辑品牌动作
const brand = (type: string, val: brand[]) => {
  // 打开对话框保证内容与校验皆为空
  form.tmName = ''
  form.logoUrl = ''
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // nextTick(() => {
  //   formRef.value.clearValidate('tmName')
  //   formRef.value.clearValidate('logoUrl')
  // });
  dialogVisible.value = true
  switch (type) {
    case 'add':
      title.value = '添加品牌'
      break
    case 'edit':
      title.value = '修改品牌'
      Object.assign(form, val)
      break
    default:
      break
  }
}
// 保存新增/编辑
const submit = async () => {
  await formRef.value.validate()
  let result = form.id ? await updateBrand(form) : await saveAddBrand(form)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      message: form.id ? '修改品牌成功！' : '新增品牌成功！',
      type: 'success',
    })
    form.id ? getBrandList(currentPage.value) : getBrandList(1)
  } else {
    ElMessage({
      message: form.id ? '修改品牌失败' : '新增品牌失败！',
      type: 'error',
    })
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  form.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
const beforeAvatarUpload = () => {
  console.log('上传之前')
}
// 查询品牌
const getBrandList = async (pager = 1) => {
  currentPage.value = pager
  let result: AllBrandResponseData = await getAllBrand(
    currentPage.value,
    pageSize.value,
  )
  if (result.code == 200) {
    tableData.value = result.data.records
    totalPage.value = result.data.total
  }
}
// 页面大小改变时
const handleSizeChange = () => {
  // 此处不用传 后自动获取当前页码
  getBrandList()
}
// 页码改变时
const handleCurrentChange = (val: number) => {
  getBrandList(val)
}
// 删除品牌
const deleTe = async (val: number) => {
  let result = await deleteBrand(val)
  if (result.code == 200) {
    ElMessage({
      message: `${val}删除成功！`,
      type: 'success',
    })
    getBrandList(currentPage.value)
  } else {
    ElMessage({
      message: '新增品牌失败！',
      type: 'error',
    })
  }
}
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  margin-top: 10px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
