import path from 'path'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
;(async () => {
  const server = await createServer({
    plugins: [vue(), vueJsx()],
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: false,
    root: path.resolve(__dirname, 'vite'),
    server: {
      port: 9000
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/components/HelloWorld.vue'),
        name: 'MyLib',
        fileName: (format) => `my-lib.${format}.js`
        // formats:['umd','cjs','es']
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  })
  await server.listen()

  server.printUrls()
})()
