<template>
  <div>user页面</div>
</template>

<script lang='ts'>
import { reactive, toRefs, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted,onUpdated} from 'vue'
export default {
name:'',
setup(){
const data = reactive({
})
onBeforeMount(()=>{
})
onMounted(()=>{
})
onBeforeUpdate(()=>{
})
onUpdate(()=>{
})
onUnMount(()=>{
})
onBeforeUnMounted(()=>{
})
return {
...toRefs(data),
}
}
}
</script>
<style scoped lang='scss'>
</style>