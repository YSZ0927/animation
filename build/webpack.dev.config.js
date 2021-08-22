
const webpackMerge = require('webpack-merge'); // 用于合并配置文件
const webpackBase = require('./webpack.base.config.js'); // 引入基础配置

const webpackDev = {
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 9000
  }
};
module.exports = webpackMerge(webpackBase, webpackDev);