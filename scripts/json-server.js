/**
 * Created by common on 2017/7/21.
 */

const chalk = require('chalk');
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServer.rewriter({
  '/hr/profile/*': '/profile_$1',
  '/hr/user/*': '/user_$1',
  '/hr/search/*': '/search_$1',
  '/hr/cart/*': '/cart_$1',
  '/hr/colleague/*': '/colleague_$1',
  '/hr/order/*': '/order_$1',
  '/hr/company/*': '/company_$1',
  '/hr/offshore/*': '/offshore_$1',
  '/hr/special/*': '/special_$1',
  '/hr/jd/*': '/jd_$1',
  '/hr/service/*': '/jd_$1',
  '/hr/msg/*': '/msg_$1',
  '/hr/question/*': '/question_$1',
  '/hr/sysQuestion/*': '/sysQuestion_$1'
}));

server.use(router);

console.log(chalk.cyan('Starting the api server...\n'));

server.listen(8000, () => {
  console.log(chalk.green('Api server is started,on port:8000\n'));
});
