import { createServer, build as viteBuild } from 'vite'
// import fs from 'fs/promises'
import path from 'path'
// import { createTmpHtml } from './template/html'
import { tmpDir } from './util'
import type { UserDefinedOptions } from './type'
// not allowed to load local resource
// const resolveFileNames = ['index.js', 'index.ts']
export async function dev (options: UserDefinedOptions) {
  // const cwd = process.cwd()
  // const t = path.resolve(cwd, options.entry ?? '')
  // const stat = await fs.stat(t)
  // if (stat.isDirectory()) {
  //   const filelist = await fs.readdir(t)
  //   for (let i = 0; i < resolveFileNames.length; i++) {
  //     const filename = resolveFileNames[i]
  //     if (filelist.includes(filename)) {
  //       await createTmpHtml({
  //         scriptPath: path.resolve(t, filename)
  //       })
  //       break
  //     }
  //   }
  // } else if (stat.isFile()) {
  //   await createTmpHtml({
  //     scriptPath: t
  //   })
  // } else {
  //   throw new TypeError("cwd don't have an entry file like index.[jt]s")
  // }

  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    // configFile: false,
    // configFile：指明要使用的配置文件。如果没有设置，Vite 将尝试从项目根目录自动解析。设置为 false 可以禁用自动解析功能。
    // envFile：设置为 false 时，则禁用 .env 文件。
    root: tmpDir,
    server: {
      port: options.port,
      host: options.host,
      open: options.open
    }
  })
  return server
  // await server.listen()

  // server.printUrls()
}

export async function build (options: UserDefinedOptions) {
  await viteBuild({
    root: tmpDir,
    build: {
      outDir: path.resolve(process.cwd(), 'dist')
    }
  })
}
