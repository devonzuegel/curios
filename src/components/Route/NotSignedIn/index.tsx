import * as React from 'react'
import {Route, RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'

import * as auth from '../../../redux/reducers/auth'

type TProps = {signedIn: boolean} & RouteProps

const NotSignedIn = (props: TProps) => {
  if (props.signedIn) {
    return <div>You're already signed in :)</div>
  }
  return <Route {...props} />
}

type TPartialGlobalState = {auth: auth.TState}

const mapStateToProps = (state: TPartialGlobalState) => ({
  signedIn: state.auth.signedIn,
})

export default connect(mapStateToProps)(NotSignedIn)
