<template>
  <el-card>
    <div class="box">
      <img class="avatar" :src="useUserStore.avatar" alt="用户头像" />
      <div class="show">
        <h3 class="title">{{ getHour() }}好呀 {{ useUserStore.username }}</h3>
        <p class="subtitle">new beginning</p>
      </div>
    </div>
  </el-card>
  <!-- <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div> -->
</template>

<script setup lang="ts">
import { getHour } from '@/utils/time.ts'
import userStore from '@/store/modules/user'
// 引入用户信息store
let useUserStore = userStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .show {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
</style>
