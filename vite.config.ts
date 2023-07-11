import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 引入mock需要的插件
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹，地址可改
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],//文件路径为图标路径
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      localEnabled: command === 'serve',//保证开发阶段可以使用mock接口
    })
  ],
  resolve: {
    alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  //代理跨域
  server: {
    proxy: {
      [env.VITE_APP_BASE_URL]: {
        //获取数据的服务器地址设置
        target: env.VITE_SERVE,
        //需要代理跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}
})
