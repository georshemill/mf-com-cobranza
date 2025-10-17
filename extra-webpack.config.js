const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const { merge } = require('webpack-merge');

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

    return merge(singleSpaWebpackConfig, {
      externals: {
        '@codenv/auth-utility': '@codenv/auth-utility',
        '@test/mf-utils-modules': '@test/mf-utils-modules',
      }
    });
};
