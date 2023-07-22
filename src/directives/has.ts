// 该指令用于判断某用户是否有某button权限 使用时利用v-has即可，
// 如<el-button type="primary" icon="Plus" v-has="`btn.Role.add`">添加职位</el-button>
import userStore from '@/store/modules/user'
export const hasButton = (app: any, pinia) => {
  let useUserStore = userStore(pinia)
  // 要传入vue的app，因此在main.js中引入,同时传入大仓库pinia
  app.directive('has', {
    mounted(el: any, options: any) {
      // el 为指令所在节点， option中value为v-has=‘值’中的值
      if (!useUserStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
