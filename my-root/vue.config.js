const { defineConfig } = require('@vue/cli-service')

const LOCAL_URL = process.env.VUE_APP_LOCAL_URL || '/api'
const LOCAL_TARGET_URL = process.env.VUE_APP_LOCAL_TARGET_URL || 'https://dev.gitwh.top'
const LOCAL_OUTPUT_URL = process.env.VUE_APP_LOCAL_OUTPUT_URL || '/api'

function setProxy() {
  const obj = {}
  if (LOCAL_URL && LOCAL_TARGET_URL && LOCAL_OUTPUT_URL) {
    const local_url = LOCAL_URL.split(',')
    const local_target_url = LOCAL_TARGET_URL.split(',')
    const local_output_url = LOCAL_OUTPUT_URL.split(',')
    for (let i = local_url.length - 1; i >= 0; i--) {
      const item = local_url[i]
      obj[item] = {
        target: local_target_url[i],
        changeOrigin: true,
        pathRewrite: {}
      }
      obj[item].pathRewrite['^' + item] = local_output_url[i]
      if (obj[item] !== '/api') {
        // 此方法用来解决chorme浏览器不支持本地开发携带cookie请求
        obj[item].onProxyRes = function(proxyRes, req, res) {
          const cookies = proxyRes.headers['set-cookie']
          if (cookies) {
            const setCookie = []; const setParam = []
            cookies.forEach(item => {
              const c = item.split(';')
              setCookie.push(c[0])
              setParam.push(...c.slice(1))
            })
            const newCookies = setCookie.join(';')
            // let param = [...new Set(setParam)].join(';')

            const path = new RegExp('/Path=\\' + local_output_url[i] + '/')
            // param = param.replace(path, 'Path=/')

            delete proxyRes.headers['set-cookie']
            proxyRes.headers['set-cookie'] = [newCookies + path]
          }
        }
      }
    }
  }
  return obj
}

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': 1728000
    },
    proxy: setProxy()
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
  }
})
