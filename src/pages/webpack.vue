<template>
  <div>
    <pre>
      const path = require('path');
      const TerserPlugin = require("terser-webpack-plugin")
      const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

      const baseModule = require('./webpack.config.module');
      const basePlugins = require('./webpack.config.plugins')
      const isDev = process.env.mode == 'development'

      const baseConfig = {
        mode: 'development',
        entry: {
          index: './src/index.js'
        },
        output: {
          // filename: isDev ? "js/[name].js" : "js/[name]_[hash].js",
          filename: "js/[name].js",
          chunkFilename: "js/[name].[chunkhash:8].js",
          path: path.resolve(__dirname, "dist"),
          clean: !isDev
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
          mainFiles: ['index', 'main'],
          // 解析后缀 由于 webpack 的解析顺序是从左到右，因此要将使用频率高的文件类型放在左侧
          extensions: ['.vue','.ts', '.tsx', 'jsx', '.js', '.scss', 'json'],
        },
        cache: {
          type: 'filesystem', // 使用文件缓存
        },
        devServer: {
          static: {
            directory: path.join(__dirname, './public'),
          },
          port: 5566,
          // 是否开启代码压缩
          compress: !isDev,
          hot: true,
          open: !isDev
        },
        plugins: basePlugins,
        module: baseModule,
        /** externals
        * 分包，不编译进打包文件
        * 在index.html正常的引入 cdn 资源即可
        * &lg;script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"&lt;&lg;/script&lt;
        * 依然可以使用import的方式引入
        * 可以使用插件 html-webpack-externals-plugin  会在index.html自动引入
        */
        // externals: {
        //   'vue': 'Vue',
        //   'vue-router': 'VueRouter'
        // },
        // 抽取第三方模块
        optimization: {
          minimize: !isDev, // 开启代码压缩
          minimizer: [
            // 不再使用 uglifyjs插件
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
              include: './src',
              parallel: 4,
              terserOptions: {
                parse: {},
                compress: {},
                // Deprecated
                output: {
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                },
                format: null,
              },
            }),
            // css 样式压缩
            new OptimizeCSSAssetsPlugin()
          ],
          splitChunks: {
            chunks: 'async', // all | async | initial
            minSize: 20 * 1024,
            minRemainingSize: 0,
            minChunks: 1, // 拆分前必须共享模块的最小 chunks 数
            maxAsyncRequests: 30, // 按需加载时的最大并行请求数
            maxInitialRequests: 30, // 入口点的最大并行请求数
            // enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
            cacheGroups: {
              vendor: {
                chunks: 'initial',
                minSize: 0,
                minChunks: 2,
                test: /node_modules/,
                priority: 1
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        },
      }
      module.exports = baseConfig
   </pre>
  </div>
</template>

<script>
import { ref, reactive, toRaw, watch, toRefs } from 'vue';

export default {
  components: {},
  props: {},
  setup (props, { emit }) {
    const state = reactive({})
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("~@/assets/css/index.scss");
</style>
