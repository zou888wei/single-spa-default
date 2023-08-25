const {
  override,
  addWebpackAlias
} = require('customize-cra')
const { resolve } = require('path')
const pkg = require('./package.json')

const PUBLIC_PATH = process.env.REACT_APP_PUBLIC_PATH

module.exports = override(
  // 路径别名
  addWebpackAlias({
    '@': resolve(__dirname, 'src')
  }),
  (config, env) => {
    config.output.publicPath = PUBLIC_PATH
    config.output.path = resolve(__dirname, 'dist')
    config.output.libraryTarget = 'umd'
    config.output.library = pkg.name
    return config
  }
)
