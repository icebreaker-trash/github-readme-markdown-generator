import { createServer, build as viteBuild } from 'vite'
import type { UserDefinedOptions } from './type'
export async function dev (options: UserDefinedOptions) {
  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    // configFile: false,
    // configFile：指明要使用的配置文件。如果没有设置，Vite 将尝试从项目根目录自动解析。设置为 false 可以禁用自动解析功能。
    // envFile：设置为 false 时，则禁用 .env 文件。
    root: options.root,
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
    root: options.root
  })
}
