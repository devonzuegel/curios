import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {MockedProvider} from 'react-apollo/test-utils'

import Pages from './'
import store, {history} from '~/redux/store'

jest.mock('./../pages/Authentication/Facebook/facebookSdk', () => ({
  initialize: () => null,
  login: () => null,
}))

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MockedProvider store={store}>
      <ConnectedRouter history={history}>
        <Pages />
      </ConnectedRouter>
    </MockedProvider>,
    div
  )
})
