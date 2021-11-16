import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
import genericNames from 'generic-names'

import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
// import vitePluginHtml from 'vite-plugin-html';
const resolve = (url) => path.resolve(__dirname, url)

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  // root: resolve('src'),// './src/index.html',// 设置根目录文件位置，默认为当前目录下 index.html

  base: './',
  server: {
    host: '0.0.0.0',// 公开 ip 访问服务
    port: 3456,
    open: true,

    // 设置为 true 强制使依赖预构建，当依赖变化时，需要更新一下预构建依赖
    force: true
  },
  define: {// 定义全局变量
    'process.env': process.env, // 让客户端代码读取到 process.env
    'process.env.NODE_EVN': JSON.stringify('development')
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: function (name, fileName, css) {
        // css-loader 的hash算法和 postcss-module-scope 不一致，导致服务端渲染和客户端不一致
        // 对齐 css-loader 与 postcss-module 的生成 hash 方式
        return genericNames('[name]-[loacl]--[hash:base58:5]', {
          context: process.cwd()
        })(name, fileName)
      }
    }
  },
  esbuild: {
    // loader: 'jsx',
    /** 在使用 VUE 项目要使用下面两个注释熟悉 */
    jsxFactory: 'h',
    jsxFragment: 'Fragment',

    include: /src.*\.jsx?$/,
    exclude: []
  },
  build: {
    brotliSize: false,
    // 打包静态资源路径
    assetsDir: "./static",

    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    outDir: './public',   //指定输出路径
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'vue-router'],
      plugins: [
        commonjs(),
        externalGlobals({
          vue: "Vue",
          "vue-router": "vue-router",
        }),
      ],
      input: {
        // 入口文件
        main: resolve(__dirname, "index.html")
        // 其他入口
        // ,nested: resolve(__dirname, 'xxxx.html')
      },
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
  plugins: [
    vue(),
    // 替代html-webpack-plugin
    // vitePluginHtml({
    //   minify: true,
    //   inject: {
    //     injectData: {
    //       title: 'vite-react-example',
    //       injectScript: '<script src="/configs.js"></script>', // publicDir作为根目录
    //     },
    //     injectOptions: {
    //       filename: './index.html', // 模板页
    //     }
    //   },
    // }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          // jsx 文件默认不走 jsx 编译，需要配置
          // https：//github.com/vitejs/vite/discussions/3448
          name: 'load-js-files-as-jsx',
          setup (build) {
            build.onLoad({ filter: /src.*\.jsx?$/ }, async args => {
              return {
                loader: 'jsx',
                contents: fs.readFileSync(args.path, 'utf-8')
              }
            })
          }
        }
      ]
    },

    entries: resolve('./src/index.js'),

    include: [],

    // 排除构建可以直接让浏览器加载的
    // 如果依赖项大(很多模块，commonJs)，要包含它
    exclude: []
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 'vue': 'https://unpkg.com/vue@3.2.21/dist/vue.global.js'
    },
    extensions: ['.ts', '.vue', '.tsx', '.js', '.jsx']
  },
  // 关闭 vite 清屏
  clearScreen: false
})