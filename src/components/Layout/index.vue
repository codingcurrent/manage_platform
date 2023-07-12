<template>
  <div class="layout">
    <div class="layout-left">
      <Logo class="layout-logo" />
      <el-scrollbar class="scrollbar">
        <Menu :menuList="useStore.menuRoutes" />
      </el-scrollbar>
    </div>
    <div class="layout-right">
      <div class="layout-top">
        <Breadcrumb class="layout-breadcrumb" />
        <Setting class="layout-setting" />
      </div>
      <Main class="layout-main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Main from './main/index.vue'
import Setting from './setting/index.vue'
import Menu from './menu/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import userStore from '@/store/modules/user'

let useStore = userStore()
</script>
<style scoped lang="scss">
.layout {
  display: flex;
  .layout-left {
    width: $base_left_menu_width;
    height: 100vh;
    color: white;
    background-color: $base_left_background_color;
    .layout-logo {
      height: $base_layout_logo_height;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base_layout_logo_height);
    }
  }
  .layout-right {
    width: calc(100vw - $base_left_menu_width);
    .layout-top {
      display: flex;
      height: $base_layout_logo_height;
      justify-content: space-between;
      align-items: center;
      .layout-breadcrumb {
        margin-left: 10px;
      }
    }
    .layout-main {
      margin: 15px;
      padding: 15px;
      border: 1px solid #ecb9b9;
      border-radius: 5px;
    }
  }
}
</style>
