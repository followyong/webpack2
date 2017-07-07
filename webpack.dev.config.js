const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html文件
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports ={
  entry:"./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath:"./dist/"
  },
  resolve:{
    extensions:[".js",".json",".jsx",".css"]
  },
  devtool:"source-map",//报错报到源码中，在打包添加压缩插件之后就失效
  module: {
    rules: [
      { test: /\.js[x]?$/, exclude: /node_modules/, use: "babel-loader" },
      //当打包的时候遇到js文件先交给babel-loader转译
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },//添加压缩文件后把它改为下面的
      {
        test:/\.(jpe?g|png)$/,
        use:'file-loader'
      }
    ]
  },
  devServer:{
    port:3000,
    compress: true,
    hot:true

  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url:'http://localhost:3000'
    })
  ]
  //所有的插件都放到plugins数组下
}
