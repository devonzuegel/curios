import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {autoRehydrate} from 'redux-persist'

import rootReducer from './reducers'

export const history = createHistory()

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    devToolsExtension: Function
  }
}

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  autoRehydrate(),
  ...enhancers
)

const store = createStore(rootReducer, composedEnhancers)

export default store
