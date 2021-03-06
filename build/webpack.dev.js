const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const commonConfig = require('./webpack.base.js');


module.exports = function () {
  return merge(commonConfig, {
    devtool: 'source-map',
    mode:'development',
    output: {
      path: path.resolve(__dirname, '../hot'),
      filename: '[name].js',
    },
    devServer:{
      contentBase:path.resolve(__dirname,'../hot'),
      historyApiFallback: {
        rewrites: [
          { from: /./, to: '/' }
        ]
      },
      host:'0.0.0.0'
    },
    plugins:[
      new CopyWebpackPlugin([
        {from:path.resolve(__dirname,'../src/assets'),to:path.resolve(__dirname,'../hot')},
        {from:path.resolve(__dirname,'../public'),to:path.resolve(__dirname,'../hot')}
      ]),
      new webpack.DefinePlugin({
        ISDEV:JSON.stringify(true),
        ISPROD:JSON.stringify(false),
      })
    ]
  });
};
