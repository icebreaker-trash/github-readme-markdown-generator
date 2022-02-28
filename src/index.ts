import path from 'path'
import { createServer, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { RollupOutput } from 'rollup'

export async function createDevServer () {
  const server = await createServer({
    plugins: [vue(), vueJsx()],
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: false,
    root: process.cwd(),
    server: {
      port: 9080
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/components/HelloWorld.vue'),
        name: 'MyLib',
        fileName: (format) => `my-lib.${format}.js`
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
}

export async function buildLibrary (entry: string) {
  const output = (await build({
    plugins: [vue(), vueJsx()],
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: false,
    root: process.cwd(),
    server: {
      port: 9080
    },
    build: {
      lib: {
        entry,
        name: 'lib',
        fileName: (format) => `lib.${format}.js`
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
  })) as RollupOutput
  return output
}
