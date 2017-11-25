import * as Apollo from 'react-apollo'

import * as api from '~/graphql'
import HomePage from './component'

export default Apollo.compose(
  Apollo.graphql(api.LOGGED_IN_USER, {
    name: 'LoggedInUser',
    options: {fetchPolicy: 'network-only'},
  }),
  Apollo.graphql(api.CREATE_POST, {name: 'CreatePostMutation'}),
  Apollo.graphql(api.ALL_POSTS, {name: 'AllPosts'})
)(HomePage)
