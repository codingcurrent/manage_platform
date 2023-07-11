<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="rgb(31, 31, 31)" text-color="white">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">数据大屏</el-menu-item>
    <el-sub-menu index="3">
      <template #title>权限管理</template>
      <el-menu-item index="2-1">用户管理</el-menu-item>
      <el-menu-item index="2-2">角色管理</el-menu-item>
      <el-menu-item index="2-3">菜单管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>商品管理</template>
      <el-menu-item index="2-4-1">品牌管理</el-menu-item>
      <el-menu-item index="2-4-2">属性管理</el-menu-item>
      <el-menu-item index="2-4-3">spu管理</el-menu-item>
      <el-menu-item index="2-4-3">sku管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
  </div>
</template>

<script setup lang='ts'>
</script>
<script lang="ts">
  export default {
    name: 'Menu'
  }
  </script>
<style scoped lang='scss'>
</style>