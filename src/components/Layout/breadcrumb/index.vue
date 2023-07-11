<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>属性管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang='ts'>
  import { ArrowRight } from '@element-plus/icons-vue'
</script>
<script lang='ts'>
export default {
  name: 'Breadcrumb'
}
</script>
<style scoped lang='scss'>
</style>