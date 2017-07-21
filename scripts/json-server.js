/**
 * Created by common on 2017/7/21.
 */

const chalk = require('chalk');
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

console.log(chalk.cyan('Starting the api server...\n'));

server.listen(8000, () => {
  console.log(chalk.green('Api server is started,on port:8000\n'));
})
