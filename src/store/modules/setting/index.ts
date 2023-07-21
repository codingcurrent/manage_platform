import { defineStore } from 'pinia'

const settingStore = defineStore('setStore', {
  state: () => {
    return {
      freshFlag: false,
    }
  },
})

export default settingStore
