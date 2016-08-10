// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 切换数据来源=本地虚拟/线上提供
var isNode = 1
var proxyTable = isNode ? {
    // proxy all requests starting with /api to jsonplaceholder
    '/app/shopping': {
        // http://jsonplaceholder.typicode.com or http://api.icndb.com/jokes/random
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/app/shopping': ''
        }
    }
} : {
    '/app/shopping': {
        target: 'http://10.1.6.80:8088/hczd-club',
        changeOrigin: true,
        pathRewrite: {}
    }
}

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: proxyTable,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    }
}
