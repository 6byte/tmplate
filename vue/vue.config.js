// �Ƿ�Ϊ��������
const isProduction = process.env.NODE_ENV !== "development";
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// gzipѹ��
// const CompressionWebpackPlugin = require("compression-webpack-plugin");

// ���ػ����Ƿ���Ҫʹ��cdn
const devNeedCdn = true;

// cdn����
const cdn = {
  // cdn��ģ�����ƺ�ģ����������������Ӧwindow������صı������ƣ�
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    vuetify: "vuetify",
    // "ant-design-vue": "antd",
    axios: "axios",
  },
  // cdn��css����
  css: [
    "https://cdn.bootcdn.net/ajax/libs/antd/3.26.20/antd.css",
    "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.1/antd.min.css",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css",
  ],
  // cdn��js����
  js: [
    "https://cdn.staticfile.org/vue/2.6.10/vue.min.js",
    "https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js",
    /////////////////////////////////////////////////////////////////////////
    // ==================   Vuex  && ant-vue CDN  ========================//
    // "https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js",
    // "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.1/antd.min.js",
    /////////////////////////////////////////////////////////////////////////
  ],
};

module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  chainWebpack: (config) => {
    // // ============ѹ��ͼƬ start============
    // config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({ bypassOnDebug: true })
    //     .end()
    // ============ѹ��ͼƬ end============

    // ============ע��cdn start============
    config.plugin("html").tap((args) => {
      // ���������򱾵���Ҫcdnʱ����ע��cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============ע��cdn start============
  },
  configureWebpack: (config) => {
    // ��cdn��ʽ���룬�򹹽�ʱҪ���������Դ
    if (isProduction || devNeedCdn) config.externals = cdn.externals;

    // ���������������
    // if (isProduction) {
    //   // ����ѹ��
    //   // ..................
    //   // gzipѹ��
    //   const productionGzipExtensions = ["html", "js", "css"];
    //   config.plugins.push(
    //     new CompressionWebpackPlugin({
    //       filename: "[path].gz[query]",
    //       algorithm: "gzip",
    //       test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
    //       threshold: 10240, // ֻ�д�С���ڸ�ֵ����Դ�ᱻ���� 10240
    //       minRatio: 0.8, // ֻ��ѹ����С�����ֵ����Դ�Żᱻ����
    //       deleteOriginalAssets: false, // ɾ��ԭ�ļ�
    //     })
    //   );
    // }

    // �����������
    // config.optimization = {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         chunks: "all",
    //         test: /node_modules/,
    //         name: "vendor",
    //         minChunks: 1,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 100,
    //       },
    //       common: {
    //         chunks: "all",
    //         test: /[\\/]src[\\/]js[\\/]/,
    //         name: "common",
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 60,
    //       },
    //       styles: {
    //         name: "styles",
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: "all",
    //         enforce: true,
    //       },
    //       runtimeChunk: {
    //         name: "manifest",
    //       },
    //     },
    //   },

    // };
  },
};
