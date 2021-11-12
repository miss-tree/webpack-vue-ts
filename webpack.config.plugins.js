const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const isDev = process.env.mode == 'development'

const basePlugins = [
  new HtmlWebpackPlugin({
    title: 'webpack-vue-ts',
    filename: 'index.html',
    inject: 'body',
    template: path.resolve(__dirname, './src/index.html')
  }),
  new HtmlWebpackExternalsPlugin({
    externals: [{
      module: 'vue',
      // entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.1.4/vue.cjs.js',
      entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.1.4/vue.cjs.prod.js',
      global: 'Vue'
    }]
  })
]



module.exports = basePlugins