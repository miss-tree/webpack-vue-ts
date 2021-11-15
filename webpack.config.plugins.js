const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除之前的打包文件
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const isDev = process.env.mode == 'development'

const basePlugins = [
  new HtmlWebpackPlugin({
    title: 'webpack-vue-ts',
    filename: 'index.html',
    inject: 'body',
    template: path.resolve(__dirname, './src/index.html')
  }),
  new VueLoaderPlugin(),// 解析.vue文件
  new MiniCssExtractPlugin(),
  new HtmlWebpackExternalsPlugin({
    externals: [{
      module: 'vue',
      // entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.1.4/vue.cjs.js',
      entry: 'https://unpkg.com/vue@3.2.21/dist/vue.global.js',
      global: 'Vue'
    }]
  }),
  /** 要删除的正是output.path */
  !isDev && new CleanWebpackPlugin(),
].filter(Boolean)



module.exports = basePlugins