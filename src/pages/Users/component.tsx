import * as React from 'react'

import User from '../../components/User'

export type TUser = {
  id: string
  facebookUserId: string
  facebookFirstName: string
}

export type TProps = {
  data: {allUsers: TUser[]; loading: boolean}
}

const UsersPage = (props: TProps) => {
  if (props.data.loading) {
    return <h3>Loading...</h3>
  }
  return (
    <div>{props.data.allUsers.map((user, k) => <User {...user} key={k} />)}</div>
  )
}

export default UsersPage
