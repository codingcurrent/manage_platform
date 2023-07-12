<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          form="loginForm"
          :rules="rules"
          :model="loginForm"
          ref="loginForms"
        >
          <h1>Hi~</h1>
          <h2>欢迎来到这里</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              @keyup.enter.native="logins"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="logins"
            ></el-input>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click="logins"
          >
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, getCurrentInstance, ref } from 'vue'
import { login } from '@/api/user.ts'
import userStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { getHour } from '@/utils/time'

let { proxy } = getCurrentInstance()
const loginForm = reactive({
  username: '',
  password: '',
})
// 获取el-form组件
let loginForms = ref()
// 用户仓库
let useStore = userStore()
// 路由
let $router = useRouter()
let $route = useRoute()
// 定义按钮加载效果
let loading = ref<boolean>(false)
// 登录
const logins = async () => {
  // 表单校验通过再调接口
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    loading.value = false
    // 如果从别的路径退出登录又登录的话，默认去之前的路径
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    proxy.$notify({
      type: 'success',
      title: '欢迎回来~',
      message: `${getHour()}好`,
    })
    await useStore.getUserInfo()
  } catch (error) {
    loading.value = false
    proxy.$notify({
      type: 'error',
      message: error.message,
    })
  }
}
// 自定义用户名校验规则
const usernameValidator = (rule: any, value: any, callback: any) => {
  if (!value.trim().length) {
    callback(new Error('请输入用户名！'))
  } else if (!/^[0-9A-Za-z]{5,}$/.test(value)) {
    callback(new Error('请输入不少于5位的包含字母或数字的用户名！'))
  } else {
    callback()
  }
}
// 自定义密码校验规则
const passwordValidator = (rule: any, value: any, callback: any) => {
  if (!value.trim().length) {
    callback(new Error('请输入密码！'))
  } else if (!/^[0-9A-Za-z]{6,}$/.test(value)) {
    callback(new Error('请输入不少于6位的包含字母或数字的密码！'))
  } else {
    callback()
  }
}
// 表单校验规则
const rules = {
  username: [{ validator: usernameValidator, trigger: 'blur' }],
  password: [{ validator: passwordValidator, trigger: 'blur' }],
}
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-color: yellow;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  .login_form {
    background-image: url('@/assets/images/login_form.png');
    padding: 30px;
    position: relative;
    top: 40vh;
    left: 15vw;
    width: 25vw;
    h1 {
      font-size: 20px;
      color: yellow;
    }
    h2 {
      font-size: 12px;
      color: pink;
      margin: 10px 0px;
    }
  }
}
</style>
