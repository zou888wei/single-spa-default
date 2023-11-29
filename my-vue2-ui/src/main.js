import Vue from 'vue'
import App from './App.vue'
import SingleSpaVue from 'single-spa-vue'
import store from './store'

import pkg from '../package.json'

Vue.config.productionTip = false

window.Store = store

// 生成配置对象
const appOptions = {
  el: '#ui',
  store,
  render: h => h(App)
}

const lifecycles = SingleSpaVue({
  Vue,
  appOptions
})

// 如果主应用没有请求子应用,单独请求子应用，注意挂载点
if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#ui')
}

export const name = pkg.name
export const bootstrap = lifecycles.bootstrap
export const mount = lifecycles.mount
export const unmount = lifecycles.unmount
