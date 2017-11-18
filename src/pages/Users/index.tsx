import * as Apollo from 'react-apollo'

import UsersPage, {TUser, TProps} from './component'
import * as api from '../../graphql'

type TResponse = {allUsers: TUser[]}

export default Apollo.graphql<TResponse, TProps>(api.ALL_USERS)(UsersPage)
