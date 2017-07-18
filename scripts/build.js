'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';   //设置环境变量
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {   //忽略 promise unhandlerRejection
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');    //样式化客户端信息
const fs = require('fs-extra');    //原生fs的替代品，添加了fs中不存在的功能，并且支持promise
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');   //webpack 产品版配置文件
const paths = require('../config/paths');                   //获取项目路径配置
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');      //检查文件的存在
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');    //提取和美化来自webpack的stats的警告和错误信息
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');   //编译成功后，打印托管说明
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');   //文件大小报告器

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;    //在编译前获取buildFolder下Js和css资源的大小，保存留作编译后比较他们；
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;   //编译后打印本次编译文件大小，以及与上次编译生成文件大小的比较
const useYarn = fs.existsSync(paths.yarnLockFile);   //同步查找yarn锁文件是否存在

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;  //bundles 如果超过这个大小，我们会发出警告
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {   //检查app启动html和js，如果没有，则结束build进程
  process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);   //情况build目录下所有的内容
    // Merge with the public folder
    copyPublicFolder();          //拷贝public目录下的内容到build中，不包括index.html
    // Start the webpack build
    return build(previousFileSizes);   //开始编译,返回一个promise
  })
  .then(
    ({stats, previousFileSizes, warnings}) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'));
      console.log((err.message || err) + '\n');
      process.exit(1);
    }
  );

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
        process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
