const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除之前的打包文件
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const productionGzipExtensions = ['js', 'css', 'png', 'jpg']
const isDev = process.env.mode == 'development'
console.log("isDev", isDev);

const basePlugins = [
  new HtmlWebpackPlugin({
    title: 'webpack-vue-ts',
    filename: 'index.html',
    inject: 'body',
    template: path.resolve(__dirname, './src/index.html')
  }),
  /** 定义全局变量 */
  new webpack.DefinePlugin({
    // 定义...
    NODE_ENV: JSON.stringify("development")
  }),
  new VueLoaderPlugin(),// 解析.vue文件
  new MiniCssExtractPlugin({
    filename: 'css/[name].css' //顺便设置css文件路径
  }),
  new HtmlWebpackExternalsPlugin({
    externals: [{
      module: 'vue',
      entry: 'https://unpkg.com/vue@3.2.21/dist/vue.global.js',
      global: 'Vue'
    }]
  }),
  /** 要删除的正是output.path */
  !isDev && new CleanWebpackPlugin(),
  /** 文件压缩 */
  !isDev && new CompressionPlugin({
    // filename: '[path].gz[query]', // 目标资源名称。
    // [file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
    filename: '[path][base].gz',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 1024 * 20,
    minRatio: 0.8
  }),
  /** 分包可视化 */
  !isDev && new BundleAnalyzerPlugin({
    analyzerMode: "server",
    analyzerHost: "127.0.0.1",
    analyzerPort: 8090, // 运行后的端口号
  }),
].filter(Boolean)



module.exports = basePlugins