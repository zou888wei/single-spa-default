const { resolve } = require('path')
const PUBLIC_PATH = process.env.REACT_APP_PUBLIC_PATH
module.exports = {
  webpack: (config) => {
    // console.log(config)
    // config.resolve.alias['@'] = rootPath
    return Object.assign(config, {
      output: {
        publicPath: PUBLIC_PATH
      },
      devServer: {
        // vue router为history模式时，保证刷新页面时不会丢失页面
        historyApiFallback: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, '/src')
        }
      }
    })
  }
}
