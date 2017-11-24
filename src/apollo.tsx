import * as React from 'react'
import * as Redux from 'redux'

import {ApolloClient, createNetworkInterface, ApolloProvider} from 'react-apollo'

const URIs = {
  cloud: 'https://api.graph.cool/simple/v1/cja3m4qdf0w7m0117v8ouufto',
  local: 'http://localhost:60000/simple/v1/cjadjqp28000n019648w9ulno',
}

const networkInterface = createNetworkInterface({
  uri: process.env.NODE_ENV === 'development' ? URIs.local : URIs.cloud,
})

networkInterface.use([
  {
    applyMiddleware(req: {options: {headers?: any}}, next: Function) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      // Get the authentication token from local storage if it exists.
      if (localStorage.getItem('graphcoolToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          'graphcoolToken'
        )}`
      }
      next()
    },
  },
])

const client = new ApolloClient({networkInterface})

/**
 * The Provider connects our Apollo client to the component tree. It also
 * serves as our Redux provider.
 */
const ApolloWrapper = (props: {children: JSX.Element; store: Redux.Store<any>}) => (
  <ApolloProvider store={props.store} client={client}>
    {props.children}
  </ApolloProvider>
)

export default ApolloWrapper
