// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 切换数据来源=本地虚拟/线上提供
var isDev = 1
var configDev = {
    // proxy all requests starting with /api to jsonplaceholder
    '/api': {
        // http://jsonplaceholder.typicode.com or http://api.icndb.com/jokes/random
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
}
var targetUrl = [
    'http://test.ihczd.com:9509/hczd-club', // 测试
    'http://10.1.6.80:8088/hczd-club', // 标
    'http://10.1.6.240:8080/hczd-club', // 永
    'http://10.1.6.33:8080/hczd-club', // 王
    'http://10.1.6.235:8080/hczd-club' //我
][4]
var configPro = {
    '/api': {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {}
    },
    '/client': {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {}
    },
}
var proxyTable = isDev ? configDev : configPro

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
