<template>
  <el-card>
    <el-form form="category" :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="c1Id" @change="queryC2(c1Id)">
          <el-option
          v-for="item in categoryStore.c1Arr"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="queryC3">
          <el-option
          v-for="item in categoryStore.c2Arr"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" @change="queryAllAtrr">
          <el-option
          v-for="item in categoryStore.c3Arr"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
  import {ref, onMounted, reactive} from 'vue'
  import useCategoryStore from '@/store/modules/category/index'
 
  
  let categoryStore = useCategoryStore()
  let c1Id = ref<number|string>('')

  onMounted(() => {
    // 获取一级分类列表
    queryC1()
  })
  const queryC1 = async() => {
    // 获取二级分类列表
    categoryStore.getC1()
  }
  const queryC2 = (val) => {
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    // 获取三级分类列表
    categoryStore.getC2(val)
  }
  const queryC3 = () => {
    categoryStore.c3Id = ''
    categoryStore.getC3()
  }
</script>
<script lang='ts'>
  export default {
    name: 'Category'
  }
</script>
<style scoped lang='scss'>
</style>