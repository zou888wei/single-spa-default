import Vue from 'vue'
import App from './App.vue'
import router from './router'
import cheerio from 'cheerio'
import { registerApplication, start } from 'single-spa'

Vue.config.productionTip = false

const strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
'?(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' + // ftp的user@
'(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
'|' + // 允许IP和DOMAIN（域名）
'([0-9a-z_!~*()-]+.)*' + // 域名- www.
'([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
'[a-z]{2,6})' + // first level domain- .com or .museum
'(:[0-9]{1,4})?' + // 端口- :80
'((/?)|' + // a slash isn't required if there is no file name
'(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$'
const re = new RegExp(strRegex)

// 声明一个函数，用来加载打包好的库
function createScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    // 加载成功执行成功回调
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

// 获取html中head里的script
function getHtmlScript(data, url) {
  const list = []
  const $ = cheerio.load(data)
  const scriptList = $('script')

  Array.from(scriptList).map(item => {
    let src = item.attribs.src
    // if (src.includes('@vite')) {
    //   return
    // }
    if (!re.test(src)) {
      src = url + src
    }
    list.push(src)
  })
  return [...new Set(list)]
}

// 记载函数，返回一个 promise
function loadApp(url, globalVar, config = ['vue']) {
  // 支持远程加载子应用
  return async() => {
    // // 基本使用方式：
    // if (config.includes('vue')) {
    //   await createScript(url + '/js/chunk-vendors.js')
    //   await createScript(url + '/js/app.js')
    // } else if (config.includes('react')) {
    //   await createScript(url + '/static/js/main.js')
    // }

    // 进阶使用
    // 1：动态获取服务器上带有时间戳的js
    // 2：使用接口请求（让后端获取最新js）
    // 3：每个子应用下加一个执行js用于打包后生成config.js，注册的时候就统一获取这个config.js,然后再这个config.js中去获取打包后的主js
    const body = await fetch(url) // 兼容就用axios等
    const text = await body.text()
    const content = await getHtmlScript(text, url)
    for (let i = 0; i < content.length; i++) {
      await createScript(content[i])
    }
    // 这里的return很重要，需要从这个全局对象中拿到子应用暴露出来的生命周期函数
    return window[globalVar]
  }
}

const apps = [
  {
    name: 'my-vue2',
    app: loadApp('//localhost:11001', 'my-vue2'),
    activeWhen: '/vue2'
  },
  {
    name: 'my-vue3',
    app: loadApp('//localhost:11002', 'my-vue3'),
    activeWhen: '/vue3'
  },
  {
    name: 'my-react',
    app: loadApp('//localhost:11003', 'my-react', ['react']),
    activeWhen: '/react'
  }
]

// 注册子应用
apps.map(item => {
  registerApplication(item)
})

new Vue({
  router,
  mounted() {
    // 启动主应用
    start()
  },
  render: h => h(App)
}).$mount('#app')
