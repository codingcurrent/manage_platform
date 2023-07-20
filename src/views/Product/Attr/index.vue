<template>
  <div>
    <Category :flag="flag" />
    <!-- 查询属性初始页面 -->
    <el-card style="margin: 10px 0" v-show="flag == 0">
      <el-button
        type="primary"
        icon="Plus"
        style="margin-bottom: 10px"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
      >
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
          <el-input
            placeholder="请输入属性名"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Plus"
            @click="addAttrValue"
            :disabled="!attrParams.attrName"
          >
            添加属性值
          </el-button>
          <el-button @click="flag = 0">取消</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="attrParams.attrValueList">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <el-input
              :ref="(vc:any) => inputArr[$index] = vc"
              v-if="row.showOrEdit"
              size="small"
              placeholder="请输入属性值"
              v-model="row.valueName"
              @blur="showPatten(row, $index)"
            ></el-input>
            <div v-else @click="editPatten(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button type="danger" size="small" @click="deleteValue($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="flag = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { ref, watch, reactive, nextTick } from 'vue'
import type {
  attrInfoLists,
  attrInfoObject,
  attrInfo,
} from '@/api/product/attr/type'
import {
  getAttrInfoList,
  deleteAttValue,
  saveAttrInfo,
} from '@/api/product/attr/index'
import useCategoryStore from '@/store/modules/category/index'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
// 属性列表
let attrInfoList = ref<attrInfoLists>([])
// 新增或编辑属性列表
let attrParams = reactive<attrInfoObject>({
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
})
// 切换不同页面flag
let flag = ref<number>(0)
//准备一个数组:存储对应的组件实例el-input
let inputArr = ref<any>([])
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
  }
}
// 删除属性
const deleteAttr = async (val) => {
  let result: any = await deleteAttValue(val.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '已成功删除该属性！',
    })
    queryAllAtrr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除该属性失败！',
    })
  }
}
// 编辑属性
const editAttr = (val) => {
  flag.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(val)))
}
// 添加属性
const addAttr = () => {
  flag.value = 1
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3,
  })
}
// 属性值切换为div属性
const showPatten = (row, index) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空！',
    })
  }
  let exist = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (exist) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复！',
    })
  }
  row.showOrEdit = false
}
// 属性值切换为input属性
const editPatten = (row, index) => {
  row.showOrEdit = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
// 删除某属性值
const deleteValue = (index) => {
  attrParams.attrValueList.splice(index, 1)
}
// 新增某属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    showOrEdit: true,
  })
  // 光标自动聚焦到input框
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 保存
const save = async () => {
  let result = await saveAttrInfo(attrParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    queryAllAtrr()
    flag.value = 0
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
</script>
<style scoped lang="scss"></style>
