<template>
  <div class="layout-setting">
    <el-button size="small" circle :icon="Refresh" @click="refresh" />
    <el-button
      size="small"
      circle
      :icon="full ? Sunrise : Sunny"
      @click="fullScreen"
    />
    <el-popover
      placement="top-start"
      title="主题设置"
      :width="300"
      trigger="hover"
    >
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="theme_color"
            size="small"
            @change="changeThemeColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="changePattern"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="Check"
            inactive-icon="Close"
            @change="changeDarkPattern"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" circle :icon="Setting" />
      </template>
    </el-popover>
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
import settingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

let $router = useRouter()
let $route = useRoute()
let useStore = userStore()
// 设置store
let setStore = settingStore()
let full = ref(false)
// 主题颜色设置
let theme_color = ref<string>('')
// 暗黑模式切换
let changePattern = ref<boolean>(false)
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
  setStore.freshFlag = !setStore.freshFlag
}

// 更改主题颜色
const changeThemeColor = () => {
  const html = document.documentElement // 获取html节点
  html.style.setProperty('--el-color-primary', theme_color.value) // 未做持久化设置
}

// 改变暗黑模式
const changeDarkPattern = () => {
  const html = document.documentElement // 获取html节点
  changePattern.value ? (html.className = 'dark') : (html.className = '')
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
