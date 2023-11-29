// 子系统默认的vuex配置，子系统默认是小写的store
import Vue from 'vue'
import Vuex from 'vuex'
import { modules } from './modules'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store
