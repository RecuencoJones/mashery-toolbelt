/*
  Command Line Interface
  Supports: auth, ls
*/

const program = require('commander')
const runAuth = require('./auth')
const runLs = require('./ls')
const runBackup = require('./backup')
const runRestore = require('./restore')

program
  .version('0.0.1')
  .description('Mashery remote command tool')
  .arguments('<cmd>')
  .action((cmd) => {
    console.error(`\n  error: unknown command \`${cmd}\`\n`)
    console.log('  show help with: mashery-toolbelt -h\n')
    process.exit(1)
  })

program
  .command('auth', /* <username> <password> <key> <secret> <areauuid> */)
  .description('Authenticate to mashery API with simple wizard')
  .action(() => runAuth())

program
  .command('ls [name]')
  .description('List all services. Optionally filtered by name')
  .action((name) => runLs(name))

program
  .command('backup <serviceId>')
  .description('Backup all data for given service')
  .action(serviceId => runBackup(serviceId))

program
  .command('restore <serviceId> <backupName>')
  .description('Restore given service from existing backup')
  .action((serviceId, backupName) => runRestore(serviceId, backupName))

program.parse(process.argv)

if (program.args.length === 0) {
	program.help()
}