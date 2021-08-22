const path = require('path');
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack'); // 用于访问内置插件
const config = require('../config/page.config')

// 获取html文件名，用于生成入口
const getFileNameList = (path) => {
  return fs.readdirSync(path);
};

let htmlDirs = getFileNameList(config.HTML_PATH);

let HTMLPlugins = []; // 保存HTMLWebpackPlugin实例
let Entries = {}; // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
htmlDirs.forEach((page) => {
  let htmlConfig = {
      filename: `${page}.html`,
      template: path.join(config.HTML_PATH, `./${page}/index.html`) // 模板文件
  };

  let found = config.ignorePages.findIndex((val) => {
      return val === page;
  });

  if (found === -1) { // 有入口js文件的html，添加本页的入口js和公用js，并将入口js写入Entries中
      htmlConfig.chunks = [page];
      Entries[page] = path.join(config.HTML_PATH, `./${page}/index.js`);
  } else { // 没有入口js文件，chunk为空
      htmlConfig.chunks = [];
  }
  htmlConfig.chunks = [page];
  Entries[page] = path.join(config.HTML_PATH, `./${page}/index.js`);
  const htmlPlugin = new HTMLWebpackPlugin(htmlConfig);
  HTMLPlugins.push(htmlPlugin);
});
module.exports = {
  entry: Entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js?[hash:8]'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css?[hash:8]', {allChunks: false}),
    ...HTMLPlugins,
  ],
  module: {
    rules: [
        {
            test: /\.(css|scss|sass)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader", "postcss-loader"],
            })
        }
    ]
  },
};