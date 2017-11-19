import * as Apollo from 'react-apollo'

import * as api from '~/graphql'
import UsersPage, {TUser, TProps} from './component'

type TResponse = {allUsers: TUser[]}

export default Apollo.graphql<TResponse, TProps>(api.ALL_USERS)(UsersPage)
