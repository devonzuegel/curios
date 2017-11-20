import * as Apollo from 'react-apollo'

import * as api from '~/graphql'
import HomePage, {TProps} from './component'

export default Apollo.compose(
  Apollo.graphql(api.ALL_POSTS, {name: 'AllPosts'}),
  Apollo.graphql<{}, TProps>(api.ALL_USERS, {name: 'AllUsers'})
)(HomePage)
