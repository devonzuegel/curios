import * as React from 'react'
import * as Redux from 'redux'
import {Route, RouteProps} from 'react-router-dom'

import * as auth from '~/redux/reducers/auth'

export type TProps = {
  data: {
    loading: boolean
    loggedInUser: {id?: string}
  }
  setRedirect: (
    to: string
  ) => (d: Redux.Dispatch<auth.TSetRedirect>) => auth.TSetRedirect
} & RouteProps

const SignedIn = (props: TProps) => {
  if (props.data.loading) {
    return <pre>Loading...</pre>
  }
  const isLoggedIn = !!props.data.loggedInUser.id
  if (isLoggedIn) {
    return <Route {...props} />
  }
  if (props.path) {
    props.setRedirect(props.path)
  }
  return <Route {...props} component={() => <pre>Please sign in. :)</pre>} />
}

export default SignedIn
