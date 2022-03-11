import { Command } from 'commander'
import { build, dev } from './index'
const program = new Command()
const pkg = require('../package.json')
program
  .version(pkg.version)
  .command('dev')
  .option<number>(
    '-p, --port <number>',
    'Port to use. Use -p 0 to look for an open port, starting at 8080. It will also read from process.env.PORT.',
    (value: string, previous: number) => {
      return parseInt(value) || parseInt(process.env.PORT ?? '', 10) || previous
    },
    8080
  )
  .option('--host <string>', 'Host Address to use [0.0.0.0]')
  .option('-o, --open', 'Open browser window after starting the server.')
  .option(
    '-e, --entry <string>',
    'Entry file path. Can be an absolute path, or a path relative from'
  )
  .action(async (options) => {
    const server = await dev({
      host: options.host,
      open: options.open,
      port: options.port,
      entry: options.entry
      // root: options.root
    })
    await server.listen()
    server.printUrls()
  })
  .command('build')
  .action(async (options) => {
    await build(options)
  })

program.parse()

// const options = program.opts()
