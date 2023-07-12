<template>
  <div class="layout-setting">
    <el-button size="small" circle :icon="Refresh" @click="refresh" />
    <el-button
      size="small"
      circle
      :icon="full ? Sunrise : Sunny"
      @click="fullScreen"
    />
    <el-button size="small" circle :icon="Setting" />
    <img class="usr_avatar" :src="useStore.avatar" alt="用户头像" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ useStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Refresh, Sunny, Sunrise, Setting } from '@element-plus/icons-vue'
import userStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

let $router = useRouter()
let $route = useRoute()
let useStore = userStore()
let full = ref(false)
// 登出
const logout = async () => {
  await useStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 全屏
const fullScreen = () => {
  if (!full.value) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  full.value = !full.value
}

// 刷新界面
const refresh = () => {
  console.log('待开发~')
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss">
.layout-setting {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .usr_avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 10px;
  }
}
</style>
