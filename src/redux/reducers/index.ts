import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import authReducer from './auth'
import counterReducer from './counter'

export default combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  auth: authReducer,
})
