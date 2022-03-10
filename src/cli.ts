import { Command } from 'commander'
const program = new Command()
const pkg = require('../package.json')
program.version(pkg.version).command('dev').command('build')

program.parse()

const options = program.opts()
