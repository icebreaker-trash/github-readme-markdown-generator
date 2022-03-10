import { createServer } from 'vite'
;(async () => {
  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: false,
    root: process.cwd(),
    server: {
      port: 3000
    }
  })
  await server.listen()

  server.printUrls()
})()
