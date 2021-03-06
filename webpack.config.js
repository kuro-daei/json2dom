
const env = process.env.NODE_ENV || 'development';
console.log('build env:' + env);

const path = require('path');
const webpack = require('webpack');
const uglify = new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false}, output: {comments: false} });


let config;
if (env === 'production') {
  config = {
    entry: {'dist/index.js': './src/main.js'},
    output: { filename: '[name]' },
    plugins: [ uglify ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader?presets[]=es2015'],
          exclude: /(node_modules|ogv)/
        }
      ]
    },
  };
} else {
  config = {
    entry: {index: [
      './test/src/01-basic.js',
      './test/src/02-filters.js'
    ]},
    output: {
      path: path.join(__dirname, 'test/dist'),
      filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader?presets[]=es2015'],
          exclude: /(node_modules|ogv)/
        }
      ]
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': 'http://tpc.googlesyndication.com',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Range'
      }
    }
  };
}

module.exports = config;
