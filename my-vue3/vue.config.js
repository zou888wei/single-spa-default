const { defineConfig } = require('@vue/cli-service')
const pkg = require('./package.json')

const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // 告诉子应用在这个地址加载静态资源，否则会去基座应用的域名下加载
  publicPath: PUBLIC_PATH,
  devServer: {
    // vue router为history模式时，保证刷新页面时不会丢失页面
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: pkg.name,
      libraryTarget: 'umd'
    }
  }
})
