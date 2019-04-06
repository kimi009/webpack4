const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:'./src/js/index.js',
  output:{
    path:path.resolve(__dirname,'webpackRes'),
    filename:'js/bundle-[hash].js'
  },
  devServer:{
    contentBase:"./webpackRes",
    inline:true,
    open:false
  },
  module: {
    rules:[
      {
        test:/\.(jsx|js)$/,
        use:{
          loader:"babel-loader"
        },
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[
            {
            loader:'css-loader',
            options:{
              minimize:true
            }
          }
        ],
        publicPath:'../'
        })
      },
      {
        test:/\.(jpg|png|jpeg)$/,
        use:['file-loader?limit=1024&name=./img/[name].[ext]']
      },
      {
        test:/\.(ttf|woff|woff2|eot|svg)$/,
        use:['file-loader?limit=1024&name=./fonts/[name].[ext]']
      },
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin('./css/[name].css'),
    new HtmlWebpackPlugin(
      {
        template:'./src/index.html',
        minify:{
          //去除引号
          removeAttributeQuotes:true,
          //去除注释
          removeComments:true,
          //去除空属性
          removeEmptyAttributes:true,
          //去除空格
          collapseWhitespace:true
        }
      }
    )
  ]
}