const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html文件

module.exports ={
  entry:"./src/index.js",
  output: {
    filename: 'js/bundle.[hash:5].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath:"./dist/"
  },
  resolve:{
    extensions:[".js",".json",".jsx",".css"]
  },
  // devtool:"source-map",//报错报到源码中，在打包添加压缩插件之后就失效
  module: {
    rules: [
      { test: /\.js[x]?$/, exclude: /node_modules/, use: "babel-loader" },
      //当打包的时候遇到js文件先交给babel-loader转译
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader'
      //   ]
      // },//添加压缩文件后把它改为下面的
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:[ "css-loader","postcss-loader"]
        })
      },//把css文件单独打包出来
      {
        test:/\.(jpe?g|png)$/,
        use:'file-loader?name=[name]-[hash:5].[ext]&outputPath=images/'
      }
    ]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    //这个插件的功能是打包的时候把js文件压缩
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    //这个插件的功能也是打包的时候把js文件压缩
    new ExtractTextPlugin({
      filename:'style/bundle.min.css'
    }),//生成min文件在style文件夹
    new HtmlWebpackPlugin({
      template:'public/index.html'
    })
  ]
  //所有的插件都放到plugins数组下
}
