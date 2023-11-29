// 创建自定义事件
const createEvent = (name, params) => {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: params
  })
}

export function dispatch(name, params) {
  window.dispatchEvent(createEvent(name, params))
}
