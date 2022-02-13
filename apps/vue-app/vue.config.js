/** @format */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProd ? '/apps/vue-app' : '',
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
