const webpackConfig = require('./webpack.config')

module.exports = {
    publicPath: './',    // 公共路径
    configureWebpack: {
        ...webpackConfig
    },
    devServer: {
        port: 8000     // 端口号
    }
}
