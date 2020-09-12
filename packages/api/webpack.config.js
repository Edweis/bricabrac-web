const slsw = require('serverless-webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: { extensions: ['.tsx', '.ts'] },
  externals: {
    knex: 'commonjs knex',
    '@layers/database': '@layers/database',
  },
  plugins: [new Dotenv()],
};
