import * as Apollo from 'react-apollo'

import * as api from '../../../graphql'
import FacebookAuth from './component'

export default Apollo.compose(
  Apollo.graphql(api.AUTHENTICATE_FACEBOOK_USER, {
    name: 'authenticateUserMutation',
  }),
  Apollo.graphql<{}>(api.LOGGED_IN_USER, {
    options: {fetchPolicy: 'network-only'},
  })
)(FacebookAuth)
