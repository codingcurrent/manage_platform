<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="flag"></component>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick, ref } from 'vue'
import settingStore from '@/store/modules/setting'
let flag = ref(true)
// 设置store
let setStore = settingStore()
watch(
  () => setStore.freshFlag,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped lang="scss"></style>
