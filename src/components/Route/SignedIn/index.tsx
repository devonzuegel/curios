import * as React from 'react'
import * as Redux from 'redux'
import {Route, RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'

import * as auth from '../../../redux/reducers/auth'

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

type TPartialGlobalState = {auth: auth.TState}

const mapStateToProps = (state: TPartialGlobalState, ownProps: RouteProps) => ({
  signedIn: state.auth.signedIn,
  currentURL: ownProps.path,
})

const mapDispatchToProps = () => (dispatch: Redux.Dispatch<auth.TSetRedirect>) =>
  Redux.bindActionCreators({setRedirect: auth.actions.setRedirect}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn)
