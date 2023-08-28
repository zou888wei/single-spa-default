const {
  override,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
const pkg = require('./package.json')
// 修改默认打包目录build，改为与vue统一目录dist
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')

const PUBLIC_PATH = process.env.REACT_APP_PUBLIC_PATH
const NODE_ENV = process.env.NODE_ENV

module.exports = override(
  // 路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  (config) => {
    config.output.publicPath = PUBLIC_PATH
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    config.output.libraryTarget = 'umd'
    config.output.library = pkg.name
    // 保持生产与开发文件名一致(非必须)
    config.output.filename = NODE_ENV === 'production' ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js'
    return config
  }
)
