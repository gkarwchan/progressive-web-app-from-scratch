import path from 'path';

export default {
  mode: 'development',
  entry: ['./src'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', 'tsx', '.js']
  }
};