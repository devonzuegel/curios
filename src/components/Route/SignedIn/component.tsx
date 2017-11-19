import * as React from 'react'
import * as Redux from 'redux'
import {Route, RouteProps} from 'react-router-dom'

import * as auth from '~/redux/reducers/auth'

type TProps = {
  signedIn: boolean
  setRedirect: (
    to: string
  ) => (d: Redux.Dispatch<auth.TSetRedirect>) => auth.TSetRedirect
} & RouteProps

const SignedIn = (props: TProps) => {
  if (props.signedIn) {
    return <Route {...props} />
  }
  if (props.path) {
    props.setRedirect(props.path)
  }
  return <Route {...props} component={() => <code>Please sign in. :)</code>} />
}

export default SignedIn
