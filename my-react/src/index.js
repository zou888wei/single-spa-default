import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/styles/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import singleSpaReact from 'single-spa-react'
import pkg from '../package.json'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById('content'),
  errorBoundary(err, info, props) {
    if (err) {
      console.log(err)
    }
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>
  }
})

// 如果主应用没有请求子应用,单独请求子应用，注意挂载点
if (!window.singleSpaNavigate) {
  // createApp(App).use(router).mount('#content')
  const root = ReactDOM.createRoot(document.getElementById('content'))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}

export const name = pkg.name
export const bootstrap = lifecycles.bootstrap
export const mount = lifecycles.mount
export const unmount = lifecycles.unmount
