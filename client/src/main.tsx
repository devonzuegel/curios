import * as React from 'react'
import {render} from 'react-dom'
import {persistStore} from 'redux-persist'
import {Provider} from 'react-redux'

import Loading from '@client/components/Loading'
import store from './redux/store'
import Pages from './pages'
import './global.css'

class PersistGate extends React.Component<{}, {rehydrating: boolean}> {
  state = {rehydrating: true}

  componentDidMount() {
    persistStore(store, {blacklist: []}, () => {
      this.setState({rehydrating: false})
    })
  }

  render() {
    if (this.state.rehydrating) {
      return <Loading />
    }

    return (
      <Provider store={store}>
        <Pages />
      </Provider>
    )
  }
}

const target = document.querySelector('#root')
render(<PersistGate />, target)
