import * as React from 'react'
import {render} from 'react-dom'
import {persistStore} from 'redux-persist'

import registerServiceWorker from './registerServiceWorker'
import store from './redux/store'
import Pages from './pages'
import ApolloWrapper from './apollo'

registerServiceWorker()

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
      return (
        <div style={{margin: 'auto'}}>
          <h2>Loading..</h2>
        </div>
      )
    }

    return (
      <ApolloWrapper store={store}>
        <Pages />
      </ApolloWrapper>
    )
  }
}

const target = document.querySelector('#root')
render(<PersistGate />, target)
