/**
 * Created by common on 2017/7/19.
 */
import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './container/App'
import todoApp from './reducer/reducers'

let store = createStore(todoApp)

const APP_CONTAINER_SELECTOR = process.env.REACT_APP_CONTAINER_SELECTOR

let rootElement = document.querySelector(APP_CONTAINER_SELECTOR)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
