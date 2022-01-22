const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    overlay: {
      warnings: true,
      error: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', // 域名
        // }
        changeOrigin: true,
        ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'J_MUSIC'
      return args
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/styles/global/variable.less')]
    }
  }
}
