<template>
  <svg :style="{ width, height }" aria-hidden="true">
    <use :xlink:href="`#icon-${iconName}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
  iconName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#000000',
  },
})
</script>
<style scoped lang="scss"></style>
