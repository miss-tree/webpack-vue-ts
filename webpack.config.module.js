const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.mode == 'development'

const baseModule = {
  rules:[
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
      include: [path.resolve(__dirname, 'src')],
    },
    {
      // 同时识别 ts jsx js tsx 文件
      test: /\.(t|j)sx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ // babel-loader 将ES6-->ES5
            "@babel/preset-env",
            // "@babel/preset-react"
          ],
          plugins: [
            // 支持装饰器
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            "@babel/plugin-syntax-dynamic-import"
          ]
        }
      },
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        isDev ? 'style-loader': MiniCssExtractPlugin.loader,// 生成css文件
        // 'style-loader', // 把css 插入 header标签中
        'css-loader',  // 解析 @important 语法或路径
        'postcss-loader',
       
      ]
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader', // 把css 插入 header标签中
        },
        'css-loader',  // 解析 @important 语法或路径
        'postcss-loader', // 兼容浏览器
        'less-loader', // 先解析 less 成css，再处理后续
      ]// 顺序不能写错，否则报 unknown Word 错误
    },
    {
      test: /\.(sa|sc)ss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          },
        },
      ],
      include: [path.resolve(__dirname, 'src')],
    },
    {
      test: /\.(png|jpe?g|svg|gif)$/,
      type: 'asset/inline', /** 已经内置不需要引入loader */
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: "img/",
            name: "[name]-[hash:6].[ext]"
          }
        },
        // 图片压缩
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }
      ]
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    }
  ]
}

module.exports = baseModule

