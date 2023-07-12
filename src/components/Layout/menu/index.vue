<template>
  <template v-for="(item, index) in menuList" key="item.path">
    <el-menu
      v-if="!item.meta.hidden"
      background-color="rgb(31, 31, 31)"
      text-color="white"
      :default-active="$route.path"
      active-text-color="pink"
    >
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children" :index="item.path" @click="go">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-menu-item>
      <!-- 仅有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item :index="item.path" @click="go">
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          {{ item.children[0].meta.title }}
        </el-menu-item>
      </template>
      <!-- 有多于一个的子路由 -->
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </template>
        <!-- 自调用组件: 调用自身组件 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </el-menu>
  </template>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute()
let $router = useRouter()
defineProps(['menuList'])
const go = (vc: any) => {
  // 点击子菜单，会自动将此菜单作为参数传入
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
