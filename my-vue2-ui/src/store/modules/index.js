const files = require.context('./', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  if (key === './index.js') {
    return true
  }
  const name = key.substring(2, key.length - 3)
  modules[name] = files(key)
})

export {
  modules
}
