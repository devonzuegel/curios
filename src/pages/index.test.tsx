import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import Pages from './'
import store, {history} from '../redux/store'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Pages />
      </ConnectedRouter>
    </Provider>,
    div
  )
})
