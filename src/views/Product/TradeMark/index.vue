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
      <el-table-column prop="logoUrl" label="品牌Logo" align="center" />
      <el-table-column label="品牌操作" align="center">
        <template #="{ row, column, $index }">
          <el-button type="primary" icon="Edit" circle @click="brand('edit')" />
          <el-button type="danger" icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form model="form" ref="form" :rules="rule">
      <el-form-item prop="tmName" label="品牌名称">
        <el-input v-model="form.tmName"></el-input>
      </el-form-item>
      <el-form-item prop="logoUrl" label="品牌logo">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="true"
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getAllBrand } from '@/api/product/product'
import type { AllBrandResponseData } from '@/api/product/type.ts'
let tableData = [{ tmName: '12' }]
let title = ref('')
// 添加/编辑品牌的表单数据
let form = reactive({
  tmName: '',
  logoUrl: '',
})
// 表单校验规则
const rule = {
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请输入品牌图片', trigger: 'blur' }],
}
// 控制添加/编辑对话框显示
let dialogVisible = ref(false)
// 处理添加/编辑品牌动作
const brand = (val) => {
  dialogVisible.value = true
  switch (val) {
    case 'add':
      title.value = '添加品牌'
      break
    case 'edit':
      title.value = '修改品牌'
      break
    default:
      break
  }
}
const submit = () => {
  dialogVisible.value = false
  console.log('submit')
}
const handleAvatarSuccess = () => {
  console.log('上传成功')
}
const beforeAvatarUpload = () => {
  console.log('上传之前')
}
// const getBrandList = async() => {
//   console.log('123');
//   let result: AllBrandResponseData = await getAllBrand(1,3)
// getAllBrand(1,3).then((res, err)=>{
//   console.log(res, 'RESULT是啥');
// })
//  console.log(result, 'RESULT是啥');
// if(result.code == 200) {
//   console.log(result.data);
// }
//   console.log('245');
// }
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  margin-top: 10px;
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
