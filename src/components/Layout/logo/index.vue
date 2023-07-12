<template>
  <div class="logo">
    <img src="/public/logo.png" alt="图标文件">
    <span>{{PROJECT_NAME}}</span>
  </div>
</template>

<script setup lang='ts'>
  import { PROJECT_NAME } from '@/config/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>
<style scoped lang='scss'>
  .logo {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 20px;
    img {
      width: 60px;
      padding-right: 10px;
    }
  }
</style>