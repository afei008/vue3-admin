/** @format */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const buildDate = JSON.stringify(new Date().toLocaleString());

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';

const assetsCDN = {
  // webpack build externals
  externals: {
    // 因为后面定义了 isCustomElement，因此此处不能将其抽离到 cdn
    // 否则页面会提示需要自定义设置，虽然不影响使用。当您不需要 micro-app 时，可将此处打开
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    axios: 'axios',
  },
  css: [],
  js: [
    // '//cdn.jsdelivr.net/npm/vue@3.2.21/dist/vue.global.min.js',
    // '//cdn.jsdelivr.net/npm/vue-router@4.0.12/dist/vue-router.global.min.js',
    // '//cdn.jsdelivr.net/npm/vuex@4.0.2/dist/vuex.global.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
  ],
};

// vue.config.js
const vueConfig = {
  publicPath: isProd ? '/vue3-admin' : '',
  configureWebpack: {
    // webpack plugins
    plugins: [
      new webpack.DefinePlugin({
        // eslint-disable-next-line global-require
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate,
      }),
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => /^micro-app/.test(tag),
        };
        return options;
      });

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap((args) => {
        const arr = [...args];
        arr[0].cdn = assetsCDN;
        return arr;
      });
    }

    config.when(isProd, (con) => {
      con.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          antd: {
            name: 'chunk-antd',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
    });
  },

  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "@/styles/variables.scss";`,
      },
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#e14e6f',
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  devServer: {
    // development server port 8000
    port: 8000,
    host: '0.0.0.0',
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: [],
};

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true);
}
// console.log(process.env)
module.exports = vueConfig;
