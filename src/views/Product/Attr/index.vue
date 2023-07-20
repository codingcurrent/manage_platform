<template>
  <div>
    <Category />
    <!-- 查询属性初始页面 -->
    <el-card style="margin: 10px 0" v-show="flag == 0">
      <el-button type="primary" icon="Plus" style="margin-bottom: 10px">
        添加属性
      </el-button>
      <el-table :data="attrInfoList" border>
        <el-table-column
          label="序号"
          type="index"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名称" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" prop="attrName">
          <template #="{ row, index }">
            <span v-for="item in row.attrValueList">
              <el-tag
                v-if="item.valueName"
                :key="item.id"
                class="mx-1"
                effect="light"
                round
                type="danger"
                style="margin-right: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editAttr(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="deleteAttr(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加/编辑属性页面 -->
    <el-card style="margin: 10px 0" v-show="flag == 1">
      <el-form
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="添加属性名">
          <el-input placeholder="请输入属性名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">添加属性值</el-button>
        </el-form-item>
      </el-form>
      <el-table border :table="attrParams.attrValueList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="属性值">
          <el-input placeholder="请输入属性值"></el-input>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, index }">
            <el-button type="primary" small>保存</el-button>
            <el-button type="primary" small>取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { ref, watch } from 'vue'
import type { attrInfoLists, attrInfoObject } from '@/api/product/attr/type'
import { getAttrInfoList, deleteAttValue } from '@/api/product/attr/index'
import useCategoryStore from '@/store/modules/category/index'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
// 属性列表
let attrInfoList = ref<attrInfoLists>([])
// 新增或编辑属性列表
let attrParams = ref<attrInfoObject>([])
// 切换不同页面flag
let flag = ref<number>(0)
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrInfoList.value = []
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return

    //获取分类的ID
    queryAllAtrr()
  },
  // {immediate: true, deep: true}
)
const queryAllAtrr = async () => {
  let result: attrInfoLists = await getAttrInfoList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    attrInfoList.value = result.data
    console.log('attrInfoList', attrInfoList)
  }
}
// 删除属性
const deleteAttr = async (val) => {
  let result: any = await deleteAttValue(val.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '已成功删除属性值！',
    })
    queryAllAtrr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性值失败！',
    })
  }
}
// 编辑属性
const editAttr = (val) => {
  attrParams.value = val
  flag.value = 1
}
</script>
<style scoped lang="scss"></style>
