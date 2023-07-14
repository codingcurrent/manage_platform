<template>
  <div>
    <Category />
    <div>
      <el-table :data="attrInfoList">
          <el-table-column label="序号" type="index" width="80px"></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" prop="attrName"></el-table-column>
          <el-table-column label="操作">
            <template default="scoped">
              <el-button size="small" icon="Delete" @click="deleteAttr(scoped.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

  </div>
</template>

<script setup lang="ts">
  import Category from '@/components/Category/index.vue'
  import {reactive, watch} from 'vue'
  import type {attrInfoLists} from '@/api/product/attr/type'
  import {getAttrInfoList} from '@/api/product/attr/index'
  import useCategoryStore from '@/store/modules/category/index'
  let categoryStore = useCategoryStore()
  let attrInfoList = reactive<attrInfoLists>([])
    watch(() => categoryStore.c3Id, () => {
    //清空上一次查询的属性与属性值
    attrInfoList = []
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return;
    //获取分类的ID
    queryAllAtrr();
})
  const queryAllAtrr = async() => {
    let result: attrInfoLists = await getAttrInfoList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id)
    if (result.code == 200) {
      attrInfoList = result.data
    }
    console.log(attrInfoList, 'attrInfoListsss');
  }
  // 删除属性
  const deleteAttr = (val) => {
    console.log(val, '删除');
  }
</script>
<style scoped lang="scss"></style>
